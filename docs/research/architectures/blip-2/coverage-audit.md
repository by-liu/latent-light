# BLIP-2 coverage audit

Revision 3. Evidence inspected October 10, 2026. This is a mechanism audit, not a figure quota or a claim to reproduce the training run.

## Scope and inspected evidence

[Selected report](https://arxiv.org/abs/2301.12597v3) and its full relevant appendices were compared with the existing reader page. Targeted official source files were read at the pinned versions recorded below; none were executed. Exact PDFs remain in /tmp, not in public assets. Sources and claims append to prior evidence history rather than replacing it.

- **S009** [BLIP-2 full method and appendix coverage audit](https://proceedings.mlr.press/v202/li23q/li23q.pdf). Full report and task finetuning appendix inspected. Reviewed masks/objectives, penultimate vision features, CapFilt pipeline, VQA question-conditioned Q-Former, stage ablation and separate retrieval head. Exact inspected PDF retained in /tmp only; SHA256 d59913d16edf1dc7e661ca3510c6efaa2b001146840d2e464a7fde980d088dd2.
- **S010** [LAVIS Q-Former representation learning code](https://github.com/salesforce/LAVIS/blob/05cb670f47296522e24e7727e366b4a997d28582/lavis/models/blip2_models/blip2_qformer.py). Constructor and forward inspected without execution. Query-specific initialization, normalized256dim projections, max query contrastive score, softmax-weighted multinomial negatives, averaged ITM logits, DEC LM target and summed objectives.
- **S011** [LAVIS Q-Former layer implementation](https://github.com/salesforce/LAVIS/blob/05cb670f47296522e24e7727e366b4a997d28582/lavis/models/blip2_models/Qformer.py). BertLayer query and text FFN branches, shared self attention and query-only cross attention inspected. No code executed.

## Technique coverage map

| Area | Inspected source locator | Before this audit | Change or justified omission |
| --- | --- | --- | --- |
| Selected variant and counts | Report Table2; OPT constructor; HF config | 3.8B/107M/188M stage distinction already covered. | Clarify discarded first-stage text modules, keep OPT versus FlanT5 and task-finetuned variants separate. |
| Visual evidence selection | Report §3.4; selected vision config | 257 positions covered; penultimate layer choice missing. | Add truncated ViT-g path and retained class feature. |
| Query architecture | Report §3.1; Qformer.py BertLayer | Cross attention every other layer and shared self attention covered. | Add query-specific FFNs and corresponding BERT initialization. |
| Masks and allowed information routes | Report §3.2 and source Figure2 | Three masks already faithfully explained. | Retain original Figure2, row-query/column-key reading, query-only cross attention. |
| Contrastive scores and negatives | blip2_qformer.py forward | Maximum similarity/hard negatives mentioned, actual construction missing. | Add normalized256dim projections, CLS text summary, sampled weighted hard negatives and averaged ITM logits. |
| Generation and joint objectives | Report §3.2; stage1 code final loss | ITG mask covered; DEC token/sum omitted. | Add DEC and equal summed ITC/ITM/LM implementation; retain distinction from OPT generation stage. |
| Second stage and freezing | Report §3.3/Figure3; OPT constructor/forward | Prefix conditioning and loss masks already covered. | Add removal of text modules explaining107M; retain frozen LLM differentiation requirement and T5 branch difference. |
| Data quality pipeline | Report §3.4 | 129M and top2 sampling present, generation/ranking details absent. | Add10 synthetic captions plus original, BLIP-large generation and CLIP-L14 filter. |
| Training settings | Report appendix Tables7–9 | Schedules, AdamW, task resolution and selected-compute boundary covered. | Retain pretraining-only frozen backbones and selected224 processor. |
| Question-conditioned task finetuning | Report §4.3/Figure7; OPT generate | Zero-shot extraction versus task-conditioned extraction conflated by omission. | Add explicit question-free selected OPT queries versus question-conditioned VQA finetuning. |
| Retrieval and evaluation | Report §§4.1–4.4/Figure5/Table6 | Task scores and stage ablation covered. | Add first-stage retrieval/reranking contract without implying an LLM; retain conditions and stage ablation in text. |
| Temporal support and limits | Selected card/config; report §5 | No native video contract; inherited risk and no few-shot VQA gain covered. | Retain limits; all failure-example panels are not needed to establish them. |

## Purposeful figure inventory

| Figure or candidate | Decision | Reason |
| --- | --- | --- |
| Figure1, generative-bridge.webp | Retain | Source Figure3 distinguishes OPT and FlanT5 conditioning and frozen weights. |
| Figure2, qformer-objectives.webp | Retain | Source Figure2 uniquely explains three masking contracts. |
| Source Figure5 stage ablation | Omit | The page already states its controlled result; an extra plot repeats the evidence rather than adding a missing mechanism. |
| Source Figure7 VQA architecture | Omit | Useful change is explained precisely in a short variant-specific section without repeating the bridge drawing. |

Seven licensed report crops across the five studies remain unchanged; their grants and extraction records are in the per-model public SOURCES.md files and prior evidence records. New SVGs are original work under repository MIT, not traced report artwork. No new third-party artwork grant is inferred from model weights or code licensing.

## Adversarial checks and boundaries

- Selected variant, historical recipe, task finetuning and controlled ablation identities stay distinct.
- Token counts state preprocessing, boundaries and arithmetic assumptions; positional span is not cache size.
- Training targets, frozen modules and inference execution are not inferred from model names or one configuration flag.
- Report findings are labeled author evidence; qualitative examples are not independent benchmark proof.
- No model execution, weights loading, serving or training measurement is claimed.

- No complete combined-license deployment clearance is asserted for the inherited OPT component.
- Checkpoint runtime performance and query bottleneck failure rate were not measured.
- Separate task-finetuned checkpoints have distinct input and frozen-module contracts.

## Review status

Source entailment, variant boundaries, equations and local SVG raster previews have been reviewed. New revision3 page desktop/mobile/theme/focus, Markdown/MDX exports and integrated site validation passed root QA. Historical revision2 presentation evidence is retained without being reused as proof of the new page.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
