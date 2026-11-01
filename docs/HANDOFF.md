# Session handoff

Snapshot date: October 24, 2026, America/Vancouver.

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

- Commit: [39c15ba](https://github.com/by-liu/latent-light/commit/39c15ba4c7aafb8186e970611dddcaedb179053f).
- Branch: `main`.
- Public site: [latentlit.com](https://latentlit.com).
- Verification date: October 20, 2026. The website was not checked again for this handoff.
- GitHub validation and Cloudflare deployment passed.
- Cloudflare Worker: `latent-light`.
- Worker version: `ccecd16f-e391-4282-a7c3-8e7b717e9eca`, deployed at 100%.
- Local checks passed: 49 deployment tests, 176 content tests, Astro checks and content lint.
- Live HTML, Markdown, MDX and the overview image matched the reviewed build.
- Live desktop/mobile, both themes, Focus and search checks passed.
- Known Nimbus/Vite and old Pagefind redirect warnings remained.

The optional detailed release record is
`output/releases/2026-10-20-39c15ba.json`.
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

Commit 39c15ba contains the published application changes.
The handoff documentation and progress cleanup may remain uncommitted.
Check Git before changing or staging files.

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
