import test from 'node:test';
import assert from 'node:assert/strict';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {readModelLanes, modelFlowAsMarkdown} from '../plugins/model-flow.mjs';

test('model flows export labels, detail, feedback notes, footer and cited caption', () => {
  const lanesJson = JSON.stringify([{label: 'Training', steps: [{label: 'Actor', detail: "Model's rollout"}, {label: 'Learner', accent: true}], note: 'Refresh feeds back to Actor.'}]).replaceAll("'", '\\u0027');
  const body = `<ModelFlow id="figure-1" title="Training loop" lanesJson='${lanesJson}' footer="Not a runtime benchmark">\n**Figure 1.** Original schematic.[^source]\n</ModelFlow>\n\n[^source]: Official report.`;
  const markdown = renderEntryAsMarkdown({body, filePath: 'example.mdx'}, {componentMap: {ModelFlow: modelFlowAsMarkdown.render}});
  assert.match(markdown, /id="figure-1"/);
  assert.match(markdown, /1\. \*\*Actor\*\*: Model's rollout/);
  assert.match(markdown, /2\. \*\*Learner\*\*/);
  assert.match(markdown, /Refresh feeds back to Actor/);
  assert.match(markdown, /Not a runtime benchmark/);
  assert.match(markdown, /\*\*Figure 1\.\*\* Original schematic\.\[\^source\]/);
  assert.match(markdown, /\[\^source\]: Official report/);
  assert.doesNotMatch(markdown, /ModelFlow|lanesJson|accent/);
});

test('JSON parsing never executes expressions and rejects malformed flow data', () => {
  for (const value of [undefined, 'process.exit()', '[]', '[{"steps":[]}]', '[{"steps":[{"label":7}]}]', '[{"steps":[{"label":"x","accent":"yes"}]}]']) {
    assert.throws(() => readModelLanes(value), /ModelFlow/);
  }
  assert.equal(readModelLanes('[{"steps":[{"label":"x \\u003e y"}]}]')[0].steps[0].label, 'x > y');
});
