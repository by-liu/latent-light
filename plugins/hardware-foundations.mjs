/** Shared teaching content for native figures and complete Markdown exports. */
export const circuitExample = {volts:3.3,ohms:10000};
export const circuitCurrent = circuitExample.volts/circuitExample.ohms;
export const circuitPower = circuitExample.volts*circuitCurrent;
export const timingStages = [
 {label:'Capture',duration:10,tone:'teal'},
 {label:'Preprocess',duration:3,tone:'blue'},
 {label:'Inference',duration:12,tone:'violet'},
 {label:'Output',duration:2,tone:'gold'},
];
export const timingFrames = [0,12,24].map((start,index)=>{
 let time=start;
 const stages=timingStages.map((stage,i)=>{const begin=time;time+=stage.duration;return {...stage,number:i+1,start:begin,end:time};});
 return {label:'Frame '+(index+1),start,end:time,latency:time-start,stages};
});
export const hardwareFigures = {
 circuit: {
  eyebrow:'Circuits · Make the quantities concrete',
  title:'One source. One resistor. A complete loop.',
  intro:'The same steady current passes through the source, wires and resistor in this ideal circuit.',
  readouts:[{label:'Voltage across the resistor',value:'3.3 V'},{label:'Current around the loop',value:(circuitCurrent*1000).toFixed(2)+' mA'},{label:'Power dissipated as heat',value:(circuitPower*1000).toFixed(3)+' mW'}],
  explanation:'An ideal 3.3 V DC source connects to a 10 kΩ resistor and a return wire. Conventional current leaves the positive terminal, passes through the resistor and returns to the negative terminal. The ground symbol marks the chosen 0 V reference.',
  note:'Illustrative steady DC circuit with ideal wires and a fixed resistor. A processor or radio has a changing load; the ground mark is a reference, not an extra path carrying current away.',
 },
 chip: {
  eyebrow:'Computing · Keep the boundaries visible',
  title:'The SoC is one part of a complete board.',
  intro:'One possible application-board arrangement, shown as a logical map.',
  roles:[
   {label:'Inside the SoC',detail:'CPU, optional GPU/NPU engines, local SRAM/caches, memory and I/O controllers with DMA.'},
   {label:'Around the SoC',detail:'In this example: working RAM, flash, power regulation, sensor I/O and USB/debug connections on the board.'},
  ],
  explanation:'The board boundary contains a system on a chip (SoC), separate working RAM, flash, power regulation and connectors. Inside the illustrated SoC are CPU, optional GPU and NPU engines, local SRAM/caches, memory controllers and I/O controllers with DMA. Connections join the SoC to the other board parts.',
  note:'Conceptual boundaries, not a specific product or PCB layout. GPU/NPU blocks are optional; memory can be on-chip, in-package or separate. Consult the actual chip and board diagrams for access paths and integration.',
 },
 timing: {
  eyebrow:'Timing · Latency and throughput',
  title:'A response can take 27 ms while results arrive 12 ms apart.',
  intro:'Illustrative software pipeline: a new frame starts every 12 ms, with a separate resource for each stage.',
  explanation:'Each frame spends 10 ms in capture, 3 ms in preprocessing, 12 ms in inference and 2 ms in output. Frames start at 0, 12 and 24 ms and finish at 27, 39 and 51 ms. Each has 27 ms of latency; successive completed results are 12 ms apart.',
  note:'Stages start as soon as their input and dedicated resource are ready. Transfers, scheduling overhead and resource contention are excluded. Faster arrivals would queue at the 12 ms inference stage. This is a calculated example, not a device benchmark.',
 },
 system: {
  eyebrow: 'Hardware 101 · The whole device',
  title: 'Follow information. Follow energy. Follow control.',
  intro: 'An AI device joins a physical world to a computing system.',
  flows: [
   {label:'Information',tone:'teal',steps:['Sense','Buffer','Compute','Decide','Act'],detail:'Light, sound or motion → samples and timestamps → model inputs → a decision → a display, speaker or actuator.'},
   {label:'Energy',tone:'gold',steps:['Source','Convert','Distribute','Use','Dissipate'],detail:'Battery or supply → regulators → power rails → sensors, compute, radios and outputs → heat and useful physical work.'},
   {label:'Control',tone:'violet',steps:['Boot','Configure','Schedule','Observe','Recover'],detail:'Clocks and reset establish a start; firmware coordinates work, checks deadlines and handles failures. Feedback returns through sensing.'},
  ],
  scales:[{label:'Component',detail:'A resistor, sensor or regulator'},{label:'Chip',detail:'Cores, memory and peripherals'},{label:'Board',detail:'Connections, rails and connectors'},{label:'Device',detail:'Enclosure, battery and interaction'},{label:'System',detail:'Devices, networks and services'}],
  note:'These are views of one design, not three independent pipelines or a literal wiring diagram. A chip is itself a component at board scale.',
 },
 signal: {
  eyebrow:'Signals · What sampling loses',title:'Different physical signals can leave the same samples.',
  intro:'A synthetic example: sample both cosine waves eight times per second.',
  labels:['1 Hz signal','7 Hz signal','Samples at 8 samples/s'],
  explanation:'At each sampling instant, the 1 Hz and 7 Hz cosines have identical values. The samples alone cannot identify which input was present.',
  steps:['Condition + filter the analog input','Sample in time + quantize amplitude','Keep values + timestamps + units'],
  note:'Normalized amplitude, 0–1 second. Original mathematical illustration, not recorded sensor data. Filtering must happen before the sampling that would create the alias.',
 },
 memory: {
  eyebrow:'Memory · Capacity is only one question',title:'Keep the next piece of work close to the engine.',
  intro:'A conceptual view; placement and access paths vary by chip.',
  explanation:'One common staging path loads saved content from persistent storage into working RAM, then stages values near an execution engine for reuse. This is not a universal access path: some chips read mapped flash directly, and engines may use shared or separate memory pools.',
  layers:[
   {label:'Registers + local SRAM / cache',role:'Work in progress',detail:'Small tiles, reused values and instructions close to an execution engine. Cache is managed largely by hardware; scratchpad SRAM may be managed explicitly.'},
   {label:'Working RAM',role:'The live working set',detail:'Model weights in use, activations, sensor buffers, runtime workspace and task or language-model state. This may be on-chip SRAM, external PSRAM or DRAM.'},
   {label:'Flash / persistent storage',role:'Survive power loss',detail:'Firmware, saved models, configuration and logs. Some chips execute code or read constants directly from mapped flash; storage is not automatically general-purpose working RAM.'},
  ],
  transfer:'Load, stream and reuse data through the paths the hardware supports. Avoid needless copies; synchronize producers and consumers.',
  note:'CPU, GPU and NPU may share some memory or have separate pools. Check accessibility, bandwidth, coherency and allocation limits for the actual platform. No universal latency or size ratio is implied.',
 },
};

export const hardwareFigureAsMarkdown = {
 revision:'2',
 render({attrs,children}) {
  const d=hardwareFigures[attrs.kind];
  if(!d) throw new Error('Unknown HardwareFigure kind: '+attrs.kind);
  const anchor=typeof attrs.id==='string' && /^figure-\d+$/.test(attrs.id)?'<a id="'+attrs.id+'"></a>\n\n':'';
  let body='';
  if(attrs.kind==='circuit') body=d.explanation+'\n\n'+d.readouts.map(r=>'**'+r.label+':** '+r.value+'.').join('\n\n');
  if(attrs.kind==='chip') body=d.explanation+'\n\n'+d.roles.map(r=>'**'+r.label+':** '+r.detail).join('\n\n');
  if(attrs.kind==='timing') body=d.explanation+'\n\n**Stage durations:** '+timingStages.map((s,i)=>(i+1)+'. '+s.label+' '+s.duration+' ms').join('; ')+'.\n\n'+timingFrames.map(f=>'**'+f.label+':** start '+f.start+' ms; '+f.stages.map(s=>s.label+' '+s.start+'–'+s.end+' ms').join('; ')+'; finish '+f.end+' ms; latency '+f.latency+' ms.').join('\n\n');
  if(attrs.kind==='system') body=d.flows.map(f=>'**'+f.label+':** '+f.steps.join(' → ')+'. '+f.detail).join('\n\n')+'\n\n**Five scales:**\n\n'+d.scales.map((s,i)=>(i+1)+'. **'+s.label+':** '+s.detail+'.').join('\n');
  if(attrs.kind==='signal') body=d.labels.join('; ')+'.\n\n'+d.explanation+'\n\n'+d.steps.map((s,i)=>(i+1)+'. '+s+'.').join('\n');
  if(attrs.kind==='memory') body=d.explanation+'\n\n'+d.layers.map(l=>'**'+l.label+' · '+l.role+':** '+l.detail).join('\n\n')+'\n\n'+d.transfer;
  return '\n\n'+anchor+'**'+d.title+'**\n\n'+d.intro+'\n\n'+body+'\n\n'+d.note+'\n\n'+(children||'')+'\n\n';
 },
};
