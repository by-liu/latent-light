import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import catalog from '../src/data/jensen-clips.json' with { type: 'json' };

export const clipPreviewPrefix = '/__latent/jensen-clips/';
export const clipMediaRoot = fileURLToPath(new URL('../output/jensen-clips/', import.meta.url));
const safePart = /^[a-zA-Z0-9][a-zA-Z0-9.-]*$/;
const escapeMarkdown = text => text.replace(/[\\[\]<>]/g, '\\$&');

export function clipSourceUrl(clip) {
  return `https://www.youtube.com/watch?v=${clip.sourceId}&t=${Math.floor(clip.sourceStart)}`;
}

export function validateClips(clips) {
  const ids = new Set();
  for (const clip of clips) {
    if (!/^JH\d{3}$/.test(clip.id) || ids.has(clip.id)) throw new Error('Invalid or duplicate clip ID.');
    ids.add(clip.id);
    if (!/^[\w-]{11}$/.test(clip.sourceId) || !Number.isFinite(clip.sourceStart) || clip.sourceStart < 0) throw new Error('Invalid clip source.');
    if (!safePart.test(clip.previewDirectory) || !safePart.test(clip.previewVideo) || clip.previewDirectory.includes('..') || clip.previewVideo.includes('..') || !clip.previewVideo.endsWith('.mp4')) throw new Error('Invalid preview asset name.');
    if (!Number.isFinite(clip.seconds) || clip.seconds <= 0 || !/^\d+:\d{2}$/.test(clip.duration)) throw new Error('Invalid clip duration.');
    for (const field of ['title', 'description', 'theme', 'sourceTitle', 'sourcePublisher', 'sourceTime']) {
      if (typeof clip[field] !== 'string' || !clip[field].trim()) throw new Error(`Missing clip ${field}.`);
    }
    if (clip.xUrl && !/^https:\/\/x\.com\/[\w]+\/status\/\d+$/.test(clip.xUrl)) throw new Error('Invalid X post URL.');
    if (clip.release) {
      const release = clip.release;
      if (!/^docs\/research\/people\/jensen\/[a-zA-Z0-9/.-]+\.json$/.test(release.rightsRecord || '') || release.rightsRecord.includes('..')) throw new Error('A release needs a reuse review record.');
      for (const field of ['video', 'poster', 'captions']) {
        const url = new URL(release[field]);
        if (url.origin !== 'https://media.latentlit.com' || !url.pathname.startsWith('/video/jensen/') || url.username || url.password || url.search || url.hash) throw new Error('Invalid published clip asset URL.');
      }
      if (!Array.isArray(release.transcript) || !release.transcript.length || release.transcript.some(text => typeof text !== 'string' || !text.trim())) throw new Error('A release needs a complete transcript.');
    }
  }
  return clips;
}

export async function readClipCatalog() {
  return validateClips(structuredClone(catalog));
}

export function clipPreviewFiles(clip, mediaRoot = clipMediaRoot) {
  return {
    'video.mp4': path.join(mediaRoot, clip.previewDirectory, clip.previewVideo),
    'poster.webp': path.join(mediaRoot, 'web-preview', clip.id, 'poster.webp'),
    'captions.vtt': path.join(mediaRoot, 'web-preview', clip.id, 'captions.vtt'),
  };
}

export async function getJensenClips({ preview = false, previewRoot = clipMediaRoot, records } = {}) {
  const clips = records ? validateClips(structuredClone(records)) : await readClipCatalog();
  const result = [];
  for (const clip of clips) {
    const { previewDirectory, previewVideo, release, ...metadata } = clip;
    if (preview) {
      let cues;
      try {
        await Promise.all(Object.values(clipPreviewFiles(clip, previewRoot)).map(file => access(file)));
        cues = JSON.parse(await readFile(path.join(previewRoot, previewDirectory, 'captions.json'), 'utf8'));
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
      if (cues) {
        result.push({ ...metadata, video: `${clipPreviewPrefix}${clip.id}/video.mp4`, poster: `${clipPreviewPrefix}${clip.id}/poster.webp`, captions: `${clipPreviewPrefix}${clip.id}/captions.vtt`, transcript: cues.map(cue => cue.text.replace(/\s+/g, ' ').trim()), sourceUrl: clipSourceUrl(clip) });
        continue;
      }
    }
    if (release) result.push({ ...metadata, ...release, sourceUrl: clipSourceUrl(clip) });
  }
  return result;
}

export function clipsAsMarkdown(clips) {
  if (!clips.length) return '';
  return '\n## Short clips\n\nSmall moments. Lasting ideas. Edited excerpts with English captions.\n\n' + clips.map(clip =>
    `### ${escapeMarkdown(clip.title)}\n\n- Duration: ${clip.duration}\n- Theme: ${escapeMarkdown(clip.theme)}\n- Video: ${clip.video}\n- Captions: ${clip.captions}\n- Source: [${escapeMarkdown(clip.sourceTitle)}](${clip.sourceUrl}), ${escapeMarkdown(clip.sourcePublisher)}, ${clip.sourceTime}\n${clip.xUrl ? `- X post: ${clip.xUrl}\n` : ''}\n${escapeMarkdown(clip.description)}\n\n${clip.reviewNote ? `Context: ${escapeMarkdown(clip.reviewNote)}\n\n` : ''}Transcript, lightly edited for readability:\n\n${clip.transcript.map(escapeMarkdown).join(' ')}\n`
  ).join('\n') + '\n## Full conversations\n\n';
}
