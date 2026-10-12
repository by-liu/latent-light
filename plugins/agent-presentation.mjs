/** Static authored data shared by the rendered collection and its text exports. */
export function readAgentData(value, kind) {
  if (typeof value !== 'string') throw new Error(`Agent ${kind} requires static JSON text.`);
  let rows;
  try { rows = JSON.parse(value); } catch (cause) { throw new Error(`Invalid agent ${kind} JSON.`, {cause}); }
  if (!Array.isArray(rows) || !rows.length) throw new Error(`Agent ${kind} needs at least one entry.`);
  const fields = kind === 'cards' ? ['title', 'description', 'href'] : ['label', 'detail'];
  for (const row of rows) {
    for (const field of fields) if (typeof row?.[field] !== 'string' || !row[field].trim()) throw new Error(`Agent ${kind} ${field} must be text.`);
    if (kind === 'cards' && !/^\/agents\/(?:[a-z0-9-]+\/)*$/.test(row.href)) throw new Error('Agent card links must use an Agents page route.');
    if (kind === 'layers') {
      if (!Array.isArray(row.parts) || !row.parts.length) throw new Error('Agent layers need parts.');
      for (const part of row.parts) if (typeof part?.title !== 'string' || typeof part?.body !== 'string') throw new Error('Agent layer parts need title and body text.');
    }
  }
  return rows;
}

export const agentCardsAsMarkdown = {revision:'1', render({attrs}) {
  return '\n\n' + readAgentData(attrs.cardsJson, 'cards').map(card =>
    `**[${card.title}](${card.href})**${card.eyebrow ? ` — ${card.eyebrow}` : ''}\n\n${card.description}`).join('\n\n') + '\n\n';
}};

export const agentArchitectureAsMarkdown = {revision:'1', render({attrs, children}) {
  if (typeof attrs.id !== 'string' || !/^figure-\d+$/.test(attrs.id)) throw new Error('AgentArchitecture needs a figure-N anchor.');
  const parts = [`<a id="${attrs.id}"></a>`, `**${attrs.title}**`];
  if (attrs.subtitle) parts.push(attrs.subtitle);
  for (const layer of readAgentData(attrs.layersJson, 'layers')) {
    parts.push(`**${layer.label}**: ${layer.detail}`);
    parts.push(layer.parts.map(part => `- **${part.title}**: ${part.body}`).join('\n'));
  }
  if (attrs.footer) parts.push(attrs.footer);
  if (children) parts.push(children);
  return '\n\n' + parts.join('\n\n') + '\n\n';
}};

/** The overview keeps its complete map in one authored, exportable data value. */
export function readAgentLandscape(value) {
  const map = JSON.parse(value);
  const text = (row, fields) => {
    for (const field of fields) if (typeof row?.[field] !== 'string' || !row[field].trim()) throw new Error(`Agent landscape ${field} must be text.`);
    if (row.href && !/^\/agents\/(?:[a-z0-9-]+\/)*(?:#[a-z0-9-]+)?$/.test(row.href)) throw new Error('Agent landscape links must use an Agents page route.');
  };
  text(map, ['intent', 'harness', 'feedback', 'note']);
  for (const field of ['steps', 'capabilities', 'controls', 'families', 'frontier']) {
    if (!Array.isArray(map[field]) || !map[field].length) throw new Error(`Agent landscape needs ${field}.`);
    for (const row of map[field]) text(row, field === 'frontier' ? ['label', 'href'] : ['label', 'detail', 'href']);
  }
  for (const family of map.families) {
    if (!Array.isArray(family.examples) || !family.examples.length) throw new Error('Agent landscape families need examples.');
    for (const example of family.examples) text(example, ['label', 'href']);
  }
  return map;
}

export const agentLandscapeAsMarkdown = {revision:'1', render({attrs, children}) {
  if (typeof attrs.id !== 'string' || !/^figure-\d+$/.test(attrs.id)) throw new Error('AgentLandscape needs a figure-N anchor.');
  const map = readAgentLandscape(attrs.mapJson);
  const link = row => `[${row.label}](${row.href})`;
  const sections = [`<a id="${attrs.id}"></a>`, `**${attrs.title}**`, `**Human direction:** ${map.intent}`,
    `**How agent work unfolds:** ${map.harness}`,
    map.steps.map((row, i) => `${i + 1}. **${link(row)}**: ${row.detail}`).join('\n'),
    `**Feedback:** ${map.feedback}`,
    '**Inside the harness**\n\n' + map.capabilities.map(row => `- **${link(row)}**: ${row.detail}`).join('\n'),
    '**Across every step**\n\n' + map.controls.map(row => `- **${link(row)}**: ${row.detail}`).join('\n'),
    '**Where systems sit**\n\n' + map.families.map(row => `- **${link(row)}**: ${row.detail} Examples: ${row.examples.map(link).join(', ')}.`).join('\n'),
    '**Frontier questions**\n\n' + map.frontier.map(row => `- ${link(row)}`).join('\n'), map.note];
  if (children) sections.push(children);
  return '\n\n' + sections.join('\n\n') + '\n\n';
}};
