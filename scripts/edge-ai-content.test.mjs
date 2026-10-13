import test from 'node:test';
import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {memoryTopology,socRoles} from '../docs/research/edge-ai/on-device-computing/visuals/diagrams.mjs';
import {cases,renderMemoryBudget} from '../docs/research/edge-ai/foundations/visuals/memory-budget.mjs';
import ts from 'typescript';
import {markdownToHtml} from 'satteri';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {referenceHeading} from '../plugins/reference-heading.mjs';
import {mathAsMarkdown,prepareMdxMath,renderMath} from '../plugins/math-typesetting.mjs';
import {modelFlowAsMarkdown,readModelLanes} from '../plugins/model-flow.mjs';
import {sourceFigureAsMarkdown} from '../plugins/source-figure.mjs';
import {comparisonTableAsMarkdown} from '../plugins/comparison-table.mjs';

const slugs=['index','foundations','on-device-computing','efficient-models','quantization-compression','training-small-models','efficient-inference','runtimes-compilers','multimodal','agents-hybrid-systems','evaluation-profiling','production-product-design'];
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');

for(const slug of slugs)test('Edge AI '+slug+' preserves references, figures and formulas in text exports',async()=>{
 const path='src/content/docs/edge-ai/'+slug+'.mdx',body=await read(path);
 if(body.includes('<ModelFlow'))assert.ok(body.includes("import ModelFlow from '../../../components/architectures/ModelFlow.astro';"),'ModelFlow requires an explicit MDX import');
 if(body.includes('<SourceFigure'))assert.ok(body.includes("import SourceFigure from '../../../components/architectures/SourceFigure.astro';"),'SourceFigure requires an explicit MDX import');
 const md=renderEntryAsMarkdown({body,filePath:path},{componentMap:{SourceFigure:sourceFigureAsMarkdown.render,MathExpression:mathAsMarkdown.render,ModelFlow:modelFlowAsMarkdown.render,ComparisonTable:comparisonTableAsMarkdown.render}});
 const {html}=markdownToHtml(md,{hastPlugins:[referenceHeading()]});
 assert.equal((html.match(/<h2[^>]*>References<\/h2>/g)||[]).length,1);
 assert.doesNotMatch(body,/^## References\s*$/m);
 const definitions=[...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m=>m[1]);
 const uses=[...new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(m=>m[1]))];
 assert.equal(new Set(definitions).size,definitions.length);
 assert.deepEqual(definitions.sort(),uses.sort());
 assert.doesNotMatch(body,/Eclipse|FIGURE_NUMBER|EQUATION_NUMBER|\/home\/lby\//);
 assert.doesNotMatch(md,/<ModelFlow|lanesJson=|<MathExpression|<ComparisonTable|<SourceFigure/);
 const figures=[...body.matchAll(/\*\*Figure (\d+)\./g)].map(m=>Number(m[1]));
 assert.ok(figures.length>0);
 assert.deepEqual(figures,Array.from({length:figures.length},(_,i)=>i+1));
 for(const n of figures){assert.ok(body.includes('id="figure-'+n+'"'));assert.ok(body.includes('](#figure-'+n+')'));assert.ok(md.includes('**Figure '+n+'.**'));}
 for(const [,json]of body.matchAll(/lanesJson='([^']+)'/g))for(const lane of readModelLanes(json)){
  for(const step of lane.steps){assert.ok(md.includes(step.label));if(step.detail)assert.ok(md.includes(step.detail));}
  if(lane.note)assert.ok(md.includes(lane.note));
 }
 const equations=[];
 for(const [,attrs,tex]of body.matchAll(/<MathExpression\s+([^>]*?)tex="([^"]+)"\s*\/>/g)){
  const n=attrs.match(/number="(\d+)"/)?.[1],display=/\bdisplay\b/.test(attrs);
  if(display){assert.ok(n,'Every display equation needs a number');equations.push(Number(n));}
  assert.match(renderMath(prepareMdxMath(tex,display,n),display,path),/class="katex/);
  assert.ok(md.includes(tex));
 }
 assert.deepEqual(equations,Array.from({length:equations.length},(_,i)=>i+1));
 const assets=[];
 for(const [,attrs,inner]of body.matchAll(/<SourceFigure\s+([^>]+)>([\s\S]*?)<\/SourceFigure>/g)){
  const src=attrs.match(/\bsrc="([^"]+)"/)?.[1],alt=attrs.match(/\balt="([^"]+)"/)?.[1];
  assert.ok(src?.startsWith('/figures/edge-ai/'),'Selected artwork must be local');
  assert.ok(alt?.length>50,'Every image needs an informative text equivalent');
  assert.ok(/minWidth=\{\d+\}/.test(attrs)||/\bposter\b/.test(attrs),'Dense figures need panning; the overview poster scales to fit');
  assert.ok(inner.includes(']('+src+')'),'Markdown image must match full-size image');
  assert.ok(md.includes(']('+src+')'),'Markdown retains selected figure');
  const bytes=await readFile(new URL('../public'+src,import.meta.url));
  const dir=src.slice(0,src.lastIndexOf('/')),sources=await read('public'+dir+'/SOURCES.md');
  assert.ok(sources.includes(src.split('/').at(-1)),'Exact artwork named in source record');
  assert.ok(sources.includes(createHash('sha256').update(bytes).digest('hex')),'Exact deployed bytes match provenance');
  await access(new URL('../public'+dir+'/NOTICE.md',import.meta.url));
  assets.push(src);
 }
 assert.ok(assets.length>0,'Every topic has a purposeful selected image');
 for(const [,relative]of body.matchAll(/^import \w+ from '([^']+)';/gm))await access(new URL(relative,new URL('../'+path,import.meta.url)));
});

test('Edge AI is a complete collection inside AI Technology',async()=>{
 const config=await read('astro.config.ts'),source=ts.createSourceFile('astro.config.ts',config,ts.ScriptTarget.Latest,true);
 const prop=(node,name)=>node.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(source)===name)?.initializer;
 let tech,edge;
 const visit=node=>{if(ts.isObjectLiteralExpression(node)){if(prop(node,'label')?.text==='AI Technology')tech=node;if(prop(node,'label')?.text==='Edge AI')edge=node;}ts.forEachChild(node,visit);};visit(source);
 assert.ok(tech&&edge);assert.ok(prop(tech,'items').elements.includes(edge));
 const links=prop(edge,'items').elements.map(node=>prop(node,'link')?.text);
 assert.deepEqual(links,slugs.map(s=>'/edge-ai/'+(s==='index'?'':s+'/')));
 const overview=await read('src/content/docs/edge-ai/index.mdx');
 for(const link of links.filter(l=>l!=='/edge-ai/'))assert.ok(overview.includes('('+link+')'),link);
 assert.ok((await read('src/content/docs/index.mdx')).includes('[Edge AI](/edge-ai/)'));
});

test('Foundations retains a transparent, calculated memory budget',async()=>{
 const body=await read('src/content/docs/edge-ai/foundations.mdx');
 for(const label of ['448 MiB','896 MiB','112 MiB','1.5 GB','1.83 GiB','50 ms','20 tokens/s'])assert.ok(body.includes(label),label);
 assert.match(body,/hypothetical calculations, not measurements/);
 assert.match(body,/not a device prediction/);
 assert.match(body,/bits per stored cache value/i);
 assert.equal(2*28*4096*8*128*16/8,448*2**20);
 assert.equal(2*28*8192*8*128*16/8,896*2**20);
 assert.equal(2*28*4096*2*128*16/8,112*2**20);
 assert.equal(1.5e9/30e9,0.05);
});

test('The original memory chart is reproducible and its quantities are not benchmarks',async()=>{
 assert.equal(await read('public/figures/edge-ai/foundations/memory-budget.svg'),renderMemoryBudget());
 assert.deepEqual(cases.map(c=>c.cacheMiB),[448,896,112]);
 assert.deepEqual(cases.map(c=>c.totalGiB.toFixed(2)),['1.83','2.27','1.51']);
 for(const c of cases)assert.equal(c.weightBytes,1.5e9);
 const notice=await read('public/licenses/edge-ai-figures.txt');
 for(const label of ['CC BY 4.0','BSD','criticism/review','AI-generated','excluded','MIT'])assert.ok(notice.includes(label));
});

test('The hardware companion retains its catalog, roadmap and software boundaries',async()=>{
 const body=await read('src/content/docs/edge-ai/on-device-computing.mdx');
 const catalog=body.match(/<ComparisonTable id="chip-explorer"[\s\S]*?<\/ComparisonTable>/)?.[0];
 assert.ok(catalog);assert.equal((catalog.match(/^\| \[/gm)||[]).length,19);
 for(const definition of ['neural processing unit','digital signal processor','image signal processor','transfers per second','0.6 TOPS'])assert.ok(body.includes(definition),definition);
 for(const figure of ['on-device-computing/memory-topologies.svg','on-device-computing/soc-roles.svg'])assert.ok((await read('public/licenses/edge-ai-figures.txt')).includes(figure));
 for(const topic of ['PC','Phone','Smart glasses','Camera','TV','Robot','Microcontroller'])assert.ok(catalog.includes(topic),topic);
 for(const text of ['Q1 2027','not our measurements','sparse FP4','sparse INT8','40 TOPS at INT4','20 TOPS at INT8','not an Apple Neural Engine','152.4 GB/s','40 ms','25 tokens/s'])assert.ok(body.includes(text),text);
 assert.equal(await read('public/figures/edge-ai/on-device-computing/memory-topologies.svg'),memoryTopology());
 assert.equal(await read('public/figures/edge-ai/on-device-computing/soc-roles.svg'),socRoles());
 assert.equal(9523e6*128/8/1e9,152.368);assert.equal(4e9/100e9,0.04);
});
