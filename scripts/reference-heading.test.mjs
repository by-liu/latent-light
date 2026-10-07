import test from 'node:test';
import assert from 'node:assert/strict';
import {referenceHeading} from '../plugins/reference-heading.mjs';
import {markdownToHtml} from 'satteri';

test('Satteri renders numbered citations, a visible heading, and return links', () => {
  const {html} = markdownToHtml('A claim.[^source]\n\n[^source]: A source.', {
    hastPlugins: [referenceHeading()],
  });
  assert.match(html, /<sup><a[^>]*data-footnote-ref/);
  assert.match(html, /<h2[^>]*id="footnote-label"[^>]*>References<\/h2>/);
  assert.doesNotMatch(html, /<h2[^>]*class="sr-only"/);
  assert.match(html, /data-footnote-backref/);
});

test('native reference heading is visible and retains its citation anchor', () => {
  const node = {
    type: 'element', tagName: 'h2',
    properties: {id: 'footnote-label', className: ['sr-only', 'retained']},
    children: [{type: 'text', value: 'Footnotes'}],
  };
  const result = referenceHeading().element.visit(node);
  assert.equal(result.properties.id, 'footnote-label');
  assert.deepEqual(result.properties.className, ['retained']);
  assert.deepEqual(result.children, [{type: 'text', value: 'References'}]);
  assert.equal(node.children[0].value, 'Footnotes');
});

test('string classes are handled without removing unrelated classes', () => {
  const node = {properties: {id: 'footnote-label', className: 'sr-only retained'}, children: []};
  const result = referenceHeading().element.visit(node);
  assert.deepEqual(result.properties.className, ['retained']);
});

test('ordinary headings are unchanged', () => {
  const node = {properties: {id: 'attention'}, children: [{type: 'text', value: 'Attention'}]};
  const before = structuredClone(node);
  assert.equal(referenceHeading().element.visit(node), undefined);
  assert.deepEqual(node, before);
});

test('heading without a class renders and repeat application is stable', () => {
  const node = {properties: {id: 'footnote-label'}, children: []};
  const result = referenceHeading().element.visit(node);
  assert.deepEqual(referenceHeading().element.visit(result), result);
});
