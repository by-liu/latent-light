# Technical coverage audit: deepseek-v3

Evidence checked 2026-10-10; canonical revision 3. This pass compares the inspected complete report, relevant appendices and targeted official artifacts against the published study. It does not claim every report sentence or benchmark column must be duplicated.

## Coverage decisions

| Technique or evidence | Actual source locator | Before/after audit status | Added content or justified omission |
| --- | --- | --- | --- |
| MLA absorbed cache and actual code paths | Section 2.1.1; official MLA.forward | Covered, strengthened | Actual query-latent and post-attention value projection described; V2 absorption equations cross-linked. |
| MoE routing, bias controller, scaling and placement | Section 2.1.2; Section 4.2; Gate.forward | Gap closed | Independent Figure 2 shows feedback, distinct unbiased weights and shared branch; released scale 2.5, controller schedule and node masking described. |
| Batch versus sequence balancing | Section 4.5.3; Figure 9 | Gap closed | 1B batch auxiliary control matches bias strategy; no unsupported all-aux-gradients-are-harmful claim. |
| MTP causal inputs, loss and inference | Sections 2.2, 4.2, 4.5.1, 5.4.3 | Covered, strengthened | Renumbered Figure 3 and teacher-forced prefix preserved; exact weight schedule and qualified acceptance/TPS added. |
| FP8 numerical protection and failed alternative | Sections 3.3.1–3.3.3; Appendix B | Gap closed | Table specifies scaling, E4M3, FP32 accumulation, sensitive paths and optimizer state; block Dgrad divergence included. |
| DualPipe, training parallelism and serving | Sections 3.1–3.2, 3.4 | Gap closed | Training PP16/EP64 no TP contrasted with TP4 serving; two parameter copies and prefill/decode hardware conditions. |
| Data, objectives, context and SFT | Sections 4.1–4.3, 5.1–5.2 | Covered, strengthened | FIM 10%, tokenizer, different packed masks, MTP schedule and SFT/RL distinctions. |
| Final benchmark and mechanism ablations | Sections 4.4–4.5, 5.3; Appendix C | Covered selectively | Matched MTP and router studies retained, including MMLU regression; heatmaps duplicate the batch-specialization finding, not another visual quota. |
| Per-SM overlap, transpose storage and online scale fusion minutiae | Sections 3.2–3.3 | Justified summary | Core numerical and systems paths disclosed; every kernel fusion and compiler detail would duplicate the report without improving orientation. |
| Cost boundaries and undisclosed data | Table 1; report limitations | Covered | GPU hours not full project cost; runtime execution and benchmark replication out of scope. |

## Material revision

Added a routing controller diagram and selection/weight scaling distinction; batch balancing counterevidence; precise FP8 scaling/accumulation/state protections; DualPipe costs; separate serving configurations; pretraining versus SFT masking; workload-qualified MTP acceptance.

## Adversarial pass

Checked equations against source conventions, figure labels and paths against full source pages, reported numerical units and source edition boundaries, and training versus runtime claims. Corrected inaccurate section locators during this pass (V3 MTP is Section 5.4.3, GLM cross-stage distillation is Section 3.5). No active-parameter count is treated as stored memory, no context maximum as robust evaluated recall, and no rollout scheduling optimization as a different algorithm without evidence. Native SVGs were raster-rendered for label/path inspection; a routing label overflow and a chunk-diagram subtitle collision were corrected. New HTML/mobile/theme/export gates passed root QA.

## Reproduction gaps

Undisclosed data, compute or optimizer values remain explicit instead of inferred. No downloaded model code or weights were executed. Report originals remain unmodified outside the public repository under /tmp/latent-frontier-sources/deepseek-v3/. Source-art reuse is limited to the exact grants documented in public notices; independent SVGs copy scientific facts, not a source layout.

## Next check

Root completed fresh integrated desktop/mobile/theme/focus, caption/equation/citation anchors, Markdown/MDX exports, search and agent manifests for revision 3. Earlier browser screenshots do not establish this revised page's quality.




## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
