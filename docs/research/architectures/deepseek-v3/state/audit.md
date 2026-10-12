# Source and accounting audit: deepseek-v3

Recorded 2026-10-10T07:47:10.842Z. This is a separate prepublication review, not a runtime benchmark.

## Identity and eligibility

Official report inspected at https://arxiv.org/pdf/2412.19437v1. Public representative artifact revision: `e815299b0bcbac849fa540c768ef21845365c9eb`; inventory includes 163 weight shard files. Only public metadata, config, license and selected source code were read; no weights were downloaded or code executed.

## Checks and corrections

- 671B is the main network, whereas 685B includes the additional roughly14B MTP module; 37B is reported active main-model computation.
- The MTP branch conditions on a legal extra-prefix token for its own extra target; it does not leak into the main target.
- Bias changes selection, not output mixture weights. A small sequence balancing loss remains.
- 2.788M H800 hours covers official stages and excludes earlier research/experiments; the stipulated rental calculation is not full project cost.
- Report FP8 and communication gains require the described numerical paths and system. Main inference has both naive and absorbed MLA cache modes.

## Presentation boundary

The MDX figure source is normalized to a static lanesJson attribute. Its editable source is the page MDX; visuals/figure-1.md is a text equivalent, not a rendered image. Canonical report preserves mechanism meaning as prose and source-linked interpretation. Visual status remains draft until parent rendered/export review.

## Outstanding gates

Full site validation, rendered desktop/mobile and theme review, and agent export review belong to parent integration. Exact report PDFs remain unchanged in the temporary study cache. Only selected figure excerpts are published where an explicit paper or documentation grant was established; the rest of each PDF is not redistributed. No commit, push or deployment.


## Source-figure revision: distinct final audit

Checked 2026-10-10T15:38:20.769Z. Every current source image was inspected against its complete PDF page; labels, arrows, panel headings and legends are retained. Figure anchors and captions are sequential. Complete mechanism text equivalents accompany the source figures. The exact source edition and documentation/paper scope are recorded in visuals/source-figures.md and public asset notices. Native companion panels answer different questions rather than duplicate the reproduced overview. V3 deliberately reuses the permitted generic V2 documentation graphic; dimensions remain V3-specific.

This audit does not attest new HTML, theme, mobile, focus, or export rendering. Those gates remain pending root integration. No model or source code executed; no commit, push, or deploy.



## Revision 3 technical audit (2026-10-10)

Added a routing controller diagram and selection/weight scaling distinction; batch balancing counterevidence; precise FP8 scaling/accumulation/state protections; DualPipe costs; separate serving configurations; pretraining versus SFT masking; workload-qualified MTP acceptance.

Complete per-technique decisions: ../coverage-audit.md. Source evidence, relevant code and source assets inspected; separate adversarial source-number-causality pass recorded. Report, claims, visuals and run history preserve prior revisions. Browser/mobile/theme/focus/export gates intentionally reset until fresh root QA.
