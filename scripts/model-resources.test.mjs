import test from 'node:test';
import assert from 'node:assert/strict';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {readModelResources, modelResourcesAsMarkdown} from '../plugins/model-resources.mjs';
const attrs = {reportHref:'https://arxiv.org/abs/2511.21631', modelHref:'https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct', modelName:'Qwen3-VL-8B-Instruct'};
test('resource cards export complete readable links rather than component syntax', () => {
  const body = `<ModelResources reportHref="${attrs.reportHref}" modelHref="${attrs.modelHref}" modelName="${attrs.modelName}" />\n\nThe architecture follows.`;
  const markdown = renderEntryAsMarkdown({body, filePath:'example.mdx'}, {componentMap:{ModelResources:modelResourcesAsMarkdown.render}});
  assert.ok(markdown.includes(`[Technical report](${attrs.reportHref})`));
  assert.ok(markdown.includes(`[Hugging Face](${attrs.modelHref})`));
  assert.ok(markdown.includes(attrs.modelName));
  assert.doesNotMatch(markdown, /ModelResources|reportHref|modelHref/);
});
test('resources reject unsafe links and file or revision links masquerading as model roots', () => {
  for (const bad of ['javascript:alert(1)', 'http://arxiv.org/a', 'https://name:secret@arxiv.org/a']) assert.throws(() => readModelResources({...attrs, reportHref:bad}));
  for (const bad of ['https://example.com/org/model', 'https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct/blob/main/config.json']) assert.throws(() => readModelResources({...attrs, modelHref:bad}));
  assert.throws(() => readModelResources({...attrs, modelName:''}));
});
test('a historical community mirror can be clearly identified', () => {
  assert.equal(readModelResources({...attrs, modelName:'Community mirror: huggyllama/llama-7b'})[1].note, 'Community mirror: huggyllama/llama-7b');
});
