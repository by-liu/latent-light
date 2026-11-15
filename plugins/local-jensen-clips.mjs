import { createReadStream } from 'node:fs';
import { lstat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { clipMediaRoot, clipPreviewFiles, clipPreviewPrefix, readClipCatalog } from './jensen-clips.mjs';

export function parseClipRange(header, size) {
  if (!Number.isSafeInteger(size) || size <= 0) return null;
  if (!header) return { start: 0, end: size - 1, partial: false };
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || (!match[1] && !match[2])) return null;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(size - 1, Number(match[2])) : size - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size || (!match[1] && Number(match[2]) === 0)) return null;
  return { start, end, partial: true };
}

export function localClipOrigin(request) {
  try {
    const host = request.headers.host;
    if (!host || !['localhost', '127.0.0.1', '[::1]'].includes(new URL(`http://${host}`).hostname)) return false;
    if (!request.headers.origin) return true;
    const origin = new URL(request.headers.origin);
    return ['http:', 'https:'].includes(origin.protocol) && origin.host === host;
  } catch { return false; }
}

export function localJensenClips() {
  return {
    name: 'latent-light:local-jensen-clips',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = (request.url || '').split('?')[0];
        if (!pathname.startsWith(clipPreviewPrefix)) return next();
        response.setHeader('Cache-Control', 'no-store');
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
        const end = code => { response.statusCode = code; response.end(); };
        if (!localClipOrigin(request)) return end(403);
        if (!['GET', 'HEAD'].includes(request.method)) { response.setHeader('Allow', 'GET, HEAD'); return end(405); }
        const match = /^\/__latent\/jensen-clips\/(JH\d{3})\/(video\.mp4|poster\.webp|captions\.vtt)$/.exec(pathname);
        if (!match) return end(404);
        try {
          const clip = (await readClipCatalog()).find(clip => clip.id === match[1]);
          if (!clip) return end(404);
          const file = clipPreviewFiles(clip)[match[2]];
          const [rootReal, fileReal, stats] = await Promise.all([realpath(clipMediaRoot), realpath(file), lstat(file)]);
          const relative = path.relative(rootReal, fileReal);
          if (!stats.isFile() || stats.isSymbolicLink() || relative.startsWith('..') || path.isAbsolute(relative)) return end(404);
          const range = parseClipRange(request.headers.range, stats.size);
          if (!range) { response.setHeader('Content-Range', `bytes */${stats.size}`); return end(416); }
          response.setHeader('Content-Type', { 'video.mp4': 'video/mp4', 'poster.webp': 'image/webp', 'captions.vtt': 'text/vtt; charset=utf-8' }[match[2]]);
          response.setHeader('Accept-Ranges', 'bytes');
          response.setHeader('Content-Length', range.end - range.start + 1);
          response.statusCode = range.partial ? 206 : 200;
          if (range.partial) response.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${stats.size}`);
          if (request.method === 'HEAD') return response.end();
          const stream = createReadStream(fileReal, { start: range.start, end: range.end });
          stream.on('error', () => response.destroy());
          response.on('close', () => stream.destroy());
          stream.pipe(response);
        } catch (error) { end(error.code === 'ENOENT' ? 404 : 500); }
      });
    },
  };
}
