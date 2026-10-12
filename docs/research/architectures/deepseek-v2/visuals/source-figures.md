# Source figure audit: deepseek-v2

Checked 2026-10-10. Canonical report revision 2.

## Selection and rights

Official repository documentation edition, Figure 2 p.5. MIT LICENSE-CODE explicitly covers associated documentation; the report and identical architecture asset reside in that repository, with no separate exclusion. The arXiv v1 nonexclusive license is not the reproduction basis.

## Extraction and inspection

Poppler pdftoppm: render only the cited PDF page with scale-to 3500, crop coordinates proportionally scaled from the inspected 1500px page render. Crop includes the entire figure artwork, labels, panel headings and legends; removes surrounding prose/caption/whitespace only. No recoloring, redrawing or annotations. Every resulting image inspected visually against the full page.

### Page Figure 1

- Source: https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V2/ec98ee3cbffc32104cd55dba8af884b3d772602a/deepseek-v2-tech-report.pdf
- Source locator: Figure 2, PDF page 5
- Grant: MIT; https://github.com/deepseek-ai/DeepSeek-V2/blob/ec98ee3cbffc32104cd55dba8af884b3d772602a/LICENSE-CODE
- Published asset: public/figures/model-studies/deepseek-v2/architecture.png
- Pixel size: 1939 × 1561
- SHA-256: e1f571b85fc0ab410bc7578e1a0e39d6969ead8e5ce14da65a8988cb12a23db2
- Crop on 1500px page: [116,138,831,669]
- Changes: surrounding prose/caption removed, entire artwork and labels unchanged.
- Browser review: pending parent; source image manual check passed.


## Limits

No model executed. Previous browser review does not attest the revised figure layout. Full PDFs remain outside the public repository. Exact source grants are separate from the site's MIT license.



## Revision 3 additions

Replaced the repetitive cache card with the licensed source attention comparison; added absorbed score and output equations, query compression versus KV caching, assignment dropping exceptions and balanced compute versus traffic.

### attention-comparison.png

- Source: https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V2/ec98ee3cbffc32104cd55dba8af884b3d772602a/deepseek-v2-tech-report.pdf
- Locator: Figure 3, PDF page 7
- Reuse basis: MIT; https://github.com/deepseek-ai/DeepSeek-V2/blob/ec98ee3cbffc32104cd55dba8af884b3d772602a/LICENSE-CODE
- Exact pixel size: 1896 × 529
- SHA256: bdcc440c053c957562e541355fdf44a30703dfcab779de9112ea6e2a21ced13c
- Crop [x,y,width,height] on inspected 1700px-height page: [145,160,921,257]; proportionally rendered at scale-to3500 using Poppler.
- All panel headings, legends, arrows, labels and artwork retained; only surrounding prose/caption/whitespace removed. No adaptations or recoloring.
- Full page and resulting crop inspected manually. Fresh browser gate pending root.
