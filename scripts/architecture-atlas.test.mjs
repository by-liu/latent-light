import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {architectureAtlas, readArchitectureAtlas, architectureAtlasAsMarkdown} from '../plugins/architecture-atlas.mjs';

for (const [kind, figure] of Object.entries(architectureAtlas)) {
  test(`${kind} exports every panel, assumption and cited caption`, () => {
    const body = `<ArchitectureAtlas id="figure-1" kind="${kind}">\n**Figure 1.** Original mechanism illustration.[^source]\n</ArchitectureAtlas>\n\n[^source]: Official report.`;
    const markdown = renderEntryAsMarkdown({body, filePath:'atlas.mdx'}, {componentMap:{ArchitectureAtlas:architectureAtlasAsMarkdown.render}});
    assert.ok(markdown.includes(figure.title));
    for (const panel of figure.panels) {
      assert.ok(markdown.includes(panel.label));
      assert.ok(markdown.includes(panel.detail));
    }
    assert.ok(markdown.includes(figure.note));
    assert.match(markdown, /id="figure-1"/);
    assert.match(markdown, /\*\*Figure 1\.\*\* Original mechanism illustration\.\[\^source\]/);
    assert.match(markdown, /\[\^source\]: Official report/);
    assert.doesNotMatch(markdown, /ArchitectureAtlas|kind=/);
  });
}

test('atlas lookup rejects expressions and inherited properties', () => {
  for (const kind of [undefined, null, {}, 'constructor', '__proto__', 'process.exit()', 'unknown']) {
    assert.throws(() => readArchitectureAtlas(kind), /supported static kind/);
  }
  for (const id of [undefined, '', '1', 'figure 1', 'a" onclick="x']) {
    assert.throws(() => architectureAtlasAsMarkdown.render({attrs:{kind:'memory', id}}), /stable figure ID/);
  }
});

test('every evolution page has linked, numbered visuals and resolvable citations', () => {
  const directory = new URL('../src/content/docs/architectures/evolution/', import.meta.url);
  for (const filename of fs.readdirSync(directory).filter(name => name.endsWith('.mdx'))) {
    const body = fs.readFileSync(new URL(filename, directory), 'utf8');
    const figures = [...body.matchAll(/id="figure-(\d+)"/g)].map(match => Number(match[1]));
    assert.ok(figures.length > 0, filename + ': missing purposeful visual');
    assert.deepEqual(figures, figures.map((_, i) => i+1), filename + ': figure numbering');
    for (const number of figures) {
      assert.ok(body.includes(`**Figure ${number}.**`), filename + ': figure caption');
      assert.ok(body.includes(`(#figure-${number})`), filename + ': figure callout');
    }
    const defined = new Set([...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(match => match[1]));
    const cited = new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(match => match[1]));
    for (const name of cited) assert.ok(defined.has(name), filename + ': undefined citation ' + name);
    const equations = [...body.matchAll(/<MathExpression display number="(\d+)"/g)].map(match => Number(match[1]));
    assert.deepEqual(equations, equations.map((_, i) => i+1), filename + ': equation numbering');
  }
});
