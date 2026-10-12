# gemma-4: coverage audit

Evidence cutoff 2026-10-10. Representative scope: 31B IT dimensions and serving interfaces; separateMoE/E/unified contrasts.

## Reviewed coverage

- Primary report: Main §§2–3 including vision,audio,encoder-free,QAT,MTP,training,format; Tables1–3,6,9,12; AppendixAlgorithm1 andFigures1–2.
- Scoped highlights and number table distinguish disclosed,derived and undisclosed values.
- Architecture interfaces,normalization,attention/head/cache contracts and distinct mechanism explained.
- Training stages,post-training omissions,variant-specific data and objective boundaries retained.
- Prefill/decode or processor state traced in selected implementation,not model-executed.
- Published evaluation/ablation protocols separated from causal architecture and runtime claims.
- 3 numbered figures: one original mechanism/interface SVG and 2 original report crops;all rendered assets manually inspected.
- Source/software/model licenses distinguished;no whole report PDF or weights published.
- Canonical report includes the full MDX teaching content,not an abbreviated internal summary.

## Reconciliation and omitted material

- Gemma 4 31B and 26B-A4B have a 550M vision encoder;12B directly projects raw image/audio;E series use encoders andPLE. Boundary: Dimensions and modality paths are variant-specific.
- Selected 31B config has 60 layers,5376 residual width,50 local/10 global layers,window 1024 and 262144 max positions. Boundary: Configured positions are not uniform task accuracy.
- 31B uses 16 local KV heads of 256 dimensions and 4 global KV heads of 512,with 32 query heads. Boundary: Do not substitute the MoE/E-series dimensions.
- Public 31B artifact totals about 31.273B Safetensors parameters;report separately rounds decoder,embedding,vision and drafter components. Boundary: Optional drafter separately counted; boundaries differ from marketing labels.
- Report gives 10240 TPUv 6e chips for 31B andJanuary 2025 data cutoff but no full exposure totals. Boundary: No fabricated token counts,FLOPs or duration.
- Encoded 31B processor pools 3x 3 groups of 16px patches into 48x 48px output regions. Boundary: Soft token budget is a ceiling;valid regions can be fewer after rounding.
- Figure 2 ten-token toy yields 72 encoder patches and 8 output positions;actual supported budgets are 70,140,280,560,1120. Boundary: Ten is not a selectable production default.
- Unified 12B projects 48x 48x 3 RGB patches and 640-sample chunks from 40ms 16kHz raw audio. Boundary: Not the31B encoder or E-series Mel input.
- Key/value representation sharing branches before key norm/RoPE;cached transformed K,V need not be equal. Boundary: Report values=keys shorthand is not equality of final tensors.
- With 25percent rotary portion,the ideal shared-vector-plus-rotated-subvector global representation ratio is 0.625. Boundary: Not37.5percent total memory reduction;general cache receives separate transformed arrays.
- 31B cross-layer KV sharing is disabled in inspected config despite E-series sharing described in report. Boundary: Distinguish sharing heads,layers and representations.
- Inspected local masks allow visual-block bidirectional edges only within the window;global masks remain causal. Boundary: Later implementation observation,not reconstructed training backend.
- 26B-A4B config has 30 layers,128 routed experts,8 selected plus a shared path. Boundary: Active parameters are not a measured4B latency.
- MTP drafter consumes target last-layer activation and KV history with 4 layers;31B drafter width 1024,three local/one global. Boundary: Proposal requires target verification;no fixed speedup inferred.
- Small E-series drafting projects selected token clusters to 4096 candidates instead of 262000. Boundary: Reported similar acceptance is not an independently measured speedup.
- Thinking 31B InfographicVQA82.8 at 280 tokens versus 92.0 at 1120 is a resolution comparison. Boundary: Not an encoder-free architecture-only ablation.
- Nonthinking 31B RULER reports 96.8 at 32K and 96.4 at 128K. Boundary: No universal256K application accuracy claim.
- Gemma 4 weights use Apache 2.0,unlike prior custom-term Gemma generations. Boundary: Report artwork and embedded illustration rights remain separate.
- Thinking requires matched control/template;PT andIT stop-token conventions differ. Boundary: No template file executed;tools require an external orchestrator.

## Pending validation

Parent will integrate navigation/catalog/tests and run full site validation,1440px desktop,390px mobile,320px dark,focus,pan/full-size,footnote/resource links,Markdown/MDX exports and agent manifests. State remains verifying;source and asset checks are not falsely described as complete browser/runtime review.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

No unresolved source/artifact contradiction is silently presented as a complete recipe.
