# mistral-7b: technical coverage audit

Revision 3. Evidence checked October 10, 2026.

Exact report scope: 2310.06825v1; representative Mistral7B v0.1base. Primary report text, appendices and targeted pinned implementation functions were inspected. This audit is not a model execution, line-by-line code audit or experimental replication. Source IDs and URLs remain in state/sources.jsonl; exact PDF checksums remain in paper-record.json.

## Coverage map

| Area | Inspected locator | Coverage and decision |
| --- | --- | --- |
| Dense decoder, RMSNorm/RoPE/SwiGLU | §2/Table1; config; MistralMLP/MistralDecoderLayer | Covered and added two14336branches from4096width, with projection back. |
| Grouped-query attention tensor contract | §2; config; MistralAttention/eager_attention_forward | Added32Q/8K V shapes,4:1group and temporary repeat-versus-cache distinction. |
| Sliding window and depth | §2/Figure1 | Original source figure present; theoretical kWpath not reliable long-context recall or trainedcontext. |
| Ring cache and chunked prefill | §2/Figures2–3 | Original figures present; storage slots versusabsolutepositions and local+causal chunk constraints covered. Backend-specific implementation caveat retained. |
| Reported speedup | §2, efficient implementation paragraph | Added2xspeed at16K/W4096 with modifiedFlash/xFormers, explicitly underdisclosedhardware/precision/batch. |
| Base training recipe | §1–2 | Exact token budget, mixture and optimizer absent from report; mark undisclosed, do not fill with later Mistral recipes. |
| Instruction demonstration and prompt guardrails | §4–5/Table4 | Added175 promptdeclines and10-runMTBench tradeoff, Instructscope notbase; no universal safety guarantee. |
| Benchmark conditions | §3/Tables2–3 | ExistingMMLU/HumanEval/GSM8K conditions retained; addedhand-verifiedMBPP/no-contextTriviaQA comparison caveat. |
| Complete report figures and appendices | 7-pagev1; no appendix | All three technical report figures already present. Remaining score plots/tables linked, not copied merely for volume. |

## Figure selection and rights

No extra figure: source attention, cache and prefill diagrams already cover the three defining efficiency contracts. Added shape trace and scoped empirical evidence in prose.

Selected paper artwork uses the separately inspected paper or venue grant, never an inference from weights/code licensing. Crops preserve labels and axes; publication-ready files are under public/figures/model-studies/mistral-7b/. Restricted report PDFs remain outside the public repository. figure-provenance.json and state/visuals.jsonl retain exact edition, crop, license and purpose.

## Remaining uncertainty

Report lacks reproducible data/compute/training recipe. Table8192context versushosted32768config remains unresolved source difference. No model execution or measured backend eviction.

## Independent evidence pass

Rechecked numerical values, model/checkpoint boundaries, data units, causal language, report-versus-code contracts and reuse rights after drafting. Broad outcomes are author-reported, not causal attribution to one architectural component. Appendix omissions are deliberate reading-scope choices, not claims of complete experimental reproduction.

## Presentation gates

Canonical report and MDX derivative are revision 3. Source crops reviewed at high resolution. Source crops and the new SVG have been inspected directly. Current desktop/mobile/theme/focus plus Markdown/MDX export QA passed root integration. Prior revision2 browser evidence remains historical and does not attest this revision.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
