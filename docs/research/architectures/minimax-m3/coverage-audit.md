# MiniMax M3 and Sparse Attention: coverage audit

109B/6B controlled3T experiment differs from428B/23B release. Local block reserves one of16slots, not an extra slot. Detached teacher/hidden input and warmup. Quadratic index remains; sparse read is not fixed-size history.14.2x/7.6x kernel not whole-model latency. Processor resize/merge and nominal576 remain distinct. No complete released vision/posttraining recipe.

Complete method, training, systems and evidence discussion in canonical report. Original figures: 1. Integrated browser/export QA passed.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

Cross-review checked detached KL, local-block slot budget,109B experiment versus428B release, quadratic index cost and kernel-only speedups. Actual processing wrapper confirms visual token counts. Added seven configured MTP modules and smaller-pilot block-size/sink/value-head ablations without backend claims.
