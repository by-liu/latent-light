# t5: technical coverage audit

Revision 3. Evidence checked October 10, 2026.

Exact report scope: 1910.10683v4; licensed JMLR 21(140), 2020 figure edition. Primary report text, appendices and targeted pinned implementation functions were inspected. This audit is not a model execution, line-by-line code audit or experimental replication. Source IDs and URLs remain in state/sources.jsonl; exact PDF checksums remain in paper-record.json.

## Coverage map

| Area | Inspected locator | Coverage and decision |
| --- | --- | --- |
| Text interface and task-specific correctness | §2.4/Figure 1; Appendix D | Covered with source Figure 1 and task-prefix examples. Omit exhaustive formatted benchmark examples in Appendix D. |
| Encoder/decoder visibility and comparisons | §2.1 and §3.2/Figure 4 | Covered bidirectional source, causal target and cross attention. Source Figure 4 shows comparison models, not modules of T5. |
| Pre-normalization, ReLU, shared vocabulary and relative bias | §2.1; T5LayerNorm/T5DenseActDense/T5Attention | Covered exact original variant, bias bucketing, stack sharing and tensor dimensions. Do not import gated FFN from v1.1. |
| Span corruption, sentinel ordering and target length | §3.3/Figures 2 and 5, Tables 4–7 | Covered source Figure 2, conditional loss, 15% rate and mean span3; objective differences can affect cost more than scores. Omit selection flowchart as redundant. |
| C4 construction and corpus effects | §2.2/§3.4.1/Table 8 | Added representative cleaning rules. Corpus composition is not neutral; retain byte versus token units. |
| Multitask sampling and transfer | §3.5.2–3.5.3/Tables 11–12; §3.7 | Added capped example probabilities and temperature equation; equal-weight and mixed-pretraining+fine tuning evidence is survey scope. |
| Repeated data versus unique data | §3.4.2/Table 9/Figure 6, JMLR PDF pp28–29 | Added original Figure 6 and paired downstream evidence; some repetition did not harm transfer. Do not infer downstream accuracy from training-loss plot alone. |
| Optimization and final scale | §3.1, §3.6–3.7/Tables 13–14 | Covered AdaFactor, schedules, final1M-step budget and separate34B survey. Omit all seven-task scaling tables except focused SuperGLUE example. |
| Inference and checkpoint variant | T5ForConditionalGeneration; selected config | Covered encode once, causal decoder cache, fixed cross-memory, pad start, EOS and task formatting. |
| All experiment scores and contamination analysis | Appendix C and E/Table16 | Inspect to check per-task metric meaning; omit massive Appendix E matrix. Corpus/benchmark overlap caveat remains; exact reproduced contamination rates are outside scope. |

## Figure selection and rights

Added source Figure 6, page29, because it teaches why low training loss can be misleading. Other three original figures cover interface, architecture comparison and corruption.

Selected paper artwork uses the separately inspected paper or venue grant, never an inference from weights/code licensing. Crops preserve labels and axes; publication-ready files are under public/figures/model-studies/t5/. Restricted report PDFs remain outside the public repository. figure-provenance.json and state/visuals.jsonl retain exact edition, crop, license and purpose.

## Remaining uncertainty

No execution, exact historical corpus reconstruction or checkpoint-specific accelerator hours/FLOPs. ArXiv version and licensed venue edition are recorded separately.

## Independent evidence pass

Rechecked numerical values, model/checkpoint boundaries, data units, causal language, report-versus-code contracts and reuse rights after drafting. Broad outcomes are author-reported, not causal attribution to one architectural component. Appendix omissions are deliberate reading-scope choices, not claims of complete experimental reproduction.

## Presentation gates

Canonical report and MDX derivative are revision 3. Source crops reviewed at high resolution. Source crops and the new SVG have been inspected directly. Current desktop/mobile/theme/focus plus Markdown/MDX export QA passed root integration. Prior revision2 browser evidence remains historical and does not attest this revision.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
