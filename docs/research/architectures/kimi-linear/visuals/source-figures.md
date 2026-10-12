# Source figure audit: kimi-linear

Checked 2026-10-10. Canonical report revision 2.

## Selection and rights

Official repository report edition and matching figures/arch.png are associated documentation under MIT LICENSE with no report/asset exclusion. Exact same Figure3 architecture visually checked against arXiv v1. Use MIT documentation grant, not infer from model card, and not relicense arXiv NC/ND edition.

## Extraction and inspection

Poppler pdftoppm: render only the cited PDF page with scale-to 3500, crop coordinates proportionally scaled from the inspected 1500px page render. Crop includes the entire figure artwork, labels, panel headings and legends; removes surrounding prose/caption/whitespace only. No recoloring, redrawing or annotations. Every resulting image inspected visually against the full page.

### Page Figure 1

- Source: https://raw.githubusercontent.com/MoonshotAI/Kimi-Linear/8c1d85eb6b5f8fcefb15758691b0ce50b0827ce3/tech_report.pdf
- Source locator: Figure 3, PDF page 6
- Grant: MIT; https://github.com/MoonshotAI/Kimi-Linear/blob/8c1d85eb6b5f8fcefb15758691b0ce50b0827ce3/LICENSE
- Published asset: public/figures/model-studies/kimi-linear/architecture.png
- Pixel size: 1566 × 1563
- SHA-256: 1fce544a3c004b70913d343dfaa3fd4e9aa5beb98d9547098df78c2692a8f8da
- Crop on 1500px page: [251,147,671,670]
- Changes: surrounding prose/caption removed, entire artwork and labels unchanged.
- Browser review: pending parent; source image manual check passed.


## Limits

No model executed. Previous browser review does not attest the revised figure layout. Full PDFs remain outside the public repository. Exact source grants are separate from the site's MIT license.



## Revision 3 additions

Added an independent causal chunk/interchunk-state diagram, WY/UT details, constrained DPLR savings, explicit kernel complexity and local fast-memory learning interpretation; sharpened hybrid-ratio generalization/runtime tradeoff.

### Independent SVG: chunk-computation.svg

KDA receives a state from the previous chunk, computes causal interactions within the current chunk in parallel, combines both contributions for outputs, and passes an updated state to the next chunk

No source layout traced or paper artwork copied. Code-native diagram based on cited scientific facts; local raster rendering inspected and refined. SHA256: 36f40384ac09c31f36215d89e76f4a690e10a54785a776854d30b3a28ad05634. Fresh browser QA pending root.
