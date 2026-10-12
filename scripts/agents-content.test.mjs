import test from 'node:test';
import assert from 'node:assert/strict';
import {access, readFile} from 'node:fs/promises';
import ts from 'typescript';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {mathAsMarkdown, prepareMdxMath, renderMath} from '../plugins/math-typesetting.mjs';
import {modelFlowAsMarkdown, readModelLanes} from '../plugins/model-flow.mjs';
import {agentCardsAsMarkdown, agentArchitectureAsMarkdown, agentLandscapeAsMarkdown, readAgentLandscape, readAgentData} from '../plugins/agent-presentation.mjs';
import {landscapeOverviewAsMarkdown} from '../plugins/landscape-overview.mjs';
import {landscapeMapAsMarkdown, readLandscapeCards} from '../plugins/landscape-map.mjs';

const slugs = ['index', 'foundations', 'tools-skills-protocols', 'context-memory-state',
  'orchestration', 'evaluation-reliability', 'security-control',
  'deep-dives/coding-agents', 'ecosystem', 'deep-dives/index',
  'deep-dives/claude-code', 'deep-dives/codex', 'deep-dives/pi',
  'deep-dives/opencode', 'deep-dives/deepseek-harness'];
const read = relative => readFile(new URL('../' + relative, import.meta.url), 'utf8');
const components = {MathExpression: mathAsMarkdown.render, ModelFlow: modelFlowAsMarkdown.render,
  AgentCards: agentCardsAsMarkdown.render, AgentArchitecture: agentArchitectureAsMarkdown.render, AgentLandscape: agentLandscapeAsMarkdown.render,
  LandscapeOverview: landscapeOverviewAsMarkdown.render, LandscapeMap: landscapeMapAsMarkdown.render};

for (const slug of slugs) test(`${slug}: references, diagrams and equations remain complete in exports`, async () => {
  const filePath = `src/content/docs/agents/${slug}.mdx`;
  const body = await read(filePath);
  assert.match(body, /^---\ntitle: .+\ndescription: .+\nlastUpdated: \d{4}-\d{2}-\d{2}\n---/);
  assert.doesNotMatch(body, /Eclipse|interview synthesis|interprets the user's/i);
  const definitions = new Set([...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(x => x[1]));
  const used = new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(x => x[1]));
  assert.ok(used.size > 0);
  assert.deepEqual([...used].sort(), [...definitions].sort());
  const markdown = renderEntryAsMarkdown({body, filePath}, {componentMap: components});
  for (const label of definitions) assert.ok(markdown.includes(`[^${label}]:`));
  assert.doesNotMatch(markdown, /<(?:ModelFlow|AgentArchitecture|AgentLandscape|AgentCards|LandscapeMap|LandscapeOverview)|(?:lanes|layers|cards|map)Json=|<MathExpression/);
  for (const [,relative] of body.matchAll(/^import \w+ from '([^']+)';/gm)) {
    await access(new URL(relative, new URL('../' + filePath, import.meta.url)));
  }
  const figures = [...body.matchAll(/<(ModelFlow|AgentArchitecture|AgentLandscape|LandscapeMap|LandscapeOverview)\b([\s\S]*?)>([\s\S]*?)<\/\1>/g)];
  for (const [i, [,type,attrs,caption]] of figures.entries()) {
    const id = attrs.match(/id="(figure-\d+)"/)[1];
    assert.equal(id, `figure-${i + 1}`);
    assert.match(caption, new RegExp(`\\*\\*Figure ${i + 1}\\.\\*\\*`));
    assert.ok(body.includes(`](#${id})`));
    assert.ok(markdown.includes(`<a id="${id}"></a>`));
    if (type === 'AgentArchitecture') for (const layer of readAgentData(attrs.match(/layersJson='([^']+)'/)[1], 'layers')) {
      assert.ok(markdown.includes(layer.label));assert.ok(markdown.includes(layer.detail));
      for (const part of layer.parts) {assert.ok(markdown.includes(part.title));assert.ok(markdown.includes(part.body));}
    }
    if (type === 'AgentLandscape') {
      const map = readAgentLandscape(attrs.match(/mapJson='([^']+)'/)[1]);
      for (const field of ['intent','harness','feedback','note']) assert.ok(markdown.includes(map[field]));
      for (const field of ['steps','capabilities','controls','families','frontier']) for (const row of map[field]) {
        assert.ok(markdown.includes(`[${row.label}](${row.href})`));
        if (row.detail) assert.ok(markdown.includes(row.detail));
        for (const example of row.examples ?? []) assert.ok(markdown.includes(`[${example.label}](${example.href})`));
      }
    }
    if (type === 'LandscapeMap') for (const card of readLandscapeCards(attrs.match(/cardsJson='([^']+)'/)[1])) {
      for (const field of ['label','role','examples','question']) assert.ok(markdown.includes(card[field]));
    }
    if (type === 'LandscapeOverview') {
      const src = attrs.match(/src="([^"]+)"/)[1];
      assert.ok(markdown.includes(src));assert.ok(markdown.includes(attrs.match(/alt="([^"]+)"/)[1]));
      await access(new URL('../public'+src,import.meta.url));
    }
    for (const lane of type === 'ModelFlow' ? readModelLanes(attrs.match(/lanesJson='([^']+)'/)[1]) : []) {
      for (const step of lane.steps) {
        assert.ok(markdown.includes(step.label));
        if (step.detail) assert.ok(markdown.includes(step.detail));
      }
      if (lane.note) assert.ok(markdown.includes(lane.note));
    }
  }
  for (const [,json] of body.matchAll(/<AgentCards\b[^>]*cardsJson='([^']+)'/g)) {
    for (const card of readAgentData(json,'cards')) {
      assert.ok(markdown.includes(`[${card.title}](${card.href})`));assert.ok(markdown.includes(card.description));
    }
  }
  const numbers = [];
  for (const [,attrs,tex] of body.matchAll(/<MathExpression\s+([^>]*?)tex="([^"]+)"\s*\/>/g)) {
    const number = attrs.match(/number="(\d+)"/)?.[1];
    const display = /\bdisplay\b/.test(attrs);
    if (number) numbers.push(Number(number));
    assert.match(renderMath(prepareMdxMath(tex, display, number), display, filePath), /class="katex/);
    assert.ok(markdown.includes(tex));
    if (number) assert.ok(markdown.includes(`\\tag{${number}}`));
  }
  assert.deepEqual(numbers, numbers.map((_, i) => i + 1));
});

test('Agents belongs under AI Technology and all pages are navigable', async () => {
  const config = await read('astro.config.ts');
  const source = ts.createSourceFile('astro.config.ts', config, ts.ScriptTarget.Latest, true);
  const property = (node, name) => node.properties.find(p =>
    ts.isPropertyAssignment(p) && p.name.getText(source) === name)?.initializer;
  let technology, agents;
  const visit = node => {
    if (ts.isObjectLiteralExpression(node)) {
      if (property(node, 'label')?.text === 'AI Technology') technology = node;
      if (property(node, 'label')?.text === 'Agents') agents = node;
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  assert.ok(technology && agents);
  assert.ok(property(technology, 'items').elements.includes(agents));
  const text = agents.getText(source);
  for (const slug of slugs) assert.ok(text.includes(slug === 'index' ? '/agents/' : `/agents/${slug.replace(/\/index$/, '')}/`));
  for (const label of ['Core Concepts','Reliability & Control','Agent Deep Dives']) assert.ok(text.includes(label));
});
