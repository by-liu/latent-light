/** Static media metadata is shared by the cards and complete text exports. */
export function readGalleryVideos(value) {
  const rows = JSON.parse(value);
  if (!Array.isArray(rows) || !rows.length) throw new Error('VideoGallery needs videos.');
  const ids = new Set();
  for (const row of rows) {
    for (const key of ['id', 'youtubeId', 'title', 'duration', 'description', 'poster', 'transcriptId']) {
      if (typeof row?.[key] !== 'string' || !row[key].trim()) throw new Error(`VideoGallery ${key} must be text.`);
    }
    if (!/^[a-z0-9-]+$/.test(row.id) || ids.has(row.id)) throw new Error('VideoGallery needs unique, stable video IDs.');
    ids.add(row.id);
    if (!/^[A-Za-z0-9_-]{11}$/.test(row.youtubeId)) throw new Error('VideoGallery needs a valid YouTube ID.');
    if (!/^\d+:\d{2}$/.test(row.duration)) throw new Error('VideoGallery needs a minutes:seconds duration.');
    if (!/^\/media\/[a-z0-9/-]+\.webp$/.test(row.poster)) throw new Error('VideoGallery posters must be local WebP assets.');
    if (!/^transcript-[a-z0-9-]+$/.test(row.transcriptId)) throw new Error('VideoGallery needs a transcript anchor.');
  }
  return rows;
}

export const videoWatchUrl = row => `https://www.youtube.com/watch?v=${row.youtubeId}`;

export const videoGalleryAsMarkdown = {revision: '1', render({attrs, children}) {
  if (typeof attrs.id !== 'string' || !/^[a-z0-9-]+$/.test(attrs.id)) throw new Error('VideoGallery needs a stable anchor.');
  const parts = [`<a id="${attrs.id}"></a>`];
  for (const row of readGalleryVideos(attrs.videosJson)) {
    parts.push(`<a id="video-${row.id}"></a>\n\n**[${row.title}](${videoWatchUrl(row)})** · ${row.duration}\n\n${row.description}\n\n[Read the transcript](#${row.transcriptId}).`);
  }
  if (children) parts.push(children);
  return '\n\n' + parts.join('\n\n') + '\n\n';
}};
