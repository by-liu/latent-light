import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {yoloFigures,yoloBranches,yoloFigureAsMarkdown,featureLevels} from '../plugins/yolo-figures.mjs';
import {sourceFigureAsMarkdown} from '../plugins/source-figure.mjs';
import {comparisonTableAsMarkdown} from '../plugins/comparison-table.mjs';
import {mathAsMarkdown} from '../plugins/math-typesetting.mjs';
const path='src/content/docs/yolo/index.mdx';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const componentMap={YoloFigure:yoloFigureAsMarkdown.render,SourceFigure:sourceFigureAsMarkdown.render,ComparisonTable:comparisonTableAsMarkdown.render,MathExpression:mathAsMarkdown.render};

test('YOLO native visual meaning, source descriptions and numbered captions survive complete Markdown export',async()=>{
 const body=await read(path),md=renderEntryAsMarkdown({body,filePath:path},{componentMap});
 assert.doesNotMatch(md,/<(?:YoloFigure|SourceFigure|FocusCanvas|ComparisonTable|MathExpression)\b/);
 for(const figure of Object.values(yoloFigures))for(const text of [figure.title,figure.intro,figure.note,figure.explanation].filter(Boolean))assert.ok(md.includes(text),text);
 for(const branch of yoloBranches)for(const text of [branch.name,branch.team,branch.models,branch.idea,branch.href])assert.ok(md.includes(text),text);
 for(let n=1;n<=8;n++){assert.ok(md.includes(`<a id="figure-${n}"></a>`));assert.ok(md.includes(`**Figure ${n}.**`));assert.ok(body.includes(`](#figure-${n})`));}
 for(const asset of ['yolov10-dual-heads.webp','yolo26-training.webp'])assert.ok(md.includes('/figures/yolo/'+asset));
 assert.ok(md.includes('**Image description:** Original YOLO26 training pipeline'));
 const defs=[...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m=>m[1]);
 const uses=[...new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(m=>m[1]))];
 assert.equal(new Set(defs).size,defs.length);assert.deepEqual(defs.sort(),uses.sort());
 for(const ref of defs)assert.ok(md.includes(`[^${ref}]:`));
});

test('Spatial example and declared head contracts remain distinct in the explanatory export',()=>{
 assert.deepEqual(featureLevels.map(f=>[640/f.stride,f.width,f.count]),[[80,80,6400],[40,40,1600],[20,20,400]]);
 assert.equal(featureLevels.reduce((sum,f)=>sum+f.count,0),8400);
 assert.ok(yoloFigures.grid.explanation.includes('98 candidate boxes'));
 const atlas=yoloFigureAsMarkdown.render({attrs:{kind:'atlas',id:'figure-1'},children:''});
 assert.match(atlas,/YOLO26 released; YOLO27 preview with no public model artifacts;.*YOLOv14 paper withdrawn/);
 assert.match(atlas,/not a literal code ancestry tree/);
 assert.throws(()=>yoloFigureAsMarkdown.render({attrs:{kind:'unknown'}}),/Unknown YoloFigure/);
});

test('Model claims and paper/API differences retain citations and reviewed figure provenance',async()=>{
 const body=await read(path),notice=await read('public/figures/yolo/SOURCES.md');
 for(const text of ['nms=False','v8.4.208','detaches the features','floors sides below 16','40.1','56.9','Objects365-v1','not an\nexperiment run','withdrawn'])assert.ok(body.includes(text),text);
 for(const fig of ['2405.14458v1','2606.03748v1'])assert.ok(notice.includes(fig));
 assert.match(notice,/CC BY 4.0/);assert.match(notice,/embedded photograph/);assert.match(notice,/crop/);
 assert.doesNotMatch(body,/TODO|REPLACE_|\/home\/lby\//);
});
