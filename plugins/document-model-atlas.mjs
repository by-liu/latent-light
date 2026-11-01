/** Reviewed milestones, shared by the native figure and its complete text export. */
export const atlasPeriods = [
 {id:'2025',label:'2025'}, {id:'q1',label:'Jan–Mar 2026'},
 {id:'q2',label:'Apr–Jun'}, {id:'summer',label:'Jul–Aug'},
 {id:'sep',label:'September'}, {id:'oct',label:'October'},
];
export const atlasLanes = [
 {id:'language',label:'Document languages',detail:'Make structure explicit',color:'violet'},
 {id:'memory',label:'Compression & memory',detail:'Read more with fewer tokens',color:'blue'},
 {id:'regions',label:'Layout & decoding',detail:'Locate, route and parallelize',color:'teal'},
 {id:'specialists',label:'Page specialists',detail:'Improve reading and understanding',color:'amber'},
 {id:'beyond',label:'Beyond transcription',detail:'Graphics and multimodal evidence',color:'rose'},
 {id:'verify',label:'Verification',detail:'Assess an existing candidate',color:'slate'},
];
const paper=id=>'https://arxiv.org/abs/'+id;
const study=slug=>'#'+slug;
const model=(id,label,lane,date,event,source,scale,access,idea,slug)=>({id,label,lane,date,event,source,scale,access,idea,href:study(slug)});
export const atlasModels = [
 model('smol','SmolDocling','language','2025-03-14','Report v1',paper('2503.11576v1'),'256M','Official weights','Compact visual tokens and DocTags preserve content, structure and location.','smoldocling-make-the-document-language-compact'),
 model('granite','Granite Docling','language','2025-09-17','Model-card release','https://huggingface.co/ibm-granite/granite-docling-258M','258M','Official weights','Docling design successor with SigLIP2 and a Granite decoder; this is not a claim of inherited weights.','granite-docling-the-next-compact-document-native-converter'),
 model('deep1','DeepSeek-OCR 1','memory','2025-10-21','Report v1',paper('2510.18234v1'),'3B MoE decoder','Official weights','A local-to-global vision encoder compresses a page into a short visual sequence.','deepseek-ocr-1-treat-the-page-as-optical-context-compression'),
 model('deep2','DeepSeek-OCR 2','memory','2026-01-28','Report v1',paper('2601.20552v1'),'3B MoE decoder','Official weights','Causal-flow queries organize visual evidence before the decoder reads it.','deepseek-ocr-2-learn-a-causal-flow-over-visual-evidence'),
 model('unlimited1','Unlimited-OCR','memory','2026-06-22','Report v1',paper('2606.23050v1'),'3B MoE decoder','Official weights','R-SWA keeps the visual reference while bounding generated-output history.','unlimited-ocr-keep-the-reference-forget-old-output'),
 model('unlimited2','Unlimited-OCR 2','memory','2026-10-27','Release log','https://huggingface.co/baidu/Unlimited-OCR-2/tree/c14071b549f4fcab10909f3c4acc6a2edb366947','3B MoE decoder','Official weights; custom SGLang path','Sparse visual access and overlapping page chunks separately control attention and resident KV.','unlimited-ocr-2-bound-attention-and-resident-pages-separately'),
 model('miner','MinerU2.5','regions','2025-09-26','Report v1',paper('2509.22186v1'),'1.2B recognizer','Official weights','Global layout on a thumbnail routes high-resolution regions to recognition.','mineru25-global-layout-then-native-resolution-crops'),
 model('glm','GLM-OCR','regions','2026-03-11','Report v1',paper('2603.10910v1'),'0.9B','Official weights','Layout-routed recognition or direct KIE, with shared multi-token prediction heads.','glm-ocr-compact-region-recognition-with-multi-token-heads'),
 model('diffusion','MinerU-Diffusion','regions','2026-03-23','Report v1',paper('2603.22458v1'),'Size not summarized here','Checkpoint unverified','Parallel block diffusion changes target decoding; the MinerU name alone does not establish weight ancestry.','mineru-diffusion-change-the-target-decoder-not-just-its-draft'),
 model('minerpro','MinerU2.5-Pro','regions','2026-04-06','Report v1',paper('2604.04771v1'),'1.2B recognizer','Official weights','Retain the 2.5 architecture while expanding curation and progressive training.','mineru25-pro-improve-the-data-engine-retain-the-architecture'),
 model('paddle','PaddleOCR-VL 1.6','regions','2026-06-02','Report v1',paper('2606.03264v1'),'0.9B recognizer','Official weights','Target under-optimized regions with a data engine and staged post-training.','the-paddleocr-family-and-its-current-vl-model'),
 model('hpd','HPD-Parsing','regions','2026-07-21','Report v1',paper('2607.18839v1'),'Main model + P-MTP','Official weights; custom runtime','A layout branch coordinates parallel content branches and progressive multi-token prediction.','hpd-parsing-parallelize-the-output-tree'),
 model('oxr','OXR-1.0','regions','2026-10-20','Announcement','https://somark.cn/oxr','Advertised 1.3B; about 1.53B stored BF16 values','Weights with additional license terms','Replaceable layout, recognition/order branches and a targeted post-training data loop.','oxr-10-make-layout-replaceable-retain-recognition-and-order'),
 model('mini','MiniCPM-OCR 1.0','regions','2026-10-31','Announcement','https://www.prnewswire.com/news-releases/modelbest-and-openbmb-open-source-minicpm-ocr-series-delivering-high-performance-document-parsing-and-ai-powered-quality-control-302925594.html','1.3B recognizer','Official weights, Apache-2.0','Layout-first parsing or direct field extraction, with optional DSpark draft decoding.','minicpm-ocr-10-distinguish-the-recognizer-from-the-parser'),
 model('olm','olmOCR 2','specialists','2025-10-22','Report v1',paper('2510.19817v1'),'7B','Official weights','Executable document unit tests reward selected content, order and structural properties.','olmocr-2-executable-document-tests-as-rewards'),
 model('light2','LightOnOCR-2','specialists','2026-01-20','Report v1',paper('2601.14251v1'),'1B','Official weights; variant-specific outputs','Distilled data, localization rewards and checkpoint merging target compact page conversion.','lightonocr-2-optimize-data-and-the-localization-objective'),
 model('hunyuan','HunyuanOCR-1.5','specialists','2026-07-06','Report v1',paper('2607.04884v1'),'0.5B decoder plus vision','Official weights','Native-resolution reading, a compressed visual interface and DFlash decoding support unified OCR tasks.','hunyuanocr-15-one-model-long-context-faster-decoding'),
 model('nemotron','Nemotron Parse 2.0','specialists','2026-08-03','Model-card release','https://huggingface.co/nvidia/NVIDIA-Nemotron-Parse-2.0','Under 1B','Official weights','C-RADIO vision features feed a cross-attending mBART decoder with typed output and locations.','nemotron-parse-20-encoderdecoder-attention-is-still-useful'),
 model('nemotron35','Nemotron 3.5 Parse','specialists','2026-10-17','Model-card release','https://huggingface.co/nvidia/Nemotron-3.5-Parse/tree/4035ffb1d8f8bafcdb867dfaf6f7514f101464f9','≈0.631B including MTP','Official weights, OpenMDW-1.1','Causal visual-prefix decoding and optional table/chart refinement passes differ from the Parse2.0 contract.','nemotron-35-parse-inspect-the-attention-path-and-inference-passes'),
 model('chandra2','Chandra OCR 2','specialists','2026-10-23','Benchmark snapshot','https://api.datalab.to/blog/open-ocr-models-omniparsebench','4.5B publisher inference count','Weights with custom commercial terms','Layout-aware page conversion; the open OCR2 checkpoint differs from hosted Chandra2.5. Date identifies the comparison, not first release.','chandra-ocr-2-separate-the-open-model-from-the-service'),
 model('surya2','Surya OCR 2','regions','2026-10-23','Benchmark snapshot','https://api.datalab.to/blog/open-ocr-models-omniparsebench','≈650M VLM plus line detector','Weights with custom commercial terms','One VLM shares recognition/layout/table tasks, while text-line detection remains separate. Date identifies the comparison.','surya-ocr-2-share-recognition-tasks-without-merging-every-stage'),
 model('tele','TeleOCR','specialists','2026-09-10','Report v3',paper('2608.12898v3'),'Size not summarized here','Checkpoint unverified','Deformation-aware learning and content/structure decoupling address difficult capture; earlier indexing used NaviDC.','teleocr-geometry-remains-a-frontier'),
 model('wevis','WeVisDoc','specialists','2026-09-17','Report v1',paper('2609.20423v1'),'2B / 4B','Official weights','Coverage training is followed by held-out residual diagnosis and targeted data/token allocation.','wevisdoc-use-residual-errors-to-allocate-training'),
 model('xiaomi','Xiaomi-OCR-0','specialists','2026-09-28','Report v1',paper('2609.36136v1'),'0.8B base','Official weights, Apache-2.0','Q-Mask, curated data and mixed-task RL connect parsing with KIE/VQA; headline parsing includes a layout detector.','xiaomi-ocr-0-connect-reading-to-understanding'),
 model('light3','LightOnOCR-3','specialists','2026-10-08','Announcement','https://huggingface.co/blog/lightonai/lightonocr-3','0.8B / 1B / 4B','Official weights','A family update adds grounded regions, image descriptions and chart data; backbones differ by size.','lightonocr-2-optimize-data-and-the-localization-objective'),
 model('ocria','OCRia-1','specialists','2026-10-22','Announcement','https://www.llamaindex.ai/blog/parse-ocria-1','4B target plus serving components','Hosted in LlamaParse; public weights unverified','Structured rewards target table/header associations, chart values and formatting; no output boxes.','ocria-1-reward-associations-not-just-recovered-strings'),
 model('dots','dots.mocr','beyond','2026-03-13','Report v1',paper('2603.13032v1'),'3B','Official weights','Eligible graphics become renderable SVG alongside text, tables and formulas.','dotsmocr-treat-graphics-as-programs-not-leftover-pixels'),
 model('youtu','Youtu-Parsing-Omni','beyond','2026-10-29','Report v1',paper('2610.39301v1'),'5B','Weights with custom Youtu terms','A shared perception encoder and schema ground document, image, audio and video content.','youtu-parsing-omni-one-grounded-interface-across-modalities'),
 model('jev','MiniCPM-OCR Jev','verify','2026-10-31','Announcement','https://www.prnewswire.com/news-releases/modelbest-and-openbmb-open-source-minicpm-ocr-series-delivering-high-performance-document-parsing-and-ai-powered-quality-control-302925594.html','2B verifier','Official weights, Apache-2.0','Score an original crop, candidate text and rendered candidate. This verifies OCR rather than generating it.','minicpm-ocr-jev-score-the-candidate-against-the-crop'),
];
export const atlasRelations = [
 {from:'nemotron',to:'nemotron35',type:'update',label:'Nemotron family update',source:'https://huggingface.co/nvidia/NVIDIA-Nemotron-Parse-2.0/tree/4e021c03edc92e715d5d788921a927d0cbb4b4d1',note:'The Parse2.0 card explicitly links3.5 as its newer version; attention wiring and MTP serving differ. This does not assert direct checkpoint initialization.'},
 {from:'smol',to:'granite',type:'update',label:'Docling design successor',source:'https://www.ibm.com/new/announcements/granite-docling-end-to-end-document-conversion',note:'IBM describes an evolution of SmolDocling with new vision and language backbones; no direct weight-inheritance claim.'},
 {from:'deep1',to:'deep2',type:'update',label:'DeepSeek-OCR family update',source:paper('2601.20552v1'),note:'Second generation changes the visual encoder and reading-flow design.'},
 {from:'deep1',to:'unlimited1',type:'initialization',label:'Initialized from DeepSeek-OCR',source:'https://arxiv.org/html/2606.23050v1#S4.SS2',note:'Section4.2 starts from the DeepSeek-OCR checkpoint, freezes DeepEncoder and trains the language model.'},
 {from:'unlimited1',to:'unlimited2',type:'initialization',label:'Initialized from Unlimited-OCR',source:'https://github.com/baidu/Unlimited-OCR/blob/6c5d1906ba638a7cd87bc00f14452a47fdabf16b/Unlimited-OCR-2.pdf',note:'Section4.2 initializes from Unlimited-OCR and post-trains with SR-SWA.'},
 {from:'miner',to:'minerpro',type:'update',label:'MinerU2.5 architecture retained',source:paper('2604.04771v2'),note:'The Pro report retains the2.5 architecture and changes the data engine and progressive training.'},
 {from:'light2',to:'light3',type:'update',label:'LightOnOCR family update',source:'https://huggingface.co/blog/lightonai/lightonocr-3',note:'The1B retains the preceding architecture;0.8B and4B adopt Qwen3.5. Family succession is not uniform weight ancestry.'},
];
export function atlasPeriodFor(date){
 if(typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date+'T00:00:00Z'))||new Date(date+'T00:00:00Z').toISOString().slice(0,10)!==date||date<'2025-01-01'||date>'2026-10-31')throw new Error('Atlas requires an ISO milestone date.');
 if(date<'2026-01-01')return '2025';
 if(date<'2026-04-01')return 'q1';
 if(date<'2026-07-01')return 'q2';
 if(date<'2026-09-01')return 'summer';
 if(date<'2026-10-01')return 'sep';
 return 'oct';
}
export function atlasDateLabel(date,compact=false){
 return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',...(compact?{}:{year:'numeric'}),timeZone:'UTC'}).format(new Date(date+'T00:00:00Z'))+(compact&&date.startsWith('2025')?' ’25':'');
}
export const atlasNote='Lanes are overlapping design themes, not ancestry. Solid arrows show family/design updates; dashed arrows show explicit checkpoint initialization. Dates identify the cited report revision, release log, announcement or benchmark snapshot, not necessarily first weight availability. Time columns are unequal periods, not a proportional scale.';
export const documentModelAtlasAsMarkdown={revision:'1',render({attrs,children}){
 if(typeof attrs.id!=='string'||!/^figure-\d+$/.test(attrs.id))throw new Error('DocumentModelAtlas requires a numbered figure ID.');
 const lines=['<a id="'+attrs.id+'"></a>','**Document AI family atlas**',atlasNote];
 for(const lane of atlasLanes){
  lines.push('**'+lane.label+' — '+lane.detail+'**');
  for(const m of atlasModels.filter(m=>m.lane===lane.id).sort((a,b)=>a.date.localeCompare(b.date))){
   lines.push('- ['+m.label+']('+m.href+'): '+atlasDateLabel(m.date)+' · '+m.event+'. '+m.scale+'; '+m.access+'. '+m.idea+' [Milestone source]('+m.source+').');
  }
 }
 lines.push('**Documented connections**');
 for(const r of atlasRelations){const from=atlasModels.find(m=>m.id===r.from),to=atlasModels.find(m=>m.id===r.to);lines.push('- '+from.label+' → '+to.label+' — '+r.label+'. '+r.note+' [Source]('+r.source+').');}
 return '\n\n'+lines.join('\n\n')+'\n\n'+(children??'')+'\n\n';
}};
