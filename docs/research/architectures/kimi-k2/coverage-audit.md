# Technical coverage audit: kimi-k2

Evidence checked 2026-10-10; canonical revision 3. This pass compares the inspected complete report, relevant appendices and targeted official artifacts against the published study. It does not claim every report sentence or benchmark column must be duplicated.

## Coverage decisions

| Technique or evidence | Actual source locator | Before/after audit status | Added content or justified omission |
| --- | --- | --- | --- |
| Architecture, sparsity and attention heads | Section 2.3/Table 2/Figures 5–6; config | Gap closed | Sparsity 48 fit and 64 head tradeoff; no expert grouping unlike V3; stored/active counts retained. |
| MuonClip forward record/post-update safeguard | Section 2.1/Algorithm 1; Appendices D–E | Covered | Selective head content √gamma / rotary query gamma and shared key unchanged; not softmax cap. |
| Knowledge/math rephrasing and fidelity | Section 2.2/Figure 4/Table 1 | Gap closed | Intact source Figure 2,256 token chunks with full 4,096 token context; ten rewrite experiment not production (at most two rewrites). |
| Pretraining schedule and systems precision | Sections 2.4–2.5 | Covered | MuonClip, 67M batch, anneal/context; FP8 storage not FP8 GEMM; CPU offload/pipeline/expert parallelism. |
| Tool synthesis and executable environments | Section 3.1/Figure 8; Appendix B | Covered | Intact synthesis Figure 3 and simulator-versus-execution distinction; serialized calls require executor. |
| Self critic and RL policy objective | Section 3.2/Appendix F | Covered | Rubric ranking grounded via verifiable tasks; K1.5 objective distinct from GRPO; token budget/PTX/temp. |
| RL engine layout and agent partial rollouts | Section 3.3 | Gap closed | Synchronous colocated alternating loop, refresh <30 seconds, scoped author result; partial trajectories not fully asynchronous actors. |
| Post training eval and safety | Sections 4–5/Appendix C | Covered selectively | Nonthinking 8K/16K limits, single versus best of N; report limitation protocol retained, not all benchmark rows. |
| Optimizer spectral explanation and tool token catalog | Appendices B, E | Justified selective omission | Mechanism/input-output formatting explained; complete protocol token grammar/spectral algebra available in source, not duplicated. |
| Reuse and data/compute disclosure | arXiv v1 rights; repository LICENSE; report omissions | Covered / unresolved | NC-ND art, unmodified and noncommercial; Modified MIT weights distinct; no full GPU hour ledger or dataset. |

## Material revision

Added source chunk-rephrasing figure with fidelity boundary and max-two-production-rewrite distinction; sparsity/head tradeoffs; synchronous colocated engines, checkpoint refresh and partial agent trajectories.

## Adversarial pass

Checked equations against source conventions, figure labels and paths against full source pages, reported numerical units and source edition boundaries, and training versus runtime claims. Corrected inaccurate section locators during this pass (V3 MTP is Section 5.4.3, GLM cross-stage distillation is Section 3.5). No active-parameter count is treated as stored memory, no context maximum as robust evaluated recall, and no rollout scheduling optimization as a different algorithm without evidence. Native SVGs were raster-rendered for label/path inspection; a routing label overflow and a chunk-diagram subtitle collision were corrected. New HTML/mobile/theme/export gates passed root QA.

## Reproduction gaps

Undisclosed data, compute or optimizer values remain explicit instead of inferred. No downloaded model code or weights were executed. Report originals remain unmodified outside the public repository under /tmp/latent-frontier-sources/kimi-k2/. Source-art reuse is limited to the exact grants documented in public notices; independent SVGs copy scientific facts, not a source layout.

## Next check

Root completed fresh integrated desktop/mobile/theme/focus, caption/equation/citation anchors, Markdown/MDX exports, search and agent manifests for revision 3. Earlier browser screenshots do not establish this revised page's quality.




## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
