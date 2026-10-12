---
title: "DeepSeek-V4"
topic_id: "deepseek-v4"
status: reviewed
revision: 3
updated: "2026-10-10"
evidence_cutoff: "2026-10-10"
audience: "Readers studying model mechanisms"
canonical_format: markdown
---

# DeepSeek-V4

## Executive answer

Sequence compression and the cache lifecycle both matter. A licensed original cache-layout figure connects the attention mechanisms to persistent global blocks and bounded request state.

[Technical report](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/blob/553034d7dd9e06c2eeaee68cf85a17d6d4754cf0/DeepSeek_V4.pdf) · [Hugging Face: DeepSeek-V4-Flash: original preview studied](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)

## Visual overview

<!-- visual-id: V003 -->
![DeepSeek-V4 block with pre-block, post-block and residual mixing around attention and MoE; the output head also feeds MTP.](../../../../public/figures/model-studies/deepseek-v4/architecture.png)

<!-- visual-id: V004 -->
![CSA compresses history, scores compressed indexer keys, selects top-k entries and joins them with local window KV.](../../../../public/figures/model-studies/deepseek-v4/compressed-sparse-attention.png)

<!-- visual-id: V005 -->
![HCA combines heavily compressed history with local window KV and reads both directly, without a top-k indexer.](../../../../public/figures/model-studies/deepseek-v4/heavily-compressed-attention.png)

<!-- visual-id: V007 -->
![Distinguish bounded request-state cache from growing compressed global KV blocks.](../../../../public/figures/model-studies/deepseek-v4/cache-lifetimes.png)

## Key findings

- Attention internals: Added grouped projection, query/KV norms, sink logits, partial/inverse RoPE distinction.
- Routing: Added sqrt-softplus, token-ID hash routing, removed node limit and retained sequence auxiliary loss.
- Cache/inference: Added original cache-layout crop and Flash lcm layout derivation.

## Detailed analysis

DeepSeek-V4 changes how a language model remembers a long conversation. Instead of keeping a full attention record for every token at every layer, it combines recent, detailed evidence with compressed views of older history. It also replaces a single residual stream with several interacting streams and changes the optimizer used to train the model.[^report]

Representative checkpoint: **DeepSeek-V4-Flash**, the original text-only preview generation. The report, pinned configuration, license and targeted reference inference functions were checked October 10, 2026. No checkpoint was downloaded or executed. Later 0731/0813 updates and [V4.1-Flash](/architectures/models/deepseek-v4-1-flash/) are not interchangeable with this study.[^card][^config][^code]

### Highlights

- **Three levels of attention detail.** Keep a small local window, select moderately compressed history, and read a much coarser global view in other layers.[^report]
- **Residual width becomes another design axis.** Manifold-Constrained Hyper-Connections, or mHC, mix four residual streams while constraining their residual mapping for stability.[^report][^config]
- **Efficiency needs a complete system.** Compression changes cache layout, prefix reuse and incomplete-block handling. The reference code illustrates the mechanism, not every optimization behind the reported serving budget.[^report][^code]


### Model in numbers

| Dimension | Value and scope |
| --- | --- |
| Model size | Flash: reported 284B total, 13B activated per token. Pro is a different 1.6T total, 49B active model. These are report labels, not a local tensor count.[^report] |
| Pretraining exposure | Flash: 32T tokens; Pro: 33T. This is training exposure, not a count of unique documents.[^report] |
| Training sequence | Flash starts at 4K, then extends to 16K, 64K and 1M; sparse attention begins at the 64K stage.[^report] |
| Released context | 1,048,576 positions in the pinned Flash configuration; capability still depends on task and evidence placement.[^config] |
| Post training | Domain specialists trained with SFT and RL, then full-vocabulary on-policy distillation from more than ten teachers; total examples and rollouts undisclosed.[^report] |
| Training compute | Full-run FLOPs, accelerator-hours and total financial cost undisclosed in the inspected report. Inference FLOP estimates are not training compute.[^report] |


### Architecture

Token IDs become embeddings of width 4,096. Flash has 43 Transformer blocks, each with attention and an expert FFN. The first two use only sliding-window attention; later blocks alternate compressed sparse and heavily compressed attention. Each expert layer has one shared expert and selects six of 256 routed experts. The first three use hash routing rather than the later learned router.[^report][^config]





    <!-- visual-id: V003 -->
![DeepSeek-V4 block with pre-block, post-block and residual mixing around attention and MoE; the output head also feeds MTP.](../../../../public/figures/model-studies/deepseek-v4/architecture.png)


    **Figure 1.** Hybrid attention and expert FFNs inside a multistream residual block. Reproduced from report Figure 2.[^report] [MIT documentation notice](/licenses/deepseek-v4-documentation-MIT.txt).



Read Figure 1 from the bottom: embeddings enter the residual streams, attention and MoE each update them through mixing, and the top head predicts tokens. The diagram separates the main language loss from the auxiliary MTP loss.

The head emits next-token logits. A separate multi-token prediction branch has depth one. It supplies an additional training objective; it does not make the main language model bidirectional.[^report][^config]



### What changed from V3

[DeepSeek-V3](/architectures/models/deepseek-v3/) compresses each token's attention content into a latent representation. V4 also compresses **along the sequence**: multiple past tokens contribute to one history entry. It changes the attention operator and the information retained, rather than merely implementing the same dense attention more efficiently.[^report]

This is a deliberate tradeoff. Long agent traces need affordable memory, but exact details can be lost in pooling or missed by sparse selection. The local window preserves recent fine detail; alternating global mechanisms offers different views of older evidence. None is a guarantee of perfect recall.[^report]

### CSA and HCA

Compressed Sparse Attention, or CSA, forms a learned, channel-wise weighted summary of blocks of history. With ratio four, its two projection streams overlap neighboring blocks: each pooled entry uses eight source entries, while the number of stored entries falls by about four, not eight. A small indexer then selects relevant compressed positions for the current query.[^report][^code]





    <!-- visual-id: V004 -->
![CSA compresses history, scores compressed indexer keys, selects top-k entries and joins them with local window KV.](../../../../public/figures/model-studies/deepseek-v4/compressed-sparse-attention.png)


    **Figure 2.** CSA selects compressed history and keeps a local detail path. Reproduced from report Figure 3.[^report] [MIT documentation notice](/licenses/deepseek-v4-documentation-MIT.txt).



In Figure 2, follow the yellow history entries through the two compressor paths. The indexer chooses what the main attention reads; the local KV path bypasses compression. These are distinct compression and selection operations.

Heavily Compressed Attention, or HCA, pools nonoverlapping groups of 128 and reads all causally eligible compressed entries. Its attention is dense over this much shorter representation. It does not select the top 128 tokens, and its compression ratio is not an attention window.[^report][^code]





    <!-- visual-id: V005 -->
![HCA combines heavily compressed history with local window KV and reads both directly, without a top-k indexer.](../../../../public/figures/model-studies/deepseek-v4/heavily-compressed-attention.png)


    **Figure 3.** HCA reads a coarser history without an indexer. Reproduced from report Figure 4.[^report] [MIT documentation notice](/licenses/deepseek-v4-documentation-MIT.txt).



Figure 3 removes the indexer rather than hiding it inside the compressor. HCA reads every eligible coarse entry; the local branch still preserves recent detail.

For an illustrative history length `T`, the Flash budgets are approximately:



$$
N_{\mathrm{CSA}}\approx\lfloor T/4\rfloor,\qquad N_{\mathrm{HCA}}\approx\lfloor T/128\rfloor
\tag{1}
$$



Equation (1) counts global entries, not bytes or all state. CSA core attention reads at most 512 selected global entries plus the local window; HCA reads its eligible compressed history plus that window. CSA's indexer still searches the compressed past. Compression therefore does not make every part of computation or memory constant in context length.[^report]

Only completed preceding blocks are visible to a query. Its own incomplete block cannot be read as a future-inclusive summary. The local branch supplies nearby tokens, including evidence within that block. The released compressor keeps unfinished values and pooling scores until a block can be emitted.[^report][^code]

Both mechanisms use one shared KV representation across query heads. The same entry acts as key and value, with partial rotary position information and an inverse rotation on attention output. This is not simply V3's latent cache under a new name.[^report]

<details>
<summary>Inside core attention: normalization, sinks and output projection</summary>

The main queries and compressed KV receive head-wise RMSNorm before attention.
Partial RoPE rotates their last 64 channels; because a shared vector serves as
both key and value, the output receives an inverse rotation to restore a
relative-position interpretation. Low-rank query construction is shared by
main attention and the indexer, but they still use different projections.[^report]

A learned **sink logit** adds mass to the attention denominator without a value
contribution. Real evidence weights can therefore sum to less than one, allowing
a head to attenuate an unhelpful read. This is not an extra remembered token.
Grouped output projection first compresses groups of head outputs, then projects
their concatenation back to the residual width, reducing a large dense output
matrix's cost.[^attention-details]

</details>

### mHC: richer residuals without uncontrolled mixing

A normal residual adds a layer's output to one hidden vector. mHC keeps a matrix of residual streams `X`, mixes them to form the layer input, then distributes the layer output back across the streams:[^report]



$$
X_{l+1}=B_lX_l+C_lF_l(A_lX_l)
\tag{2}
$$



In Equation (2), Flash's `X` has shape `4 × 4096` per token. The internal attention or FFN still processes width 4,096; it is not automatically four times larger. `A` mixes the input streams, `C` distributes the new result, and `B` mixes the residual path.[^report][^code]

Unrestricted products of mixing matrices can amplify or suppress signals through a deep network. The report constrains `B` to a nonnegative, doubly stochastic matrix, with row and column sums one, using 20 Sinkhorn iterations as a practical approximation. This stabilizes the residual mapping itself; it does not prove that the whole nonlinear network is nonexpansive or immune to training instability.[^report][^config]

### Training and post training

The corpus combines code, mathematics, web text, multilingual material and long documents. The report describes filtering templated content, longer-document curation, fill-in-middle data and sample-level attention masking. It does not release a complete reproducible corpus or every mixture proportion.[^report]

Flash warms up dense attention for its first 1T tokens, introduces sparse attention at 64K with indexer warmup, and later trains at 1M. The batch grows to 75.5M tokens. Muon updates most matrix parameters; AdamW remains for embeddings, the prediction head, normalization and selected non-matrix parameters. The report also describes anticipatory routing and SwiGLU clamping to address observed loss spikes.[^report]

Post training first develops separate **domain specialist models** using SFT and GRPO. These specialists are teachers, not the routed FFN experts inside one MoE block. A unified student then learns from their output distributions on its own generated trajectories using full-vocabulary reverse-KL on-policy distillation. More than ten teachers contribute; no complete stage-wise data count is disclosed.[^report]

<details>
<summary>MoE routing is not unchanged from V3</summary>

V4 changes routed-expert affinity from sigmoid to the square root of softplus.
It retains routing-bias load balancing and a small sequence-level auxiliary
loss, but removes V3's limit on routing target nodes. The earliest hash-routed
layers select experts from token IDs rather than a learned contextual score;
later layers use learned routing. These choices change dispatch and training
behavior, not just the number of experts.[^routing-details]

</details>

### Inference and implementation boundaries

The cache has two lifetimes. Global compressed entries accumulate with history and can support prefix reuse. Recent sliding-window values and unfinished compression blocks are small, position-dependent state. A hit ending inside a compression block requires reconstruction of its uncompressed tail.[^report][^code]





<!-- visual-id: V007 -->
![A fixed state cache stores recent local KV and unfinished compression state; growing global blocks store CSA and HCA entries across layers.](../../../../public/figures/model-studies/deepseek-v4/cache-lifetimes.png)


**Figure 4.** Two cache lifetimes, two layouts. Reproduced from report Figure 6, p. 22.[^report] [MIT documentation notice](/licenses/deepseek-v4-documentation-MIT.txt).



Figure 4 separates a request's bounded state from its accumulating global
history. For Flash's ratios 4 and 128, one common layout unit spans 128 original
positions: 32 CSA entries and one HCA entry per applicable layer. Those are
**entry counts**, not equal-sized byte allocations. The cache manager and
sparse kernels must agree on alignment and prefix-hit boundaries.[^cache-details]

The report explores full local-state caching, periodic checkpoints and no persisted local-state caching. Exact reconstruction in the last case can require replay proportional to layer count times window size. [V4.1-Flash](/architectures/models/deepseek-v4-1-flash/) later changes that tradeoff through approximate bounded replay.[^report]

**Do not apply the serving memory headline to the reference Python tensors.** The pinned `Attention.forward` simulates quantization but retains BF16 KV tensors. The report's mixed FP8/BF16 cache representation belongs to the optimized serving design. No runtime memory or throughput was measured here.[^code][^report]

<details>
<summary>Artifact identity and openness</summary>

The report PDF, Flash card, configuration, license and `inference/model.py` are pinned to Hugging Face. Targeted inspection covers `Compressor.forward`, `Attention.forward`, `Block.hc_pre`, `Block.hc_post` and the main block update. The configuration's final zero compression-ratio entry accompanies the extra prediction layer; the main model has 43 layers, not 44.[^config][^code]

The release states MIT for its repository and weights. Training data and a fully reproduced training run are separate disclosures. The four report-figure crops retain the exact release documentation notice; no substantial code excerpt is copied.[^card][^license]

</details>


### Evaluation under its actual conditions

The report estimates Flash at about 10% of V3.2's single-token equivalent-FP8 inference FLOPs and 7% of its KV cache **at 1M context**. Pro has different ratios. These are architecture/system estimates under a stated precision accounting, not a measured tenfold end-to-end speedup across hardware, batches or short prompts.[^report]

Its original Flash reasoning comparison makes test-time budget visible:[^report]

| Mode | GPQA Diamond pass@1 | HLE pass@1 |
| --- | --- | --- |
| Non-think | 71.2 | 8.1 |
| High | 87.4 | 29.4 |
| Max | 88.1 | 34.8 |

These are Table 7's author-reported preview results. The reasoning evaluation uses temperature 1.0 and context budgets of 8K, 128K and 384K for the three modes. Mode changes therefore include different inference budgets; this table does not isolate CSA, mHC or Muon. Later cards can report newer numbers and should not silently replace this experiment.[^report]

The evidence supports a useful combination of long-context efficiency and reasoning capability. It does not isolate every architectural contribution, establish universal superiority or show that a million-position context preserves every detail. The authors explicitly acknowledge architectural complexity and incomplete understanding of their training-stability interventions.[^report]

### Lessons to carry forward

The reusable lesson is to budget memory by **detail, history length and lifetime**, not just parameter count. Also distinguish the storage design from its reference implementation. V4's attention savings become a systems problem involving pooling, incomplete state, prefix reuse and precision.

Compare [V2's content latents](/architectures/models/deepseek-v2/), [V3's expert training](/architectures/models/deepseek-v3/) and [V4.1's cross-layer reuse](/architectures/models/deepseek-v4-1-flash/). For the shared background, use [Attention and memory](/architectures/evolution/attention-and-memory/) and [FFNs and experts](/architectures/evolution/ffns-and-experts/).

### Open questions

How robust is sparse retrieval when crucial facts fall near compression boundaries? Which mixture and training interventions contribute most under controlled budgets? What is the total hardware cost of the complete training program? The inspected sources do not resolve all of these questions.


[^report]: DeepSeek-AI. [DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/blob/553034d7dd9e06c2eeaee68cf85a17d6d4754cf0/DeepSeek_V4.pdf). Original preview report, pinned PDF; sections 2–5, Table 7 and limitations inspected October 10, 2026.

[^card]: DeepSeek-AI. [DeepSeek-V4-Flash model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/blob/553034d7dd9e06c2eeaee68cf85a17d6d4754cf0/README.md). Pinned preview card and separate license statement.

[^config]: DeepSeek-AI. [DeepSeek-V4-Flash configuration](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/blob/553034d7dd9e06c2eeaee68cf85a17d6d4754cf0/config.json). Immutable artifact revision.

[^code]: DeepSeek-AI. [DeepSeek-V4 reference inference model](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/blob/553034d7dd9e06c2eeaee68cf85a17d6d4754cf0/inference/model.py). Targeted compressor, attention and residual functions inspected; no code executed.

[^license]: DeepSeek-AI. [MIT license](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/blob/553034d7dd9e06c2eeaee68cf85a17d6d4754cf0/LICENSE). License file inspected October 10, 2026.

[^attention-details]: DeepSeek-AI, pinned [V4 report](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/blob/553034d7dd9e06c2eeaee68cf85a17d6d4754cf0/DeepSeek_V4.pdf), sections 2.3.1–2.3.3, pp. 10–13. Grouped output projection, query/KV normalization, partial RoPE and sink Equation (27).
[^routing-details]: DeepSeek-AI, same report, section 2.1, p. 6: affinity activation, bias and sequence-loss balancing, removed node limit and token-ID hash routing.
[^cache-details]: DeepSeek-AI, same report, section 3.5.1 and Figure 6, pp. 21–23. Layout unit counts above are a local derivation using Flash's reported ratios.

## Counterevidence and uncertainty

The page keeps conditional evaluations, missing training disclosures and report-versus-implementation distinctions explicit. The audit does not establish benchmark replication or production performance. See the cited limitations in the analysis.

## Implications

Study the mechanism and its interface, not just headline model size or scores. Figures separate distinct relationships instead of repeating one overview.

## Open questions and future research

Exact undisclosed training mixtures and compute remain open. Runtime and application quality need separate authorized experiments.

## Sources

Claim-local references above retain exact source editions and code revisions. See state/sources.jsonl and coverage-audit.md for the inspected source map.

## What changed in this revision

Substantive mechanism and figure coverage audit; scoped additions listed in coverage-audit.md. New figure assets retain provenance and rights. Fresh browser/export checks passed; see the revision 3 presentation record.

## Revision 3 presentation verification

106 automated tests, zero Astro diagnostics, the static build and all 43 docs lint checks passed. The collection passed 81 fresh browser views; this page was checked at 1440px light, 390px light and 320px dark, with desktop focus, active family navigation, caption order, anchors, image decoding, resource cards and no page overflow. Complete source figures fit desktop, while narrow frames support keyboard panning and full-size access. Search and Markdown/MDX exports preserve citations, figures and source links. All 66 model figure renders were inspected, with full-size review of new dense diagrams. See state/presentation-qa.json for exact page checksums and evidence. No model benchmark was reproduced. Existing bundler and redirect warnings remain.
