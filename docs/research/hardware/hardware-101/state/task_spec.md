# Hardware 101 for AI Researchers and Engineers

## Inquiry

What shared hardware and systems foundations does an AI researcher or engineer need to understand, evaluate and begin building many kinds of AI devices in 2026?

## Intended reader and use

AI researchers and software engineers with basic AI literacy and little formal electronics training. The page should help them reason about many kinds of AI devices, from sensor nodes and wearables to cameras, voice interfaces and robots.

Learning goal: read a device block diagram and a datasheet, follow information and energy through the system, estimate first-order budgets, choose a sensible development platform and plan measurements before designing a custom product.

## Scope and time boundary

Shared foundations across components, chips, boards, complete devices and connected systems. Cover circuits and signals, digital computation, processor roles, memory and data movement, sensors and interfaces, embedded software, power and thermal constraints, and prototyping and measurement. Put a small, dated platform map after the durable concepts.

Evidence boundary: primary technical sources inspected on 2026-11-01. Established physics and architecture need not be newly published. Mutable product and runtime claims require current official documentation. Announcements, specifications and measurements remain distinct.

## Exclusions

No single target device or narrow product vertical; no chip design curriculum, purchasing ranking, custom mains or battery charger construction, exhaustive SKU catalog, or datacenter-first accelerator survey. Link existing Edge AI deep dives for further model and runtime detail. No fabricated hardware experiments or performance results.

## Deliverables

- Repository page `src/content/docs/hardware/index.mdx` is the canonical narrative.
- Source, claim, run and visual records support the narrative.
- Counterevidence, uncertainty and actual review results remain explicit.

## Output contract

- Kind: site-page
- Canonical path: src/content/docs/hardware/index.mdx
- Reading depth: substantial foundation with an ordered reading path, several precise diagrams and worked examples; a useful first read and a reference for later projects.
- Structure: Chosen for the inquiry, not a fixed report outline.
- Citation style: Claim-local footnotes for site pages.
- Evidence cutoff: 2026-11-01.
- Refresh expectation: durable foundations; revisit platform and runtime examples when their contracts materially change. No scheduled monitoring was requested.
- Distribution and privacy boundary: Public-safe repository and output.

## Visual contract

Use original code-native diagrams for system scales, signal conversion and memory/data movement where these materially clarify understanding. A small interactive budget calculator may expose unit assumptions and tradeoffs; retain useful initial results without JavaScript. Every figure needs a complete text export, meaningful caption and provenance record. Do not invent measurements or use generated art for technical evidence.

## Research map

- Electrical and signal foundations: university teaching materials, semiconductor ADC guidance and interface specifications.
- Computing and memory: architecture documentation, original Roofline work and runtime documentation.
- Device integration: official MCU/SoC, embedded OS, power, thermal and security documentation.
- 2026 examples: current manufacturer product pages and developer documentation, bounded to roles rather than rankings.
- Skeptical direction: challenge abstraction-level confusion, precision versus accuracy, TOPS versus end-to-end work, weight payload versus working memory, average energy versus peak power, and development boards versus finished products. Verify formulas, units, source freshness and where illustrative calculations cease to be predictions.

## Budget and checkpoints

Run bounded foundation and platform research passes, then a separate skeptical evidence pass before final synthesis. Draft and implement locally, inspect actual desktop/mobile and exported content, refine concrete problems, and complete repository validation. Use a single agent; do not delegate without authorization. No numerical token budget was requested.

## Success criteria

The reader can trace sensor-to-action and battery-to-heat paths, distinguish component/chip/board/device abstractions, calculate sensor throughput, weight payload and ideal battery energy budgets, explain major runtime and physical constraints, and outline a measured first prototype. Sources must support consequential claims with bounded caveats. Research validation, full site validation, actual rendered checks and complete Markdown/MDX exports must pass; incomplete checks remain explicit.

## User-supplied facts

The user wants Hardware 101 for AI researchers and engineers in 2026, motivated by full stack AI and hardware for developing AI devices. They explicitly prefer a broad foundation without selecting a narrow field and authorized deep research and local page creation.

## Assumptions and decisions

Schema 3 initialized at 2026-11-01T20:00:25Z. Canonical page will live at /hardware/ under AI Technology, alongside Edge AI. Existing unrelated research-state edits are preserved. Publication, commit and push are outside this task's authorization.

Subsequent request, November 1: add an attractive generated infographic near the beginning that previews the tutorial and learning outcomes. It is an editorial learning map, with an accessible text equivalent; the four precise native figures remain. This changes presentation, not the evidence cutoff or broad foundation scope.

Additional opening perspective requested November 1: tell the story of full stack expanding from frontend/backend software toward AI + software + hardware. Present this as an authored perspective for AI-device builders, with a concrete assistant example, rather than an empirical industry forecast or a claim that one person must master every specialty.

November 1 visual enrichment: add three purposeful native figures where the page has a teaching gap: the ideal circuit, board/chip boundaries and latency versus throughput. Retain the opening artwork and existing figures. Do not add decorative images to every section or turn this into a narrow device tutorial.

November 1 release authorization: after reviewing the completed work, the user requested commit and push. Release the reviewed Hardware 101 changes through the repository's branch and pull-request workflow, then the existing automatic production deployment from main. Preserve the three unrelated research progress-file edits. Earlier local-only checkpoints above describe the authorization at those times.
