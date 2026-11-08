# Hardware 101 learning-map animation

Date: November 7, 2026. Presentation update to Figure 1; research evidence cutoff remains November 1.

Tool: built-in `image_gen.imagegen`, editing the original generated learning map
`public/figures/hardware/hardware-101-learning-map-v1.webp`. No external artwork.

## Exact generation prompt

Use case: scientific-educational / precise-object-edit.
Edit target: the supplied Hardware 101 learning-map illustration.
Create a cool animated GIF loop of this exact infographic. Keep the camera locked, all typography, six label panels, footer learning outcomes, every object and the paper background completely stable. Animate only the illustration: small teal and amber signal packets travel from the left camera/microphone/sensor into the board, a soft amber processing pulse runs across the central chip and traces, then a light travels to the camera/watch/gripper at the right. Gentle sensor scanning and chip glow. Restrained, polished editorial motion, no flashing, no zooming, no camera movement, no changing text. Seamless approximately four-second loop. Preserve all wording and layout exactly. Motion is a conceptual learning cue, not a measured circuit. Return an animated GIF if supported; otherwise return one high-quality activated keyframe with this same layout, subtle illuminated traces and central processor lighting, suitable for compositing into a looping animation. Landscape original aspect ratio.

## Actual output and assembly

The tool returned a single activated PNG keyframe, not a native animated GIF.
It is retained locally at `output/imagegen/hardware-101-learning-map-activated-v1.png`.
The publication GIF is assembled by `scripts/render-hardware-learning-loop.mjs`
using that fixed keyframe, hand-traced moving light packets and a slow processor
glow. Text, objects, camera and background remain fixed across all frames.
The original WebP remains the still fallback and full-resolution reading asset.

The loop is a conceptual illustration, not a circuit simulation or measured
timing. Frame positions, colors and pulse timing carry no quantitative claims.
The generator prompt describes possible creative motion; the actual assembly
uses light packets and a glow only, without mechanical object movement.

## Final presentation

The user explicitly preferred continuous playback with no visible controls.
The final GIF is `hardware-101-learning-map-motion-v1.gif`: a 3.84-second
infinite loop. The page has no toolbar or playback buttons. Clicking the image
opens the high-resolution still. The image animates while in view and its tab
is visible; reduced motion, no JavaScript and printing use the original still.
