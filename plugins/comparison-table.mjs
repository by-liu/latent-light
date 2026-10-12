/** Enhance trusted, locally rendered Markdown without altering its cell content. */
export function prepareComparisonTable(source) {
 if(typeof source!=='string')throw new TypeError('ComparisonTable expects rendered Markdown HTML.');
 let rowCount=0;
 const content=source.replace(/<thead>([\s\S]*?)<\/thead>/g,(_,head)=>'<thead>'+head.replace(/<th(?=[ >])/g,'<th scope="col"')+'</thead>')
  .replace(/<tbody>([\s\S]*?)<\/tbody>/g,(_,body)=>'<tbody>'+body.replace(/<tr>([\s\S]*?)<\/tr>/g,(_,row)=>{
   rowCount++;
   return '<tr>'+row.replace(/<td([^>]*)>([\s\S]*?)<\/td>/, '<th scope="row"$1>$2</th>')+'</tr>';
  })+'</tbody>');
 const columns=(source.match(/<thead>[\s\S]*?<\/thead>/)?.[0].match(/<th[ >]/g)||[]).length;
 return {content,rowCount,columns};
}

/** Native Markdown is the table contract. Controls never filter agent exports. */
export const comparisonTableAsMarkdown = {
 revision:'1',
 render({attrs,children}) {
  const anchor = typeof attrs.id === 'string' && /^[a-z][\w-]*$/.test(attrs.id) ? '<a id="'+attrs.id+'"></a>\n\n' : '';
  return '\n\n'+anchor+(typeof attrs.title==='string'?'**'+attrs.title+'**\n\n':'')+(children||'')+'\n\n';
 },
};
