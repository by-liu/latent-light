# Efficient Inference

## Inquiry

How do execution phases, memory traffic, attention state, caching and decoding policy change the cost of a useful on-device response?

## Intended reader and use

Readers learning edge AI and engineers planning on-device applications.
Learning or decision goal: Understand the mechanism, its assumptions and what to measure before selecting an implementation.

## Scope and time boundary

Public primary papers, official documentation and reference implementation documentation inspected during the October 12, 2026 Vancouver session. Source access dates use the actual UTC date, October 13, 2026; the page revision and evidence cutoff use the local session date.
Evidence boundary: Mechanisms and documented software behavior; no local device execution, model downloads, measured speedups or leaderboard ranking.

## Exclusions

Model-training recipes, runtime feature catalog and full evaluation protocol belong to sibling pages. No restricted data, employer information, model weights, paid access, upstream code execution or external writes. No commits, pushes or deployment.

## Deliverables

- Repository page under src/content/docs/edge-ai/ is the single canonical narrative.
- Schema 3 source, claim, run and visual records support it.
- A separate evidence and skeptical review preserves assumptions and unresolved hardware-specific behavior.

## Output contract

- Kind: site-page
- Canonical path: src/content/docs/edge-ai/efficient-inference.mdx
- Reading depth: A substantial focused tutorial with intuition, mechanisms, worked examples and implementation implications.
- Structure: Response path, compute/traffic limits, KV payload, attention IO, prefix reuse/chunking, speculation, adaptive budgets, symptom-to-intervention guide.
- Citation style: Native claim-local Markdown footnotes, generated References only.
- Evidence cutoff: 2026-10-12 local session date, with exact inspected editions and mutable-document limitations recorded.
- Refresh expectation: Recheck software and benchmark-specific claims before using them for a deployment; recheck mechanisms if materially revised.
- Distribution and privacy boundary: Public-safe page and repository records; no full third-party PDFs or paper figures redistributed.

## Visual contract

Revision2 retains the native request-phase ModelFlow as Figure1 and adds two exact source excerpts: FlashAttention memory hierarchy/tiling as Figure2 and the first three speculative-decoding iterations as Figure3. Use SourceFigure with high-resolution local crops, explicit minWidth and full accessible/prose text equivalents. Each original has exact edition/page/figure,original and asset SHA256,crop method,rights and third-party review in SOURCES.md/NOTICE.md plus asset-provenance.json. The FlashAttention criticism/review basis is limited and is not a license; the PMLR excerpt is CC BY4.0. Numbered equations remain sequential from1.

Previous revision1 QA is preserved. Revision2 must pass new actual desktop/mobile,theme,Focus,panning and export checks before completion.

## Research map

- Evidence dimensions and resolving sources: Prefill/decode shapes and scheduling: SARATHI. KV layout: GQA and Transformers cache guide. Attention IO: FlashAttention. Exact speculative sampling and cost assumptions: Leviathan et al. Adaptive thinking budgets: s1 plus a separate critical analysis.
- Skeptical direction: Challenge server-to-phone transfer, fewer target calls versus actual wall time, chunking overheads, short-context cache quantization penalties and the claim that more thinking reliably improves quality.

## Budget and checkpoints

Bounded primary-source mechanism pass, official software/measurement pass, separate skeptical verification, canonical page draft, research structural check, then parent-coordinated site validation, rendering and exports. Stop broad collection when each scoped dimension has inspected evidence and the remaining questions require hardware measurement.

## Success criteria

The opening motivates the topic; technical vocabulary follows intuition; consequential claims and table rows have inspected support; examples disclose assumptions and units; no universal performance claims; figures/equations are sequential; internal links connect existing material. Completion additionally requires actual site validation, desktop/mobile and theme rendering, Focus review, citation navigation and complete Markdown/MDX exports. Pending delivery checks remain explicit.

## User-supplied facts

The parent task authorizes the full Edge AI collection under AI Technology and parallel agents. This branch owns only the three assigned execution/evaluation pages, their research workspaces and any needed per-page assets. The parent owns shared navigation and coordinates site checks.

## Assumptions and decisions

Use existing repository components and static JSON attributes. All numerical examples are teaching calculations, not experiments. No independent report.md narrative. Preserve unrelated work. Preparation used the supplied schema 3 initializer; delivery status remains working until the parent completes required checks.
