/** Canonical teaching data shared by the website and its agent/Markdown exports. */
export const yoloBranches = [
 {name:'Original research',team:'Redmon, Farhadi + collaborators',models:'v1 (2015) → v2 (2016) → v3 (2018)',idea:'One network → learned box priors → three-scale prediction',href:'#the-original-idea',tone:'neutral'},
 {name:'Training and gradient design',team:'Bochkovskiy / Wang / Liao collaborations',models:'v4 (2020) · v7 (2022) · v9 (2024)',idea:'Training recipes, feature aggregation and auxiliary supervision',href:'#training-and-gradient-design',tone:'neutral'},
 {name:'Ultralytics software family',team:'Ultralytics',models:'v5 (2020) → v8 (2023) → 11 (2024) → 26 (2026)',idea:'Practical workflows, anchor-free heads and deployment choices',href:'#the-ultralytics-software-family',tone:'gold'},
 {name:'Parallel detector research',team:'Megvii · Meituan · THU-MIG',models:'YOLOX (2021) · v6 (2022/23) · v10 (2024)',idea:'Decoupled prediction, efficient blocks and NMS-free assignment',href:'#parallel-paths-to-efficient-detection',tone:'neutral'},
 {name:'Richer feature relationships',team:'Tian et al. · iMoonLab collaborators',models:'v12 (2025) · v13 (2025)',idea:'Area attention and adaptive hypergraph feature exchange',href:'#attention-and-hypergraphs',tone:'neutral'},
 {name:'Open-vocabulary vision',team:'YOLO-World · YOLOE · Ultralytics',models:'World (2024) · E (2025) · E-26 (2026)',idea:'Text, example images and built-in vocabularies guide detection',href:'#beyond-fixed-categories',tone:'teal'},
];
export const featureLevels=[
 {level:'P3',stride:8,width:80,count:6400,detail:'Fine spatial sampling'},
 {level:'P4',stride:16,width:40,count:1600,detail:'Intermediate spatial sampling'},
 {level:'P5',stride:32,width:20,count:400,detail:'Coarse spatial sampling'},
];
export const deviceStages=[
 {name:'Capture',detail:'Exposure, sensor readout, timestamps'},
 {name:'Prepare',detail:'Decode, letterbox, normalize, transfer'},
 {name:'Infer',detail:'Backbone, feature fusion, prediction head'},
 {name:'Select',detail:'Decode, threshold, NMS or top-k; undo padding'},
 {name:'Use',detail:'Associate tracks, decide, display or act'},
];
export const yoloFigures={
 atlas:{eyebrow:'YOLO · A field guide',title:'One idea. A branching family.',intro:'Predict object locations and categories together. A decade of research changes how features, training and deployment make that possible.',note:'A curated family map, not a literal code ancestry tree or an accuracy ranking. Arrows within the original and Ultralytics rows show their release sequences; dots group related work without asserting direct inheritance. Dates are first paper years except software releases; YOLOv6 also shows its 2023 revision. Status checked November 8, 2026.'},
 grid:{eyebrow:'Foundations · Original YOLO',title:'The object’s center chooses the cell.',intro:'A 7 × 7 grid assigns responsibility. Each cell predicts two boxes and one shared vector of 20 class probabilities in the original VOC setup.',explanation:'The highlighted cell contains the center of the illustrated object. The object can extend beyond the cell: the grid assigns responsibility, not box boundaries. For each cell, 2 × 5 box values plus 20 class values give 30 numbers; 7 × 7 × 30 = 1,470 raw outputs and 98 candidate boxes.',note:'Original YOLO example: S=7, B=2, C=20. The scene is an independent schematic, not a detector output. Modern YOLO models use different spatial scales, score definitions and head contracts.'},
 pyramid:{eyebrow:'Mechanism · A common modern detector',title:'One image. Shared features. Several spatial scales.',intro:'A backbone extracts features; a neck exchanges information across resolutions; a head predicts boxes and class scores at each output location.',explanation:'For a 640 × 640 input and output strides 8, 16 and 32, the feature grids are 80 × 80, 40 × 40 and 20 × 20. One prediction point per location gives 6,400 + 1,600 + 400 = 8,400 locations. All levels can detect objects; the labels describe spatial sampling, not hard object-size restrictions.',note:'This matches a common three-level anchor-free setup, including the inspected YOLO26 YAML. It is not universal: input aspect ratio, added pyramid levels, multiple box priors and the export path change the contract.'},
 selection:{eyebrow:'Mechanism · Predictions are not yet unique objects',title:'Remove duplicates—or train a head to avoid them.',intro:'Anchor-free describes box parameterization. NMS-free describes duplicate handling. They answer different questions.',explanation:'In the dense-prediction path, several candidates overlap one object; NMS keeps the strongest candidate and suppresses competing overlaps according to a chosen policy. In the one-to-one path, assignment trains a head toward one selected prediction per annotated object; inference uses decoding and selection without IoU-based suppression.',note:'Illustrative boxes and scores, not measurements. One-to-one training does not guarantee perfect uniqueness on every image. Thresholding, top-k selection and coordinate transforms can remain in an NMS-free pipeline.'},
 device:{eyebrow:'Deployment · The whole path',title:'A fast model is one stage of a responsive device.',intro:'Measure the time from a real observation to a useful result, including queues and work outside the neural network.',explanation:'Capture → prepare → infer → select → use. Record timestamps at the boundaries and distinguish per-frame latency from steady-state throughput. Transfers and queueing can dominate; a model-only millisecond figure is not camera-to-action latency.',note:'Conceptual pipeline, not a device benchmark. Stages can overlap on independent resources; tracking and decisions are separate functions beyond single-frame detection.'},
};
export const yoloFigureAsMarkdown={revision:'1',render({attrs,children}){
 const d=yoloFigures[attrs.kind];if(!d)throw new Error('Unknown YoloFigure kind: '+attrs.kind);
 const id=typeof attrs.id==='string'&&/^figure-\d+$/.test(attrs.id)?`<a id="${attrs.id}"></a>\n\n`:'';
 let body=d.explanation||'';
 if(attrs.kind==='atlas')body=yoloBranches.map(b=>`**${b.name} — ${b.team}.** ${b.models}. ${b.idea}. [Read this branch](${b.href}).`).join('\n\n')+'\n\n**Current status (November 8, 2026):** YOLO26 released; YOLO27 preview with no public model artifacts; the arXiv YOLOv14 paper withdrawn by its authors.';
 if(attrs.kind==='pyramid')body+='\n\n'+featureLevels.map(f=>`- **${f.level}, stride ${f.stride}:** ${f.width} × ${f.width} = ${f.count.toLocaleString('en-US')} locations. ${f.detail}.`).join('\n');
 if(attrs.kind==='device')body+='\n\n'+deviceStages.map((s,i)=>`${i+1}. **${s.name}:** ${s.detail}.`).join('\n');
 return `\n\n${id}**${d.title}**\n\n${d.intro}\n\n${body}\n\n${d.note}\n\n${children||''}\n\n`;
}};
