import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, access} from 'node:fs/promises';
import ts from 'typescript';
import {createHash} from 'node:crypto';
import {companyIcons, findCompanyIcon, decorateCompanyCells} from '../plugins/company-icons.mjs';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {readLandscapeCards, landscapeMapAsMarkdown} from '../plugins/landscape-map.mjs';
import {researchTableAsMarkdown, readCompanyBases} from '../plugins/research-table.mjs';
import {landscapeOverviewAsMarkdown} from '../plugins/landscape-overview.mjs';

const slugs = ['consumer-ai', 'personal-agents', 'china-consumer-ai', 'physical-ai'];
const read = relative => readFile(new URL('../'+relative, import.meta.url), 'utf8');
const componentMap = {LandscapeMap:landscapeMapAsMarkdown.render, ResearchTable:researchTableAsMarkdown.render,LandscapeOverview:landscapeOverviewAsMarkdown.render};

test('LandscapeMap rejects malformed data and markup', () => {
  for (const value of [undefined, '{}', '[]', '[{"label":"Missing fields"}]',
    '[{"label":"<script>","role":"role","examples":"example","question":"question"}]']) {
    assert.throws(() => readLandscapeCards(value));
  }
});
test('LandscapeMap exports all labels, roles, examples, tests, notes and cited caption', () => {
  const cards = [{label:'Learn',role:'Practice with feedback.',examples:'Speak',question:'Does skill transfer?'}];
  const body = `<LandscapeMap id="figure-1" title="Needs" subtitle="Not a ranking" cardsJson='${JSON.stringify(cards)}' footer="Categories overlap.">\n\n**Figure 1.** Synthesis.[^source]\n\n</LandscapeMap>\n\n[^source]: Source. [Product](https://example.com).`;
  const markdown = renderEntryAsMarkdown({body,filePath:'map.mdx'},{componentMap});
  for (const text of ['figure-1','Needs','Not a ranking','Categories overlap.','Figure 1.','[^source]:',...Object.values(cards[0])]) assert.ok(markdown.includes(text),text);
  assert.doesNotMatch(markdown, /cardsJson|<LandscapeMap/);
});

for (const slug of slugs) test(`${slug}: figure and claim-local references survive exports`, async () => {
  const filePath = `src/content/docs/products-markets/landscapes/${slug}.mdx`;
  const body = await read(filePath);
  assert.match(body, /^---\ntitle: .+\ndescription: .+\nlastUpdated: \d{4}-\d{2}-\d{2}\n---/);
  assert.doesNotMatch(body, /Eclipse|recruiter|interview preparation/i);
  const defined = [...new Set([...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m=>m[1]))].sort();
  const cited = [...new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(m=>m[1]))].sort();
  assert.ok(defined.length >= 5);
  assert.deepEqual(cited,defined);
  const markdown = renderEntryAsMarkdown({body,filePath},{componentMap});
  const figure = body.match(/<LandscapeOverview id="(figure-\d+)"[\s\S]*?>([\s\S]*?)<\/LandscapeOverview>/);
  assert.ok(figure);
  assert.equal(figure[1],'figure-1');
  assert.match(figure[2],/\*\*Figure 1\.\*\*/);
  assert.ok(body.indexOf('## Landscape at a glance')<body.indexOf('## Company explorer'));
  const asset='/figures/landscapes/'+slug+'-overview-'+(slug==='physical-ai'?'v2':'v1')+'.webp';
  assert.ok(markdown.includes(asset));await access(new URL('../public'+asset,import.meta.url));
  assert.ok(body.includes('AI-generated illustration'));
  assert.match(markdown,/\| Lens \| What it does \| A useful test \|/);
  assert.ok(body.includes('](#figure-1)'));
  assert.ok(markdown.includes('<a id="figure-1"></a>'));
  for(const line of figure[2].replace(/<\/?div[^>]*>/g,'').split('\n').map(s=>s.trim()).filter(Boolean))assert.ok(markdown.includes(line),line);
  for (const citation of defined) assert.ok(markdown.includes(`[^${citation}]:`));
  assert.doesNotMatch(markdown, /<LandscapeMap|<LandscapeOverview|cardsJson=/);
  for (const [,relative] of body.matchAll(/^import \w+ from '([^']+)';/gm)) await access(new URL(relative,new URL('../'+filePath,import.meta.url)));
});

test('AI Landscapes is under Products & Markets, not AI Technology', async () => {
  const config = await read('astro.config.ts');
  const source = ts.createSourceFile('astro.config.ts',config,ts.ScriptTarget.Latest,true);
  const property = (node,name) => node.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(source)===name)?.initializer;
  let domain, landscapes, technology;
  const visit = node => {
    if(ts.isObjectLiteralExpression(node)) {
      if(property(node,'label')?.text==='Products & Markets') domain=node;
      if(property(node,'label')?.text==='AI Landscapes') landscapes=node;
      if(property(node,'label')?.text==='AI Technology') technology=node;
    }
    ts.forEachChild(node,visit);
  };
  visit(source);
  assert.ok(domain&&landscapes&&technology);
  assert.ok(property(domain,'items').elements.includes(landscapes));
  assert.ok(!property(technology,'items').elements.includes(landscapes));
  for (const slug of slugs) assert.ok(landscapes.getText(source).includes(`/products-markets/landscapes/${slug}/`));
  const hubPath='src/content/docs/products-markets/landscapes/index.mdx';
  const hub=await read(hubPath);
  const markdown=renderEntryAsMarkdown({body:hub,filePath:hubPath});
  for(const slug of slugs) assert.ok(markdown.includes(`/products-markets/landscapes/${slug}/`));
});

const expectedRows = {'consumer-ai':[36], 'personal-agents':[23], 'china-consumer-ai':[26], 'physical-ai':[52]};
for (const slug of slugs) test(slug+': complete company explorers and citations export without controls', async () => {
  const filePath='src/content/docs/products-markets/landscapes/'+slug+'.mdx';
  const body=await read(filePath);
  assert.match(body,/## Company explorer/);
  assert.match(body,/<ResearchTable id="company-directory"/);
  const tables=[...body.matchAll(/<ResearchTable[^>]*>([\s\S]*?)<\/ResearchTable>/g)].map(m=>m[1]);
  assert.deepEqual(tables.map(t=>t.trim().split('\n').length-2),expectedRows[slug]);
  const markdown=renderEntryAsMarkdown({body,filePath},{componentMap});
  assert.ok(markdown.includes('<a id="company-directory"></a>'));
  for(const table of tables) for(const row of table.trim().split('\n').slice(2)) {
    // All companies, caveats and claim-local citations survive. Filters never limit exports.
    assert.ok(markdown.includes(row),row.slice(0,90));
  }
  assert.doesNotMatch(markdown,/<ResearchTable|Search companies|All categories|No companies match/);
});
test('ResearchTable preserves native Markdown and has progressive-enhancement controls', async () => {
  const table='| Company | Category |\n| --- | --- |\n| [Example](https://example.com) | Learning |';
  const out=renderEntryAsMarkdown({body:'<ResearchTable label="Companies">\n\n'+table+'\n\n</ResearchTable>',filePath:'explorer.mdx'},{componentMap});
  assert.ok(out.includes(table));
  const anchored=researchTableAsMarkdown.render({attrs:{id:'company-directory'},children:table});
  assert.ok(anchored.includes('<a id="company-directory"></a>'));
  assert.ok(anchored.includes(table));
  assert.throws(()=>researchTableAsMarkdown.render({attrs:{id:'<script>'},children:table}));
  const component=await read('src/components/landscapes/ResearchTable.astro');
  for(const value of ['aria-live="polite"','role="region"','tabindex="0"','tools.hidden = false','input.focus()','tr[hidden]','@media print','position: sticky'])assert.ok(component.includes(value),value);
  assert.doesNotMatch(component,/--sl-color-/);
  const config=await read('astro.config.ts');assert.match(config,/ResearchTable: researchTableAsMarkdown/);
});

test('Physical AI retains the substantive study and evaluation limitations',async()=>{
  const body=await read('src/content/docs/products-markets/landscapes/physical-ai.mdx');
  for(const text of ['## Four boundaries worth keeping clear','## Follow one failure through the value chain','## Evaluation is becoming a product category','## Compare economics at the operator’s boundary','1,450','0.95','absolute success rates','## Open questions'])assert.ok(body.includes(text),text);
});


test('Landscapes include broad ecosystems and clarify current evidence limits',async()=>{
  const examples={
    'consumer-ai':['OpenAI / ChatGPT','Google / Gemini','Microsoft / Copilot','Meta / Meta AI','Apple / Apple Intelligence','Amazon / Alexa+'],
    'personal-agents':['ChatGPT agent','Gemini, Spark','explicit payment','invite-only'],
    'china-consumer-ai':['ByteDance','Tencent','Alibaba','Baidu','DeepSeek','Moonshot','MiniMax'],
    'physical-ai':['Google DeepMind','Amazon Robotics','Tesla / Optimus','Boston Dynamics / Atlas']
  };
  for(const [slug,labels] of Object.entries(examples)){
    const body=await read('src/content/docs/products-markets/landscapes/'+slug+'.mdx');
    for(const label of labels)assert.ok(body.includes(label),slug+' '+label);
  }
  const china=await read('src/content/docs/products-markets/landscapes/china-consumer-ai.mdx');
  assert.doesNotMatch(china,/outside this private-startup directory/);
  const cards=await read('src/components/landscapes/LandscapeCards.astro');
  assert.match(cards,/color-mix/);assert.match(cards,/nth-child\(4\)/);
  assert.doesNotMatch(cards,/--sl-color|animation:/);
  const hub=await read('src/content/docs/products-markets/landscapes/index.mdx');
  assert.match(hub,/<LandscapeCards>/);
});


test('Company marks preserve exact cell content, headers, other columns and citation anchors', () => {
  const content='<strong><a href="https://chatgpt.com/">OpenAI / ChatGPT</a></strong> — mixed <a href="#fn-openai" data-footnote-ref>1</a>';
  const html='<table><thead><tr><th>Company</th><th>Category</th></tr></thead><tbody><tr><td>'+content+'</td><td>Broad platforms</td></tr></tbody></table>';
  const result=decorateCompanyCells(html);
  assert.match(result,/data-company-mark="openai"/);
  assert.ok(result.includes('<span class="company-copy">'+content+'</span>'));
  assert.ok(result.includes('<td>Broad platforms</td>'));
  assert.ok(result.includes('<thead><tr><th>Company</th><th>Category</th></tr></thead>'));
  assert.match(result,/src="\/company-icons\/openai.png" width="24" height="24" alt="" loading="lazy" decoding="async"/);
  assert.match(result,/aria-hidden="true"/);
  assert.equal(decorateCompanyCells(result),result,'Idempotent decoration');
  assert.equal(findCompanyIcon('https://www.chatgpt.com/').id,'openai');
  assert.equal(findCompanyIcon('https://www.ycombinator.com/companies/one-robot').id,'one-robot');
  assert.equal(findCompanyIcon('https://www.ycombinator.com/companies/most-robotic').id,'most-robotic');
  assert.equal(findCompanyIcon('https://www.ycombinator.com/companies/another'),undefined,'No YC mark leakage');
  assert.equal(findCompanyIcon('javascript:alert(1)'),undefined);
  assert.equal(findCompanyIcon('https://chatgpt.com.attacker.example/'),undefined,'No substring host matching');
  assert.equal(decorateCompanyCells('<table><tr><td>Plain text</td></tr></table>'),'<table><tr><td>Plain text</td></tr></table>');
});

test('Unverified marks use escaped initials, not a guessed remote logo', () => {
  for(const [href,initials]of[['https://www.tesla.com/AI','TS'],['https://www.ycombinator.com/companies/one-robot','OR'],['https://unknown.example/','AB']]){
    const html='<table><tr><td><a href="'+href+'">Alpha Beta</a></td></tr></table>';
    const result=decorateCompanyCells(html);
    assert.ok(result.includes('company-initials">'+initials+'</span>'));
    assert.doesNotMatch(result,/<img/);
  }
});

test('Every explorer company has one reviewed identity mapping; assets match public provenance', async () => {
  const provenance=JSON.parse(await read('docs/branding/company-icons.json'));
  const records=provenance.assets;
  const keys=companyIcons.flatMap(icon=>icon.keys);
  assert.equal(new Set(keys).size,keys.length);
  assert.equal(new Set(companyIcons.map(icon=>icon.id)).size,companyIcons.length);
  assert.equal(records.length,companyIcons.length);
  for(const icon of companyIcons){
    assert.match(icon.id,/^[a-z0-9-]+$/);assert.ok(icon.initials.length>=1&&icon.initials.length<=2);
    const record=records.find(record=>record.id===icon.id);assert.ok(record);
    if(icon.asset){
      assert.match(icon.asset,/^\/company-icons\/[a-z0-9-]+\.png$/);
      const file=await readFile(new URL('../public'+icon.asset,import.meta.url));
      assert.equal(createHash('sha256').update(file).digest('hex'),record.sha256);
      assert.ok(record.sourceUrl.startsWith('https://'));assert.ok(record.reuseAssessment);
      assert.ok(record.identityReview.includes('reviewed'));
    }else assert.equal(record.status,'initials fallback');
  }
  for(const slug of slugs){
    const body=await read('src/content/docs/products-markets/landscapes/'+slug+'.mdx');
    const table=body.match(/<ResearchTable[^>]*>([\s\S]*?)<\/ResearchTable>/)[1];
    for(const row of table.trim().split('\n').slice(2)){
      const href=row.match(/\[[^\]]+\]\((https:\/\/[^)]+)\)/)[1];
      assert.ok(findCompanyIcon(href),slug+' '+href);
    }
    const markdown=renderEntryAsMarkdown({body,filePath:slug+'.mdx'},{componentMap});
    assert.doesNotMatch(markdown,/company-icons|company-identity|company-initials/,'Marks must not replace canonical exported text');
  }
});


test('Physical AI covers China and dated finance without collapsing entities or evidence states', async()=>{
 const body=await read('src/content/docs/products-markets/landscapes/physical-ai.mdx');
 for(const text of ['25 China-based or China-linked','Funding / ownership (dated)','AGIBOT','Galbot','Galaxea AI','Unitree','UBTECH','Spirit AI','Geek+','Hai Robotics','Robbyant','D-Robotics','SignalFlag','committed capital','share purchase agreements','amount and stage unverified','proposed public transaction ≠ listing','Current community-licensed materials','current round']) assert.ok(body.toLowerCase().includes(text.toLowerCase()),text);
 const rows=body.match(/<ResearchTable[^>]*>([\s\S]*?)<\/ResearchTable>/)[1].trim().split('\n').slice(2);
 const bases=readCompanyBases(body.match(/basesJson='([^']+)'/)[1],52);
 assert.equal(bases.filter(row=>row.includes('China')).length,25);
 assert.deepEqual(bases[rows.findIndex(row=>row.includes('Flexiv'))],['China','U.S.']);
 assert.ok(rows.every(row=>!row.includes('** · China')&&!row.includes('** · Global')));
 assert.ok(rows.every(row=>row.split('|').length===8),'Exactly six semantic columns');
 assert.doesNotMatch(body,/\]\(https:\/\/(?:www\.)?agibot\.cn|github\.com\/Galaxea-AI|guaranteed latest round:\s*Series/);
});

test('Every landscape separates finance from product status and keeps event dates', async()=>{
 for(const slug of slugs){
  const body=await read('src/content/docs/products-markets/landscapes/'+slug+'.mdx');
  const table=body.match(/<ResearchTable[^>]*>([\s\S]*?)<\/ResearchTable>/)[1].trim().split('\n');
  assert.match(table[0],/Funding \/ ownership \(dated\).*Evidence boundary \/ status/);
  assert.ok(table.every(row=>row.split('|').length===8),slug+' has exactly six columns');
 }
 const consumer=await read('src/content/docs/products-markets/landscapes/consumer-ai.mdx');
 for(const text of ['122B','Series H','65B','300M employee tender','not new company capital'])assert.ok(consumer.includes(text),text);
 const agents=await read('src/content/docs/products-markets/landscapes/personal-agents.mdx');
 for(const text of ['250M Series B','500M reported raise','37M cumulative','institutional liquidity','Current company facts explicitly name the stage'])assert.ok(agents.includes(text),text);
 const china=await read('src/content/docs/products-markets/landscapes/china-consumer-ai.mdx');
 for(const text of ['RMB80B','closing not confirmed','50B is valuation','IPO remains planned'])assert.ok(china.includes(text),text);
});
test('Optional base filter accepts multiple footprints, rejects malformed metadata',()=>{
 assert.deepEqual(readCompanyBases(undefined,2),[]);
 assert.deepEqual(readCompanyBases('[["China","U.S."],[]]',2),[['China','U.S.'],[]]);
 for(const value of ['{}','[]','[["<script>"],[]]','[["China","China"],[]]','["China",[]]'])assert.throws(()=>readCompanyBases(value,2));
});


test('Landscape overview reflects the explorers without redundant geography callouts', async () => {
  const filePath='src/content/docs/products-markets/landscapes/index.mdx';
  const hub=await read(filePath);
  const cards=[...hub.matchAll(/<Card title="([^"]+)">([\s\S]*?)<\/Card>/g)];
  assert.equal(cards.length,slugs.length);
  const markdown=renderEntryAsMarkdown({body:hub,filePath});
  for(const [index,slug] of slugs.entries()){
    const page=await read('src/content/docs/products-markets/landscapes/'+slug+'.mdx');
    const table=page.match(/<ResearchTable[^>]*>([\s\S]*?)<\/ResearchTable>/)[1];
    const count=table.trim().split('\n').length-2;
    assert.ok(cards[index][2].includes(String(count)+' compan'),slug+' count matches its explorer');
    assert.ok(cards[index][2].includes('/products-markets/landscapes/'+slug+'/'));
    assert.doesNotMatch(cards[index][2],/Chinese|China-linked|English and Chinese|regional and global/i);
    assert.ok(markdown.includes(cards[index][1]));
  }
  assert.match(hub,/funding and ownership their own\s+column, apart from product status/);
  assert.match(hub,/October 11, 2026/);
  for(const text of ['Historical rounds','Unknown means unverified','not unfunded','secondary share sales'])assert.ok(markdown.includes(text),text);
  assert.doesNotMatch(markdown,/<LandscapeCards|<CardGrid|<Card /);
});
