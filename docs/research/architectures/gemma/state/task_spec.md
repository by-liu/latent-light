# gemma: model-generation study contract

## Primary question

How does this Gemma generation work, what distinguishes it from adjacent generations, and what do inspected reports and released artifacts actually establish?

## Intended reader and use

Readers with Transformer foundations seeking a technically usable mental model. Explain distinctive mechanisms and deployment contracts, not reproduce an entire report or enumerate every checkpoint.

## Scope and time boundary

Report and appendices, representative public checkpoint, official reference configuration and targeted inference implementation. Evidence checked October 10, 2026. Distinguish report editions, Gemma1 versus1.1 alignment, Gemma2 internal ablations versus final students, and Gemma4 dense/MoE/E-series/unified variants.

## Exclusions

No model execution, weight download, dataset download, measured runtime, confidential material, commit, push, deployment, or inferred undisclosed training hyperparameters. Gemma3 remains a separate existing study; Gemma3n is a catalog note because no matching standalone report was found.

## Deliverables

Canonical report.md, derived model MDX, claim/source/run/visual ledgers, coverage audit, paper and asset records, original source crops and precise original architecture explanation when reports lack one.

## Report contract

Canonical Markdown with claim-local native footnotes; full explanation rendered in MDX, not a summary. Highlights and scoped numbers first, then architecture, training, inference, evaluation and limitations. Public web and GitHub distribution; no restricted full PDF in public tree. No recurring refresh scheduled.

## Visual contract

Use useful original report figures first. Gemma1 and2 have no original architecture figure, so create independently authored SVG views from inspected methods and code. Source plots have CC BY4.0 attribution and exact crop/version records. Gemma4 figure2 contains an illustrative image; check mixed provenance and do not reuse it separately. Every figure sequentially numbered with concise caption, text equivalent and full-size link; narrow dense figures use keyboard panning. Inspect actual raster and responsive render.

## Research map

- Identity, model/license boundaries: report, model cards, stated terms.
- Architecture and shapes: report tables, official configuration, implementation trace.
- Training: disclosed objective/stages/data, explicit material omissions.
- Inference: cache, masks, token count, processor and generation boundary.
- Evidence and refutation: exact ablation size/setting, prompt and reasoning budget confounds, absent runtime reproduction.
- Presentation: annotated architecture, source figures, readable scales, full Markdown export.

## Budget and checkpoints

Bounded three-generation expansion. First pass source identity and methods; second pass targeted configurations/code/figures; third adversarial fact/variant/rights review; final rendered/export/structural checks. Stop adding material when these dimensions are covered, not after a source-count quota.

## Success criteria

Complete, cited, substantive page; every central mechanism explained; sources inspected and contradictions represented; selected figures directly compared with original pages; native math and complete exports; public-safe state; structural validator passed. Parent performs collection integration and full-site validation; do not falsely record parent checks before they run.

## User-supplied facts

User requested missing Gemma generations and authorized parallel agents. No user-supplied architecture values.

## Assumptions and decisions

Separate model-weight terms, software licenses and report artwork. Report/config/code inspection is not benchmark replication or proof of deployability.
