/** Elementary unit-aware estimates, shared by SSR, the browser and exports. */
const number = new Intl.NumberFormat('en-US',{maximumFractionDigits:3});
export const budgetDefinitions = [
 {key:'sensor',label:'Sensor stream',title:'How much data arrives?',fields:[
  {key:'width',label:'Width · pixels',value:1280,min:1,max:100000,step:1},
  {key:'height',label:'Height · pixels',value:720,min:1,max:100000,step:1},
  {key:'fps',label:'Frames / second',value:30,min:.001,max:100000,step:'any'},
  {key:'channels',label:'Channels / pixel',value:3,min:1,max:64,step:1},
  {key:'bits',label:'Bits / channel',value:8,min:1,max:64,step:1}],
  formula:'width × height × frames/s × channels × bits/channel ÷ 8',
  assumptions:'Tightly packed, uncompressed payload. Excludes row padding, blanking, headers and link overhead. A sensor’s RAW format can differ from RGB.'},
 {key:'weights',label:'Model weights',title:'What is the weight payload?',fields:[
  {key:'params',label:'Parameters · millions',value:1000,min:.001,max:10000000,step:'any'},
  {key:'bits',label:'Bits / parameter',value:4,min:1,max:64,step:1}],
  formula:'parameters × bits/parameter ÷ 8',
  assumptions:'Ideal packed payload with one bit width. Excludes scales, zero points, padding, unquantized tensors, activations, KV state, workspace and runtime. This is not a fit prediction.'},
 {key:'battery',label:'Battery energy',title:'How long could the energy last?',fields:[
  {key:'energy',label:'Nominal energy · Wh',value:10,min:.001,max:1000000,step:'any'},
  {key:'power',label:'Average load · W',value:2,min:.001,max:1000000,step:'any'},
  {key:'efficiency',label:'Conversion efficiency · %',value:85,min:.001,max:100,step:'any'}],
  formula:'nominal energy × conversion efficiency ÷ average regulated-load power',
  assumptions:'Ideal energy budget with constant or representative average load and one assumed conversion efficiency. Excludes battery aging, temperature, cutoff, self-discharge and uncounted loads. It does not check peak current or thermal feasibility.'},
];
export function defaultBudgetValues(key) {
 const d=budgetDefinitions.find(d=>d.key===key);
 if(!d) throw new Error('Unknown hardware budget: '+key);
 return Object.fromEntries(d.fields.map(f=>[f.key,f.value]));
}
/**
 * @param {string} key
 * @param {Record<string, unknown>} values
 * @returns {{ok:false,error:string}|{ok:true,value:number,unit:string,primary:string,secondary:string}}
 */
export function calculateBudget(key, values) {
 const d=budgetDefinitions.find(d=>d.key===key);
 if(!d) throw new Error('Unknown hardware budget: '+key);
 for(const f of d.fields) {
  const raw=values[f.key];
  const v=typeof raw==='number'?raw:typeof raw==='string'&&raw.trim()!==''?Number(raw):NaN;
  if(!Number.isFinite(v)||v<f.min||v>f.max||f.step===1&&!Number.isInteger(v)) return {ok:false,error:'Enter valid values within the shown ranges. Whole numbers are required for pixels, channels and bits.'};
 }
 const v=Object.fromEntries(d.fields.map(f=>[f.key,Number(values[f.key])]));
 if(key==='sensor') {
  const bytes=v.width*v.height*v.fps*v.channels*v.bits/8;
  return {ok:true,value:bytes,unit:'B/s',primary:number.format(bytes/1e6)+' MB/s',secondary:number.format(bytes*8/1e6)+' Mbit/s of payload'};
 }
 if(key==='weights') {
  const bytes=v.params*1e6*v.bits/8;
  return {ok:true,value:bytes,unit:'B',primary:number.format(bytes/1e9)+' GB',secondary:number.format(bytes/2**30)+' GiB of weight payload'};
 }
 const hours=v.energy*v.efficiency/100/v.power;
 return {ok:true,value:hours,unit:'h',primary:number.format(hours)+' hours',secondary:'Ideal energy budget, not measured runtime'};
}
export const hardwareBudgetAsMarkdown={
 revision:'1',render({attrs,children}) {
  const anchor=typeof attrs.id==='string'&&/^figure-\d+$/.test(attrs.id)?'<a id="'+attrs.id+'"></a>\n\n':'';
  return '\n\n'+anchor+'**Three hardware budgets**\n\n'+budgetDefinitions.map(d=>{
   const r=calculateBudget(d.key,defaultBudgetValues(d.key));
   return '**'+d.label+' · '+d.title+'**\n\nInputs: '+d.fields.map(f=>f.label+' = '+f.value).join('; ')+'.\n\nCalculation: '+d.formula+'.\n\nResult: **'+r.primary+'**; '+r.secondary+'.\n\n'+d.assumptions;
  }).join('\n\n')+'\n\nUnits: MB = 10^6 bytes; GB = 10^9 bytes; GiB = 2^30 bytes; 1 byte = 8 bits. Examples are illustrative calculations, not hardware measurements.\n\n'+(children||'')+'\n\n';
 },
};
