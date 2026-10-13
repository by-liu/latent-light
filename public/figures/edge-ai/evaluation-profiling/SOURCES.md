# Evaluation figure provenance

Reviewed 2026-10-13T04:53:45Z. No inspected existing local asset matched the historical harness figure. Full PDF downloaded only into temporary storage, not tracked or deployed.

## MLPerf Mobile harness and system boundary

- Authors/copyright: Vijay Janapa Reddi et al.,2022; complete author list is in the [source PDF](https://arxiv.org/pdf/2012.02328v4).
- Edition: arXiv2012.02328v4,April6,2022,MLSys2022,18-page PDF. Figure4,page6. The page also inspects AppendixE,page17 to distinguish functional scope from timed scope.
- Original PDF SHA256: 078ebeae4f86ee83280edf061704a646ac9c811d94ad82500b635ae2d279b6c1.
- Asset: mlperf-loadgen-boundary.png; SHA256 d6636a8f9ba4467cca69d4798102256e21e15cbcb2eb6efc487c290e35023703;1001×453pixels.
- Extraction: Poppler pdftoppm,page6,300dpi,x216 y260 width1001 height453. Full diagram artwork retained, with every arrow,label and dashed SUT envelope; original prose caption and surrounding text omitted. No recoloring or relabeling.
- Third-party exclusions: selected diagram is an abstract block schematic with no photographs,product logos or separately credited artwork. Benchmark/model names are labels used for technical review, not brand endorsements.

### Specific criticism/review reuse assessment

No general downstream artwork license was established. The [MLSys copyright FAQ](https://mlsys.org/FAQ/Copyright) describes author retention and a publisher grant, not public reuse permission. The assessed basis is Canadian criticism/review under [Copyright Act section29.1](https://laws-lois.justice.gc.ca/eng/acts/C-42/section-29.1.html), applying the repository Content standards and their contextual fairness guidance. This is a limited editorial assessment, not legal advice or a worldwide license.

Purpose: directly discuss the original harness and critically explain why its functional SUT envelope is not a complete specification of a latency timer, supported by the paper's measurement-scope discussion. Character: a public educational notebook,public-source GitHub distribution and direct asset access are expressly included. Amount: one compact architecture figure, no tables,device results,photographs,full page or full paper. The complete figure is needed to compare the SUT envelope with LoadGen and its logs without changing the authors' boundary. Alternatives: a new diagram could show a proposed harness, but would not support a close reading of this historical benchmark definition; the separate original timeline teaches the proposed timing definitions. Nature: publicly distributed technical scholarship. Likely effect: the excerpt links to and encourages reading the paper and current rules; it cannot replace either and does not reproduce a leaderboard or offer benchmark artwork for unrelated reuse. Author/title/edition/figure attribution is retained. Remaining uncertainty: contextual fairness and jurisdiction differ; commercial repackaging,broader asset use or changed distribution needs a fresh assessment or permission. The artwork is not placed under MIT.

## Illustrative timing trace

timing-boundaries.svg is original Latent Light SVG, SHA256 746fc69c5aaf01309304e064df2bc3f02e07f00435a36aed54bacd77901a045a. It shows the page's hypothetical0,0.8,4.8 and5.2second events and40ms mean intertoken calculation. The token bar is an aggregate interval,not a claim of uniform pacing. It is not a hardware measurement or a source-derived performance plot. Raster preview inspected; parent page/mobile/theme/panning/export checks passed on October 12, 2026 local time. Original artwork is under the repository MIT grant.
