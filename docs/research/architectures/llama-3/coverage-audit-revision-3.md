# llama-3: technical coverage audit

Revision 3. Evidence checked October 10, 2026.

Exact report scope: 2407.21783v3; July2024 Llama3.1 text releases, representative8B Instruct. Primary report text, appendices and targeted pinned implementation functions were inspected. This audit is not a model execution, line-by-line code audit or experimental replication. Source IDs and URLs remain in state/sources.jsonl; exact PDF checksums remain in paper-record.json.

## Coverage map

| Area | Inspected locator | Coverage and decision |
| --- | --- | --- |
| Dense decoder, tokenizer, GQA and scale | §2–3/Tables1–3; official3.1card; pinned Llama implementation | Covered8B dimensions/compute,128K context, vocabulary compression and derived16GiB raw cache; no405B FLOPs assigned8B. |
| Data cleaning and data-mixture design | §3.1.1–3.1.3 | Added URL/document dedup, frequent-line rules, model quality signals and coarsefinal50/25/17/8 percentages. Exact source reconstruction remains unavailable. |
| Document attention boundary | §3.2 | Added original block-diagonal causal mask diagram and text equivalent. No claim about SFT packing masks, which this report passage does not specify. |
| Pretraining long context and annealing | §3.4.1–3.4.3 | Covered six extension stages and800B405B tokens. Omit exact annealing40M tokens/checkpoint averaging hyperparameters to avoid confusing with40B data-probe budget; report available for reproduction. |
| 4D training parallelism, numerical stability and fault recovery | §3.3/Tables4–5 | Added distinct TP/PP/CP/FSDPaxes; detailed fault counts/network topology omitted because they are infrastructure history, not portable8B recipe. |
| Reward model and human annotations | §4.1.2/§4.2.1/Table6 | Covered preferences/rewardmodel loop; all-data RM versusrecent DPO batches added. Edited>chosen>rejected annotation and random packed ranking are useful optional reproduction details omitted from main flow. |
| SFT/DPO exact differences | §4.1.3–4.1.6 | Added response-onlySFTloss, formatting-tokenDPOmask,β.1 and.2chosenNLL,6 rounds; defaults largest-model scope. PPOcomparison bounded. |
| Synthetic data generation, rejection sampling, filtering failures | §4.2.2–4.2.3/§4.3.1 | Added10–30 candidates and codingjudgefiltering regression due to difficulty imbalance. Omit individual prompt galleries and generation templates. |
| Long-context SFT and tool use | §4.3.4–4.3.5/Table7 | Addedchunk→fullsourceQA, hierarchicalsummary, repositorytasks and.1%example-not-token boundary. Tool externalexecution contract retained. |
| Safety, benchmark contamination, evaluation | §5/Tables11–24; appendices | Covered selected basecardcomparisons and safety limits; full task/safety gallery and8gramcontamination thresholds omitted because dataset-specific and not reproduction claim. |
| Serving parallelism and FP8 | §6.1–6.2/Figures25–27 | Added405B16H100B F16scope, FFN-focusedFP8 exclusions and response-distribution QA. No 8B serving speed borrowed. |
| Experimental vision/speech beyond text release | §7–8/appendices | Inspected scope; intentionally omitted from this text3.1study. These experimental adapters are not the selected July3.1textcheckpoint. |

## Figure selection and rights

Added original eight-position attention-mask schematic, not a trace of report artwork. Original report architecture/posttraining views remain linked because a reusable publication grant was not found.

Selected paper artwork uses the separately inspected paper or venue grant, never an inference from weights/code licensing. Crops preserve labels and axes; publication-ready files are under public/figures/model-studies/llama-3/. Restricted report PDFs remain outside the public repository. figure-provenance.json and state/visuals.jsonl retain exact edition, crop, license and purpose.

## Remaining uncertainty

RepresentativeHFcheckpoint is gated; exact configuration not directly inspected. Public code/card dimensions remain report-grounded, not authenticated checkpoint trace. ArXiv nonexclusive report distribution is not public artwork reuse permission.

## Independent evidence pass

Rechecked numerical values, model/checkpoint boundaries, data units, causal language, report-versus-code contracts and reuse rights after drafting. Broad outcomes are author-reported, not causal attribution to one architectural component. Appendix omissions are deliberate reading-scope choices, not claims of complete experimental reproduction.

## Presentation gates

Canonical report and MDX derivative are revision 3. Source crops reviewed at high resolution. Source crops and the new SVG have been inspected directly. Current desktop/mobile/theme/focus plus Markdown/MDX export QA passed root integration. Prior revision2 browser evidence remains historical and does not attest this revision.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
