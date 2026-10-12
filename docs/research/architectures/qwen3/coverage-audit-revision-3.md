# Technical coverage audit: qwen3

Evidence checked 2026-10-10; canonical revision 3. This pass compares the inspected complete report, relevant appendices and targeted official artifacts against the published study. It does not claim every report sentence or benchmark column must be duplicated.

## Coverage decisions

| Technique or evidence | Actual source locator | Before/after audit status | Added content or justified omission |
| --- | --- | --- | --- |
| Dense/MoE network and GQA | Sections 2–3; config; Transformers 4.51 attention/router | Covered, strengthened | No QKV biases, QK RMSNorm, no shared experts, global batch aux loss and vocabulary-slot distinction. |
| Pretraining and source conversion | Section 3 | Gap closed | Three stage exposures; OCR/refinement/synthetic data, not a native multimodal Qwen3 network. |
| Long context base and backend | Section 3.2; Appendix A.1.1; config | Gap closed | ABF 10,000 → 1,000,000, YaRN+DCA, config 40,960 versus evaluated 128K. |
| Cold start filtering and reasoning RL | Sections 4.1–4.2 | Covered, strengthened | 3995 query/verifier pairs difficult/learnable/disjoint; GRPO/entropy/reuse details bounded by missing coefficients. |
| Mode fusion and budgets | Section 4.3; tokenizer template | Covered | Empty thinking block; interrupted reasoning not generic output cap; authors say intermediate budget ability not explicitly trained. |
| General RL feedback categories | Section 4.4 | Gap closed | Rules, reference Qwen2.5-72B judge, learned no-reference preference model, real tool execution. |
| Strong-to-weak distillation | Section 4.5; Table 21 | Gap closed | Figure 2 student chooses prefix, teacher scores it; teacher identities and unspecified KL direction retained. |
| Stage tradeoffs and long-context retrieval | Section 4.7/Table 22; Appendix A.1.1 | Covered, strengthened | 32B dense AIME decreases while mode following improves; flagship thinking RULER regression remains. |
| Every family checkpoint benchmark and language category | Section 3.4, 4.6, appendices | Justified selective omission | Representative flagship plus meaningful small-model comparison; full benchmark catalogs link to report rather than duplicate tables. |
| Source figure reuse and runtime | arXiv v1 nonexclusive; official repo no documentation LICENSE | Unresolved rights / out of scope | No grant inferred from Apache weights; original precise diagram used, source figure linked. No model execution. |

## Material revision

Separated student distillation from the overview; added the student-prefix/teacher-logit figure, exact pretraining exposures and context methods, distinct reward types, global-batch balancing and dense32B stage tradeoffs; KL direction remains undisclosed.

## Adversarial pass

Checked equations against source conventions, figure labels and paths against full source pages, reported numerical units and source edition boundaries, and training versus runtime claims. Corrected inaccurate section locators during this pass (V3 MTP is Section 5.4.3, GLM cross-stage distillation is Section 3.5). No active-parameter count is treated as stored memory, no context maximum as robust evaluated recall, and no rollout scheduling optimization as a different algorithm without evidence. Native SVGs were raster-rendered for label/path inspection; a routing label overflow and a chunk-diagram subtitle collision were corrected. New HTML/mobile/theme/export gates passed root QA.

## Reproduction gaps

Undisclosed data, compute or optimizer values remain explicit instead of inferred. No downloaded model code or weights were executed. Report originals remain unmodified outside the public repository under /tmp/latent-frontier-sources/qwen3/. Source-art reuse is limited to the exact grants documented in public notices; independent SVGs copy scientific facts, not a source layout.

## Next check

Root completed fresh integrated desktop/mobile/theme/focus, caption/equation/citation anchors, Markdown/MDX exports, search and agent manifests for revision 3. Earlier browser screenshots do not establish this revised page's quality.




## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
