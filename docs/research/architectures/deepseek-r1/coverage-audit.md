# Technical coverage audit: deepseek-r1

Evidence checked 2026-10-10; canonical revision 3. This pass compares the inspected complete report, relevant appendices and targeted official artifacts against the published study. It does not claim every report sentence or benchmark column must be duplicated.

## Coverage decisions

| Technique or evidence | Actual source locator | Before/after audit status | Added content or justified omission |
| --- | --- | --- | --- |
| Inherited architecture and public artifact | Sections 2.1, 2.2; V3 report; config | Covered | MLA/MoE inherited, not a novel reasoning attention network. |
| R1-Zero versus cold-start R1 | Sections 2.2–2.3 | Covered | Already pretrained start, Zero no SFT, cold start options and usable policy refinements distinct. |
| GRPO policies and objective | Section 2.2.1, Equations 1–3 | Gap closed | Figure 2 current/old/reference roles; response-level Equation 2, group and zero-variance specification gap. |
| Verifiable, language and preference rewards | Sections 2.2.2, 2.3.2, 2.3.4 | Covered | Rule-only claim limited to Zero; later reward models and scopes retained. |
| Rejection sampling and reset before later SFT | Section 2.3.3; later Nature Figure 2 | Covered | Model-weight versus data-transfer arrows separated; January numbers not silently replaced by later report. |
| Six dense distillation students and comparison | Sections 2.4, 3.2, 4.1; Table 6 | Covered | SFT 800K/no student RL; teacher/base/license distinction and bounded comparison. |
| Process reward and MCTS negative experiments | Section 4.2 | Gap closed | Step labels, reward hacking, branching and unreliable value model; positive reranking uses still stated. |
| Inference protocols and current limits | Section 3.1, Section 5; README | Covered, strengthened | Pass@1 versus consensus budgets, JSON/multiturn weaknesses and zero-shot prompt findings; async future not deployed. |
| Full optimizer hyperparameters and RL budget | Original report omissions | Unresolved disclosure | No fabricated zero-variance policy, rollout count, detailed optimizer schedule or R1 cost. |
| All benchmark rows and qualitative aha trace | Tables 2–5, Figure 3 | Justified selective omission | Useful contrasts and budget retained; anecdotal trace not evidence of consciousness or universally faithful reasoning. |

## Material revision

Added a three-policy GRPO mechanism illustration and original response-level surrogate; separated reward models from omitted critic; expanded unsuccessful process-reward/MCTS experiments and identified asynchronous software evaluation as future work.

## Adversarial pass

Checked equations against source conventions, figure labels and paths against full source pages, reported numerical units and source edition boundaries, and training versus runtime claims. Corrected inaccurate section locators during this pass (V3 MTP is Section 5.4.3, GLM cross-stage distillation is Section 3.5). No active-parameter count is treated as stored memory, no context maximum as robust evaluated recall, and no rollout scheduling optimization as a different algorithm without evidence. Native SVGs were raster-rendered for label/path inspection; a routing label overflow and a chunk-diagram subtitle collision were corrected. New HTML/mobile/theme/export gates passed root QA.

## Reproduction gaps

Undisclosed data, compute or optimizer values remain explicit instead of inferred. No downloaded model code or weights were executed. Report originals remain unmodified outside the public repository under /tmp/latent-frontier-sources/deepseek-r1/. Source-art reuse is limited to the exact grants documented in public notices; independent SVGs copy scientific facts, not a source layout.

## Next check

Root completed fresh integrated desktop/mobile/theme/focus, caption/equation/citation anchors, Markdown/MDX exports, search and agent manifests for revision 3. Earlier browser screenshots do not establish this revised page's quality.




## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
