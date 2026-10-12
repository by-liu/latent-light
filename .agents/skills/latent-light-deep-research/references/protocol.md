# Research protocol

Use this reference for deep or persistent work. The public
`about/content-guidance/research-workflow.mdx` defines the editorial workflow.
This reference defines its research records and tool contract.

## Workspace and canonical output

```text
docs/research/<domain>/<topic>/
  state/
    task_spec.md
    progress.json
    sources.jsonl
    claims.jsonl
    runs.jsonl
    visuals.jsonl
  visuals/       only when needed
  logs/          only when useful for recovery
```

A site task points to its canonical page under `src/content/docs/`.
A standalone-report task points to a report inside its research workspace.
Neither mode requires two maintained narratives. Keep an optional coverage
audit when a complex source needs an explicit mechanism or figure inventory.

Initialize from the repository root:

```bash
python3 .agents/skills/latent-light-deep-research/scripts/init_research.py \
  docs/research/products/topic --title "Topic" --inquiry "Learning goal" \
  --output src/content/docs/products/topic.mdx
```

For a requested standalone report, use `--kind report`; `--output` then defaults
to `report.md` relative to the task directory. The site default requires an
explicit repository-relative page path. `--repo-root` supports a separate
test checkout. `--question` is an alias for `--inquiry`, not a requirement to
formulate every project as a question.

The initializer creates records, not a site page. Refusing a collision protects
user work. Fill the scope and unresolved task-contract fields before broad
research. Do not restart or overwrite an existing workspace to change output.

## Progress schema 3

```json
{
  "schema_version": 3,
  "topic_id": "topic",
  "status": "initialized",
  "coverage": {},
  "open_questions": [],
  "recommended_next_direction": null,
  "last_seen": "2026-10-10T18:00:00Z",
  "output": {
    "kind": "site-page",
    "path": "src/content/docs/products/topic.mdx",
    "status": "working",
    "revision": 1,
    "updated": "2026-10-10",
    "evidence_cutoff": null,
    "audience": "Intended reader"
  },
  "quality_gate": {
    "evidence_verified": false,
    "contradictions_reviewed": false,
    "output_reviewed": false,
    "visuals_reviewed": false
  },
  "delivery_checks": {
    "validation": {"status": "pending", "method": null, "checked_at": null},
    "rendering": {"status": "pending", "method": null, "checked_at": null},
    "exports": {"status": "pending", "method": null, "checked_at": null}
  }
}
```

Task statuses are `initialized`, `researching`, `verifying`, `synthesizing`,
`complete`, `blocked` and `refresh-needed`. Output status is `working`,
`reviewed` or `refresh-needed`. Revision is a positive integer.

`updated` records the narrative revision; it must match the site's
`lastUpdated`. `evidence_cutoff` advances only when the relevant mutable claims
were actually rechecked. Preserve an earlier cutoff during layout-only work.
Do not present either date as proof that every source was freshly inspected.

Delivery statuses are `pending`, `passed`, `failed` and `not-applicable`.
Record the method and UTC timestamp for a performed check. Explain the reason
for `not-applicable` in `method`. A reviewed site output requires all three
checks to pass; a plain standalone Markdown report may legitimately have no
rendering or agent-export check. Attestations cannot replace actual execution.

## Evidence ledgers

Use one JSON object per line. IDs use S, C, R and V prefixes with at least three
digits. Timestamps use ISO UTC; dates use YYYY-MM-DD. Append source, claim and
run history. Revise claims by appending a replacement with `supersedes`.

### Sources

```json
{"id":"S001","title":"Source title","url":"https://example.org/source","source_type":"paper","claim_roles":["mechanism"],"authors":["Author"],"accessed":"2026-10-10","primary":true,"inspected":true,"version":"Inspected edition","license":{"status":"unverified","value":null,"url":null}}
```

Record only inspected sources. Types include `paper`, `standard`, `official-doc`,
`filing`, `dataset`, `repository`, `reporting`, `analysis`, `informal` and `other`.
Claim roles include definition, mechanism, measurement, current-state,
critique, context and anecdote. Add publication dates and publisher when useful.

### Claims

```json
{"id":"C001","claim":"Bounded assertion","kind":"fact","confidence":"high","status":"verified","evidence_refs":[{"source_id":"S001","relation":"supports","locator":{"type":"section","value":"Section title"},"note":"Why this passage supports this claim"}],"caveats":[],"tags":[],"supersedes":[],"ts":"2026-10-10T18:00:00Z"}
```

Kinds are fact, calculation, inference, anecdote and hypothesis. Confidence is
high, medium or low. Status is verified, provisional, disputed or withdrawn.
Verified claims need supporting evidence; disputed claims need genuine
supporting and contradicting edges. Calculations and interpretations cite their
inputs. Do not turn an anecdote into a population-level result.

Locators can be page, section, heading, timestamp, cell, commit, fragment or
other. Use a followable location rather than inventing page or line numbers.

### Runs

```json
{"id":"R001","direction":"Evidence dimension","strategy":"Actual search and inspection approach","deliverable":"Verified coverage","source_classes":["paper"],"claim_ids":["C001"],"questions_resolved":[],"claims_falsified":[],"coverage_changes":[],"result":"productive","next_direction":null,"started":"2026-10-10T18:00:00Z","ended":"2026-10-10T18:30:00Z"}
```

Append runs after they end. Results are productive, stale or blocked.
Progress is verified understanding, resolved uncertainty or useful narrowing,
not the number of sources collected.

### Visuals

```json
{"id":"V001","revision":1,"section":"Mechanism","purpose":"Clarify the information route","type":"architecture","provenance":"synthesis","creation_method":"code","source_ids":["S001"],"claim_ids":["C001"],"output_anchor":"figure-1","editable_source":"../../../../src/components/Example.astro","rendered_asset":null,"alt":"Text equivalent of the route","caption":"Figure 1. Independent explanation informed by the cited source.","license":{"status":"not-applicable","value":null,"url":null},"status":"verified","last_verified":"2026-10-10"}
```

Maintain the current visual manifest; increment revision when content changes.
Types include landscape, architecture, flowchart, timeline, taxonomy, matrix,
chart, map, evidence-map, source-figure and other. Provenance is reproduced,
adapted, source-excerpt, derivation or synthesis. Method is source, code, chart,
image-model or manual. Status is planned, draft, verified or retired.

For site figures, `output_anchor` binds the record to the page's `figure-N` ID.
This works with native components; do not insert invalid HTML comments into
MDX to identify visuals. Standalone reports can use the same IDs or the
`<!-- visual-id: V001 -->` convention.

Asset paths are relative to the research workspace. Use relative paths to
repository assets and components; do not record machine-specific absolute
paths. Assets must resolve inside the workspace or repository. Remote asset
URLs require a matching source and substantive manual review.

A native site diagram can omit a separate `rendered_asset` if it has an
existing editable component and a checked output anchor. Image and chart
assets need a real rendered file. Image-model outputs retain their prompt and
reference provenance as the editable record, not invented vector source.

For reproduced or adapted artwork, retain a source locator and an explicit
reviewed reuse basis. A verified license can establish that basis. Otherwise:

```json
{"reuse_basis":{"kind":"permission","status":"reviewed","record":"../../../../public/figures/topic/SOURCES.md"}}
```

Kinds are license, permission and exception. An exception needs a reasoned
assessment in the record; it is not a license grant. Follow the site's reuse
standards. Structural validation cannot establish legal sufficiency.

## Checkpoints, stalls and completion

Map independent evidence dimensions and a disconfirming direction. Set a
budget based on breadth, consequence, freshness and source accessibility.
Persist state when the direction changes or context becomes difficult to retain.

After an unproductive pass, change a query, source class or subquestion.
Repeated stalls call for a new decomposition, changed assumption or narrower
scope, not cosmetic query variations. Stop when safe in-scope alternatives
are exhausted and state the remaining dependency. Do not invent a blocker
merely because evidence remains uncertain.

Separately verify source identity, entailment, freshness, dates, units,
calculations, independence and counterevidence. Complete only when the task
criteria, active claims, output, visuals and delivery checks pass. Record
remaining uncertainty without implying tests or experiments occurred.

## Existing workspaces

The validator also reads schema 2, retaining its report-based contract.
It does not modify or migrate those records. For an active task, either retain
that contract or deliberately migrate metadata after identifying the canonical
output and preserving its history. Do not bulk-convert completed studies.
Older findings/directions layouts are identified and left untouched.
