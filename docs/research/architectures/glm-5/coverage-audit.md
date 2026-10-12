# Technical coverage audit: glm-5

Evidence checked 2026-10-10; canonical revision 3. This pass compares the inspected complete report, relevant appendices and targeted official artifacts against the published study. It does not claim every report sentence or benchmark column must be duplicated.

## Coverage decisions

| Technique or evidence | Actual source locator | Before/after audit status | Added content or justified omission |
| --- | --- | --- | --- |
| MLA/DSA architecture and artifact disagreement | Sections 2.1–2.2; Appendix A; config | Covered | 78 artifact versus 80 narrative layers, parameter convention 744B/40B; DSA selected attention not whole model linear. |
| Sparse adaptation and alternatives | Sections 2.1–2.2, Table 3–6 | Covered selectively | 20B adaptation and mixed task outcomes retained; 9B models, 190B token alternative comparisons not GLM-5 final costs. |
| MuonSplit and shared-depth MTP | Section 2.1, Table 2 | Covered, strengthened | Per-head optimizer and three depths; private four step acceptance 2.76 versus 2.55; no unsupported all cache sharing inference. |
| Data stages, SFT and masked bad segments | Sections 2.3, 3.1, Figure 5 | Covered | Exposure/unique-token distinction; source pipeline and stage disclosures. |
| Synchronous GRPO/IcePop probability correction | Section 3.2 Equations 1; hyperparameters | Gap closed | Old training / old inference multiplier distinct from current training / old training PPO ratio; KL removed and 32 × 32 setup. |
| Async agent objective and TITO | Section 4.1 | Gap closed | Current / recorded rollout probabilities and masked log-prob surrogate; optimizer reset, stale/crash filters; no PPO conflation. |
| Cross-stage on-policy distillation | Section 3.5, Equation 2 | Gap closed | Detached teacher/student log ratio, group size 1 and batch size 1,024; not standardized answer-group reward. |
| Interleaved/preserved thinking and tool wrappers | Section 3.1 Figure 7; Appendix B.2 | Gap closed | Source Figure 3 shows within-tool versus across-turn context; wrapper must preserve spans. |
| slime, data parallel affinity, memory and quantization | Sections 2.4, 3.6, 4.1.2 | Covered, strengthened | FP8 rollout/prefill/decode split, affinity, ZeRO2/offload, INT4 SFT versus selected BF16 checkpoint. |
| Environment suites and benchmark conditions | Section 4.2; Appendix B | Covered selectively | 10K real SWE and harness-specific limits; do not duplicate every domain plot/internal benchmark. |
| Detailed current-reference operator execution | Artifact config plus report, no executed training stack | Unresolved reproduction | Report assertions qualified; no runtime performance or deterministic operator test on this machine. |

## Material revision

Added preserved-thinking source art; separated synchronous precision ratios from async stale-policy masking; explicit detached distillation advantage; MTP private acceptance protocol and train/rollout/INT4 artifact boundaries.

## Adversarial pass

Checked equations against source conventions, figure labels and paths against full source pages, reported numerical units and source edition boundaries, and training versus runtime claims. Corrected inaccurate section locators during this pass (V3 MTP is Section 5.4.3, GLM cross-stage distillation is Section 3.5). No active-parameter count is treated as stored memory, no context maximum as robust evaluated recall, and no rollout scheduling optimization as a different algorithm without evidence. Native SVGs were raster-rendered for label/path inspection; a routing label overflow and a chunk-diagram subtitle collision were corrected. New HTML/mobile/theme/export gates passed root QA.

## Reproduction gaps

Undisclosed data, compute or optimizer values remain explicit instead of inferred. No downloaded model code or weights were executed. Report originals remain unmodified outside the public repository under /tmp/latent-frontier-sources/glm-5/. Source-art reuse is limited to the exact grants documented in public notices; independent SVGs copy scientific facts, not a source layout.

## Next check

Root completed fresh integrated desktop/mobile/theme/focus, caption/equation/citation anchors, Markdown/MDX exports, search and agent manifests for revision 3. Earlier browser screenshots do not establish this revised page's quality.




## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
