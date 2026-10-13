# Edge AI foundations and bottlenecks

## Inquiry

How do memory, bandwidth, compute and sustained device limits constrain useful AI workloads?

## Intended reader and use

Technically curious readers with basic ML knowledge who need to form and test a device budget.

Learning or decision goal: Distinguish stored model size from peak working memory; reason about a bottleneck without mistaking arithmetic for a benchmark.

## Scope and time boundary

Device inference on MCU, mobile, personal computer and embedded platforms; explicit decoder KV accounting and illustrative memory/bandwidth arithmetic.

Evidence boundary: primary sources actually inspected during the October 12, 2026 Vancouver research pass. Access timestamps use the actual UTC date, October 13. Mutable documentation is a snapshot, not a permanent API guarantee.

## Exclusions

No actual model execution, device measurements, benchmark ranking, restricted employer material, paid resources, downloads of model weights, publication, commit, push or deployment.

## Deliverables

- Repository page `src/content/docs/edge-ai/foundations.mdx` is the canonical narrative.
- Source, claim, run and visual records support it; no duplicate report.
- Parent integrates navigation, site validation, rendered review and agent exports.

## Output contract

- Kind: site-page.
- Canonical path: src/content/docs/edge-ai/foundations.mdx.
- Reading depth: concise opening with enough technical detail to apply the distinction; deeper mechanisms belong in linked chapters.
- Structure: Intuition, workload budget, two memory formulas, worked example, runtime lifetime map, bandwidth versus compute, a measurement contract, next reading.
- Citation style: claim-local footnotes with direct primary links; no duplicate References heading.
- Evidence cutoff: 2026-10-12, local review date.
- Refresh expectation: revisit mutable runtime documentation before implementation; update device-specific evidence only after actual measurement.
- Distribution and privacy boundary: public-safe source pages and research records.

## Visual contract

Independent native ModelFlow diagrams with concise sequential Figure N captions and complete exported step text. Source facts cited; no third-party artwork reproduced. Equations are centered, sequentially numbered and state their assumptions.

## Research map

- Evidence dimensions and resolving sources: Official ONNX Runtime mobile guidance; GQA methods; ExecuTorch memory planning; NERSC Roofline documentation; MCUNet project summary; Apple LLM in a Flash summary; MLPerf Mobile scenario and quality definitions.
- Skeptical direction: Challenge model-file-fit, advertised-TOPS and compression-equals-speed claims. Separate ordinary KV from MLA and recurrent state; distinguish primary project summaries from a full-paper inspection.

## Budget and checkpoints

One bounded primary-source pass, a separate claim and arithmetic challenge, reader-first drafting, parent integration, full validation, desktop/mobile/theme/focus inspection and Markdown/MDX/discovery/search checks. Stop at a useful researched learning collection rather than acquiring benchmark data.

## Success criteria

The page explains the central distinction without invented measurements, formulas have explicit scope and units, sources entail claims, links resolve, and meaningful visuals work at desktop/mobile widths with useful agent exports. Complete only after actual delivery checks pass.

## User-supplied facts

The user approved the ten-topic Edge AI structure and explicitly requested parallel subagents. The intended public learning destination is Latent Light.

## Assumptions and decisions

The collection belongs within AI Technology and adds stable /edge-ai/ routes without moving existing pages. This is topic synthesis, not a named-model report. Native diagrams are chosen for explanatory precision, not as a substitute for benchmark evidence.

## Visual enrichment revision

Requested 2026-10-13T04:48:11.837Z. The user asks for an at-a-glance overview landscape and useful original-reference figures across the collection. Preserve prior narrative and research history. Overview adds an AI-generated learning map with retained prompt and full text equivalent. Foundations adds a precise calculated memory chart and an inspected published Roofline figure if a defensible reuse basis is documented. No new device measurements,full-paper redistribution,commit,push or deployment. Recheck actual desktop/mobile/themes/Focus and agent exports after changing figure order.
