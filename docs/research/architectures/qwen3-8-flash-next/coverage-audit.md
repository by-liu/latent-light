# Qwen3.8-Flash-Next coverage audit

## Coverage completed

Hybrid recurrent/sparse memory, four gated residual branches, local hashed embeddings and optimizer-specific stability are distinct design dimensions.

- Primary report version and public representative checkpoint checked.
- Disclosed architecture, input path, position, cache/state, recipe, inference and critical evaluation explained.
- Matched config/code read-inspected, never executed.
- Full canonical narrative retained in report.md.
- 3 original source figures cropped at 300 dpi and manually compared to PDF pages.
- Public reuse reviewed separately from weight/code license; exact source/crop/hash and bounded exception assessment in SOURCES.md.

## Adversarial findings and corrections

- Full multimodal and post-training recipe absent from this architecture report.
- Config maximum 262144 differs from tested 1M kernel setting; single MTP layer can serve multiple speculative steps.
- GDN is recurrent but QSA indexer remains quadratic at reduced constant and the whole model retains history.
- Qwen Community License 1.0 is not Apache; no legal deployment conclusion supplied.

- Every report section/table locator compared with exact PDF headings; initial draft locators corrected.
- Derived token/cache examples state dtype, batch, dimensions and omitted overhead.
- Bundled author-reported results are not presented as isolated causal ablations.

## Presentation boundary

Source page previews and all extracted crops manually reviewed. Parent agent owns final full-collection browser review at desktop/mobile, themes, focus and exports. This audit does not attest those checks before the parent completes them.

## Missing disclosures and next checks

Complete datasets, exact full training compute and independent benchmark reproduction remain undisclosed/out of scope. Runtime compatibility and the intended code-level contracts require real model tests if used for deployment.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

No unresolved source/artifact contradiction is silently presented as a complete recipe.
