# Knowledge Distillation coverage audit

Evidence inspected October 14, 2026 (America/Vancouver). This is a five-page
learning collection, not five complete model-report reproductions. Each page
is canonical MDX; its own state records bind figures and claims to that page.
No separate article or generated research ledger is published as a site page.

## Reader and evidence map

| Page | Coverage | Primary evidence and important boundary |
| --- | --- | --- |
| Overview | Motivation, transfer contract, reading route and limits of imitation | Hinton, FitNets, Born Again Networks, SeqKD, GKD, rationale supervision and the 2023 imitation critique. Signal/experience/objective is our organizing synthesis. |
| Foundations | Soft targets, temperature, forward/reverse KL, hard/soft mixing, exact toy calculations, sequence factorization and prefix expectation | Definitions and actual objectives inspected; local derivations and numerical examples are labeled. MiniLLM's sequence optimizer is not assigned to every token-matching method. |
| Modern Methods | Access constraints, output/features/relationships, student experience, contrastive methods, cross-tokenizer matching, rationales, privileged context and recent agent work | GKD Algorithm 1, DistiLLM-2 v2, ALM v4, OPCD v2, Dr. OPD and OPID. Recent preprints are not ranked as universal SOTA. MiniLM and MiniLLM remain distinct. |
| LLM/VLM Recipes | Six disclosed recipes; pretraining versus post-training; text reasoning versus visual transfer; recent consolidation; diffusion/drafting plus brief speech/retrieval connections | Targeted original report sections, not an unqualified full-report audit. Model artifacts are linked through existing studies. The R1 expanded edition has different appendix/table references from v1. |
| Practice and Evaluation | Coverage plan, baseline sequence, fixed-prefix KL core, loss normalization, storage math, teacher serving, asynchronous staleness, controlled testing and complete cost | Proposed workflow with explicit hypothetical calculations. Hugging Face docs are version-sensitive and not an executed trainer. No model or device benchmark was run. |

## Separate challenge pass

- Rechecked the exact prefix expectation and stop-gradient boundary in GKD.
  A local forward token KL on student prefixes is not the sequence forward-KL
  chain rule evaluated under teacher trajectories.
- Rechecked MiniLLM's sequence-level policy-gradient formulation and stabilizers;
  did not describe every reverse-KL loss as MiniLLM.
- Rechecked DistiLLM-2's epoch-batched response collection and asymmetric skew
  objectives; did not relabel it as DPO or fully fresh per-step rollouts.
- Corrected a wrong TinyCLIP discovery identifier: `2303.15389` is EVA-CLIP.
  The actual TinyCLIP source is `2309.12314`. The unrelated paper is not evidence.
- Corrected the draft's loose “teacher-assistance experiments” description of
  Gemma 2. Its 7B-to-2B, 500B-token ablation is not Teacher Assistant KD and is
  not the final 9B recipe or gain.
- Softened the introductory parameter-file language: distillation is training,
  but recipes such as TinyCLIP can also inherit teacher weights.
- Kept Gemma 3's probability-weighted sampled targets distinct from top-k targets.
  The implementation chapter states the support problem for reverse KL with
  zero-mass truncated teacher targets.
- Kept Qwen3's KL direction undisclosed in the cited recipe passage. Its
  1,800 versus 17,920 GPU-hour comparison is an incremental controlled stage,
  not a total model-training cost or a universal tenfold saving.
- Kept Qwen3-VL's text-only backbone distillation distinct from direct visual
  feature transfer and from the surrounding multimodal training.
- Kept over 40 V4.1 teachers distinct from MoE experts and its reported system
  flexibility distinct from a reproducible complete schedule.
- Compared the 2023 style/factuality critique with the October 2026 controlled
  fact/composition study. Neither title is a universal theorem about KD.
  OPCD supplies an additional contextual-information setting, not an identical
  contradictory experiment.
- Checked decimal storage units and ordered KL calculations in regression tests.
  The original toy values are not attributed to a paper's measured model.

## Figure inventory and choices

| Page / figure | Purpose and choice | Why this form |
| --- | --- | --- |
| Overview / 1 | Original transfer-contract SVG | No single source provides the collection's combined signal/experience/objective/evaluation/deployment map. |
| Foundations / 1 | Calculated hard/soft probability bars | Exact illustrative inputs are retained and tested; no decorative image generation or claimed model measurement. |
| Methods / 1 | Native responsive demonstration-versus-rollout ModelFlow | A focused comparison clarifies who supplied the prefix; full text survives exports and mobile stacking. |
| Methods / 2 | ALM v4 original Figure 1 | Original chunk correspondence is materially useful; retained CC BY-SA license and extraction record. |
| Recipes / 1 | Existing Qwen3 original Figure 1 | Exact teacher/student branch distinction matters; no duplicated asset. Additional use recorded. |
| Recipes / 2 | Switch-KD v1 original Figure 2 | The hybrid route and adaptive loss panels teach distinct, coupled ideas; complete diagram excerpt, not a generic replacement. |
| Practice / 1 | Native independent-test feedback loop | A proposed development process, explicitly not a universal published pipeline. |

Original crops were inspected visually against their source PDF pages.
Full figure extraction coordinates, SHA-256 hashes, retained rights and the
specific reuse assessments are in `public/figures/knowledge-distillation/`.
Other paper figures were not added merely to increase visual density.
The pages retain substantive text equivalents and local figure anchors.

## Quantities and reproducibility

- Softmax illustration: logits `(4,2,0,-2)`, temperatures 1 and 3; displayed
  probabilities rounded to one decimal percent.
- KL illustration: teacher `(0.70,0.29,0.01)`, student candidates
  `(0.45,0.35,0.20)` and `(0.98,0.01,0.01)`. Both directions checked.
- Token weighting: `(2*1+8*3)/10 = 2.6`, unlike the unweighted mean 2.
- Dense targets: `20e6*128000*2 = 5.12e12` bytes. Sparse illustrative retained
  entries: `20e6*256*(2+4) = 30.72e9` bytes. Overhead excluded explicitly.
- Content tests execute these calculations and verify exported TeX, sequential
  figure/equation numbering, references, local asset hashes and navigation.
- The conceptual PyTorch loss is a teaching excerpt. No full model training,
  checkpoint inference, distributed trainer or device performance was executed.

## Remaining scientific uncertainty

The sources do not establish one universally optimal divergence, teacher size,
rollout refresh interval or multimodal mixture. Not every recent release has a
complete public distillation recipe. Model-specific unknowns remain explicit;
we do not infer an updated generation's recipe from its predecessor. Findings
from small controlled experiments are not automatically industrial scaling laws.

## Delivery

Actual validation, rendered checks and export checks are recorded per page in
`state/progress.json`, with a collection-level account in `review.md` after
the final revision is checked. Local completion does not authorize a commit,
push or deployment.
