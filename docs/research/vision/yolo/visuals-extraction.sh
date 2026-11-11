#!/usr/bin/env bash
# Run from the repository root with the version-pinned PDFs in ignored output/.
# Source URLs, hashes, attribution and crop changes: artifact-manifest.json and
# public/figures/yolo/SOURCES.md. This does not fetch or execute model code.
set -euo pipefail
mkdir -p output/research/yolo/previews public/figures/yolo
pdftoppm -f 4 -singlefile -r 400 -x 600 -y 406 -W 972 -H 640 -png output/research/yolo/papers/yolo-v10.pdf output/research/yolo/previews/v10-dual-heads
pdftoppm -f 6 -singlefile -r 300 -x 156 -y 312 -W 2240 -H 588 -png output/research/yolo/papers/yolo26.pdf output/research/yolo/previews/yolo26-training
magick output/research/yolo/previews/v10-dual-heads.png -define webp:lossless=true public/figures/yolo/yolov10-dual-heads.webp
magick output/research/yolo/previews/yolo26-training.png -define webp:lossless=true public/figures/yolo/yolo26-training.webp
