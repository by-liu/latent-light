# Gemma 3 deep dive

## Primary question

What makes Gemma 3 distinctive, how does its released model work, and what evidence supports its value?

## Intended reader and use

Learners with Transformer fundamentals. Explain model specific mechanisms, training and serving tradeoffs, rather than reproduce a report or claim runtime benchmarking.

## Scope and time boundary

## Scope and scale

This study focuses on the **March 2025 Gemma 3 27B** architecture, with the 27B instruction-tuned model anchoring assistant evaluations. It does not treat later 270M additions, Gemma 3n, or newer Gemma generations as part of the original report.[^1][^2]

| Item | Gemma 3 27B |
| --- | --- |
| Reported components | 25,600M non-embedding parameters; 1,416M embeddings; 417M vision encoder |
| Pretraining budget | 14T tokens accounting for a text and image mixture |
| Training hardware | 6,144 TPUv5p chips; duration and total FLOPs undisclosed |
| Context | 128K tokens |
| Visual interface | 896 × 896 encoded views; 256 soft tokens per view |
| Variants | Pretrained and instruction-tuned; raw and quantization-aware checkpoints |
| Model terms | Gemma Terms of Use and incorporated use restrictions |

Counts and hardware are report Tables 1–2. The 14T budget is not an image count or a disclosed text-only corpus size. The selected Hugging Face 27B checkpoint is gated, so its exact config and processor artifact were not directly inspected. Public implementation files were inspected, but generic library defaults are not substituted for inaccessible checkpoint values.[^1][^3][^4][^5][^6]
Evidence inspected October 10, 2026. Historical reports and selected released artifacts; not an exhaustive current leaderboard.

## Exclusions

No weight downloads, execution of downloaded model code, paid compute, confidential material, protected figure copies, commits, pushes, deployment or automatic refresh scheduling.

## Deliverables

Canonical report.md, derived MDX page, source/claim/run/visual ledgers, original responsive architecture schematic, honest access and disclosure limits.

## Report contract

Markdown canonical narrative and MDX website derivative share authored content. Reader first depth, about 8 to 12 minutes plus expandable implementation details. Claim local native footnotes. Public safe original prose. Evidence cutoff October 10, 2026; refresh only on request.

## Visual contract

One useful original flow view connecting input, distinctive computation and output. Caption, stable Figure 1 anchor and essential meaning retained in prose. No source figures copied. Browser review by coordinating agent is pending.

## Research map

Report establishes motivation, mechanisms, training stages and conditional results. Released card/config/license establishes checkpoint identity and availability. Pinned source functions resolve targeted runtime contracts. Skeptical pass checks variant conflation, unsupported causal claims, token/word/exposure units, missing recipes and inference claims.

## Budget and checkpoints

Bounded model study within a parallel portfolio. Complete one pilot before scaling prose; primary report and artifact pass, targeted implementation pass, separate adversarial evidence review, canonical synthesis and structural checks. Stop rather than invent inaccessible artifacts.

## Success criteria

Opening highlights and scale are clear and sourced. Architecture, defining mechanism, disclosed training, inference, evaluation and limitations are meaningful. Numeric conditions retained. Research validator passes; full website and browser review remain with coordinating agent.

## User-supplied facts

User requests important models with public weights and reports, high quality presentation, restrained purposeful figures, and parallel agents.

## Assumptions and decisions

One representative checkpoint anchors concrete dimensions; related variants are discussed only where relevant. Original diagrams are explanatory synthesis, not copied paper artwork.
