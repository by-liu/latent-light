---
title: Architecture collection review
topic_id: architecture-collection-review
status: reviewed
revision: 1
updated: 2026-10-05
evidence_cutoff: 2026-10-05
audience: Maintainers and learners reviewing the architecture collection
canonical_format: markdown
---

# Architecture collection review

## Executive answer

The ten pages other than Foundations were refined as a connected learning
collection. The overview pages remain short; six technical pages now include
seven original mechanism diagrams and twelve centered, numbered equations.
Native footnotes place inspected primary sources beside technical claims.
Foundations and unrelated working tree changes were preserved.

This is a bounded source and presentation audit, not a frontier survey,
benchmark reproduction, or new training curriculum. No commit, push, deployment,
or external service mutation was performed.

## Visual overview

| Page group | Refinement | Visual choice |
| --- | --- | --- |
| Collection, evolution, model reading, research agenda | Clear reading paths, evidence boundaries, and testable questions | Retain compact tables; no decorative diagrams |
| Attention and memory | Separate kernel execution, KV sharing, and recurrent state | Three mechanism contracts |
| Position and long context | Derive rotary matching; separate capacity from usefulness | Explicit two vector toy rotation |
| FFNs and experts | Separate feature modulation from expert selection | SwiGLU branches and a distinct Switch routing path |
| Multimodal integration | Name the model and training stage of each interface | Three visual bridges with stage specific freeze labels |
| GPT-2 | Pin code and clarify residual, logit, and cache contracts | Top level decoder beside one residual block |
| Qwen3-VL | Separate report claims from a targeted implementation check | Main visual path and depth additions at visual positions |

The seven figures are original code visuals, not copied paper art. Captions,
citations, stable page local figure anchors, and ordinary text equivalents
accompany them. Source and claim links are recorded in `state/visuals.jsonl`.

<!-- visual-id: V001 -->
[Attention diagram review image](visuals/attention-memory.png)
<!-- visual-id: V002 -->
[Rotary position diagram review image](visuals/rotary-position.png)
<!-- visual-id: V003 -->
[SwiGLU diagram review image](visuals/swiglu.png)
<!-- visual-id: V004 -->
[Switch routing diagram review image](visuals/switch-routing.png)
<!-- visual-id: V005 -->
[Visual interfaces diagram review image](visuals/visual-interfaces.png)
<!-- visual-id: V006 -->
[GPT-2 diagram review image](visuals/gpt2.png)
<!-- visual-id: V007 -->
[DeepStack diagram review image](visuals/deepstack.png)

## Key findings

FlashAttention, GQA, and causal linear attention do not make the same change.
They affect execution scheduling, KV head representation, and the memory
operator respectively. Their comparison must preserve that distinction.
[FlashAttention](https://arxiv.org/html/2205.14135v2),
[GQA](https://arxiv.org/html/2305.13245v3),
[linear Transformer](https://arxiv.org/html/2006.16236v3).

Feature gating is not sparse routing. SwiGLU computes both feature branches;
Switch selects an expert and weights its output by its router probability.
The routing visual puts inactive experts outside the active path, including
on mobile. [GLU variants](https://arxiv.org/html/2002.05202v1),
[Switch Transformer](https://arxiv.org/html/2101.03961v3).

Visual interface claims need stage boundaries. BLIP-2's generative stage and
the original LLaVA instruction stage differ in which backbones are frozen.
The comparison does not silently transfer those labels to later variants.
[BLIP-2 sections 3.1 to 3.3](https://arxiv.org/html/2301.12597v3),
[LLaVA sections 4.1 and 4.2](https://arxiv.org/html/2304.08485v2).

## Detailed analysis

### Mechanisms and calculations

The attention page states the assumptions for a KV storage count and the
normalized recurrent kernel equations. The position page uses column vector
notation consistently: the relative rotation is `R((n − m)θ)`. Its 45 degree
example is explicitly illustrative, not measured attention.
[Linear Transformer section 3](https://arxiv.org/html/2006.16236v3),
[RoFormer section 3](https://arxiv.org/html/2104.09864v5).

FFN width matching is a bias omitted parameter calculation, not a universal
optimal width. Image patch count is separated from final language visual
token count, with divisibility and preprocessing assumptions.
[GLU variants section 2](https://arxiv.org/html/2002.05202v1),
[ViT section 3.1](https://arxiv.org/html/2010.11929v2).

### Model evidence boundaries

GPT-2 code is now pinned to `9b63575ef42771a015060c964af2c3da4cf7c8ab`.
The source constructs `present` before concatenating old KV tensors; the page
therefore explains that the caller manages cache accumulation. It distinguishes
the code's returned logits from token selection outside the model.
[Pinned model file](https://github.com/openai/gpt-2/blob/9b63575ef42771a015060c964af2c3da4cf7c8ab/src/model.py).

Qwen3-VL remains a report level study, with one targeted code check. In
Transformers v4.57.1, additions follow the selected decoder layers and use
a visual position mask. The figure does not invent checkpoint feature indices
or processor dimensions. The report's DeepStack ablation conditions are
identified rather than generalized to every released model.
[Pinned implementation](https://github.com/huggingface/transformers/blob/8cb5963cc22174954e7dca2c0a3320b7dc2f4edc/src/transformers/models/qwen3_vl/modeling_qwen3_vl.py),
[report sections 2 and 5.12.2](https://arxiv.org/html/2511.21631v1).

### Validation and visual review

Full site validation passed: 48 deployment checks, 25 content checks, 119 Astro
files with no diagnostics, clean configured content lint, and a successful
18 page build. No dependencies or navigation routes were changed.

Rendered checks covered all ten pages at 1440, 390, and 320 pixels in both
themes. Checks included figure and equation numbering, local anchors, citation
navigation, SVG label fit, page overflow, focus view, print, reduced motion,
and no JavaScript rendering. Markdown, source MDX, and the full agent export
retain headings, captions, equations or their source attributes, citations,
and ordinary mechanism explanations. The existing Foundations regression
also passed, including its ten figures, fifteen equations, source image
checksums, and exports.

Screenshots were inspected and refined, not only checked for bounding boxes.
Changes included shorter and larger GPT-2 labels, correct bypass placement,
separate active and inactive expert paths, aligned DeepStack path headings,
and arrows between updated decoder depths. The local dev server was refreshed
to resolve stale metadata; other servers were not changed.

## Counterevidence and uncertainty

No mechanism is presented as universally superior. A smaller cache does not
prove a proportional latency gain; a position formula does not establish
useful context reach; an interface does not guarantee visual grounding.
Task and serving comparisons remain proposals, not measurements performed here.

The Qwen3-VL report and official summary are author disclosures, not independent
replication. The code check verifies a specific implementation site, not every
checkpoint or processor. Neither model study reconstructs undisclosed training
details. The initial October 3 source record is preserved as historical context;
the new ledger records the broader method inspections and immutable code links.

## Implications

Readers can move from shared foundations to a design question and then to a
concrete model without mistaking a timeline for a hierarchy. Future changes
should improve a mechanism explanation or add useful evidence, not accumulate
release announcements. Public pages contain no private career or employer
material and no references to the earlier private workspace.

Existing build warnings remain: repeated Vite `astro:head-inject` notices and
the `/about/philosophy/` redirect without an outer HTML element for Pagefind.
Unrelated pre-existing edits and dependency concerns were left unchanged.

## Open questions and future research

A future checkpoint study can pin preprocessing, configuration, and full
forward code, then trace patch counts, position metadata, and feature injection
dimensions. Actual quality and serving comparisons would require a separately
scoped experiment. Those are future work, not missing deliverables for this
bounded refinement.

## Sources

The exact fifteen inspected sources, twenty two verified mechanism or
calculation claims, and their locators are in `state/sources.jsonl` and
`state/claims.jsonl`. Primary paper versions and code commits appear in the
page local footnotes. No source screenshots, paper figures, or code excerpts
were copied into the new pages.
