# Latent Light working instructions

This file is the agent entry point. Detailed guidance lives in the About source
pages. Read those files directly. A running site is not required.

## Before changes

1. Run `git status --short`. Preserve unrelated work.
2. Read [README.md](./README.md) for setup and project orientation.
3. Read [About Latent Light](./src/content/docs/about/index.mdx) for purpose and philosophy.
4. Read [How this site is built](./src/content/docs/about/framework.mdx) for the shared workflow.
5. Read each guide that applies to the task:
   - [Content standards](./src/content/docs/about/content-standards.mdx) for writing, research, and media.
   - [Development guide](./src/content/docs/about/development-guide.mdx) for pages, components, styles, and exports.
   - [Maintenance and upgrades](./src/content/docs/about/maintenance.mdx) for validation, dependencies, upgrades, and publication.

Edit the About source pages when guidance changes. Do not duplicate detailed
guidance in this file or README.md. Configuration and package files define the
installed implementation. Correct the guidance if it no longer matches them.

## Essential boundaries

- Do not commit, push, create a GitHub repository, or deploy without explicit user authorization.
- Treat commit, push, and deployment as separate actions that require authorization.
- Use local port 4327. Do not interrupt other projects or their servers.
- Never add secrets, private conversations, employer confidential material, or assets without suitable usage rights.
- Review files under `public/` as publication material. Hidden pages and Git history are not private storage.
- Edit source files, not generated output or dependency files.
- Keep Nimbus pinned. Read the maintenance guide before changing dependencies.
- Do not remove `<AgentDirective />` or weaken the local editor's access controls.

## Before handoff

Run `npm run validate` after completed site changes. Check desktop and mobile
rendering. Check Markdown exports for content changes. Check keyboard use,
reduced motion, search, and relevant agent endpoints when the task affects them.

Run `git diff --check`. Review `git status --short`. Report unresolved failures,
existing warnings, and unrelated changes. Do not change unrelated work.
