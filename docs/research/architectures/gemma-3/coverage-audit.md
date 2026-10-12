# gemma-3: technical coverage audit

Revision 3. Evidence checked October 10, 2026.

Exact report scope: 2503.19786v1; March2025Gemma3, representative27B IT. Primary report text, appendices and targeted pinned implementation functions were inspected. This audit is not a model execution, line-by-line code audit or experimental replication. Source IDs and URLs remain in state/sources.jsonl; exact PDF checksums remain in paper-record.json.

## Coverage map

| Area | Inspected locator | Coverage and decision |
| --- | --- | --- |
| Decoder residual norms and QK norms | §2; Gemma3DecoderLayer.forward/Gemma3Attention.forward | Addedpre/postbranchRMSNorm ordering andper-headQKnorm beforeRoPE. Do not importGemma2softcap orplainLlamanormcontract. |
| 5:1 local/global attention and context | §2/Figures6–7; configclass | Covered1024reportstudywindow, local10K/global1M RoPEbases, trained32K→128K extension andderivedcachecost. Generic4096defaultnotcheckpointclaim. |
| Visual encoder and projector | §2; Gemma3M ultiModalProjector.forward | CoveredfrozenadaptedSigLIP,896views,spatialaveragepool→256 tokens→RMS→projection. NoOCRwordsorimagegenerationoutput. |
| Image-placeholder injection and multimodal mask | Gemma3M odel.forward; token_type_ids_mask_function | Addedconditionedprefill image-block bidirectionality, causal text andfuture-image boundary; code-specific, not a report-verified training mask. |
| Pan and Scan | §2.2/Table8/Figure3; imageprocessor | Coveredoriginalpluscropviews,256perviewformula andprocessor-dependentthresholds. RetainPTvsITcaptionconflict. |
| Pretraining distillation and data | §3.1–3.2 | Covered256sampledteacherlogits,renormalizeddistribution,14T multimodalcount,precomputedvision; teacheridentity/completecorpusundisclosed. |
| Posttraining and QAT | §3.3–3.4/Tables3–4 | CoveredBOND/WARM/WARPfamilysignals,code/math/humanreward,5K QATsteps andrepresentations; do notlabelGRPO. |
| Architecture and image ablations | §4.2/Figures4–7/Tables5–8 | Sourcecache/extensionplotsanddistinctresolutionexperimentretained; internal2B/9B not27B scope explicit. Omitadditionalperplexitygalleryasredundant. |
| Long-context task evidence | Appendix Table15 andbenchmarksettingsTable19 | Added27B ITRULER32K91.1→128K66.0 andMRCR63.2→59.3, score/taskconditionsratherthanuniform128K quality. |
| Video and broad benchmark appendix | Appendix Tables16–19 | Inspectvideo16-frameevaluationboundary; omitasnotnative video architecture/training claim. Fullscorematrixlinked,notcurrentranking. |

## Figure selection and rights

Existing original multimodalflow pluslicensedcacheandextensionplots coverinterfaceandmemory. Extraimage-maskdiagramwouldrepeatmaskfigureselsewhere; precise prose conditions are clearer.

Selected paper artwork uses the separately inspected paper or venue grant, never an inference from weights/code licensing. Crops preserve labels and axes; publication-ready files are under public/figures/model-studies/gemma-3/. Restricted report PDFs remain outside the public repository. figure-provenance.json and state/visuals.jsonl retain exact edition, crop, license and purpose.

## Remaining uncertainty

Gated27B checkpointandprocessorartifactsnotdirectlyinspected. Publiccodeisimplementationevidencenotverifiedexactmodelconfig. PanScanPT/ITsourceconflict unresolved; teacheridentities/FLOPs/duration absent.

## Independent evidence pass

Rechecked numerical values, model/checkpoint boundaries, data units, causal language, report-versus-code contracts and reuse rights after drafting. Broad outcomes are author-reported, not causal attribution to one architectural component. Appendix omissions are deliberate reading-scope choices, not claims of complete experimental reproduction.

## Presentation gates

Canonical report and MDX derivative are revision 3. Source crops reviewed at high resolution. Source crops and the new SVG have been inspected directly. Current desktop/mobile/theme/focus plus Markdown/MDX export QA passed root integration. Prior revision2 browser evidence remains historical and does not attest this revision.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
