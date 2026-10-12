# gemma: coverage audit

Evidence cutoff 2026-10-10. Representative scope: Original 7B pretrained, with original 2B attention contrast.

## Reviewed coverage

- Primary report: Architecture and Tables1–2; training/instruction tuning pp3–5; evaluation Figure1 and Tables5–7; targeted original-vs1.1 appendix boundaries.
- Scoped highlights and number table distinguish disclosed,derived and undisclosed values.
- Architecture interfaces,normalization,attention/head/cache contracts and distinct mechanism explained.
- Training stages,post-training omissions,variant-specific data and objective boundaries retained.
- Prefill/decode or processor state traced in selected implementation,not model-executed.
- Published evaluation/ablation protocols separated from causal architecture and runtime claims.
- 2 numbered figures: one original mechanism/interface SVG and 1 original report crops;all rendered assets manually inspected.
- Source/software/model licenses distinguished;no whole report PDF or weights published.
- Canonical report includes the full MDX teaching content,not an abbreviated internal summary.

## Reconciliation and omitted material

- Original 2B shares one KV head across eight query heads. Boundary: Do not transfer MQA to original 7B.
- Report parameter boundaries sum to approximately 8.538B total original 7B weights. Boundary: Rounded summands; tied embeddings counted once.
- Original 7B pretraining uses 6T tokens and 4096 TPUv 5e chips. Boundary: Token exposures are not unique corpus size. Full FLOPs and duration undisclosed.
- Attention projection width 16 times 256 equals 4096, not residual width 3072. Boundary: A general convention is not a mandatory Transformer identity.
- Official 7B FFN gate/value branch width is 24576; report hidden dimension is 49152. Boundary: The numerical double does not establish an explicitly documented report counting convention.
- Ideal unquantized batch-one KV cache at 8192 two-byte positions is 3.5GiB for 7B and 144MiB for 2B. Boundary: Not measured resident memory; excludes weights, allocator and activations.
- Instruction tuning uses synthetic/human English pairs, followed by Bradley-Terry reward learning and unnamed novel RL. Boundary: Do not infer PPO, DPO or GRPO.
- Report v 4 includes Gemma 1.1 preference results, distinct from original 1.0. Boundary: Main preference table must not be attributed to the original instruction release.
- Original figure 1 groups benchmarks; complete-model comparisons do not isolate architecture causality. Boundary: Baseline prompting and aggregation differ.

## Pending validation

Parent will integrate navigation/catalog/tests and run full site validation,1440px desktop,390px mobile,320px dark,focus,pan/full-size,footnote/resource links,Markdown/MDX exports and agent manifests. State remains verifying;source and asset checks are not falsely described as complete browser/runtime review.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

No unresolved source/artifact contradiction is silently presented as a complete recipe.
