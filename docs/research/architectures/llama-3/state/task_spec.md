# Llama 3 and 3.1 deep dive

## Primary question

What makes Llama 3 and 3.1 distinctive, how does its released model work, and what evidence supports its value?

## Intended reader and use

Learners with Transformer fundamentals. Explain model specific mechanisms, training and serving tradeoffs, rather than reproduce a report or claim runtime benchmarking.

## Scope and time boundary

## Scope and scale

This study anchors dimensions and compute to **Llama 3.1 8B**, released July 23, 2024. The report covers both April Llama 3 and July Llama 3.1. Most detailed training discussion defaults to the 405B model unless it states otherwise; those details must not silently become an exact 8B recipe.[^1][^2]

| Item | Llama 3.1 8B |
| --- | --- |
| Parameters | Approximately 8B, dense |
| Decoder | 32 layers; width 4,096; FFN width 14,336 |
| Attention | 32 query heads, 8 KV heads |
| Pretraining scale | About 15T tokens; card describes the family as 15T+ |
| Training compute | 1.46M H100 80GB GPU hours |
| Context | 128K tokens |
| Availability | Pretrained and Instruct weights; custom license and access conditions |

Dimensions come from report Table 3; data, compute, and context come from the official card. GPU hours are accumulated device time, not elapsed wall-clock duration. The report’s 3.8 × 10²⁵ FLOPs belongs to the 405B training run, not the 8B checkpoint.[^1][^2]

The official card and license were inspected at a pinned repository revision. The selected Hugging Face weight repository is access-gated, so its configuration was not directly inspected. No weights were downloaded or benchmarked. Public library code was inspected to trace the relevant decoder and cache contracts.[^2][^3][^4]
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

## Revision 4 visual contract supersedes the initial restriction

Prefer purposeful original report artwork with a documented basis: license, permission or an assessed applicable exception. Missing permissive terms alone do not require omission. Inspect embedded third-party material and exact figure scope; preserve copyright, attribution, version and crop records. Keep independent diagrams when they teach a different mechanism. This supersedes earlier original-only or explicit-license-only selection rules; it does not authorize full-paper redistribution. No commit, push, deployment or model execution.
