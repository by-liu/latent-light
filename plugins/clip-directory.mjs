/** Filter first, then paginate. The active player is independent of this directory. */
export function clipDirectoryPage(clips, { query = '', theme = 'all', page = 1, pageSize = 6 } = {}) {
  const terms = String(query).toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = clips.filter(clip => (theme === 'all' || clip.theme === theme) && terms.every(term => [clip.title, clip.description, clip.theme, clip.sourceTitle].join(' ').toLocaleLowerCase().includes(term)));
  const size = Math.max(1, Math.min(50, Math.trunc(pageSize) || 6));
  const pageCount = Math.max(1, Math.ceil(matches.length / size));
  const current = Math.max(1, Math.min(pageCount, Math.trunc(page) || 1));
  const offset = (current - 1) * size;
  return { items: matches.slice(offset, offset + size), page: current, pageCount, total: matches.length, start: matches.length ? offset + 1 : 0, end: Math.min(offset + size, matches.length) };
}
