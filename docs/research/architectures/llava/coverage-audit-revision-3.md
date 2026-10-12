# LLaVA coverage audit

Revision 3. Evidence inspected October 10, 2026. This is a mechanism audit, not a figure quota or a claim to reproduce the training run.

## Scope and inspected evidence

[Selected report](https://arxiv.org/abs/2310.03744v2) and its full relevant appendices were compared with the existing reader page. Targeted official source files were read at the pinned versions recorded below; none were executed. Exact PDFs remain in /tmp, not in public assets. Sources and claims append to prior evidence history rather than replacing it.

- **S009** [LLaVA-1.5 full report and appendix technique audit](https://arxiv.org/pdf/2310.03744v2). Full main report and Appendices A to C inspected. Native224HD tiling, target grid selection, padding removal, row ends/global view, no extra alignment stage, format prompts, greedy protocol, OCR-assisted TextVQA and single-middle-frame SEED video evaluation. Exact inspected PDF retained in /tmp only; SHA256 b7074a6dad218e0dd109f2a80311548d447e1cf4b9e31c002696985784cc05b9.
- **S010** [LLaVA published TextVQA workflow and prompt contract](https://github.com/haotian-liu/LLaVA/blob/c121f0432da27facab705978f83c4ada465e46fd/scripts/v1_5/eval/textvqa.sh). Shell example uses13B and OCR-containing question file. model_vqa_loader.py forwards line text unchanged into prompt; eval_textvqa.py removes OCR tokens/Reference OCR token decorations for question matching. This is protocol inspection, not7B score reproduction.
- **S011** [LLaVA evaluation loader and TextVQA scorer](https://github.com/haotian-liu/LLaVA/tree/c121f0432da27facab705978f83c4ada465e46fd/llava/eval). Targeted model_vqa_loader.py CustomDataset and eval_textvqa.py prompt_processor. No model or evaluator executed.

## Technique coverage map

| Area | Inspected source locator | Before this audit | Change or justified omission |
| --- | --- | --- | --- |
| Original versus1.5 identity | Original §3–4; improved §3; selected config | Linear224/595K/158K versusMLP336/558K/665K covered. | Retain variant comparison; do not backport later anyres behavior into selected1.5. |
| Original synthetic instruction data | Original §3 and data prompt appendix | Text-only GPT4 sees captions/bboxes, not pixels. | Retain symbolic supervision limitation; no need to reproduce every copyrighted dataset example. |
| Fixed visual encoding and injection | Selected CLIP wrapper and projector/input assembly | Penultimate class-drop,576patch vectors,placeholder replacement,20.98Mconnector covered. | Retain exact selected dimensions and causal sequence interpretation. |
| Vision/text positions | Selected config and code | Fixed CLIP learned positions and decoder RoPE covered; no row-end positions in fixed path. | Keep this boundary; separate HD row ends below. |
| High resolution mechanism | Improved §3.4 and Appendix A.1 | HD named but method not taught. | Add native224 independent local encodings, spatial reconstruction, padding removal, row ends,global view and no extra alignment stage. |
| HD token budget | Improved Appendix A.1 | No worked HD count. | Add independent Figure2 and explicit448square/no-padding1312position derivation. |
| Training stages/loss | Original §4; improved Appendix A.2; training code | Frozen vision,alignment-only projector,MLP+LLM SFT and assistant loss covered. | Retain original3epochs versus1.5oneepoch boundary and loss masks. |
| Data and response format | Improved §3.2, Appendix A.2 | Response-format and image-QA conversation grouping covered. | Retain core technique; omit batch-by-modality25%speedup because not essential to selected inference explanation. |
| Inference and video boundary | Improved §4.1 and Appendix A.2 | Greedy benchmark-specific prompts covered; video handling generic. | Add exact single middle frame SEED video setting. |
| OCR benchmark conditions | Improved §4.4; published TextVQA workflow/loader/scorer | Task scores labeled but external OCR cue condition missing. | Add OCR-assisted protocol and13Bscript versus7Bscore boundary. |
| Ablation and source evidence | Improved Table2,Figure4, §5.1; original ScienceQA | Sequential changes and normalized data-efficiency plot covered. | Keep source figures, renumber efficiency toFigure3; add global-view conditioned comparison. |
| Limitations | Improved Appendix C, §§5.1–5.2 | Hallucination,domain/multiple-image limits covered. | Retain evidence; do not turn data granularity hypothesis into universal causal proof. |

## Purposeful figure inventory

| Figure or candidate | Decision | Reason |
| --- | --- | --- |
| Figure1, original-architecture.webp | Retain | Licensed original report drawing, explicitly labeled linear original rather than1.5 dimensions. |
| Figure2, hd-interface.svg | Add | Independently authored native224HD flow makes local/global evidence and row separators clear. |
| Figure3, data-efficiency.webp | Retain, renumber | Purposeful separate empirical plot of normalized instruction-mixture subsampling. |
| Improved report HD Figure2 with city photograph | Do not reproduce | Its mechanism inspired study coverage, not visual tracing. Separate third-party dataset photograph reuse grant was not established; abstract original grids avoid that boundary. |

Seven licensed report crops across the five studies remain unchanged; their grants and extraction records are in the per-model public SOURCES.md files and prior evidence records. New SVGs are original work under repository MIT, not traced report artwork. No new third-party artwork grant is inferred from model weights or code licensing.

## Adversarial checks and boundaries

- Selected variant, historical recipe, task finetuning and controlled ablation identities stay distinct.
- Token counts state preprocessing, boundaries and arithmetic assumptions; positional span is not cache size.
- Training targets, frozen modules and inference execution are not inferred from model names or one configuration flag.
- Report findings are labeled author evidence; qualitative examples are not independent benchmark proof.
- No model execution, weights loading, serving or training measurement is claimed.

- No released fixed1.5checkpoint is claimed to implement the separate HD processor.
- The HD report lists target grids with some inconsistent maximum-resolution prose; this study states up-to-six local views without repeating that maximum.
- TextVQA scoring and model runtime were not reproduced.

## Review status

Source entailment, variant boundaries, equations and local SVG raster previews have been reviewed. New revision3 page desktop/mobile/theme/focus, Markdown/MDX exports and integrated site validation passed root QA. Historical revision2 presentation evidence is retained without being reused as proof of the new page.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
