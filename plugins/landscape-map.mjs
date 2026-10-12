/** Shared, static landscape data for human reading and complete agent exports. */
export function readLandscapeCards(value) {
  if (typeof value !== 'string') throw new Error('LandscapeMap needs static cardsJson text.');
  let cards;
  try { cards = JSON.parse(value); }
  catch (cause) { throw new Error('LandscapeMap cardsJson must be valid JSON.', {cause}); }
  if (!Array.isArray(cards) || !cards.length) throw new Error('LandscapeMap needs at least one card.');
  for (const card of cards) {
    for (const field of ['label', 'role', 'examples', 'question']) {
      if (!card || typeof card[field] !== 'string' || !card[field].trim()) {
        throw new Error(`LandscapeMap ${field} must be nonempty text.`);
      }
      if (/[\r\n<>]/.test(card[field])) throw new Error('LandscapeMap fields must be plain, single-line text.');
    }
  }
  return cards;
}

export const landscapeMapAsMarkdown = {
  revision: '1',
  render({attrs, children}) {
    const cards = readLandscapeCards(attrs.cardsJson);
    const anchor = typeof attrs.id === 'string' && /^figure-\d+$/.test(attrs.id)
      ? `<a id="${attrs.id}"></a>\n\n` : '';
    const parts = [anchor + `**${attrs.title ?? 'Landscape map'}**`];
    if (attrs.subtitle) parts.push(attrs.subtitle);
    for (const card of cards) {
      parts.push(`**${card.label}**\n\n${card.role}\n\nExamples: ${card.examples}.\n\nQuestion to test: ${card.question}`);
    }
    if (attrs.footer) parts.push(attrs.footer);
    if (children) parts.push(children);
    return '\n\n' + parts.join('\n\n') + '\n\n';
  },
};
