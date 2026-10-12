---
title: "Major LLM and VLM release map"
topic_id: "major-llm-and-vlm-release-map"
status: "reviewed"
revision: 5
updated: "2026-10-09"
evidence_cutoff: "2026-10-09"
audience: "Readers entering the public LLM and VLM deep dive collection"
canonical_format: "markdown"
---

# Major LLM and VLM release map

## What changed in this revision

Added Claude Mythos Preview, Claude Fable 5.1 and DeepSeek-V4.1-Flash after
checking first-party sources. Replaced the o1-preview timeline slot with full
OpenAI o1 and its December 5, 2024 ChatGPT release date. The September preview
remains documented in the notes. The user-selected 22 highlights replace the
previous 16 in the text list and both theme variants. Earlier prompts, artwork
and evidence records remain intact.

## Executive answer

From the original Transformer to today's language and vision models, this is
a living map of the releases worth understanding. Start with the milestones,
then choose a model to explore in depth.

The selection covers **56 releases and research milestones**, checked through
**October 9, 2026**. It is a reading map, not a complete catalog or a ranking.
A later release is not automatically a better model for every task.

## Visual overview

<!-- visual-id: V001 -->

![Two theme-aware spectral timeline bands group 56 selected language and vision model milestones by year: 2017 through 2021 above and 2022 through 2026 below. Both read left to right. Twenty-two editorial landmarks use bold labels and diamond markers; other releases retain circular markers. OpenAI o1 records the full December 2024 ChatGPT release. Claude Mythos Preview, Claude Fable 5.1 and DeepSeek-V4.1-Flash are included in 2026. Paths connect years, not model ancestry. The cited list and exact event log provide the complete text equivalent.](../../../../public/figures/model-release-map/model-evolution-light-v5.png)

**Figure 1.** Selected model milestones, 2017 to 2026. Original AI generated overview of the cited release list; chronology, not lineage.

The [matching dark version](../../../../public/figures/model-release-map/model-evolution-dark-v5.png) uses the same highlights.
The source list and exact event log below provide the accessible equivalent.
All 56 labels, year placements and 22 highlights were visually checked in both themes. The typography is
readable at full resolution; the site also supplies a full size link and wider
focus view. The image is an original generated snapshot, not a lineage graph.

## Key findings

Bold names mark selected landmarks in architecture, training, or adoption.
The 22 highlights are an editorial reading guide, not a ranking.

| Year | Selected models and milestones |
| --- | --- |
| 2017 | **Transformer**[^transformer] |
| 2018 | **GPT**[^gpt] · **BERT**[^bert] |
| 2019 | GPT-2[^gpt2] · T5[^t5] |
| 2020 | **GPT-3**[^gpt3] |
| 2021 | CLIP[^clip] · Switch Transformer[^switchtransformer] · GLM[^glm] |
| 2022 | **InstructGPT**[^instructgpt] · Chinchilla[^chinchilla] · PaLM[^palm] · Flamingo[^flamingo] · BLOOM[^bloom] · **ChatGPT**[^chatgpt] |
| 2023 | BLIP-2[^blip2] · **LLaMA**[^llama] · **GPT-4**[^gpt4] · ChatGLM-6B[^chatglm] · LLaVA[^llava] · Llama 2[^llama2] · Mistral 7B[^mistral7b] · Mamba[^mamba] · Gemini 1.0[^gemini10] · Mixtral 8x7B[^mixtral8x7b] · InternVL[^internvl] |
| 2024 | Gemini 1.5 Pro[^gemini15] · **Claude 3**[^claude3] · DeepSeek-V2[^deepseekv2] · GPT-4o[^gpt4o] · Llama 3.1[^llama31] · Qwen2-VL[^qwen2vl] · Qwen2.5[^qwen25] · **OpenAI o1**[^o1] · **DeepSeek-V3**[^deepseek-releases] |
| 2025 | **DeepSeek-R1**[^deepseek-releases] · Gemma 3[^gemma3] · **Gemini 2.5 Pro**[^gemini25pro] · **Qwen3**[^qwen3] · **Claude 4**[^claude4] · Grok 4[^grok4] · Kimi K2[^kimik2] · GLM-4.5[^glm45] · **GPT-5**[^gpt5] · Qwen3-VL[^qwen3vl] |
| 2026 | Qwen3.5[^qwen-releases] · **GLM-5**[^glm5] · **Claude Mythos Preview**[^mythos] · DeepSeek-V4[^deepseek-releases] · **Kimi K3**[^kimik3] · Qwen3.8[^qwen-releases] · Claude Fable 5.1[^fable51] · **GPT-6 Astra**[^gpt6astra] · DeepSeek-V4.1-Flash[^deepseekv41flash] · **Claude Opus 5.5**[^claudeopus55] · **Gemini 4 Argon**[^gemini4argon] |

Dates identify the event in the release log: a paper, an announcement, a
preview, or a weights release. They do not all mean general availability.
Transformer is the architecture anchor; CLIP is a contrastive vision and text
model; Mamba is a selective state space architecture, not a Transformer.
ChatGPT marks the 2022 research preview.[^transformer][^clip][^mamba][^chatgpt]

OpenAI o1 records the full model’s December 5, 2024 release in ChatGPT,
not the September 12 o1-preview release. Claude Mythos is represented by its
April 7, 2026 restricted preview; it is not a general availability event.[^o1][^o1preview][^mythos]

## Detailed analysis

| Date | Model | Event recorded |
| --- | --- | --- |
| 2017-06-12 | Transformer[^transformer] | Architecture paper |
| 2018-06-11 | GPT[^gpt] | Announcement |
| 2018-10-11 | BERT[^bert] | Paper |
| 2019-02-14 | GPT-2[^gpt2] | Staged release |
| 2019-10-23 | T5[^t5] | Paper |
| 2020-05-28 | GPT-3[^gpt3] | Paper |
| 2021-01-05 | CLIP[^clip] | Announcement |
| 2021-01-11 | Switch Transformer[^switchtransformer] | Paper |
| 2021-03-18 | GLM[^glm] | Paper |
| 2022-01-27 | InstructGPT[^instructgpt] | Alignment announcement |
| 2022-03-29 | Chinchilla[^chinchilla] | Paper |
| 2022-04-05 | PaLM[^palm] | Paper |
| 2022-04-29 | Flamingo[^flamingo] | Paper |
| 2022-07-12 | BLOOM[^bloom] | Weights release |
| 2022-11-30 | ChatGPT[^chatgpt] | Research preview |
| 2023-01-30 | BLIP-2[^blip2] | Paper |
| 2023-02-27 | LLaMA[^llama] | Paper |
| 2023-03-14 | GPT-4[^gpt4] | Announcement |
| 2023-03-14 | ChatGLM-6B[^chatglm] | Weights release |
| 2023-04-17 | LLaVA[^llava] | Paper |
| 2023-07-18 | Llama 2[^llama2] | Family announcement |
| 2023-09-27 | Mistral 7B[^mistral7b] | Weights release |
| 2023-12-01 | Mamba[^mamba] | Paper |
| 2023-12-06 | Gemini 1.0[^gemini10] | Family announcement |
| 2023-12-11 | Mixtral 8x7B[^mixtral8x7b] | Release article |
| 2023-12-21 | InternVL[^internvl] | Paper |
| 2024-02-15 | Gemini 1.5 Pro[^gemini15] | Limited preview |
| 2024-03-04 | Claude 3[^claude3] | Family announcement |
| 2024-05-07 | DeepSeek-V2[^deepseekv2] | Paper |
| 2024-05-13 | GPT-4o[^gpt4o] | Announcement |
| 2024-07-23 | Llama 3.1[^llama31] | Weights release |
| 2024-08-29 | Qwen2-VL[^qwen2vl] | Announcement |
| 2024-09-19 | Qwen2.5[^qwen25] | Family announcement |
| 2024-12-05 | OpenAI o1[^o1] | ChatGPT release |
| 2024-12-26 | DeepSeek-V3[^deepseek-releases] | API release |
| 2025-01-20 | DeepSeek-R1[^deepseek-releases] | API release |
| 2025-03-12 | Gemma 3[^gemma3] | Family announcement |
| 2025-03-25 | Gemini 2.5 Pro[^gemini25pro] | Experimental release |
| 2025-04-29 | Qwen3[^qwen3] | Family announcement |
| 2025-05-22 | Claude 4[^claude4] | Family announcement |
| 2025-07-09 | Grok 4[^grok4] | Announcement |
| 2025-07-11 | Kimi K2[^kimik2] | Weights release |
| 2025-07-28 | GLM-4.5[^glm45] | Announcement |
| 2025-08-07 | GPT-5[^gpt5] | Announcement |
| 2025-09-23 | Qwen3-VL[^qwen3vl] | First family weights |
| 2026-02-16 | Qwen3.5[^qwen-releases] | First family weights |
| 2026-02-17 | GLM-5[^glm5] | Paper |
| 2026-04-07 | Claude Mythos Preview[^mythos] | Restricted preview |
| 2026-04-24 | DeepSeek-V4[^deepseek-releases] | API preview |
| 2026-07-27 | Kimi K3[^kimik3] | Weights and report |
| 2026-08-12 | Qwen3.8[^qwen-releases] | First family weights |
| 2026-09-01 | Claude Fable 5.1[^fable51] | Model release |
| 2026-09-03 | GPT-6 Astra[^gpt6astra] | Initial rollout |
| 2026-09-10 | DeepSeek-V4.1-Flash[^deepseekv41flash] | API release |
| 2026-09-22 | Claude Opus 5.5[^claudeopus55] | Announcement |
| 2026-09-30 | Gemini 4 Argon[^gemini4argon] | Restricted rollout |

## Counterevidence and uncertainty

This is a selected chronology, not a claim to completeness, a performance
ranking, or an access and licensing classification. Paper dates and release
dates can differ. The exact events and caveats are retained in
state/releases.json and state/claims.jsonl.

Qwen2-VL's official announcement is dated August 29, 2024, while the official
repository News records August 30 for its first smaller model release. The
public page uses the announcement date and states that boundary.[^qwen2vl][^qwen3vl]
The first Qwen3-VL weights were released September 23, 2025, before later
family members and the technical report.[^qwen3vl]
BLOOM uses its July weights release, not the November paper date.[^bloom]
InstructGPT uses the public alignment announcement, not its earlier API beta.[^instructgpt]

Fable 5.1 uses its September 1 release date, confirmed by the model overview
and platform release notes, not the August 31 Covered Model designation.
DeepSeek-V4.1-Flash uses API availability, not an assumed weights release.
The Mythos entry records the first restricted preview, not later Mythos 5 or
5.1 launches.[^fable51][^deepseekv41flash][^mythos]

The public examples supplied by the user inform the desire for a timeline
only. No source illustration, logos, or branch structure is copied.

## Implications

[GPT-2](/architectures/models/gpt-2/) traces a causal decoder from the report
to released code. [Qwen3-VL](/architectures/models/qwen3-vl/) follows a
multimodal model through visual processing, position, and training.

Use [Transformer Foundations](/architectures/foundations/) for the shared
mechanisms and [Architectural Evolution](/architectures/evolution/) to compare
design choices. This overview will grow as new releases add useful contrasts.

<details>
<summary>How we read a model</summary>

Follow the input from its processor through the model to the output. Compare
the report with the released configuration and source code, then examine the
training disclosure and evaluation conditions. Keep missing details visible:
a model name does not establish a checkpoint, a complete recipe, or a
universal performance ranking.

</details>

## Open questions and future research

The selected recent entries are not every 2026 model or variant. Refresh the
list when a new release changes the reading path. Update sources and exact
event types first, then regenerate and audit the infographic. Architecture
and training claims require separate focused model studies.

## Sources

[^transformer]: Vaswani et al. [Attention Is All You Need](https://arxiv.org/abs/1706.03762). 2017.

[^gpt]: OpenAI. [Improving language understanding with unsupervised learning](https://openai.com/index/language-unsupervised/). 2018.

[^bert]: Devlin et al. [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805). 2018.

[^gpt2]: OpenAI. [Better language models and their implications](https://openai.com/index/better-language-models/). 2019.

[^t5]: Raffel et al. [Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer](https://arxiv.org/abs/1910.10683). 2019.

[^gpt3]: Brown et al. [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165). 2020.

[^clip]: OpenAI. [CLIP: Connecting text and images](https://openai.com/index/clip/). 2021.

[^switchtransformer]: Fedus et al. [Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity](https://arxiv.org/abs/2101.03961). 2021.

[^instructgpt]: OpenAI. [Aligning language models to follow instructions](https://openai.com/index/instruction-following/). 2022.

[^chinchilla]: Hoffmann et al. [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556). 2022.

[^palm]: Chowdhery et al. [PaLM: Scaling Language Modeling with Pathways](https://arxiv.org/abs/2204.02311). 2022.

[^flamingo]: Alayrac et al. [Flamingo: a Visual Language Model for Few-Shot Learning](https://arxiv.org/abs/2204.14198). 2022.

[^bloom]: BigScience / Hugging Face. [Introducing The World's Largest Open Multilingual Language Model: BLOOM](https://huggingface.co/blog/bloom). 2022.

[^chatgpt]: OpenAI. [Introducing ChatGPT](https://openai.com/index/chatgpt/). 2022.

[^blip2]: Li et al. [BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models](https://arxiv.org/abs/2301.12597). 2023.

[^llama]: Touvron et al. [LLaMA: Open and Efficient Foundation Language Models](https://arxiv.org/abs/2302.13971). 2023.

[^gpt4]: OpenAI. [GPT-4](https://openai.com/index/gpt-4-research/). 2023.

[^llava]: Liu et al. [Visual Instruction Tuning](https://arxiv.org/abs/2304.08485). 2023.

[^mistral7b]: Mistral AI. [Mistral 7B](https://mistral.ai/news/announcing-mistral-7b/). 2023.

[^gemini10]: Google / Google DeepMind. [Introducing Gemini: our largest and most capable AI model](https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/). 2023.

[^mixtral8x7b]: Mistral AI. [Mixtral of experts](https://mistral.ai/news/mixtral-of-experts/). 2023.

[^claude3]: Anthropic. [Introducing the next generation of Claude](https://www.anthropic.com/news/claude-3-family). 2024.

[^gpt4o]: OpenAI. [Hello GPT-4o](https://openai.com/index/hello-gpt-4o/). 2024.

[^llama31]: Meta. [Introducing Llama 3.1: Our most capable models to date](https://ai.meta.com/blog/meta-llama-3-1/). 2024.

[^qwen2vl]: Qwen Team. [Qwen2-VL: To See the World More Clearly](https://qwenlm.github.io/blog/qwen2-vl/). 2024.

[^deepseek-releases]: DeepSeek. [Change Log](https://api-docs.deepseek.com/updates/). Dated release notes, inspected October 9, 2026.

[^gemini25pro]: Google DeepMind. [Gemini 2.5: Our most intelligent AI model](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-model-thinking-updates-march-2025/). 2025.

[^claude4]: Anthropic. [Introducing Claude 4](https://www.anthropic.com/news/claude-4). 2025.

[^gpt5]: OpenAI. [Introducing GPT-5](https://openai.com/index/introducing-gpt-5/). 2025.

[^qwen3vl]: Qwen Team. [Qwen3-VL repository](https://github.com/QwenLM/Qwen3-VL). Dated release notes, inspected October 9, 2026.

[^qwen-releases]: Qwen Team. [Qwen3.5, Qwen3.6 and Qwen3.8 release notes](https://github.com/QwenLM/Qwen3.8). Dated release notes, inspected October 9, 2026.

[^kimik3]: Moonshot AI. [Kimi K3 Open Day: weights, technical report and infrastructure](https://www.kimi.com/news/kimi-k3-open-source). 2026.

[^gpt6astra]: OpenAI. [Safety overview: GPT-6 Astra](https://openai.com/index/safety-overview-gpt-6-astra/). 2026.

[^claudeopus55]: Anthropic. [Introducing Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5). 2026.

[^gemini4argon]: Google DeepMind. [Gemini 4 Argon: our next era of frontier intelligence](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/). 2026.


[^glm]: Du et al. [GLM: General Language Model Pretraining with Autoregressive Blank Infilling](https://arxiv.org/abs/2103.10360). 2021.

[^chatglm]: Team GLM. [ChatGLM: A Family of Large Language Models from GLM-130B to GLM-4 All Tools](https://arxiv.org/html/2406.12793v1). 2024, Section 1 and Table 1 record the 2023 release.

[^glm45]: Z.ai. [Z.ai Releases GLM-4.5](https://www.prnewswire.com/news-releases/zai-releases-glm-4-5--setting-new-standards-for-ai-performance-and-accessibility-while-improving-affordability-302514803.html). 2025.

[^glm5]: GLM-5 Team. [GLM-5: from Vibe Coding to Agentic Engineering](https://arxiv.org/abs/2602.15763). 2026.

[^llama2]: Meta. [Meta and Microsoft Introduce the Next Generation of Llama](https://about.fb.com/news/2023/07/llama-2/). 2023.

[^mamba]: Gu and Dao. [Mamba: Linear-Time Sequence Modeling with Selective State Spaces](https://arxiv.org/abs/2312.00752). 2023.

[^internvl]: Chen et al. [InternVL: Scaling up Vision Foundation Models and Aligning for Generic Visual-Linguistic Tasks](https://arxiv.org/abs/2312.14238). 2023.

[^gemini15]: Google / Google DeepMind. [Our next-generation model: Gemini 1.5](https://blog.google/innovation-and-ai/products/google-gemini-next-generation-model-february-2024/). 2024.

[^deepseekv2]: DeepSeek-AI. [DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model](https://arxiv.org/abs/2405.04434). 2024.

[^o1preview]: OpenAI. [Introducing OpenAI o1-preview](https://openai.com/index/introducing-openai-o1-preview/). 2024.

[^qwen25]: Qwen Team. [Qwen2.5: A Party of Foundation Models!](https://qwenlm.github.io/blog/qwen2.5/). 2024.

[^gemma3]: Google DeepMind. [Introducing Gemma 3: The most capable model you can run on a single GPU or TPU](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-3/). 2025.

[^qwen3]: Qwen Team. [Qwen3: Think Deeper, Act Faster](https://qwenlm.github.io/blog/qwen3/). 2025.

[^grok4]: xAI. [Grok 4](https://x.ai/news/grok-4). 2025.

[^kimik2]: Moonshot AI. [Kimi K2: Open Agentic Intelligence](https://www.kimi.com/en/blog/kimi-k2) and [dated research index](https://www.kimi.com/en/blog/). 2025.

[^o1]: OpenAI. [Introducing ChatGPT Pro](https://openai.com/index/introducing-chatgpt-pro/). 2024.

[^mythos]: Anthropic. [Project Glasswing](https://www.anthropic.com/project/glasswing). 2026, April 7 launch and early access description.

[^fable51]: Anthropic. [Claude Fable 5.1](https://platform.claude.com/docs/en/models/fable-5-1/overview) and [Claude Fable and Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1). 2026.

[^deepseekv41flash]: DeepSeek. [Introducing DeepSeek V4.1 Flash: smarter, faster, more efficient](https://www.deepseek.com/en/news/deepseek-v4-1-flash/). 2026.
