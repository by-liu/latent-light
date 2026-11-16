import test from 'node:test';
import assert from 'node:assert/strict';
import { readClipCatalog, getJensenClips, validateClips, clipsAsMarkdown } from '../plugins/jensen-clips.mjs';
import { parseClipRange, localClipOrigin, localJensenClips } from '../plugins/local-jensen-clips.mjs';

const catalog = await readClipCatalog();
test('unreleased clips do not enter production, including clips already shared on X', async () => {
  assert.ok(catalog.length >= 5);
  assert.equal(catalog.filter(clip => clip.sharedOnX).length, 2);
  assert.deepEqual(await getJensenClips({records:catalog.map(clip=>({...clip,release:null}))}), []);
  assert.equal(clipsAsMarkdown([]), '');
  assert.equal(localJensenClips().apply, 'serve');
});
test('local media access rejects foreign origins and non-loopback hosts', () => {
  const request = (host, origin) => ({ headers: { host, ...(origin ? { origin } : {}) } });
  assert.ok(localClipOrigin(request('localhost:14327', 'http://localhost:14327')));
  assert.ok(localClipOrigin(request('127.0.0.1:4327')));
  for (const item of [request('evil.example'), request('localhost.evil.example:4327'), request('127.0.0.1:4327', 'http://evil.example'), request('localhost:4327', 'http://localhost:14327'), request(undefined)]) assert.equal(localClipOrigin(item), false);
});
test('range requests support seeking without exposing bytes outside the file', () => {
  assert.equal(parseClipRange(undefined, 0), null);
  assert.deepEqual(parseClipRange('bytes=100-199', 1000), { start: 100, end: 199, partial: true });
  assert.deepEqual(parseClipRange('bytes=999-', 1000), { start: 999, end: 999, partial: true });
  assert.deepEqual(parseClipRange('bytes=-200', 1000), { start: 800, end: 999, partial: true });
  for (const value of ['bytes=-0', 'bytes=1000-', 'bytes=2-1', 'bytes=0-2,4-8', 'bytes=-', 'bytes=NaN-9', 'bytes=999999999999999999999-']) assert.equal(parseClipRange(value, 1000), null);
});
test('catalog rejects traversal, duplicate IDs and unsafe publication URLs', () => {
  for (const field of [{ previewDirectory: '../.aws' }, { previewVideo: '../../session-context.json' }, { sourceId: 'abc?autoplay' }, { xUrl: 'javascript:alert(1)' }]) assert.throws(() => validateClips([{ ...catalog[0], ...field }]));
  assert.throws(() => validateClips([catalog[0], catalog[0]]));
  const release = { rightsRecord: 'docs/research/people/jensen/clips/review.json', video: 'https://media.latentlit.com/video/jensen/clip.mp4', poster: 'https://media.latentlit.com/video/jensen/poster.webp', captions: 'https://media.latentlit.com/video/jensen/captions.vtt', transcript: ['Example transcript.'] };
  assert.doesNotThrow(() => validateClips([{ ...catalog[0], release }]));
  for (const field of [{ rightsRecord: null }, { transcript: [] }, { video: 'https://evil.example/clip.mp4' }, { video: 'https://user:password@media.latentlit.com/video/jensen/clip.mp4' }, { video: 'http://media.latentlit.com/video/jensen/clip.mp4' }]) assert.throws(() => validateClips([{ ...catalog[0], release: { ...release, ...field } }]));
});
test('text export retains video, source offset, captions and the complete transcript', () => {
  const clip = { ...catalog[0], video: 'https://media.latentlit.com/video/jensen/clip.mp4', captions: 'https://media.latentlit.com/video/jensen/captions.vtt', sourceUrl: 'https://www.youtube.com/watch?v=FGCP2F_7rQk&t=5087', transcript: ['First sentence.', 'Last sentence.'] };
  const md = clipsAsMarkdown([clip]);
  for (const text of [clip.title, clip.duration, clip.video, clip.sourceUrl, clip.captions, 'First sentence. Last sentence.']) assert.ok(md.includes(text));
  assert.doesNotMatch(md, /previewDirectory|output\/|undefined/);
});

test('a growing clip directory paginates after filtering and handles empty results', async () => {
  const {clipDirectoryPage} = await import('../plugins/clip-directory.mjs');
  const fixtures = ['JH007','JH001','JH004','JH006','JH005'].map(id => catalog.find(clip => clip.id === id));
  const many = Array.from({length:19}, (_,i) => ({...fixtures[i%fixtures.length],id:`test-${i}`}));
  const first = clipDirectoryPage(many);
  const second = clipDirectoryPage(many,{page:2});
  assert.equal(first.items.length,6); assert.equal(first.pageCount,4);
  assert.equal(new Set([...first.items,...second.items].map(c=>c.id)).size,12);
  const last = clipDirectoryPage(many,{page:999});assert.equal(last.page,4);assert.equal(last.items.length,1);
  const theme = clipDirectoryPage(many,{theme:'First Principles',page:3});assert.equal(theme.page,1);assert.ok(theme.items.every(c=>c.theme==='First Principles'));
  const search = clipDirectoryPage(many,{query:'trust difficult'});assert.equal(search.total,4);assert.ok(search.items.every(c=>c.theme==='Trust & Partnership'));
  const empty=clipDirectoryPage(many,{query:'no-such-moment'});assert.equal(empty.total,0);assert.equal(empty.page,1);assert.equal(empty.pageCount,1);
});


test('a fresh checkout without ignored media keeps the Jensen route usable', async () => {
  const { mkdtemp, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const previewRoot = await mkdtemp(join(tmpdir(), 'jensen-preview-empty-'));
  try {
    const pending=catalog.map(clip=>({...clip,release:null}));
    assert.deepEqual(await getJensenClips({ preview: true, previewRoot, records:pending }), []);
    const release={rightsRecord:'docs/research/people/jensen/clips/review.json',video:'https://media.latentlit.com/video/jensen/test/video.mp4',poster:'https://media.latentlit.com/video/jensen/test/poster.webp',captions:'https://media.latentlit.com/video/jensen/test/captions.vtt',transcript:['Test transcript.']};
    const available=await getJensenClips({preview:true,previewRoot,records:[{...pending[0],release},pending[1]]});
    assert.equal(available.length,1);assert.equal(available[0].video,release.video);
  }
  finally { await rm(previewRoot, { recursive: true, force: true }); }
});
