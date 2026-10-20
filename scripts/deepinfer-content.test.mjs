import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {markdownToHtml} from 'satteri';
import {sourceFigureAsMarkdown} from '../plugins/source-figure.mjs';
import {comparisonTableAsMarkdown} from '../plugins/comparison-table.mjs';
import {mathAsMarkdown,prepareMdxMath,renderMath} from '../plugins/math-typesetting.mjs';
import {referenceHeading} from '../plugins/reference-heading.mjs';
const path='src/content/docs/inference/deepinfer.mdx';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const componentMap={SourceFigure:sourceFigureAsMarkdown.render,ComparisonTable:comparisonTableAsMarkdown.render,MathExpression:mathAsMarkdown.render};

test('DeepInfer retains citations, six numbered figures, two equations and original source assets',async()=>{
 const body=await read(path),md=renderEntryAsMarkdown({body,filePath:path},{componentMap});
 const {html}=markdownToHtml(md,{hastPlugins:[referenceHeading()]});
 assert.equal((html.match(/<h2[^>]*>References<\/h2>/g)||[]).length,1);
 assert.doesNotMatch(body,/^## References\s*$|Eclipse|\/home\/lby\/|TODO|REPLACE_/m);
 assert.doesNotMatch(md,/<(?:SourceFigure|ComparisonTable|MathExpression)|slot="image"/);
 const defs=[...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m=>m[1]);
 const uses=[...new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(m=>m[1]))];
 assert.equal(defs.length,29);assert.deepEqual(defs.sort(),uses.sort());
 for(const d of defs)assert.ok(md.includes('[^'+d+']:'));
 const labels=[...body.matchAll(/\*\*Figure (\d+)\./g)].map(m=>Number(m[1]));
 assert.deepEqual(labels,[1,2,3,4,5,6]);
 assert.equal((body.match(/^## TL;DR$/gm)||[]).length,1);
 assert.ok(body.includes('## At a glance'));
 assert.ok(body.includes('AI-generated synthesis'));
 assert.ok(md.includes('Read the overview as text'));
 for(const detail of ['Selected for verification','Skipped draft suffix'])assert.ok((await read('docs/research/inference/deepinfer/visuals/overview-prompt.md')).includes(detail));
 const record=await read('public/figures/inference/deepinfer/SOURCES.md');
 for(const [,attrs,inner]of body.matchAll(/<SourceFigure\s+([^>]+)>([\s\S]*?)<\/SourceFigure>/g)){
  const src=attrs.match(/\bsrc="([^"]+)"/)[1],alt=attrs.match(/\balt="([^"]+)"/)[1],id=attrs.match(/\bid="([^"]+)"/)[1];
  assert.ok(alt.length>100);assert.ok(inner.includes(']('+src+')'));assert.ok(body.includes('](#'+id+')'));
  assert.ok(md.includes('<a id="'+id+'"></a>'));assert.ok(md.includes('**Image description:** '+alt));
  const bytes=await readFile(new URL('../public'+src,import.meta.url));
  assert.ok(record.includes(createHash('sha256').update(bytes).digest('hex')),src);
 }
 const eq=[];
 for(const [,attrs,tex]of body.matchAll(/<MathExpression\s+([^>]*?)tex="([^"]+)"\s*\/>/g)){
  const n=attrs.match(/number="(\d+)"/)?.[1],display=/\bdisplay\b/.test(attrs);
  if(display)eq.push(Number(n));
  assert.match(renderMath(prepareMdxMath(tex,display,n),display,path),/class="katex/);
  assert.ok(md.includes(tex));
 }
 assert.deepEqual(eq,[1,2]);
 for(const link of ['https://github.com/deepseek-ai/DeepInfer','https://github.com/deepseek-ai/deepseek-recipe'])assert.ok(md.includes(link));
 for(const [,relative]of body.matchAll(/^import \w+ from '([^']+)';/gm))await access(new URL(relative,new URL('../'+path,import.meta.url)));
 for(const file of ['public/licenses/deepinfer-Apache-2.0.txt','public/licenses/deepseek-recipe-MIT.txt','public/figures/inference/deepinfer/NOTICE.md'])await access(new URL('../'+file,import.meta.url));
 assert.ok((await read('public/licenses/deepseek-recipe-MIT.txt')).includes('Copyright (c) 2026 DeepSeek'));
 assert.doesNotMatch(body.replace(/\]\([^)]+\)/g,'](source)'),/\b[a-f0-9]{40}\b/);
});

test('DeepInfer preserves measurement and release boundaries',async()=>{
 const body=await read(path);
 for(const s of ['No checkpoint, kernel or performance experiment was run','does **not** mean the engine has no KV cache','a claim that DeepInfer','not a controlled leaderboard','approximation','140 tokens','maximum backtracking','not equivalence between bounded replay and exact','75% per-token acceptance','3.25 tokens per step','4,096 requests','full acceptance','−1.5%','+5.4%','+11.0%','Revenue is not','not best-of-32','mock inference','no authentication','trust_remote_code','not an online SLA','not a laptop quick start'])assert.ok(body.includes(s),s);
 assert.equal(1+3*.75,3.25);assert.equal(64*64,4096);
 const table=body.match(/<ComparisonTable id="deepinfer-verification"[\s\S]*?<\/ComparisonTable>/)[0];
 assert.equal((table.match(/^\| /gm)||[]).length-2,3);
 for(const file of ['astro.config.ts','src/content/docs/edge-ai/efficient-inference.mdx','src/content/docs/architectures/models/deepseek-v4-1-flash.mdx'])assert.ok((await read(file)).includes('/inference/deepinfer/'),file);
});

test('Published Python and shell recipes parse without executing upstream code',async()=>{
 const body=await read(path);let count=0;
 for(const [,lang,code]of body.matchAll(/~~~(python|bash)\n([\s\S]*?)\n~~~/g)){
  const result=lang==='python'?spawnSync('python3',['-c','import ast,sys; ast.parse(sys.stdin.read())'],{input:code,encoding:'utf8'}):spawnSync('bash',['-n'],{input:code,encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);count++;
 }
 assert.equal(count,4);
});
