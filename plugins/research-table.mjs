/** The semantic table is canonical; interactive controls are reading aids only. */
export const researchTableAsMarkdown = {
  revision: '3',
  render({attrs,children}) {
    const id=attrs?.id;
    if(id!==undefined && !/^[a-z][a-z0-9-]*$/.test(id)) throw new Error('ResearchTable id must be a lowercase HTML anchor.');
    return '\n\n' + (id ? '<a id="'+id+'"></a>\n\n' : '') + (children ?? '') + '\n\n';
  },
};

/** Selected company footprints, never an exclusive market classification. */
export function readCompanyBases(value, rowCount) {
  if (value === undefined) return [];
  const bases = JSON.parse(value);
  if (!Array.isArray(bases) || bases.length !== rowCount ||
      bases.some(row => !Array.isArray(row) || row.some(base =>
        typeof base !== 'string' || !/^[A-Za-z .-]{1,40}$/.test(base)) ||
        new Set(row).size !== row.length)) {
    throw new Error('Company bases must be one array of distinct safe labels per row.');
  }
  return bases;
}
