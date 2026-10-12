# Source and accounting audit: deepseek-r1

Recorded 2026-10-10T07:47:10.842Z. This is a separate prepublication review, not a runtime benchmark.

## Identity and eligibility

Official report inspected at https://arxiv.org/pdf/2501.12948v1. Public representative artifact revision: `56d4cbbb4d29f4355bab4b9a39ccb717a14ad5ad`; inventory includes 163 weight shard files. Only public metadata, config, license and selected source code were read; no weights were downloaded or code executed.

## Checks and corrections

- Full R1, R1-Zero, R1-0528 and six distilled students are different artifacts.
- Later800K SFT starts from V3-Base; the reasoning-RL actor supplies curated examples.
- The inherited14.8T base training is not an R1-specific new run. RL compute and rollout totals remain unknown.
- Final broad RL includes preference models; rule-only rewards apply to narrower experiments.
- Distilled students use SFT without the reported RL stage, retain underlying architecture/licenses, and do not inherit MLA.
- Consensus@64 and averaged pass@1 are different budgets; visible reasoning is not guaranteed faithful introspection.

## Presentation boundary

The MDX figure source is normalized to a static lanesJson attribute. Its editable source is the page MDX; visuals/figure-1.md is a text equivalent, not a rendered image. Canonical report preserves mechanism meaning as prose and source-linked interpretation. Visual status remains draft until parent rendered/export review.

## Outstanding gates

Full site validation, rendered desktop/mobile and theme review, and agent export review belong to parent integration. Exact report PDFs remain unchanged in the temporary study cache. Only selected figure excerpts are published where an explicit paper or documentation grant was established; the rest of each PDF is not redistributed. No commit, push or deployment.


## Source-figure revision: distinct final audit

Checked 2026-10-10T15:38:20.769Z. Every current source image was inspected against its complete PDF page; labels, arrows, panel headings and legends are retained. Figure anchors and captions are sequential. Complete mechanism text equivalents accompany the source figures. The exact source edition and documentation/paper scope are recorded in visuals/source-figures.md and public asset notices. Native companion panels answer different questions rather than duplicate the reproduced overview. The later Nature pipeline is explicitly separated from the original January benchmark protocol.

This audit does not attest new HTML, theme, mobile, focus, or export rendering. Those gates remain pending root integration. No model or source code executed; no commit, push, or deploy.



## Revision 3 technical audit (2026-10-10)

Added a three-policy GRPO mechanism illustration and original response-level surrogate; separated reward models from omitted critic; expanded unsuccessful process-reward/MCTS experiments and identified asynchronous software evaluation as future work.

Complete per-technique decisions: ../coverage-audit.md. Source evidence, relevant code and source assets inspected; separate adversarial source-number-causality pass recorded. Report, claims, visuals and run history preserve prior revisions. Browser/mobile/theme/focus/export gates intentionally reset until fresh root QA.
