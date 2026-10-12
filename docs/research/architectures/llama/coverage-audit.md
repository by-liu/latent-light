# llama: technical coverage audit

Revision 3. Evidence checked October 10, 2026.

Exact report scope: 2302.13971v1, February 2023 original LLaMA. Primary report text, appendices and targeted pinned implementation functions were inspected. This audit is not a model execution, line-by-line code audit or experimental replication. Source IDs and URLs remain in state/sources.jsonl; exact PDF checksums remain in paper-record.json.

## Coverage map

| Area | Inspected locator | Coverage and decision |
| --- | --- | --- |
| Serving-optimal versus training-optimal scaling | §1, §3/Figure1 | Covered long training of compact models and scoped1T/1.4T budgets; training loss is not universal downstream quality. |
| RMSNorm pre-norm residual, full MHA, RoPE | §2.2; historical RMSNorm/Attention/TransformerBlock | Covered original MHA rather than later GQA; own architecture diagram is not copied source artwork. |
| SwiGLU dimensions and compute tradeoff | §2.2; historical FeedForward constructor/forward | Covered width11008 derived from rounding and two-thirds adjustment; no isolated architecture ablation claimed. |
| Data mixture, filtering and tokenizer | §2.1/Table1 | Added CCNet/Wikipedia-reference classifier, code-license/file heuristics and TeX processing. Keep sampled proportions distinct from epochs and document redistribution rights. |
| Optimization and efficient attention | §2.3–2.4/Table2 | Covered optimizer, batch and schedule; added exact attention implementation versus sparse attention distinction. |
| Selective checkpointing and distributed training | §2.4 | Added retained expensive linear outputs/recomputed activations; 65B380 tokens/s/GPU and21days not7B. |
| Inference-only code interface | historical Attention.forward/Transformer.forward | Covered cached positions and last-token logits; constructor defaults are not authenticated7B config. |
| Task-specific loss/capability correlation | §3.7/Figure2 | Added WinoGrande counterexample; avoid portraying falling training loss as uniform task gains. |
| Instruction tuning and safety | §4–5/Tables10–14; appendix generated examples | Keep65B instruction experiment separate and risk boundary explicit. Omit copied generated examples and every safety benchmark score because they do not teach a new core7B mechanism. |
| Full MMLU57-subject table | Appendix Table16 | Representative five-shot scores and conditions retained; full per-subject matrix omitted as reference material. |

## Figure selection and rights

No new figure: existing original architecture and licensed loss plot cover the model contract and scaling evidence; prose adds the task-specific counterexample.

Selected paper artwork uses the separately inspected paper or venue grant, never an inference from weights/code licensing. Crops preserve labels and axes; publication-ready files are under public/figures/model-studies/llama/. Restricted report PDFs remain outside the public repository. figure-provenance.json and state/visuals.jsonl retain exact edition, crop, license and purpose.

## Remaining uncertainty

Original approved weight/config files not downloaded. Actual training context not specified in inspected report. Historical noncommercial weight terms remain distinct from GPLv3 software.

## Independent evidence pass

Rechecked numerical values, model/checkpoint boundaries, data units, causal language, report-versus-code contracts and reuse rights after drafting. Broad outcomes are author-reported, not causal attribution to one architectural component. Appendix omissions are deliberate reading-scope choices, not claims of complete experimental reproduction.

## Presentation gates

Canonical report and MDX derivative are revision 3. Source crops reviewed at high resolution. Source crops and the new SVG have been inspected directly. Current desktop/mobile/theme/focus plus Markdown/MDX export QA passed root integration. Prior revision2 browser evidence remains historical and does not attest this revision.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
