import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {videoGalleryAsMarkdown,readGalleryVideos} from '../plugins/video-gallery.mjs';
import {modelFlowAsMarkdown} from '../plugins/model-flow.mjs';
import {podcastPlayerAsMarkdown,readPodcast} from '../plugins/podcast-player.mjs';

const path='src/content/docs/human-capabilities/high-agency.mdx';
const source=await readFile(new URL('../'+path,import.meta.url),'utf8');
const json=source.match(/videosJson='([^']+)'/)[1];
const videos=readGalleryVideos(json);

test('High Agency media exports every video, transcript, duration and qualification',()=>{
  const md=renderEntryAsMarkdown({body:source,filePath:path},{componentMap:{VideoGallery:videoGalleryAsMarkdown.render,ModelFlow:modelFlowAsMarkdown.render,PodcastPlayer:podcastPlayerAsMarkdown.render}});
  assert.equal(videos.length,3);
  assert.deepEqual(videos.map(x=>x.youtubeId),['9WYUuK28iNk','9n5E-vKVKBA','jkz5TDyKO48']);
  for(const video of videos){
    assert.ok(md.includes(`[${video.title}](https://www.youtube.com/watch?v=${video.youtubeId})`));
    assert.ok(md.includes(video.duration));assert.ok(md.includes(video.description));
    assert.ok(md.includes(`<a id="${video.transcriptId}"></a>`));
  }
  for(const phrase of ['generated with Google','four-step loop is a practice aid','AI critique can help improve a draft','Your goal isn’t running a massive event','It cannot tell you if your actual neighbors','True agency isn’t about stubbornly forcing']) {
    assert.ok(md.replace(/\s+/g,' ').includes(phrase),phrase);
  }
  assert.equal((md.match(/<summary>Transcript:/g)||[]).length,3);
  for(const [,key]of source.matchAll(/^\[\^([^\]]+)\]:/gm))assert.ok(md.includes(`[^${key}]:`));
  assert.doesNotMatch(md,/<VideoGallery|videosJson=|<template|<iframe/);
});

test('the opening podcast exports its playable URL, disclosure and complete transcript',()=>{
  const md=renderEntryAsMarkdown({body:source,filePath:path},{componentMap:{PodcastPlayer:podcastPlayerAsMarkdown.render,VideoGallery:videoGalleryAsMarkdown.render,ModelFlow:modelFlowAsMarkdown.render}});
  assert.ok(source.indexOf('<PodcastPlayer ')<source.indexOf('<SourceFigure'));
  assert.ok(md.includes('[High Agency: Your superpower in the AI era](https://media.latentlit.com/audio/high-agency/high-agency-your-superpower-in-the-ai-era-v1.mp3)'));
  assert.ok(md.includes('25:03'));
  assert.ok(md.includes('Created with Google NotebookLM'));
  assert.ok(md.includes('id="podcast-transcript"'));
  assert.ok(md.includes('Automatically transcribed from the supplied recording'));
  assert.ok(md.includes('You know, there'));
  assert.ok(md.includes('something to think about the next time you hit generate'));
  assert.ok(md.indexOf('**[High Agency: Your superpower in the AI era]')<md.indexOf('**Figure 1.**'));
  assert.doesNotMatch(md,/<PodcastPlayer|<audio|<source /);
});

test('podcast metadata rejects unpublished or injected playback URLs',()=>{
  const attrs={id:'agency-podcast',title:'Podcast',src:'https://media.latentlit.com/audio/high-agency/test-v1.mp3',duration:'25:03',transcriptId:'podcast-transcript'};
  assert.equal(readPodcast(attrs).src,attrs.src);
  for(const field of [{src:'javascript:alert(1)'},{src:'https://example.com/track.mp3'},{duration:'25:99'},{id:'bad" id'}])assert.throws(()=>readPodcast({...attrs,...field}));
});

test('all video posters are local publication assets',async()=>{
  for(const video of videos)await access(new URL('../public'+video.poster,import.meta.url));
});

test('media metadata rejects injected identifiers and remote poster URLs',()=>{
  const invalid=field=>JSON.stringify([{...videos[0],...field}]);
  for(const data of [{youtubeId:'id?autoplay=1'},{poster:'https://example.com/track.webp'},{transcriptId:'javascript:alert(1)'}])assert.throws(()=>readGalleryVideos(invalid(data)));
  assert.throws(()=>readGalleryVideos(JSON.stringify([videos[0],videos[0]])));
});
