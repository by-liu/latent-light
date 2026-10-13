# Runtimes & Compilers

## Inquiry

How does a trained model become a device program, and what versioned contract determines correctness, acceleration and cost?

## Intended reader and use

Readers learning edge AI and engineers planning on-device applications.
Learning or decision goal: Understand the mechanism, its assumptions and what to measure before selecting an implementation.

## Scope and time boundary

Public primary papers, official documentation and reference implementation documentation inspected during the October 12, 2026 Vancouver session. Source access dates use the actual UTC date, October 13, 2026; the page revision and evidence cutoff use the local session date.
Evidence boundary: Mechanisms and documented software behavior; no local device execution, model downloads, measured speedups or leaderboard ranking.

## Exclusions

No universal runtime ranking, installation tutorial or broad claims about untested devices. Model compression theory and full benchmarking protocol belong to siblings. No restricted data, employer information, model weights, paid access, upstream code execution or external writes. No commits, pushes or deployment.

## Deliverables

- Repository page under src/content/docs/edge-ai/ is the single canonical narrative.
- Schema 3 source, claim, run and visual records support it.
- A separate evidence and skeptical review preserves assumptions and unresolved hardware-specific behavior.

## Output contract

- Kind: site-page
- Canonical path: src/content/docs/edge-ai/runtimes-compilers.mdx
- Reading depth: A substantial focused tutorial with intuition, mechanisms, worked examples and implementation implications.
- Structure: Program versus execution, export/IR/lowering, shapes/lifetimes, fusion/kernels, partition/transfer cost, runtime boundary comparison, precision/state contract, diagnostic sequence.
- Citation style: Native claim-local Markdown footnotes, generated References only.
- Evidence cutoff: 2026-10-12 local session date, with exact inspected editions and mutable-document limitations recorded.
- Refresh expectation: Recheck software and benchmark-specific claims before using them for a deployment; recheck mechanisms if materially revised.
- Distribution and privacy boundary: Public-safe page and repository records; no full third-party PDFs or paper figures redistributed.

## Visual contract

Revision2 retires the generic native pipeline because the official unchanged ExecuTorch original supplies that boundary more precisely. SourceFigure Figure1 uses the exact immutable asset with retained BSD notice; Figure2 is an original SVG of hypothetical processor-boundary costs. Keep minWidth,panning and complete accessible/prose equivalents. Original/asset SHA256,immutable revision,license and third-party review are recorded. Equations remain sequential. Do not translate the diagram into a universal deployment or performance claim.

Previous revision1 QA is preserved. Revision2 must pass new actual desktop/mobile,theme,Focus,panning and export checks before completion.

## Research map

- Evidence dimensions and resolving sources: Compiler/export concepts and memory planning: ExecuTorch 1.5. Transform/fusion/provider assignment/IO: ONNX Runtime official guides. Shape/state execution: Core ML Tools. Runtime/orchestration boundary: LiteRT and LiteRT-LM. Supported backend and artifacts: llama.cpp. Vendor constraints: QNN provider.
- Skeptical direction: Challenge the idea that conversion success proves correctness, an NPU logo implies complete graph coverage, supported-node fraction implies a speedup, dynamic inputs are free or cross-platform packaging has identical maturity.

## Budget and checkpoints

Bounded primary-source mechanism pass, official software/measurement pass, separate skeptical verification, canonical page draft, research structural check, then parent-coordinated site validation, rendering and exports. Stop broad collection when each scoped dimension has inspected evidence and the remaining questions require hardware measurement.

## Success criteria

The opening motivates the topic; technical vocabulary follows intuition; consequential claims and table rows have inspected support; examples disclose assumptions and units; no universal performance claims; figures/equations are sequential; internal links connect existing material. Completion additionally requires actual site validation, desktop/mobile and theme rendering, Focus review, citation navigation and complete Markdown/MDX exports. Pending delivery checks remain explicit.

## User-supplied facts

The parent task authorizes the full Edge AI collection under AI Technology and parallel agents. This branch owns only the three assigned execution/evaluation pages, their research workspaces and any needed per-page assets. The parent owns shared navigation and coordinates site checks.

## Assumptions and decisions

Use existing repository components and static JSON attributes. All numerical examples are teaching calculations, not experiments. No independent report.md narrative. Preserve unrelated work. Preparation used the supplied schema 3 initializer; delivery status remains working until the parent completes required checks.
