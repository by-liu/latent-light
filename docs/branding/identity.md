# Identity asset provenance

Reviewed: October 31, 2026
Asset inventory updated: October 31, 2026

## Echo logo

The author selected **05 Echo** from the October 31, 2026 lightning icon review
and authorized applying it to the local site. Echo uses a larger golden bolt
and a smaller offset orange bolt. The user's ⚡ emoji suggestion supplied the
creative inspiration; no vendor emoji artwork was used as an image input.

The built-in image tool generated the six candidates separately. The
[round 2 prompts](concepts/lightning-2026-10-31/round-2/prompts.json) preserve
the exact prompts and output identifiers. The selected concept's SHA256 is
`3c15dcfce980a26c80602566f88f3457fd24cd453297e209bfda57a2a6d322e9`.

A subsequent image edit retained Echo's composition and requested cleaner
perimeter edges. Its [exact cleanup prompt](concepts/lightning-2026-10-31/echo-selected/prompt.md)
and source record are preserved. The edited output was copied without further
pixel changes to all three PNG paths below. The same transparent artwork is
used in both themes. The ICO is a format and size derivative of the master,
made with ImageMagick:

```bash
magick public/brand/favicon-master.png -define icon:auto-resize=256,64,48,32,16 public/favicon.ico
```

The full-resolution generated raster retains minor edge noise. Small displayed
sizes are reviewed separately; the raster is not a vector master or a cleared
trademark.

## Current assets

| Asset under `public/` | Purpose | Dimensions |
| --- | --- | --- |
| `brand/logo-dark.png` | Transparent Echo logo for dark appearance | 1254 × 1254 |
| `brand/logo-light.png` | The same Echo logo for light appearance | 1254 × 1254 |
| `brand/galaxy-line-art.png` | Static decorative homepage background | 1536 × 1024 |
| `brand/favicon-master.png` | Echo master used for the favicon | 1254 × 1254 |
| `favicon.ico` | Icon derived from the Echo master | 16, 32, 48, 64, and 256 pixels |

The galaxy illustration is decorative, not an astronomical diagram.
The artwork in `public/brand/` and `public/favicon.ico` is excluded from the
MIT license for original code and writing. No separate reuse license is granted
for these identity assets. See the [README license section](../../README.md#license).

The current cartoon avatar has its own exact prompt and public portrait
reference in [avatar-cartoon.md](avatar-cartoon.md).

## Earlier artwork

The previous logo was a subtly elliptical blue spectral aperture with converging
light and a spectral edge. That logo and the retained galactic line artwork were
created through AI image generation. Their original direction referenced light,
discovery, a galactic setting and the author's interest in Pink Floyd. This is
creative inspiration, not attribution to that band or a claim of endorsement.
The exact original prompts were not preserved. These historical descriptions
are not reconstructed prompts, and no exact generation date is asserted for them.
The earlier logo files remain recoverable from Git history before this change.

## SHA256 checksums

```text
9d88947cecad2eff13c342dd09206b908c2e511143b9377de17d795c07576e63  public/brand/logo-dark.png
9d88947cecad2eff13c342dd09206b908c2e511143b9377de17d795c07576e63  public/brand/logo-light.png
b4a7221c6210c4cfd5793a91a52281c327a4332501516f2e56960eb889e844a8  public/brand/galaxy-line-art.png
9d88947cecad2eff13c342dd09206b908c2e511143b9377de17d795c07576e63  public/brand/favicon-master.png
bda3914b69d4a47d518a87944874685f832d2107071365f9617cfa4294632d77  public/favicon.ico
de4d1599a4b0a0dee441ab191c449cad7a2c3555490301ce93268e5e72cada96  public/brand/avatar-bingyuan-cartoon.png
```
