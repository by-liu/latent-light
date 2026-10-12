# Technical coverage audit: kimi-linear

Evidence checked 2026-10-10; canonical revision 3. This pass compares the inspected complete report, relevant appendices and targeted official artifacts against the published study. It does not claim every report sentence or benchmark column must be duplicated.

## Coverage decisions

| Technique or evidence | Actual source locator | Before/after audit status | Added content or justified omission |
| --- | --- | --- | --- |
| KDA channel decay and corrective write | Sections 2–3/Equation 1 | Covered | Equation 1 decays first, then updates the prediction error; input dependent 128 × 128 head state. |
| Chunk formulation and constrained DPLR | Sections 3.1–3.2, 6.2/Appendix B | Gap closed | Figure 3 shows state and triangular paths; WY/UT, pseudo values, tied factors, two instead of four secondary matrices. |
| Complexity and fast memory learning view | Section 6.3/Table 7 | Gap closed | Equation 2 per-head kernel terms and SGD interpretation; not whole hybrid linear or learned weight updates. |
| Architecture/local gates/NoPE | Section 4/Figure 3; release config | Covered | Original Figure 1, local convolution, L2 normalization and sigmoid, 20 KDA/7 MLA layers in the artifact; order not discarded. |
| Actual cache and kernel dispatch | HF KimiDynamicCache / KimiDeltaAttention / KimiMLAAttention | Covered | Expanded global KV versus ideal MLA; short fused / long chunk; static code not runtime measurement. |
| Controlled versus released training | Sections 5.3–5.4, Appendix D | Covered | 1.4T controlled versus 5.7T release, Moonlight capacity difference, MuonClip, WSD and batches. |
| SFT and K1.5 style RL | Section 5.4.2 | Covered | targeted reasoning, PTX, precision TIS and adaptive KL; no GRPO relabel or invented coefficients. |
| Gate/convolution/hybrid ablations | Section 5.2/Table 1 | Covered, strengthened | 7:1 similar training, worse validation, 1:1 similar validation, more inference cost; not universal 3:1 optimum. |
| Efficiency and cache claims | Sections 5.6, 6.3/Figures 1, 7 | Covered | Batch one 2.9 times prefill / 2.3 times decode versus theoretical larger batch 6.3 times; backend/hardware limits and final extra MLA. |
| Full algebra and broad taxonomy | Appendices B–C, Tables 6–7 | Justified summary | Core algebra and objective explicit; line by line derivation or all attention families belong in separate foundations, not necessary repetition. |
| Long context robustness and model execution | Appendix D; inspected code | Unresolved/out of scope | 1M RULER 94.8 is not arbitrary exact recall; no checkpoint/kernels executed. |

## Material revision

Added an independent causal chunk/interchunk-state diagram, WY/UT details, constrained DPLR savings, explicit kernel complexity and local fast-memory learning interpretation; sharpened hybrid-ratio generalization/runtime tradeoff.

## Adversarial pass

Checked equations against source conventions, figure labels and paths against full source pages, reported numerical units and source edition boundaries, and training versus runtime claims. Corrected inaccurate section locators during this pass (V3 MTP is Section 5.4.3, GLM cross-stage distillation is Section 3.5). No active-parameter count is treated as stored memory, no context maximum as robust evaluated recall, and no rollout scheduling optimization as a different algorithm without evidence. Native SVGs were raster-rendered for label/path inspection; a routing label overflow and a chunk-diagram subtitle collision were corrected. New HTML/mobile/theme/export gates passed root QA.

## Reproduction gaps

Undisclosed data, compute or optimizer values remain explicit instead of inferred. No downloaded model code or weights were executed. Report originals remain unmodified outside the public repository under /tmp/latent-frontier-sources/kimi-linear/. Source-art reuse is limited to the exact grants documented in public notices; independent SVGs copy scientific facts, not a source layout.

## Next check

Root completed fresh integrated desktop/mobile/theme/focus, caption/equation/citation anchors, Markdown/MDX exports, search and agent manifests for revision 3. Earlier browser screenshots do not establish this revised page's quality.




## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
