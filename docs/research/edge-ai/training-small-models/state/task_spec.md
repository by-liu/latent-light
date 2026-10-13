# Training capable small models

## Inquiry

How do data, distillation and post-training allocate scarce small-model capacity to a useful task?

## Intended reader and use

Technical readers adapting and evaluating small edge models

Learning or decision goal: Understand how data, teacher supervision and post-training concentrate a small model's finite capacity, and how to test the resulting capability boundary.

## Scope and time boundary

Data, distillation, SFT, preferences and capability tradeoffs; primary evidence checked 2026-10-12.

Evidence boundary: Inspected primary papers and official model or dataset reports by October 12, 2026. Proposed application workflow is labeled synthesis; no training run or evaluation is claimed.

## Exclusions

Excludes training infrastructure setup, costs without source evidence, complete released-model biographies and claims that benchmark scores establish product reliability.

## Deliverables

- Repository page `src/content/docs/edge-ai/training-small-models.mdx` is the canonical narrative.
- Source, claim, run and visual records support the narrative.
- Counterevidence, uncertainty and actual review results remain explicit.

## Output contract

- Kind: site-page
- Canonical path: src/content/docs/edge-ai/training-small-models.mdx
- Reading depth: Technical learning page with data allocation, token and sequence distillation, SFT loss, preference objectives, a concrete domain workflow and skeptical evaluation.
- Structure: Chosen for the inquiry, not a fixed report outline.
- Citation style: Claim-local footnotes for site pages.
- Evidence cutoff: October 12, 2026 for inspected mutable sources.
- Refresh expectation: Recheck model/dataset terms and released evidence before applying the recipe to a new artifact.
- Distribution and privacy boundary: Public-safe repository and output.

## Visual contract

Use a visual where it materially clarifies understanding. No figure quota.
Keep important text equivalents, evidence, attribution and reuse records.

## Research map

- Evidence dimensions and resolving sources: Chinchilla and MobileLLM for deployment versus training budget; Gemma 2 and distillation literature for teacher objectives; Phi and TinyStories for data design; DPO for preferences; LoRA for adaptation; primary contamination or model-collapse work for synthetic/evaluation risks.
- Skeptical direction: Teacher quality can transfer errors; a narrow distribution can inflate benchmark performance; SFT and preferences can trade generality for behavior; synthetic recursion and contamination need independent tests.

## Budget and checkpoints

Use one data/objective pass and a separate contamination/capability tradeoff pass, then verify the illustrative workflow against its explicit assumptions.

## Success criteria

Coherent learning path, primary-source citations, worked hypothetical task, purposeful original supervision figure, public-safe schema 3 records. Parent performs the shared build, rendered and export checks; no unsupported passed gate.

## User-supplied facts

The user requested the Edge AI collection with parallel agent research. Adjacent pages own runtime and broad evaluation detail.

## Assumptions and decisions

Schema 3 initialized at 2026-10-13T04:11:11Z. No site page was created or overwritten.

## Visual enrichment revision 2

User-authorized continuation adds one distinct primary-source figure alongside the existing flow. Exact source artwork and associated text are inspected, usage rights and extraction recorded, and current rendering/export gates invalidated. No shared code, navigation, full validation, servers or external publication are part of this scoped revision.
