/** The authored card text is shared by HTML and the complete Markdown export. */
export function readTasteCards(value) {
  if (typeof value !== 'string') throw new Error('TasteVisual requires static cardsJson text.');
  let cards;
  try { cards = JSON.parse(value); }
  catch (cause) { throw new Error('TasteVisual cardsJson must be valid JSON.', {cause}); }
  if (!Array.isArray(cards) || !cards.length) throw new Error('TasteVisual needs cards.');
  for (const card of cards) {
    for (const field of ['label', 'headline', 'body']) {
      if (!card || typeof card[field] !== 'string' || !card[field].trim()) {
        throw new Error(`TasteVisual ${field} must be nonempty text.`);
      }
    }
    if (card.facts !== undefined && (!Array.isArray(card.facts) ||
      card.facts.some(fact => typeof fact !== 'string' || !fact.trim()))) {
      throw new Error('TasteVisual facts must be a list of nonempty text.');
    }
  }
  return cards;
}

export const tasteVisualAsMarkdown = {
  revision: '1',
  render({attrs, children}) {
    const cards = readTasteCards(attrs.cardsJson);
    const anchor = typeof attrs.id === 'string' && /^figure-\d+$/.test(attrs.id)
      ? `<a id="${attrs.id}"></a>\n\n` : '';
    const parts = [anchor + `**${attrs.title ?? 'Taste comparison'}**`];
    for (const card of cards) {
      parts.push(`**${card.label}**\n\n${card.headline.replaceAll('\n', ' ')}\n\n${card.body}`);
      if (card.facts?.length) parts.push(card.facts.map(fact => `- ${fact}`).join('\n'));
    }
    if (attrs.footer) parts.push(attrs.footer);
    if (children) parts.push(children);
    return '\n\n' + parts.join('\n\n') + '\n\n';
  },
};
