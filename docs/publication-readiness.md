# Publication readiness review

Reviewed: October 2, 2026
Repository cleanup: October 3, 2026
License and publication decisions: October 3, 2026
Scope: the local Latent Light repository and its static build.
Status: source publication and automatic production deployment are complete.
The user approved the documented security assessment and explicitly authorized
the release pushes. Automatic deployment was verified on October 3, 2026.

This is a review record, not a second development guide. The authoritative
release and recovery procedures are in
[Maintenance and upgrades](../src/content/docs/about/maintenance.mdx).
Cloudflare Workers Static Assets hosts the published site.
The separate planning draft was archived after its release checks became part
of the shared maintenance guide. Automatic deployment is active and verified.

## Public suitability

The review inspected the six published source pages, repository guidance,
configuration, public asset inventory, branding records, and generated output.
The content is introductory material and shared development guidance. No career
archive or private interview material was imported from Eclipse.

The author's name, personal site link, and cartoon avatar are deliberate parts
of the homepage. The avatar references the author's public portrait. Identity
assets are AI generated. Their available provenance is recorded under
`docs/branding/`. Exact historical prompts for the logos and decorative artwork
were not preserved. This gap is explicit rather than filled with invented prompts.

Automated scans checked candidate files and built output for common credential
patterns, private employer identifiers, and local filesystem paths. They found
no matches. The PNG assets contained no text or EXIF metadata chunks requiring
review. These checks supplement manual review. They are not a comprehensive
secret detector or a legal certification.

At the start of the review, Git had no commits or remotes. Its object check found
no unreachable history. All initial source files were untracked. The first
commit requires review of the complete staged change, not only ordinary `git diff`.

Environment exclusions passed for 12 representative paths, including preview
and staging files. The root `.env.example` contains only a placeholder origin.
All lockfile download addresses use the public npm registry. Installed package
versions match the lockfile. No dependency versions changed during this review.

## Assets and licenses

Nimbus and font notices remain intact. Additional notices now cover Phosphor
Icons, Astro and its internal helpers, clsx, tailwind-merge, Tailwind CSS, and
Pagefind in the deployed license directory. See
[THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md).

On October 3, the user approved MIT for original code and writing. The standard
license text is in [LICENSE](../LICENSE). The [README](../README.md#license)
defines original writing as associated documentation and specifies exclusions.
The logo, avatar, favicon, and identity artwork are excluded. Third party
material retains its own terms. The website carries the author's MIT notice
in `public/licenses/latent-light-MIT.txt`. About links to the canonical license
file in the GitHub repository.

The earlier unused avatar, landscape image, and obsolete avatar record were
moved to a local archive outside the repository on October 3. They remain
recoverable but will not enter GitHub or the website deployment. Current asset
provenance and exact cartoon avatar prompts remain in `docs/branding/`.
Root `docs/` remains part of the public repository, not a website
content collection. It holds provenance and this release review, not duplicate
development guidance.

## Dependency security finding

`npm audit` reported five high severity entries, all derived from
`http-cache-semantics` 4.2.0 through Astro. There were no critical entries.
The registry's latest release was 4.2.0. The inspected advisory lists no patched
version: [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp).

The advisory describes disclosure of responses between users of a shared cache
when a client supplies `max-stale`. Inspection of installed Astro code found
the dependency in remote image caching under `astro/dist/assets/build/remote.js`.
The current site uses local image assets and a static build. No Astro server or
this Node dependency enters the published browser output. The configured
Cloudflare deployment serves static assets without a custom Worker script.

Assessment: the described shared application cache is not part of this site's
current production design. This limits exposure for this build. It does not
resolve the package advisory or establish that the dependency is generally safe.
Reassess before introducing request rendering, authenticated remote image
fetches, shared application caches, or a publicly exposed development server.

No `npm audit fix` ran. Its suggested remedies include major downgrades of Astro
and Nimbus rather than a patched transitive release. Keep the finding visible.
Review an upstream fix when available. Obtain user approval for the documented
security assessment before deploying with this unresolved advisory.

## Validation results

- Deployment guard: all 41 tests passed.
- Astro checks: 104 files, zero errors and zero warnings.
- Nimbus content lint: passed.
- Production build: passed, six content pages indexed for search.
- Nimbus structural check: zero errors and warnings, but status remains partial.
  It cannot statically evaluate the environment dependent `site` value.
- Production editor: absent from generated output. Its preview API returns 404.
- Desktop and mobile: all six pages checked at 1440 and 390 pixel widths.
- Production search: the recovery query returns the Maintenance page.
- HTML metadata and generated social images: checked against the local origin.
- Markdown and MDX: all page exports available. The updated Maintenance bodies
  match their source. Agent indexes include the new recovery guidance.
- Missing route: local production preview returns 404.
- Redirect: the generated Cloudflare rule points `/about/philosophy` to
  `/about/#how-i-approach-learning` with status 301.
- License assets: available in the local production preview.
- Reading controls: collapse, restore, focus, keyboard use, persistence, mobile
  drawer, and reduced motion passed in the local production preview.
- Whitespace and source status: checked without staging files. The standard
  diff check passed. A separate check of untracked files found existing whitespace
  in `LinkButton.astro`, `MobileTOC.astro`, and `globals.css`. Those starter files
  were preserved. No new whitespace findings came from this revision.

Existing build warnings remain: Vite warns about MDX `use astro:head-inject`
directives. Pagefind skips the generated philosophy redirect because it lacks
an outer HTML element. The actual content pages are indexed.

The initial local review used localhost. The first public deployment rebuilt
with the approved `SITE_URL`. Its public checks are recorded below.

## Approved source publication

The user confirmed `by-liu` as the owner of the public `latent-light` repository.
The GitHub CLI account was checked against that username. On October 3, the
user authorized applying the agreed license, creating the public repository,
making the initial commit, and pushing the reviewed source.

Target repository: `https://github.com/by-liu/latent-light`.
This initial authorization did not include website deployment or automatic publication.
The user subsequently approved the security assessment, separately authorized
the first website deployment, and authorized the pushes used to verify automatic deployment.
The release records below distinguish those actions.

## First public deployment

Deployed and checked: October 3, 2026.

- Production origin: `https://latentlit.com`.
- Cloudflare Worker: `latent-light`, serving static assets on the custom domain.
- Worker version: `d07c9e67-4dcc-4b8b-b52b-a1daf76d026d`.
- Source baseline: `e65b53142e0646ca839d724484b0fbd8a6397636`, plus the
  uncommitted domain configuration in `wrangler.jsonc` and release instructions
  in `src/content/docs/about/maintenance.mdx`. No new commit or push occurred.
- Tools: Node 25.2.1, Astro 7.3.1, Nimbus 0.15.2, Wrangler 4.146.0.
- Command: `SITE_URL=https://latentlit.com mise exec -- npm run deploy`, with the
  verified Cloudflare account selected in the process environment.
- Validation: 41 guard tests passed, 104 Astro files checked without errors or
  warnings, seven files lint clean, and the static build passed.
- Upload: 107 assets. No paid service or automatic deployment was enabled.
- Public checks: all six content pages, canonical and social image URLs,
  sitemap, robots file, root and section agent indexes, and Markdown and MDX
  exports passed. Branding and tested social images matched local build hashes.
- Browser checks: all six pages rendered at 1440 and 390 pixel widths without
  horizontal overflow, broken images, JavaScript errors, or asset errors.
  Search, theme switching and persistence, sidebar controls, keyboard restoration,
  focus persistence, reduced motion, and mobile navigation passed.
- Routes: `/about/philosophy` returns HTTP 301 to the intended About anchor.
  Its trailing slash variant uses Astro's HTML redirect and reaches the same
  anchor in the browser. Unknown routes and the source editor endpoint return 404.
- HTTPS: the public checks used normal certificate validation. Plain HTTP also
  currently serves the public site; an enforced HTTPS redirect was not configured.
- Initial requests briefly returned HTTP 500 immediately after deployment.
  Subsequent HTTP and browser checks passed without a code change.

The documented dependency advisory remains unresolved and accepted for this
static deployment. Reassess it before changing the production architecture.
Existing Vite directive warnings and the Pagefind redirect notice remain.
There is no earlier Worker version to restore for this first deployment.

## Automatic deployment preparation

Prepared: October 3, 2026. The user authorized preparing the proposed workflow
and its documentation, then explicitly authorized committing and pushing the
reviewed changes. At the preparation checkpoint, GitHub workflow execution and
branch protection remained pending source publication. Cloudflare activation
required a separate browser setup step, completed before the verified release below.

The repository contains a GitHub validation workflow with read access only,
no deployment credentials, and action references pinned to official commit identifiers.
Node 24.21.0 is pinned in `.node-version`. A clean lockfile installation and full
validation passed under that version in an isolated temporary directory.
All 48 deployment tests passed. Astro checked 106 files without errors or warnings.
Content lint and the production build passed. The updated guides rendered at
1440 and 390 pixel widths. Markdown and MDX retained the setup instructions.
Deployment tests now include public verification and credential isolation checks.
The existing dependency advisory remains visible in installation output.

The new `postdeploy` command checks the live pages and agent exports against the
matching build. A failed public check does not reverse an upload. The updated
Maintenance guide describes failure handling, recovery, and exact build settings.
The README now links prominently to the public website.

The Wrangler OAuth session can deploy Workers but receives HTTP 403 from the
Builds configuration API. Verification therefore used GitHub check results,
the Worker deployments API, and public site checks. No deployment credentials
belong in GitHub pull request jobs.

## Automatic deployment verification

Verified: October 3, 2026, in America/Vancouver.
Deployment time: October 4, 2026, at 00:49:24 UTC, or October 3 at 17:49:24 PDT.

- Production origin: `https://latentlit.com`.
- Source commit: [`15841ae7178258aaedb05135fe0d030f363bb7c9`](https://github.com/by-liu/latent-light/commit/15841ae7178258aaedb05135fe0d030f363bb7c9).
- Cloudflare Worker: `latent-light`.
- Active Worker version: `cae82026-2ba5-45bc-80ef-c66caebe9c15`, serving 100 percent of traffic.
- Previous working version: `d07c9e67-4dcc-4b8b-b52b-a1daf76d026d`, recorded in the first deployment above.
- Trigger: an explicitly authorized push of the README URL improvement to `main`.
  Cloudflare deployed through Workers Builds. No manual deployment command ran.
- Build commands: `npm ci`, then `npm run deploy`, including validation before
  upload and the public verification step afterward.
- Local verification tools: Node 24.21.0, Astro 7.3.1, Nimbus 0.15.2, Wrangler 4.146.0.
- GitHub results: **Validate site** and **Workers Builds: latent-light** both passed.
  The [GitHub validation run](https://github.com/by-liu/latent-light/actions/runs/37166073547)
  completed successfully.
- Local validation: all 48 deployment tests passed, 106 Astro files checked without
  errors or warnings, seven files lint clean, and the production build passed.
- Public verification: tested HTML pages, agent indexes, and Maintenance Markdown
  and MDX exports matched the local build. Tested HTML canonical URLs were correct.
  The source editor endpoint and an unknown route returned HTTP 404.
- Browser verification: the public homepage rendered at 1440 and 390 pixel widths
  in both light and dark themes. The new GitHub link was visible, used the correct
  repository URL, and accepted keyboard focus. No public editor controls,
  document overflow, or JavaScript errors were found.

Before the successful push, Cloudflare showed a disconnected Git account warning.
The user updated the GitHub App configuration and confirmed that the warning disappeared.
The next authorized push produced the successful Cloudflare build and new active version.

Branch protection remains unconfigured; the GitHub branch protection API returned HTTP 404.
Requiring validation before pull request merges is a recommendation, not an enforced rule.
The existing dependency advisory and build warnings remain unchanged.
