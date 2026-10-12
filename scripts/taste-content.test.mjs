import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {readTasteCards, tasteVisualAsMarkdown} from '../plugins/taste-visual.mjs';
import {landscapeOverviewAsMarkdown} from '../plugins/landscape-overview.mjs';

const source = readFileSync(new URL('../src/content/docs/human-capabilities/taste.mdx', import.meta.url), 'utf8');
const figures = [...source.matchAll(/<TasteVisual\b([\s\S]*?)>([\s\S]*?)<\/TasteVisual>/g)];

test('the taste page exports every original comparison, caption, source and disclosure note', () => {
  const markdown = renderEntryAsMarkdown({body: source, filePath: 'taste.mdx'}, {
    componentMap: {TasteVisual: tasteVisualAsMarkdown.render, LandscapeOverview: landscapeOverviewAsMarkdown.render},
  });
  const prose = markdown.replace(/\s+/g, ' ');
  assert.equal(figures.length, 2);
  assert.ok(markdown.includes('id="figure-1"'));
  assert.ok(markdown.includes('**Figure 1.**'));
  assert.ok(markdown.includes('](/figures/human-capabilities/taste/overview-v3.webp)'));
  for (const phrase of [
    'AI expands the possibilities. Taste gives them direction.',
    'What is taste? Developed discernment: notice, choose and shape quality for a purpose, audience and point of view.',
    'Why it matters with AI: more options do not automatically mean better selection. Decide what to keep and improve.',
    'How to develop it: compare work in one domain. Explain your choices. Make, critique and revise. Seek informed feedback.',
    'Keep perspective: preference, expertise and status affect judgment. Context matters. Good choices can differ.',
    'Notice: recognize differences. Choose: judge fit. Refine: improve through feedback.',
    'Develop reasons for your choices. Stay open to revision.',
    '<summary>Read the overview</summary>',
    'Notice what matters, choose among alternatives, and refine work for a purpose, audience and point of view.',
    'Better generated options do not automatically mean better selection.',
    'Explain your choices, test them through making, and learn from informed feedback.',
    'Preference, expertise and status can all affect a judgment.',
    'Develop reasons for your choices while remaining open to revision.',
  ]) assert.ok(prose.includes(phrase), phrase);
  for (const [, attrs] of figures) {
    const id = attrs.match(/id="(figure-\d+)"/)[1];
    const cards = readTasteCards(attrs.match(/cardsJson='([^']+)'/)[1]);
    assert.ok(markdown.includes(`id="${id}"`));
    assert.ok(markdown.includes(`**Figure ${id.slice(7)}.**`));
    for (const card of cards) {
      for (const field of ['label', 'headline', 'body']) {
        assert.ok(markdown.includes(card[field].replaceAll('\n', ' ')), card[field]);
      }
      for (const fact of card.facts ?? []) assert.ok(markdown.includes(fact), fact);
    }
  }
  const definitions = [...source.matchAll(/^\[\^([^\]]+)\]:/gm)];
  assert.equal(definitions.length, 18);
  for (const [, key] of definitions) assert.ok(markdown.includes(`[^${key}]:`), key);
  assert.ok(prose.includes('Several things changed at once: wording, specificity, promise and tone.'));
  assert.ok(prose.includes('Those are design interpretations, not measured effects.'));
  assert.ok(prose.includes('The assembled approach has not been validated'));
  assert.doesNotMatch(markdown, /<TasteVisual|<LandscapeOverview|cardsJson=|kind="(?:overview|design|writing)"/);
});

test('the invitation comparison holds event facts and activity description constant', () => {
  const design = figures.find(([, attrs]) => attrs.includes('kind="design"'));
  assert.ok(design);
  const cards = readTasteCards(design[1].match(/cardsJson='([^']+)'/)[1]);
  assert.equal(cards.length, 2);
  assert.deepEqual(cards[0].facts, cards[1].facts);
  assert.equal(cards[0].body, cards[1].body);
  assert.notEqual(cards[0].headline, cards[1].headline);
});
