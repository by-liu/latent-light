# Session handoff

Snapshot date: November 8, 2026, America/Vancouver.

This file records recent work and restart steps. It does not replace the
[About guides](../src/content/docs/about/framework.mdx).
Git and the current task take precedence over this dated snapshot.

## Resume work

1. Use this repository as the working directory.
2. Read [AGENTS.md](../AGENTS.md) and [README.md](../README.md).
3. Check the current files and recent commits:

   ```bash
   git status --short --branch
   git log -3 --oneline
   ```

4. Read the relevant About guides before changes.
5. Ask the user for the next task. No implementation task remains unfinished from the previous session.

The research skill is part of this repository:
[latent-light-deep-research](../.agents/skills/latent-light-deep-research/SKILL.md).
It is a Git-managed directory, not a link to another project.
The next session does not need this conversation.

## Last verified release

- Commit: [032cc87](https://github.com/by-liu/latent-light/commit/032cc872ccb8a3ae060b4a32431d9a227a8fd1aa).
- Branch: `main`.
- Public site: [latentlit.com](https://latentlit.com).
- Verification date: November 1, 2026, after the initial Hardware 101 release. The subsequent animation and diagram refinements below are not part of that release.
- GitHub validation and Cloudflare deployment passed.
- Cloudflare Worker: `latent-light`.
- Worker version: `07c2fdd6-17db-42f5-bb1f-3892e00119db`, deployed at 100%.
- Release checks passed: 49 deployment tests, 183 content tests, Astro checks, a 106-page build and 106-file content lint.
- Live Hardware 101 HTML, Markdown, MDX, opening figure and related pages matched the reviewed build.
- Live desktop/mobile, both themes, Focus, keyboard, search and no-JavaScript checks passed.
- Known Nimbus/Vite and old Pagefind redirect warnings remained.

The optional detailed release record is
`output/releases/2026-11-01-032cc87.json`.
Git ignores that local file. The summary above does not depend on it.
Use the [maintenance guide](../src/content/docs/about/maintenance.mdx) for future publication checks.

## Completed studies

| Page | Source | Research records |
| --- | --- | --- |
| DeepInfer | [deepinfer.mdx](../src/content/docs/inference/deepinfer.mdx) | [Release study](research/inference/deepinfer/) |
| Local and cloud collaboration | [local-cloud-collaboration.mdx](../src/content/docs/edge-ai/local-cloud-collaboration.mdx) | [Collaboration study](research/edge-ai/local-cloud-collaboration/) |
| Cloud agents and local specialists | [cloud-agents-local-specialists.mdx](../src/content/docs/local-cloud-ai/cloud-agents-local-specialists.mdx) | [Specialist study](research/local-cloud-ai/cloud-agents-local-specialists/) |
| Smart devices and cloud agents | [smart-devices-cloud-agents.mdx](../src/content/docs/local-cloud-ai/smart-devices-cloud-agents.mdx) | [Device study](research/local-cloud-ai/smart-devices-cloud-agents/) |

All four studies are complete. Their progress files retain evidence dates and
review results. Historical review notes describe the checks at their original dates.

DeepInfer includes a short summary, six numbered figures and 29 references.
The research records include the
[overview prompt and correction](research/inference/deepinfer/visuals/overview-prompt.md).
The study inspected code and documentation.
It did not run model inference or reproduce GPU benchmarks.

Temporary scripts, downloaded repositories and screenshots are not required
to resume. Use the committed pages, tests, research records and asset notices.

## Local server after a restart

Select the Node version in `.node-version` before using npm.
The version is `24.21.0` at this snapshot.

From the repository root:

```bash
npm run dev
```

Open <http://localhost:4327>. Follow the README if dependencies need installation.
A system restart stops local development processes.
It does not stop the Cloudflare-hosted website.

## Status and authority

Commit 032cc87 contains the published initial Hardware 101 page.
The user has now authorized committing and pushing the subsequent animation
and diagram refinements from `refine/hardware-visuals`. Release preparation is described below;
the last verified release above remains the production baseline until the new
deployment passes its public checks. Three earlier progress-only edits remain
unrelated and must stay outside this release. Check Git before changing or staging files.

The previous release authorization does not authorize future publication.
Keep credentials and private conversations outside tracked files.
Request the user's next task rather than treating old research suggestions as instructions.

## October 31 local work (unpublished)

The selected Echo lightning identity is applied locally to the header logos and
favicon. Brand provenance and candidate records are under docs/branding.
The candidate review and screenshots under output are disposable local artifacts.

The user authorized the Document AI release refresh. The canonical page at
src/content/docs/document-ai.mdx now includes MiniCPM-OCR1.0/Jev, an expanded
Xiaomi-OCR0 study with verified official weights, Unlimited-OCR2, OXR1.0,
OCRia1/LlamaParse, Youtu-Parsing-Omni, WeVisDoc and the DPP draft. There are
17figures,66references and explicit benchmark/runtime/license boundaries.
Refreshed evidence dates toOctober31; retained contracts still date toOctober11.
Research records and completed checks are under docs/research/document-ai/overview.

Required local validation passed on Node24.21.0, including49deployment and
176content tests, Astro checks, build and lint. Desktop/mobile, both themes,
Focus, figure keyboard enlargement/panning, filters, reduced motion, built
search and Markdown/MDX exports were reviewed. Existing Nimbus/Vite and
Pagefind legacy-redirect warnings remain. Dev stays on port4327.

These edits and the prior documentation/progress changes remain uncommitted.
No commit, push or deployment was authorized or performed. Preserve the
worktree and inspect git status before continuing. The current tasks are
complete; wait for the next user instruction rather than publishing this snapshot.

The subsequent Document AI review merged both model catalogs into one searchable
24-row table, with consistent scale/access, design and output columns and links
to each study. All entries and evidence dates are preserved. Revision5 checks
are recorded under the same research directory; full validation passed again.

The user then approved a Document AI family atlas while explicitly retaining
the six-budget mechanism figure. The native atlas is above the model table at
/document-ai/#model-families-and-evolution. It shows26dated milestones and six
typed connections, with five overlapping approach lanes and a separate Jev
verification rail. Focus reveals the full timeline; narrow layouts reflow.
Selection shows model details beside its lane. Shared data and Markdown export
live in plugins/document-model-atlas.mjs; the component is DocumentModelAtlas.astro.
Revision6 evidence/checks are under docs/research/document-ai/overview.

Final local validation passed49deployment and178content tests, Astro checks,
build and lint. Desktop/mobile, themes, Focus, keyboard/touch, no-JavaScript,
print-media, search and agent endpoints passed. Existing build warnings remain.
All work is local and uncommitted; no publication action was authorized or taken.

The user also requested a generated infographic near the beginning. Revision7
adds a six-theme editorial poster after the opening summary, as Figure1. It has
18selected model/version labels, native enlargement/panning and a complete cited
text equivalent. The system map, budget figure and interactive atlas are now
Figures2,3and4; all19figures and24catalog rows remain. The public asset is
public/figures/document-ai/document-ai-model-ideas-v1.webp. Prompt, PNG master,
correction, provenance and final checks are in the overview research directory.
The dev server was restarted on4327 to refresh generated text exports.
Full validation and desktop/mobile/Focus, keyboard, no-JS, print, search and
agent exports pass; existing build warnings remain. All work is still local
and uncommitted, with prior unrelated edits preserved. No publication action
was authorized or performed.

The subsequent whole-page review is complete as revision8. The opening has
reader routes and an earlier short answer; the system map now follows task
layers while retainingFigure2. Model coverage adds Nemotron3.5Parse, ChandraOCR2
and SuryaOCR2:27catalog rows,29atlas milestones and7typed links. Retrieval,
benchmark/protocol currency, production contracts, workload selection and
conclusions are reconciled with the new evidence. The product map has14rows
with role labels beside names; a7-row benchmark guide clarifies evaluation
units. There are80references,19figures,8equations and7tables. All original
source art and the generated opening poster are preserved.
Research findings, scoped source checks, artifact pins and final QA are under
docs/research/document-ai/overview; start with whole-page-review-2026-10-31.json
and checks-whole-page-2026-10-31.json. Full validation, actual desktop/mobile/
Focus, keyboard, filters, no-JS/print, search and agent exports pass. Existing
Nimbus/Vite and Pagefind warnings remain. The dev site is refreshed on4327.
No model/service benchmark, commit, push or deployment was performed. Work
remains local and uncommitted; preserve prior unrelated edits.

## November 1 release preparation

The user authorized committing and pushing the completed Document AI refresh
and approved Echo identity. The existing main branch and origin are unchanged;
a push to main triggers the configured Cloudflare production build. The release
includes this handoff, its AGENTS entry link, source/component/export changes,
reviewed assets and their evidence/provenance records. The three pre-existing
progress-only edits for the edge/local-cloud studies are deliberately excluded
and remain in the working tree.

Production-origin validation passed on Node24.21.0:49deployment and178content
tests, Astro0errors/warnings/hints,105-page build and105-file lint. Research
structural validation and git diff --check pass. Existing Nimbus/Vite and
25Pagefind redirect warnings remain. The prior actual desktop/mobile, themes,
keyboard, no-JS, print, search and export review is in the revision8 check record.

This note is prepared before the commit/push. Check GitHub checks, Cloudflare
status and the live site for the release outcome. A dated authorization here
does not authorize a later publication action.

## November 1 Hardware 101 (local, ready for review)

The release preparation above completed successfully; the Last verified release
section records its outcome. The subsequent task is separate local work.

The user requested deep research and page creation for a broad hardware
foundation for AI researchers and engineers who want to build AI devices.
They explicitly preferred foundations across device types rather than a single
product field. The completed page is `/hardware/`, under AI Technology:

- Canonical source: `src/content/docs/hardware/index.mdx`.
- Evidence and actual review: `docs/research/hardware/hardware-101/`, starting
  with `review-2026-11-01.json` and `state/progress.json`.
- Scope: circuits, signals, computation, memory, interfaces, firmware, timing,
  power, thermals, datasheets, prototyping and representative platform roles.
- Five figures, including a generated opening learning map and four code-native
  explanations; seven equations, 32 references, seven platform roles and an
  interactive lab for sensor traffic, weight payload and battery energy.
- Shared figure/export data: `plugins/hardware-foundations.mjs`.
  Calculator definitions/math/exports: `plugins/hardware-budgets.mjs`.
  Components are in `src/components/hardware/`; both exporters are registered
  in `astro.config.ts`. Focused checks are in `scripts/hardware-content.test.mjs`.
- Navigation, homepage, Edge AI and About guidance link to the page.

Full validation passed on Node 24.21.0: 49 deployment and 182 content tests,
Astro zero errors/warnings/hints, a 106-page build and 106-file lint.
Research structural validation and `git diff --check` passed. Actual desktop
and mobile, both themes, Focus, native keyboard controls, table panning,
mobile navigation, reduced motion, print, no-JavaScript, built search and
Markdown/MDX/agent exports passed. Browser review led to a more compact
calculator, corrected native reset timing and consistent static print examples.
Existing Nimbus/Vite module-directive and 25 Pagefind redirect warnings remain.
No hardware measurement or model benchmark was performed.

The dev server is running on `http://127.0.0.1:4327` and was restarted after
the final content edits to refresh cached text exports. Temporary screenshots
and the CDP harness are disposable; the research review retains the results.

No commit, push or deployment was requested for Hardware 101. Preserve the
three pre-existing progress-only edits under edge-ai/local-cloud research.
Do not infer publication authorization from the earlier release or this handoff.

The user then requested an attractive opening infographic and an opening story
about full stack expanding to **AI + software + hardware**. Revision 3 adds both.
The generated learning map previews six areas and three practical outcomes;
the four native figures remain as Figures 2–5. The asset is
`public/figures/hardware/hardware-101-learning-map-v1.webp`, created with the
built-in image tool and converted losslessly from its PNG master. Prompt,
hashes and generation review are in the research workspace's `visuals/`
directory. `review-opening-2026-11-01.json` records the completed checks.
Native enlargement, keyboard panning, mobile and both themes, Focus,
no-JavaScript, print, built search and complete exports passed after the final
story edit. Full validation remains 49 deployment / 182 content tests and a
106-page build/lint. The dev server was refreshed on port 4327. All Hardware
101 work remains local and uncommitted.

The next visual review, revision 4, adds three focused native figures rather
than images in every section: the ideal DC circuit (Figure 3), conceptual
board/SoC boundaries (Figure 5), and a latency/throughput schedule (Figure 7).
There are now eight figures, seven equations and 33 references. The schedule
uses explicit hypothetical durations and separate resources; it is not a
device measurement or a clocked logic pipeline. Shared figure data and complete
exports remain in `plugins/hardware-foundations.mjs`.
`review-section-figures-2026-11-01.json` records evidence, arithmetic and actual
desktop/mobile, themes, Focus, keyboard panning, no-JavaScript, print, search
and export checks. Full validation passed 49 deployment and 183 content tests,
zero Astro diagnostics, a 106-page build and 106-file lint. Existing build
warnings remain. The dev server on 4327 has current text exports. No commit,
push or deployment was performed; preserve unrelated research-state edits.

## November 1 Hardware 101 release preparation

The user subsequently requested **commit and push**. The intended release
contains the complete Hardware 101 page, eight figures, interactive budgets,
text exports, navigation, focused tests, provenance and research review records.
Use a pull request for the substantial change, check validation, then advance
`main` to trigger the existing Cloudflare automatic deployment. The production
origin remains `https://latentlit.com`; no hosting settings or dependencies change.
Verify the public page, asset, exports, search and desktop/mobile rendering after
deployment. Record the resulting source commit and deployment in the ignored
`output/releases/` directory and the final response. This preparation note does
not claim that a push or deployment has already succeeded.

Leave these pre-existing files uncommitted:

- `docs/research/edge-ai/local-cloud-collaboration/state/progress.json`
- `docs/research/local-cloud-ai/cloud-agents-local-specialists/state/progress.json`
- `docs/research/local-cloud-ai/smart-devices-cloud-agents/state/progress.json`

## November 7 animated Hardware 101 opening (local)

The user requested a cool GIF for Figure 1 on `/hardware/`. The preceding
Hardware 101 release completed as commit `032cc87`; this animation is subsequent
local work and has not been committed, pushed or deployed.

Figure 1 now has a looping 3.84-second, 48-frame GIF (about 844 KB), assembled from a
built-in image-tool keyframe with moving signal packets and a slow chip glow.
The original WebP remains the still. After the user preferred an uncluttered
figure, all toolbars and playback buttons were removed. `SourceFigure` accepts
optional `motionSrc`: continuous playback while the figure and tab are visible,
as explicitly requested by the user. The image itself opens the full-size still. Reduced motion,
no JavaScript and print use the still. Markdown retains the still and GIF link.
Prompt, asset metadata and review are in `docs/research/hardware/hardware-101/`;
assembly is reproducible with `scripts/render-hardware-learning-loop.mjs` when
the ignored keyframe and local librsvg/FFmpeg tools are available.

Validation passed: 49 deployment / 184 content tests, zero Astro diagnostics,
106-page build and 106-file lint. Desktop/mobile, both themes, Focus, keyboard
full-size access, reduced motion, print, no-JavaScript and exports passed.
The title region is pixel-identical across the 48 GIF frames. Existing Nimbus/Vite
and 25 Pagefind redirect warnings remain. A single current dev server runs at
`http://127.0.0.1:4327`; its exports were refreshed. Preserve the three unrelated
progress-file edits. The request to edit this figure does not authorize a new release.

## November 7 Hardware 101 diagram refinement (local)

The user approved applying the newly installed global `diagram-design` skill
to Figures 2–8. Figure 1 was explicitly excluded: its authored block, both assets,
component and exporter match the pre-refinement hashes. The previous GIF work
and three unrelated research progress-file edits remain preserved and uncommitted.

The board map now has clear nested boundaries and orthogonal connections; a new
memory staging SVG states the mapped-flash/shared-pool exceptions; timing brackets
distinguish 27 ms latency from 12 ms completion intervals. System lanes, the ideal
circuit, sampling axes and the budget lab share calmer frames and the existing
Inter/theme typography. Full definitions, calculations and references remain.
The calculator print override was fixed to reveal all three examples despite
the framework’s layered hidden rule.

Design choices are in `visuals/diagram-refinement-brief.md` under the Hardware 101
research workspace; `review-diagram-design-2026-11-07.json` records actual checks.
Full validation passed: 49 deployment / 184 content tests, zero Astro diagnostics,
106-page build and 106-file lint. Desktop/mobile, both themes, Focus, keyboard
panning and calculation controls, reduced motion, print, no JavaScript, built
search and full exports passed. The skill’s self-check passed on the ignored
HTML proof in `output/hardware-diagram-refinement/`. Existing Nimbus/Vite and
25 Pagefind redirect warnings remain. The current dev server is on loopback 4327.
No new commit, push or deployment is authorized by this local refinement.

## November 8 visual-refinement release preparation

The user subsequently requested **commit and push** for the completed local
work: the looping Figure 1 GIF with its clean presentation, refined Figures 2–8,
print correction, complete exports, tests and provenance/review records.
Use the `refine/hardware-visuals` branch and a pull request. After validation,
advance `main` for the existing automatic Cloudflare release at
`https://latentlit.com`. No hosting settings or dependencies change.
The last verified release above remains the baseline until public verification
succeeds. Record the new source commit, checks and Worker version under ignored
`output/releases/` after release, and report the result to the user.

Preserve the three unrelated progress-file edits listed above. The global
diagram-design skill installation is outside this repository and is not included.

## November 11: YOLO family tutorial ready for local review

New page: `/yolo/`, source `src/content/docs/yolo/index.mdx`, linked under AI
Technology and from the home page. About 7,000 words, seven figures (five native,
two licensed original paper excerpts), searchable 19-family comparison, core
mechanisms, branching history, current YOLO26 source contracts, open vocabulary,
evaluation and device workflow. Research workspace: `docs/research/vision/yolo/`.
Evidence cutoff remains November 8, 2026; presentation/validation reviewed Nov 11.

Full validation passed: 49 deployment + 187 content tests, zero Astro diagnostics,
107 pages built and lint clean. Browser review covered desktop/mobile, themes,
Focus, keyboard/filtering, static/reduced-motion/print, built search and complete
exports. Existing Nimbus/Vite and 25 Pagefind redirect warnings remain. Local
server runs on 4327. No commit/push/deploy authorized for this YOLO task.
Preserve the three pre-existing unrelated research progress edits.

The YOLO revision now includes eight figures: an original six-second opening
GIF with a static reduced-motion/print poster, followed by the family overview
and mechanism figures. The model table has five columns, including linked
implementation licenses and the historical YOLOv5 GPL/current AGPL distinction.
License files checked November 11; other release-status evidence retains Nov 8.
The user subsequently authorized commit and push for this completed YOLO work.
Release through a branch/PR and the existing automatic deployment on main.

## November 12: standalone Jensen Huang video collection

Local `/jensen/` is a standalone Astro page with its own dark editorial layout,
Chinese navigation, original publisher thumbnails, 7 verified video identities,
category/year/keyword filters, local saved list and on-demand YouTube-nocookie
player. Original source links remain available without JS; `/jensen/index.md`
exports the catalog. No document sidebars or hosting changes. Catalog data is in
`src/data/jensen-videos.json`; source review and QA in
`docs/research/people/jensen/`. No claim of watching complete videos or verified
quotes; no unverified controversy narrative in the gallery.

Full validation passed: 49 + 187 tests, zero Astro diagnostics, 108-page build,
107 docs lint clean. Desktop/mobile, filtering/empty states, saves, dialog
keyboard close/focus and iframe cleanup, reduced motion, no-JS source links and
Markdown source list reviewed. Actual audiovisual playback/regional availability
is not established by headless UI checks. Existing warnings remain; Pagefind
also notes no stemming for zh-cn. No commit/push/deployment authorized for this
task. Preserve the same three unrelated research progress edits.

The Jensen gallery is now entirely English at the user's request, including
catalog metadata, filters, status messages, accessibility names and Markdown
export. English desktop/mobile checks and full validation passed. Review record:
`docs/research/people/jensen/review-english-2026-11-12.json`.

Broader Jensen collection pass: 24 recordings across 17 original publisher
channels, with Lex #494 and Joe Rogan #2422 first, plus Dwarkesh, YC, CHM,
No Priors, BG2, SIEPR, Bloomberg, Milken, CBS, COMPUTEX and CES. All 24 years
cross-checked against original YouTube publication metadata. New format filter,
format labels, verified host transcript links and separate Stanford archive
links from 2003/2009. Full validation and desktop/mobile/filter/player/export QA
passed; all thumbnails load on scroll. Research scope, excluded unverified
leads and actual review recorded under docs/research/people/jensen/. Still local;
no commit, push or publication authorized for this gallery task.

Jensen editorial redesign: warm ivory/forest palette, serif display headlines,
self-hosted Inter, guided topic/long-conversation entry points, compact cards
with expandable descriptions/transcripts, and next/previous player navigation.
Fixed Astro scoping for dynamically created iframes so playback fills its frame.
Desktop/mobile, keyboard details, journey filtering, player sizing/selection/
cleanup/focus, saves, filters, print, reduced motion, no-JS and exports reviewed.
Full validation passed with zero Astro diagnostics. Review record:
`docs/research/people/jensen/review-style-2026-11-12.json`; ignored screenshots in
`output/jensen-style-review/`. Remains local and uncommitted.

Jensen living-tribute refinement: new first-person English dedication and
“Jensen, keep building.” headline replace the somber introduction. Generated a
colorful smiling Jensen illustration and authored a six-second circuit/spark GIF
(`public/figures/jensen/`). Prompt, editable animation renderer and provenance
are retained. Mobile places artwork before the longer dedication. Reduced
motion, print, no-JS and offscreen/background states use the static WebP.
Full validation and desktop/mobile, motion fallback, Markdown parity and existing
gallery interaction checks passed. Review record:
`docs/research/people/jensen/review-tribute-2026-11-12.json`; screenshots under
ignored `output/jensen-tribute-review/`. No commit/push/deployment authorized.

Latest Jensen direction supersedes the illustrated hero: “Jensen, wish you were
here.” with a small Pink Floyd acknowledgement. Hero uses a real January 21,
2026 Davos speaking photo, ©2026 World Economic Forum / Thibaut Bouvier,
CC BY-NC-SA 4.0. Six-second camera loop (GIF plus efficient animated WebP), static
fallback, original photo and license records under `public/figures/jensen/`.
Photo derivatives are excluded from MIT. Editable renderer retained in research
visuals; credit/source/license/modifications on page and in Markdown. Desktop,
mobile, motion fallbacks and exports reviewed; record
`docs/research/people/jensen/review-photo-2026-11-12.json`.
Still local; no commit, push or deployment authorized.

Latest Jensen title: “Shine on you crazy diamond.” with a verified Pink Floyd
official-channel YouTube link (Parts 1–9 new stereo mix). Editorial opening now
leads into four NVIDIA contribution milestones and three sourced mindset
interpretations, then the author's complete personal tribute and the original
24-video browsing experience. Real 2026 photo animation retained. Hero CTA still
skips directly to the library. Primary history/transcript sources, song publisher
verification and rendering/interaction QA are in the Jensen research directory.
Review: `docs/research/people/jensen/review-shine-2026-11-12.json`; screenshots in
ignored `output/jensen-shine-review/`. No commit, push or deployment authorized.

Shine On layout final validation: 49 deployment and 187 content tests pass, zero
Astro diagnostics, 108 pages built and 107 MDX files lint clean. Existing build
notices remain. Unrelated research progress files preserved.

Latest Jensen direction supersedes the contribution/philosophy layout. Removed
timeline, mindset, associated references and extra journeys from page/export.
Opening/song/photo retained; full dedication is a native expandable note near
the opening. Video-first collection uses one large inline player with four
suggestions, source/transcript, stop and filtered previous/next controls. All
modal code/styles removed. Mobile uses a horizontal suggestion strip and compact
library rows. No iframe until selection; stopping removes it. All 24 videos,
filters, local saves and no-JS originals retained. New review:
`docs/research/people/jensen/review-inline-2026-11-12.json`; screenshots in ignored
`output/jensen-inline-review/`. No commit, push or deployment authorized.

Inline redesign final validation passed: 49 deployment tests, 187 content tests,
zero Astro diagnostics, 108 built pages and 107 lint-clean MDX files. Existing
Nimbus/Vite and legacy redirect Pagefind notices remain. Unrelated research
progress files preserved; no publication actions taken.

Added two original All-In Podcast interviews (September 14 and March 19, 2026).
Recent September recording is near the top and in the suggestion queue. Catalog
now contains 26 recordings across 18 original publisher channels. Original YouTube
publication dates and publisher identity verified; metadata retained in
`docs/research/people/jensen/all-in-metadata-2026-11-12.json`. All counts and text
exports derive from the catalog. No commit, push or deployment authorized.

All-In additions validated: full site checks pass with existing notices. Desktop
and mobile, all three search aliases, combined Podcast/2026 filter, new thumbnail
loads, inline selection/navigation/stop and 26-entry Markdown export checked.
Review: `docs/research/people/jensen/review-all-in-2026-11-12.json`.

Homepage invitation: added a single clickable panel before Explore linking to
`/jensen/`. Latest author-requested copy leads with “Jensen Huang. The GOAT.”
under “A personal tribute,” with “A collection of his speeches and interviews,
gathered with admiration.” The original song title remains on the collection
page. Subtle diamond, native theme colors and keyboard focus; no homepage media
payload or new navigation group. Source in `src/content/docs/index.mdx`, styling
in `src/styles/latent-light.css`. Full validation passes with existing notices.
Desktop/mobile and both themes visually reviewed; link retained in Markdown.
Restarted only the confirmed Latent Light server to clear stale development
exports; loopback port remains 4327. No commit, push or deployment authorized.

Homepage badge now includes a transparent cartoon Jensen avatar generated from
the user's supplied portrait. CSS supplies a gentle six-second greeting and
sparkle, static under reduced motion/print; 16 KiB asset and prompts/provenance
retained. The dedication now dates the resignation accurately: November 11,
2026 effective date in the 8-K, November 12 public announcement. Added the user's
lasting support and hope for a return to leadership, with primary-source date
citation and Markdown parity. Full validation passed with existing notices.
Homepage desktop/mobile/both themes, actual animation/static fallback, keyboard
navigation and both exports checked. Review record:
`docs/research/people/jensen/review-home-avatar-2026-11-12.json`.
Dev server refreshed; remains on 127.0.0.1:4327 (SSH preview uses 14327).
No commit, push or deployment authorized. Unrelated progress files preserved.

Latest copy refinement: personal note retains its original meaning without dash
punctuation. Homepage keeps the collection description and adds a separate
resignation/support context line ending “hope to see him lead us again.”
Full validation, desktop/mobile/both themes, keyboard, motion and exports pass.
Review: `docs/research/people/jensen/review-clean-copy-2026-11-12.json`.
No publication actions. Existing build notices and unrelated changes preserved.

## Jensen collection release preparation

The author authorized commit and push for the completed Jensen collection and
homepage invitation. Use the substantial-change branch/PR workflow. Merge and
production deployment are not authorized by this release step. Final validation
and browser/export review passed; only existing Nimbus/Vite and legacy redirect
Pagefind notices remain. Keep the three unrelated research progress JSON edits
outside the commit.
