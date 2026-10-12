# Qwen3-VL independent mechanism diagrams

Original SVGs authored for Latent Light, October 10, 2026. MIT project terms. These are not reproduced or traced report artwork.

- Archived at docs/research/architectures/qwen3-vl/visuals/archive/visual-pipeline.svg (formerly visual-pipeline.svg): selected 8B visual input and DeepStack interface. Report sections 2–2.3 and pinned Transformers 4.57.1 VisionModel.forward and model forward.
- positions-and-time.svg: selected 24/20/20 frequency allocation from apply_interleaved_mrope, plus explicit video timestamp text from report section 2.3. Older grouped bands are conceptual, not another checkpoint’s measured dimensions.

Primary report: https://arxiv.org/html/2511.21631v1
Implementation: https://github.com/huggingface/transformers/blob/8cb5963cc22174954e7dca2c0a3320b7dc2f4edc/src/transformers/models/qwen3_vl/modeling_qwen3_vl.py

Exact revisions, claims and visual review records: docs/research/architectures/qwen3-vl/. Revision 4 reproduces report Figure 1 under the specific assessment below. The independent overview is retained as an archival asset, not shown as a duplicate.

## Revision 4: original report figure excerpts

These specific excerpts support substantive model analysis on the public site
and in its public source repository. Original copyright remains with the
respective rights holders; no MIT or other new artwork license is granted.
A statutory exception assessment is not permission from the authors or a legal
assurance for another use or jurisdiction. Reassess redistribution, adaptation
or commercial use separately.

### report-architecture.png

- Source: Qwen Team. [Qwen3-VL Technical Report](https://arxiv.org/pdf/2511.21631v1), original Figure 1, PDF p. 3; exact version is in the URL.
- Purpose: Analyze variable-length visual inputs, timestamp groups and DeepStack depth routes in the original family framework.
- Changes: high-resolution 300 dpi figure-region crop; paper prose and caption omitted. All figure panels, labels and arrows retained, with no redraw or AI alteration.
- Crop pixels: x 283, y 283, width 1921, height 1117.
- Reuse basis: case-specific Canadian fair-dealing assessment for research and criticism/review, not a permissive-license claim.
- Third-party scope: Blog screenshots, branded illustrations and sample video thumbnails have no independently established grant. Their small embedded representations are included only as integral inputs to the framework being analyzed; no standalone media extraction or endorsement.
- Source PDF SHA-256: bc09ce99cface4dae5deaeb5327b936195d162f4df719ab2e86ee3807a0db865
- Asset SHA-256: d0f5bd0ff81d08f4ef534b4a009a948c385ae232e1012d1bd37543aa0ab5eae8

### Assessment for this selection

- Purpose: explain and critically inspect the published model mechanisms beside the figures, with author and source attribution. The figures are evidence, not decoration.
- Character: publicly accessible web and GitHub copies are broader distribution than private study and weigh against reuse; they must be considered explicitly. No complete paper, separate photographic asset or standalone gallery is distributed.
- Amount: 1 complete figure from the 42-page report. Each figure may itself be a complete protected work; report length alone is not the justification. All panels are needed to inspect the depicted relationships, while surrounding prose and unrelated figures are omitted.
- Alternatives: links and independent schematics remain useful, but are not equivalent for inspecting the authors' exact grouping, arrows and presentation. Original figure reproduction is paired with a focused explanatory passage, not used to avoid writing analysis.
- Nature: an already publicly released technical report, not confidential or unpublished work. Public access does not itself grant reuse.
- Effect: the excerpts link readers to the original edition and do not replace its full argument, experiments or report. No measured market-effect study was performed; a competing use, rightsholder concern or monetization would require reassessment.
- Decision: include these bounded excerpts for the documented analysis. This editorial assessment has remaining jurisdictional and rights uncertainty; it is not a judicial determination or a grant to downstream users.

Legal sources: [Copyright Act §29](https://laws-lois.justice.gc.ca/eng/acts/c-42/Section-29.html), [§29.1](https://laws-lois.justice.gc.ca/eng/acts/c-42/Section-29.1.html), and [CCH Canadian, 2004 SCC 13](https://decisions.scc-csc.ca/scc-csc/scc-csc/en/item/2125/index.do), paras. 48–60. Assessed October 10, 2026.
