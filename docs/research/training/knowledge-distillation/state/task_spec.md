# Knowledge Distillation

## Inquiry

Understand why distillation works, how modern LLM and VLM recipes use it, and how to design and evaluate a defensible distillation pipeline.

## Intended reader and use

AI researchers and engineers who understand next-token prediction and want a
connected explanation of distillation from first principles to current LLM/VLM
training. The overview also serves readers seeking a short orientation.

Learning goal: identify the transferred signal, choose an objective and sampling
policy, interpret real training recipes, and design fair evaluations.

## Scope and time boundary

Five connected MDX pages: overview, foundations, modern methods, LLM/VLM recipes,
and practice/evaluation. Historical anchors plus primary work available through
October 14, 2026 (America/Vancouver). Current papers are selected by explanatory
value and disclosure, not an asserted exhaustive SOTA ranking.

Evidence boundary: inspected primary papers, first-party model reports and
official implementation documentation. No checkpoint training or device
benchmark will be represented as executed. Model case studies audit the
distillation disclosures, not every aspect of each model's full report.

## Exclusions

No confidential experience, exhaustive bibliography, paid compute, weight
downloads, deployment, commits, external service mutations or delegated agents.
Speech, retrieval and diffusion are brief extensions, not full new collections.

## Deliverables

- Repository page `src/content/docs/knowledge-distillation/index.mdx` is the canonical narrative.
- Companion narratives are `foundations.mdx`, `modern-methods.mdx`,
  `llm-vlm-recipes.mdx` and `practice-evaluation.mdx` in that directory.
- Sidebar discovery, appropriate existing-page links, purposeful figures and
  complete HTML/Markdown/MDX exports. No duplicate report narrative.
- Source, claim, run and visual records support the narrative.
- Counterevidence, uncertainty and actual review results remain explicit.

## Output contract

- Kind: site-page
- Canonical path: src/content/docs/knowledge-distillation/index.mdx
- Reading depth: short overview; technical companions layer intuition,
  mathematics, implementation and bounded evidence.
- Structure: Chosen for the inquiry, not a fixed report outline.
- Citation style: Claim-local footnotes for site pages.
- Evidence cutoff: October 14, 2026 for inspected evidence, not a guarantee that
  every relevant release or paper has been found.
- Refresh expectation: on request when new disclosed recipes change the lessons.
- Distribution and privacy boundary: Public-safe repository and output.

## Visual contract

Use a visual where it materially clarifies understanding. No figure quota.
Keep important text equivalents, evidence, attribution and reuse records.
Prefer original mechanism figures with reviewed reuse terms when they add
information. Use native diagrams for the collection synthesis and exact toy
calculations. Retain sequential page-local figure/equation numbers.

## Research map

- Foundations: soft labels, temperature, KL, teacher capacity and token/sequence
  factorization; classical KD, SeqKD, MiniLLM and teacher-assistant experiments.
- Methods: independent access/signal/prefix/objective axes; GKD, DistiLLM-2,
  cross-tokenizer likelihood matching, feature matching and recent on-policy work.
- Reasoning/agents: rationale targets, privileged contexts, trajectory feedback
  and the distinction between a distillation target and environment reward.
- LLM/VLM recipes: DeepSeek, Qwen and Gemma disclosures; modality access,
  backbone versus perception transfer and disclosed/undisclosed quantities.
- Practice: stable losses, masking, normalization, teacher costs, controlled
  comparisons, distribution coverage and actual deployment evidence.
- Skeptical direction: style imitation versus new facts and skills; teacher
  errors, reduced diversity, contaminated evaluation and recipe confounds.

## Budget and checkpoints

Bounded passes: (1) foundations and methods, (2) recent recipes and multimodal
evidence, (3) independent challenge/coverage audit, (4) drafting and visual
refinement, (5) validation, browser and export review. Stop accumulating papers
once each key distinction has support and the central uncertainties are clear.

## Success criteria

All five pages are substantial, connected and public-safe. Consequential claims
have local footnotes to inspected evidence; mathematics defines its assumptions;
figures have provenance and complete text equivalents. Latest inspected recipes
do not inherit undisclosed settings. Separate challenge review, research
validation, site validation, desktop/mobile, both themes, Focus, search and
complete exports must be checked and recorded before marking complete.

## User-supplied facts

The user approved the five-page structure proposed in chat. No implementation,
model-training results or private sources were supplied for this collection.

## Assumptions and decisions

Schema 3 initialized at 2026-10-15T04:14:59Z (October 14 local time). Existing
working trees were clean. The destination is Latent Light, not the current shell
workspace. Reuse existing presentation/export components where suitable.
