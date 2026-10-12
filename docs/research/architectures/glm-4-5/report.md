---
title: "GLM-4.5"
topic_id: "glm-4-5"
status: reviewed
revision: 1
updated: "2026-10-10"
evidence_cutoff: "2026-10-10"
audience: "Researchers and builders studying LLM and VLM architecture and training"
canonical_format: markdown
---

## Executive answer

[Technical report](https://arxiv.org/pdf/2508.06471v1) · [Hugging Face: zai-org/GLM-4.5](https://huggingface.co/zai-org/GLM-4.5)

GLM-4.5 targets a generalist that can reason, write code and act through tools. Its distinctive contribution is not simply a larger expert network: it combines **sparse capacity with a staged path from specialist policies to one hybrid-reasoning assistant**.[^report]

The network and training system solve different selection problems. An expert router selects FFN computation for each token. Post-training develops specialist models for different capabilities, then distills them into a generalist. The rollout infrastructure gathers tool interactions and feeds them back to learning.[^report][^code]

Study scope: original August 2025 report and GLM-4.5 BF16 artifact, with GLM-4.5-Air as a scoped comparison. Later 4.6/4.7 updates are excluded. No checkpoint executed. Evidence checked October 10, 2026.

## Visual overview

4 purposeful figures accompany architecture and evidence. Original source crops were inspected at full resolution; integrated browser/focus/mobile/export QA passed.

## Key findings

- **Sparse computation, substantial stored capacity.** The report labels the main model 355B total / 32B active and Air 106B / 12B active, using its stated counting convention.[^report]
- **Unify capabilities after specialization.** Reasoning, agentic and general-chat specialists are training-stage policies, not the network's routed FFN experts.[^report]
- **Long reasoning needs a compatible training budget.** A small-model ablation favors starting RL at a full 64K response budget rather than gradually raising it after 64K SFT.[^report]
- **Tool rollouts are irregular workloads.** The Slime system supports synchronous colocated and asynchronous disaggregated modes; the report does not claim every training stage is asynchronous.[^report]

## Detailed analysis

### Model in numbers

| Dimension | GLM-4.5 | GLM-4.5-Air |
| --- | --- | --- |
| Report parameters | 355B total / 32B active | 106B total / 12B active |
| Main decoder | 3 dense + 89 MoE layers | 1 dense + 45 MoE layers |
| Residual width | 5,120 | 4,096 |
| Attention | 96 query / 8 KV heads; width 128; QK normalization | 96 query / 8 KV heads; width 128; no QK normalization |
| Experts per MoE block | 160 routed, select 8, plus 1 shared | 128 routed, select 8, plus 1 shared |
| Context extension | 4K pretraining → 32K mid-training → 128K mid-training | Same disclosed staged recipe |

These are report Table 1 / Appendix A conventions, corroborated for the main model by its artifact. Parameter totals **include MTP but exclude embeddings and output layer**. Hugging Face metadata counts approximately 358.34B stored main-model parameters under a broader tensor scope; that is not a competing claim about active compute.[^report][^config][^card]

The reported approximately **23T processed training tokens** are repeated exposure, not unique source content. A complete accelerator-hour, FLOP or financial cost total is undisclosed. SFT is described as millions of distilled examples, but a full count of final RL trajectories and tool interactions is not supplied.[^report]

### Architecture: routing without confusing the routers

Compared with contemporaneous DeepSeek-V3 and Kimi K2, the report chooses a deeper, narrower network. Its attention remains **GQA**, not MLA: it caches eight KV heads for 96 query heads. The 128-wide query projection is larger than the residual stream; head width is explicit, not assumed to equal residual width divided by head count.[^report][^config][^code]

<!-- visual-id: V001 -->

<a id="figure-1"></a>

### Token routing is not training-stage specialization

One network block: Residual stream (5,120 dimensions) → Causal GQA (96 Q / 8 KV; partial RoPE) → FFN router (Select 8 of 160 experts) → Combine outputs (Selected experts + 1 shared expert). The selected FFN experts run inside this network; they are not independent reasoning or agent models.

Post-training policies: Capability specialists (Reasoning, agentic, general chat) → Distilled SFT data (Mix validated specialist responses) → One generalist (Hybrid thinking / non-thinking) → Unified RL (Refine general response quality). These are full training-stage policies, distinct from per-token expert routing.

**Figure 1.** Two meanings of specialization. Original explanatory diagram from the report and released routing implementation.[^report][^code]

The released router computes sigmoid scores. It uses an expert-specific correction bias to choose the top eight, but computes their output weights from the original scores and normalizes those selected weights. The shared expert contributes separately. **Selection bias and contribution weights are not the same quantity.**[^code]

The “loss-free balance” label means balancing through router-bias adjustment; it does not mean there is no auxiliary term anywhere. The report uses bias updates during the first 15T tokens, then disables them, while retaining a sequence-level balancing loss with coefficient 0.0001.[^report]

Muon updates selected matrix parameters, with separate treatment for embeddings, biases and normalization. The report uses five Newton–Schulz iterations and a cosine learning-rate schedule. These details make the optimizer part of the recipe, not an interchangeable label applied to every parameter.[^report]

### Base training and mid-training

<!-- visual-id: V002 -->

<a id="figure-2"></a>

![GLM-4.5 trains 15T general and 7T code/reasoning tokens at 4K, then 500B repository and 500B synthetic reasoning tokens at 32K and 100B long-context agent tokens at 128K.](../../../../public/figures/model-studies/glm-4-5/report-training.png)

**Figure 2.** Train broad competence, then extend the task and context. GLM-4.5 Team, report Figure 3, August 2025; figure-only crop under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).[^report]

[Figure 2](#figure-2) makes the stage units clear: 15T general tokens, 7T code/reasoning tokens, two 500B mid-training stages and a final 100B stage. The diagram totals approximately 23.1T while the report summarizes approximately 23T; rounded stage labels should not be treated as an exact unique-data ledger.[^report]

Early training uses random truncation. Mid-training instead favors best-fit packing that preserves full repository files and reasoning examples. Repository-level code exposure and context extension change what the model sees together, not merely the maximum value permitted by a serving config.[^report]

The model also trains one **multi-token prediction** layer. Its loss coefficient is 0.3 during the first 15T tokens and 0.1 afterward. This teaches additional future-token prediction during training and can support speculative decoding. Inference still needs target verification and a compatible backend; one MTP layer does not guarantee one extra accepted token at every step.[^report]

### Post-training: build specialists, then a generalist

Stage one trains reasoning, agentic and general-chat policies through task-appropriate supervised cold starts and RL. Stage two distills their responses into a mixed supervised dataset for one generalist, followed by general RL. Thinking/non-thinking mode is an output and prompting contract, not a second FFN pathway.[^report]

### Reasoning rewards and curricula

Reasoning RL uses a GRPO-based method without a KL penalty in the described experiments. Verifiable math/code outcomes supply important rewards. Difficulty is estimated through repeated samples, selecting learnable problems rather than only trivial questions or failures that never produce a positive example.[^report]

The report investigates a medium-hard stage and a later very-hard stage, where some questions fail eight samples but succeed among 512. That changes sampling effort as well as question distribution, so difficulty and compute are not cleanly separable causal factors.[^report]

<!-- visual-id: V003 -->

<a id="figure-3"></a>

![AIME24 accuracy training curves compare a single 64K RL response budget with progressive 16K to 64K training; the single-stage run ends at 83.4 versus 80.6.](../../../../public/figures/model-studies/glm-4-5/report-rl-length.png)

**Figure 3.** A shorter early RL budget can undo useful long reasoning. GLM-4.5 report Figure 6, August 2025; full plot under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).[^report]

The experiment in [Figure 3](#figure-3) begins from a model already SFT-trained for 64K reasoning. Its single-stage 64K RL run reaches 83.4 AIME24 AVG@32 versus 80.6 for progressive 16K/32K/48K/64K budgets. This is an **experimental smaller model**, not a direct final-355B ablation. It supports keeping rollout budgets compatible with learned reasoning, not rejecting every curriculum.[^report]

For code reasoning RL, the authors favor token-weighted averaging over sequence-mean averaging in their convergence experiment. That changes how long responses contribute to the loss. The later GLM-V report favors per-sample averaging in its multimodal setting; neither observation proves a universally best normalization.[^report][^vlm]

### Agentic and general RL

Agent RL includes interactions with tools and environments, group-based rewards, and format penalties. Tool observations serve as context but are excluded from the policy's training-token loss. A reward may be a verifier, an environment outcome or an assessed trajectory; these are not all one generic LLM judge.[^report]

General RL combines rule, human and AI assessments. Its holistic reward taxonomy covers 7 broad categories, 33 dimensions and 139 attributes. Targeted sampling addresses rare failures such as inappropriate language mixing, repetitive loops and anomalous long answers. Iterative SFT also distills improved RL responses back into a stronger starting policy.[^report]

### The learning system behind tool rollouts

<!-- visual-id: V004 -->

<a id="figure-4"></a>

![Slime connects a data buffer and custom rollout generator to SGLang servers, Megatron learning and an explicit weight-update feedback path.](../../../../public/figures/model-studies/glm-4-5/report-slime.png)

**Figure 4.** Rollouts, learning and weight refresh form a loop. GLM-4.5 report Figure 10, August 2025; complete system figure under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).[^report]

Slime combines Megatron-based training with SGLang inference. Reasoning/general RL can colocate and synchronize resources; irregular agent trajectories can use disaggregated asynchronous services. Weight refresh reconnects the learner to the actors in [Figure 4](#figure-4). “Async” is a scheduling choice with policy-lag implications, not a different source of truth for reward.[^report]

The disclosed stack trains in BF16 and can generate rollouts with online blockwise FP8 weight quantization. Train/inference precision can therefore differ. This report does not disclose every probability-correction detail used in later GLM-5; importing those later formulas as the original 4.5 algorithm would be unsupported.[^report]

### Evidence and comparison limits

| Reported main-model result | Protocol boundary |
| --- | --- |
| AIME24: 91.0 | Average over 32 samples, not one deterministic attempt.[^report] |
| GPQA Diamond: 79.1 | Average over 8 samples under the report's reasoning evaluation.[^report] |
| SWE-bench Verified: 64.2 | OpenHands 0.34.0, 100 iterations, 128K history handling and an agent harness.[^report] |
| Terminal-Bench: 37.5 | Terminus framework and its task/runtime conditions.[^report] |

The report's TAU evaluation also modifies the user-simulator protocol, which affects comparison to numbers produced by other wrappers. Its benchmark set and July 2025 peer snapshot are not a current ranking. The strongest evidence is the disclosed recipe plus targeted ablations; overall capability bars do not identify each component's causal contribution.[^report]

### Limits and practical lessons

Full data manifests, training compute and all RL trajectories are unavailable; no independent replication is claimed here. Active parameters are not the model's stored weight memory, and GQA reduces cache payload without eliminating attention cost. The BF16 model card labels weights MIT; the inspected official repository code license is Apache 2.0. These are separate scopes.[^card][^license]

The transferable lesson is to align **representation, task mixture, rollout budget and verifier quality**. A capable generalist can come from carefully combining specialists, not pretending one stage is best at everything. Continue to [GLM-4.1V and GLM-4.5V](/architectures/models/glm-4-v/) for multimodal reward construction, or [GLM-5](/architectures/models/glm-5/) for later sparse attention and explicit asynchronous-policy correction.

## Counterevidence and uncertainty

Parameter conventions differ from stored tensors. Response-budget and loss-normalization experiments are smaller-model studies with prior-stage dependence. Agent results include their wrapper; not all stages use asynchronous rollout.

## Implications

Distinguish token-level FFN experts from capability specialist policies. Align long-reasoning SFT with RL budgets. Treat verifiers, environments and train/inference precision as parts of the training contract.

## Open questions and future research

Full compute and data manifests; component-level 355B ablations; exact policy-lag correction and rollout filtering; inference acceptance and throughput in a selected deployment.

## Sources

[^report]: GLM-4.5 Team. [GLM-4.5: Agentic, Reasoning, and Coding (ARC) Foundation Models](https://arxiv.org/pdf/2508.06471v1), August 8, 2025. Sections 2 to 4, Figures 3, 6 and 10, Table 1, Appendix A architecture and evaluation protocols.
[^config]: Z.ai. [GLM-4.5 configuration](https://huggingface.co/zai-org/GLM-4.5/blob/cbb2c7cfb52fa128a9660cb1a7a78e017899e115/config.json), inspected October 10, 2026. Explicit main layers, GQA dimensions, expert counts and positional contract.
[^card]: Z.ai. [GLM-4.5 model card](https://huggingface.co/zai-org/GLM-4.5) and [artifact metadata](https://huggingface.co/api/models/zai-org/GLM-4.5), inspected October 10, 2026. BF16 resource; MIT weight label and broader stored-tensor count.
[^code]: Hugging Face contributors / Z.ai. [Transformers GLM-4 MoE implementation](https://github.com/huggingface/transformers/blob/v4.57.1/src/transformers/models/glm4_moe/modeling_glm4_moe.py), version 4.57.1. Targeted attention projections and sigmoid/top-k routing with correction bias; code not executed.
[^vlm]: GLM-V Team. [GLM-4.1V-Thinking and GLM-4.5V](https://arxiv.org/pdf/2507.01006v3), August 13, 2025 revision, Section 5. Multimodal per-sample loss observation has a different experimental setting.
[^license]: Z.ai. [GLM-4.5 code license](https://github.com/zai-org/GLM-4.5/blob/170f20b2c10659008fdbc909d478bc2a75bc3627/LICENSE), inspected October 10, 2026. Apache 2.0 repository code; do not conflate with the card's weight license.

## Completed integration review

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

Primary report, selected artifact, uncertainty and useful source figures are documented above and in the coverage audit.
