# Lightning icon review, round 2

Created October 31, 2026. Six new directions inspired by the user's ⚡ emoji
suggestion: Fold, Flow, Prism, Aperture, Echo and Spark.

The six PNGs were generated with the built-in image tool, using separate new-image
calls and transparent backgrounds. Aperture received one subsequent image edit.
No vendor emoji artwork was used as an image input. Exact prompts and output
identifiers are in [prompts.json](prompts.json). Dimensions, sizes and SHA256
checksums are in [assets.json](assets.json).

These are the original design concepts. Full-resolution raster edges retain some
generation noise. The author subsequently selected **05 Echo** and authorized
applying it to the local site. The selected output and exact cleanup prompt are
recorded in [echo-selected/prompt.md](../echo-selected/prompt.md). The six
candidates here remain unchanged as the review record.

## Open the comparison page

Open [review.html](review.html) with the six PNGs beside it. It has light and dark
previews, 16/32/64 px samples, adjustable preview sizes, an inspection dialog,
PNG downloads and a shortlist with review notes. The browser stores the shortlist
and notes locally. The page sends no review feedback to a server.

While this project's development server is running, the direct file URL is:

```text
http://localhost:4327/@fs/home/lby/Work/latent-light/docs/branding/concepts/lightning-2026-10-31/round-2/review.html
```

For SSH access, forward the development port from the viewing computer:

```bash
ssh -N -L 4327:127.0.0.1:4327 user@host
```

Replace `user@host` with the existing SSH destination. Keep the tunnel open and
open the URL above in the viewing computer's browser.

A self-contained export with all six PNGs embedded is also saved in
`output/latent-light-icon-review.html`. This ignored deliverable can be copied as
one file and opened without a web server. From the viewing computer:

```bash
scp user@host:/home/lby/Work/latent-light/output/latent-light-icon-review.html .
```

## Verification

Inspected desktop (1440 px) and mobile (390 px) screenshots in Chromium.
Browser checks passed for all six image loads, light and dark modes, shortlist
filtering and its empty state, persistence of notes and favorites, preview sizes,
keyboard dialog opening and navigation, Escape and focus restoration, the 32 px
inspection size, reduced motion and the self-contained export's embedded images.
No browser JavaScript errors were observed. Neither the page nor the small-size
rows overflowed at a 320 px viewport after the narrow-screen spacing correction.

This standalone review does not change the Astro application. Site-wide
validation was not rerun for these concept assets and the standalone HTML page.
