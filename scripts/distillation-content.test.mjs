import test from 'node:test';
import assert from 'node:assert/strict';
import {access, readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import ts from 'typescript';
import {markdownToHtml} from 'satteri';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {referenceHeading} from '../plugins/reference-heading.mjs';
import {mathAsMarkdown, prepareMdxMath, renderMath} from '../plugins/math-typesetting.mjs';
import {modelFlowAsMarkdown, readModelLanes} from '../plugins/model-flow.mjs';
import {sourceFigureAsMarkdown} from '../plugins/source-figure.mjs';
import {comparisonTableAsMarkdown} from '../plugins/comparison-table.mjs';

const slugs=['index','foundations','modern-methods','llm-vlm-recipes','practice-evaluation'];
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const componentMap={SourceFigure:sourceFigureAsMarkdown.render,MathExpression:mathAsMarkdown.render,ModelFlow:modelFlowAsMarkdown.render,ComparisonTable:comparisonTableAsMarkdown.render};

for(const slug of slugs)test('Distillation '+slug+' retains cited figures, equations and complete text',async()=>{
 const path='src/content/docs/knowledge-distillation/'+slug+'.mdx',body=await read(path);
 const md=renderEntryAsMarkdown({body,filePath:path},{componentMap});
 const {html}=markdownToHtml(md,{hastPlugins:[referenceHeading()]});
 assert.equal((html.match(/<h2[^>]*>References<\/h2>/g)||[]).length,1);
 assert.doesNotMatch(body,/^## References\s*$/m);
 const definitions=[...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m=>m[1]);
 const uses=[...new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(m=>m[1]))];
 assert.equal(new Set(definitions).size,definitions.length);
 assert.deepEqual(definitions.sort(),uses.sort());
 assert.doesNotMatch(body,/Eclipse|REPLACE_|\/home\/lby\//);
 assert.doesNotMatch(md,/<ModelFlow|lanesJson=|<MathExpression|<ComparisonTable|<SourceFigure|slot="image"/);
 const figures=[...body.matchAll(/\*\*Figure (\d+)\./g)].map(m=>Number(m[1]));
 assert.ok(figures.length>0);assert.deepEqual(figures,figures.map((_,i)=>i+1));
 for(const n of figures){assert.ok(body.includes('id="figure-'+n+'"'));assert.ok(body.includes('](#figure-'+n+')'));assert.ok(md.includes('**Figure '+n+'.**'));assert.ok(md.includes('<a id="figure-'+n+'"></a>'));}
 const equations=[];
 for(const [,attrs,tex]of body.matchAll(/<MathExpression\s+([^>]*?)tex="([^"]+)"\s*\/>/g)){
  const number=attrs.match(/number="(\d+)"/)?.[1],display=/\bdisplay\b/.test(attrs);
  if(display){assert.ok(number);equations.push(Number(number));}
  assert.match(renderMath(prepareMdxMath(tex,display,number),display,path),/class="katex/);
  assert.ok(md.includes(tex),'Preserve exact TeX');
 }
 assert.deepEqual(equations,equations.map((_,i)=>i+1));
 for(const [,json]of body.matchAll(/lanesJson='([^']+)'/g))for(const lane of readModelLanes(json)){
  for(const step of lane.steps){assert.ok(md.includes(step.label));if(step.detail)assert.ok(md.includes(step.detail));}if(lane.note)assert.ok(md.includes(lane.note));
 }
 const sources=await read('public/figures/knowledge-distillation/SOURCES.md');
 for(const [,attrs,inner]of body.matchAll(/<SourceFigure\s+([^>]+)>([\s\S]*?)<\/SourceFigure>/g)){
  const src=attrs.match(/\bsrc="([^"]+)"/)?.[1],alt=attrs.match(/\balt="([^"]+)"/)?.[1];
  assert.ok(src?.startsWith('/figures/'));assert.ok(alt?.length>80);
  assert.ok(inner.includes(']('+src+')'));assert.ok(md.includes('**Image description:** '+alt));
  const bytes=await readFile(new URL('../public'+src,import.meta.url));
  assert.ok(sources.includes(src.split('/').at(-1)));
  assert.ok(sources.includes(createHash('sha256').update(bytes).digest('hex')),'Asset checksum matches provenance');
 }
 for(const [,relative]of body.matchAll(/^import \w+ from '([^']+)';/gm))await access(new URL(relative,new URL('../'+path,import.meta.url)));
});

test('Knowledge Distillation is one five-page collection inside AI Technology',async()=>{
 const config=await read('astro.config.ts'),source=ts.createSourceFile('astro.config.ts',config,ts.ScriptTarget.Latest,true);
 const prop=(node,name)=>node.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(source)===name)?.initializer;
 let tech,collection;const visit=node=>{if(ts.isObjectLiteralExpression(node)){if(prop(node,'label')?.text==='AI Technology')tech=node;if(prop(node,'label')?.text==='Knowledge Distillation')collection=node;}ts.forEachChild(node,visit);};visit(source);
 assert.ok(tech&&collection);assert.ok(prop(tech,'items').elements.includes(collection));
 const links=prop(collection,'items').elements.map(node=>prop(node,'link')?.text);
 assert.deepEqual(links,slugs.map(s=>'/knowledge-distillation/'+(s==='index'?'':s+'/')));
 const overview=await read('src/content/docs/knowledge-distillation/index.mdx');
 for(const link of links.slice(1))assert.ok(overview.includes('('+link+')'));
 assert.ok((await read('src/content/docs/index.mdx')).includes('(/knowledge-distillation/)'));
 assert.ok((await read('src/content/docs/edge-ai/training-small-models.mdx')).includes('(/knowledge-distillation/)'));
 for(const name of ['SOURCES','NOTICE'])await access(new URL('../public/figures/knowledge-distillation/'+name+'.md',import.meta.url));
});

test('Toy distributions and budget calculations are internally consistent',async()=>{
 const p=[.7,.29,.01],broad=[.45,.35,.2],concentrated=[.98,.01,.01];
 const kl=(p,q)=>p.reduce((sum,v,i)=>sum+v*Math.log(v/q[i]),0);
 assert.equal(kl(p,broad).toFixed(3),'0.225');assert.equal(kl(broad,p).toFixed(3),'0.466');
 assert.equal(kl(p,concentrated).toFixed(3),'0.741');assert.equal(kl(concentrated,p).toFixed(3),'0.296');
 assert.ok(kl(p,broad)<kl(p,concentrated));assert.ok(kl(broad,p)>kl(concentrated,p));assert.equal(kl(p,p),0);
 const softmax=(logits,t)=>{const e=logits.map(x=>Math.exp(x/t));return e.map(x=>x/e.reduce((a,b)=>a+b,0));};
 const svg=await read('public/figures/knowledge-distillation/soft-targets.svg');
 for(const temp of [1,3])for(const value of softmax([4,2,0,-2],temp))assert.ok(svg.includes((value*100).toFixed(1)+'%'));
 assert.equal(20e6*128000*2,5.12e12);assert.equal(20e6*256*6,30.72e9);assert.equal((2*1+8*3)/10,2.6);
 const foundation=await read('src/content/docs/knowledge-distillation/foundations.mdx');
 for(const value of ['0.225 nats','0.466 nats','0.741 nats','0.296 nats'])assert.ok(foundation.includes(value));
 const practice=await read('src/content/docs/knowledge-distillation/practice-evaluation.mdx');
 for(const value of ['5.12','30.72','2.6','not an executed training job','teacher_logits[:, :-1].detach()','response_mask[:, 1:]'])assert.ok(practice.includes(value));
});

test('Model recipes preserve the disclosure boundaries that change interpretation',async()=>{
 const body=await read('src/content/docs/knowledge-distillation/llm-vlm-recipes.mdx');
 for(const text of ['256 probability-weighted sampled logits','no student RL','text-only','over 40','1,800 GPU hours','17,920','incremental experiment costs','not a quality ranking','not necessarily'])assert.ok(body.includes(text),text);
 const methods=(await read('src/content/docs/knowledge-distillation/modern-methods.mdx')).replace(/\s+/g,' ');
 for(const text of ['student-generated but stale','not interchangeable','preprint','same text span','not a universal leaderboard'])assert.ok(methods.includes(text),text);
});
