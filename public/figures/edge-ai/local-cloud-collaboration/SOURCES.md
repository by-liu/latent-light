# Local and cloud collaboration: figure sources

Inspected October 17, 2026. Scientific figures are excerpts, not new artwork
licensed under the site's MIT grant. Full reports are not committed or deployed.

## collaboration-map.svg

- Original Latent Light code-native SVG, 1080 × 570, MIT licensed.
- Purpose: show computation placement, selected message exchange, disclosure
  policy and independent validation/authorization at a glance.
- Inputs: RouteLLM section 3; Minions protocol; Apple's PCC trust boundary.
  This is an independent synthesis, not any vendor's disclosed architecture.
- Editable source and deployed asset: this SVG. No generated imagery.
- No measured quantities, architecture secrets or claim of automatic privacy.
- SHA256: `c18fe705d95d18a22373277d34dc104eb97d69693c5821de4fd0ff5dcaa23cf5`.

## minions-protocol.png

- Avanika Narayan, Dan Biderman, Sabri Eyuboglu, Avner May, Scott Linderman,
  James Zou and Christopher Ré. *Minions: Cost-efficient Collaboration Between
  On-device and Cloud Language Models*.
- Exact source: [arXiv 2502.15964v1](https://arxiv.org/html/2502.15964v1),
  February 21, 2025, original Figure 1, PDF page 2.
- Original PDF: https://arxiv.org/pdf/2502.15964v1.
- Local study filename: `minions-v1.pdf`, retained outside the repository.
- PDF SHA256: `bcbb10dac5e9ad4968b8b95e43ba74f9edc8fd0f07aee1469f63b121c56724a3`.
- Reuse basis: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/),
  confirmed by the exact arXiv edition's license link. Authors retain copyright.
  Preserve attribution and change disclosure; no endorsement is implied.
- Extraction: Poppler `pdftoppm`, page 2, 300 dpi, crop x=295, y=310,
  width=1980, height=655 pixels. Scientific content unchanged; surrounding
  caption and prose excluded. All protocol panels and arrows retained.
- The miniature document pages and device icons occur within the authors'
  mechanism diagram, not as separately sourced illustrations. No separate
  third-party restriction is identified in the figure. Preserve applicable
  third-party exclusions; do not extract those details for unrelated reuse.
- Website path: `/figures/edge-ai/local-cloud-collaboration/minions-protocol.png`.
- PNG SHA256: `67fa91172382727d4831827066ca3fbf0af857a7430b6f16c771c4ab1adbdcc5`.
- Purpose and review: discuss unconstrained chat versus parallel local jobs.
  Original page and extracted crop were visually inspected. The separately
  inspected ICML edition supplies the latency discussion and Table 2; those
  later results are not attributed to the older figure edition.

## advisor-framework.png

- Parth Asawa, Alan Zhu, Abby O'Neill, Matei Zaharia, Alexandros G. Dimakis
  and Joseph E. Gonzalez. *How to Train Your Advisor: Steering Black-Box LLMs
  with Advisor Models*.
- Exact source: [arXiv 2510.02453v2](https://arxiv.org/html/2510.02453v2),
  February 2, 2026, original Figure 1, PDF page 1. The PDF also prints
  "Preprint. February 3, 2026." Keep these dates distinct.
- Original PDF: https://arxiv.org/pdf/2510.02453v2.
- Local study filename: `advisor-v2.pdf`, retained outside the repository.
- PDF SHA256: `ce892e0759096ca8e7299e681b39a9f9ce5b17640b57558e1aef7ea11508cb05`.
- Reuse basis: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/),
  confirmed by the exact arXiv edition's license link. Authors retain copyright.
- Extraction: Poppler `pdftoppm`, page 1, 300 dpi, crop x=1275, y=820,
  width=990, height=430 pixels. Scientific content unchanged; surrounding
  caption and prose excluded. No figures from other sources were inserted.
- Website path: `/figures/edge-ai/local-cloud-collaboration/advisor-framework.png`.
- PNG SHA256: `b7f2cec3a4ea71d6a8be33aa3eba30c07ee089b6f435636dd0a87a0533bf9564`.
- Purpose and review: distinguish trainable advisory policy, frozen executor
  and outcome-based training. Original page and crop visually inspected.
  The page explains that the reward arrow is training, not a mandatory
  reward calculation or model update on each deployed request.

## Native document workflow

Figure 4 uses the existing `ModelFlow.astro` component with authored data in
`src/content/docs/edge-ai/local-cloud-collaboration.mdx`. It is original
MIT-licensed synthesis, not a source figure or implemented system. Its
export retains every step and loop condition. The source inputs are Minions,
Learning to Ask and the PCC trust boundary; the proposed document scenario
and validation contract are explicitly hypothetical.

## Other closely inspected study copies

These unmodified PDFs remain outside the repository. They support version
identity and do not grant redistribution rights for the full files.

| File | Inspected use | SHA256 |
| --- | --- | --- |
| `minions-icml2025.pdf` | Published sections 3–6, tables 1–2 and latency caveats | `263e2e072a08ae9ef04e79a926f1a0650e6e88964ac0ec6ab909eaf05fe885f6` |
| `specedge-v2.pdf` | Sections 4–5 and setup/baseline details, checked against HTML | `c20fdf1213df475600efb85e505cbd4f61d9bd83d25ed0aa0e62f934b1bd8ff0` |
| `neurosurgeon.pdf` | Abstract, introduction and layer partitioning context | `b0cd8f3428bf6eb2e93c368e60165e8aa30e57e75b990e4a2a4eede353babccd` |
| `gemini-robotics-2025.pdf` | Section 3.1 and Figure 14 caption, cloud/local boundary | `0a326fa9a810fa5c187ec0391a7608fd33c81e9fb29f645cfebc667123d4bbbe` |
