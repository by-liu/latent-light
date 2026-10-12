# Source and accounting audit: deepseek-v2

Recorded 2026-10-10T07:47:10.842Z. This is a separate prepublication review, not a runtime benchmark.

## Identity and eligibility

Official report inspected at https://arxiv.org/pdf/2405.04434v1. Public representative artifact revision: `4461458f186c35188585855f28f77af5661ad489`; inventory includes 55 weight shard files. Only public metadata, config, license and selected source code were read; no weights were downloaded or code executed.

## Checks and corrections

- 236B total and 21B active are report counts; 6 routed experts plus 2 shared matches configuration.
- The derived latent-only cache is 34,560 elements per token, or 69,120 bytes at two bytes per element; it excludes runtime state and is not the inspected expanded-cache path.
- 172.8K H800 hours is per trillion training tokens, not total project cost. 5.76x is deployed throughput under a length distribution, not isolated MLA latency.
- 128K evaluated/extended range differs from 32K extension training and 163,840 configured positions.
- SFT and RL benchmark differences include regressions. Internal MLA/MHA ablations are not the final release.

## Presentation boundary

The MDX figure source is normalized to a static lanesJson attribute. Its editable source is the page MDX; visuals/figure-1.md is a text equivalent, not a rendered image. Canonical report preserves mechanism meaning as prose and source-linked interpretation. Visual status remains draft until parent rendered/export review.

## Outstanding gates

Full site validation, rendered desktop/mobile and theme review, and agent export review belong to parent integration. Exact report PDFs remain unchanged in the temporary study cache. Only selected figure excerpts are published where an explicit paper or documentation grant was established; the rest of each PDF is not redistributed. No commit, push or deployment.


## Source-figure revision: distinct final audit

Checked 2026-10-10T15:38:20.769Z. Every current source image was inspected against its complete PDF page; labels, arrows, panel headings and legends are retained. Figure anchors and captions are sequential. Complete mechanism text equivalents accompany the source figures. The exact source edition and documentation/paper scope are recorded in visuals/source-figures.md and public asset notices. Native companion panels answer different questions rather than duplicate the reproduced overview.

This audit does not attest new HTML, theme, mobile, focus, or export rendering. Those gates remain pending root integration. No model or source code executed; no commit, push, or deploy.



## Revision 3 technical audit (2026-10-10)

Replaced the repetitive cache card with the licensed source attention comparison; added absorbed score and output equations, query compression versus KV caching, assignment dropping exceptions and balanced compute versus traffic.

Complete per-technique decisions: ../coverage-audit.md. Source evidence, relevant code and source assets inspected; separate adversarial source-number-causality pass recorded. Report, claims, visuals and run history preserve prior revisions. Browser/mobile/theme/focus/export gates intentionally reset until fresh root QA.
