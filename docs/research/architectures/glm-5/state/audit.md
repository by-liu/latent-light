# Source and accounting audit: glm-5

Recorded 2026-10-10T07:47:10.842Z. This is a separate prepublication review, not a runtime benchmark.

## Identity and eligibility

Official report inspected at https://arxiv.org/pdf/2602.15763v1. Public representative artifact revision: `c183ef8c61faee82855eca1ed9bb3a9a7ce3b0b2`; inventory includes 282 weight shard files. Only public metadata, config, license and selected source code were read; no weights were downloaded or code executed.

## Checks and corrections

- Report744B/40B count convention includes MTP and excludes embeddings/output.
- Artifact78layers matches appendix3dense+75MoE, while narrative80layers remains a documented disagreement.
- Weight card labels MIT; repository license text is Apache2.0. The page now treats these as distinct artifact scopes.
- DSA selects history positions, not experts; only main selected attention has bounded top-k work. Indexer/cache/other layers remain.
- DSA adaptation comparisons have individual regressions; they are not literal losslessness.
- Async token importance masking, TITO identity, staleness filtering and the separate reasoning objective are not collapsed into generic PPO.

## Presentation boundary

The MDX figure source is normalized to a static lanesJson attribute. Its editable source is the page MDX; visuals/figure-1.md is a text equivalent, not a rendered image. Canonical report preserves mechanism meaning as prose and source-linked interpretation. Visual status remains draft until parent rendered/export review.

## Outstanding gates

Full site validation, rendered desktop/mobile and theme review, and agent export review belong to parent integration. Exact report PDFs remain unchanged in the temporary study cache. Only selected figure excerpts are published where an explicit paper or documentation grant was established; the rest of each PDF is not redistributed. No commit, push or deployment.


## Source-figure revision: distinct final audit

Checked 2026-10-10T15:38:20.769Z. Every current source image was inspected against its complete PDF page; labels, arrows, panel headings and legends are retained. Figure anchors and captions are sequential. Complete mechanism text equivalents accompany the source figures. The exact source edition and documentation/paper scope are recorded in visuals/source-figures.md and public asset notices. Native companion panels answer different questions rather than duplicate the reproduced overview. Explicit text retains all stage exposure/context labels without equating rounded labels to exact unique-data accounting.

This audit does not attest new HTML, theme, mobile, focus, or export rendering. Those gates remain pending root integration. No model or source code executed; no commit, push, or deploy.



## Revision 3 technical audit (2026-10-10)

Added preserved-thinking source art; separated synchronous precision ratios from async stale-policy masking; explicit detached distillation advantage; MTP private acceptance protocol and train/rollout/INT4 artifact boundaries.

Complete per-technique decisions: ../coverage-audit.md. Source evidence, relevant code and source assets inspected; separate adversarial source-number-causality pass recorded. Report, claims, visuals and run history preserve prior revisions. Browser/mobile/theme/focus/export gates intentionally reset until fresh root QA.
