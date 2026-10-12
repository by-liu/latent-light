# InternVL3 coverage audit

Revision 3. Evidence inspected October 10, 2026. This is a mechanism audit, not a figure quota or a claim to reproduce the training run.

## Scope and inspected evidence

[Selected report](https://arxiv.org/abs/2504.10479v1) and its full relevant appendices were compared with the existing reader page. Targeted official source files were read at the pinned versions recorded below; none were executed. Exact PDFs remain in /tmp, not in public assets. Sources and claims append to prior evidence history rather than replacing it.

- **S009** [InternVL3 full report mechanism and controlled-evidence audit](https://arxiv.org/pdf/2504.10479v1). Full report inspected, sections2.1–2.5 and3.14 emphasized. Reviewed V2PE recurrence/defaultdelta1, length weighting, MPO equations9–13,8/38/78Bdata generations, InternEVO throughput and Tables11–13 counterevidence. Exact inspected PDF retained in /tmp only; SHA256 71fb503c0f9140aec1d554c7fca16747bd7614e645c057a32829ddbea2f3363b.

## Technique coverage map

| Area | Inspected source locator | Before this audit | Change or justified omission |
| --- | --- | --- | --- |
| Selected post-MPO identity | Report Table1; artifact config/card | 8.1B,300Mvision plusQwen2.5-7Bbase,notInstruct/3.5 covered. | Retain actual24blockvision dimensions and inherited/license mismatch disclosure. |
| Image tiling and thumbnail | Selected dynamic_preprocess/card | 448tiles,aspect/tie rules,max12+thumbnail13 covered. | Retain original Figure1 with896square5views/1280positions and per-view1024→256 reduction. |
| Connector and decoder | extract_feature,pixel_shuffle; config | Classdrop,spatialunshuffle,4096→3584MLP,Q28/KV4 covered. | Retain selected code contract and decoder cache invocation despite configflag discrepancy. |
| Video contract | Selected card video example | Eight sampled frames,one tile each,2048positions and prompt labels covered. | Retain noQwentube/audio claim and contrast reported16–64frame Video-MME policy. |
| V2PE recurrence and release boundary | Report §2.1/§3.14Table12; selected wrapper | Fractional geometry and delta1outsideablation already covered. | Add four-vector numerical recurrence table; do not imply default chat implements it. |
| Native pretraining and weighting | Report §2.2/Eq6;Tables1/11 | 200Bmixed50Btext150Bvisual;allcomponents frompretrained;targetlengthsqrtweight covered. | Retain non-from-scratch scope and length counted loss targets rather than image context. |
| Native controlled experiment | Report §3.14/Figure3 | Correctly scopedInternVL2-8Bcontrolled experiment. | Retain source Figure2; fix stale footnote falsely saying no source artwork reproduced. |
| Infrastructure | Report §2.5 | Training performance infrastructure omitted. | Add expandable multimodal sharding/load balance and50–200%authortrainingthroughput condition. |
| SFT/regularization | Report §2.3 andscript | 21.7M,dataexpansion,JPEG,packing,frozen-stage uncertainty covered. | Retain undisclosed historical optimizer groups; omit invented JPEGqualityrange. |
| MPO mechanism | Report Eq9–13; published8Bscript | Three terms andofflinepairs covered without actual probability form. | Add exact DPO/BCO formulas, SFT reference versusPRMcritic distinction,8/38/78Bresponse sources. |
| Test time selection | Report §2.4 andTable2 | VisualPRMstepmean,best8extra computation covered. | Retain distinctcritic andsingle-response budget,not online training RL. |
| Ablations and counterevidence | Report Tables11–13 | Selected8Bgains andnonmonotonicV2PE covered;language tradeoffs and1BMPO regression absent. | Add language comparisons withnoncausalreleaseboundary and separate1Bregression. |

## Purposeful figure inventory

| Figure or candidate | Decision | Reason |
| --- | --- | --- |
| Figure1, tile-interface.svg | Retain | Selected wrapper geometry makes tiling andthumbnail cost explicit. |
| Figure2, native-pretraining-ablation.webp | Retain | Licensed source Figure3 adds controlled training evidence, correctly labeledInternVL2-8B. |
| Report leaderboardFigure1 | Omit | A leaderboard is not an architecture schematic and repeats score tables. |
| Additional mechanism diagrams | Omit | V2PE small table andMPOequation supply precise missing relationships without redundant visual panels. |

Seven licensed report crops across the five studies remain unchanged; their grants and extraction records are in the per-model public SOURCES.md files and prior evidence records. New SVGs are original work under repository MIT, not traced report artwork. No new third-party artwork grant is inferred from model weights or code licensing.

## Adversarial checks and boundaries

- Selected variant, historical recipe, task finetuning and controlled ablation identities stay distinct.
- Token counts state preprocessing, boundaries and arithmetic assumptions; positional span is not cache size.
- Training targets, frozen modules and inference execution are not inferred from model names or one configuration flag.
- Report findings are labeled author evidence; qualitative examples are not independent benchmark proof.
- No model execution, weights loading, serving or training measurement is claimed.

- Historical300Kpreference subset is not established as byte-for-byte currentMMPR-v1.2publicdata.
- Full original optimizer and frozen-parameter groups are not fully disclosed.
- Default wrapper does not establish a production fractionalV2PEpath.
- Checkpoint/model/benchmark execution was not performed.

## Review status

Source entailment, variant boundaries, equations and local SVG raster previews have been reviewed. New revision3 page desktop/mobile/theme/focus, Markdown/MDX exports and integrated site validation passed root QA. Historical revision2 presentation evidence is retained without being reused as proof of the new page.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
