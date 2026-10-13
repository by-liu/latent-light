# Efficient inference figure provenance

Reviewed 2026-10-13T04:53:45Z. Full source PDFs were downloaded only to temporary storage and are not tracked or deployed. No existing inspected local asset matched these figures.

## FlashAttention memory hierarchy and tiling

- Authors: Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra and Christopher Re.
- Source: [NeurIPS 2022 conference edition](https://papers.neurips.cc/paper_files/paper/2022/file/67d57c32e20fd0a7a302cb81d36e40d5-Paper-Conference.pdf), Figure 1, page 2.
- Original PDF SHA256: 315f252a8c791dd051ae84b531e4549465279c2a7264606a9cfe1f3495d9dfc8.
- Asset: flashattention-tiling.png; SHA256 954ec835066e2511f5ee56c0b932b828cf08c95cb5344e27c8c0bd7f64d60ca3; 1220×685 pixels.
- Extraction: Poppler pdftoppm, page 2 at 300 dpi, crop x420 y265 width1220 height685. The original hierarchy and tiling panels are intact; the source performance plot and original prose caption are omitted. No relabeling, recoloring or measured data changes.
- Third-party review: selected panels contain the authors' technical schematic, labels and source hardware example. No photographs, logos or separately credited artwork appear. The hardware numbers remain historical examples and are identified as such in the page.

### Specific criticism/review reuse assessment

No general downstream artwork license was established. NeurIPS's [copyright FAQ](https://neurips.cc/FAQ/Copyright) describes an author-to-publisher grant, not a public reuse license. The basis assessed here is Canadian criticism/review under [Copyright Act section29.1](https://laws-lois.justice.gc.ca/eng/acts/C-42/section-29.1.html), following the repository's Content standards and their contextual fairness guidance. This is an editorial assessment, not legal advice or a worldwide license.

Purpose: directly explain and critically delimit the original IO argument: SRAM tiling removes a particular HBM intermediate while dense attention and KV costs remain. Character: a public educational notebook and public-source GitHub distribution, including a standalone asset URL, are explicitly included. Amount: only two mechanism panels from one figure, no performance plot, surrounding prose or full paper; the complete selected panels are needed to retain arrows and matrix labels. Alternatives: a new diagram could convey generic tiling but would not permit close reading of the authors' exact loops and avoided matrix. Nature: a publicly distributed technical research paper. Likely effect: this excerpt accompanies analysis and links to the source; it cannot replace the paper, its algorithms, proofs or results and is not used as identity artwork or a commercial figure pack. Authors and source are attributed in caption, footnote and this record. No copied caption or separately credited material is included. Remaining uncertainty: fairness is contextual and jurisdictions differ; wider reuse, changed distribution or commercial packaging requires a fresh assessment or permission.

## Speculative decoding accepted-prefix trace

- Authors/copyright: Yaniv Leviathan, Matan Kalman and Yossi Matias, 2023.
- Source: [ICML 2023 paper](https://proceedings.mlr.press/v202/leviathan23a.html), PMLR202:19274–19286, Figure1, page2.
- Original PDF SHA256: b287adca11d8126e86dfd6facf162f74f2f6dcfefdef9130af7dde35b08e1d1d.
- Asset: speculative-three-iterations.png; SHA256 0732cd411249b2f041ec1dc8bce73a11a9f8d873c0c068c2251cf4e5d6aacca4; 1015×177 pixels.
- Extraction: Poppler page2, 300dpi, x225 y278 width1015 height177. First three iterations retained; remaining rows and prose caption omitted. Original colors and token underlining retained.
- License: [PMLR publication agreement](https://proceedings.mlr.press/pmlr-license-agreement.html), clauses2–4 grant [CC BY4.0](https://creativecommons.org/licenses/by/4.0/) for the published article and require attribution plus a link to the PMLR original. The page retains authors, title, proceedings, publisher link, license and cropping disclosure.
- Third-party exclusions: the short technical trace contains language-model output involving factual financial-news tokens, not photographs or separately credited artwork. Only the first three partial-prefix rows are used, not the complete generated sentence or the original caption. The article's license is not asserted to grant unrelated third-party rights.

Both reproduced excerpts are excluded from Latent Light's MIT grant. See NOTICE.md. Exact acquisition, crop and asset records are also retained in the research workspace's asset-provenance.json.
