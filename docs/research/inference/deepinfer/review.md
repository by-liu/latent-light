# DeepInfer review

Reviewed October 20, 2026. Canonical page:
`src/content/docs/inference/deepinfer.mdx`.

## Revision 1: initial release study

### Evidence and restraint

The release README, complete official deployment Q&A, examples and evaluation
guides were inspected alongside targeted implementation paths. Exact revisions
are recorded in source records and link targets, not displayed as opaque hashes
in the article. Thirty-three sources support thirty-one bounded claims.
The 29 public references are selected navigable entry points, not a count-based
quality claim.

The X announcement and supplied Zhihu page returned HTTP 403. Neither is
quoted or used for an uninspected factual attribution. The official Q&A links
and builds on the Zhihu article. Search snippets and reposts were not used as
technical evidence.

Source repository checkouts include their bundled tokenizer files; no tokenizer
is redistributed by this study. No model checkpoint was downloaded, and no
remote model code, upstream build, model run, kernel test, benchmark or example
service was executed. The two Python and two bash fragments were syntax checked only. The prompt
recipe follows the inspected API; it renders a prompt, not a model answer.

The skeptical audit kept the missing full-service boundary, approximate replay,
fixed-three versus fixed-five baselines, declared acceptance factor, requests
per rank, low-load regression, Pass@1 accounting and production economic limits
beside the relevant claims. Rounded chart readings are recorded separately as
medium-confidence visual calculations, not precise raw measurements.

### Presentation refinement

Three original Apache-2.0 PNG figures remain byte-identical to the source.
Two original SVGs explain replay and overlap where the release lacked a compact
teaching figure. They do not invent measurements or source artwork. Source,
license, dimensions, exact hashes and notices are retained.

Manual screenshot review covered the opening, architecture, replay, scheduling,
prefill and decode figures, including desktop and mobile examples and both
themes. Normal, Focus and full-resolution views were inspected.

The architecture's fine labels were too small at the normal reading width.
A forced enlarged desktop view then lost the full map. The final version keeps
the complete map by default and offers an explicit, keyboard-accessible
“Enlarge labels” checkbox. It uses CSS and works without JavaScript; enlarged
figures return to a fitted layout in print. Phones retain labelled panning.
Other figures retain the established behavior. Export tests cover the new
optional property.

### Actual checks

- Full `npm run validate` on pinned Node 24.21.0 passed.
- 49 deployment tests and 176 content tests passed.
- Astro checked 169 source files with zero errors and warnings.
- 105 routes built and 105 documentation files linted clean.
- Pagefind indexed 104 substantive pages.
- Chromium checks completed at 2026-10-20T20:17:00.912Z.
- Widths 1440, 390 and 320 in light and dark: no page-level horizontal overflow.
- Five figure anchors, 29 footnotes, two numbered equations and valid fragments.
- Keyboard panning and enlargement, reduced motion, no-JavaScript table/enlargement,
  Focus, print visibility and zoom reset passed.
- Search finds the page; related-page links, local downloads and discovery files work.
- Full Markdown/MDX exports preserve resource cards, images/descriptions, evidence
  conditions, comparison rows and citations.
- Actual localhost:4327 mobile menu opens by keyboard and closes with Escape.
- No browser page errors.
- `git diff --check` passed.

Existing Nimbus/Vite head-inject bundling warnings and 25 old Pagefind
redirect/export-stub warnings remain. They are not new failures and were not
silenced by unrelated edits.

### Privacy and publication

The new narrative, downloadable assets and generated exports were checked for
machine-specific paths, private material, secrets, unpublished personal
conversations and references to the private career workspace. No such material
was added. Public assets contain only reviewed figures and license notices.
The code links are public source URLs.

Earlier uncommitted local/cloud research and site changes were preserved.
No commit, push, deployment, external post or upstream execution was performed.
This review establishes a prepared local article, not publication or independently
reproduced inference performance.


## Revision 2: TL;DR and full-picture infographic

User-requested presentation update, October 20, 2026. The inspected source
cutoff is unchanged; this is not a new claim of benchmark reproduction.

The page now opens with four TL;DR points: what the release is, why coordinated
execution matters, how to interpret the evidence and what still needs
integration. The summary retains both the estimated low-load loss and the
estimated high-load gain rather than presenting only a best case.

An original AI-generated overview is now Figure 1. It connects API conversion,
the inference core, four efficiency ideas and the released-versus-missing-service
boundary. The previous five figures are retained as Figures 2–6. All caption
numbers, text references, anchors, the visual manifest and tests were updated.

The first generated draft incorrectly labelled its unverified gray suffix.
It was rejected before integration. A targeted edit now labels the blue prefix
“Selected for verification” and the gray suffix “Skipped draft suffix”.
The image is a conceptual synthesis, not a bundled API server, measured schedule,
source architecture or performance chart. Exact initial/edit prompts and the
selected output hash are retained in `visuals/overview-prompt.md`.

The complete map survives in alt text and a six-step readable disclosure.
The chosen PNG is 1536 × 1024 and source notices distinguish it from the three
Apache-2.0 original figures. No external source image or logo was supplied to
generation. Normal desktop retains a complete overview; enlargement/Focus
offers detail; mobile uses labelled, keyboard-scrollable panning.

### Repeated final checks

- Full validation passed again: 49 deployment and 176 content tests.
- Astro: 169 files, zero errors and warnings; 105 built/lint-clean routes.
- Existing upstream bundler and old redirect/export-stub warnings remain unchanged.
- Chromium checks completed at 2026-10-20T20:30:01.781Z.
- Desktop 1440 and mobile 390/320, both themes: six figures, no page overflow,
  valid fragments, citations and source links.
- Focus, keyboard panning/enlargement, reduced motion, no-JavaScript baseline,
  print visibility/reset, search/discovery and actual dev navigation passed.
- Full MD/MDX exports retain the new TL;DR, image description, all six textual
  overview steps, six numbered captions, 29 references and two equations.
- Manually inspected the first-screen hierarchy, normal and Focus overview,
  and mobile dark presentation. Essential labels, arrows and release boundaries
  remain visible at appropriate magnification.
- A browser-harness element-list typo was corrected and the complete check
  rerun successfully; it was not a product defect.
- `git diff --check` and publication/privacy review passed.

No commit, push or deployment was performed. Earlier uncommitted work remains
preserved. Generation prompts and research records are public-safe.
