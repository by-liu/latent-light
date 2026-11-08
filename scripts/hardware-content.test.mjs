import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {markdownToHtml} from 'satteri';
import {hardwareFigures,hardwareFigureAsMarkdown,circuitCurrent,circuitPower,timingStages,timingFrames} from '../plugins/hardware-foundations.mjs';
import {budgetDefinitions,defaultBudgetValues,calculateBudget,hardwareBudgetAsMarkdown} from '../plugins/hardware-budgets.mjs';
import {sourceFigureAsMarkdown} from '../plugins/source-figure.mjs';
import {comparisonTableAsMarkdown} from '../plugins/comparison-table.mjs';
import {mathAsMarkdown,prepareMdxMath,renderMath} from '../plugins/math-typesetting.mjs';
import {referenceHeading} from '../plugins/reference-heading.mjs';
const path='src/content/docs/hardware/index.mdx';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const componentMap={SourceFigure:sourceFigureAsMarkdown.render,HardwareFigure:hardwareFigureAsMarkdown.render,HardwareBudget:hardwareBudgetAsMarkdown.render,ComparisonTable:comparisonTableAsMarkdown.render,MathExpression:mathAsMarkdown.render};

test('Hardware estimates preserve bit, byte, decimal, binary and energy units',()=>{
 const sensor=calculateBudget('sensor',defaultBudgetValues('sensor'));
 assert.equal(sensor.value,82944000);assert.equal(sensor.primary,'82.944 MB/s');assert.equal(sensor.secondary,'663.552 Mbit/s of payload');
 const audioEquivalent=calculateBudget('sensor',{width:1,height:1,fps:16000,channels:1,bits:16});
 assert.equal(audioEquivalent.value,32000);
 const weights=calculateBudget('weights',defaultBudgetValues('weights'));
 assert.equal(weights.value,500000000);assert.equal(weights.primary,'0.5 GB');assert.equal(weights.secondary,'0.466 GiB of weight payload');
 assert.equal(calculateBudget('weights',{params:1,bits:8}).value,1000000);
 assert.equal(calculateBudget('battery',defaultBudgetValues('battery')).value,4.25);
 assert.equal(calculateBudget('battery',{energy:1,power:1,efficiency:100}).value,1);
 assert.equal(calculateBudget('battery',{energy:10,power:4,efficiency:85}).value,2.125);
 assert.equal(calculateBudget('sensor',{...defaultBudgetValues('sensor'),fps:60}).value,2*sensor.value);
});

test('Empty, nonfinite, impossible and fractional discrete inputs produce no numeric result',()=>{
 for(const d of budgetDefinitions)for(const f of d.fields){
  for(const invalid of ['', ' ',NaN,Infinity,-Infinity,null,undefined,0,-1,f.max+1]){
   const result=calculateBudget(d.key,{...defaultBudgetValues(d.key),[f.key]:invalid});
   assert.equal(result.ok,false,`${d.key}.${f.key}: ${String(invalid)}`);assert.ok(result.error);assert.equal(result.value,undefined);
  }
  for(const value of [f.min,f.max])assert.equal(calculateBudget(d.key,{...defaultBudgetValues(d.key),[f.key]:value}).ok,true);
  if(f.step===1)assert.equal(calculateBudget(d.key,{...defaultBudgetValues(d.key),[f.key]:1.5}).ok,false);
 }
 assert.throws(()=>calculateBudget('unknown',{}),/Unknown hardware budget/);
});

test('Illustrative sampling and worked calculations are internally consistent',()=>{
 for(let n=0;n<=8;n++)assert.ok(Math.abs(Math.cos(2*Math.PI*n/8)-Math.cos(2*Math.PI*7*n/8))<1e-13);
 assert.equal(1280*720*3*2,5529600);
 assert.equal(Math.max(1e9/1e12,200e6/10e9),.02);
 assert.equal(.1*1+.9*.01,.10900000000000001);
 assert.ok(Math.abs(3.3/4096*1000-.8056640625)<1e-12);
});

test('Every teaching figure exports its full meaning, assumptions, caption and citations',async()=>{
 const body=await read(path),md=renderEntryAsMarkdown({body,filePath:path},{componentMap});
 assert.ok(body.indexOf('**AI + software + hardware**')<body.indexOf('<SourceFigure'));
 assert.doesNotMatch(md,/<(?:SourceFigure|HardwareFigure|HardwareBudget|ComparisonTable|MathExpression)|kind="system"/);
 for(const d of Object.values(hardwareFigures)){
  for(const text of [d.title,d.intro,d.note])assert.ok(md.includes(text),text);
 }
 for(const f of hardwareFigures.system.flows)assert.ok(md.includes(f.detail));
 for(const l of hardwareFigures.memory.layers)assert.ok(md.includes(l.detail));
 assert.ok(md.includes(hardwareFigures.signal.explanation));
 for(const kind of ['circuit','chip','timing','memory'])assert.ok(md.includes(hardwareFigures[kind].explanation));
 for(const r of hardwareFigures.circuit.readouts)assert.ok(md.includes(r.value));
 for(const r of hardwareFigures.chip.roles)assert.ok(md.includes(r.detail));
 for(const f of timingFrames)assert.ok(md.includes('finish '+f.end+' ms; latency '+f.latency+' ms'));
 assert.ok(md.includes('**Image description:** Hardware 101:'));
 for(const phrase of ['Read the learning map','read a datasheet','estimate the budgets','first prototype','/figures/hardware/hardware-101-learning-map-v1.webp'])assert.ok(md.includes(phrase),phrase);
 for(const d of budgetDefinitions){assert.ok(md.includes(d.assumptions));assert.ok(md.includes(d.formula));assert.ok(md.includes(calculateBudget(d.key,defaultBudgetValues(d.key)).primary));}
 for(let i=1;i<=8;i++){assert.ok(md.includes(`<a id="figure-${i}"></a>`));assert.ok(md.includes(`**Figure ${i}.**`));assert.ok(body.includes(`](#figure-${i})`));}
 const defs=[...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m=>m[1]);
 const uses=[...new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(m=>m[1]))];
 assert.deepEqual(defs.sort(),uses.sort());
 for(const ref of defs)assert.ok(md.includes(`[^${ref}]:`));
 const {html}=markdownToHtml(md,{hastPlugins:[referenceHeading()]});
 assert.equal((html.match(/<h2[^>]*>References<\/h2>/g)||[]).length,1);
 assert.doesNotMatch(body,/^## References\s*$|TODO|REPLACE_|\/home\/lby\//m);
 const equations=[];
 for(const [,attrs,tex]of body.matchAll(/<MathExpression\s+([^>]*?)tex="([^"]+)"\s*\/>/g)){
  const number=attrs.match(/number="(\d+)"/)?.[1],display=/\bdisplay\b/.test(attrs);
  if(display)equations.push(Number(number));
  assert.match(renderMath(prepareMdxMath(tex,display,number),display,path),/class="katex/);
  assert.ok(md.includes(tex));
 }
 assert.deepEqual(equations,[1,2,3,4,5,6,7]);
 for(const phrase of ['STM32N657','8 MB of flash','sparse FP4','absolute maximum ratings','Ideal energy budget','not a fit prediction'])assert.ok(md.includes(phrase),phrase);
});


test('The circuit and pipeline drawings retain a consistent physical and timing model',()=>{
 assert.ok(Math.abs(circuitCurrent-.00033)<1e-15);
 assert.ok(Math.abs(circuitPower-.001089)<1e-15);
 assert.deepEqual(timingFrames.map(f=>[f.start,f.end,f.latency]),[[0,27,27],[12,39,27],[24,51,27]]);
 assert.equal(Math.max(...timingStages.map(s=>s.duration)),12);
 for(let i=1;i<timingFrames.length;i++){
  assert.equal(timingFrames[i].end-timingFrames[i-1].end,12);
  for(let stage=0;stage<timingStages.length;stage++)assert.ok(timingFrames[i-1].stages[stage].end<=timingFrames[i].stages[stage].start,'A dedicated stage must not process two frames at once');
 }
});
