/** One content contract for the responsive figure and the complete agent export. */
export const documentSystem = {
 title: 'Document AI is a system.',
 subtitle: 'From a page to a trustworthy result, with its evidence intact.',
 stages: [
  {phase:'Input',label:'Documents',short:'Receive',tone:'teal',icon:'M8 3h8l4 4v14H8z M16 3v5h4 M11 12h6 M11 16h6 M4 7v14h3',items:['Digital PDFs and Office files','Scans, photos and handwriting','Tables, charts and mixed packets'],output:'Pages + source files'},
  {phase:'Perception',label:'Read the page',short:'Read',tone:'blue',icon:'M3 7V3h4 M17 3h4v4 M21 17v4h-4 M7 21H3v-4 M6 9h12 M6 13h7 M6 17h12',items:['Recognize text and regions','Recover reading order','Parse tables, formulas and figures'],output:'Text + layout'},
  {phase:'Representation',label:'Preserve meaning',short:'Preserve',tone:'indigo',icon:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z M10 6h4 M6 10v4 M18 10v4',items:['Keep hierarchy and typed blocks','Retain coordinates and table structure','Link chunks to source evidence'],output:'Structured document'},
  {phase:'Understanding',label:'Use the content',short:'Understand',tone:'violet',icon:'M3 4h18v13H9l-5 4v-4H3z M7 8h10 M7 12h7',items:['Classify and extract a schema','Retrieve evidence and answer','Summarize or reason across documents'],output:'Grounded task result'},
  {phase:'Action',label:'Operate safely',short:'Act',tone:'amber',icon:'M12 2l9 4v6c0 5-9 10-9 10S3 17 3 12V6z M8 12l3 3 5-6',items:['Validate fields and business rules','Accept, abstain or request review','Export with an audit trail'],output:'Accepted output'},
 ],
 checks: ['Corpus and slice evaluation','Field, structure and grounding checks','Risk-based human review','Cost, latency and drift monitoring'],
 feedback: 'Reviewed corrections → regression tests → deliberate updates to prompts, schemas, rules and routing.',
 note: 'Functional layers, not five required model calls. Classification and routing can happen earlier; difficult pages can take a specialist or VLM path. Corrections do not automatically become training data.',
};

export const documentSystemAsMarkdown = {
 revision:'1',
 render({attrs,children}) {
  const id = typeof attrs.id === 'string' && /^[a-z][\w-]*$/.test(attrs.id) ? '<a id="'+attrs.id+'"></a>\n\n' : '';
  const d=documentSystem;
  return '\n\n'+id+'**'+d.title+'**\n\n'+d.subtitle+'\n\n'+
   d.stages.map((s,i)=>(i+1)+'. **'+s.phase+' · '+s.label+'**: '+s.items.join('; ')+'. Output: '+s.output+'.').join('\n')+
   '\n\n**Reliability across every layer:** '+d.checks.join('; ')+'.\n\n'+d.feedback+'\n\n'+d.note+'\n\n'+(children||'')+'\n\n';
 },
};
