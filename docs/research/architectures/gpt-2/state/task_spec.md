# GPT-2 study contract

## Primary question

What did GPT-2 change, how do its released model and generation contracts work,
and what do the report and artifacts actually establish?

## Intended reader and use

A technically curious reader building a foundation for modern LLMs. Learn to
connect an autoregressive objective, decoder computation, and generation state.

## Scope and time boundary

2019 report and the released small GPT-2 checkpoint, represented by the
openai-community/gpt2 artifact. Inspect the original model and sampling source,
configuration, tokenizer description, license, and evaluation conditions.
Evidence checked October 10, 2026. Historical results remain historical.

## Exclusions

No weight downloads, checkpoint execution, code execution, modern leaderboard
ranking, deployment recommendation, private information, or copied paper figures.

## Deliverables

Canonical report.md with native footnotes, adapted MDX at the stable GPT-2 route,
source and claim ledgers, run history, and a visual manifest.

## Report contract

Keep the introduction short and the mechanism explanation complete. Secondary
counts can be expandable.
Reports and records are intended for public sharing. No automatic refresh or
commit, push, or deployment is authorized.

## Visual contract

Retain the original responsive decoder/residual diagram after checking its
relationships against pinned code. Caption it Figure 1 and cite the source.
Provide a full text equivalent and equations in the canonical Markdown report.
Additional visuals are unnecessary unless they teach a distinct relationship.

## Research map

- Identity and openness: model card, configuration, original repository license.
- Mechanism: model.py embeddings, attention, FFN, normalization and cache.
- Training and transfer: report sections 2 and 3, not assumptions from later LLMs.
- Generation: sample.py caller state and sampling boundaries.
- Skeptical pass: parameter labels across report/release, overlap analysis,
  nonuniform task gains, undisclosed training budget, and bias limitations.

## Budget and checkpoints

One bounded source inspection pass, a separate adversarial claim and count pass,
and rendered desktop/mobile plus export checks. Pivot to primary raw artifacts
if web extraction fails. Do not spend time collecting redundant sources.

## Success criteria

Opening highlights and meaningful sourced scale; exact artifact/configuration;
correct mask, normalization, tied head and incremental cache explanation;
disclosed training and conditional results; no invented recipe or runtime test;
legible numbered figure and equations; complete text exports; validated evidence
state and site. Leave review gates pending until their checks are performed.

## User-supplied facts

The user requests important public model studies using the existing guidance.

## Assumptions and decisions

The small released checkpoint is an editorial teaching choice; its original
paper label and released parameter count are not silently treated as identical.

## Revision 3 coverage audit

User requests a thorough check of figures and important mechanisms for every study. Compare the pinned report (including relevant appendices), targeted code and current page. Record a coverage matrix and figure selection decisions in coverage-audit.md. Add useful licensed source figures or independent diagrams, not a quota. Preserve variant, training/inference, evaluation and licensing boundaries. No commit, push, deployment or model execution. A second source-entailment pass and fresh site/visual/export checks are required.
