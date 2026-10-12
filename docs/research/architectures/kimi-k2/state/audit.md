# Source and accounting audit: kimi-k2

Recorded 2026-10-10T07:47:10.842Z. This is a separate prepublication review, not a runtime benchmark.

## Identity and eligibility

Official report inspected at https://arxiv.org/pdf/2507.20534v1. Public representative artifact revision: `fd1984e2b7a3350dbf7305fe73a4ede25c14de50`; inventory includes 61 weight shard files. Only public metadata, config, license and selected source code were read; no weights were downloaded or code executed.

## Checks and corrections

- Table2 reports1.04T/32.6B versus rounded abstract1T/32B. Original Instruct is not Thinking/0905.
- QK-Clip rescales weights after an update using recorded scores; it is not a forward softmax cap or strict guarantee for all future batches.
- MuonClip threshold tau and RL regularization tau are different quantities.
- FP8 activation storage in reported pretraining is distinct from FP8 matrix computation, which authors avoided; release quantization metadata is not training precision.
- Main15.5T token recipe and separately described annealing/context budgets are not summed into a falsely exact unique-data figure.
- Single-attempt SWE and verifier-selected multi-attempt results are separate budgets. ModifiedMIT has large-commercial-product attribution conditions.

## Presentation boundary

The MDX figure source is normalized to a static lanesJson attribute. Its editable source is the page MDX; visuals/figure-1.md is a text equivalent, not a rendered image. Canonical report preserves mechanism meaning as prose and source-linked interpretation. Visual status remains draft until parent rendered/export review.

## Outstanding gates

Full site validation, rendered desktop/mobile and theme review, and agent export review belong to parent integration. Exact report PDFs remain unchanged in the temporary study cache. Only selected figure excerpts are published where an explicit paper or documentation grant was established; the rest of each PDF is not redistributed. No commit, push or deployment.


## Source-figure revision: distinct final audit

Checked 2026-10-10T15:38:20.769Z. Every current source image was inspected against its complete PDF page; labels, arrows, panel headings and legends are retained. Figure anchors and captions are sequential. Complete mechanism text equivalents accompany the source figures. The exact source edition and documentation/paper scope are recorded in visuals/source-figures.md and public asset notices. Native companion panels answer different questions rather than duplicate the reproduced overview. The complete unchanged Figure 8 stays under CC BY-NC-ND 4.0; future monetization or adaptation needs a new rights review.

This audit does not attest new HTML, theme, mobile, focus, or export rendering. Those gates remain pending root integration. No model or source code executed; no commit, push, or deploy.



## Revision 3 technical audit (2026-10-10)

Added source chunk-rephrasing figure with fidelity boundary and max-two-production-rewrite distinction; sparsity/head tradeoffs; synchronous colocated engines, checkpoint refresh and partial agent trajectories.

Complete per-technique decisions: ../coverage-audit.md. Source evidence, relevant code and source assets inspected; separate adversarial source-number-causality pass recorded. Report, claims, visuals and run history preserve prior revisions. Browser/mobile/theme/focus/export gates intentionally reset until fresh root QA.
