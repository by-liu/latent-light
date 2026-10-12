# DeepSeek-V4.1-Flash study contract

## Primary question

How does causal encoder-decoder separation alter prefill, decoding and cache
reuse, and which claims can be established from the official report and release?

## Intended reader and use

Technical readers studying efficient multimodal LLM architecture. Connect
architecture to actual workload, storage and training boundaries.

## Scope and time boundary

DeepSeek-V4.1-Flash report and public artifact pinned to
2cba9e42aa026125f3ed06c6d98c1db82f7ca027. Evidence checked October 10, 2026.

## Exclusions

No weight downloads, model execution, runtime measurement, private material,
unlicensed source artwork, deployment recommendation or unconditional ranking.

## Deliverables

Canonical report.md, website MDX, source/claim/run/visual ledgers, and an original
numbered flow figure with a complete Markdown text equivalent.

## Report contract

Follow the Model Deep Dive guide. Short highlights and defined scale; primary
footnotes next to claims. Public-safe distribution; no automatic refresh or push.

## Visual contract

Separate prompt encoding from generated-token computation and cache reuse.
Show encoder remains causal; distinguish global KV from local SWA state. Add
another visual only if it explains a relationship not already clear.

## Research map

- Official report: CED, CSA2, cache precision, replay, vision and post-training.
- Public configuration, card, license: exact artifact and parameter boundaries.
- Targeted inference source: layer routing, shared state, encoder/decoder flow.
- Skeptical pass: global-cache exclusions, approximation in replay, workload
  dependence of savings, backbone/Engram totals, evaluated reasoning settings.

## Budget and checkpoints

One bounded primary-source pass, separate refutation/count review, then rendered
desktop/mobile/theme and export checks. Use raw text if web extraction fails.

## Success criteria

Correct causal data flow, 8B/16B accounting, CSA2 mode differences, 890 byte
cache scope, approximate replay boundary, training disclosure and conditional
evaluation. Validate research state and site without claiming unperformed tests.

## User-supplied facts

The user requests parallel important public-model studies using the site guide.

## Assumptions and decisions

Study the released multimodal instruct artifact and distinguish base evaluations.
DeepSeek-V4 remains a separate predecessor study, not an interchangeable recipe.

## Revision 3 coverage audit

User requests a thorough check of figures and important mechanisms for every study. Compare the pinned report (including relevant appendices), targeted code and current page. Record a coverage matrix and figure selection decisions in coverage-audit.md. Add useful licensed source figures or independent diagrams, not a quota. Preserve variant, training/inference, evaluation and licensing boundaries. No commit, push, deployment or model execution. A second source-entailment pass and fresh site/visual/export checks are required.
