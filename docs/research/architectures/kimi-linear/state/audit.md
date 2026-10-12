# Source and accounting audit: kimi-linear

Recorded 2026-10-10T07:47:10.842Z. This is a separate prepublication review, not a runtime benchmark.

## Identity and eligibility

Official report inspected at https://arxiv.org/pdf/2510.26692v1. Public representative artifact revision: `e1df551a447157d4658b573f9a695d57658590e9`; inventory includes 20 weight shard files. Only public metadata, config, license and selected source code were read; no weights were downloaded or code executed.

## Checks and corrections

- Released5.7T checkpoint differs from matched1.4T architecture experiments.
- 27artifactlayers contain20KDA+7MLA; approximately3:1 does not mean exactly75% of all state is removed.
- The artifact and forward code select8routed experts plus1shared; report phrase including shared is ambiguous.
- The expanded residual-delta recurrence in Equation1 is algebraically equivalent to the source recurrence.
- KDA recurrent matrix shape is bounded, but global history and convolution state remain; HF MLA caches expanded keys/values.
- Batch-one decoding is roughly2.3x at1M in Figure7;6.3x headline also exploits larger batching and is described as theoretical in Section6. It is not a universal latency result.
- Final Moonlight comparison changes total capacity48Bvs16B, so it does not isolate attention.
- Repository license text and official weight-card metadata both indicateMIT.

## Presentation boundary

The MDX figure source is normalized to a static lanesJson attribute. Its editable source is the page MDX; visuals/figure-1.md is a text equivalent, not a rendered image. Canonical report preserves mechanism meaning as prose and source-linked interpretation. Visual status remains draft until parent rendered/export review.

## Outstanding gates

Full site validation, rendered desktop/mobile and theme review, and agent export review belong to parent integration. Exact report PDFs remain unchanged in the temporary study cache. Only selected figure excerpts are published where an explicit paper or documentation grant was established; the rest of each PDF is not redistributed. No commit, push or deployment.


## Source-figure revision: distinct final audit

Checked 2026-10-10T15:38:20.769Z. Every current source image was inspected against its complete PDF page; labels, arrows, panel headings and legends are retained. Figure anchors and captions are sequential. Complete mechanism text equivalents accompany the source figures. The exact source edition and documentation/paper scope are recorded in visuals/source-figures.md and public asset notices. Native companion panels answer different questions rather than duplicate the reproduced overview.

This audit does not attest new HTML, theme, mobile, focus, or export rendering. Those gates remain pending root integration. No model or source code executed; no commit, push, or deploy.



## Revision 3 technical audit (2026-10-10)

Added an independent causal chunk/interchunk-state diagram, WY/UT details, constrained DPLR savings, explicit kernel complexity and local fast-memory learning interpretation; sharpened hybrid-ratio generalization/runtime tradeoff.

Complete per-technique decisions: ../coverage-audit.md. Source evidence, relevant code and source assets inspected; separate adversarial source-number-causality pass recorded. Report, claims, visuals and run history preserve prior revisions. Browser/mobile/theme/focus/export gates intentionally reset until fresh root QA.
