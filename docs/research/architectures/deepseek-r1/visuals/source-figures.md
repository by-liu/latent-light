# Source figure audit: deepseek-r1

Checked 2026-10-10. Canonical report revision 2.

## Selection and rights

Later peer reviewed Nature article explicitly licenses article images under CC BY 4.0 unless separately credited; Figure 2 has no exclusion. © The Author(s) 2025 retained through caption reference and notice. Full unaltered Figure2 crop, not January arXiv reuse.

## Extraction and inspection

Poppler pdftoppm: render only the cited PDF page with scale-to 3500, crop coordinates proportionally scaled from the inspected 1500px page render. Crop includes the entire figure artwork, labels, panel headings and legends; removes surrounding prose/caption/whitespace only. No recoloring, redrawing or annotations. Every resulting image inspected visually against the full page.

### Page Figure 1

- Source: https://www.nature.com/articles/s41586-025-09422-z.pdf
- Source locator: Figure 2, journal page 635 / PDF page 3
- Grant: CC BY 4.0; https://creativecommons.org/licenses/by/4.0/
- Published asset: public/figures/model-studies/deepseek-r1/training-pipeline.png
- Pixel size: 1988 × 968
- SHA-256: a4f92c89d72b79a2644e75efb5e0a8724f90691e567602d2975bb07fd9b52ed9
- Crop on 1500px page: [140,960,852,415]
- Changes: surrounding prose/caption removed, entire artwork and labels unchanged.
- Browser review: pending parent; source image manual check passed.


## Limits

No model executed. Previous browser review does not attest the revised figure layout. Full PDFs remain outside the public repository. Exact source grants are separate from the site's MIT license.



## Revision 3 additions

Added a three-policy GRPO mechanism illustration and original response-level surrogate; separated reward models from omitted critic; expanded unsuccessful process-reward/MCTS experiments and identified asynchronous software evaluation as future work.

### Independent SVG: grpo-policies.svg

GRPO samples responses with the old policy, forms group advantages from rewards, compares the current policy to old and reference policies, then updates it

No source layout traced or paper artwork copied. Code-native diagram based on cited scientific facts; local raster rendering inspected and refined. SHA256: a96272aebb1cee4a3393ecece5ec9b1f84b242214e657e571d84ab325a4d9440. Fresh browser QA pending root.
