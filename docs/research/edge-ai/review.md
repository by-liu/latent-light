# Edge AI collection review

Completed 2026-10-13T04:38:25.124Z. Overview plus ten chapters are canonical under `src/content/docs/edge-ai/` and grouped within AI Technology. Research records remain public-safe,repository-relative and separate from the site narrative.

Three parallel workers researched model/compression/training,execution/runtime/evaluation,and multimodal/agent/product topics. The parent authored overview/foundations,integrated navigation,read the complete collection and cross-reviewed the shared budgets.

Full validation:49 deployment tests,154 content tests,Astro162 files with zero errors/warnings/hints,95 built pages and95 lint-clean files. Research suite:27 tests passed. Browser preview:66 views,22 keyboard Focus checks,11 complete Markdown/MDX outputs,actual search and discovery endpoints. All native desktop/mobile figures visually inspected.

No new runtime dependencies or copied figure assets. The source templates now correctly require an explicit ModelFlow import. The collection contains proposed measurement contracts and illustrative calculations,not new device benchmarks.

Existing build warnings remain:Vite ignores MDX module-level directives;Pagefind reports25 redirect documents without outer HTML. These were not suppressed. Nothing was committed,pushed or deployed.

## Final release preparation review (2026-10-13)

This section records the current local preparation; earlier sections describe historical revisions, not this release. The collection now has twelve pages, including the on-device computing companion. Source artwork and original diagrams have their separate provenance and notices.

### Refinements

Read all twelve canonical pages and the related implementation and guidance. Clarified NPU, DSP and ISP; separated memory-family names from model formats; corrected bandwidth terminology to transfers per second; explained GOPS versus TOPS and TDP terminology. Added hardware to the execution reading path, corrected plural table counts and linked equation references. Documented explicit component imports and SourceFigure text exports, and included the two hardware diagrams in the consolidated figure notice. No broad restructuring or new hardware benchmark was needed.

Spot checks reconfirmed the A20 Pro disclosure, DGX Spark configuration and TDP/supply distinction, Orin's dense/sparse table versus older introduction, and the ExecuTorch profiling scope. These were partial rechecks, not a refresh of every mutable source. Earlier source inspection dates and evidence cutoffs remain visible.

### Completed checks

Production-origin full validation passed: 49 deployment tests, 159 content tests, Astro with zero diagnostics, 96-page build and 96 lint-clean documents. A clean Git-eligible copy passed npm ci and the same full validation. Research tools: 27 tests passed; npm audit reported zero vulnerabilities. Deployment origin and Wrangler dry-run packaging passed without upload.

Actual production preview on port 4327: 12 pages at 1440/390/320 pixels in light/dark (72 views), 24 keyboard Focus checks, image decoding, no document overflow, sequential anchors, keyboard panning and no console errors. Selected source/native figure screenshots manually inspected. The catalog passed keyword, empty-result and reset tests; all rows remained without JavaScript. Existing Model Deep Dives artwork switches to exactly one matching theme image and prints the light image. Canonical URLs and editor/unknown-route HTTP 404 boundaries passed.

All 12 complete Markdown/MDX exports checked: source images, captions, descriptions, figure/equation anchors, TeX, references and every flow step/note remain. Hardware catalog, roadmap and software-path rows survive exports and no-JavaScript reading. Actual search and root/section discovery passed.

Earlier original-artwork reviews remain applicable to unchanged source bytes. Figure reuse assessments retain their stated contextual limits; they are not blanket artwork licenses or legal guarantees. Selected excerpts retain attribution and remain outside the MIT grant. No full downloaded paper enters the release.

### Publication boundary

Local HEAD and remote main matched baseline 1cde75f99c18b40292052075e7eb21b40b133de4 when checked. No files were staged, committed, pushed or uploaded. Authorization to push main would also authorize the configured Cloudflare production build. After an authorized release, check both GitHub validation and Workers Builds, then verify the live new pages and their exports against the matching build.

Existing Vite MDX-directive warnings and Pagefind skips for 25 redirect documents remain. They do not prevent the validated static build. No dependency version, script-approval policy, production binding or unrelated content was changed. Device-specific performance remains an empirical follow-up, not an unreported measurement.
