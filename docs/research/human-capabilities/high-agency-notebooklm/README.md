# High agency expanded source edition

This is the standalone source requested for a podcast or video, distinct from
the shorter canonical website article. Edit [report.md](report.md), then render
the derivative with [build_pdf.py](build_pdf.py).

The deliverable is
[the source PDF](../../../../output/pdf/high-agency-notebooklm-source.pdf).
It contains selectable text, a linked contents page, bookmarks, 18 numbered
references, the accepted overview illustration, two vector diagrams, and an
optional editorial production brief. Version 2 adds inline research methods,
complete study context, a filled practice record and a source-only exercise.
References are optional verification and attribution; no external retrieval is
needed to understand the declared topic. The report uses native Markdown footnotes.

## Rebuild

Use Python 3 with `reportlab`, `markdown`, and `pillow` installed. The renderer
expects the Noto Sans and Noto Serif TTF files under `/usr/share/fonts/noto/`.
It prints the resulting page, reference, citation, and section metadata.

```bash
python3 docs/research/human-capabilities/high-agency-notebooklm/build_pdf.py
```

Run from the repository root or any directory. The default output resolves from
the script's location. `--output PATH` selects another destination.

For independent checks, use Poppler, `pypdf`, and `pdfplumber`. Render the PDF
and inspect every page after changes; text extraction alone cannot verify layout.

## Provenance and scope

The source ledger retains the existing page's actual inspection dates and adds
two foundational sources on autonomous motivation and goal adjustment. It does
not claim to refresh every mutable fact or review every available AI system.
Historical GPT-4 studies are identified as such. The report is a narrative
synthesis, not a systematic review.

Figure 1 reuses the generated
[overview](../high-agency/visuals/overview-v3.png) and its existing
[prompt](../high-agency/visuals/overview-v3-prompt.txt) and
[provenance record](../high-agency/visuals/overview-v3-generation.md).
Figures 2 and 3 are independent diagrams drawn by the renderer. No published
paper artwork or complete paper is reproduced.

The embedded Noto Sans and Noto Serif subsets retain their original names.
The fonts' own name tables identify Copyright 2022 The Noto Project Authors,
<https://github.com/notofonts/latin-greek-cyrillic>, and SIL Open Font License 1.1,
<https://scripts.sil.org/OFL>. These are font terms, not the license for original
Latent Light writing.

The task creates a local PDF and retained source. It does not upload to NotebookLM,
generate media, modify the website, or authorize publication.
