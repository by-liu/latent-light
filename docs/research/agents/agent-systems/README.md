# Agent Systems: first edition

Evidence cutoff: October 10, 2026.

The narrative lives in `src/content/docs/agents/`. These records preserve inspected sources, limited claims, caveats and delivery checks without duplicating the site.

Each page has its own schema 3 workspace because the research validator binds a manifest to one canonical output. In particular, a Figure 1 on one page must not be validated against another page's Figure 1.

## Scope

Nine pages cover the loop, tools and skills, protocols, context and state, orchestration, evaluation, control, coding systems and a dated ecosystem map. The module is not an exhaustive survey. Foundational paper use is abstract-level; no numerical result, algorithm implementation or paper artwork is copied. Original responsive diagrams are teaching synthesis.

## Checks

Full site validation passed with 48 deployment and 101 content tests. Astro check reported no errors or warnings; all 70 content files passed docs lint. Existing build notices about head-inject directives and non-HTML redirect indexing remain.

Isolated Chromium checked 36 page, viewport and theme combinations. Search, citations, equation accessibility, focus and sidebar controls passed. All nine Markdown/MDX exports and collection indexes remained complete. The source pages contain no migration narrative, private conversations or secrets.

No model or framework benchmark experiment was run. Suggested experiments in the pages are proposals, not reported results.

## Refresh

Before revising mutable comparisons, inspect their official sources again. Preserve the distinction between a coding product, a reusable harness, a framework or SDK, a protocol and a managed runtime. Track renames and preview compatibility explicitly. Update the public source-check date only after the affected comparison has been rechecked.

## Research validation

From the repository root, run the repo-local skill's `validate_research.py` for each page workspace under this directory. The structural result supplements, rather than replaces, source and visual review.

## October 11 refactor

The collection now has 15 pages organized as Core Concepts, Reliability & Control and Agent Deep Dives. The existing eight chapters retain their URLs and earlier mutable-source dates; presentation and exports were rechecked. The overview was rebuilt with current managed-runtime evidence. This first-edition directory preserves its source/claim history.

Current research and delivery records: `../frontier-refactor/`; focused new workspaces: `../claude-code/`, `../codex/`, `../pi/`, `../opencode/`, `../deepseek-harness/` and `../deep-dives-overview/`. The latter covers the selected architectural comparison and bounded frontier evidence. Three source figures use verified MIT or CC BY 4.0 reuse, with retained originals and checksums.

October 11 delivery: 48 deployment tests, 135 content tests, 84-page build/lint, Astro check with 0 errors/warnings; 60 browser views and 30 exports, search and discovery passed. Earlier notices remain: Vite head-inject directives and 25 Pagefind non-HTML redirect skips. No studied-product benchmark or deployment was performed.
