# Technical coverage audit: deepseek-v2

Evidence checked 2026-10-10; canonical revision 3. This pass compares the inspected complete report, relevant appendices and targeted official artifacts against the published study. It does not claim every report sentence or benchmark column must be duplicated.

## Coverage decisions

| Technique or evidence | Actual source locator | Before/after audit status | Added content or justified omission |
| --- | --- | --- | --- |
| MLA joint compression, decoupled RoPE and query latent | Sections 2.1.2–2.1.3; Appendix B; released attention forward | Covered, strengthened | Equations 1–3 and query latent paragraph separate latent cache from query activation compression. |
| Absorbed inference versus expanded cache implementation | Section 2.1.2; HF DeepseekV2Attention.forward | Gap closed | Headwise score and output association now explicit; actual HF cache caveat retained. |
| Shared experts, fine granularity and device routing | Sections 2.2.1–2.2.3; config and MoEGate | Covered, strengthened | Three device limit, assignment drops, 10% no drop training sequences, no evaluation dropping and communication balance boundaries. |
| Training data, schedule and context extension | Sections 3.1.1–3.1.4 | Covered | 8.1T exposure, AdamW schedule, growing batch and 32K extension, not 128K training. |
| SFT and two stage GRPO with reward models | Sections 4.1–4.2 | Covered | Unlike R1-Zero, learned reward construction remains explicit; undisclosed data retained as gap. |
| Attention and alignment ablations | Appendix C; Table 3 | Corrected | Removed close-count language: larger attention comparison has different 25B/21.5B active counts. Alignment regression retained. |
| MHA/GQA/MQA detailed comparison | Appendix C.1 | Justified selective omission | Source figure shows cache representations; experimental layer adjustments confound universal ranking, so no blanket MLA superiority claim or repeated score plot. |
| Regional data filtering and qualitative examples | Appendices D–F | Justified omission | Moral/instruction anecdotes and multilingual qualitative outputs do not isolate MLA; no universal cultural neutrality inference. |
| Runtime and independent benchmark reproduction | Section 3.2.3 (training and inference efficiency); static code only | Out of scope | No weights or kernels executed; hardware-scoped author results only. |

## Material revision

Replaced the repetitive cache card with the licensed source attention comparison; added absorbed score and output equations, query compression versus KV caching, assignment dropping exceptions and balanced compute versus traffic.

## Adversarial pass

Checked equations against source conventions, figure labels and paths against full source pages, reported numerical units and source edition boundaries, and training versus runtime claims. Corrected inaccurate section locators during this pass (V3 MTP is Section 5.4.3, GLM cross-stage distillation is Section 3.5). No active-parameter count is treated as stored memory, no context maximum as robust evaluated recall, and no rollout scheduling optimization as a different algorithm without evidence. Native SVGs were raster-rendered for label/path inspection; a routing label overflow and a chunk-diagram subtitle collision were corrected. New HTML/mobile/theme/export gates passed root QA.

## Reproduction gaps

Undisclosed data, compute or optimizer values remain explicit instead of inferred. No downloaded model code or weights were executed. Report originals remain unmodified outside the public repository under /tmp/latent-frontier-sources/deepseek-v2/. Source-art reuse is limited to the exact grants documented in public notices; independent SVGs copy scientific facts, not a source layout.

## Next check

Root completed fresh integrated desktop/mobile/theme/focus, caption/equation/citation anchors, Markdown/MDX exports, search and agent manifests for revision 3. Earlier browser screenshots do not establish this revised page's quality.




## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
