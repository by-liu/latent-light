# DeepInfer coverage audit

Evidence cutoff: October 20, 2026. Canonical output:
`src/content/docs/inference/deepinfer.mdx`.

## Scope and completeness

This is a release and systems study, not a model technical-report template.
The model backbone has its own linked study. The release README, official
deployment Q&A, benchmark methodology, runtime paths and Recipe code are the
primary account. Search results and inaccessible announcement pages are not
evidence.

| Topic | Inspected evidence | Page treatment |
| --- | --- | --- |
| Released engine versus full service | S001, S003, S005 | Scope table; explicit local-cache versus distributed-service boundary |
| Recipe versus inference and transport | S002, S024 | Opening resources and protocol section; mock service clearly labelled |
| Hardware and prerequisites | S001, S004, S025, S026 | Declared SM100/Ascend 950 support; compatible checkpoint and build warnings |
| Full production topology | S003, S031 | Original Figure 2; released and unreleased components distinguished |
| Attention DP, EP and placement | S003, S004, S006 | Prefill EP2–8 versus decode EP64–128; support differs from current production use |
| Global state and bounded local replay | S003, S007, S008 | Original explanation in Figure 3; approximate boundary; 128 versus 140 |
| Confidence-guided verification | S009, S010, S029 | Cumulative confidence equation; lagged CPU budget and GPU correction |
| CPU/GPU overlap | S010 | Figure 4; dependencies retained, not zero CPU work |
| Kernels and low precision | S001, S003, S011–S014 | Component roles; selected FP4 use, not a uniformly four-bit stack |
| Prefill curve | S001, S004, S015, S032 | Figure 5; non-cached input, four SM100, step latency not total TTFT |
| EP scaling curve | S003, S015, S016, S033 | Figure 6; request/rank labels, 75% assumption, fixed three drafts |
| Throughput accounting | S015, S016 | Equation 2; raw full-acceptance counter versus adjusted plotted values |
| Variable verification gain | S003 | Different fixed-five baseline; low-load regression retained |
| Production numbers | S003 | First-party report; token mix unknown; revenue not profit |
| Quality protocol | S017 | Pass@1 sample accounting; scoring and complete-coverage requirements |
| Prompt/control-token boundary | S018, S019 | Content encoded without control vocabulary; not a general prompt-injection solution |
| Incremental delivery | S020, S021 | UTF-8 and delimiter state; token identity preserved only with token-aware parsing |
| Structured output | S002, S022, S023 | Backend masks required; grammar-cache budget; output validity differs from truth |
| Practical recipes | S002, S004, S023–S028, S030 | Four entry points; fragments syntax checked, no upstream execution |

## Purposeful visual inventory

Six figures, all numbered and described in the complete Markdown export.

1. AI-generated release overview: conceptual request path, four efficiency ideas
   and released-versus-surrounding-service boundary. Prompt and correction retained.
2. Full production architecture, reproduced unchanged under Apache 2.0.
3. Independent explanation of global history and bounded local replay.
4. Independent scheduling-overlap explanation, not measured durations.
5. Original prefill operating curve, unchanged axes and conditions.
6. Original EP8/EP64 decode comparison, unchanged conditions and labels.

The single EP64 decode chart was inspected but omitted because that curve is
already present in Figure 6. The generated overview is an explanatory map, not a decorative poster or a
new benchmark. No generated benchmark image was added. Original PNGs are byte-identical to the pinned
source; rights, hashes and unchanged copies of both upstream licenses are
retained. Native explanatory SVGs remain editable.

## Contradiction and overclaim checks

- Cache implementation exists even though the full production cache service is absent.
- Bounded replay is approximate; mask/compact equivalence is not full-history equivalence.
- The conceptual 128-token window is not the configured 140-token retained suffix.
- CP is supported in examples but not described as the current production choice.
- Fixed-three acceptance-adjusted plots differ from the dynamic-versus-fixed-five comparison.
- The 3.25 factor is the plotter's convention, not a speculative decoding theorem.
- Per-rank concurrency is not total concurrency.
- Prefill step time is not complete TTFT; engine throughput is not an online SLA.
- Dynamic verification loses 1.5% at one published low-load point.
- Production tokens/day are not established to be generated output; revenue is not profit.
- Repeated samples estimate Pass@1, not best-of-N success.
- Control-token handling does not authorize tool execution or prevent all prompt injection.
- Model support does not establish equal performance across hardware.
- No cross-framework benchmark, independent energy result or complete production deployment is claimed.

## Remaining evidence gaps

The supplied X announcement and Zhihu page returned HTTP 403 in this
environment. The official deployment Q&A explicitly builds on the Zhihu
article and provides the accessible primary account. No passages from the
blocked pages are attributed as inspected evidence.

No GPU inference, benchmark, upstream test, checkpoint or remote model code
was executed. The inspected release does not supply a controlled all-framework comparison
or public production token mix/cost breakdown. These limits are part of the
conclusions, not omitted work that a local documentation task can settle.
