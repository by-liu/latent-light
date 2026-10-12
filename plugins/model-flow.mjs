/** A static JSON attribute keeps diagrams readable in HTML and agent exports. */
export function readModelLanes(value) {
  if (typeof value !== 'string') throw new Error('ModelFlow requires a static lanesJson attribute.');
  let lanes;
  try { lanes = JSON.parse(value); }
  catch (error) { throw new Error('ModelFlow lanesJson must contain valid JSON.', {cause: error}); }
  if (!Array.isArray(lanes) || !lanes.length) throw new Error('ModelFlow needs at least one lane.');
  for (const lane of lanes) {
    if (!lane || !Array.isArray(lane.steps) || !lane.steps.length) throw new Error('Every ModelFlow lane needs steps.');
    for (const field of ['label', 'note']) {
      if (lane[field] !== undefined && typeof lane[field] !== 'string') throw new Error(`ModelFlow ${field} must be text.`);
    }
    for (const step of lane.steps) {
      if (!step || typeof step.label !== 'string' || !step.label.trim()) throw new Error('Every ModelFlow step needs a text label.');
      if (step.detail !== undefined && typeof step.detail !== 'string') throw new Error('ModelFlow step detail must be text.');
      if (step.accent !== undefined && typeof step.accent !== 'boolean') throw new Error('ModelFlow accent must be boolean.');
    }
  }
  return lanes;
}

export const modelFlowAsMarkdown = {
  revision: '1',
  render({attrs, children}) {
    const lanes = readModelLanes(attrs.lanesJson);
    const anchor = typeof attrs.id === 'string' && /^[a-z][\w-]*$/.test(attrs.id)
      ? `<a id="${attrs.id}"></a>\n\n` : '';
    const parts = [anchor + `**${attrs.title ?? 'Model flow'}**`];
    for (const lane of lanes) {
      if (lane.label) parts.push(`**${lane.label}**`);
      parts.push(lane.steps.map((step, i) => `${i + 1}. **${step.label}**${step.detail ? `: ${step.detail}` : ''}`).join('\n'));
      if (lane.note) parts.push(lane.note);
    }
    if (typeof attrs.footer === 'string') parts.push(attrs.footer);
    if (children) parts.push(children);
    return '\n\n' + parts.join('\n\n') + '\n\n';
  },
};
