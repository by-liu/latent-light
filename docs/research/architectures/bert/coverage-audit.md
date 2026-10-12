# bert: technical coverage audit

Revision 3. Evidence checked October 10, 2026.

Exact report scope: 1810.04805v2; figure edition NAACL 2019 N19-1423. Primary report text, appendices and targeted pinned implementation functions were inspected. This audit is not a model execution, line-by-line code audit or experimental replication. Source IDs and URLs remain in state/sources.jsonl; exact PDF checksums remain in paper-record.json.

## Coverage map

| Area | Inspected locator | Coverage and decision |
| --- | --- | --- |
| Input, embeddings, bidirectional encoder, post-LN and GELU | §3, Appendix A.2; BertEmbeddings/BertIntermediate/BertSelfOutput/BertOutput | Covered; made GELU explicit. Figures 1 and 2 establish architecture and addition, not concatenation. |
| MLM prediction head and shared embedding weights | §3.1; BertPredictionHeadTransform, BertLMPredictionHead, BertForMaskedLM._tied_weights_keys | Added linear→GELU→LayerNorm→vocabulary projection; pinned code distinguishes head from encoder. |
| Uniform WordPiece masking and 80/10/10 corruption | §3.1; Appendix A.2 and C.2/Table 8 | Added partial-word selection, document-level spans, frozen NER mask-mixture comparison. Not whole-word masking or universally optimal corruption. |
| NSP and loss | §3.1; §5.1/Table 5 | Covered including MLM+NSP versus LTR objective confound. A/B can contain multiple sentences. |
| Optimization, short/long schedule, data units | Appendix A.2; §3.1 | Covered Adam, warmup, decay, 90% short sequence schedule; corpus words not exposure tokens. |
| Fine tuning versus frozen feature extraction | §3.2 and §5.3/Table 7 | Added frozen last-four-layer concat plus trained BiLSTM; case-preserving CoNLL2003, 5 restarts, development metric. Not hosted uncased MLM score. |
| Inference heads, padding and tokenizer | §3.2; original README; BertModel/ForMaskedLM | Covered one encoder pass and task head; no causal cache, lowercasing/accent removal. |
| Model-size and training-duration ablations | §5.2/Table 6; Appendix C.1/Figure 5 | Model sizes/schedule retained; omit full 8-model score matrix and convergence figure because they add experimental breadth rather than a new mechanism. Link report for these results. |
| Full downstream task formulas and hyperparameters | Appendices A.3–A.5/B | General task-head distinction retained; omit every GLUE dataset and grid-search value. They require a reproduction tutorial rather than a model-architecture overview. |

## Figure selection and rights

No new figure: both licensed source figures already teach distinct backbone and input contracts. Additional masking/NER diagrams would duplicate prose and tables.

Selected paper artwork uses the separately inspected paper or venue grant, never an inference from weights/code licensing. Crops preserve labels and axes; publication-ready files are under public/figures/model-studies/bert/. Restricted report PDFs remain outside the public repository. figure-provenance.json and state/visuals.jsonl retain exact edition, crop, license and purpose.

## Remaining uncertainty

No model execution; no independent score reproduction. Training data unavailable as an exact reconstructed historical corpus.

## Independent evidence pass

Rechecked numerical values, model/checkpoint boundaries, data units, causal language, report-versus-code contracts and reuse rights after drafting. Broad outcomes are author-reported, not causal attribution to one architectural component. Appendix omissions are deliberate reading-scope choices, not claims of complete experimental reproduction.

## Presentation gates

Canonical report and MDX derivative are revision 3. Source crops reviewed at high resolution. Source crops and the new SVG have been inspected directly. Current desktop/mobile/theme/focus plus Markdown/MDX export QA passed root integration. Prior revision2 browser evidence remains historical and does not attest this revision.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
