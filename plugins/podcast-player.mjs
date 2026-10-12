/** Share authored podcast metadata between the player and full text exports. */
export function readPodcast(attrs) {
  for (const key of ['id', 'title', 'src', 'duration', 'transcriptId']) {
    if (typeof attrs[key] !== 'string' || !attrs[key].trim()) throw new Error(`PodcastPlayer ${key} must be text.`);
  }
  if (!/^[a-z0-9-]+$/.test(attrs.id) || !/^[a-z0-9-]+$/.test(attrs.transcriptId)) throw new Error('PodcastPlayer needs stable anchors.');
  const url = new URL(attrs.src);
  if (url.protocol !== 'https:' || url.hostname !== 'media.latentlit.com' || url.username || url.password || url.search || url.hash || !/^\/audio\/[a-z0-9/-]+\.mp3$/.test(url.pathname)) throw new Error('PodcastPlayer needs a published Latent Light MP3 URL.');
  if (!/^\d+:[0-5]\d$/.test(attrs.duration)) throw new Error('PodcastPlayer needs a minutes:seconds duration.');
  return attrs;
}

export const podcastPlayerAsMarkdown = {revision: '1', render({attrs, children}) {
  const p = readPodcast(attrs);
  return `\n\n<a id="${p.id}"></a>\n\n**[${p.title}](${p.src})** · ${p.duration}\n\n${children || ''}\n\n[Read the podcast transcript](#${p.transcriptId}) · [Open the MP3](${p.src})\n\n`;
}};
