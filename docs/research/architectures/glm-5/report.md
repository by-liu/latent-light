---
title: "GLM-5"
topic_id: "glm-5-technical-deep-dive"
status: reviewed
revision: 3
updated: "2026-10-10"
evidence_cutoff: "2026-10-10"
audience: "Readers studying LLM architecture and training"
canonical_format: "markdown"
---

## Executive answer

[Technical report](https://arxiv.org/pdf/2602.15763v1) · [Hugging Face: zai-org/GLM-5](https://huggingface.co/zai-org/GLM-5)

GLM-5 is designed for work that unfolds over many actions: inspect a codebase, try a change, run a tool, observe failure, and revise. It combines a large expert model with attention that selects relevant history and a training system that does not wait for the slowest agent rollout before doing useful work.[^report]

## Visual overview

Added preserved-thinking source art; separated synchronous precision ratios from async stale-policy masking; explicit detached distillation advantage; MTP private acceptance protocol and train/rollout/INT4 artifact boundaries. Source crops and native SVGs were inspected as assets. Fresh integrated HTML/mobile/theme/export verification passed.

## Key findings


- **Select where attention spends computation.** DeepSeek Sparse Attention, or DSA, adds a content indexer that selects a subset of past positions for the main attention operation.[^report][^config]
- **Decouple rollout generation from learning.** Agent trajectories can be collected while the learner updates, with token identity, policy lag and probability mismatch handled explicitly.[^report]
- **Keep the model and agent system separate.** Preserved thinking, tools, context management and environments affect long horizon results; weights alone are not the complete agent.[^report]

This makes GLM-5 worth studying as a bridge between efficient architectures and agent training systems. It is not evidence that larger weights alone cause reliable software engineering, or that every published agent result follows from a default chat call.[^report]

Study scope: original February 2026 GLM-5 report and appendix, BF16 GLM-5 artifact, tokenizer metadata, official repository and license. Later GLM-5.1 to 5.3 variants are excluded. No checkpoint executed. Evidence checked October 10, 2026.

## Detailed analysis


### Model in numbers

Representative checkpoint: **zai-org/GLM-5**, not GLM-5-FP8 or a later generation.

| Dimension | Value and scope |
| --- | --- |
| Parameters | 744B total and 40B active in the report's convention: includes MTP parameters but excludes embeddings and output layer.[^report] |
| Base training | 28.5T processed tokens across pretraining and mid training; not 28.5T unique source tokens.[^report] |
| Agent data | More than 10K real SWE environments in the disclosed agent training expansion; a full count of all SFT examples and RL trajectories is undisclosed.[^report] |
| Compute | Full GLM-5 accelerator hours, FLOPs and project cost undisclosed. Reported attention reductions are stage and workload specific, not a complete training cost ledger.[^report] |
| Context | Mid training progresses through 32K, 128K and 200K; SFT and the released config support 202,752 positions. Selected long context comparisons run at 128K.[^report][^config] |

### Architecture and selected attention

The released config has 78 decoder layers, comprising three initial dense FFNs and 75 expert FFNs, a 6,144 wide stream, 64 attention heads, and eight selected experts from 256 plus one shared expert. Appendix A agrees on three dense plus 75 MoE layers, while the narrative body says 80 layers. This study follows the explicit artifact and appendix contract rather than silently equating the counts.[^config][^report]

<!-- visual-id: V005 -->

<a id="figure-1"></a>

### Figure 1

**Figure 1.** Two separate selection and feedback systems. Original explanatory diagram informed by the report and configuration.[^report][^config]

### Meaning

Network path: Token stream: Text, reasoning and serialized tool results; DSA indexer: Select up to 2,048 prior positions; Sparse MLA: Attend over selected content latents; Expert FFN: 1 shared + 8 routed experts. The indexer chooses positions, not experts. The expert router chooses computation, not history.
Asynchronous training path: Rollout services: Agents interact with environments; TITO gateway: Exact token IDs and rollout probabilities; Learner: Correct mismatch and filter stale samples; Weight refresh: Update actors periodically. Weight refresh feeds back to rollout services; it is a loop, not the terminal output of training.

Report and rendered page retain the adjacent explanation. Source asset inspection is not HTML/browser QA.



MLA compresses the state kept for old tokens. DSA changes **which old tokens participate in the expensive attention operation**. The artifact's indexer has 32 heads, width 128, and a top k of 2,048. These selection scores are distinct from the main attention's final normalized scores.[^config][^report]

For a sequence of length $n$ and at most $k$ selected keys per query, the main sparse attention work is proportional to $nk$ rather than $n^2$, holding dimensions fixed. This describes that selected operation, not the whole model: indexer work, cache storage, expert layers and communication remain.[^report]

The report adapts a dense attention base after mid training: first train the indexer with the base frozen, then continue sparse adaptation for 20B tokens. Table 3's 128K comparison shows SQuAD improving from 79.7 to 86.0, while HotpotQA falls from 66.3 to 63.0. This is close capability under those tests, not literal losslessness on every task.[^report]

### Optimization choices

Muon Split applies matrix orthogonalization independently to head specific projection pieces, allowing different heads to update at different scales. The report explores this because its first MLA/Muon combination did not match the GQA baseline on several tasks. It also changes attention head dimensions to reduce decoding arithmetic under the target hardware constraints. An optimizer and representation can interact; a cache efficient design is not automatically optimization neutral.[^report]

MTP reuses parameters across three training depths rather than storing three independent proposal modules. On a private prompt set with four speculative steps, the reported average acceptance length is 2.76 versus 2.55 for V3.2. Shared proposal weights do not alone prove that every backend can share all depth specific cache state. This is a proposal mechanism with verification, not unrestricted parallel token generation.[^report]

### Training across long tasks

Pretraining includes filtered web, code, and math/science data. Mid training adds longer documents, repository files, diffs, issues and pull requests. The reported issue and PR subset contains approximately 160B unique tokens, which is a different unit and scope from the complete 28.5T training exposure.[^report]

<!-- visual-id: V006 -->

<a id="figure-2"></a>

![GLM-5 base training through sparse attention adaptation and staged reinforcement learning with cross-stage distillation](../../../../public/figures/model-studies/glm-5/training-pipeline.png)

**Figure 2.** Base training and post training. Reproduced from the report's Figure 5, under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).[^report]


[Figure 2](#figure-2) separates base model exposure and context extension from the later alignment stages. Its final distillation path receives logits from different stage specialists, rather than treating the last RL checkpoint as uniformly best at every task. The token labels are training exposure within the depicted stages, not counts of unique source material.[^report]

<details>
<summary>Read the stage labels in Figure 2</summary>

The pretraining column labels 18T general tokens followed by 9T code and reasoning tokens, both at 4K context. Mid training labels 1T at 32K, 500B at 128K, and 50B at 200K. A separate sparse attention adaptation step is 20B tokens at 200K. These are processed stage exposures, not unique data counts; the report summarizes base training as 28.5T rather than treating every rounded diagram label as an exact accounting ledger. On the right, SFT, reasoning RL, and general RL supply teacher logits, while the general RL checkpoint also supplies the distillation policy's starting weights.[^report]

</details>

SFT covers general chat, reasoning, coding and agents, with erroneous trajectory segments sometimes retained as context but masked from the loss. It teaches interleaved thinking, preservation of prior thinking during coding, and turn level control of reasoning. Reasoning RL uses a GRPO based objective with training/inference mismatch filtering; agent RL uses a separately described asynchronous objective. Those are not one interchangeable algorithm.[^report]

<details>
<summary>Synchronous reasoning RL has a different probability correction</summary>

This stage samples 32 responses per question in batches of 32 questions. Even with synchronized weights, the inference and training engines can assign different probabilities because of precision and implementation differences. The report separates that mismatch from the learner's update:[^rl]

$$
\rho_t=\frac{\pi_{\mathrm{old,train}}(a_t\mid s_t)}{\pi_{\mathrm{old,infer}}(a_t\mid s_t)},\qquad r_t=\frac{\pi_{\theta,\mathrm{train}}(a_t\mid s_t)}{\pi_{\mathrm{old,train}}(a_t\mid s_t)}
\tag{1}
$$

The mismatch multiplier is kept only when it falls between 1/2 and 2. The separate PPO style ratio is clipped with lower/upper parameters 0.2 and 0.28. The response loss averages over its tokens, and the KL penalty is removed. Those details are not the asynchronous objective below.[^rl]

</details>

<details>
<summary>Why asynchronous RL needs more than a queue</summary>

Agents finish at different times and may observe multiple actor versions along one trajectory. The learner therefore uses recorded rollout probabilities rather than pretending all samples came from its newest policy. The disclosed importance ratio is:[^report]

$$
r_t=\exp\!\left(\log\pi_\theta(a_t\mid s_t)-\log\pi_{\mathrm{rollout}}(a_t\mid s_t)\right)
\tag{2}
$$

Tokens outside a bounded ratio interval are masked from the gradient, not merely assigned the PPO clipped objective. The resulting gradient surrogate uses a masked group advantage times the token log probability, not the PPO minimum of clipped and unclipped terms. The optimizer is reset after actor weight refreshes. Very stale samples and environmental failures are additionally filtered. Token-in-Token-out, or TITO, preserves the actual sampled token IDs and action boundaries; retokenizing final text could assign probabilities to a different sequence.[^report]

In DSA RL, the authors report that inconsistent top k selection can destabilize updates. They use a deterministic operator in their setup and freeze the indexer by default. Determinism should be verified for the actual operator and environment; it is not a blanket guarantee for every implementation named `topk`.[^report]

</details>

<details>
<summary>Cross stage distillation and systems details</summary>

Different stage specialists recover capabilities lost during later RL. The student starts from general RL and receives teacher supervision from SFT, reasoning RL and general RL policies. For each student generated token, the report uses the detached teacher/student log probability ratio as its advantage:[^distillation]

$$
A_t=\operatorname{stopgrad}\!\left[\log\frac{\pi_{\mathrm{teacher,infer}}(a_t\mid s_t)}{\pi_{\theta,\mathrm{train}}(a_t\mid s_t)}\right]
\tag{3}
$$

It applies the same GRPO based training machinery with group size 1 and batch size 1,024. This advantage is **not a group standardized answer reward**. The teacher's useful judgment and train/inference precision still matter.[^distillation]

The slime rollout stack uses FP8 inference and separates prefill from decoding to reduce long prompt head of line blocking. Request affinity keeps an agent's repeated prefix on the same data parallel rank to reuse cache. Pipeline ZeRO-2 gradient sharding, activation offload and chunked output loss reduce training memory. Separately, INT4 QAT adapts an SFT model to a matched quantization kernel; the representative BF16 artifact is not itself an INT4 checkpoint.[^infrastructure]

</details>

### Inference and evaluating the whole agent

<!-- visual-id: V007 -->

<a id="figure-3"></a>

![Interleaved reasoning surrounds tool interactions, while preserved thinking retains prior reasoning into a later user turn](../../../../public/figures/model-studies/glm-5/thinking-context.png)

**Figure 3.** Interleaved and preserved thinking are different history policies. Reproduced intact from report Figure 7, under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).[^thinking]


[Figure 3](#figure-3) distinguishes reasoning **between tool steps** from retaining that reasoning **across user turns**. Preserving earlier thinking changes the next input context; it is not an extra attention block. A wrapper that strips those spans cannot be assumed to reproduce the preserved thinking evaluations.[^thinking]

The decoder emits tokens, tool requests and reasoning. A runtime executes tools and returns observations. Context management decides what history remains. None of these tool effects arise from network logits alone. The report's BrowseComp context strategy combines retaining recent turns with discarding history at a threshold, so its score includes this orchestration.[^report]

Benchmark wrappers matter. SWE-bench uses OpenHands with a tailored instruction, temperature 0.7, top p 0.95, a 16,384 output cap and 200K context. Terminal-Bench uses both Terminus and Claude Code settings, with different timeouts and output limits. A single comparison bar can conceal those differences unless the harness is retained.[^report]

The official weight card labels the BF16 release MIT, while the pinned code repository's license text is Apache 2.0. These are different artifact scopes; do not transfer one grant to the other or infer complete training code and data availability from public weights. A current repository includes several later GLM-5 variants; its newest release claims do not establish the behavior of this February checkpoint.[^card][^license][^repo]

### Lessons

The strongest lesson is the distinction between **capacity, history selection, and environment interaction**. DSA selects attention history; experts select computation; async RL learns from distributed interactions. Keeping those boundaries explicit makes both reproduction gaps and system tradeoffs easier to see. Compare [DeepSeek-V3](/architectures/models/deepseek-v3/) for dense latent attention and [Kimi K2](/architectures/models/kimi-k2/) for another agentic data and optimization recipe.


## Counterevidence and uncertainty

The page preserves source-specific model/recipe/harness conditions and contrary results. [Coverage audit](coverage-audit.md) records each essential technique, source locator, addition and justified omission. No checkpoint execution or independent speed/benchmark reproduction was performed.

## Implications

Added preserved-thinking source art; separated synchronous precision ratios from async stale-policy masking; explicit detached distillation advantage; MTP private acceptance protocol and train/rollout/INT4 artifact boundaries.

## Open questions and future research

Fresh integrated browser and export checks for revision 3 passed. Report omissions and runtime reproduction gaps remain scoped in the coverage audit rather than filled with estimates.

## What changed in this revision

Revision 3 broadens mechanism depth rather than adding decorative figure quotas. Complete report and relevant appendix/code review, exact source locators, independent visual inspection and an adversarial protocol/number pass are recorded below.

## Sources

[^report]: GLM-5 Team. [GLM-5: from Vibe Coding to Agentic Engineering](https://arxiv.org/pdf/2602.15763v1), February 17, 2026. Sections 2 to 4, Table 3, Appendix A Table 10 and Appendix B.2; inspected October 10, 2026.

[^config]: Z.ai. [GLM-5 BF16 configuration](https://huggingface.co/zai-org/GLM-5/blob/c183ef8c61faee82855eca1ed9bb3a9a7ce3b0b2/config.json), inspected October 10, 2026.

[^repo]: Z.ai. [GLM-5 repository](https://github.com/zai-org/GLM-5/tree/c8ad661c6cf4cb0a78064987bc42f97e14355929); original GLM-5 artifact links and later variant boundaries.

[^license]: Z.ai. [GLM-5 code repository Apache 2.0 license](https://github.com/zai-org/GLM-5/blob/c8ad661c6cf4cb0a78064987bc42f97e14355929/LICENSE), inspected October 10, 2026. This repository text is not treated as the weight card's license.

[^card]: Z.ai. [Official GLM-5 BF16 weight card](https://huggingface.co/zai-org/GLM-5/blob/c183ef8c61faee82855eca1ed9bb3a9a7ce3b0b2/README.md), `license: mit` metadata and release instructions, inspected October 10, 2026.




[^rl]: GLM-5 Team. [GLM-5 report](https://arxiv.org/pdf/2602.15763v1), Section 3.2 and Section 4.1.2: synchronous GRPO precision correction versus asynchronous direct rollout probability masking.

[^distillation]: GLM-5 Team. [GLM-5 report](https://arxiv.org/pdf/2602.15763v1), Section 3.5: detached teacher log probability advantage, group size 1 and cross stage teachers.

[^infrastructure]: GLM-5 Team. [GLM-5 report](https://arxiv.org/pdf/2602.15763v1), Sections 2.4, 3.6 and 4.1.1–4.1.2: ZeRO-2, activation offload, INT4 QAT, FP8 rollout, prefill/decode disaggregation and prefix affinity.

[^thinking]: GLM-5 Team. [GLM-5 report](https://arxiv.org/pdf/2602.15763v1), Figure 7, PDF page 10, and Section 3.1. Reproduced unchanged under the exact v1 [CC BY 4.0 grant](https://creativecommons.org/licenses/by/4.0/); surrounding prose and original caption removed. Attribution and notice: [source notice](/figures/model-studies/glm-5/NOTICE.md).


## Revision 3 presentation verification

106 automated tests, zero Astro diagnostics, the static build and all 43 docs lint checks passed. The collection passed 81 fresh browser views; this page was checked at 1440px light, 390px light and 320px dark, with desktop focus, active family navigation, caption order, anchors, image decoding, resource cards and no page overflow. Complete source figures fit desktop, while narrow frames support keyboard panning and full-size access. Search and Markdown/MDX exports preserve citations, figures and source links. All 66 model figure renders were inspected, with full-size review of new dense diagrams. See state/presentation-qa.json for exact page checksums and evidence. No model benchmark was reproduced. Existing bundler and redirect warnings remain.
