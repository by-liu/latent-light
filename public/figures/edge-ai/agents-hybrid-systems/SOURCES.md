# RAG mechanism source and reuse assessment

Reviewed October 12, 2026 local time. Full source PDFs remain temporary local study files and are not committed or deployed.

## Exact source and extraction

- Authors: Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel and Douwe Kiela.
- Title: *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*.
- Edition: NeurIPS 2020 paper, arXiv:2005.11401v4 revision of April 12, 2021; 19 pages, 612 by 792 PDF points.
- Source PDF: https://arxiv.org/pdf/2005.11401v4
- Original location: Figure 1, PDF page 2.
- PDF SHA-256: `23e3249e9a1e75418d82efecab0ea8c4d033b89c93742f63208d47ce01f21233`
- Temporary study filename: `rag-2005.11401v4.pdf`; outside the repository.
- Output: `rag-mechanism.webp`, 1720 by 510 pixels, lossless WebP.
- Output SHA-256: `095761d775e4003c26db2bb64fffe184d00bdd51407739c719cabfd883960d19`
- Extraction: Poppler `pdftoppm -f 2 -l 2 -r 300 -x 420 -y 275 -W 1720 -H 510 -singlefile -png`; lossless WebP with ImageMagick. Pixel crop uses a top-left origin.
- Changes: surrounding caption/page prose/whitespace omitted; all mechanism nodes, example inputs/outputs, original notation, retrieval arrows and dashed training arrow retained. No recoloring or relabeling.
- Inspection: source page and final crop visually inspected; no clipped labels or introduced imagery.

## Specific criticism/review assessment

The paper declares arXiv's nonexclusive distribution license. That license does not establish downstream artwork permission, and no CC license or separate permission was found in the inspected source. The basis used here is a scoped criticism/review assessment under the repository standard, not attribution alone.

- Purpose: the article reviews the original learned retriever/generator and marginalization mechanism and contrasts it with a local retrieve-and-prompt application. It explicitly identifies the dashed training arrow, MIPS retrieval and candidate combination instead of treating any local vector search as the same model.
- Character and distribution: a public learning notebook and its public source repository; educational explanation and substantive technical review, with author/source attribution beside the figure and a direct original report link. Public distribution is considered rather than being treated as private study.
- Amount: one complete original mechanism figure. A figure can itself be a complete work; fairness is not inferred merely from its being one of 19 pages. The complete route and example columns preserve what the original predicts, what it retrieves and what is trained. Other plots, tables, pages and paper prose are not reproduced.
- Alternatives: a new diagram would teach a generic retrieval path but would lose the exact original notation, candidate marginalization and historical training arrow that the comparison critically examines. Linking alone would make the article's side-by-side conceptual distinction harder to follow. The text retains a complete meaning for readers who cannot use the image.
- Nature: a publicly accessible technical research paper and mechanism illustration, used to understand and assess its method. This does not place it in the public domain.
- Likely effect: the excerpt directs readers to the full paper and does not substitute for its method details or results. No specific figure licensing market was identified from the inspected source, but absence of observed evidence is not proof of no market. No claim of the authors' endorsement is made.
- Third-party material: no photographs, screenshot, unrelated brand mark or separately credited artwork appears in the reviewed crop. The document/example labels remain as part of the authors' technical argument.
- Remaining uncertainty: this is an editorial assessment, not a license grant, legal opinion or assurance for every jurisdiction. Reassess before materially different distribution, promotion or reuse; seek permission or replace the excerpt if the basis becomes doubtful.

The [Canada Copyright Act section 29.1](https://laws-lois.justice.gc.ca/eng/acts/c-42/Section-29.1.html) was inspected for the criticism/review attribution requirement. The source and named authors are identified in the article caption, footnote and this record. The crop remains excluded from Latent Light's MIT grant.
