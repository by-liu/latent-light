# Technical coverage audit: kimi-k3

Evidence checked 2026-10-10; canonical revision 3. This pass compares the inspected complete report, relevant appendices and targeted official artifacts against the published study. It does not claim every report sentence or benchmark column must be duplicated.

## Coverage decisions

| Technique or evidence | Actual source locator | Before/after audit status | Added content or justified omission |
| --- | --- | --- | --- |
| KDA/MLA hybrid and bounded decay kernels | Sections 2.1, 5.1; Figure 2–3; code | Covered | 69/24 layers, NoPE, full gate, 16 token tile BF16 bound; fixed KDA state versus growing MLA cache. |
| BlockAttnRes depth access | Section 2.2; code _apply_attn_res | Covered | Per-token depth weights, 12 layer blocks, 9 sources; depth, not sequence attention. |
| StableLatentMoE and SiTU bounds | Section 2.3.1–2.3.2/Appendix B; code | Covered | 16/896 routed, latent width 3,584 plus two full shared experts; 100 activation bound not final output. |
| Quantile Balancing update | Section 2.3.3/Appendices C–D/Figure 5 | Gap closed | Source Figure 2 and Equation 4 show margin quantile; frozen cutoff/no ties/histogram assumptions; next batch not exact future guarantee. |
| Native vision and per-head Muon | Sections 2.4–2.5, 3 | Covered | Joint from scratch, 2 × 2 downsampling, data/context curriculum, scope of initialization/scaling comparison. |
| Nine-teacher RL/OPD and effort/reward controls | Section 4.1.1–4.1.3 | Gap closed | Equation 6 clipped detached teacher/student ratio; task domain/effort choice; partial rollout and budget distinctions. |
| QAT and speculative draft fine tuning | Section 4.1.4/Equation 16; config | Gap closed | 1st/4th/final block fusion, [0 0 I] initialization, seven draft steps, target frozen, overlap loss; main num_nextn_predict_layers = 0 retained. |
| MoonEP and training memory | Section 5.2/Appendix E | Gap closed, selective summary | Router balance versus execution balance, E/R redundant slots and home gradient return; not uniform per expert load. |
| Hybrid prefix reuse and speculation replay | Section 5.4.1–5.4.2/Figure 12 | Gap closed | Source Figure 3 has 6,144 physical/512 hash/2560 hit; all cache groups/private copy/replayed inputs, not free rollback. |
| Cluster affinity and budget admission | Section 5.4.3 | Gap closed | Secondary rebuilds a prefix rather than mirroring cache; separate long/short budgets. |
| Task synthesis, full sandbox and end-user cases | Sections 4.2, 5.3, 7 | Justified summary | White-box verification, agent rewards and harness boundary preserved; every knowledge graph node/case plot would overload the scope. |
| Evaluation and cost/scaling comparisons | Sections 3.2, 6 | Covered | combined 2.5 times recipe, compaction/sampling/harness differences; no full token/compute disclosure. |

## Material revision

Added exact quantile margin/cutoff update and licensed original figure; clipped nine-teacher OPD equation; draft feature-fusion/acceptance-overlap objective; licensed fine-grained prefix-caching figure; MoonEP execution balancing and fleet cache affinity/admission boundaries.

## Adversarial pass

Checked equations against source conventions, figure labels and paths against full source pages, reported numerical units and source edition boundaries, and training versus runtime claims. Corrected inaccurate section locators during this pass (V3 MTP is Section 5.4.3, GLM cross-stage distillation is Section 3.5). No active-parameter count is treated as stored memory, no context maximum as robust evaluated recall, and no rollout scheduling optimization as a different algorithm without evidence. Native SVGs were raster-rendered for label/path inspection; a routing label overflow and a chunk-diagram subtitle collision were corrected. New HTML/mobile/theme/export gates passed root QA.

## Reproduction gaps

Undisclosed data, compute or optimizer values remain explicit instead of inferred. No downloaded model code or weights were executed. Report originals remain unmodified outside the public repository under /tmp/latent-frontier-sources/kimi-k3/. Source-art reuse is limited to the exact grants documented in public notices; independent SVGs copy scientific facts, not a source layout.

## Next check

Root completed fresh integrated desktop/mobile/theme/focus, caption/equation/citation anchors, Markdown/MDX exports, search and agent manifests for revision 3. Earlier browser screenshots do not establish this revised page's quality.




## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
