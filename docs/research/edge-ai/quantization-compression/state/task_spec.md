# Quantization and compression

## Inquiry

How do low-bit representations and sparsity reduce deployment cost, and when do they fail?

## Intended reader and use

Technical readers preparing a model for edge deployment

Learning or decision goal: Distinguish what is compressed, how quantization error is controlled, and what must be preserved to obtain real device savings.

## Scope and time boundary

Weights, activations, KV, calibration, PTQ, QAT, pruning and backend contracts; primary evidence checked 2026-10-12.

Evidence boundary: Primary papers and official backend documentation inspected by October 12, 2026. No converted model, device benchmark or checkpoint execution is claimed.

## Exclusions

Excludes installation instructions, complete backend catalogs, latest benchmark rankings and unsupported performance predictions.

## Deliverables

- Repository page `src/content/docs/edge-ai/quantization-compression.mdx` is the canonical narrative.
- Source, claim, run and visual records support the narrative.
- Counterevidence, uncertainty and actual review results remain explicit.

## Output contract

- Kind: site-page
- Canonical path: src/content/docs/edge-ai/quantization-compression.mdx
- Reading depth: Technical learning page with quantizer math, worked example, PTQ/QAT contrasts, AWQ/GPTQ/SmoothQuant mechanisms, calibration, KV, pruning and format pitfalls.
- Structure: Chosen for the inquiry, not a fixed report outline.
- Citation style: Claim-local footnotes for site pages.
- Evidence cutoff: October 12, 2026 for inspected mutable documentation.
- Refresh expectation: Recheck backend format and kernel contracts when updating deployment advice.
- Distribution and privacy boundary: Public-safe repository and output.

## Visual contract

Use a visual where it materially clarifies understanding. No figure quota.
Keep important text equivalents, evidence, attribution and reuse records.

## Research map

- Evidence dimensions and resolving sources: Jacob et al. for quantization aware training; GPTQ, AWQ and SmoothQuant for PTQ; KIVI for KV; SparseGPT and official sparsity documentation for pruning; official runtime documentation for format and hardware constraints.
- Skeptical direction: Model bit width does not establish end-to-end speed; activation outliers and distribution shift can defeat calibration; zeros do not guarantee sparse kernels; quantized weights do not quantize KV automatically.

## Budget and checkpoints

Use a primary-method pass and separate deployment/counterexample pass, then verify the worked arithmetic and every algorithm boundary.

## Success criteria

Locally cited mechanisms and caveats, a reproducible worked calculation, sequential equations and one purposeful original flow. Public-safe schema 3 records. Parent integration owns final validation, rendered review and exports; leave gates pending until performed.

## User-supplied facts

The user requested the Edge AI collection and authorized parallel research. This page is a mechanism study, not a checkpoint biography.

## Assumptions and decisions

Schema 3 initialized at 2026-10-13T04:11:08Z. No site page was created or overwritten.

## Visual enrichment revision 2

User-authorized continuation adds one distinct primary-source figure alongside the existing flow. Exact source artwork and associated text are inspected, usage rights and extraction recorded, and current rendering/export gates invalidated. No shared code, navigation, full validation, servers or external publication are part of this scoped revision.
