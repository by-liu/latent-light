# CLIP coverage audit

Revision 3. Evidence inspected October 10, 2026. This is a mechanism audit, not a figure quota or a claim to reproduce the training run.

## Scope and inspected evidence

[Selected report](https://proceedings.mlr.press/v139/radford21a.html) and its full relevant appendices were compared with the existing reader page. Targeted official source files were read at the pinned versions recorded below; none were executed. Exact PDFs remain in /tmp, not in public assets. Sources and claims append to prior evidence history rather than replacing it.

- **S008** [Published CLIP supplementary material](https://proceedings.mlr.press/v139/radford21a/radford21a-supp.pdf). Full appendices A to I inspected; especially A.3 feature evaluation, B prompt construction, D robustness and I Tables 18 and 20. Appendix I, not F, contains the selected training hyperparameters. Exact inspected PDF retained in /tmp only; SHA256 08808d533b937ee966b8e5af532f6fbe426a5492d8b83ace8d4f75c8215ce41c.
- **S009** [CLIP release tokenizer and encoders, renewed mechanism audit](https://github.com/openai/CLIP/tree/d05afc436d78f1c48dc0dbf8e5980a9d471f35f6/clip). Targeted static reading of clip.py tokenize and model.py encode_text, forward. No model execution. Checked EOS ID selection, truncate boundary, positive log-scale and absence of an inference clamp.

## Technique coverage map

| Area | Inspected source locator | Before this audit | Change or justified omission |
| --- | --- | --- | --- |
| Model identity and dimensions | Report §2.3; selected HF config; code VisionTransformer | Covered B/32, 224 pixels, two encoders, 512 shared width. | Retain selected checkpoint and 151.3M derived count; do not transfer L/14 compute. |
| Architecture and visual tokens | Report Figure 1; code vision class path | Covered 49 patches plus one class feature, no decoder token injection. | Retain original licensed Figure 1 and prose contrasting retrieval with generation. |
| Text and positions | model.py encode_text; clip.py tokenize | Causal/EOS summary covered, truncation contract missing. | Add 77 position error/optional truncation and EOS ID selection. Learned positional embeddings remain explicit. |
| Contrastive objective | Report §2.2, Figure 3; code forward | Symmetric batch loss covered; scale implementation boundary implicit. | Add learned log parameter exponentiation and training cap versus released inference forward. |
| Data collection | Report §2.1 | 400M WIT covered; query collection and balance omitted. | Add 500K queries/up to20K pairs, qualify approximate balance and unreleased data. |
| Training schedule | Published supplement Appendix I Tables18/20 | Numerical settings present but wrongly located at Appendix F. | Correct source locator to Appendix I; explicitly cite published supplement. |
| Prompt ensemble inference | Supplement Appendix B | Template effect covered; vector construction incomplete. | Add normalize → mean → renormalize equation; cached class vectors versus probability ensembles. |
| Linear probes | Supplement Appendix A.3 | Previously only named as supervised evaluation. | Add preprojection 768 width, logistic regression and validation selection in expandable section. |
| Ablations and robustness | Report Figure2; supplement Appendix D/Figure18 | Learning efficiency covered; robustness counterexample absent. | Keep source Figure2 and axis interpretation; add larger-model in/OOD tradeoff with exact variant boundary. |
| Limitations and contamination | Report §§5–6; supplement C,E,F; model card | Bias, counts, fine categories and imperfect duplicate detection covered. | Retain boundaries. Do not infer WIT contamination absence from detector. |
| Other backbones and benchmark catalogue | Report §2.3; supplementary Tables1–17 | Not exhaustively enumerated. | Justified omission: modified ResNets and every dataset row are outside selected ViT-B/32 mechanism; source supports further study. |

## Purposeful figure inventory

| Figure or candidate | Decision | Reason |
| --- | --- | --- |
| Figure1, architecture.webp | Retain | Licensed venue Figure1 clearly explains independent encoders and candidate class inference. |
| Figure2, learning-efficiency.webp | Retain | Different question: learning efficiency under controlled predictive/contrastive baselines. |
| Supplement robustness plots and full score grids | Omit | Variant-conditioned numeric counterexample adds the needed evidence without another dense plot or repeating tables. |

Seven licensed report crops across the five studies remain unchanged; their grants and extraction records are in the per-model public SOURCES.md files and prior evidence records. New SVGs are original work under repository MIT, not traced report artwork. No new third-party artwork grant is inferred from model weights or code licensing.

## Adversarial checks and boundaries

- Selected variant, historical recipe, task finetuning and controlled ablation identities stay distinct.
- Token counts state preprocessing, boundaries and arithmetic assumptions; positional span is not cache size.
- Training targets, frozen modules and inference execution are not inferred from model names or one configuration flag.
- Report findings are labeled author evidence; qualitative examples are not independent benchmark proof.
- No model execution, weights loading, serving or training measurement is claimed.

- ViT-B/32 training FLOPs and accelerator hours are undisclosed.
- WIT and complete historical training execution are not available for independent reproduction.
- No retrieval or classifier benchmark was executed.

## Review status

Source entailment, variant boundaries, equations and local SVG raster previews have been reviewed. New revision3 page desktop/mobile/theme/focus, Markdown/MDX exports and integrated site validation passed root QA. Historical revision2 presentation evidence is retained without being reused as proof of the new page.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
