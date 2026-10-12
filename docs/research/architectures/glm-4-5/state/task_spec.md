# GLM-4.5

## Primary question

How does GLM-4.5 combine sparse capacity, specialist-to-generalist post-training and tool-aware RL?

## Intended reader and use

Researchers and builders with Transformer foundations.

Learning goal: Explain expert routing versus specialist policies, processed training tokens, MTP, curriculum ablation, and synchronous versus asynchronous rollout systems.

## Scope and time boundary

GLM-4.5 report 2508.06471v1; representative zai-org/GLM-4.5 config/card; GLM-4.5-Air comparison; Transformers v4.57.1 targeted MoE code.

Evidence checked October 10, 2026; historical reports retain their explicit release/version dates. Later patches and API models are not interchangeable evidence.

## Exclusions

No weight download, checkpoint execution, performance reproduction, private data, confidential work, API billing, deployment, or external mutation. No exhaustive patch-release catalog.

## Deliverables

- Canonical, source-grounded report.md and derived public MDX page.
- Claim, source, run and visual ledgers.
- Useful original report figures with documented reuse basis.
- Explicit counterevidence, undisclosed details and focused next questions.

## Report contract

Markdown canonical report; approximately 12 to 18 minutes of technical reading. Claim-local native footnotes in the public page. Public educational material only. No visible hashes, private correspondence or contact details. Refresh when a new substantive technical report changes the architecture or training lesson.

## Visual contract

Original training Figure 3, RL length Figure 6, Slime Figure 10; compact original network flow. Every numbered figure has a specific lesson, complete labels, attribution and reuse basis. Source PDF files remain outside the public repository. Inspect crops and browser presentation at desktop and mobile widths; use focus and full-size access for dense figures.

## Research map

- Report: mechanisms, experiments, data and compute disclosure.
- Released artifact: dimensions, attention state and template.
- Targeted code: bridge configuration to actual operations.
- Licenses: separate weights, code, report and figure rights.
- Skeptical direction: Audit count conventions, small-model ablations, agent harness effects and hidden training compute; do not call bias balancing auxiliary-loss-free.

## Budget and checkpoints

Four bounded passes: report reading; artifact/code checks; targeted counterevidence and visual selection; synthesis plus structural/visual QA. Stop when consequential claims have inspected primary evidence and unresolved reproduction gaps are explicit. Do not broaden into release marketing or unsupported later generations.

## Success criteria

A reader can explain the model's distinctive contribution, trace one input through its architecture/training/inference, read scoped numbers and judge the strongest ablation without confusing artifacts or asserting undisclosed facts. No placeholder public content.

## User-supplied facts

User requests major missing GLM family studies, useful original report figures, report/Hugging Face resource links and family navigation.

## Assumptions and decisions

Select distinct report-backed lessons rather than every patch. Contracts refined after initial source access; the run ledger records the actual order rather than claiming an earlier checkpoint.
