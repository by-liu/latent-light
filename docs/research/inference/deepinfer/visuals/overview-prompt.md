# DeepInfer overview infographic

Created October 20, 2026 with the built-in `image_gen` tool.
Use: Figure 1 of `src/content/docs/inference/deepinfer.mdx`.
Final asset: `public/figures/inference/deepinfer/overview.png`.
1536 × 1024 RGB PNG; copied unchanged from the selected generated output.
SHA-256: d8b6092fe562472a0b8a15ae7e002eb00bc673aae3f558b296cbd89288132c34.

## Intent and evidence

The user explicitly requested an at-a-glance overview alongside a TL;DR.
This independent teaching synthesis connects the protocol path, four
execution ideas and the released-versus-surrounding-service boundary.
It is not a screenshot of a supplied API server, a reproduced source
architecture, a measured timeline, or a benchmark chart.

No third-party image or logo was used as a reference. Inputs were inspected
public documentation and code already recorded in this research workspace:
S001 release, S002 Recipe, S003 deployment, S006 expert placement, S007 replay,
S009/S029 verification and S010 worker overlap. Hardware names indicate
declared support, not equivalent measured performance.

The page retains the substantive map in alt text and a visible text disclosure.
Caption and text cite the original factual inputs. New facts and a new
performance measurement were not introduced by the image.

## Initial generation prompt

```text
Use case: infographic-diagram
Asset type: opening overview figure for a public, source-grounded technical article.
Primary request: Create an exceptional, publication-quality infographic that gives AI researchers and engineers the complete DeepInfer release story at a glance. This is an independent explanatory synthesis, NOT a reproduced DeepSeek diagram or a performance measurement.
Canvas: high-resolution landscape, approximately 3:2. Light warm-white background. Crisp editorial typography, dark navy text, disciplined blue, teal and violet accents, clean technical line art, generous margins, balanced spacing. A sophisticated systems illustration, not a generic marketing poster. No corporate logos, mascots, stock art, watermark, fake chart or invented performance number.
Composition: clearly ordered top-to-bottom with a left-to-right request flow, four intuitive mechanism illustrations in one central row, and an explicit release boundary at the bottom. Every line of text below must be rendered accurately and legibly. Large main labels; no tiny paragraphs. Use conceptual token rows, memory layers, expert tiles and overlapping timeline bars rather than a wall of text-filled rectangles.

Exact copy:
Title: "DeepInfer at a glance"
Subtitle: "Model-aware execution, from messages to tokens"
Small scope line: "DeepSeek-V4.1-Flash  |  SM100 · Ascend 950"

Top section label: "A conceptual request path"
A single unambiguous sequence of five connected steps:
"API request" → "Recipe · encode" → "DeepInfer · execute" → "Recipe · stream" → "API response"
The two Recipe steps are the same companion library in different roles, NOT independent inference models. DeepInfer is the central inference engine. Make it visually the core.

Middle section label: "Four ways to remove waste"
Four equally important illustrated panels:
1. "Reuse state"
   "Keep global history"
   "Replay a short local tail"
   Show retained long history and a highlighted short suffix, never imply all old history is discarded.
2. "Balance expert work"
   "Wide decode groups"
   "Replicate busy experts"
   Show tokens distributed to expert tiles, a duplicated hot expert, no additional model calls.
3. "Verify selectively"
   "Confidence-guided budgets"
   Show draft-token prefixes with a variable verification boundary, not a guarantee of correctness.
4. "Overlap execution"
   "CPU work beside GPU work"
   Show two overlapping timeline lanes, not zero CPU work or removal of all dependencies.
Under the four panels, a slim unifying foundation:
"Optimized attention · GEMM · expert communication · low precision"

Bottom section: two clearly distinct scope areas.
Solid-outline colored area:
"Released"
"Offline engine + protocol libraries"
Dashed gray area:
"Still to integrate"
"Routing · persistent KV storage · service orchestration"
Under these, a concise final note:
"An inference core, not a turnkey serving platform."

Constraints: preserve all distinctions exactly. Recipe provides no model inference. The released engine is offline. The broader production service is not bundled. This is a conceptual integration, not an assertion that wiring is supplied. No benchmark bars, speedup numbers, profit claims, equations or extra text. All shapes and labels must be completely within the canvas and never overlap. Make the visual genuinely elegant, readable and useful in one glance.
```

## Review and targeted edit

The first draft was rejected for publication because its gray suffix label
said “Verified tokens”. That contradicted the intended selected-prefix
verification budget. The other overview relationships and scope labels were
useful. The same generated draft, not source artwork, was supplied as the edit
target. Only the chosen corrected image is copied into the repository.

```text
Edit target: the supplied DeepInfer overview infographic.
Change ONLY the two small labels under the blue and gray token groups in the third panel, titled "Verify selectively".
The BLUE token group to the LEFT of the dashed verification boundary must be labelled exactly:
"Selected for verification"
This can wrap onto two short lines.
The GRAY token group to the RIGHT of the dashed boundary must be labelled exactly:
"Skipped draft suffix"
This can wrap onto two short lines.
The current labels "Draft tokens (prefix)" and "Verified tokens (variable length)" must be completely removed and replaced. The distinction is a selected draft prefix versus a suffix not verified in that step, NOT that the gray tokens have been verified.
Keep everything else invariant: layout, canvas, colors, all other text, token counts, brackets, boundary, arrows, icons, typography, dimensions and margins. No new text or other changes. Maintain readable spacing without overlapping the labels.
```

The selected output now labels the blue prefix “Selected for verification”
and the gray suffix “Skipped draft suffix”. Neither is labelled “accepted”.
The expert panel represents physical hot-expert replicas, not newly learned
experts. CPU/GPU bars are illustrative, not a measured schedule. The retained
global history and local replay are not a claim of exact historical recovery.
The API flow is labelled conceptual and the missing service boundary remains
explicit.

The generated artwork is original project material, offered under the
repository MIT terms to the extent applicable. It does not transfer rights in
DeepSeek's separate original figures. Exact prompt and output are retained;
no source SVG is claimed for a raster generation.

Browser readability, keyboard access, mobile panning, print and full exports
are checked with the revision's delivery review.
