import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeHeading, findHeadingOffset} from '../src/lib/source-editor.ts';

test('normalizes Markdown, HTML, links, and entities without losing heading words', () => {
  assert.equal(normalizeHeading('**Q**, [K](https://example.com), <em>V</em> &amp; masks'), 'q, k, v & masks');
});
test('finds the real section and preserves character offsets', () => {
  const source = '---\ntitle: Page\n---\n\n## Intro\nText\n\n### Attention and masking\nMore';
  assert.equal(findHeadingOffset(source, 'Attention and masking'), source.indexOf('### Attention'));
});
test('ignores headings inside fenced Python and Markdown examples', () => {
  const source = '```md\n## Attention\n```\n\n## Attention\n';
  assert.equal(findHeadingOffset(source, 'Attention'), source.lastIndexOf('## Attention'));
});
test('supports tilde fences and ignores shorter closing fences', () => {
  const source = '~~~~md\n## Attention\n~~~\n## Attention\n~~~~\n## Attention\n';
  assert.equal(findHeadingOffset(source, 'Attention'), source.lastIndexOf('## Attention'));
});
test('matches formatted headings with optional closing hashes and CRLF', () => {
  const source = 'Paragraph\r\n### **Attention** &amp; masks ###\r\n';
  assert.equal(findHeadingOffset(source, 'Attention & masks'), source.indexOf('###'));
});
test('opens generated References at the first real footnote definition', () => {
  const source = '## Sources\n```md\n[^fake]: example\n```\n[^paper]: A paper.\n';
  assert.equal(findHeadingOffset(source, 'References'), source.indexOf('[^paper]'));
});
test('returns no match for the page introduction or a missing heading', () => {
  assert.equal(findHeadingOffset('## Intro', ''), -1);
  assert.equal(findHeadingOffset('## Intro', 'Missing'), -1);
});
