# Runtime figure provenance

Reviewed 2026-10-13T04:53:45Z. No matching existing inspected local diagram was found.

## Official ExecuTorch pipeline

- Source: [How ExecuTorch Works](https://docs.pytorch.org/executorch/stable/intro-how-it-works.html), version1.5 header inspected. The [original asset](https://github.com/pytorch/executorch/blob/48e27b4ea0ba3443831eb4f9d78a4553ce36ae51/docs/source/_static/img/how-executorch-works-high-level.png) was introduced September25,2023.
- Original and deployed asset SHA256: b7de85af15534ea1d6616c835fc50c997d01738e29fd25fc242937d23d129e50. The stable-docs image matches the immutable original byte for byte.
- Asset: executorch-high-level.png. No crop, recoloring or text modification. Original image preserves all arrows, labels and the ahead-of-time boundary.
- Rights basis: repository [BSD license at that revision](https://github.com/pytorch/executorch/blob/48e27b4ea0ba3443831eb4f9d78a4553ce36ae51/LICENSE), copyright Meta Platforms and Arm. The image is a repository documentation asset, with no separate license override or independently credited artwork found in the source or guide. Complete license and disclaimer retained in NOTICE.md. No endorsement is implied.
- Third-party review: boxes, schematic graph and generic chip icon; no product logos or photographs. The source diagram is reproduced as documentation artwork, not repurposed as a site brand. The repository license does not grant trademark endorsement.
- Purpose: inspect the concrete boundary between compiler preparation and runtime execution, replacing the generic diagram. The page explains the labels and limits this to one implementation.

## Processor boundary example

partition-boundaries.svg is original Latent Light code artwork, SHA256 ec5acef6df8c7e6082b2d505156fd8e9fa6e60bdeead53e2b43cf74ff5f59cf4. It uses the same hypothetical3ms+0.5ms+2ms+2ms=7.5ms schedule already derived in the page. It is not a measurement. ONNX Runtime partitioning and IO documentation inform the types of boundary work; they do not supply these timings. Native SVG preview was inspected; the built page's narrow-width/theme/panning/export checks passed on October 12, 2026 local time. Original asset is under the repository MIT grant.
