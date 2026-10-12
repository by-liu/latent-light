# mixtral: technical coverage audit

Revision 3. Evidence checked October 10, 2026.

Exact report scope: 2401.04088v1; representative Mixtral8x7B v0.1base. Primary report text, appendices and targeted pinned implementation functions were inspected. This audit is not a model execution, line-by-line code audit or experimental replication. Source IDs and URLs remain in state/sources.jsonl; exact PDF checksums remain in paper-record.json.

## Coverage map

| Area | Inspected locator | Coverage and decision |
| --- | --- | --- |
| MoE substitution and full-attention context | §2/Table1; hosted config | Covered routedFFNat everylayer, sharedattention,47B total/13B active,32K full causal, not dense Mistral window. |
| Top-two weighted experts and tensor dispatch | §2.1/Equation1/Figure1; MixtralSparseMoeBlock.forward | Coveredexact selectedsoftmaxequivalence, token×8router, expertgather/weightedscatter; base8 experts not eight independent models. |
| Expert capacity and systems costs | §2.1; code expert loops | Coveredall-weights residency, batches touching all experts andexpert-parallel communication; configuration auxiliary loss is not proof of original training coefficient. |
| Routing specialization and locality | §5/Table5/Figures7–10 | AddedTable5Arxivlayer15values27.9/62.3 andrandom12.5/46.4baselines; originalFigure 10 showsdistinctcriteria. No fixed topic experts or measured cache optimization claimed. |
| Training and multilingual sampling | §2–3 | Data/optimizer/token/compute undisclosed; presentlanguage/contextdisclosures only. |
| Instruct alignment | §4 | CoveredSFTthenDPO, not online PPO; no fabricated pair counts/hyperparameters. |
| Base evaluations and long range | §3/Tables2–3/Figure4 | CoveredmatchedauthorpipelineMMLU/HumanEval plusGSMpromptdiscrepancy andsynthetic passkey boundary. Omitpasskeyplotbecauseperfect needle retrieval is not deep context understanding. |
| Instruct quality and bias | §4/Table4 andappendixroutingplots | Risk/scope retained; omitinstruction leaderboard/bias gallery because it is not router mechanism proof. Figure 10 complements, rather than repeats, routingFigure1. |

## Figure selection and rights

Added original Figure 10 onrouting locality; purpose is to connect token assignment structure to workload, not advertise a speedup. Existing Figure 1 shows the mechanism.

Selected paper artwork uses the separately inspected paper or venue grant, never an inference from weights/code licensing. Crops preserve labels and axes; publication-ready files are under public/figures/model-studies/mixtral/. Restricted report PDFs remain outside the public repository. figure-provenance.json and state/visuals.jsonl retain exact edition, crop, license and purpose.

## Remaining uncertainty

Full recipe and token/compute budgets undisclosed. No executed routing trace/scheduler benchmark. Expertloadoptimization remains an inference about measured assignment patterns.

## Independent evidence pass

Rechecked numerical values, model/checkpoint boundaries, data units, causal language, report-versus-code contracts and reuse rights after drafting. Broad outcomes are author-reported, not causal attribution to one architectural component. Appendix omissions are deliberate reading-scope choices, not claims of complete experimental reproduction.

## Presentation gates

Canonical report and MDX derivative are revision 3. Source crops reviewed at high resolution. Source crops and the new SVG have been inspected directly. Current desktop/mobile/theme/focus plus Markdown/MDX export QA passed root integration. Prior revision2 browser evidence remains historical and does not attest this revision.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
