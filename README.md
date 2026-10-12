<p align="center">
  <a href="https://latentlit.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/brand/logo-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="public/brand/logo-light.png">
      <img src="public/brand/logo-light.png" alt="Latent Light spectral aperture logo" width="128" height="128">
    </picture>
  </a>
</p>

<h1 align="center">Latent Light</h1>

<p align="center"><em>Seeing deeper. Thinking wider.</em></p>

<p align="center">
  <strong><a href="https://latentlit.com">https://latentlit.com</a></strong>
  <br>
  <sub>Read the public notebook</sub>
</p>

A personal notebook exploring AI, products, and human potential. Built for my
own learning and shared with anyone who finds it useful.

## Project guidance

About contains the site's purpose, framework, development, and maintenance guides.
Its Content Guidance group collects writing standards and study workflows. The
same source files serve website readers and coding agents:

- [About Latent Light](src/content/docs/about/index.mdx): purpose, topics, and philosophy.
- [How this site is built](src/content/docs/about/framework.mdx): reading experience and guidance overview.
- [Content standards](src/content/docs/about/content-guidance/content-standards.mdx): writing, evidence, and media.
- [Research workflow](src/content/docs/about/content-guidance/research-workflow.mdx): evidence, explanation, refinement, and one canonical output.
- [Model Deep Dive guide](src/content/docs/about/content-guidance/model-deep-dive-guide.mdx): model research, evidence, visuals, and review.
- [Page template](src/content/docs/about/content-guidance/model-deep-dive-template.mdx): a copyable MDX starter and rendering recipes.
- [Development guide](src/content/docs/about/development-guide.mdx): source structure and implementation conventions.
- [Maintenance and upgrades](src/content/docs/about/maintenance.mdx): checks, Nimbus updates, and publication.

Coding agents start with [AGENTS.md](AGENTS.md). Detailed guidance belongs in
the applicable page sources, not parallel copies in repository documents.

The repo-local [latent-light-deep-research skill](.agents/skills/latent-light-deep-research/SKILL.md)
coordinates substantial research. Its instructions, references, Python tools, and
tests are versioned with the site; no global installation is needed. Site pages
are the canonical explanation, while research records preserve the evidence.

## Local development

Use the Node.js version in `.node-version` and npm. Select that version with
your version manager before running commands. From this directory:

```bash
npm ci
npm run dev
```

Open <http://localhost:4327>. Use this port without interrupting other projects.

```bash
npm run validate
npm run preview -- --port 4327
```

Stop the dev server before using preview on the same port. Astro's background
server controls are `npx --no-install astro dev status` and
`npx --no-install astro dev stop`.

## Source orientation

- `src/content/docs/`: published pages, including About and its content guides.
- `src/content/partials/`: reusable content.
- `src/layouts/` and `src/components/`: reading layout and interface.
- `src/styles/`: shared styles and Latent Light additions.
- `astro.config.ts`: navigation, integrations, and site configuration.
- `public/`: assets included in the published build.
- `docs/branding/`: asset references and generation records.
- `docs/research/`: public-safe source, claim, visual, and review records.
- `.agents/skills/latent-light-deep-research/`: the versioned research workflow and tools.

For skill-tool changes, run `npm run test:research` with Python 3.10 or newer.
These isolated tests are separate from the Node-based site validation.

This site uses Astro and a pinned Nimbus dependency. Content is authored once
and exported as HTML, Markdown, and MDX. The public site is available at
<https://latentlit.com>. See
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for retained upstream notices.

The [publication readiness review](docs/publication-readiness.md) records local
checks, dependency security findings, and the first public deployment.

## License

Original code and writing, including pages and repository documentation, are
licensed under the [MIT License](LICENSE). For licensing purposes, original
writing forms part of this project's associated documentation.

The logo, avatar, favicon, and identity artwork in `public/brand/` and
`public/favicon.ico` are excluded from this MIT grant. No separate reuse license
is granted for these assets. Their inclusion does not grant trademark rights or
imply endorsement. Third party code, fonts, icons, and other material retain
their own licenses. Preserve the notices in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)
and `public/licenses/`.
