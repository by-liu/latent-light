import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {markdownToHtml} from 'satteri';
import {sourceFigureAsMarkdown} from '../plugins/source-figure.mjs';
import {modelFlowAsMarkdown,readModelLanes} from '../plugins/model-flow.mjs';
import {comparisonTableAsMarkdown} from '../plugins/comparison-table.mjs';
import {referenceHeading} from '../plugins/reference-heading.mjs';

test('Smart-device study preserves evidence, two figures and complete text exports',async()=>{
 const file='src/content/docs/local-cloud-ai/smart-devices-cloud-agents.mdx',body=await read(file);
 const md=renderEntryAsMarkdown({body,filePath:file},{componentMap:components});
 const {html}=markdownToHtml(md,{hastPlugins:[referenceHeading()]});
 assert.equal((html.match(/<h2[^>]*>References<\/h2>/g)||[]).length,1);
 assert.doesNotMatch(body,/^## References\s*$|Eclipse|\/home\/lby\/|TODO|FIGURE_NUMBER/m);
 assert.doesNotMatch(md,/<(?:ModelFlow|SourceFigure|ComparisonTable)|lanesJson=/);
 const definitions=[...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m=>m[1]);
 const uses=[...new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(m=>m[1]))];
 assert.equal(definitions.length,10);
 assert.deepEqual([...definitions].sort(),uses.sort());
 for(const d of definitions)assert.ok(md.includes('[^'+d+']:'));
 assert.deepEqual([...body.matchAll(/\*\*Figure (\d+)\./g)].map(m=>Number(m[1])),[1,2]);
 for(let n=1;n<=2;n++){
  assert.ok(body.includes('](#figure-'+n+')'));
  assert.ok(md.includes('<a id="figure-'+n+'"></a>'));
  assert.ok(md.includes('**Figure '+n+'.**'));
 }
 for(const [,json]of body.matchAll(/lanesJson='([^']+)'/g))for(const lane of readModelLanes(json)){
  assert.ok(md.includes(lane.label));assert.ok(md.includes(lane.note));
  for(const step of lane.steps){assert.ok(md.includes(step.label));assert.ok(md.includes(step.detail));}
 }
 for(const [id,count]of [['device-evidence',6],['device-evaluation',5]]){
  const table=body.match(new RegExp('<ComparisonTable id="'+id+'"[\\s\\S]*?<\\/ComparisonTable>'))[0];
  const rows=table.split('\n').filter(l=>l.startsWith('| '));
  assert.equal(rows.length-2,count);for(const row of rows)assert.ok(md.includes(row));
 }
 const src='/figures/local-cloud-ai/smart-devices-cloud-agents/device-hub-cloud.svg';
 const bytes=await readFile(new URL('../public'+src,import.meta.url));
 const folder='public'+src.slice(0,src.lastIndexOf('/'));
 assert.ok((await read(folder+'/SOURCES.md')).includes(createHash('sha256').update(bytes).digest('hex')));
 await access(new URL('../'+folder+'/NOTICE.md',import.meta.url));
 assert.ok(md.includes(']('+src+')'));assert.ok(md.includes('The text equivalent is:'));
 for(const text of ['**Device:**','**Phone or home hub, when used:**','**Cloud agent:**','**Return path:**','**Disconnection:**'])assert.ok(md.includes(text),text);
 for(const [,relative]of body.matchAll(/^import \w+ from '([^']+)';/gm))await access(new URL(relative,new URL('../'+file,import.meta.url)));
});

test('Smart-device examples do not imply unmeasured handset, privacy or product readiness',async()=>{
 const body=await read('src/content/docs/local-cloud-ai/smart-devices-cloud-agents.mdx');
 for(const text of ['simulated on a server GPU','RTX 3090 with 24 GB memory','44% with OCR text versus 78% with JPEG images','27.6% AndroidWorld success','54.3% for Agent S2','not a consumer cloud agent','not fully specified','does not establish where the visual inference executes','not a benchmark','future work','only the functions explicitly supported locally','not a ranking','not a measured implementation'])assert.ok(body.includes(text),text);
 for(const file of ['src/content/docs/local-cloud-ai/cloud-agents-local-specialists.mdx','src/content/docs/edge-ai/local-cloud-collaboration.mdx','astro.config.ts'])assert.ok((await read(file)).includes('/local-cloud-ai/smart-devices-cloud-agents/'),file);
});


const filePath='src/content/docs/local-cloud-ai/cloud-agents-local-specialists.mdx';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const components={SourceFigure:sourceFigureAsMarkdown.render,ModelFlow:modelFlowAsMarkdown.render,ComparisonTable:comparisonTableAsMarkdown.render};

test('Cloud specialist study preserves complete figures, references, contracts and comparisons',async()=>{
 const body=await read(filePath);
 const md=renderEntryAsMarkdown({body,filePath},{componentMap:components});
 const {html}=markdownToHtml(md,{hastPlugins:[referenceHeading()]});
 assert.equal((html.match(/<h2[^>]*>References<\/h2>/g)||[]).length,1);
 assert.doesNotMatch(body,/^## References\s*$/m);
 assert.doesNotMatch(body,/Eclipse|\/home\/lby\/|TODO|FIGURE_NUMBER/);
 assert.doesNotMatch(md,/<(?:ModelFlow|SourceFigure|ComparisonTable)|lanesJson=/);
 const definitions=[...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m=>m[1]);
 const uses=[...new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(m=>m[1]))];
 assert.equal(definitions.length,13);assert.equal(new Set(definitions).size,definitions.length);
 assert.deepEqual([...definitions].sort(),uses.sort());
 for(const d of definitions)assert.ok(md.includes('[^'+d+']:'));
 assert.deepEqual([...body.matchAll(/\*\*Figure (\d+)\./g)].map(m=>Number(m[1])),[1,2,3]);
 for(let n=1;n<=3;n++){assert.ok(body.includes('](#figure-'+n+')'));assert.ok(md.includes('<a id="figure-'+n+'"></a>'));assert.ok(md.includes('**Figure '+n+'.**'));}
 for(const [,attrs]of body.matchAll(/<SourceFigure\s+([^>]+)>/g)){
  const src=attrs.match(/src="([^"]+)"/)[1];
  assert.ok(src.startsWith('/figures/local-cloud-ai/'));assert.ok(attrs.match(/alt="([^"]+)"/)[1].length>70);
  const bytes=await readFile(new URL('../public'+src,import.meta.url));
  const folder='public'+src.slice(0,src.lastIndexOf('/'));
  const sources=await read(folder+'/SOURCES.md');
  assert.ok(sources.includes(createHash('sha256').update(bytes).digest('hex')));assert.ok(sources.includes(src.split('/').at(-1)));
  assert.ok(md.includes(']('+src+')'));await access(new URL('../'+folder+'/NOTICE.md',import.meta.url));
 }
 for(const [,json]of body.matchAll(/lanesJson='([^']+)'/g))for(const lane of readModelLanes(json)){
  assert.ok(md.includes(lane.label));assert.ok(md.includes(lane.note));for(const step of lane.steps){assert.ok(md.includes(step.label));assert.ok(md.includes(step.detail));}
 }
 for(const [,inner]of body.matchAll(/<ComparisonTable[^>]+>([\s\S]*?)<\/ComparisonTable>/g))for(const row of inner.split('\n').filter(l=>l.startsWith('| ')))assert.ok(md.includes(row));
 const contract=JSON.parse(body.match(/```json\n([\s\S]*?)\n```/)[1]);
 assert.deepEqual(contract.region_px,[100,200,600,300]);assert.equal(contract.disclosure,'host approval required');
 assert.ok(md.includes('"source_crop_handle": "crop-17"'));assert.ok(md.includes('not a published model output'));
 for(const [,relative]of body.matchAll(/^import \w+ from '([^']+)';/gm))await access(new URL(relative,new URL('../'+filePath,import.meta.url)));
});

test('Specialist evidence retains deployment and measurement caveats',async()=>{
 const body=await read(filePath);
 for(const text of ['not a ranking','not necessarily local','where inference runs','not proof of a cloud controller','not perception','not an on-device prediction','not a measured system','first-party recipe','not our reproduction','not a requirement of MCP','Schema validity is not factual correctness','not automatically resolvable','276.4 ms','128 samples','510 ms','762 ms'])assert.ok(body.includes(text),text);
 for(const [id,count]of [['specialist-evidence',8],['specialist-evaluation',5]]){
  const table=body.match(new RegExp('<ComparisonTable id="'+id+'"[\\s\\S]*?<\\/ComparisonTable>'))[0];
  assert.equal((table.match(/^\| /gm)||[]).length-2,count);
 }
 assert.ok((await read('src/content/docs/edge-ai/local-cloud-collaboration.mdx')).includes('(/local-cloud-ai/cloud-agents-local-specialists/)'));
});
