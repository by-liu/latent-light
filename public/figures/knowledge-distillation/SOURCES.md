# Knowledge Distillation figure records

Reviewed October 14, 2026. The pages and this public repository are both intended
distribution contexts. Complete papers remain in a temporary local study archive,
not in this repository. Original copyright and license notices remain applicable.

## transfer-map.svg

- Original Latent Light explanatory SVG, created with code and reviewed against
  Hinton et al. (2015), GKD (ICLR 2024) and Born Again Networks (ICML 2018).
- Purpose: separate supervision, the learning contract, student experience,
  independent evaluation and the deployment boundary.
- No measured values, copied artwork or inferred proprietary training details.
- Editable source and published asset: this SVG. Original project material, MIT.
- SHA-256: `7ddac7b6d5083737290010345077233f555c94b241c4195b67ce8c8c9eafa90f`.

## soft-targets.svg

- Original Latent Light calculated SVG. Illustrative logits `(4,2,0,-2)` under
  softmax temperatures 1 and 3. Class names are invented for the explanation.
- Values rounded to one decimal percent; bar heights use those rounded values.
  Hard-label zero values are baseline marks, not nonzero probability estimates.
- Purpose: contrast a hard label with alternatives preserved in soft targets.
- Not a reported benchmark or a measurement of any real classifier.
- Editable source and published asset: this SVG. Original project material, MIT.
- SHA-256: `ac352cdb08e2b87266d092589602a0762e41493b8f9b24524b561696c0a9dcb2`.

## alm-chunk-matching.png

- Authors: Benjamin Minixhofer, Ivan Vulić and Edoardo M. Ponti.
- Source: [Universal Cross-Tokenizer Distillation via Approximate Likelihood
  Matching](https://arxiv.org/pdf/2503.20083v4), NeurIPS 2025, v4 dated October
  24, 2025, original Figure 1, PDF page 2.
- Purpose: explain and inspect the original token-boundary correspondence and
  chunk-likelihood approximation, not decorate a model catalog.
- License: the [versioned HTML](https://arxiv.org/html/2503.20083v4) identifies
  [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The extracted
  figure retains that license, not MIT. Attribution and changes are recorded
  here and beside the figure. No separate third-party credit was identified in
  the selected figure. The generic teacher/student animal drawings are retained
  as part of the authors' figure, not presented as site identity or endorsement.
- Changes: Poppler figure-region extraction at 300 dpi, x=600, y=262, width=1369,
  height=460 pixels. Surrounding caption and prose omitted; all diagram labels,
  arrows, colored spans and formulas retained. No AI redrawing.
- Source PDF SHA-256: `5a07b0eda7406a95ff24510a02f2e1dd69de67551e12fe8a12f687895f8a8d81`.
- Asset SHA-256: `1616983c03538d88ee6b6a4f018a3d52b2b30ee1acda6aa0256fea5c44e38741`.

## switch-kd-framework.png

- Authors: Haoyi Sun, Xiaoxiao Wang, Ning Mao, Qian Wang, Lifu Mu, Wen Zheng,
  Tao Wei and Wei Chen.
- Source: [Switch-KD: Visual-Switch Knowledge Distillation for Vision-Language
  Models](https://arxiv.org/pdf/2604.14629v1), April 16, 2026 edition, original
  Figure 2, PDF page 3.
- Purpose: inspect the actual hybrid visual pathway and the paired, adaptive
  logit-difference construction. Both panels are analyzed in the page.
- Changes: Poppler 300 dpi extraction, x=236, y=287, width=2079, height=874.
  Complete figure panels retained; external caption/prose omitted. No redrawing
  or recoloring. No third-party photographs in the selected technical diagram.
- Source PDF SHA-256: `a64055c8f1eb485fc526fed8dad47e34583969d96801b582be75a2de529b4bbf`.
- Asset SHA-256: `06d150861886c9ed29e04afe2f9440240c37b8eca70664d0b9aea01101df97e7`.
- Rights: the arXiv distribution license is not a downstream reuse grant.
  Original copyright remains with the named authors/rightsholders.
- Reuse basis: a bounded research and criticism/review assessment for this
  specific excerpt, not a permission or permissive-license claim:
  - Purpose: technical explanation and critical inspection of the two pathways,
    interface assumptions and limits of the reported experiment, with full
    author/report attribution and a link to the original.
  - Character: public web and GitHub distribution is broader than private study
    and weighs against reuse. No full paper, standalone gallery or promotional
    figure pack is distributed.
  - Amount: one complete figure. It can itself be a protected work; its small
    fraction of the report does not alone justify reuse. Both panels are needed
    to inspect how visual switching and the selected loss work together.
  - Alternatives: a link or independent schematic is possible, but does not
    preserve the authors' exact hybrid route, adaptive selections and loss
    branches for the accompanying analysis.
  - Nature: a publicly released scientific diagram, not unpublished or private
    material. Public availability does not itself authorize copying.
  - Effect: the excerpt supports analysis and directs readers to the complete
    report; it does not replace its experiments, derivations or code. Market
    effect was not measured. A rights concern or commercial redistribution
    requires a fresh review.
- Assessment follows the site's established reuse standard, informed by
  [Copyright Act §29](https://laws-lois.justice.gc.ca/eng/acts/c-42/Section-29.html),
  [§29.1](https://laws-lois.justice.gc.ca/eng/acts/c-42/Section-29.1.html) and
  [CCH Canadian, 2004 SCC 13, paragraphs 48–60](https://decisions.scc-csc.ca/scc-csc/scc-csc/en/item/2125/index.do).
  This editorial assessment has remaining jurisdictional and rights uncertainty;
  it is not legal assurance or a license to downstream users.

## Reused Qwen3 report-posttraining.png

- Existing asset: `/figures/model-studies/qwen3/report-posttraining.png`.
- Qwen Team, [Qwen3 Technical Report](https://arxiv.org/pdf/2505.09388v1),
  original Figure 1, PDF page 9. See the existing
  [extraction and assessment](../model-studies/qwen3/SOURCES.md).
- Asset SHA-256: `d954c889849db905579a8c466e67a4f74627e3256ecb2a9b76b2c014778d0031`.
- Additional use: compare teacher training and lightweight-student transfer in
  the new distillation recipe analysis. The same complete, unmodified excerpt
  is substantively discussed, with a new concise attributed caption; no second
  binary is added. Existing bounded critical/research assessment remains
  applicable to the same public distribution and author attribution. Original
  copyright remains; no MIT artwork grant is made.

Native ModelFlow figures use original explanatory text in the page sources.
They are independently authored synthesis, not reproductions of paper artwork.
