# Source and accounting audit: qwen3

Recorded 2026-10-10T07:47:10.842Z. This is a separate prepublication review, not a runtime benchmark.

## Identity and eligibility

Official report inspected at https://arxiv.org/pdf/2505.09388v1. Public representative artifact revision: `8efa61729e24bd65b1d152b5ab5409052aa80e65`; inventory includes 118 weight shard files. Only public metadata, config, license and selected source code were read; no weights were downloaded or code executed.

## Checks and corrections

- Original switchable April/May235B checkpoint is distinct from July separate Thinking/Instruct releases.
- 64Q/4KV heads at128 width and94layers give96,256KV elements per position per batch item; precision affects bytes, not element count.
- 36T processed training tokens and3,995 verifier prompts are different units and stages.
- 32K training,40,960 config capacity and128K YaRN evaluation are separately labeled.
- The1,800 vs17,920 GPU-hour comparison concerns an internal8B experiment, not flagship training cost.
- Mode fusion is policy learning and template control, not a separate reasoning neural block.

## Presentation boundary

The MDX figure source is normalized to a static lanesJson attribute. Its editable source is the page MDX; visuals/figure-1.md is a text equivalent, not a rendered image. Canonical report preserves mechanism meaning as prose and source-linked interpretation. Visual status remains draft until parent rendered/export review.

## Outstanding gates

Full site validation, rendered desktop/mobile and theme review, and agent export review belong to parent integration. Exact report PDFs remain unchanged in the temporary study cache. Only selected figure excerpts are published where an explicit paper or documentation grant was established; the rest of each PDF is not redistributed. No commit, push or deployment.


## Source-figure revision: distinct final audit

Checked 2026-10-10T15:38:20.769Z. Every current source image was inspected against its complete PDF page; labels, arrows, panel headings and legends are retained. Figure anchors and captions are sequential. Complete mechanism text equivalents accompany the source figures. The exact source edition and documentation/paper scope are recorded in visuals/source-figures.md and public asset notices. Native companion panels answer different questions rather than duplicate the reproduced overview. No report-artwork reuse grant established; source Figure 1 is linked, and the native diagram retains separate network/flagship/student paths.

This audit does not attest new HTML, theme, mobile, focus, or export rendering. Those gates remain pending root integration. No model or source code executed; no commit, push, or deploy.



## Revision 3 technical audit (2026-10-10)

Separated student distillation from the overview; added the student-prefix/teacher-logit figure, exact pretraining exposures and context methods, distinct reward types, global-batch balancing and dense32B stage tradeoffs; KL direction remains undisclosed.

Complete per-technique decisions: ../coverage-audit.md. Source evidence, relevant code and source assets inspected; separate adversarial source-number-causality pass recorded. Report, claims, visuals and run history preserve prior revisions. Browser/mobile/theme/focus/export gates intentionally reset until fresh root QA.
