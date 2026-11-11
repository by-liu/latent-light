# YOLO source figures

Reviewed November 8, 2026. These are cropped original scientific diagrams, not generated illustrations. No source PDF is distributed here.

## yolov10-dual-heads.webp

- Authors: Ao Wang, Hui Chen, Lihao Liu, Kai Chen, Zijia Lin, Jungong Han and Guiguang Ding.
- Work: *YOLOv10: Real-Time End-to-End Object Detection*, arXiv:2405.14458v1, May 23, 2024.
- Source: https://arxiv.org/pdf/2405.14458v1 — original Figure 2(a), PDF page 4, head-structure portion only.
- License verified from the primary arXiv record: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Changes: crop to the backbone, PAN and dual heads; omit matching-metric panels, embedded photograph and frequency chart. Output connectors continue beyond the cropped right edge. No labels recolored or rewritten. Lossless WebP encoding.
- Extraction: Poppler at 400 DPI, top-left pixel crop x=600, y=406, width=972, height=640 on the 612×792 pt page. Equivalent crop approximately x=108–282.96 pt, y=73.08–188.28 pt.
- The retained area contains a pure schematic and no embedded photograph or identified separate-rights material. Reuse is based on the paper's CC BY grant, with attribution, license link and crop disclosure. No endorsement implied.

## yolo26-training.webp

- Authors: Glenn Jocher, Jing Qiu, Mengyu Liu, Shuai Lyu, Fatih Cagatay Akyon and Muhammet Esat Kalfaoglu.
- Work: *Ultralytics YOLO26: Unified Real-Time End-to-End Vision Models*, arXiv:2606.03748v1, June 2, 2026.
- Source: https://arxiv.org/pdf/2606.03748v1 — original Figure 2, PDF page 6.
- License verified from the primary arXiv record: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Changes: crop whitespace and surrounding article text, preserving the diagram and its title; lossless WebP encoding. Site caption is an independent explanation, not the original caption.
- Extraction: Poppler at 300 DPI, top-left pixel crop x=156, y=312, width=2240, height=588 on the 612×792 pt page. Equivalent x=37.44–575.04 pt, y=74.88–216 pt.
- Retained area is a pure author schematic with no identified separately credited third-party material. Reuse is based on the paper's CC BY grant, with attribution, license link and crop disclosure. No endorsement implied.

The CC BY figure licenses are separate from any license covering implementation code or pretrained weights. Input PDF checksums and extraction commands are retained in the research workspace.
d71cb2e83e5cce72eccee5f05b976a6492bdd5b38ad75249eb358f86ca5d28aa  public/figures/yolo/yolo26-training.webp
b1cca8d91f856561839e1164c3804fcf94e96cc3651787fb679ff336bde11850  public/figures/yolo/yolov10-dual-heads.webp

## yolo-opening-v1.gif / yolo-opening-v1.webp

Original code-rendered illustration and animation, created November 11, 2026.
Editable source: `docs/research/vision/yolo/visuals/render-opening.py`.
60 frames, 100 ms per frame, continuous six-second loop, 1080×600. The WebP is
frame 15 and serves as the static/reduced-motion/print image. SVG geometry is
rendered with librsvg and encoded with ImageMagick. No image-generation model,
external photographs, model inference or measured timings were used. Car,
person, plant, boxes and feature pulses are schematic. Animation illustrates
localization and recognition rather than literal sequential scanning by YOLO.
The canonical caption distinguishes illustration from evidence.
