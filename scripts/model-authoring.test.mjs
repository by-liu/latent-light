import test from 'node:test';
import assert from 'node:assert/strict';
import {access, readFile} from 'node:fs/promises';
import ts from 'typescript';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {mathAsMarkdown, prepareMdxMath, renderMath} from '../plugins/math-typesetting.mjs';
import {modelFlowAsMarkdown} from '../plugins/model-flow.mjs';
import {modelResourcesAsMarkdown} from '../plugins/model-resources.mjs';

const read = relative => readFile(new URL('../' + relative, import.meta.url), 'utf8');
const guidePath = 'src/content/docs/about/content-guidance/model-deep-dive-guide.mdx';
const templatePath = 'src/content/docs/about/content-guidance/model-deep-dive-template.mdx';
const componentMap = {
  MathExpression: mathAsMarkdown.render,
  ModelFlow: modelFlowAsMarkdown.render,
  ModelResources: modelResourcesAsMarkdown.render,
};

test('learning collections and Content Guidance stay in their respective domains', async () => {
  const config = await read('astro.config.ts');
  const source = ts.createSourceFile('astro.config.ts', config, ts.ScriptTarget.Latest, true);
  const property = (node, name) => node.properties.find(p =>
    ts.isPropertyAssignment(p) && p.name.getText(source) === name)?.initializer;
  const group = label => {
    let found;
    const visit = node => {
      if (ts.isObjectLiteralExpression(node) && property(node, 'label')?.text === label) found = node;
      ts.forEachChild(node, visit);
    };
    visit(source);
    assert.ok(found, `Missing sidebar group ${label}`);
    return found;
  };
  const content = group('Content Guidance');
  assert.equal(property(content, 'collapsed').kind, ts.SyntaxKind.TrueKeyword);
  assert.deepEqual(property(content, 'items').elements.map(item => property(item, 'link').text), [
    '/about/content-guidance/content-standards/',
    '/about/content-guidance/research-workflow/',
    '/about/content-guidance/model-deep-dive-guide/',
    '/about/content-guidance/model-deep-dive-template/',
  ]);
  let topLevelItems;
  const visit = node => {
    if (ts.isObjectLiteralExpression(node)) {
      const sidebar = property(node, 'sidebar');
      if (sidebar && ts.isObjectLiteralExpression(sidebar)) topLevelItems = property(sidebar, 'items');
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  assert.ok(!topLevelItems.elements.includes(content), 'Content Guidance must not be a top-level section.');
  assert.ok(property(group('About'), 'items').elements.includes(content), 'Content Guidance belongs directly inside About.');
  const models = group('LLM & VLM');
  assert.ok(!topLevelItems.elements.includes(models), 'LLM & VLM must not be a top-level domain.');
  assert.ok(property(group('AI Technology'), 'items').elements.includes(models), 'LLM & VLM belongs directly inside AI Technology.');
  assert.doesNotMatch(models.getText(source), /content-guidance|Study authoring/);
});

test('all previous guidance locations preserve direct HTML, Markdown and MDX redirects', async () => {
  const config = await read('astro.config.ts');
  for (const [oldPath,newSlug] of [
    ['/about/content-standards','content-standards'],
    ['/about/model-deep-dive-guide','model-deep-dive-guide'],
    ['/about/model-deep-dive-template','model-deep-dive-template'],
    ['/architectures/authoring/guide','model-deep-dive-guide'],
    ['/architectures/authoring/template','model-deep-dive-template'],
    ['/content-guidance/content-standards','content-standards'],
    ['/content-guidance/model-deep-dive-guide','model-deep-dive-guide'],
    ['/content-guidance/model-deep-dive-template','model-deep-dive-template'],
  ]) {
    for (const suffix of ['', '/index.md', '/index.mdx']) {
      const target = `/about/content-guidance/${newSlug}${suffix || '/'}`;
      assert.ok(config.includes(`'${oldPath}${suffix}': '${target}'`), `Missing direct redirect ${oldPath}${suffix}`);
    }
  }
  for (const path of [
    'AGENTS.md', 'README.md', 'src/content/docs/about/framework.mdx',
    'src/content/docs/about/content-guidance/content-standards.mdx', 'src/content/docs/about/development-guide.mdx',
    'src/content/docs/architectures/models/index.mdx', guidePath, templatePath,
  ]) {
    const body = await read(path);
    assert.doesNotMatch(body, /about\/content-standards|architectures\/authoring|about\/model-deep-dive-(?:guide|template)/, `Stale guidance link in ${path}`);
    assert.match(body, path === guidePath ? /about\/content-guidance\/model-deep-dive-template/ : /about\/content-guidance\/model-deep-dive-guide/);
  }
});

test('the guide records the evidence and presentation practices used by model studies', async () => {
  const body = await read(guidePath);
  for (const expected of [
    'Mechanism or backbone paper', 'Keep evidence layers separate',
    'stored total', 'repeated exposure', 'configuration ceiling',
    'Original white-background', 'minWidth', 'SOURCES.md', 'NOTICE.md',
    'coverage-audit.md', 'report.md', 'state/progress.json',
    'Use parallel agents only when the user authorizes delegation.',
    'Check actual equation parsing', '/llms-full.txt',
  ]) assert.ok(body.includes(expected), `Missing guidance for ${expected}`);
  const markdown = renderEntryAsMarkdown({body, filePath:guidePath}, {componentMap});
  const definitions = new Set([...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(x => x[1]));
  for (const [,label] of body.matchAll(/\[\^([^\]]+)\](?!:)/g)) assert.ok(definitions.has(label));
  for (const label of definitions) assert.ok(markdown.includes(`[^${label}]:`));
  assert.match(markdown, /Keep evidence layers separate/);
  assert.ok(markdown.includes('/about/content-guidance/model-deep-dive-template/'));
});

test('the template has a copyable starter, working imports and complete source-figure markup', async () => {
  const body = await read(templatePath);
  const starter = body.match(/```mdx\n([\s\S]*?)\n```/)?.[1];
  assert.ok(starter);
  assert.match(starter, /^---\ntitle: REPLACE_MODEL_NAME/);
  assert.match(starter, /^import FocusCanvas from/m);
  assert.match(starter, /^import SourceFigure from/m);
  for (const [,importPath] of starter.matchAll(/^import \w+ from '([^']+)';/gm)) {
    await access(new URL(importPath, new URL('../src/content/docs/architectures/models/example.mdx', import.meta.url)));
  }
  assert.match(starter, /<ModelResources[\s\S]*?<SourceFigure/);
  assert.match(starter, /<div slot="image">\n\n!\[/);
  assert.match(starter, /minWidth=\{720\}/);
  assert.match(starter, /\*\*Figure 1\.\*\*/);
  assert.match(starter, /^\[\^report\]:/m);
  assert.match(starter, /^\[\^artifact\]:/m);
  assert.match(starter, /^\[\^figures\]:/m);
  assert.match(starter, /REPLACE_EXECUTION_BOUNDARY_AND_REPORT_TO_RELEASE_MISMATCH/);
  const markdown = renderEntryAsMarkdown({body, filePath:templatePath}, {componentMap});
  assert.ok(markdown.includes(starter), 'The Markdown export must preserve the complete copyable starter.');
  assert.match(markdown, /state\/progress.json/);
});

test('the equation and independent-flow recipes parse and export correctly when copied', async () => {
  const body = await read(templatePath);
  const examples = [...body.matchAll(/```mdx\n([\s\S]*?)\n```/g)].map(x => x[1]);
  assert.equal(examples.length, 3);
  const flow = examples[1];
  for (const [,json] of flow.matchAll(/lanesJson='([^']+)'/g)) {
    const lanes = JSON.parse(json);
    assert.equal(lanes[0].steps.length, 3);
  }
  const flowMarkdown = renderEntryAsMarkdown({body:flow,filePath:'example.mdx'}, {componentMap});
  assert.doesNotMatch(flowMarkdown, /lanesJson=|<ModelFlow/);
  assert.match(flowMarkdown, /REPLACE_INPUT/);
  const equation = examples[2];
  const tex = equation.match(/tex="([^"\n]+)"/)?.[1];
  assert.ok(tex);
  assert.ok(tex.includes('\\sum'));
  assert.ok(!tex.includes('\\\\sum'), 'Static MDX attributes use single literal backslashes.');
  const html = renderMath(prepareMdxMath(tex, true, '1'), true, 'authoring recipe');
  assert.match(html, /class="katex/);
  const markdown = renderEntryAsMarkdown({body:equation,filePath:'example.mdx'}, {componentMap});
  assert.match(markdown, /\\sum/);
  assert.match(markdown, /\\tag\{1\}/);
  assert.doesNotMatch(markdown, /<MathExpression/);
});

test('shared guides cover the current collections, native components and analytics boundaries', async () => {
  const development = await read('src/content/docs/about/development-guide.mdx');
  const framework = await read('src/content/docs/about/framework.mdx');
  const maintenance = await read('src/content/docs/about/maintenance.mdx');
  for (const file of [
    'src/components/ComparisonTable.astro', 'src/components/DocumentSystem.astro',
    'src/components/agents/AgentCards.astro', 'src/components/agents/AgentArchitecture.astro',
    'src/components/agents/AgentLandscape.astro', 'plugins/comparison-table.mjs',
    'plugins/document-system.mjs', 'plugins/agent-presentation.mjs',
  ]) {
    await access(new URL('../' + file, import.meta.url));
    assert.ok(development.includes(file.split('/').at(-1)), 'Missing component guidance: ' + file);
  }
  for (const route of ['/architectures/','/document-ai/','/agents/','/products-markets/landscapes/',
    '/human-capabilities/high-agency/','/human-capabilities/taste/']) assert.ok(framework.includes(route));
  assert.match(maintenance, /Record configuration and collection checks separately/);
  assert.match(maintenance, /GET[\s\S]*?not a valid collection test/);
  assert.match(maintenance, /ignore rule does not remove files that Git already tracks/);
  const markdown = renderEntryAsMarkdown({body:maintenance,filePath:'src/content/docs/about/maintenance.mdx'});
  const definitions = new Set([...maintenance.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m => m[1]));
  for (const [,key] of maintenance.matchAll(/\[\^([^\]]+)\](?!:)/g)) assert.ok(definitions.has(key));
  for (const key of definitions) assert.ok(markdown.includes('[^' + key + ']:'));
  assert.doesNotMatch(maintenance,/^## References$/m);
  assert.doesNotMatch(maintenance,/account is on hold|Buttondown|bingyuan@/i);
});
