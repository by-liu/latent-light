# deepseek-v4: revision 3 coverage audit

Checked 2026-10-10. Sequence compression and the cache lifecycle both matter. A licensed original cache-layout figure connects the attention mechanisms to persistent global blocks and bounded request state.

| Dimension | Primary source locator | Coverage decision |
| --- | --- | --- |
| Architecture/mHC | §2.1–2.2; Fig. 2 | Covered four streams, approximate Sinkhorn, main width and auxiliary MTP. |
| CSA/HCA | §2.3; Figs. 3–4 | Covered overlap, top-k, causal boundaries and local window. |
| Attention internals | §2.3.1–2.3.3 | Added grouped projection, query/KV norms, sink logits, partial/inverse RoPE distinction. |
| Routing | §2.1 | Added sqrt-softplus, token-ID hash routing, removed node limit and retained sequence auxiliary loss. |
| Training/optimization | §3.4 and §4 | Covered Muon/AdamW and stage scope; no invented compute budget. |
| Cache/inference | §3.5.1 Fig.6 p22 | Added original cache-layout crop and Flash lcm layout derivation. |
| Evaluation | §5 Tables7–9; Figs8–12 | Covered conditional reasoning budgets. Additional task/cost curves are not independent mechanism ablations and are omitted. |
| Other source figures | Fig5 expert-parallel schedule; Fig7 thinking management; Figs13–15 output examples | Systems schedule and qualitative outputs are secondary to this page’s core attention/cache learning goal; omitted rather than using a figure quota. |

## Adversarial review

Rechecked scope and entailment for new claims separately from drafting. Checkpoint dimensions, family training summaries, auxiliary experiments and optimized serving behavior are not interchangeable. Source artwork permission is assessed separately from weights/code licenses. No weights, models, benchmarks or serving systems were executed. Final render gates passed fresh root integration checks.

## Integrated presentation verification

Fresh revision 3 site validation, browser, theme, mobile, focus and export checks passed. Earlier pending statements describe the pre-integration stage; state/presentation-qa.json and current quality gates record completed review. This is source and presentation verification, not benchmark reproduction.
