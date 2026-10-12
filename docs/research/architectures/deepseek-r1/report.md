---
title: "DeepSeek-R1"
topic_id: "deepseek-r1-technical-deep-dive"
status: reviewed
revision: 3
updated: "2026-10-10"
evidence_cutoff: "2026-10-10"
audience: "Readers studying LLM architecture and training"
canonical_format: "markdown"
---

## Executive answer

[Technical report](https://arxiv.org/pdf/2501.12948v1) · [Hugging Face: deepseek-ai/DeepSeek-R1](https://huggingface.co/deepseek-ai/DeepSeek-R1)

DeepSeek-R1 is primarily a study in **how to train reasoning behavior**, not a new attention architecture. It starts from DeepSeek-V3-Base and uses rewards, selected reasoning traces, and additional alignment to make the model spend useful computation before answering.[^report]

## Visual overview

Added a three-policy GRPO mechanism illustration and original response-level surrogate; separated reward models from omitted critic; expanded unsuccessful process-reward/MCTS experiments and identified asynchronous software evaluation as future work. Source crops and native SVGs were inspected as assets. Fresh integrated HTML/mobile/theme/export verification passed.

## Key findings


- **R1-Zero isolates an important question.** Can reinforcement learning improve reasoning without a preliminary supervised reasoning stage? Its reported experiment says yes, starting from an already pretrained base model, not from no prior learning.[^report]
- **R1 makes that behavior more usable.** Cold start examples and later curated SFT address readability, mixed languages, and general tasks alongside reasoning rewards.[^report]
- **Distillation transfers behavior to smaller networks.** The six released dense students learn from selected R1 generated examples through SFT; they are not miniature copies of its expert architecture.[^report]

The useful lesson for researchers is that the reward, training sequence, base model, and inference budget are all part of the reasoning system. Public weights allow these resulting policies to be studied, while incomplete rollout and optimization disclosures limit exact reproduction.[^report][^repo]

Study scope: original January 2025 R1 report, original full R1 artifact, tokenizer guidance and license; targeted training and evaluation analysis. The training illustration comes from the September 2025 Nature article; numerical claims remain scoped to the January report unless stated otherwise. No checkpoint executed. Evidence checked October 10, 2026.

## Detailed analysis


### Model in numbers

Representative checkpoint: **DeepSeek-R1**, not R1-Zero, R1-0528, or a distilled student.

| Dimension | Value and scope |
| --- | --- |
| Parameters | 671B total and 37B active per token in the reported main MoE network.[^report] |
| Base training | Inherits V3-Base; its 14.8T token pretraining is not a new 14.8T R1 run.[^report][^v3] |
| Post training | Thousands of cold start examples; later approximately 600K reasoning and 200K other SFT examples. RL rollout count undisclosed.[^report] |
| Compute | R1 specific total FLOPs, accelerator hours and complete financial cost undisclosed in this report.[^report] |
| Context and output | Release advertises 128K context; config holds 163,840 positions. Reported benchmark output cap is 32,768 tokens, a different quantity.[^config][^repo][^report] |

### Network and training are different layers

The full R1 checkpoint uses the V3 decoder architecture: a 7,168 wide stream, 61 layers, latent attention, and expert FFNs after the first three dense layers. Each expert layer selects eight of 256 routed experts plus one shared expert. These dimensions are artifact facts; reasoning behavior is shaped by the subsequent training, not a special “reasoning attention” block.[^config]

<!-- visual-id: V004 -->

<a id="figure-1"></a>

![DeepSeek-R1 multistage training with separate pretrained starts, generated data transfers, and later broad reinforcement learning](../../../../public/figures/model-studies/deepseek-r1/training-pipeline.png)

**Figure 1.** The R1 training pipeline. Reproduced from the later Nature article's Figure 2, under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).[^journal]


[Figure 1](#figure-1) distinguishes **model weights** from **training data transfers**. R1-Zero generates and filters examples for cold start SFT on V3-Base. The reasoning policy then supplies curated examples, but the later combined SFT stage starts again from V3-Base. Broad RL follows that supervised checkpoint. The arrows carrying sampled data do not mean all stages continuously update one actor.[^report][^journal]

### GRPO and verifiable rewards

For each question, the old policy samples several complete responses. A verifier or reward model scores them. GRPO compares each score with the group's mean and standard deviation to obtain an advantage:[^report]

$$
A_i=\frac{r_i-\operatorname{mean}(r_1,\ldots,r_G)}{\operatorname{std}(r_1,\ldots,r_G)}
\tag{1}
$$

The policy update increases probability for relatively better responses, with clipped importance ratios and a KL penalty to a reference policy. Eliminating the separate critic reduces one source of memory and training complexity. It does not eliminate rollout cost, the reference policy, reward computation, or the need for groups that provide a useful contrast.[^report]

<!-- visual-id: V005 -->

<a id="figure-2"></a>

![GRPO samples responses with the old policy, forms group advantages from rewards, compares the current policy to old and reference policies, then updates it](../../../../public/figures/model-studies/deepseek-r1/grpo-policies.svg)

**Figure 2.** Three policy roles, one group reward signal. Independent explanatory diagram of the January report’s GRPO objective.[^grpo]


[Figure 2](#figure-2) separates sampling from updating. The **old policy** supplied the responses; the **current policy** is optimized; the **reference policy** supplies a separate KL anchor. A verifier or preference model supplies rewards, not the critic baseline that GRPO omits.[^grpo]

<details>
<summary>The reported objective and its boundaries</summary>

Let $\rho_i=\pi_\theta(o_i\mid q)/\pi_{\mathrm{old}}(o_i\mid q)$. The report presents the following response level surrogate:[^grpo]

$$
\mathcal J=\mathbb E\!\left[\frac1G\sum_{i=1}^G\left(\min\!\left(\rho_i A_i,\operatorname{clip}(\rho_i,1-\epsilon,1+\epsilon)A_i\right)-\beta D_{\mathrm{KL}}(\pi_\theta\Vert\pi_{\mathrm{ref}})\right)\right]
\tag{2}
$$

Equation (2) retains the original report's response level presentation. It is not a claim that every later library uses the same token normalization, importance ratio, zero variance handling, or KL estimator. Equation (1) needs a nondegenerate group; the January report does not provide a full implementation specification for edge cases.[^grpo]

</details>

For R1-Zero, the report uses correctness and format rewards, including mathematical answer checks and executable code tests. It avoids a learned process or outcome reward model in that experiment because of reward hacking and added training complexity. An answer verifier is not a proof that every intermediate reasoning step is faithful or correct.[^report]

R1 later adds a language consistency reward to improve readable reasoning, explicitly accepting a small performance tradeoff in the authors' ablation. The final broad RL stage uses rule rewards for reasoning and preference models for general tasks. Helpfulness assesses the summary; harmlessness assesses the whole response. “R1 only uses rule rewards” is therefore too broad.[^report]

### Curated reasoning and distillation

After reasoning RL, multiple candidate responses are sampled and correct examples retained. Filtering additionally removes mixed language or poorly formatted traces. Some expanded reasoning tasks use a generative judge rather than only an exact verifier. This produces about 600K reasoning examples; approximately 200K general examples complete the later SFT corpus.[^report]

The six dense students are fine tuned on that curated 800K dataset without an RL stage in the reported distillation experiment. Their Qwen or Llama starting checkpoints and licenses must be named separately. They do not inherit MLA, expert routing, or the full R1 parameter count.[^report][^repo]

<details>
<summary>What the training report does not reveal</summary>

The original report describes objectives, reward categories and the main stage order, but does not disclose the full corpus, exact RL rollout budget, complete learning rate and batch schedules, or an R1 specific compute ledger. A plausible GRPO implementation is not a faithful reproduction of this run. Later R1 papers or releases can have different disclosures and should not silently overwrite the identity studied here.[^report]

</details>

### Inference and evaluation budgets

The model generates reasoning tokens followed by its answer, so longer responses consume real decode time and output budget. The network remains an autoregressive decoder with a growing attention history. A visible reasoning trace is output text, not direct access to a complete internal thought process.[^report][^config]

The release recommends temperature 0.6, avoiding a system prompt, and placing instructions in the user message. These are recommendations for this release, not universal rules for all reasoning models.[^repo]

For most sampling benchmarks the report uses temperature 0.6, top p 0.95, and up to 32,768 output tokens. It averages correctness over repeated samples to estimate pass@1. Consensus from 64 samples is reported separately and consumes a much larger inference budget. R1-Zero's AIME 2024 figures of 71.0 pass@1 and 86.7 consensus@64 should never be plotted as equivalent single attempt performance.[^report]

For smaller models, Table 6 compares an internal Qwen 32B RL policy with the distilled Qwen 32B policy: AIME pass@1 is 47.0 versus 72.6 under the reported settings. That supports the utility of this teacher and dataset relative to this RL experiment, not a theorem that SFT distillation always beats RL.[^report]

### Failures and lessons

The authors report mixed languages and poor readability in R1-Zero. Longer traces and an illustrative self correction do not demonstrate that every trace is faithful, or establish an internal “aha” mechanism independently of the training and evaluation evidence.[^report]

<details>
<summary>Why process rewards and tree search were not the chosen recipe</summary>

A process reward model needs meaningful step boundaries and reliable intermediate labels. The team found automated labels inadequate, human labeling difficult to scale, and repeated reward hacking costly to correct. They still found process rewards useful for reranking or guided search; their negative result concerns the additional overhead in this large scale RL setup.[^failures]

MCTS used tagged reasoning steps and a value model to search for training answers. The language branching space was much larger than a board game's; capped expansion could get stuck in local optima, and an unreliable fine grained value model limited iterative improvement. This does not establish that all tree search is ineffective.[^failures]

</details>

The January model also trails V3 on function calling, multiturn interaction, role play and JSON output. Few shot prompts degraded performance in the authors' tests. Slow software engineering evaluation limited extensive RL in that domain; asynchronous evaluation is described as future work, **not an implemented component of this R1 recipe**.[^failures]

The full R1 code and weights are released under MIT; distilled variants retain obligations from their underlying model families. Training data and a complete training system are not supplied by that license grant.[^license][^repo]

The central takeaway is to evaluate a reasoning model as **policy plus reward history plus inference budget**. Compare the structural costs with [DeepSeek-V3](/architectures/models/deepseek-v3/), and the switch between thinking and direct answering with [Qwen3](/architectures/models/qwen3/).


## Counterevidence and uncertainty

The page preserves source-specific model/recipe/harness conditions and contrary results. [Coverage audit](coverage-audit.md) records each essential technique, source locator, addition and justified omission. No checkpoint execution or independent speed/benchmark reproduction was performed.

## Implications

Added a three-policy GRPO mechanism illustration and original response-level surrogate; separated reward models from omitted critic; expanded unsuccessful process-reward/MCTS experiments and identified asynchronous software evaluation as future work.

## Open questions and future research

Fresh integrated browser and export checks for revision 3 passed. Report omissions and runtime reproduction gaps remain scoped in the coverage audit rather than filled with estimates.

## What changed in this revision

Revision 3 broadens mechanism depth rather than adding decorative figure quotas. Complete report and relevant appendix/code review, exact source locators, independent visual inspection and an adversarial protocol/number pass are recorded below.

## Sources

[^report]: DeepSeek-AI. [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](https://arxiv.org/pdf/2501.12948v1), January 22, 2025. Sections 2 to 4 and Tables 2 and 6; original version inspected October 10, 2026.

[^config]: DeepSeek-AI. [Original R1 configuration](https://huggingface.co/deepseek-ai/DeepSeek-R1/blob/56d4cbbb4d29f4355bab4b9a39ccb717a14ad5ad/config.json), inspected October 10, 2026.

[^repo]: DeepSeek-AI. [R1 release repository](https://github.com/deepseek-ai/DeepSeek-R1/tree/0cf78561f1d51c84a21b2190626b21116d5c68bb); model downloads, evaluation settings, usage recommendations and variant license notes.

[^v3]: DeepSeek-AI. [DeepSeek-V3 Technical Report](https://arxiv.org/pdf/2412.19437v1), Section 4; source of the inherited base training budget, not an R1 specific run.

[^license]: DeepSeek-AI. [R1 MIT License](https://github.com/deepseek-ai/DeepSeek-R1/blob/0cf78561f1d51c84a21b2190626b21116d5c68bb/LICENSE), inspected October 10, 2026.


[^journal]: DeepSeek-AI et al. [DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning](https://www.nature.com/articles/s41586-025-09422-z.pdf), Nature 645, 633–638, September 17, 2025. Figure 2 on page 635. © The Author(s) 2025, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Figure artwork unchanged; surrounding article text and original caption removed. This later illustration does not silently replace the January report's numerical protocol.


[^grpo]: DeepSeek-AI. [R1 report](https://arxiv.org/pdf/2501.12948v1), Section 2.2.1, Equations (1)–(3). Policy ratio, clipped surrogate, group normalization and KL reference are reported separately from Section 2.2.2 reward modeling.

[^failures]: DeepSeek-AI. [R1 report](https://arxiv.org/pdf/2501.12948v1), Sections 4.2 and 5: process rewards, MCTS, prompting, general capability and software engineering limitations.

## Revision 3 presentation verification

106 automated tests, zero Astro diagnostics, the static build and all 43 docs lint checks passed. The collection passed 81 fresh browser views; this page was checked at 1440px light, 390px light and 320px dark, with desktop focus, active family navigation, caption order, anchors, image decoding, resource cards and no page overflow. Complete source figures fit desktop, while narrow frames support keyboard panning and full-size access. Search and Markdown/MDX exports preserve citations, figures and source links. All 66 model figure renders were inspected, with full-size review of new dense diagrams. See state/presentation-qa.json for exact page checksums and evidence. No model benchmark was reproduced. Existing bundler and redirect warnings remain.
