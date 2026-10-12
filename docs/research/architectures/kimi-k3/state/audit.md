# Source and accounting audit: kimi-k3

Recorded 2026-10-10T07:47:10.842Z. This is a separate prepublication review, not a runtime benchmark.

## Identity and eligibility

Official report inspected at https://raw.githubusercontent.com/MoonshotAI/Kimi-K3/3cb39dfd32e51c3328e2e4b4af21341247d06c43/k3_tech_report.pdf. Public representative artifact revision: `f831ab66814297da540d832a5235f8e904f29d06`; inventory includes 96 weight shard files. Only public metadata, config, license and selected source code were read; no weights were downloaded or code executed.

## Checks and corrections

- Report Table1 2.78T/104.2B is distinguished from abstract2.8T/104B. No complete token or training compute budget is disclosed.
- Three KDA plus one MLA repeated23times with one final MLA gives69KDA+24MLA=93layers, not contiguous stacks.
- Depth attention sources are prior block representations for the same token, not temporal KV history.
- SiTU bounds the pre-output-projection multiplicative activation, not the final expert or residual output.
- Quantile routing bias takes effect on the next step and is frozen for inference; selected mixture weights remain unbiased.
- Report MTP/draft training does not imply automatic draft inference in main config with num_nextn_predict_layers0.
- Approximately2.5x fitted scaling gain changes the combined recipe, not one mechanism in isolation. Harness, effort, compaction and sampling conditions remain explicit.
- CustomK3 license contains qualifying Model-as-a-Service agreement conditions, not standardMIT.

## Presentation boundary

The MDX figure source is normalized to a static lanesJson attribute. Its editable source is the page MDX; visuals/figure-1.md is a text equivalent, not a rendered image. Canonical report preserves mechanism meaning as prose and source-linked interpretation. Visual status remains draft until parent rendered/export review.

## Outstanding gates

Full site validation, rendered desktop/mobile and theme review, and agent export review belong to parent integration. Exact report PDFs remain unchanged in the temporary study cache. Only selected figure excerpts are published where an explicit paper or documentation grant was established; the rest of each PDF is not redistributed. No commit, push or deployment.


## Source-figure revision: distinct final audit

Checked 2026-10-10T15:38:20.769Z. Every current source image was inspected against its complete PDF page; labels, arrows, panel headings and legends are retained. Figure anchors and captions are sequential. Complete mechanism text equivalents accompany the source figures. The exact source edition and documentation/paper scope are recorded in visuals/source-figures.md and public asset notices. Native companion panels answer different questions rather than duplicate the reproduced overview.

This audit does not attest new HTML, theme, mobile, focus, or export rendering. Those gates remain pending root integration. No model or source code executed; no commit, push, or deploy.



## Revision 3 technical audit (2026-10-10)

Added exact quantile margin/cutoff update and licensed original figure; clipped nine-teacher OPD equation; draft feature-fusion/acceptance-overlap objective; licensed fine-grained prefix-caching figure; MoonEP execution balancing and fleet cache affinity/admission boundaries.

Complete per-technique decisions: ../coverage-audit.md. Source evidence, relevant code and source assets inspected; separate adversarial source-number-causality pass recorded. Report, claims, visuals and run history preserve prior revisions. Browser/mobile/theme/focus/export gates intentionally reset until fresh root QA.
