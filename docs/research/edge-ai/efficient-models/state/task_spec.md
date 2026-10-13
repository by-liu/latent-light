# Efficient model architectures

## Inquiry

Which architectural choices turn limited memory and compute into useful on-device capability?

## Intended reader and use

Technical readers selecting or studying an edge model

Learning or decision goal: Explain how model width, depth, vocabulary, parameter sharing, KV heads, attention span, recurrent state and expert storage affect an edge budget.

## Scope and time boundary

Architecture mechanisms and storage or state costs; primary evidence checked 2026-10-12.

Evidence boundary: Inspect primary papers and official artifacts by October 12, 2026. Mechanisms and calculations are evidence-backed; no device benchmark or checkpoint execution is claimed.

## Exclusions

Excludes a complete history of every small model, release rankings, training recipes covered by the companion, and runtime measurements not executed here.

## Deliverables

- Repository page `src/content/docs/edge-ai/efficient-models.mdx` is the canonical narrative.
- Source, claim, run and visual records support the narrative.
- Counterevidence, uncertainty and actual review results remain explicit.

## Output contract

- Kind: site-page
- Canonical path: src/content/docs/edge-ai/efficient-models.mdx
- Reading depth: A technical learning page with intuition, a cost ledger, a worked hypothetical decoder, mechanism comparisons and failure conditions.
- Structure: Chosen for the inquiry, not a fixed report outline.
- Citation style: Claim-local footnotes for site pages.
- Evidence cutoff: October 12, 2026 for official material actually inspected.
- Refresh expectation: Recheck mutable checkpoint or backend examples when materially revising; foundational papers retain their own publication dates.
- Distribution and privacy boundary: Public-safe repository and output.

## Visual contract

Use a visual where it materially clarifies understanding. No figure quota.
Keep important text equivalents, evidence, attribution and reuse records.

## Research map

- Evidence dimensions and resolving sources: MobileLLM for sub-billion depth and sharing; GQA and MQA for state; MobileNetV2 for image backbones; Mamba and hybrid papers for recurrent state; Mixtral for stored versus active weights; official released configurations for bounded examples.
- Skeptical direction: Parameter count or asymptotic state saving may not improve latency on the target backend; shared weights retain repeated computation; MoE active count does not determine resident storage.

## Budget and checkpoints

Use a bounded mechanism pass, then a separate claim and counterexample pass. Draft only after each major cost dimension has inspected evidence.

## Success criteria

Explain a coherent decision path with locally cited claims, sequential math and figure numbers, one meaningful original mechanism visual, complete text equivalents, and public-safe schema 3 records. Parent integration will perform full site validation, desktop/mobile rendering and export review; keep these gates pending until performed.

## User-supplied facts

The user requested a ten-topic Edge AI collection under AI Technology and explicitly authorized parallel research agents. This task owns three named pages only.

## Assumptions and decisions

Schema 3 initialized at 2026-10-13T04:11:04Z. No site page was created or overwritten.

## Visual enrichment revision 2

User-authorized continuation adds one distinct primary-source figure alongside the existing flow. Exact source artwork and associated text are inspected, usage rights and extraction recorded, and current rendering/export gates invalidated. No shared code, navigation, full validation, servers or external publication are part of this scoped revision.
