# Mamba deep dive

## Primary question

What makes Mamba distinctive, how does its released model work, and what evidence supports its value?

## Intended reader and use

Learners with Transformer fundamentals. Explain model specific mechanisms, training and serving tradeoffs, rather than reproduce a report or claim runtime benchmarking.

## Scope and time boundary

## Scope and scale

This study covers **original Mamba**, published in December 2023, and the released **mamba-2.8b** base language checkpoint. Mamba-2 and later hybrids are different architectures and are not substituted into this explanation.[^1][^2]

| Item | Original Mamba 2.8B |
| --- | --- |
| Parameters | Approximately 2.8B |
| Stack | 64 blocks; model width 2,560 |
| Mixer dimensions | Inner width 5,120; state size 16; short convolution width 4 in inspected Mamba1 defaults |
| Pretraining | 300B tokens from the Pile; GPT-NeoX tokenizer |
| Training sequence length | 2,048 tokens |
| Training compute | Total FLOPs and GPU-hour budget not disclosed in the inspected report |
| Generation state | Fixed per-layer convolution and SSM states, independent of sequence length |
| Availability | Base checkpoint and Apache 2.0 implementation; no original assistant recipe established here |

The checkpoint config pins layer count and width and leaves its SSM settings empty; the inspected Mamba1 implementation supplies expansion 2, state size 16, and convolution width 4. These are traced defaults, not values written explicitly in the checkpoint JSON. Code inspection did not execute weights or measure serving performance.[^2][^3][^4]
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
