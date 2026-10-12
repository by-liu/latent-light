# Source figure audit: deepseek-v3

Checked 2026-10-10. Canonical report revision 2.

## Selection and rights

V3 arXiv v1 grants distribution only to arXiv. Its basic architecture is inherited from V2; reproduce the permitted V2 repository documentation figure with V2 attribution, not a V3 paper reuse claim. Generic figure has symbolic expert counts; V3 dimensions are supplied separately.

## Extraction and inspection

Poppler pdftoppm: render only the cited PDF page with scale-to 3500, crop coordinates proportionally scaled from the inspected 1500px page render. Crop includes the entire figure artwork, labels, panel headings and legends; removes surrounding prose/caption/whitespace only. No recoloring, redrawing or annotations. Every resulting image inspected visually against the full page.

### Page Figure 1

- Source: https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V2/ec98ee3cbffc32104cd55dba8af884b3d772602a/deepseek-v2-tech-report.pdf
- Source locator: V2 Figure 2, PDF page 5; inherited block also in V3 Figure 2 p.7
- Grant: MIT; https://github.com/deepseek-ai/DeepSeek-V2/blob/ec98ee3cbffc32104cd55dba8af884b3d772602a/LICENSE-CODE
- Published asset: public/figures/model-studies/deepseek-v2/architecture.png
- Pixel size: 1939 × 1561
- SHA-256: e1f571b85fc0ab410bc7578e1a0e39d6969ead8e5ce14da65a8988cb12a23db2
- Crop on 1500px page: Same licensed V2 figure asset; not re-extracted from V3
- Changes: surrounding prose/caption removed, entire artwork and labels unchanged.
- Browser review: pending parent; source image manual check passed.


## Limits

No model executed. Previous browser review does not attest the revised figure layout. Full PDFs remain outside the public repository. Exact source grants are separate from the site's MIT license.



## Revision 3 additions

Added a routing controller diagram and selection/weight scaling distinction; batch balancing counterevidence; precise FP8 scaling/accumulation/state protections; DualPipe costs; separate serving configurations; pretraining versus SFT masking; workload-qualified MTP acceptance.

### Independent SVG: routing-controller.svg

V3 routing splits affinity scores into biased selection and unbiased mixture weights, with batch loads updating the next selection bias

No source layout traced or paper artwork copied. Code-native diagram based on cited scientific facts; local raster rendering inspected and refined. SHA256: 44a84ab6f056c3ab5c427db6d13105c412b1b21eebf8de39b8909a8b7ebe134f. Fresh browser QA pending root.
