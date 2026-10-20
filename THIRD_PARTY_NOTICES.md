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

## Model Deep Dive figures

Reproduced report figures under `public/figures/model-studies/` retain their
original attribution, copyright and applicable reuse terms. The consolidated notice is
[`public/licenses/model-deep-dive-figures.txt`](public/licenses/model-deep-dive-figures.txt).
It links per-asset notices and distinguishes CC BY 4.0, unchanged noncommercial
CC BY-NC-ND 4.0, MIT documentation grants and Kimi K3's custom license.
These figures are not relicensed by the project's MIT grant. Review the Kimi K2
figure rights before any monetization or adaptation. Full source editions,
extraction geometry and checksums are recorded in the research workspaces.

Selected Qwen3, Qwen2-VL, Qwen3-VL, Llama 3 and DeepSeek-V3 report figure
excerpts, plus the integrated LLaVA-1.5-HD figure, have case-specific Canadian
fair-dealing assessments in their per-model `SOURCES.md` records. No permissive
artwork grant is asserted for these exceptions, including embedded photographs
whose separate licenses are unknown. They remain excluded from the site MIT
license. Public access and citation alone are not reuse permission.

## Expanded model families, October 10, 2026

New report figures for gpt-oss, GLM/GLM-130B, GLM-4, GLM-4.5, GLM-V and
Gemma generations retain the exact edition CC BY 4.0 terms documented in each
per-model SOURCES.md. Integrated photographs/illustrations in GLM-V and Gemma4
have separate unresolved-origin caveats; the report license is not asserted to
cover unrelated third-party material.

New Qwen2.5, Qwen2.5-VL, Qwen2.5-1M, Qwen3.8-Flash-Next and MiniMax01/M1/M2/M3
report excerpts have specific bounded research/criticism assessments, not an
inferred artwork grant from code, weights or arXiv access. Qwen2.5-VL includes
integrated source samples whose separate rights are explicitly qualified.
Model weight licenses and public figure reuse bases are separate decisions.
See the consolidated figure notice for the exact per-asset records.

## Company explorer marks

Small company and product website icons in `public/company-icons/` identify
the subjects of the landscape reviews. They are third party marks, not Latent
Light artwork, and are excluded from the MIT grant. Ownership is retained by
the respective rights holders; no endorsement or trademark license is implied.
See [the asset notice](public/licenses/company-icons.txt) and the per-asset
source and bounded reuse assessments in `docs/branding/company-icons.json`.

## Document AI figures

Architecture and reward figures under `public/figures/document-ai/` retain their individual rights and are excluded from MIT. See `public/licenses/document-ai-figures.txt` for authorship, licenses, changes, report locators, checksums, and the scoped MinerU2.5 criticism/review assessment. The Hunyuan architecture-panel derivative retains CC BY-SA 4.0; the dots.mocr figure remains unchanged under CC BY-NC-ND 4.0.


## Agent study figures

The Pi and OpenCode documentation screenshots retain their repository MIT
notices. The ACE framework figure is reproduced from Zhang et al.,
*Agentic Context Engineering*, arXiv:2510.04618v3, original Figure 4, under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Images were converted
to WebP without cropping or content changes. See
[the retained notices](public/licenses/agent-study-figures.txt) and the
source-asset review in `docs/research/agents/frontier-refactor/visuals/`.

## High Agency audio and short videos

The author supplied three Google NotebookLM-generated clips for inclusion on
Latent Light. Poster excerpts preserve the complete frame and visible producer
mark. The imagery and narration are excluded from the site's MIT grant; no
separate public media license is asserted. See
[the media notice](public/licenses/high-agency-media.txt) and the exact source
and text-equivalent records in `docs/research/human-capabilities/high-agency/media/`.

The author supplied the complete NotebookLM-generated podcast for MP3 hosting
and article playback. Its original recording is unchanged; the audio and its
automatic text equivalent are also excluded from the site's MIT grant. The
same media notice and research records retain its exact source and review limits.

## Edge AI figures

Selected original paper and documentation figures under `public/figures/edge-ai/`
retain their own attribution and terms, and are not relicensed under MIT.
[The consolidated notice](public/licenses/edge-ai-figures.txt) distinguishes
CC BY 4.0 report excerpts, the unchanged BSD ExecuTorch diagram, and specific
criticism/review assessments for Roofline, FlashAttention, MLPerf Mobile and RAG.
Integrated SmolVLM identity artwork has a separate bounded review; the report
license is not treated as blanket third-party clearance. Each asset directory
retains exact editions, checksums, extraction changes and reuse limits.

Independent budget, memory-topology, processor-role, processor-boundary, timing
and model-readiness SVGs are
original MIT-licensed diagrams. The generated overview is an editorial map,
not source artwork or a measured result; its prompt and qualified rights review
are retained in the overview records. Complete source PDFs are not deployed.

## Knowledge Distillation figures

The ALM Figure 1 excerpt in `public/figures/knowledge-distillation/` retains
Minixhofer, Vulić and Ponti's CC BY-SA 4.0 terms. The Switch-KD Figure 2
excerpt retains Sun et al.'s original rights and a specific bounded
research/criticism assessment, not a permissive artwork grant. The reused Qwen3
figure retains its existing terms and source record. See the collection's
[source records](public/figures/knowledge-distillation/SOURCES.md) and
[notice](public/figures/knowledge-distillation/NOTICE.md) for exact editions,
changes, checksums, attribution and reuse boundaries. These source figures are
not under Latent Light's MIT grant. The independently authored transfer-map and
soft-target SVGs are original MIT-licensed material, not model measurements.

## Local and cloud collaboration figures

The Minions and Advisor Models original figure excerpts in
`public/figures/edge-ai/local-cloud-collaboration/` retain their authors'
copyright and CC BY 4.0 licenses. They are not under this project's MIT grant.
The [source record](public/figures/edge-ai/local-cloud-collaboration/SOURCES.md)
and [notice](public/figures/edge-ai/local-cloud-collaboration/NOTICE.md) retain
the exact editions, authors, crops, licenses and checksums. The overview SVG
and native workflow are independent, MIT-licensed explanatory syntheses.

The ScreenVLM architecture in
`public/figures/local-cloud-ai/cloud-agents-local-specialists/` reproduces
Gurbuz et al.'s arXiv v1 Figure 4 under CC BY 4.0, not this project's MIT grant.
Its [source record](public/figures/local-cloud-ai/cloud-agents-local-specialists/SOURCES.md)
and [notice](public/figures/local-cloud-ai/cloud-agents-local-specialists/NOTICE.md)
retain attribution, the exact image checksum and the bounded review of its
incidental webpage inset. The specialist-system SVG and native inspection
workflow are original MIT-licensed explanatory diagrams.

## DeepInfer release study

The three original architecture and benchmark figures in
`public/figures/inference/deepinfer/` are reproduced unchanged from DeepSeek-AI's
Apache-2.0 repository. They are not under this project's MIT grant. The
[source record](public/figures/inference/deepinfer/SOURCES.md) and
[notice](public/figures/inference/deepinfer/NOTICE.md) retain exact source
revisions, image checksums, attribution and scope. The complete
[Apache license](public/licenses/deepinfer-Apache-2.0.txt) is included.

Adapted protocol examples retain DeepSeek's
[MIT notice](public/licenses/deepseek-recipe-MIT.txt), copyright 2026 DeepSeek.
No tokenizer, checkpoint or complete model implementation is redistributed.
The bounded-replay and scheduling SVGs are original MIT-licensed explanations.
The overview PNG is an independent AI-generated explanatory synthesis with
its prompt and review retained in the research records. It is not DeepSeek
artwork or a measured result; original generated project artwork is offered
under MIT terms to the extent applicable.
