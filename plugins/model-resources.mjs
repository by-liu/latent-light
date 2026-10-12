function httpsUrl(value, label) {
  let url;
  try { url = new URL(value); } catch { throw new Error(`ModelResources ${label} must be a valid URL.`); }
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`ModelResources ${label} must use public HTTPS without credentials.`);
  return url;
}

export function readModelResources(attrs) {
  const report = httpsUrl(attrs.reportHref, 'reportHref');
  const model = httpsUrl(attrs.modelHref, 'modelHref');
  if (model.hostname !== 'huggingface.co' || !/^\/[^/]+\/[^/]+\/?$/.test(model.pathname)) {
    throw new Error('ModelResources modelHref must link to a Hugging Face model repository.');
  }
  if (typeof attrs.modelName !== 'string' || !attrs.modelName.trim()) throw new Error('ModelResources requires a readable modelName.');
  return [
    {kind:'report', href:report.href, label:attrs.reportLabel ?? 'Technical report', note:attrs.reportNote ?? 'Read the original research'},
    {kind:'model', href:model.href, label:'Hugging Face', note:attrs.modelName},
  ];
}

export const modelResourcesAsMarkdown = {
  revision:'1',
  render({attrs}) {
    return '\n\n' + readModelResources(attrs).map(x => `- [${x.label}](${x.href}): ${x.note}`).join('\n') + '\n\n';
  },
};
