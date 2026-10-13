# SmolVLM figure source and extraction record

Reviewed October 12, 2026 local time. Full PDFs remain temporary study copies outside the repository. This record covers only the listed excerpts and intended article discussion.

## Exact source

- Authors: Andrés Marafioti, Orr Zohar, Miquel Farré, Merve Noyan, Elie Bakouch, Pedro Cuenca, Cyril Zakka, Loubna Ben Allal, Anton Lozhkov, Nouamane Tazi, Vaibhav Srivastav, Joshua Lochner, Hugo Larcher, Mathieu Morlon, Lewis Tunstall, Leandro von Werra and Thomas Wolf.
- Title: *SmolVLM: Redefining small and efficient multimodal models*.
- Edition: arXiv:2504.05299v1, April 7, 2025; 20 pages, 612 by 792 PDF points per page.
- Source PDF: https://arxiv.org/pdf/2504.05299v1
- Source HTML and declared license: https://arxiv.org/html/2504.05299v1
- PDF SHA-256: `f7ce27035593961fdd6bf6b41c371ef3dddb926d7e417cf275752df869ca8569`
- Temporary study filename: `smolvlm-2504.05299v1.pdf`; no complete PDF is committed or deployed.

## Excerpts

| Asset | Original location | Crop at 300 dpi, top-left origin | Output | SHA-256 |
| --- | --- | --- | --- | --- |
| smolvlm-architecture.webp | Figure 2, PDF page 2 | x=390, y=245, width=1810, height=745 pixels | 1810 by 745, lossless WebP | ed76402b7c321bac4d318e1026839809eb74ea4ffa1964c747e4d62fd2767d5d |
| smolvlm-pixel-shuffle.webp | Figure 4, PDF page 4 | x=290, y=265, width=1980, height=460 pixels | 1980 by 460, lossless WebP | 32375187773fa84807bb5022b6b8bd14441a897bd38b358b282af4ac99ec34f5 |

Extraction uses Poppler `pdftoppm -r 300` with page and crop flags, followed by ImageMagick lossless WebP encoding. Only surrounding whitespace, caption and page text are omitted. The figures retain all diagram nodes, arrows, labels, shapes and illustrated examples without recoloring, relabeling or combining panels. Rendered pages and final crops were visually inspected; a partial source caption in the first architecture crop was removed by tightening its bottom boundary.

## Teaching purpose and reuse basis

The architecture is discussed as the exact original route through view creation, visual encoding, rearrangement, projection, tokenization and language computation. Pixel shuffle is discussed separately as a change in tensor geometry, including the difference between rearrangement and later learned projection. These are two different teaching functions, not repeated decoration.

Primary basis: the inspected report explicitly declares CC BY 4.0. Captions name the authors/report and edition, link the source and license, and disclose unchanged crops. The license applies to licensed report material; it is not treated as a trademark grant or a blanket clearance of separately owned artwork.

Embedded-artwork review: both figures contain Hugging Face identity imagery, and Figure 2 also includes a SmolLM2 mascot. The report's authors include Hugging Face contributors, but independent underlying artwork ownership was not conclusively established. For any independently owned embedded image, the additional editorial basis is a narrow criticism/review assessment: its exact role in the original splitting and feature-rearrangement example is discussed; it remains inside the original technical figure; no identity artwork is extracted for standalone branding; no endorsement is suggested. The full illustrated technical figure is retained because removing the input/content would disrupt the precise comparison being reviewed. Public site and public GitHub distribution are considered. A new independent diagram would explain generic geometry but would not preserve the particular source mechanism and its illustrative limitations. No evidence was found in the inspected material of a separate licensing market harmed by this limited technical review; that is not proof that none exists.

This is a scoped editorial assessment informed by the repository's figure-reuse standard and [Canada Copyright Act section 29.1](https://laws-lois.justice.gc.ca/eng/acts/c-42/Section-29.1.html), inspected for the criticism/review attribution requirement. It is not legal assurance or a general license to reuse the artwork elsewhere. Reassess if context or distribution materially changes. Author copyright and any applicable third-party rights remain intact.
