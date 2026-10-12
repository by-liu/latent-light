# Final architecture review

Reviewed October 10, 2026.

## Scope

Updated the architecture collection overview and seven Architectural Evolution
pages. Added Depth and Residual Paths. Added scoped companion links in the
foundations and model catalog. Preserved all 41 individual model studies and
the existing release-map artwork.

## Visual review

Fourteen sequentially numbered figures across the collection and evolution
pages: eleven code-native explanations and three reused report figures.
Every figure has a clear purpose, provenance, a visible explanation and an
exported text equivalent. Desktop screenshots are retained under visuals/.
Figures were also checked at 390 pixels in light mode and 320 pixels in dark
mode. Dense original figures support keyboard panning on narrow screens.

Iteration corrected clipped labels, inconsistent SVG text styles, routing
arrows for inactive experts, gate input arrows, hybrid legends, the four
Qwen residual branches, and illustrative rather than invented DeepStack
layer IDs. All revised diagrams were reviewed after the final rebuild.

## Validation

- npm run validate: passed with 48 deployment and 91 content tests.
- Astro check: zero errors, warnings or hints.
- Build: 60 pages; docs lint: 60 files clean.
- Fresh browser QA: 10 routes, 30 viewport/theme views, 56 local links.
- HTML, Markdown and MDX equivalents: passed.
- Focus view, reduced motion, search, architecture llms.txt: passed.
- Final local development route for the new depth page: HTTP 200.
- git diff --check: checked again at handoff.

Existing build notices remain: Vite directive bundling notices and Pagefind
notices for 25 legacy redirect files without outer HTML. They did not fail
validation, and no unrelated redirect or dependency changes were made.

## Boundaries

No model weights were run or hardware benchmarked. Reported findings, local
derivations and original illustrations are distinct. Claims do not infer
proprietary architecture. No commit, push or deployment was performed.
Unrelated model-study and guidance work in the working tree was preserved.
