# Source and explanation review

Canonical narrative: src/content/docs/edge-ai/efficient-models.mdx.

Primary sources and targeted mechanisms inspected October 13 UTC / October 12 local, 2026. No checkpoint, conversion, training run or device benchmark executed. No upstream artifact executed. Revision 1 used an independent native diagram without paper artwork. Revision 2 adds the specifically licensed source figure documented below. No complete PDF is tracked or distributed.

## Skeptical pass

- Shared weights do not delete computation or combine distinct KV histories.
- The GQA ratio concerns logical payload, not physical allocation.
- Recurrent summaries trade addressable history for compressed state.
- Active MoE count does not bound resident expert storage.

## Checks actually executed

- ModelFlow JSON parsed through the existing component reader.
- ModelFlow Markdown transform retains every step label/detail; this is a transform-level check, not a complete endpoint export review.
- Three display equations parse with installed KaTeX and have sequential page-local numbers.
- Every native footnote marker has a definition; Figure 1 has a reading reference.
- Explicit footprint, group-storage and exposure arithmetic recomputed with Node where applicable.
- Source review found no private content, secrets, unknown copied artwork or unnecessary downloaded assets.
- Workspace validate_research.py passed (schema 3), and git diff --check passed.
- Parent initial build identified a missing ModelFlow import; explicit imports were added to all three pages. Parent rerun and actual rendered checks remain pending.

## Pending delivery

Parent integration owns npm run validate, actual desktop/mobile light/dark and Focus review, complete Markdown/MDX exports, navigation, discovery and search. No delivery gate is marked passed. Source validation checks record structure, not factual or legal sufficiency.

## Parent integration review completed

Checked 2026-10-13T04:38:25.124Z. Canonical source: `src/content/docs/edge-ai/efficient-models.mdx`. SHA-256: `b757987323c2b2581a19c3293f6731071540ad620e4bd14e66414f38d6916780`.

- Every chapter read for intuition,mechanism,tradeoffs,source support,units and conditional interpretation. Primary-source worker reviews were supplemented by parent cross-review and current-documentation spot checks.
- Full validation passed:49 deployment tests,154 content tests,Astro checks,production build and content lint. Research tools:27 tests passed.
- Actual local production preview passed66 views across11 pages at1440/390/320px in light/dark,including22 Focus checks,keyboard access and reduced motion. No document overflow,missing anchors,KaTeX errors or browser errors.
- All11 desktop and mobile native figures inspected. Mobile diagram clips were captured without scrolling the page,avoiding sticky-navigation screenshot artifacts. Every figure retains its complete exported text.
- Complete Markdown/MDX output,section discovery and actual search checked. No-JavaScript overview retains ten topic rows. The preview excludes the editor; development remains the editable workflow.
- Initial missing diagram imports and their stale template instruction corrected. Screenshot/interception harness issues were isolated from actual layout; final delivery evidence uses actual Astro preview,not an intercepted search-worker path.
- Existing Vite MDX-directive and Pagefind redirect-document warnings remain; no new validation error was suppressed.
- No checkpoint,device benchmark,download rollout,privacy audit,commit,push or deployment was performed. Device-specific performance remains a future empirical question.

Earlier worker pending notes describe the handoff at that time; the completed parent checks above supersede their pending delivery status.

## Revision 2 source-figure enrichment

Added Figure 2 from GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints as page Figure 2. EMNLP 2023 conference edition, December 6–10, 2023; printed pages 4895–4901. Original and cropped raster inspected; attribution, CC BY 4.0 evidence, source/PDF checksums and extraction coordinates retained in public/figures/edge-ai/efficient-models/SOURCES.md and NOTICE.md. No full PDF tracked. The illustrated 8:4:1 state ratio assumes equal layers, tokens, head width and precision; not a latency or quality ratio. SmolLM2 uses separate nine-query/three-KV dimensions. Current page rendering, exports and full validation are pending; previous revision checks remain historical.

Revision 2 structural handoff checks: per-workspace validator passed; figures are sequential with reading references and local image-slot paths; three numbered KaTeX expressions parse and footnotes are defined. Final public PNG SHA-256 values match the visually inspected crops. git diff --check passed. Full validation and actual revised rendering/export review remain pending.

## Visual enrichment integration review

Checked 2026-10-13T05:10:22.329Z. Canonical page revision 2; SHA-256 `5f9e9b210ee3aef2dc3bc2cee2ae2d12d88f185bcf1960640b9f55da8ea7a311`. Earlier revision reviews remain historical.

- Added imagery has a distinct teaching purpose. Original source figures retain complete selected labels/panels and explicit editions; the generated landscape is identified as an editorial map, not performance evidence. Independent charts and state diagrams retain assumptions and text equivalents.
- Parent inspected desktop/Focus and mobile captures, numbered anchors, caption/source scope, source colors and axes. Dense technical images preserve keyboard panning and full-size access; the overview now scales to show the complete map on a phone.
- All 11 pages passed 66 actual Astro production-preview views at 1440, 390 and 320 pixels in light and dark; 22 Focus checks, 16 loaded/full-size assets, search, no-JavaScript overview, keyboard access and complete Markdown/MDX/discovery exports passed. No document overflow, missing anchors, KaTeX or console errors.
- Full validation passed: 49 deployment tests, 157 content tests, Astro checks (165 files, zero errors/warnings/hints), 95-page build and 95 lint-clean content files. Research tools: 27 tests passed. Existing Vite module-directive and Pagefind redirect-document warnings remain.
- SourceFigure text export now preserves the original image, anchor, meaningful description, complete caption and citations without presentation wrappers. Hash tests compare the actual public bytes to the per-asset source records.
- Source artwork is not folded into the MIT grant. Exact license or specific criticism/review basis is recorded, including public site/GitHub distribution and embedded-artwork caveats. Full PDFs remain temporary study files, not deployed assets.
- Higher-precision memory totals were recomputed from the executable generator; the earlier rounded record remains superseded in claim history. Published page totals remain 1.83, 2.27 and 1.51 GiB.
- No checkpoint, hardware inference test, real deployment latency/energy measurement, commit, push or production deployment was performed. Development on port4327 is the review workflow.

This review supersedes earlier pending integration notes for the current revision, not contextual rights uncertainty or future device-specific measurements.

## Final publication-readiness review

Recorded 2026-10-13T19:05:09.754Z. Canonical SHA-256: 5f9e9b210ee3aef2dc3bc2cee2ae2d12d88f185bcf1960640b9f55da8ea7a311. Source updated 2026-10-12; earlier evidence cutoff retained.

The complete collection was read for mechanisms, conditions, quantities, sources and reader flow. Final 72-view browser/export review and clean-copy full validation passed. Original figure bytes are unchanged; selected current screenshots and existing provenance were reviewed. No hardware benchmark, commit, push or deployment occurred. See the current collection review for the exact scope and remaining contextual limits.
