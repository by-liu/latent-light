# Qwen2-VL coverage audit

Revision 3. Evidence inspected October 10, 2026. This is a mechanism audit, not a figure quota or a claim to reproduce the training run.

## Scope and inspected evidence

[Selected report](https://arxiv.org/abs/2409.12191v2) and its full relevant appendices were compared with the existing reader page. Targeted official source files were read at the pinned versions recorded below; none were executed. Exact PDFs remain in /tmp, not in public assets. Sources and claims append to prior evidence history rather than replacing it.

- **S008** [Qwen2-VL full report and qualitative appendix audit](https://arxiv.org/pdf/2409.12191v2). Full52page selected PDF inspected, including method, resolution/M-RoPE ablations and qualitative appendix examples. The appended mathematical source document is OCR example content, not a separate model report. Exact inspected PDF retained in /tmp only; SHA256 30bb0f6c9babf910295d6b7cd34b6f54824236f68782664c3c93fbf4803275d0.
- **S009** [Qwen2-VL vision segmentation and coordinate implementation audit](https://github.com/huggingface/transformers/blob/8cb5963cc22174954e7dca2c0a3320b7dc2f4edc/src/transformers/models/qwen2_vl/modeling_qwen2_vl.py). rot_pos_emb,vision forward cu_seqlens,Qwen2VLVisionAttention,get_rope_index and cached offset inspected. No seconds_per_grid, timestamp tokens, window blocks or DeepStack in this selected version.
- **S010** [Qwen2-VL frame padding and patch grouping audit](https://github.com/huggingface/transformers/blob/8cb5963cc22174954e7dca2c0a3320b7dc2f4edc/src/transformers/models/qwen2_vl/image_processing_qwen2_vl.py). _preprocess temporal padding and reshape/transpose arrange contiguous2x2neighbors for merger. Static code inspected; no inference run.

## Technique coverage map

| Area | Inspected source locator | Before this audit | Change or justified omission |
| --- | --- | --- | --- |
| Selected release identity | Report §2.1/Table1; artifact config/card | 7BInstruct identified;7.6B+675M dimensions and32K context covered. | Retain checkpoint-specific scope, not72B or laterVL family features. |
| Image preprocessing | Pinned image processor smart_resize/_preprocess | Aspect budget,RGB,14patch,28rounding,aspect cap,temporal still duplication covered. | Add odd-video last-frame padding boundary. |
| Merger and token counts | Report §2.1; PatchMerger; processor reshape | 2x2concat1280→5120→3584 and448x672→384 covered. | Retain Figure1 and explicit no averaging/no class language feature assumptions. |
| Vision attention | Vision rot_pos_emb,forward cu_seqlens,attention segments | Two-dimensional rotary positions covered; temporal segmentation missing. | Add full spatial attention per temporal tube, no cross-tube ViT attention, packed lengths and remaining quadratic work. |
| Language architecture | Config and apply_multimodal_rotary_pos_emb | 28layers,Q28/KV4,rotary16/24/24 covered. | Clarify channel groups not distinct heads and Q/K, not V, rotation. |
| M-RoPE coordinates | get_rope_index; report §2.1 | Three axes,max-coordinate resumption and cache offset covered abstractly. | Add exact toy2x3coordinate Figure2 and sequence/coordinate distinction. |
| Temporal meaning | get_rope_index t_index; report training FPS | Video time advances but physical timing boundary missing. | Add ordinal tube time versus seconds/timestamps; do not importQwen2.5/Qwen3 contracts. |
| Training stages and targets | Report §2.2 | 600Bvision,800Ball,instruction vision-freeze,text targets covered. | Retain unknown merger optimizer grouping and undisclosed precise proportions/compute. |
| Output and tool formats | Report §2.2 formatting/examples | ChatML/tool executor boundary present,grounding range omitted. | Add normalized[0,1000)box convention, external validation/execution. |
| Inference and visual budget | Artifact processor/card; model forward/cached path | Placeholder expansion,feature scattering,combined sequence budget covered. | Retain selected defaults4–16384 versus example overrides, no runtime measurement. |
| Evaluation and ablations | Report Tables4,7,8 andFigure5 | Resolution tradeoff and internal1.5Bposition study correctly scoped. | Add768frame Video-MME policy, preserve score regressions and selected32K versus72Bextrapolation boundary. |
| Qualitative appendix | Report appendix multimodal examples | Not reproduced as figures. | Justified omission: examples illustrate behavior, not controlled validation; source artwork reuse grant unverified and some source documents carry separate rights. |

## Purposeful figure inventory

| Figure or candidate | Decision | Reason |
| --- | --- | --- |
| Figure1, visual-interface.svg | Retain | Independent selected-checkpoint patch/merger accounting. |
| Figure2, mrope-coordinates.svg | Add | Independent coordinate recurrence distinguishes geometry,physical slots and tube ordinals. |
| Original report architecture and qualitative examples | Link only | No general reuse grant verified for separately hosted artwork; code/checkpoint Apache2 does not establish permission. |

Seven licensed report crops across the five studies remain unchanged; their grants and extraction records are in the per-model public SOURCES.md files and prior evidence records. New SVGs are original work under repository MIT, not traced report artwork. No new third-party artwork grant is inferred from model weights or code licensing.

## Adversarial checks and boundaries

- Selected variant, historical recipe, task finetuning and controlled ablation identities stay distinct.
- Token counts state preprocessing, boundaries and arithmetic assumptions; positional span is not cache size.
- Training targets, frozen modules and inference execution are not inferred from model names or one configuration flag.
- Report findings are labeled author evidence; qualitative examples are not independent benchmark proof.
- No model execution, weights loading, serving or training measurement is claimed.

- Complete original optimizer, data mixture proportions and checkpoint compute are undisclosed.
- No processor/model runtime trace was performed; calculations follow selected static code.
- Original report architecture artwork reuse permission remains unverified.

## Review status

Source entailment, variant boundaries, equations and local SVG raster previews have been reviewed. New revision3 page desktop/mobile/theme/focus, Markdown/MDX exports and integrated site validation passed root QA. Historical revision2 presentation evidence is retained without being reused as proof of the new page.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
