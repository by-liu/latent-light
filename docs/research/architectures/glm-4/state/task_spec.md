# GLM-4

## Primary question

What does the original GLM-4-9B-Chat checkpoint reveal about attention, long context and model versus tool-system capability?

## Intended reader and use

Researchers and builders with Transformer foundations.

Learning goal: Explain 32-query/2-KV attention, selected code positional contract and KV memory; distinguish 9B chat from GLM-4 API and 1M variant.

## Scope and time boundary

ChatGLM family report 2406.12793v2; original zai-org/glm-4-9b-chat card, config, tokenizer, modeling_chatglm.py and custom license.

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

Original All Tools Figure 4, original explanatory network/cache flow. Every numbered figure has a specific lesson, complete labels, attribution and reuse basis. Source PDF files remain outside the public repository. Inspect crops and browser presentation at desktop and mobile widths; use focus and full-size access for dense figures.

## Research map

- Report: mechanisms, experiments, data and compute disclosure.
- Released artifact: dimensions, attention state and template.
- Targeted code: bridge configuration to actual operations.
- Licenses: separate weights, code, report and figure rights.
- Skeptical direction: Do not attach closed GLM-4-0520 scores or 1M checkpoint limits to the selected 9B-Chat artifact.

## Budget and checkpoints

Four bounded passes: report reading; artifact/code checks; targeted counterevidence and visual selection; synthesis plus structural/visual QA. Stop when consequential claims have inspected primary evidence and unresolved reproduction gaps are explicit. Do not broaden into release marketing or unsupported later generations.

## Success criteria

A reader can explain the model's distinctive contribution, trace one input through its architecture/training/inference, read scoped numbers and judge the strongest ablation without confusing artifacts or asserting undisclosed facts. No placeholder public content.

## User-supplied facts

User requests major missing GLM family studies, useful original report figures, report/Hugging Face resource links and family navigation.

## Assumptions and decisions

Select distinct report-backed lessons rather than every patch. Contracts refined after initial source access; the run ledger records the actual order rather than claiming an earlier checkpoint.
