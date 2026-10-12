# deepseek-v4-1-flash: revision 3 coverage audit

Checked 2026-10-10. CED, CSA2 and hierarchical candidate selection optimize different operations. The added original search-pool figure and scoped Engram/DSpark/vision/optimizer details make those boundaries explicit.

| Dimension | Primary source locator | Coverage decision |
| --- | --- | --- |
| CED and approximate replay | §2.2; optimized schedule vs reference forward | Covered; retained original schedule and explicit approximate128-token replay. |
| CSA2 modes | §2.3.1 Fig4 | Covered Full/Reindex/Reuse storage versus selection. |
| Hierarchical indexer | §2.3.2 Fig5 pp11–12 | Added original figure, block-max pool construction and post-training introduction. |
| FP4/global memory | §2.4.4 | Covered precision/exclusions; not a packed reference-code measurement. |
| Engram/DSpark | §2.4.2–2.4.3 | Added n-gram configuration/prefetch and five-position Markov/confidence scheduling plus gradient isolation. |
| Optimization/mHC | §2.4.1/§2.5 Algorithm1 | Added distinction between residual constraints and balanced optimizer updates. |
| Vision preparation | §2.5; §4.2 pp22–23 | Added contrastive-to-AR resolution curriculum, disposable auxiliary LLM and freeze exception. |
| Distributed shared-state training | §3.1.2 pp17–18 | Added shadow replicas with one logical owner and synchronization, not communication-free reuse. |
| Evaluation figures | Figs1–2,6–12; Tables3–5 | Covered model/harness/effort conditions. Multiple cost/performance curves and task-specific scaling charts omitted because they are not isolated architectural evidence. |

## Adversarial review

Rechecked scope and entailment for new claims separately from drafting. Checkpoint dimensions, family training summaries, auxiliary experiments and optimized serving behavior are not interchangeable. Source artwork permission is assessed separately from weights/code licenses. No weights, models, benchmarks or serving systems were executed. Final render gates passed fresh root integration checks.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
