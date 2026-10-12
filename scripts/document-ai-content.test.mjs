import test from 'node:test';
import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import ts from 'typescript';
import {markdownToHtml} from 'satteri';
import {referenceHeading} from '../plugins/reference-heading.mjs';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {mathAsMarkdown,prepareMdxMath,renderMath} from '../plugins/math-typesetting.mjs';
import {modelFlowAsMarkdown,readModelLanes} from '../plugins/model-flow.mjs';
import {documentSystem,documentSystemAsMarkdown} from '../plugins/document-system.mjs';
import {comparisonTableAsMarkdown,prepareComparisonTable} from '../plugins/comparison-table.mjs';
const path='src/content/docs/document-ai.mdx';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');

test('Document AI preserves numbered references, diagrams and math in agent exports',async()=>{
 const body=await read(path);
 const md=renderEntryAsMarkdown({body,filePath:path},{componentMap:{MathExpression:mathAsMarkdown.render,ModelFlow:modelFlowAsMarkdown.render,DocumentSystem:documentSystemAsMarkdown.render,ComparisonTable:comparisonTableAsMarkdown.render}});
 const {html}=markdownToHtml(md,{hastPlugins:[referenceHeading()]});
 assert.equal((html.match(/<h2[^>]*>References<\/h2>/g)||[]).length,1,'The rendered page must have one References heading');
 assert.doesNotMatch(body,/^## References\s*$/m,'Native footnotes already generate the References heading');
 const definitions=[...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m=>m[1]);
 const used=[...new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(m=>m[1]))];
 assert.deepEqual([...definitions].sort(),used.sort());
 assert.equal(new Set(definitions).size,definitions.length);
 assert.doesNotMatch(body,/Eclipse|<Aside|<PaperFigure|FIGURE_NUMBER|EQUATION_NUMBER/);
 assert.doesNotMatch(md,/<ModelFlow|lanesJson=|<MathExpression|<DocumentSystem|<ComparisonTable/);
 assert.ok(md.includes(documentSystem.feedback));
 for(const stage of documentSystem.stages){assert.ok(md.includes(stage.label));assert.ok(md.includes(stage.output));for(const item of stage.items)assert.ok(md.includes(item));}
 const tables=[...body.matchAll(/<ComparisonTable ([^>]+)>([\s\S]*?)<\/ComparisonTable>/g)];
 assert.equal(tables.length,7);assert.equal(tables.filter(t=>/\bsearch(?:\s|$)/.test(t[1])).length,3);
 for(const table of tables)for(const line of table[2].trim().split("\n").filter(line=>line.startsWith("|")))assert.ok(md.includes(line),line);
 const figures=[...body.matchAll(/\*\*Figure (\d+)\./g)].map(m=>Number(m[1]));
 assert.deepEqual(figures,Array.from({length:14},(_,i)=>i+1));
 for(const n of figures){assert.ok(body.includes('id="figure-'+n+'"'));assert.ok(body.includes('](#figure-'+n+')'));assert.ok(md.includes('**Figure '+n+'.**'));}
 for(const [,json]of body.matchAll(/lanesJson='([^']+)'/g))for(const lane of readModelLanes(json)){
  for(const step of lane.steps){assert.ok(md.includes(step.label));if(step.detail)assert.ok(md.includes(step.detail));}
  if(lane.note)assert.ok(md.includes(lane.note));
 }
 const numbers=[];
 for(const [,attrs,tex]of body.matchAll(/<MathExpression\s+([^>]*?)tex="([^"]+)"\s*\/>/g)){
  const n=attrs.match(/number="(\d+)"/)?.[1],display=/\bdisplay\b/.test(attrs);
  if(n)numbers.push(Number(n));
  assert.match(renderMath(prepareMdxMath(tex,display,n),display,path),/class="katex/);
  assert.ok(md.includes(tex));
 }
 assert.deepEqual(numbers,Array.from({length:8},(_,i)=>i+1));
 for(const key of definitions)assert.ok(md.includes('[^'+key+']:'));
 for(const [,relative]of body.matchAll(/^import \w+ from '([^']+)';/gm))await access(new URL(relative,new URL('../'+path,import.meta.url)));
});

test('Document AI distinguishes availability, version contracts and conditional gains',async()=>{
 const body=await read(path);
 for(const value of ['TeleOCR','Xiaomi-OCR-0','LightOnOCR-3','HPD-Parsing','Nemotron Parse 2.0','Granite Docling','MinerU2.5-Pro','ColPali','OCR 4.1','32K','128K'])assert.ok(body.includes(value),value);
 assert.match(body,/checkpoint availability was not\nverified/);
 assert.match(body,/not a ceiling on later releases/);
 assert.match(body,/not the complete GRPO objective/);
 assert.match(body,/auxiliary[\s\S]+not loaded by the standard checkpoint/);
 assert.match(body,/Authorization|authorization/);
 assert.match(body,/October 7 model transition/);
 assert.match(body,/not an\nindependent model or service benchmark/);
 assert.doesNotMatch(body,/65[0-9a-f]{38}|2cba9e/);
});

test('Every report excerpt exists with a matching checksum and scoped rights record',async()=>{
 const assets=JSON.parse(await read('docs/research/document-ai/overview/figure-assets.json'));
 assert.equal(assets.length,10);
 const notice=await read('public/licenses/document-ai-figures.txt');
 for(const item of assets){
  const bytes=await readFile(new URL('../public'+item.public_path,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),item.asset_sha256);
  for(const field of ['url','figure','license','asset_sha256','pdf_sha256'])assert.ok(notice.includes(item[field]),item.name+' '+field);
 }
 assert.match(notice,/excluded from Latent Light's MIT license/);
 assert.match(notice,/criticism\/review assessment/);
 assert.match(notice,/arXiv's distribution license authorizes copying/);
 assert.match(notice,/CC BY-NC-ND 4.0/);
 assert.match(notice,/Derivative retains CC BY-SA 4.0/);
});

test('Document AI is a direct AI Technology page, not a new root section',async()=>{
 const config=await read('astro.config.ts');
 const source=ts.createSourceFile('astro.config.ts',config,ts.ScriptTarget.Latest,true);
 const prop=(node,name)=>node.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(source)===name)?.initializer;
 let technology,document;
 const visit=node=>{if(ts.isObjectLiteralExpression(node)){
  if(prop(node,'label')?.text==='AI Technology')technology=node;
  if(prop(node,'label')?.text==='Document AI')document=node;
 }ts.forEachChild(node,visit);};visit(source);
 assert.ok(technology&&document);
 assert.ok(prop(technology,'items').elements.includes(document));
 assert.equal(prop(document,'link').text,'/document-ai/');
});

test('Comparison table semantics preserve links, citations, column order and all rows',()=>{
 const citation='<sup><a href="#reference-1">1</a></sup>';
 const source='<div class="nb-table-scroll"><table><thead><tr><th>Model</th><th>Output</th></tr></thead><tbody><tr><td><a href="#model">Model A</a>'+citation+'</td><td>JSON &amp; boxes</td></tr><tr><td>Model B</td><td>Markdown</td></tr></tbody></table></div>';
 const result=prepareComparisonTable(source);
 assert.equal(result.rowCount,2);assert.equal(result.columns,2);
 assert.equal((result.content.match(/scope="col"/g)||[]).length,2);
 assert.equal((result.content.match(/scope="row"/g)||[]).length,2);
 assert.ok(result.content.includes('<a href="#model">Model A</a>'+citation));
 assert.ok(result.content.includes('<td>JSON &amp; boxes</td>'));
 assert.throws(()=>prepareComparisonTable(null),TypeError);
 const table='| Model | Output |\n| --- | --- |\n| Model A[^a] | JSON |';
 const md=comparisonTableAsMarkdown.render({attrs:{id:'model-table',title:'Models',search:true},children:table});
 assert.ok(md.includes(table));assert.match(md,/<a id="model-table"><\/a>/);
 assert.doesNotMatch(md,/input|Reset|search=true/);
 assert.doesNotMatch(comparisonTableAsMarkdown.render({attrs:{id:'bad" onclick="bad'},children:table}),/onclick/);
});
