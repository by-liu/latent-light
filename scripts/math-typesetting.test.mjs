import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {markdownToHtml, mdxToJs, mdxToMdast} from 'satteri';
import {satteri} from '@astrojs/markdown-satteri';
import {mathTypesetting, mathAsMarkdown, renderMath, validateMdxMath, prepareMdxMath, equationNumber} from '../plugins/math-typesetting.mjs';
import {referenceHeading} from '../plugins/reference-heading.mjs';

const options = {features: {math: true}, hastPlugins: [mathTypesetting(), referenceHeading()]};

test('inline and display math include typeset HTML, accessible MathML, and TeX annotations', () => {
  const source = String.raw`A key width $d_k$.

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}+M\right)V
$$`;
  const {html} = markdownToHtml(source, options);
  assert.match(html, /class="ll-math-inline"/);
  assert.match(html, /class="ll-equation"[^>]*tabindex="0"[^>]*role="region"/);
  assert.equal((html.match(/<math /g) ?? []).length, 2);
  assert.match(html, /class="katex-html" aria-hidden="true"/);
  assert.match(html, /<annotation encoding="application\/x-tex">/);
  assert.doesNotMatch(html, /<blockquote|<pre|<script/);
});

test('MDX protects LaTeX braces, alignment, and comparison operators', () => {
  const source = String.raw`A comparison $j \le i$.

$$
\begin{aligned}
a_i &= \frac{x_i}{\sqrt{d_k}} \\
b_i &= x_i^{2}
\end{aligned}
$$`;
  const {code} = mdxToJs(source, options);
  assert.match(code, /ll-equation/);
  assert.match(code, /application\/x-tex/);
  assert.match(code, /katex/);
});

test('invalid equations fail with their source location', () => {
  assert.throws(() => markdownToHtml('$$\n\\frac{1}\n$$', {
    ...options, fileURL: new URL('file:///example/page.mdx'),
  }), /Invalid equation in file:\/\/\/example\/page\.mdx/);
});

test('code examples, escaped currency, quotes, and citation links remain unchanged', () => {
  const source = 'Use `$x$`; the price is \\$5.\n\n> A real quotation.\n\nA claim.[^source]\n\n[^source]: A source.';
  const {html} = markdownToHtml(source, options);
  assert.match(html, /<code>\$x\$<\/code>/);
  assert.match(html, /price is \$5/);
  assert.match(html, /<blockquote>/);
  assert.match(html, /data-footnote-ref/);
  assert.match(html, /id="footnote-label"[^>]*>References/);
  assert.doesNotMatch(html, /class="katex"/);
});

test('untrusted TeX cannot add links or remote images', () => {
  const {html} = markdownToHtml(String.raw`$\href{https://example.com}{x}$`, options);
  assert.doesNotMatch(html, /<a |href=/);
  const image = markdownToHtml(String.raw`$\includegraphics{https://example.com/image.png}$`, options);
  assert.doesNotMatch(image.html, /<img|src=/);
  assert.throws(() => markdownToHtml(String.raw`$\htmlClass{hostile}{x}$`, options));
});

test('macros cannot leak between equations', () => {
  assert.throws(() => markdownToHtml(String.raw`$\gdef\privateMacro{a}$ then $\privateMacro$`, options));
});

test('the Astro Sätteri processor retains math and its render plugin', () => {
  const processor = satteri(options);
  assert.equal(processor.name, 'satteri');
  assert.equal(processor.options.features.math, true);
  assert.equal(processor.options.hastPlugins[0].name, 'latent-light:math-typesetting');
});

test('Foundations equations are sequentially numbered and parse in the math unaware MDX scanner', async () => {
  const source = await readFile(new URL('../src/content/docs/architectures/foundations.mdx', import.meta.url), 'utf8');
  const blocks = [...source.matchAll(/<MathExpression display number="(\d+)" tex="([^"]*)" \/>/g)];
  assert.equal(blocks.length, 15);
  assert.equal((source.match(/<MathExpression display/g) ?? []).length, blocks.length);
  assert.deepEqual(blocks.map(match => match[1]), Array.from({length: 15}, (_, i) => String(i + 1)));
  assert.equal(blocks[0][2].trim(), String.raw`\operatorname{Attention}(Q,K,V)
=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V`);
  assert.doesNotMatch(source, /^> /m);
  assert.doesNotThrow(() => mdxToMdast(source, {features: {math: false}}));
  for (const [,number,tex] of blocks) {
    const expression = prepareMdxMath(tex, true, number);
    assert.equal(equationNumber(expression), number);
    const html = renderMath(expression, true);
    assert.match(html, /katex-display/);
    assert.match(html, /class="katex-tag"/);
  }
});

test('MDX math exports retain complete LaTeX and display mode', () => {
  const tex = String.raw`\frac{x}{\sqrt{d_k}}`;
  assert.equal(mathAsMarkdown.render({attrs: {tex}}), `$${tex}$`);
  assert.equal(mathAsMarkdown.render({attrs: {tex, display: true}}), `\n\n$$\n${tex}\n$$\n\n`);
  assert.equal(mathAsMarkdown.render({attrs: {tex, display: 'true'}}), `\n\n$$\n${tex}\n$$\n\n`);
  assert.equal(mathAsMarkdown.render({attrs: {tex, display: true, number: '12'}}), `\n\n$$\n${tex}\n\\tag{12}\n$$\n\n`);
  assert.equal(mathAsMarkdown.render({attrs: {tex, display: 'true', number: '12'}}), `\n\n$$\n${tex}\n\\tag{12}\n$$\n\n`);
  assert.throws(() => mathAsMarkdown.render({attrs: {}}), /static tex/);
});

test('MDX attributes require export-safe comparison notation', () => {
  assert.equal(validateMdxMath(String.raw`y_{\lt t}`), String.raw`y_{\lt t}`);
  assert.throws(() => validateMdxMath('y_{<t}'), /angle brackets/);
  assert.throws(() => mathAsMarkdown.render({attrs: {tex: 'x>0'}}), /angle brackets/);
});

test('numeric Markdown equation tags have matching anchors and accessible labels', () => {
  const {html} = markdownToHtml(String.raw`$$
a=b\tag{1}
$$`, options);
  assert.match(html, /class="katex-tag"/);
  assert.match(html, /application\/x-tex/);
  assert.match(html, /id="equation-1"/);
  assert.match(html, /data-equation-number="1"/);
  assert.match(html, /aria-label="Equation \(1\)"/);
  assert.doesNotMatch(html, /figure-1/);
});

test('number attributes reject ambiguous, inline, and conflicting numbering', () => {
  assert.equal(prepareMdxMath(' a=b ', true, '1'), 'a=b\n\\tag{1}');
  for (const number of ['0', '-1', '01', '1.5', '1a', '', ' 1 ', 1, null]) {
    assert.throws(() => prepareMdxMath('a=b', true, number), /positive integer string/);
  }
  assert.throws(() => prepareMdxMath('a=b', false, '1'), /Only display equations/);
  assert.throws(() => mathAsMarkdown.render({attrs: {tex: 'a=b', number: '1'}}), /Only display equations/);
  assert.throws(() => prepareMdxMath(String.raw`a=b\tag{1}`, true, '1'), /not both/);
  assert.throws(() => prepareMdxMath(String.raw`a=b\tag*{custom}`, true, '1'), /not both/);
});

test('equation anchors recognize standard numeric tags only', () => {
  assert.equal(equationNumber(String.raw`a=b\tag{12}`), '12');
  assert.equal(equationNumber(String.raw`a=b\tag {2}`), '2');
  for (const tex of [String.raw`a=b`, String.raw`a=b\tag{custom}`, String.raw`a=b\tag{01}`, String.raw`a=b\tag*{1}`]) {
    assert.equal(equationNumber(tex), undefined);
  }
});
