# Architecture collection source record

Initial review October 3, 2026; collection refinement October 5, 2026, America/Vancouver.

The authoritative narratives are the pages under `src/content/docs/architectures/`.
This file records adaptation and source provenance, not duplicate editorial guidance.

## Adaptation boundary

The structure and selected explanations draw on the author's earlier Eclipse
learning material: Transformer foundations, focused attention discussions,
architecture evolution, and the model architecture collection. They were
rewritten for a public reading collection and checked against the public sources
listed below. No career records, interview correspondence, proprietary project
recollections, third party source screenshots, or archived PDFs were imported.

The initial collection used original prose and text diagrams. The expanded
Foundations page now includes attributed MIT licensed code excerpts, two rights
verified paper figures, and responsive adaptations of Eclipse's original
diagrams. Their versions, terms, changes, and checksums are recorded in
[the Foundations source record](./transformer-foundations.md). Formula and shape
calculations retain links to the definitions from which they are derived.

## Selected sources inspected

All URLs below were inspected on October 3, 2026. Paper dates identify the work,
not a claim that it was newly published on the review date.

| Source | Version or locator | Supports |
| --- | --- | --- |
| Vaswani et al., [Attention Is All You Need](https://arxiv.org/html/1706.03762v7), 2017 | v7, sections 3.1 through 3.5 | Attention, masking, FFN, position, and original encoder and decoder |
| Radford et al., [Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf), 2019 | Official PDF, section 2.3 | GPT-2 architecture modifications |
| OpenAI, [GPT-2 model implementation](https://github.com/openai/gpt-2/blob/master/src/model.py) | Default branch as inspected; not an immutable code snapshot | Embeddings, block, MLP, causal masking, past and present |
| Dao et al., [FlashAttention](https://arxiv.org/html/2205.14135v2), 2022 | v2, sections 2 and 3 | Exact attention and memory scheduling |
| Ainslie et al., [GQA](https://arxiv.org/html/2305.13245v3), 2023 | v3, section 2 | Query grouping and KV sharing |
| Katharopoulos et al., [Transformers are RNNs](https://arxiv.org/html/2006.16236v3), 2020 | v3, sections 3 and 4 | Linear attention and recurrent state |
| Su et al., [RoFormer](https://arxiv.org/html/2104.09864v5), 2021 | v5, section 3 | Rotary position mechanism |
| Shazeer, [GLU Variants Improve Transformer](https://arxiv.org/html/2002.05202v1), 2020 | v1, sections 1 through 3 | Gated FFNs and controlled comparison conditions |
| Fedus et al., [Switch Transformers](https://arxiv.org/html/2101.03961v3), 2021 | v3, sections 2 and 3 | Sparse expert routing and implementation concerns |
| Li et al., [BLIP-2](https://arxiv.org/abs/2301.12597), 2023 | Abstract inspected; no detailed implementation claim made | Frozen components and Q-Former interface |
| Liu et al., [Visual Instruction Tuning](https://arxiv.org/html/2304.08485v2), 2023 | v2, abstract and section 4.1 | Visual projection and instruction tuning |
| Qwen Team, [Qwen3-VL Technical Report](https://arxiv.org/html/2511.21631v1), 2025 | v1, sections 2 through 4 | Visual merging, DeepStack, and training stages |
| Qwen Team, [Qwen3-VL repository](https://github.com/QwenLM/Qwen3-VL) | README as inspected; not a pinned runtime | Published architecture summary |

## Evidence limits

The review is selective, not an exhaustive October 2026 frontier survey.
No experiments were executed. The model studies are introductions rather than
checkpoint pinned implementation notebooks. Proposed tests and emerging questions
are labeled as local proposals. Future deeper studies should record immutable
code snapshots and exact checkpoints before making configuration specific claims.

## October 5 collection refinement

The ten pages other than Foundations now use the shared writing, reference,
equation, figure, and export practices. Seven original mechanism diagrams
clarify attention efficiency, rotary matching, feature gating, expert routing,
visual interfaces, GPT-2 residual flow, and Qwen3-VL depth connections.
The four overview and agenda pages retain purposeful tables rather than adding
decorative figures. Foundations was preserved.

The bounded source audit inspected the relevant method sections of the sources
above. BLIP-2 v3 sections 3.1 to 3.3 and LLaVA v2 section 4.2 now support
training stage details rather than only abstract level descriptions. The GPT-2
source is pinned to commit `9b63575ef42771a015060c964af2c3da4cf7c8ab`.
A targeted Transformers v4.57.1 source check, commit
`8cb5963cc22174954e7dca2c0a3320b7dc2f4edc`, verifies Qwen3-VL output
additions at visual positions. This is not a complete checkpoint execution
trace. ViT v2 section 3.1 supplies the basic image patch count.

See the [collection audit](./collection-review/report.md) and its source,
claim, run, and visual records for exact evidence boundaries and QA results.
No upstream artwork or code excerpts were copied into the new pages.
