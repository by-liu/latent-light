# mamba: technical coverage audit

Revision 3. Evidence checked October 10, 2026.

Exact report scope: 2312.00752v2; originalMamba1, representative2.8B base. Primary report text, appendices and targeted pinned implementation functions were inspected. This audit is not a model execution, line-by-line code audit or experimental replication. Source IDs and URLs remain in state/sources.jsonl; exact PDF checksums remain in paper-record.json.

## Coverage map

| Area | Inspected locator | Coverage and decision |
| --- | --- | --- |
| Motivation and failure of fixed lag kernels | §3.1/Figure2 | Addedoriginal selective-copying/induction figure; distinguish synthetic tasks from released long-context capability. |
| Block with main mixing branch and gate | §3.4/Figure3; Mamba.forward/Mamba.step | Coveredcausal depthwise convolution→SiLU→SSM,parallel gate,multiply and down projection. No attention or conventional FFN, not an absence of dense projections. |
| Selective recurrence and exact tensor shapes | §3.2/Algorithm2/Figure1; Mamba1constructor/forward | AddedB/C shared across inner channels,per-channel Δ/A/state,rank-160 step-size projection and negative-A/positive-Δ parameterization. |
| Discretization and concrete implementation | §2/Equation4; Appendix C; Mamba.step fallback | Addedreport ZOH input coefficient versus inspected ΔB input update; exponential transition is common. Avoid claiming that code exactly implements the displayed ZOH input formula. |
| Associative scan and recomputation | §3.3/Appendix D/Algorithm1 | Addedaffine composition equation and known-input scan versus unknown-next-token decode distinction; expanded state history avoidance already covered. |
| Language recipe and checkpoint defaults | §4.3/Table3; Appendix E.2; config and wrapper | Covered300B Pile,2048seqlen,64 layers,width2560,SSMdefaultstraced; noexecutionandnoMamba2substitution. |
| Fixed decoding state and throughput | §4.5/Appendix E.5/Figure8; allocate_inference_cache/step | Coveredderived12.5M iBstate,A100PCIe2048+128benchmarkconditionsandnon2.8B headlinecomparison. NotactualVRAMorbackend-independent speed. |
| Controlled selection and size ablations | §4.6/Tables6–10 | Selective Δ/B/C perplexity tests covered; added low-rank mechanism. Omitfull initialization/state-size score grid because it does not change the checkpoint contract. |
| Other modalities and long sequences | §4.1–4.2/4.4; Appendix E.3–E.4 | Addedaudio selectivity not universally better. Million-token results remain separate tasks/training, not 2.8B assistantlimit. |
| Scalar gate equivalence | Appendix C.1–C.2 | InspectedN1/A−1special-case gating derivation; omitformalproofbecausefull multichannel state equation and branch gate already clear. NotordinaryscalarGRUmodel. |

## Figure selection and rights

Addedsource Figure2 toy-task motivation distinct from block architecture and selective-state figures. Renumbered page figures 1–3 without altering source figure numbers.

Selected paper artwork uses the separately inspected paper or venue grant, never an inference from weights/code licensing. Crops preserve labels and axes; publication-ready files are under public/figures/model-studies/mamba/. Restricted report PDFs remain outside the public repository. figure-provenance.json and state/visuals.jsonl retain exact edition, crop, license and purpose.

## Remaining uncertainty

No model execution, released assistant pipeline or complete compute disclosure. Fixed-state accuracy remains a compression tradeoff; runtime fallback input discretization differs from the paper formula.

## Independent evidence pass

Rechecked numerical values, model/checkpoint boundaries, data units, causal language, report-versus-code contracts and reuse rights after drafting. Broad outcomes are author-reported, not causal attribution to one architectural component. Appendix omissions are deliberate reading-scope choices, not claims of complete experimental reproduction.

## Presentation gates

Canonical report and MDX derivative are revision 3. Source crops reviewed at high resolution. Source crops and the new SVG have been inspected directly. Current desktop/mobile/theme/focus plus Markdown/MDX export QA passed root integration. Prior revision2 browser evidence remains historical and does not attest this revision.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
