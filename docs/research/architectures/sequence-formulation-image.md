# Sequence formulation infographic

Created October 4, 2026 for the Transformer Foundations introduction.

## Artifact and provenance

- Final asset: `public/figures/transformer-foundations/sequence-formulation-generated-v1.png`.
- Format: PNG, RGB, 1536 × 1024 pixels; no transparency.
- SHA-256: `19a687b8c8c6ef6f54408450d0ff53c8b331ff0de01c69bff5a55045487901a7`.
- Method: one generation with the built-in image-generation tool.
- No source image, paper figure, or third party artwork was supplied.
- The final file is an unchanged copy of the generated output.
- The public caption identifies the artwork as AI generated.
- The initial review offered the responsive HTML/SVG diagram in a second tab.
- After the author's selection, the page shows only the generated image.
- This record is repository documentation, not a published site page.

## Technical grounding

The examples synthesize sources inspected for the introduction:

- Vaswani et al., Attention Is All You Need, arXiv v7, sections 1 and 3:
  https://arxiv.org/html/1706.03762v7
- Raffel et al., Exploring the Limits of Transfer Learning with a Unified
  Text-to-Text Transformer, JMLR 2020, arXiv v4, abstract:
  https://arxiv.org/abs/1910.10683v4
- Chen et al., Pix2seq: A Language Modeling Framework for Object Detection,
  ICLR 2022, arXiv v2, abstract and sections 2.1–2.2:
  https://arxiv.org/html/2109.10852v2

These are teaching examples, not reproduced experimental outputs.
The paper citations remain next to the shared visual caption on the page.

## Review and comparison

All four labels and input/output examples were visually checked against the
prompt. The image preserves separate Transformer blocks, different sequence
lengths, and a classification label as a one element output. Words and meanings
are grouped for readability, not represented as exact tokenizer output. The
house illustration is not an object detection model prediction. Numerical
coordinates and confidence scores are intentionally absent.

The image works as a self-contained, shareable editorial illustration.
The existing native diagram better supports narrow screens, selectable text,
and automatic theme changes. The image retains a light canvas in dark mode;
it is not inverted or recolored. A full resolution link supports readers who
need to inspect the labels. The Markdown image description preserves the four
examples and qualifications for readers using the text export.

There is no claim that every AI task is sequence prediction or that one trained
checkpoint performs all four tasks. Neither visual specifies a detailed
encoder/decoder architecture.

## Selection, October 4, 2026

The author preferred the generated image. Removed the comparison tabs and the
responsive diagram from the page, retaining the generated asset, full resolution
link, accessible description, text equivalent, and source citations. The original
component remains in the repository but is no longer imported by this page.

The caption was subsequently shortened to one compact description, AI disclosure,
source citations, and enlargement instruction. The project branded synthesis
label and repeated example paragraph were removed. The examples and limits remain
in the image description and artwork; the full generation provenance remains here.

## Exact generation prompt

```text
Use case: scientific-educational.
Asset type: high resolution editorial infographic for the Transformer Foundations page of Latent Light, also suitable for sharing as a standalone image.
Primary request: make the sequence-to-sequence formulation intuitive, memorable, and beautiful without displaying the internal mechanisms of attention or FFNs.

Composition: landscape approximately 3:2, generous white margins, four perfectly aligned horizontal lanes. Every lane reads left to right: input representation, thin arrow, a separate Transformer block, thin arrow, output representation. Four separate Transformer blocks illustrate a common modeling pattern, NOT one shared trained checkpoint. No crossing arrows.
Style: precise professional science editorial art, clean typography, flat vector-like clarity with subtle dimensionality in stacked representation tiles; airy ivory-white background, dark ink text, restrained blue input accents and violet output accents. Very light softly shaded model blocks. Small purposeful illustrations only. Not a dashboard, not a flowchart screenshot. Large readable text, meticulous spacing, visual hierarchy. No neon, heavy glows, glossy robots, circuitry, or decorative clutter.

Exact heading: "Sequence to sequence"
Exact subtitle: "Different tasks. A shared modeling pattern."
Column labels: "Input sequence", "Transformer", "Output sequence"

Lane 1 label: "Translation".
Input: two blue word tiles "Good" and "morning".
Middle: a simple block labeled "Transformer" with three subtle stacked strips, not a literal detailed architecture.
Output: one violet tile "Bonjour".

Lane 2 label: "Summarization".
Input: five blue word tiles "Heavy", "snow", "delayed", "the", "train", in that order.
Middle: same modeling-pattern block labeled "Transformer".
Output: three violet tiles "Snow", "delays", "train", in that order.

Lane 3 label: "Classification".
Input: four blue word tiles "The", "movie", "was", "wonderful", in that order.
Middle: modeling-pattern block labeled "Transformer".
Output: a single violet tile "positive".

Lane 4 label: "Object detection".
Input: a simple original illustration of one house, with a subtle image patch grid and a few blue representation tiles; exact label "Image features".
Middle: modeling-pattern block labeled "Transformer".
Output: two violet grouped blocks "house" and "box coordinates". Do not invent numerical coordinates or confidence scores.

Exact footer text, legible and quietly secondary:
"Input and output lengths can differ."
"Illustrative blocks, not exact tokenization."
"Shared formulation, not necessarily one trained model."

Constraints: all exact text must be spelled correctly with no invented labels or filler. Preserve all four input/output examples. Never claim every AI problem is sequence prediction. Do not label this an encoder-decoder diagram, do not introduce Q/K/V, attention, residuals, FFNs, layer counts, or mathematics. No logos, watermark, page chrome, buttons, or citations embedded in the artwork. The caption and primary-source citations will be supplied separately by the website.
```
