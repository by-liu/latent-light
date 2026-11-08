# Hardware 101 diagram refinement

Date: November 7, 2026. Presentation refinement of Figures 2–8. Figure 1 and its
animation assets, markup and component are excluded.

Design guidance: cathrynlavery/diagram-design, installed from commit
`e57eda6102a19444538ebd611d39534fad65b663` (MIT). The user approved matching
Latent Light's existing fonts and light/dark palette. The effective design
source is this repository's `src/styles/globals.css`, not the skill's default
skin; the global installation is unchanged.

## Design contract

- Inherit self-hosted Inter Variable at 400–600, with tabular figures for numbers.
  No additional font download is added to the website. The optional standalone
  HTML proof uses the approved Google Fonts Inter stylesheet, with system fallback.
- Use the existing background, foreground, muted text and border theme tokens.
  Existing amber (`#92621b` light / `#e2b778` dark) marks the focal category.
  Supporting blocks and connections use neutral strokes; categorical waveform
  and system-lane colors retain their established meaning.
- Use 8px outer frames, 4–8px node corners, aligned labels and orthogonal wiring.
  Preserve conventional circuit notation and the mathematical waveform geometry.
- Use fit-size canvases: board 720 × 400, memory 720 × 352, timing 720 × 328;
  sampling 680 × 232 with explicit normalized-amplitude and seconds axes.
  Mobile detail stays inside a keyboard-scrollable region rather than widening
  the page. Print fits the complete diagram without requiring panning.
- Keep all labels, calculations, assumptions, citations and complete text exports.
  No animation or toolbar is added to these figures.

## Visual choices and fidelity

- Figure 2: three aligned process lanes, each with five steps. These are views
  of one design; lane order does not assert literal wiring or separate pipelines.
  Keep the five abstraction scales in their own strip.
- Figure 3: retain the ideal 3.3 V / 10 kΩ closed circuit and 0 V reference;
  refine stroke weight, spacing and the three numeric readouts.
- Figure 4: retain both synthetic cosines and all nine displayed sampling instants
  over 0–1 s, with distinct line styles and explicit axes. No measured data.
- Figure 5: architecture with nested board/SoC boundaries. Faithful detail keeps
  ten functional blocks, grouped by containment; this deliberately exceeds the
  default nine-node sketch budget to avoid losing a component or merging CPU,
  GPU, NPU, memory, interfaces or power. No new physical route is claimed.
- Figure 6: four-node memory/staging view. Loading and reuse arrows illustrate
  one common path. The shared explanation explicitly retains direct mapped-flash
  and shared/separate pool exceptions; no universal capacity or speed ratio.
  Full definitions remain below the visual and in the Markdown export.
- Figure 7: a quantitative schedule using Gantt-style alignment. Retain all
  twelve stage bars, fixed durations and dedicated-resource assumptions. Brackets
  distinguish 27 ms per-frame latency from 12 ms between finished results.
  Inference is the single highlighted stage category across repeated frames.
- Figure 8: preserve calculator behavior, all three modes, input validation and
  reset. Refine the frame, typography, selected-mode underline and numeric result.

This adapts the skill to the existing Astro components and scientific content.
The live page remains canonical. A self-contained static HTML proof in ignored
`output/hardware-diagram-refinement/` supports the skill's accessible-SVG and
single-file checks; the website retains interactive calculator functionality.
