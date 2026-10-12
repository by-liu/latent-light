# gpt-oss: coverage audit

Measured versus rounded parameter names; active-count definition; mixed-attention cache; MXFP4 exclusions; training-hour scope; unspecified RL algorithm; Harmony handoffs and external execution. This is a model card, not a separately named report.

Complete method, training, systems and evidence discussion in canonical report. Original figures: 1. Integrated browser/export QA passed.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

Cross-review verified head/sink dimensions, exact activation clamps and sigmoid scale, policy/tool continuation reasoning retention, post-training quantization and scoped distillation evidence. Official Harmony and reference implementation re-inspected; active tool loops preserve current reasoning while completed old turns remove it.
