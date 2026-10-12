# qwen3-vl: revision 3 coverage audit

Checked 2026-10-10. DeepStack, dynamic visual input and time/geometry are separate contracts. Two new independent mechanism diagrams complement the retained residual-addition view; new data and reward details preserve variant and ablation boundaries.

| Dimension | Primary source locator | Coverage decision |
| --- | --- | --- |
| Visual processing | §2; VisionModel.forward / rot_pos_emb | Added full pixels-to-sequence map, vision 2D RoPE + interpolated absolute positions, per-tube full spatial attention. |
| DeepStack | §2.2; _deepstack_process | Covered; retained detailed residual-only visual position diagram as Figure 2. |
| Positions and time | §2.1–2.3; apply_interleaved_mrope | Added frequency-allocation and timestamp diagram, exact 24/20/20 layout and text-coordinate identity. |
| Token budget | Processor/config; Eq. 1 | Covered worked image/video counts; no overhead-free claim. |
| Pretraining/data | Table 1; §3.2.3–3.2.9 | Added document formats, normalized coordinates, virtual-camera boxes, synthesized tool-response boundary. |
| Post training | §4.2–4.5 | Added distinct SFT/Thinking ratios and two difficulty filters; teacher and checkpoint recipe uncertainty preserved. |
| Ablations | Tables 11–12; Fig. 3 | Added encoder experiment identity and mixed zero-shot results; no causal claim for released 8B. |
| Original figure inventory | Report Fig. 1 p3, Fig. 2 p17, Fig. 3 p25 | Fig. 1 inspected; reuse grant unverified. Two original SVGs explain mechanisms. OCR and needle plots not copied; family/headline conditions remain explicit. |

## Adversarial review

Rechecked scope and entailment for new claims separately from drafting. Checkpoint dimensions, family training summaries, auxiliary experiments and optimized serving behavior are not interchangeable. Source artwork permission is assessed separately from weights/code licenses. No weights, models, benchmarks or serving systems were executed. Final render gates passed fresh root integration checks.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
