# DeepInfer figures and code attribution

Inspected October 20, 2026. Source snapshot:
https://github.com/deepseek-ai/DeepInfer/tree/774ce244b87cc0eb8d4b94ab9f5de2ab22049f01

## Reproduced source artwork

DeepSeek-AI supplies the original documentation figures below. The root
repository LICENSE is Apache License 2.0, applies to source documentation,
and no narrower artwork terms or upstream NOTICE were found in the inspected
release. A complete unchanged license is retained at
/licenses/deepinfer-Apache-2.0.txt. The images contain technical shapes, labels
and plotted data, not extracted photographs or identity artwork.
They are reproduced byte for byte: no crop, recoloring, redrawing or resampling.
These images are not relicensed under Latent Light's MIT grant.

- architecture_overview.png: original doc/images/architecture_overview.png,
  linked in doc/inference_deployment_qa.md, Inference system overview.
  1727 × 911. Full production architecture; some pictured service components
  are not included in the public engine.
  SHA-256: a04aed83c96ddc4a6ec7e578b961d8a3fdbea16ac72a4f51b3cc2221b858beb5
- prefill_pareto.png: original doc/images/prefill_pareto.png, linked from README.
  1350 × 930. Original axes, 131072-token context, EP4/DP4, 384+32 experts,
  140-token replay and all point labels retained.
  SHA-256: ef3c63e857e3340890abe2fb8379f8c8e2564c6a104975b09634875bfdc33741
- wide_ep_decode_pareto.png: original doc/images/wide_ep_decode_pareto.png,
  linked in doc/inference_deployment_qa.md, Wide-EP comparison.
  1350 × 930. Original EP8/EP64 labels, expert counts, axes, per-rank concurrency,
  fixed nextn=3 and supplied acceptance 75% retained. The linear tau=3.25 factor
  is a plotting convention, not independently measured universal acceptance.
  SHA-256: 719594a75b14cbb14ddba69872eb44be7a328729716dfb3838ce59dbf898ab7c

The single decode_pareto.png curve was inspected but omitted because its EP64
curve is already included in the two-configuration comparison.

## Original explanations

- bounded-replay.svg: original code-authored independent explanation of global
  state versus approximate local replay, informed by deployment Q&A and
  csrc/engine/input_metadata/prepare_tensor_input_v4.cpp.
  1120 × 590. MIT. Not a source figure or benchmark.
  SHA-256: d8d45c5d194b4e675e6990499d350f3579d28d6e40a21a7b8d901f31ee0031eb
- overlapped-scheduling.svg: original code-authored independent scheduling
  intuition, informed by deepinfer/worker/worker.py and the deployment Q&A.
  1120 × 595. MIT. Bar geometry is not a measured timeline or a promise of
  eliminating all idle time.
  SHA-256: 216b14cc51e88ea47cd213fbd456fe1e1578f3aeaaf2808eb6e727ed1a008276

Both SVGs are their own editable sources. No source artwork was traced.

## Adapted recipes

The configuration and shell examples are adapted from DeepInfer's Apache-2.0
README, examples/_structured_output.py, examples/README.md, examples/_config.py,
and examples/sweep/run_sweep.sh. Preserve the linked license. Related source
files retain their vLLM-derived notices; no implementation is copied here.

The prompt-rendering example is adapted from deepseek-recipe's MIT-licensed
README at revision 935817c66f5d6e64838f419692545f06787e485f.
Copyright (c) 2026 DeepSeek. Its unchanged MIT notice is retained at
/licenses/deepseek-recipe-MIT.txt. No bundled tokenizer or weights are copied.

No kernel, model, benchmark, upstream test or recipe was executed for this article.


## Generated release overview

overview.png is an independent AI-generated synthesis of the inspected release,
not a reproduced DeepSeek figure, a bundled service diagram or a benchmark.
1536 × 1024 RGB PNG, copied unchanged from the selected built-in image_gen
output. No source artwork or logo was used as a reference. A targeted edit
corrected the verification prefix/suffix labels before use.
SHA-256: d8b6092fe562472a0b8a15ae7e002eb00bc673aae3f558b296cbd89288132c34.

The exact initial prompt, correction prompt, factual inputs and review are
retained in docs/research/inference/deepinfer/visuals/overview-prompt.md.
The page labels it AI-generated and keeps a full text equivalent. Illustrative
token counts, expert tiles and timeline geometry are not measurements.
Original generated project artwork is offered under MIT terms to the extent
applicable; it is not evidence of a new DeepSeek result.
