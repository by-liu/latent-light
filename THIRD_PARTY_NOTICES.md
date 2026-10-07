# Third-party notices

This site was scaffolded with Cloudflare Nimbus and retains modified Nimbus
layouts, components, and infrastructure. Nimbus is MIT licensed; the full notice
is preserved in `public/licenses/nimbus-MIT.txt`.

Inter is supplied by the starter and Fontsource under the SIL Open Font License
1.1. Its notice is preserved in `public/licenses/inter-OFL.txt`.
JetBrains Mono is distributed through Fontsource under the SIL Open Font License
1.1; its notice is in `public/licenses/jetbrains-mono-OFL.txt`.

KaTeX typesets equations at build time. Its CSS and bundled fonts are served
locally under the MIT license retained in `public/licenses/katex-MIT.txt`.
No client side math renderer or external font service is required.

Phosphor Icons is MIT licensed. Its notice is preserved in
`public/licenses/phosphor-MIT.txt`. The installed icon collection records
Phosphor core version 2.1.1 and its upstream license in package metadata.

Browser code and search assets also retain these notices:

- Astro and its internal helpers: `public/licenses/astro-MIT.txt`
- clsx: `public/licenses/clsx-MIT.txt`
- tailwind-merge: `public/licenses/tailwind-merge-MIT.txt`
- Pagefind: `public/licenses/pagefind-MIT.txt`
- Tailwind CSS: `public/licenses/tailwindcss-MIT.txt`

These notices also enter the static deployment. Package dependencies retain
their own licenses in the installed packages. This document does not grant
rights to dependencies beyond their own terms.

Identity assets and their known provenance are recorded in
`docs/branding/identity.md`. Avatar prompts and their portrait reference are
recorded separately in `docs/branding/`. These AI generated assets are not a
cleared trademark and do not imply endorsement by artistic inspirations.

Latent Light's original code and writing use the MIT license in `LICENSE`.
The [README license section](README.md#license) defines its scope and exclusions.
The website carries the same notice in `public/licenses/latent-light-MIT.txt`.
This grant does not replace any upstream license or license the identity artwork
in `public/brand/` and `public/favicon.ico`. Preserve these notices when reusing
third party material.

## Annotated Transformer and paper figures

Transformer Foundations adapts selected teaching code from Harvard NLP's
[Annotated Transformer](https://github.com/harvardnlp/annotated-transformer/tree/debc9fd747bb2123160a98046ad1c2d4da44a567),
commit `debc9fd747bb2123160a98046ad1c2d4da44a567`. Its MIT license, copyright
2018 Alexander Rush, is retained in `public/licenses/annotated-transformer-MIT.txt`.
The snippets are condensed or renamed and mark substantive teaching changes.

The two paper figures under `public/figures/transformer-foundations/` retain
their own terms: Figure 1 of Attention Is All You Need uses the paper's explicit
scholarly/journalistic reproduction permission; Figure 2 of GQA is CC BY 4.0.
See `public/licenses/transformer-foundations-figures.txt` and the source record
in `docs/research/architectures/transformer-foundations.md`. They are excluded
from Latent Light's MIT grant.
