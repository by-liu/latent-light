# gemma-2: coverage audit

Evidence cutoff 2026-10-10. Representative scope: 9B pretrained recipe and implementation; scoped2B and27B contrasts.

## Reviewed coverage

- Primary report: Main architecture/training/post-training §§2–4; ablations Tables6–11; academic evaluation and memorization §7,Figure1.
- Scoped highlights and number table distinguish disclosed,derived and undisclosed values.
- Architecture interfaces,normalization,attention/head/cache contracts and distinct mechanism explained.
- Training stages,post-training omissions,variant-specific data and objective boundaries retained.
- Prefill/decode or processor state traced in selected implementation,not model-executed.
- Published evaluation/ablation protocols separated from causal architecture and runtime claims.
- 2 numbered figures: one original mechanism/interface SVG and 1 original report crops;all rendered assets manually inspected.
- Source/software/model licenses distinguished;no whole report PDF or weights published.
- Canonical report includes the full MDX teaching content,not an abbreviated internal summary.

## Reconciliation and omitted material

- Report counts sum to approximately 9.242B total 9B weights. Boundary: Rounded component totals; embeddings included once.
- 9B trains on 8T tokens with 4096 TPUv 4 chips;2B uses 2T and 27B13T. Boundary: Exposures are not distinct-corpus size.
- 2B/9B pretraining minimizes teacher/student distributional cross-entropy;27B is not distilled. Boundary: The complete final teacher/setup is not released. No on-policy pretraining assumption.
- Both attention andFFN normalize their input and output updates before residual addition. Boundary: Output normalization is not a norm over the whole summed residual.
- Eager attention applies scale,soft-cap,mask,softmax; cap after a negative-infinity mask would weaken prohibition. Boundary: Order traced in the selected implementation, not every optimized backend.
- 27B uses query_pre_attn_scalar 144 though head_dim 128. Boundary: Do not substitute default head scaling for this model.
- AtT8192 andW4096, ideal half-local/half-global equal-head cache ratio is 0.75. Boundary: Not measured resident memory; not evidence of support for longer contexts.
- A500B-token internal 2B distillation experiment reports three-benchmark means 60.3 versus 67.7. Boundary: This is not a measured final9B causal gain.
- Internal 9B MHA/GQA means are 50.3 and 50.8 overfour benchmarks. Boundary: Internal comparison; not application latency.
- 9B inference window ablation reports perplexities 1.63,1.63,1.64 at 4096,2048,1024. Boundary: Task accuracy and serving latency are not established by this table.
- Post-training includes synthetic/human SFT,RLHF and model averaging; exact RL algorithm unspecified. Boundary: Teacher supervision on student distribution is a post-training description.
- The memorization figure uses logarithmic axes and prompted-prefix matching;low rates are not universal privacy guarantees. Boundary: Protocol-specific results.

## Pending validation

Parent will integrate navigation/catalog/tests and run full site validation,1440px desktop,390px mobile,320px dark,focus,pan/full-size,footnote/resource links,Markdown/MDX exports and agent manifests. State remains verifying;source and asset checks are not falsely described as complete browser/runtime review.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

No unresolved source/artifact contradiction is silently presented as a complete recipe.
