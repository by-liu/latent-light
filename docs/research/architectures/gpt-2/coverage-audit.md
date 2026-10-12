# gpt-2: revision 3 coverage audit

Checked 2026-10-10. A useful inspectable decoder baseline. Newly checked tokenizer construction and depth-aware initialization clarify the boundary between a report, an inference graph and restored trained weights.

| Dimension | Primary source locator | Coverage decision |
| --- | --- | --- |
| Task transfer | §2 and Tables 3–4 | Covered; preserved capacity and largest-model conditions. |
| Decoder and cache | model.py / sample.py | Covered; retained two original code-grounded figures. |
| Tokenizer | §2.2 | Added UTF-8 base, learned BPE merges and category/space segmentation. |
| Initialization | §2.3; model.py conv1d | Added report versus inference-definition distinction; not a fabricated training implementation. |
| Data and compute | §2.1, §3 | Covered WebText scope; training budget remains undisclosed. |
| Figure inventory | Report Figures 1–5 | Transfer, overlap and learning-curve plots do not supply architecture/cache diagrams. No extra figure needed for short tokenizer explanation. |

## Adversarial review

Rechecked scope and entailment for new claims separately from drafting. Checkpoint dimensions, family training summaries, auxiliary experiments and optimized serving behavior are not interchangeable. Source artwork permission is assessed separately from weights/code licenses. No weights, models, benchmarks or serving systems were executed. Final render gates passed fresh root integration checks.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
