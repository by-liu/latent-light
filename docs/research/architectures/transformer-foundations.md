# Transformer Foundations adaptation record

Initial adaptation reviewed October 3, 2026; all ten figures audited October 4,
2026. Page: `src/content/docs/architectures/foundations.mdx`.

## Coverage and boundary

Consolidates all five Eclipse Annotated Transformer chapters: architecture and
data flow, attention and masking, components and construction, training and
inference, and the bridge to modern LLMs. Repeated chapter introductions,
interview-specific callouts, navigation, and private-site links are removed.
Shape ledgers, implementation contracts, code examples, conditional SFT,
accumulation, LoRA, experimental controls, decoding, and optional checks remain.

No career records, employer project details, private correspondence, original
archival PDFs, or unlicensed source screenshots were copied. Eclipse source
files and archival assets remain unchanged. This is a local implementation,
not authorization to publish.

## Code reference and license

Harvard NLP / Alexander Rush, The Annotated Transformer, v2022 implementation:
https://github.com/harvardnlp/annotated-transformer/blob/debc9fd747bb2123160a98046ad1c2d4da44a567/the_annotated_transformer.py

Exact snapshot `debc9fd747bb2123160a98046ad1c2d4da44a567`. Retrieved and inspected
October 3, 2026: classes/functions at lines 230–438, 441–628, 677–848, 907–1024,
1058–1071, 1148–1176, and 1313–1328. MIT license verified from the same snapshot;
complete notice retained in `public/licenses/annotated-transformer-MIT.txt`.

Excerpts are selected, condensed, and renamed, not a standalone executable
library. The attention excerpt uses negative infinity rather than -1e9 and
states that it is teaching code. Head broadcasting is made explicit. Greedy
decoding adds EOS stopping and device handling; the differences are marked.
The pinned tutorial's pre-normalization and separate untied factory modules
are distinguished from the original paper. No numerical reproduction claimed.

The label smoothing explanation corrects a prior Eclipse ambiguity: smoothed
cross-entropy has a positive entropy baseline; KL divergence can reach zero.
The derivation is written on the page. Full sequence versus cached step cost
and cache byte counts are also local derivations with assumptions.

## Reproduced figures

### Original Transformer architecture

- Source: Vaswani et al., Attention Is All You Need, NeurIPS 2017, arXiv v7,
  August 2, 2023: https://arxiv.org/html/1706.03762v7
- Location: Figure 1, PDF page 3.
- Rights: explicit scholarly/journalistic figure reproduction permission in
  the paper, rechecked in the public HTML on October 3, 2026. Not a general
  permission to redistribute the full PDF or use the figure as identity art.
- Existing Eclipse extraction: page rendered at 288 DPI and cropped to figure
  and caption. No diagram content redrawn.
- New path: `public/figures/transformer-foundations/original-transformer.png`.
- SHA-256: `98f6ab25c76e900d4aabe21022e2a06c845543361f1a4e5f425e9719da99c500`.
- Copy is byte-identical to the Eclipse derivative, not a new crop.

### Query and KV sharing

- Source: Joshua Ainslie et al., GQA: Training Generalized Multi-Query
  Transformer Models from Multi-Head Checkpoints, EMNLP 2023:
  https://aclanthology.org/2023.emnlp-main.298/
- Location: Figure 2, PDF page 2, proceedings page 4896.
- Rights: CC BY 4.0, rechecked October 3, 2026 through
  https://aclanthology.org/faq/copyright/ and https://creativecommons.org/licenses/by/4.0/.
- Existing extraction: embedded RGB image via `pdfimages -f 2 -l 2 -png`.
  Pixels unchanged, dimensions 1848 × 608.
- New path: `public/figures/transformer-foundations/gqa-comparison.png`.
- SHA-256: `df93411d3f67c1dd106d7c5d11716a04006c41a90e535c6ce222025f46379862`.
- Copy is byte-identical to the Eclipse derivative. Surrounding border is site
  presentation, not alteration of the figure. Caption retains author, venue,
  paper link, license, and change status.

## Original and adapted diagrams

`src/components/architectures/FoundationDiagram.astro` contains five variants.
The flow and attention diagrams are provided by `EncoderDecoderFlow.astro`
and `AttentionFlow.astro`; the table records all three components:

| Variant | Provenance and meaningful changes |
| --- | --- |
| flow | Adapted from Eclipse EncoderDecoderFlow; responsive two-stream layout makes the memory contract explicit |
| attention | Original responsive flow based on the paper and pinned Harvard implementation; labeled 3 × 3 visibility grid and locally calculated softmax row, not measured weights |
| assembly | Original responsive SVG/HTML synthesis of pinned Harvard code: explicit unchanged-input bypass, Pre-LN branch, dropout, addition, independent repeated layers, final stack norms |
| training | Original responsive synthesis of Harvard Batch and decoding loops: shifted labels independently enter loss, selected tokens feed back into the prefix; EOS stopping is a teaching addition |
| evolution | Original row-aligned comparison of five architecture axes; separates execution choices from mathematical architecture, with no ranking or inevitable timeline |
| heads | Original synthesis of paper section 3.2.2 and Harvard projections: separate query and KV states, Tq/Tk lengths, parallel heads, concatenation and output projection |
| position | Exact analytical toy encoding at D = 8, showing three of four sine/cosine pairs (ω = 1, 0.1, 0.01), p = 0…63; fourth pair at 0.001 omitted, not a checkpoint measurement |

Descriptions, tensor contracts, captions, equations, and reasoning remain in
ordinary page content so essential meaning survives component removal in
text exports. Mechanism diagrams are static, theme-aware and container-responsive,
without forced horizontal scrolling on mobile. They use code-native SVG/HTML,
not AI generated raster diagrams. The introductory AI illustration is recorded
separately below.

## All-figure audit, October 4, 2026

Reviewed every figure in desktop and mobile layouts, with an additional narrow
320 px check, both color themes, focus and print views, reduced-motion preference
and JavaScript disabled. Retained Figures 1–4 and 6 because their visual purpose,
mechanism and provenance remain appropriate. Rebuilt Figures 5, 7–10 to address
specific weaknesses rather than add decorative material.

- Figure 5 no longer implies that cross-attention must have equal query and KV
  lengths. Learned projections are separate; outputs are concatenated, not averaged.
- Figure 7 draws the unchanged residual bypass explicitly. Pre-LN behavior and
  final stack norms come from the code, not the paper's Post-LN figure.
- Figure 8 replaces chosen teaching frequencies with the paper's exact rule in
  a toy D = 8 configuration. Sine and cosine have labeled axes and solid/dashed
  traces. Calculations and the omitted channel pair are stated explicitly.
- Figure 9 separates label supervision from token choice and draws the actual
  autoregressive feedback path. Source memory is fixed and omitted in this
  execution view, not removed from the encoder/decoder model.
- Figure 10 aligns architectural choices by axis rather than suggesting one
  universal sequence of replacements. Kernel execution is a separate axis.

Reinspected the original paper v7 (sections 3.1–3.5 and figure permission), pinned
Harvard implementation (SublayerConnection, encoder/decoder stacks,
MultiHeadedAttention, Batch, run_epoch and greedy_decode), GQA v3 section 2.2
and Figure 2, and ACL reuse policy. Rechecked T5 v4 abstract, Pix2Seq v2 abstract,
FlashAttention v2 abstract and Transformers main cache documentation for the
retained formulation and execution comparisons. Existing model-specific source
records remain dated to their original inspection, not this audit.

Published figure checksums are unchanged. Captions remain numbered 1–10 with
stable anchors and adjacent citations. Descriptive text survives component
removal in Markdown, MDX and llms-full exports. The shared image presentation
now exposes a small full-size link hint without modifying image pixels.

Automated browser checks cover SVG label bounds, operation-box bounds, page
overflow, both themes at 1440/390/320 px, focus and print, image loading and
keyboard focus, citations and return links, all 15 equation anchors, shifted
labels, feedback paths, analytical curve endpoints and source-image hashes.
Full site validation passes. Existing Vite head-inject and Pagefind redirect
warnings are unchanged. Unrelated working-tree changes were preserved; no
commit, push or deployment was performed.

## Additional selected evidence inspected

The architecture collection README records the existing inspected paper
versions. This revision also inspected:

- Xiong et al., On Layer Normalization in the Transformer Architecture,
  ICML 2020, official proceedings abstract: https://proceedings.mlr.press/v119/xiong20b.html
- Zhang and Sennrich, RMSNorm, NeurIPS 2019, v1 abstract:
  https://arxiv.org/abs/1910.07467
- Hu et al., LoRA, v2 (October 16, 2021), abstract:
  https://arxiv.org/abs/2106.09685
- Holtzman et al., Neural Text Degeneration, v2 (February 14, 2020), abstract:
  https://arxiv.org/abs/1904.09751
- Mistral 7B, v1, section 2:
  https://arxiv.org/html/2310.06825v1
- DeepSeek-V2, v5, section 2.1:
  https://arxiv.org/html/2405.04434v5
- PyTorch 2.14, AMP gradient accumulation:
  https://docs.pytorch.org/docs/2.14/notes/amp_examples.html#gradient-accumulation
- TRL SFT Trainer, assistant/completion masking sections, moving documentation
  checked October 3, 2026: https://huggingface.co/docs/trl/sft_trainer

No frontier ranking, new benchmark result, or completed training experiment is
claimed. Implementation checks at the end are proposed learning exercises.

## Citation review, October 3, 2026

The public page now uses native Markdown footnotes with reused semantic identifiers. Paper, documentation, code, and license entries include metadata and relevant locators. Internal workspace names remain only in source records, not public page text. A local HAST plugin makes the native reference heading visible as References while preserving citation anchors and return links.

Additional inspected documentation: PyTorch 2.14 CrossEntropyLoss and scaled_dot_product_attention; Hugging Face Transformers main GenerationConfig and cache strategies, including the encoder/decoder cache section. These support implementation claims not established by the original Transformer paper.

## Introduction revision, October 4, 2026

The introduction now states the learning purpose before introducing context,
parallel training, and scaling. Component names are deferred to the technical
sections. The code assumptions and license attribution now sit in an expandable
note before the first example; the complete license notice remains unchanged.

Reinspected Vaswani et al., arXiv v7, sections 1, 3, and 4 for contextual
representations, parallelism, information paths, sequence costs, and autoregressive
generation. Inspected Kaplan et al., Scaling Laws for Neural Language Models,
arXiv v1, January 23, 2020, abstract on October 4, 2026:
https://arxiv.org/abs/2001.08361v1

The new scaling citation supports empirical prediction loss trends, not a claim
of universal downstream improvement. No new figure or downloaded paper is added.
The earlier figure rights review remains dated October 3, 2026.

### Sequence formulation and a shorter opening

The revised opening now introduces sequence to sequence before contextual
representations and training parallelism. The examples are supported by two
additional inspected sources on October 4, 2026:

- Raffel et al., Exploring the Limits of Transfer Learning with a Unified
  Text-to-Text Transformer, JMLR 2020, arXiv v4. Inspected the abstract for the
  shared formulation and covered language tasks:
  https://arxiv.org/abs/1910.10683v4
- Chen et al., Pix2seq: A Language Modeling Framework for Object Detection,
  ICLR 2022, arXiv v2. Inspected the abstract and sections 2.1–2.2 for object
  serialization and image conditioned generation:
  https://arxiv.org/html/2109.10852v2

The text deliberately says many tasks rather than every AI problem. It uses
object detection as a concrete example, not evidence of universal applicability.
No claim is made that all Transformer architectures use an encoder and decoder.
No new visual or paper archive is added for these ordinary citations.

### Sequence formulation visual

Added 'src/components/architectures/SequenceFormulation.astro', an original
responsive HTML and SVG synthesis of the already inspected Transformer, T5,
and Pix2Seq sources. Four illustrative lanes cover translation, summarization,
classification, and object detection. A simple house image and patch grid are
drawn locally, not copied from a paper or produced by a model.

Words and output meanings are grouped for readability, not presented as exact
tokenization. The rows represent an architectural modeling pattern, not a
claim that one checkpoint performs all tasks. Input and output lengths differ,
and classification illustrates a one element output. The caption retains these
limits and all four examples for Markdown readers. No new third party assets
or usage rights are required.

### Generated image comparison, October 4, 2026

The page now offers a generated infographic alongside the unchanged responsive
diagram using the existing tab component. The image is explicitly disclosed as
AI generated; the shared caption retains the source citations and limits of
the examples. This adds a raster illustration after the initial code-native
revision described above. The exact prompt, asset hash, review, and comparison
are recorded in [sequence-formulation-image.md](./sequence-formulation-image.md).

After the author's selection on the same day, the page shows only the generated
image. The comparison tabs and responsive component import were removed; the
caption, source citations, full resolution link, and text equivalent remain.

### Page figure numbering, October 4, 2026

The ten instructional visuals now have numbered captions in reading order,
Figure 1 through Figure 10, and stable figure anchors. Caption numbers remain
authored Markdown so they survive text exports. Numbers assigned by this page
are distinct from the reproduced papers' original figure numbers. The content
standards record the same convention for future pages. The assets are unchanged.

### Figure 3 refinement, October 4, 2026

Replaced the compact two-column card flow with the dedicated component
`src/components/architectures/EncoderDecoderFlow.astro`, using the related
Eclipse architecture and data flow diagram as a presentation reference.
The desktop view has two horizontal paths and an explicit memory connection;
the narrow view turns both paths vertically without requiring horizontal scrolling.
Both layouts share the same node definitions, tensor shapes, and module labels.
The former flow variant was removed from `FoundationDiagram.astro`.

The dashed connection now starts at the Memory Z node and enters the decoder,
rather than branching directly from the encoder block as in the reference.
The generator is shown separately from the decoder states and vocabulary scores.
Its linear projection and log-softmax follow the pinned Harvard code, not a
claim that all implementations return log probabilities. Masks and normalization
are deliberately omitted from this top level view; the page explains them later.

Reinspected Vaswani et al., arXiv v7, sections 3.1 and 3.2.3, and the official
Harvard source at commit `debc9fd747bb2123160a98046ad1c2d4da44a567`: EncoderDecoder,
Generator, DecoderLayer, and make_model. The published tutorial HTML was too
large for the web reader, so the pinned official repository source was inspected:
https://raw.githubusercontent.com/harvardnlp/annotated-transformer/debc9fd747bb2123160a98046ad1c2d4da44a567/the_annotated_transformer.py

This is a redrawn explanatory vector diagram, not a paper figure reproduction.
No third party artwork or new dependency was added. Figure numbering, the
stable `figure-3` anchor, and source citations remain unchanged.

### Equation typesetting, October 4, 2026

Replaced the page's quoted Unicode formulas with LaTeX typesetting: 15 display
equations and 50 inline expressions. Mathematical meaning and adjacent citations
are retained. Multirow formulas use aligned notation. The supervised loss now
names the preceding response tokens explicitly as `y_{\lt t}` rather than
`prefix_t`; this is a notation change, not a different objective.

KaTeX 0.19.0 renders HTML and accessible MathML at build time, with local CSS
and fonts and no browser math renderer. Its installed MIT license is retained.
The explicit Astro Sätteri processor remains at its existing version 0.4.2;
Nimbus remains pinned at 0.15.2. The table and reference plugins and Nimbus
admonitions remain enabled. No dependency source files were changed.

A full build exposed a source-scanning constraint: Nimbus's separate MDX parser
does not enable math, even when the rendering processor does. Bare LaTeX braces
were therefore read as JavaScript before rendering. The shared MathExpression
component supplies a static, safely quoted tex attribute for MDX. Its configured
Markdown transform exports inline dollar notation and display dollar blocks;
MDX exports retain the original component and TeX. Standard Markdown pages can
use dollar delimiters directly through the native math parser and render plugin.

Inspected implementation references:

- Installed `@cloudflare/nimbus-docs` 0.15.2 source normalization, default
  processor, admonition configuration, and generated Markdown transform.
- Installed `@astrojs/markdown-satteri` 0.4.2 processor options and native math
  nodes from Sätteri 0.10.5.
- [KaTeX rendering options](https://katex.org/docs/options), checked October 4,
  2026: HTML plus MathML, display mode, strict errors, untrusted commands,
  bounded expansion, and expression-local macros.

Renderer tests cover Markdown, math-aware MDX rendering, math-unaware source
scanning, malformed TeX, literal code and currency, citations, blocked links,
macro isolation, and export conventions. Full validation passed: 48 deployment
tests and 23 content tests, zero Astro diagnostics, content lint, and static
build. Visual checks covered light and dark themes, desktop, 390 and 320 pixel
widths, focus view, print display, keyboard scrolling, local fonts, and no-JS
rendering. All 65 expressions and all ten figure captions remain in the exports.
Existing Vite directive and Pagefind redirect warnings remain unchanged.

### Equation alignment and numbering, October 4, 2026

Centered the 15 display equations and numbered them (1) through (15) in reading
order. Related aligned rows share one number. Inline math remains unnumbered.
Explicit static number attributes become standard TeX tags in Markdown exports;
MDX retains the attributes. Both rendering paths create matching equation-N
anchors and accessible labels. The content standards now define this convention.

The layout reserves equal gutters to keep formulas centered and places the tag
in the right gutter. Long formulas and their tags scroll together without
widening the page. Browser checks measured centering and tag separation for all
15 equations at 1440, 390, and 320 pixel widths in both themes, and checked
keyboard scrolling, focus view, no-JS rendering, MathML, and complete exports.
All 65 expressions and ten figure captions are retained. Regression coverage
now includes sequential numbering, anchors, export tags, and invalid numbering.
Full validation passes with 48 deployment tests and 25 content tests, zero Astro
diagnostics, clean content lint, and a successful static build. Existing build
warnings remain unchanged.

### Original attention formula, October 4, 2026

Restored Equation (1) to the original scaled dot product attention expression,
without the additive mask term. Reinspected arXiv v7, section 3.2.1, Equation
(1), and section 3.2.3, which explains setting forbidden softmax inputs to
negative infinity separately. The adjacent page text follows that distinction;
masking code and the causal visibility figure remain intact. Numbering and
anchors are unchanged. The first equation is covered by an exact notation check.

### Figure 4 refinement, October 4, 2026

Replaced the attention variant with the dedicated `AttentionFlow.astro` component.
The flow explicitly separates Q and K score calculation from the V content
input, marks masking as conditional, and orders compare, mask, normalize, and
mix. Desktop uses a horizontal path; the narrow layout follows numbered stages
across two rows without shrinking the labels to fit a long horizontal strip.

A labeled 3 by 3 causal grid replaces the former 6 by 6 grid. Check marks and
crosses indicate visibility, never attention weights. Query 2 is highlighted
and linked to the existing local example: scaled scores [2, 1, 4], masked scores
[2, 1, -infinity], and weights approximately [0.731, 0.269, 0]. The value mixture
and a complete textual explanation remain in page source and agent exports.
The later mask discussion references this example rather than repeating it.

Reinspected Vaswani et al., arXiv v7, sections 3.2.1 and 3.2.3. Existing pinned
Harvard attention code supplies implementation provenance. This is an original
code-native diagram, not a reproduced figure. No new artwork, dependency,
equation number, or private material was introduced. Figure 4 and its anchor
remain unchanged.

The completed revision passed full validation: 48 deployment tests and 25
content tests, zero Astro diagnostics, clean content lint, and a static build.
Browser checks covered 1440, 390, and 320 pixel widths in both themes, measured
label bounds, verified causal cell states and rounded softmax values, and checked
focus view, print layout, no-JS output, unique anchors, and complete exports.
Existing Vite directive and Pagefind redirect warnings remain unchanged.
