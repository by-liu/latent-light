# Output workflow

Read the authoritative Content standards, Research workflow, Development and
Maintenance source pages named in `SKILL.md`. This reference supplies choices
for adapting researched evidence to the requested deliverable, not another
copy of those standards.

## One narrative, useful depth

For a site task, write directly in its canonical Markdown or MDX page. Keep
evidence, exact artifact versions, coverage audits and actual review results
in the research workspace. Nimbus generates HTML and text exports. Do not
create a separately maintained `report.md` article.

For standalone delivery, keep one canonical report and render derivatives
when requested. Do not expose research-state fields as article boilerplate.
An output revision does not automatically refresh its evidence cutoff.

Inspect adjacent pages and components before introducing a presentation
pattern. Follow the destination's hierarchy while preserving URLs. Do not
assume every topic belongs under AI Technology.

## Plan the explanation

Choose the reader's path before writing:

1. What is the subject, task or tension?
2. What should a reader understand in the opening minute?
3. Which concepts or prerequisites must come before the mechanism?
4. Which relationship deserves a visual or exact comparison?
5. Which uncertainty could change the conclusion?
6. Which details are necessary now, and which belong in a focused companion?

These are planning questions, not mandatory article headings. A topic study
does not need a fabricated executive answer. Keep assumptions and material
limitations near the claims, not hidden in a final disclaimer or collapsed
section.

Useful shapes vary:

| Work | Useful reader path |
| --- | --- |
| Mechanism explanation | Motivation, intuition, computation, tradeoffs, evidence |
| Literature synthesis | Shared problem, competing approaches, disagreements, lessons |
| Product or industry landscape | Reader need, value chain, meaningful comparisons, evidence and gaps |
| Human-capability study | Concrete situation, relevant evidence, limits of generalization, practical interpretation |

Use the dedicated guide for a model deep dive. Do not force model scale
tables, training stages, architecture diagrams or resource cards onto other
subjects. Show useful numbers where quantities actually clarify the issue.

## Visual decisions

At each major section, identify what is harder to understand in prose.
Use a visual only when it materially helps. Favor original source figures
when exact notation or the author's visual argument matters and reuse has
a documented basis. An independent diagram can isolate or combine mechanisms.

Choose a table for exact repeated comparisons, a flow for a process, a map
for a landscape, a chart for inspected quantitative data, or prose for one
simple fact. No figure quota is required. Do not duplicate the same argument
in several illustrations or turn an overview into an unreadable poster.

Prefer native SVG or HTML for precise diagrams; generate charts from retained
data and code. Generated illustration can clarify a spatial intuition, but
must not become evidence for formulas, benchmarks or undisclosed internals.
Retain prompts and reference provenance when using it.

Number instructional figures and equations as the site standards require.
Keep captions short and explanatory context in nearby prose. Register the
figure anchor in `visuals.jsonl`. Native diagrams need a complete visible text
equivalent; reproduced figures need meaningful alt text and attribution.

## Reuse local presentation components

Inspect the actual API and Markdown exporter before use:

- `FocusCanvas`: expansion of a useful visual without widening the article.
- `SourceFigure`: cited image assets, theme variants and keyboard panning.
- `ModelFlow`: explicit flow lanes and complete exported steps.
- `ArchitectureAtlas`: the existing shared-mechanism registry; do not force
  unrelated product or human topics into it.
- `MathExpression`: defined notation and sequential numbered display math.
- `ModelResources`: model-study report and checkpoint links only.

These are available choices, not a required component set. Use a small native
table or existing Markdown pattern when it is clearer. New interactive media
needs keyboard support, reduced motion and a useful noninteractive equivalent.
Audio and video need transcripts; no essential lesson should require playback.

## Review in two passes, then as a whole

First review the evidence: inspect what each consequential claim, equation,
comparison and figure actually asserts. Verify source support, scope, dates,
units, causal language and credible counterevidence.

Then review the rendered explanation. Inspect desktop and mobile, light and
dark themes, normal and focus views where relevant, and keyboard behavior of
pannable figures or interactions. Look for actual problems in hierarchy,
readability, flow, density, labels, captions, contrast and repetition.

Read the whole page after the fixes. A technically correct collection of
parts is not necessarily a coherent explanation. Recheck affected rendering
and exports after a material change; do not reuse a successful check from
an earlier version as evidence for the new one.

Verify that Markdown contains the important diagram explanation, examples,
captions, citations, assumptions and equations. Raw component JSON or markup
is not an adequate text equivalent. Check MDX and discovery endpoints, search
and navigation when the scope affects them.

Record concrete checks and unresolved gaps. Completion means accurate,
useful, readable work that satisfies the task contract, not a numeric
self-rating, a fixed number of revisions or a growing source count.
