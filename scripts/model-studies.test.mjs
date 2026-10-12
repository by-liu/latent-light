import test from 'node:test';
import assert from 'node:assert/strict';
import {access, readFile} from 'node:fs/promises';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {modelFlowAsMarkdown} from '../plugins/model-flow.mjs';
import {mathAsMarkdown, renderMath, validateMdxMath} from '../plugins/math-typesetting.mjs';
import {modelResourcesAsMarkdown} from '../plugins/model-resources.mjs';
import ts from 'typescript';

const studies = [
  'gpt-2', 'bert', 't5', 'llama', 'llama-3', 'mistral-7b', 'mixtral',
  'deepseek-v2', 'deepseek-v3', 'deepseek-r1', 'qwen3', 'glm-5',
  'kimi-k2', 'kimi-k3', 'deepseek-v4', 'deepseek-v4-1-flash',
  'mamba', 'kimi-linear', 'clip', 'blip-2', 'llava', 'qwen2-vl',
  'qwen3-vl', 'gemma-3', 'internvl-3',
  'gpt-oss', 'qwen2-5', 'qwen2-5-vl', 'qwen2-5-1m', 'qwen3-8-flash-next',
  'glm', 'glm-4', 'glm-4-5', 'glm-4-v', 'gemma', 'gemma-2', 'gemma-4',
  'minimax-01', 'minimax-m1', 'minimax-m2', 'minimax-m3',
];

for (const slug of studies) {
  test(`${slug}: numbered visuals, complete citations and export-safe explanations`, async () => {
    const filePath = `src/content/docs/architectures/models/${slug}.mdx`;
    const body = await readFile(new URL(`../${filePath}`, import.meta.url), 'utf8');
    assert.match(body, /^- \*\*/m, 'The opening must give concise model highlights.');
    assert.match(body, /^## (?:[Tt]he model in numbers|Model in numbers|Scope and scale)/m);
    assert.match(body, /\*\*Figure 1\./);
    assert.doesNotMatch(body, /lanes=\{|^## References\s*$|^# /m);
    assert.match(body, /<ModelResources\s/);
    const opening = body.replace(/^---[\s\S]*?---\s*/, '').replace(/^import .*;\s*/gm, '').trimStart();
    assert.ok(opening.startsWith('<ModelResources '), 'Resource links must be the first reading block.');
    const visible = body.replace(/https:\/\/[^\s)"']+/g, '');
    assert.doesNotMatch(visible, /\b[0-9a-f]{20,}\b/, 'Do not display opaque commit hashes.');
    const figures = [...body.matchAll(/\*\*Figure (\d+)\./g)].map(x => x[1]);
    assert.deepEqual(figures, figures.map((_, i) => String(i + 1)));

    const definitions = new Set([...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(x => x[1]));
    assert.ok(definitions.size >= 2);
    for (const [,label] of body.matchAll(/\[\^([^\]]+)\](?!:)/g)) {
      assert.ok(definitions.has(label), `Missing citation definition ${label}`);
    }

    for (const [,attrs,tex] of body.matchAll(/<MathExpression\s+([^>]*?)tex="([^"]+)"/g)) {
      renderMath(validateMdxMath(tex), attrs.includes('display'), filePath);
    }
    const numbers = [...body.matchAll(/<MathExpression display number="(\d+)"/g)].map(x => x[1]);
    assert.deepEqual(numbers, numbers.map((_, i) => String(i + 1)));
    const markdown = renderEntryAsMarkdown({body, filePath}, {
      componentMap: {ModelFlow: modelFlowAsMarkdown.render, MathExpression: mathAsMarkdown.render, ModelResources:modelResourcesAsMarkdown.render},
    });
    assert.doesNotMatch(markdown, /<ModelFlow|lanesJson=|<MathExpression|<ModelResources/);
    assert.match(markdown, /\[Technical report\]\(https:\/\//);
    assert.match(markdown, /\[Hugging Face\]\(https:\/\/huggingface.co\//);
    for (const label of definitions) assert.ok(markdown.includes(`[^${label}]:`));
    for (const number of numbers) assert.ok(markdown.includes(`\\tag{${number}}`));

    for (const [,json] of body.matchAll(/lanesJson='([^']*)'/g)) {
      for (const lane of JSON.parse(json)) {
        for (const step of lane.steps) {
          assert.ok(markdown.includes(step.label), `Lost diagram label ${step.label}`);
          if (step.detail) assert.ok(markdown.includes(step.detail), `Lost diagram detail ${step.detail}`);
        }
        if (lane.note) assert.ok(markdown.includes(lane.note));
      }
    }
  });
}

test('the catalog and sidebar include every curated study', async () => {
  const catalog = await readFile(new URL('../src/content/docs/architectures/models/index.mdx', import.meta.url), 'utf8');
  const config = await readFile(new URL('../astro.config.ts', import.meta.url), 'utf8');
  for (const slug of studies) {
    assert.ok(catalog.includes(`/architectures/models/${slug}/`), `Missing catalog link ${slug}`);
    assert.ok(config.includes(`architectures/models/${slug}`), `Missing sidebar entry ${slug}`);
  }
});

test('source-figure images and static attribution downloads exist in public', async () => {
  for (const slug of studies) {
    const body = await readFile(new URL(`../src/content/docs/architectures/models/${slug}.mdx`, import.meta.url), 'utf8');
    const urls = [...body.matchAll(/\]\((\/(?:licenses|figures\/model-studies)\/[^)]+)\)/g)].map(x => x[1]);
    for (const url of urls) {
      assert.ok(!url.includes('..'), 'Static assets must stay inside public/.');
      await access(new URL('../public' + url, import.meta.url));
    }
  }
});

test('Model Deep Dives groups related generations by family and keeps single studies direct', async () => {
  const config = await readFile(new URL('../astro.config.ts', import.meta.url), 'utf8');
  const source = ts.createSourceFile('astro.config.ts', config, ts.ScriptTarget.Latest, true);
  const property = (node, name) => node.properties.find(p =>
    ts.isPropertyAssignment(p) && p.name.getText(source) === name)?.initializer;
  let group;
  const visit = node => {
    if (ts.isObjectLiteralExpression(node) && property(node, 'label')?.text === 'Model Deep Dives') group = node;
    ts.forEachChild(node, visit);
  };
  visit(source);
  assert.ok(group, 'Missing Model Deep Dives group.');
  const items = property(group, 'items');
  assert.ok(items && ts.isArrayLiteralExpression(items));
  const families = {
    GPT:['gpt-2','gpt-oss'], GLM:['glm','glm-4','glm-4-5','glm-4-v','glm-5'],
    Gemma:['gemma','gemma-2','gemma-3','gemma-4'],
    MiniMax:['minimax-01','minimax-m1','minimax-m2','minimax-m3'],
    Llama:['llama','llama-3'], Mistral:['mistral-7b','mixtral'],
    DeepSeek:['deepseek-v2','deepseek-v3','deepseek-r1','deepseek-v4','deepseek-v4-1-flash'],
    Qwen:['qwen2-5','qwen2-5-1m','qwen3','qwen3-8-flash-next','qwen2-vl','qwen2-5-vl','qwen3-vl'], Kimi:['kimi-k2','kimi-k3','kimi-linear'],
  };
  const links = items.elements.flatMap(item => {
    assert.ok(ts.isObjectLiteralExpression(item));
    const children=property(item,'items');
    if(children) {
      assert.ok(ts.isArrayLiteralExpression(children));
      const label=property(item,'label')?.text;
      assert.ok(Object.hasOwn(families,label), `Unexpected family ${label}`);
      const childLinks=children.elements.map(child=>{
        assert.equal(property(child,'items'),undefined,'Only one family level is needed.');
        return property(child,'link')?.text;
      });
      assert.deepEqual(childLinks,families[label].map(slug=>`/architectures/models/${slug}/`));
      return childLinks;
    }
    const link = property(item, 'link');
    assert.ok(link && ts.isStringLiteral(link));
    return [link.text];
  });
  assert.equal(links[0], '/architectures/models/');
  assert.equal(property(items.elements[0], 'label')?.text, 'Overview');
  assert.equal(links.length, studies.length + 1);
  assert.deepEqual([...links.slice(1)].sort(), studies.map(slug => `/architectures/models/${slug}/`).sort());
  assert.deepEqual(items.elements.filter(item=>property(item,'items')).map(item=>property(item,'label').text).sort(),Object.keys(families).sort());
});
