---
title: "LLaMA"
topic_id: "llama"
status: reviewed
revision: 3
updated: "2026-10-10"
evidence_cutoff: "2026-10-10"
audience: "Readers learning released LLM and VLM architecture and training"
canonical_format: "markdown"
---

# LLaMA

## Executive answer

[Technical report](https://arxiv.org/abs/2302.13971v1) · [Hugging Face: Community mirror: huggyllama/llama-7b](https://huggingface.co/huggyllama/llama-7b)

The original LLaMA asks a practical scaling question: if a model will be used many times, should we spend more training compute to make each later prediction cheaper? Its answer is a family of relatively small dense decoders trained on substantial token budgets. The architecture is a careful combination of existing ideas, not one newly invented attention operation.[^report]

## Visual overview

Purposeful figures below cover the input contract, distinctive mechanism or bounded evidence; their captions identify provenance and scope.


## Key findings

- **Optimize for repeated use.** The report emphasizes inference budgets rather than only the cheapest way to reach a training loss.[^report]
- **A modern dense decoder baseline.** Pre normalization, RMSNorm, rotary position and SwiGLU appear together in a compact released implementation.[^report][^code]
- **Released for research, not unrestricted open source.** Original weights used approval based access and a noncommercial bespoke license. Their availability helped make direct model study possible, but the access and license boundary matters.[^card][^release]

Representative subject: **original LLaMA 7B**, about 6.7 billion parameters in the report, not Llama 2 or Llama 3. Report v1, historical release and targeted original inference functions checked October 10, 2026. Original authenticated weight/config files were not downloaded or executed.[^report][^code]

## Detailed analysis

## Model in numbers

| Dimension | Value and scope |
| --- | --- |
| Model size | 6.7 billion parameters for the 7B model in Table 2; dense, with no expert routing.[^report] |
| Architecture | 32 layers, width 4,096, 32 attention heads; each head has width 128.[^report] |
| Pretraining exposure | One trillion tokens for 7B and 13B. The 33B and 65B runs use 1.4 trillion; do not transfer that larger budget to 7B.[^report] |
| Training compute | 82,432 A100 80 GB GPU hours for 7B in the report's accounting. This is not a financial cost or a full research program budget.[^report] |
| Context | Training sequence length is not specified in the inspected report. The selected early inference code has a configurable cache allocation; its default is not a measured useful context limit.[^code] |
| Post training | The main 7B subject is a base model. The paper's small instruction tuning experiment uses 65B and is a different result.[^report] |

## What changed

Training optimal and serving optimal are not necessarily the same objective. A larger model can reach a desired loss with fewer training tokens, while a smaller model trained longer may be cheaper over many inference requests. LLaMA deliberately explores that latter regime. The report shows continuing improvements over long token exposure rather than claim that a single parameter count determines capability.[^report]

This is a useful lens for builders: model weights, cache memory and repeated arithmetic remain after the training run is over. Whether more upfront training pays off depends on workload and serving conditions; the paper does not establish a universal business optimum.

## Architecture

SentencePiece BPE converts text into token IDs, splitting numbers into individual digits and falling back to bytes for otherwise unknown characters. Token embeddings enter a causal decoder with two residual updates per layer, followed by final RMSNorm and a vocabulary projection.[^report][^code]

  **Model path**

1. **Text tokens**: SentencePiece BPE
2. **32 residual blocks**: RMSNorm → attention; RMSNorm → SwiGLU
3. **Final RMSNorm**: One hidden stream
4. **Vocabulary logits**: Choose the next token

Rotary position acts on attention queries and keys. The original code uses full multi-head KV state, not later Llama GQA.

<!-- visual-id: V002 -->
**Figure 1.** Original LLaMA combines established mechanisms in one causal stream. Original schematic based on the report and historical code.[^report][^code]

The selected original implementation normalizes the input to attention, adds its result to the residual stream, normalizes the updated stream for the FFN, then adds that FFN result. It uses **full multi-head attention**: keys and values have one head per query head. Describing this original 7B model with the grouped KV heads of later Llama generations would be incorrect.[^code]

## Gated features and rotary position

SwiGLU forms two projections, applies SiLU to one and multiplies them elementwise before a down projection. In a column vector convention:

$$
\operatorname{FFN}(x)=W_{\mathrm{down}}\left[\operatorname{SiLU}(W_{\mathrm{gate}}x)\odot W_{\mathrm{up}}x\right]
\tag{1}
$$

Equation (1) explains the gate rather than reproduce source code. The original implementation reduces the nominal four times FFN width by a factor of two thirds, then rounds to a multiple of 256. For width 4,096, this gives an intermediate width of 11,008. This is a derivation from the inspected constructor, not the width of a different Llama generation.[^code]

The gate offers conditional feature selection, but adds an extra projection compared with a simple two matrix FFN. Reducing the expansion helps keep its parameter and arithmetic budget comparable. The report names SwiGLU as a performance motivated architectural choice; it does not provide an isolated LLaMA ablation proving its individual contribution.[^report]

Rotary position rotates query and key pairs before their dot products. It replaces added absolute position vectors and introduces relative position structure into attention comparisons. A position mechanism is not itself proof of arbitrary length generalization. See [Position and long context](/architectures/evolution/position-and-long-context/).

## Training

The disclosed mixture samples 67% CommonCrawl, 15% C4, 4.5% GitHub, 4.5% Wikipedia, 4.5% books, 2.5% arXiv and 2% Stack Exchange. Filtering and deduplication differ by source. Sampling proportions and epochs are distinct: the 1.4T run repeats Wikipedia and books more than some web sources.[^report]

<details>
<summary>Source-specific cleaning changes the mixture</summary>

CommonCrawl uses CCNet deduplication, English identification and quality filtering, followed by a classifier favoring Wikipedia-reference-like pages. GitHub keeps projects labeled Apache, BSD or MIT, applies code heuristics and exact file deduplication. arXiv processing removes pre-section material and bibliography, strips comments and expands user macros. These pipelines preserve different kinds of structure and do not imply that every retained web document has redistribution permission.[^report]

</details>

The 7B recipe uses AdamW, peak learning rate 0.0003, cosine decay to 10% of that peak, 2,000 warmup steps, weight decay 0.1 and gradient clipping 1.0. The batch is four million tokens. Efficient attention, selective activation recomputation and communication overlap support the training system; they are not extra model capabilities.[^report]

### Spend memory without recomputing every expensive operation

The training implementation uses memory-efficient exact attention so it need not store the full attention matrix, or compute masked upper-triangle scores. This changes implementation cost, not the model's causal attention rule. Its selective activation checkpointing retains expensive linear-layer outputs while recomputing cheaper activations during backward, rather than discarding every intermediate in a whole layer. Saved memory and extra computation are an explicit tradeoff.[^report]

Model and sequence parallelism and overlapped communication support the larger training runs. The report's 380 tokens per second per GPU and 21-day run on 2,048 A100 80GB GPUs describe **65B**, not the 7B checkpoint. They should not be combined with the 7B compute number in the scale table.[^report]

The main objective is causal next token prediction. The original base model is not aligned through human preference learning. The report's instruction experiment briefly tunes the 65B model and cannot supply a chat training recipe or score for the studied 7B artifact.[^report]




<!-- visual-id: V102 -->
![LLaMA training loss continues downward across the reported token budgets. The 7B and 13B curves stop at one trillion tokens; 33B and 65B continue to 1.4 trillion.](../../../../public/figures/model-studies/llama/training-loss.png)



**Figure 2.** Longer training still reduces loss. Reproduced from Touvron et al., Figure 1; figure crop, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).[^report]



Figure 2 makes the exposure boundary visible: 7B and 13B stop at 1T tokens, while 33B and 65B reach 1.4T. Falling training loss motivates spending more on a model that will later be cheaper to serve; it does not by itself prove equivalent improvement on every downstream task.

## Inference and state

The historical Attention.forward projects queries, keys and values, rotates queries and keys, writes current KV into a preallocated cache at start_pos and reads the cache prefix. Generation must manage positions and allocated capacity correctly. Rotary frequency buffers longer than a configured cache do not automatically extend that cache.[^code]

In the selected early Transformer.forward, the final projection is applied only to the last hidden position and returns float logits. This is an inference interface, not a training implementation returning every position's loss. Token sampling and prompt formatting belong to the surrounding generation code.[^code]

<details>
<summary>Historical artifact and license boundaries</summary>

The original source snapshot is dated February 24, 2023. Targeted inspection covers RMSNorm, apply_rotary_emb, Attention.forward, FeedForward and TransformerBlock.forward. The source's default ModelArgs values are not a 7B checkpoint configuration; concrete 7B dimensions above come from the report.[^code]

Its README describes approved download links. The model card states a noncommercial bespoke weight license, while the software LICENSE in this snapshot is GPLv3. Do not apply the later Llama 2 or Llama 3 Community License retroactively, or treat the repository software license as proof of unrestricted original weight rights.[^release][^card]

</details>

## Evaluation

The report's five shot MMLU accuracies are 35.1 for LLaMA 7B, 46.9 for 13B and 63.4 for 65B. Its listed GPT-3 175B comparison is 43.9. These author reported conditions illustrate why parameter count alone is a poor capability proxy; they do not imply that 7B surpasses 175B, or that every task behaves like MMLU.[^report]

The architecture and training mixture change together relative to earlier systems. No controlled result in this report isolates the effect of RMSNorm, rotary position or SwiGLU. The main empirical contribution is the achieved capability and inference scale tradeoff of the complete recipe, not proof that each part is independently responsible.

Section 3.7 provides a useful qualification to the falling-loss plot: downstream metrics do not all track perplexity equally. WinoGrande correlates less clearly with training loss, and 33B and 65B perform similarly there during training. Training loss is a useful optimization signal, not a complete measure of downstream capability.[^report]

## Counterevidence and uncertainty

Original LLaMA is a base text model with English dominant data, potential bias, toxic output and incorrect answers. The model card recommends additional risk evaluation before downstream application. It records one trained model per size, so pretraining variability was not evaluated.[^card]

The original request based release and noncommercial terms limit the openness claim. Exact training data reconstruction, authenticated original checkpoint configuration and runtime measurements remain outside this study. Publicly accessible source descriptions do not mean that every training document has permissive redistribution rights.

## Implications

Read scaling choices through both training and inference budgets. Then inspect each generation separately: [Llama 3 and 3.1](/architectures/models/llama-3/) adds different tokenizer, KV sharing, context and post training choices. [Mistral 7B](/architectures/models/mistral-7b/) offers a focused contrast in bounded attention state.

## Sources

[^report]: Hugo Touvron et al. [LLaMA: Open and Efficient Foundation Language Models](https://arxiv.org/abs/2302.13971v1), 2023 version 1, sections 1 to 4; Tables 1, 2, 9 and 15.

[^code]: Meta FAIR. [Original LLaMA model implementation](https://github.com/meta-llama/llama/blob/1076b9c51c77ad06e9d7ba8a4c6df775741732bd/llama/model.py), targeted normalization, attention, FFN and Transformer functions. No code copied or executed.

[^card]: Meta FAIR. [Original LLaMA model card](https://github.com/meta-llama/llama/blob/1076b9c51c77ad06e9d7ba8a4c6df775741732bd/MODEL_CARD.md), version 1, weight license, intended use, training mixture and limitations.

[^release]: Meta FAIR. [Original release README](https://github.com/meta-llama/llama/blob/1076b9c51c77ad06e9d7ba8a4c6df775741732bd/README.md) and [software LICENSE](https://github.com/meta-llama/llama/blob/1076b9c51c77ad06e9d7ba8a4c6df775741732bd/LICENSE). Inspected October 10, 2026.

## Open questions and future research

See coverage-audit.md for the mechanism-by-mechanism audit, exact source locators, justified omissions and remaining artifact-access gaps. No weights or runtime benchmarks were executed. Renewed rendered and export QA passed; see the revision 3 presentation record.

## What changed in this revision

Revision 3: Source-specific cleaning; exact memory-efficient attention versus sparse attention; selective checkpointing mechanism; 65B-only systems scope; task-specific counterevidence to loss-driven capability claims. Earlier evidence and visual-review history remain in the ledgers.

## Revision 3 presentation verification

106 automated tests, zero Astro diagnostics, the static build and all 43 docs lint checks passed. The collection passed 81 fresh browser views; this page was checked at 1440px light, 390px light and 320px dark, with desktop focus, active family navigation, caption order, anchors, image decoding, resource cards and no page overflow. Complete source figures fit desktop, while narrow frames support keyboard panning and full-size access. Search and Markdown/MDX exports preserve citations, figures and source links. All 66 model figure renders were inspected, with full-size review of new dense diagrams. See state/presentation-qa.json for exact page checksums and evidence. No model benchmark was reproduced. Existing bundler and redirect warnings remain.
