# Jensen tribute artwork

## Homepage cartoon avatar

`jensen-avatar-v1.webp` is a transparent, AI-generated cartoon likeness of Jensen
Huang, created November 12, 2026 with OpenAI imagegen using the author's supplied
portrait as an identity reference. A second pass simplified the initial render
into a clearly drawn cartoon for small display sizes. The original supplied
photograph is not redistributed here. No photographer attribution or license
for that reference was independently established; it was supplied specifically
for this transformation. No endorsement is implied.

The final 256 × 256 WebP preserves alpha transparency. It is displayed as a small
decorative homepage avatar. Gentle CSS tilt/bob and a separate sparkle supply
the animation; the image model generated the still artwork, not video frames.
Reduced motion and print use the static avatar. Its alt text identifies the
artwork as AI generated. Prompts and generation method are retained in
`docs/research/people/jensen/visuals/homepage-avatar-prompt.json`.

## Current hero: real 2026 Davos photograph

Photo: ©2026 World Economic Forum / Thibaut Bouvier, January 21, 2026.
Title: World Economic Forum Annual Meeting. Jensen Huang speaking during
“Conversation with Jensen Huang” at Davos-Klosters, Switzerland.

- Original publisher: https://www.flickr.com/photos/worldeconomicforum/55053488739
- Downloaded size: https://live.staticflickr.com/65535/55053488739_bc0a49b30c_b.jpg
- License: https://creativecommons.org/licenses/by-nc-sa/4.0/
- Source: `jensen-davos-2026-source.jpg` (1024 × 683).
- Poster: `jensen-davos-2026.webp` (840 × 560).
- Animation: `jensen-davos-2026.gif`, 40 frames, six seconds, 840 × 560.
- Efficient animated equivalent: `jensen-davos-2026-motion.webp`.

Changes: small crop/resize, GIF palette conversion, and a looping camera movement
with at most 4% magnification. No AI-generated face, body, expression, speech,
background or event. This is animated photography, not recorded video.
Renderer: `docs/research/people/jensen/visuals/render-photo-motion.py`.

**The source photograph and all of these photo derivatives retain
CC BY-NC-SA 4.0 and are excluded from the repository's MIT license.**
This reuse is for a personal, noncommercial collection. Credit, original source,
license and modification notice appear beside the image and in the text export.
No photographer, WEF, NVIDIA or artist endorsement is implied.

License and event metadata were checked on the original Flickr page on
November 12, 2026. Earlier 2016 and 2024 candidate photographs were not used.

## Previous generated illustration (superseded)

Created November 12, 2026 for Latent Light at the author's request.

- `jensen-building-v1.webp`: original AI-generated decorative illustration of
  Jensen Huang, generated with OpenAI imagegen. This imagined scene is not a
  photograph, recorded event, product announcement or endorsement.
- `jensen-building-v1.gif`: the illustration with original, code-authored circuit
  pulses and orbiting sparks. 1080 × 810 pixels, 60 frames at 100 ms each,
  six-second continuous loop, approximately 416 KiB. The model generated the
  still illustration; the animation was assembled with SVG, librsvg and
  ImageMagick. No generated speech or simulated interview footage.
- The WebP is used without JavaScript, with reduced motion, and for print.

Editable generation prompt and animation source:
`docs/research/people/jensen/visuals/tribute-keyframe-prompt.json` and
`docs/research/people/jensen/visuals/render-tribute-motion.py`.
The renderer runs from the repository root. Intermediate files belong in the
ignored `output/research/jensen/tribute/` directory.

SHA-256:

```text
WebP d4c9cc428c8ee925e7a852112de98812cbc6b5081f9ce842bb493887d183c409
GIF  c02b4c68a316d3d89e42799344ad361b7ec83fc69d3821b0a530f0e8555d909d
```
