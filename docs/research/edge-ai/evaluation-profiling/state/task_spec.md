# Evaluation & Profiling

## Inquiry

How can edge AI workload measurements establish useful quality and cost while preserving reproducibility and the limits of benchmark evidence?

## Intended reader and use

Readers learning edge AI and engineers planning on-device applications.
Learning or decision goal: Understand the mechanism, its assumptions and what to measure before selecting an implementation.

## Scope and time boundary

Public primary papers, official documentation and reference implementation documentation inspected during the October 12, 2026 Vancouver session. Source access dates use the actual UTC date, October 13, 2026; the page revision and evidence cutoff use the local session date.
Evidence boundary: Mechanisms and documented software behavior; no local device execution, model downloads, measured speedups or leaderboard ranking.

## Exclusions

No hardware leaderboard, measured energy values, experiment execution or universal product thresholds. No private benchmark fixtures or proprietary profiling data. No restricted data, employer information, model weights, paid access, upstream code execution or external writes. No commits, pushes or deployment.

## Deliverables

- Repository page under src/content/docs/edge-ai/ is the single canonical narrative.
- Schema 3 source, claim, run and visual records support it.
- A separate evidence and skeptical review preserves assumptions and unresolved hardware-specific behavior.

## Output contract

- Kind: site-page
- Canonical path: src/content/docs/edge-ai/evaluation-profiling.mdx
- Reading depth: A substantial focused tutorial with intuition, mechanisms, worked examples and implementation implications.
- Structure: Task contract, timeline/TTFT/intertoken metrics, quality, memory, task energy, cold/warm/sustained conditions, fair comparisons, benchmark provenance, profile-and-remeasure loop.
- Citation style: Native claim-local Markdown footnotes, generated References only.
- Evidence cutoff: 2026-10-12 local session date, with exact inspected editions and mutable-document limitations recorded.
- Refresh expectation: Recheck software and benchmark-specific claims before using them for a deployment; recheck mechanisms if materially revised.
- Distribution and privacy boundary: Public-safe page and repository records; no full third-party PDFs or paper figures redistributed.

## Visual contract

Revision2 retains the workload/quality ModelFlow as Figure1,adds an original SVG timing-boundary example as Figure2,and uses the historical MLPerfMobile v4 Figure4 as local Figure3. Critically separate its functional SUT envelope from a timed region,with AppendixE scope evidence. SourceFigure assets have minWidth,panning and full equivalents. Original/asset SHA256,exact edition/page/figure,crop,third-party exclusions and bounded criticism/review basis are recorded; source artwork is excluded from MIT. No invented measured plots; equations remain sequential.

Previous revision1 QA is preserved. Revision2 must pass new actual desktop/mobile,theme,Focus,panning and export checks before completion.

## Research map

- Evidence dimensions and resolving sources: App versus code measurement: Android benchmark guides. Runtime phases and memory: LiteRT benchmark tooling. Trace capabilities: ExecuTorch profiling. Prompt/decode measurement boundary: llama-bench reference documentation. Thermal constraints: Android Thermal API. Standard scenarios and quality targets: MLPerf Mobile summary.
- Skeptical direction: Challenge token-rate substitution for product outcomes, warm/cool microbenchmark substitution for sustained sessions, short-tail estimates, incomplete memory accounting and benchmark-to-product transfer.

## Budget and checkpoints

Bounded primary-source mechanism pass, official software/measurement pass, separate skeptical verification, canonical page draft, research structural check, then parent-coordinated site validation, rendering and exports. Stop broad collection when each scoped dimension has inspected evidence and the remaining questions require hardware measurement.

## Success criteria

The opening motivates the topic; technical vocabulary follows intuition; consequential claims and table rows have inspected support; examples disclose assumptions and units; no universal performance claims; figures/equations are sequential; internal links connect existing material. Completion additionally requires actual site validation, desktop/mobile and theme rendering, Focus review, citation navigation and complete Markdown/MDX exports. Pending delivery checks remain explicit.

## User-supplied facts

The parent task authorizes the full Edge AI collection under AI Technology and parallel agents. This branch owns only the three assigned execution/evaluation pages, their research workspaces and any needed per-page assets. The parent owns shared navigation and coordinates site checks.

## Assumptions and decisions

Use existing repository components and static JSON attributes. All numerical examples are teaching calculations, not experiments. No independent report.md narrative. Preserve unrelated work. Preparation used the supplied schema 3 initializer; delivery status remains working until the parent completes required checks.
