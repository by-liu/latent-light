# Model Deep Dives: coverage register

Evidence cutoff: 2026-10-10. This is the first curated collection, not an exhaustive
list of important models. The website index is
[Model Deep Dives](../../../src/content/docs/architectures/models/index.mdx).

## Inclusion and verification

Select a recognized model generation with a substantive technical report and
identifiable released artifacts. Keep historical restricted releases explicit.
API-only models belong in the release map, not this artifact-based collection.
Public weights, software licensing, training disclosure and reproduced figure
rights are different questions; each study records its own boundary.

These studies inspect reports, pinned configurations or documented access gaps,
licenses, and targeted implementation paths. No weights, untrusted model code,
training jobs or benchmark suites were executed. Scores remain publisher results
under their stated checkpoint, harness and inference conditions.

## Current collection

All 25 studies completed the revision 3 mechanism audit. Revision 4 revisits original artwork selection on six pages under updated reuse guidance. The current collection has 50 original report assets/placements and 69 numbered figures. Historical revision 3 verification follows; fresh revision 4 checks are recorded below. Full site validation, 106 automated tests, 25 research-workspace validators and 81 fresh browser viewport checks passed. Search, agent exports, family navigation, complete desktop art, keyboard-pannable mobile views, full-size links and desktop focus were checked. All 66 model figure renders received manual review; Foundations was included in shared-component regression checks. Existing bundler and redirect warnings remain. These checks do not reproduce model benchmarks.

The report column links the exact primary report version used. Checkpoint and
implementation pins, source locators, claims and remaining uncertainties live
in each model's research workspace and public page. Rendering and export review
results are recorded in the model's progress and run ledgers.

| Study | Representative scope | Primary report | Research workspace |
| --- | --- | --- | --- |
| [GPT-2](../../../src/content/docs/architectures/models/gpt-2.mdx) | Released small 124M model | [Pinned report](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) | [Audit](gpt-2/report.md) |
| [BERT](../../../src/content/docs/architectures/models/bert.mdx) | BERT-Base Uncased | [Pinned report](https://arxiv.org/abs/1810.04805v2) | [Audit](bert/report.md) |
| [T5](../../../src/content/docs/architectures/models/t5.mdx) | T5-Base | [Pinned report](https://arxiv.org/abs/1910.10683v4) | [Audit](t5/report.md) |
| [LLaMA](../../../src/content/docs/architectures/models/llama.mdx) | Original LLaMA 7B; historical restricted release | [Pinned report](https://arxiv.org/abs/2302.13971v1) | [Audit](llama/report.md) |
| [Llama 3 and 3.1](../../../src/content/docs/architectures/models/llama-3.mdx) | Llama 3.1 8B; report spans the family | [Pinned report](https://arxiv.org/abs/2407.21783v3) | [Audit](llama-3/report.md) |
| [Mistral 7B](../../../src/content/docs/architectures/models/mistral-7b.mdx) | Original Mistral-7B-v0.1 | [Pinned report](https://arxiv.org/abs/2310.06825v1) | [Audit](mistral-7b/report.md) |
| [Mixtral](../../../src/content/docs/architectures/models/mixtral.mdx) | Mixtral-8x7B-v0.1 | [Pinned report](https://arxiv.org/abs/2401.04088v1) | [Audit](mixtral/report.md) |
| [DeepSeek-V2](../../../src/content/docs/architectures/models/deepseek-v2.mdx) | Original base model | [Pinned report](https://arxiv.org/pdf/2405.04434v1) | [Audit](deepseek-v2/report.md) |
| [DeepSeek-V3](../../../src/content/docs/architectures/models/deepseek-v3.mdx) | Original December 2024 model | [Pinned report](https://arxiv.org/pdf/2412.19437v1) | [Audit](deepseek-v3/report.md) |
| [DeepSeek-R1](../../../src/content/docs/architectures/models/deepseek-r1.mdx) | Original full R1; students distinguished | [Pinned report](https://arxiv.org/pdf/2501.12948v1) | [Audit](deepseek-r1/report.md) |
| [Qwen3](../../../src/content/docs/architectures/models/qwen3.mdx) | Original Qwen3-235B-A22B | [Pinned report](https://arxiv.org/pdf/2505.09388v1) | [Audit](qwen3/report.md) |
| [GLM-5](../../../src/content/docs/architectures/models/glm-5.mdx) | Original BF16 artifact | [Pinned report](https://arxiv.org/pdf/2602.15763v1) | [Audit](glm-5/report.md) |
| [Kimi K2](../../../src/content/docs/architectures/models/kimi-k2.mdx) | Original July 2025 Instruct | [Pinned report](https://arxiv.org/pdf/2507.20534v1) | [Audit](kimi-k2/report.md) |
| [Kimi K3](../../../src/content/docs/architectures/models/kimi-k3.mdx) | Pinned July 2026 report and main artifact | [Pinned report](https://raw.githubusercontent.com/MoonshotAI/Kimi-K3/3cb39dfd32e51c3328e2e4b4af21341247d06c43/k3_tech_report.pdf) | [Audit](kimi-k3/report.md) |
| [DeepSeek-V4](../../../src/content/docs/architectures/models/deepseek-v4.mdx) | Original Flash preview; Pro comparisons qualified | [Pinned report](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/blob/553034d7dd9e06c2eeaee68cf85a17d6d4754cf0/DeepSeek_V4.pdf) | [Audit](deepseek-v4/report.md) |
| [DeepSeek-V4.1-Flash](../../../src/content/docs/architectures/models/deepseek-v4-1-flash.mdx) | Pinned Flash artifact and reference inference | [Pinned report](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/2cba9e42aa026125f3ed06c6d98c1db82f7ca027/DeepSeek_V41_Tech_Report.pdf) | [Audit](deepseek-v4-1-flash/report.md) |
| [Mamba](../../../src/content/docs/architectures/models/mamba.mdx) | Original mamba-2.8b | [Pinned report](https://arxiv.org/abs/2312.00752v2) | [Audit](mamba/report.md) |
| [Kimi Linear](../../../src/content/docs/architectures/models/kimi-linear.mdx) | Instruct hybrid checkpoint | [Pinned report](https://arxiv.org/pdf/2510.26692v1) | [Audit](kimi-linear/report.md) |
| [CLIP](../../../src/content/docs/architectures/models/clip.mdx) | ViT-B/32 | [Pinned report](https://arxiv.org/html/2103.00020v1) | [Audit](clip/report.md) |
| [BLIP-2](../../../src/content/docs/architectures/models/blip-2.mdx) | OPT-2.7B artifact | [Pinned report](https://arxiv.org/html/2301.12597v3) | [Audit](blip-2/report.md) |
| [LLaVA](../../../src/content/docs/architectures/models/llava.mdx) | Original and LLaVA-1.5-7B | [Pinned report](https://arxiv.org/html/2304.08485v2) | [Audit](llava/report.md) |
| [Qwen2-VL](../../../src/content/docs/architectures/models/qwen2-vl.mdx) | Qwen2-VL-7B-Instruct | [Pinned report](https://arxiv.org/html/2409.12191v2) | [Audit](qwen2-vl/report.md) |
| [Qwen3-VL](../../../src/content/docs/architectures/models/qwen3-vl.mdx) | Qwen3-VL-8B-Instruct | [Pinned report](https://arxiv.org/html/2511.21631v1) | [Audit](qwen3-vl/report.md) |
| [Gemma 3](../../../src/content/docs/architectures/models/gemma-3.mdx) | 27B; IT evaluations separated | [Pinned report](https://arxiv.org/abs/2503.19786v1) | [Audit](gemma-3/report.md) |
| [InternVL 3](../../../src/content/docs/architectures/models/internvl-3.mdx) | InternVL3-8B post MPO artifact | [Pinned report](https://arxiv.org/html/2504.10479v1) | [Audit](internvl-3/report.md) |

## Next candidates

This queue is editorial, not a claim that all artifacts or report versions have
already passed the inclusion test. Research eligibility before commissioning a
new page. Do not add thin placeholders.

| Candidate | Why consider it | Required next check |
| --- | --- | --- |
| BLOOM and OLMo | Contrast training disclosure and reproducibility with weight-only releases | Select generation, report, artifacts and counting scope |
| Llama 2 and Qwen2 | Fill intermediate recipe changes without duplicating existing lessons | Identify the distinctive mechanism and report-level evidence |
| Switch Transformer | Foundational sparse routing comparison | Distinguish original checkpoints and training conditions |
| Later GLM-V editions | Extend the selected GLM-4.1V/4.5V study to newly documented variants | Select the later report edition and artifact before assigning its mechanisms |
| More recent Qwen generations | Keep the collection current without assuming a launch page is a report | Establish substantive report depth and traceable artifacts first |

## Maintenance

A new release does not overwrite an older study. Add a generation when it offers
a distinct lesson; update older pages only to correct or qualify their original
scope. Recheck mutable access or license claims when a reader needs a current
decision. Keep original report/code pins and append source or audit changes.

## Presentation revision, October 10, 2026

Opening resource cards link the original report edition and representative Hugging Face repository. Displayed commit hashes were removed; exact pins remain in research records and immutable URLs. Sidebar families are Llama, Mistral, DeepSeek, Qwen and Kimi; single studies remain direct entries. Original report figures are preferred with a documented reuse basis. Revision 4 adds selected Llama 3 and Qwen artwork under specific exception assessments, not inferred model/code grants. GPT-2 uses original technical diagrams because its report has no architecture/cache figure. The Kimi K2 source illustration retains unchanged noncommercial CC BY-NC-ND 4.0 terms and must be rechecked before monetization. See public/licenses/model-deep-dive-figures.txt and per-asset notices for upstream terms.

## Mechanism and figure coverage audit, revision 3

Each study now has a coverage-audit.md that maps inspected primary sections, appendix details and figure candidates to additions or justified omissions. The audit separates model identity, positions/masks, token and state budgets, data, objectives, numerical precision, post-training, inference, ablations, variant scope and access/rights gaps. Defining mechanisms are included; full benchmark catalogues and undisclosed reproduction details are not invented. No fixed figure quota was imposed.

- [gpt-2 coverage audit](gpt-2/coverage-audit.md)
- [bert coverage audit](bert/coverage-audit.md)
- [t5 coverage audit](t5/coverage-audit.md)
- [llama coverage audit](llama/coverage-audit.md)
- [llama-3 coverage audit](llama-3/coverage-audit.md)
- [mistral-7b coverage audit](mistral-7b/coverage-audit.md)
- [mixtral coverage audit](mixtral/coverage-audit.md)
- [deepseek-v2 coverage audit](deepseek-v2/coverage-audit.md)
- [deepseek-v3 coverage audit](deepseek-v3/coverage-audit.md)
- [deepseek-r1 coverage audit](deepseek-r1/coverage-audit.md)
- [qwen3 coverage audit](qwen3/coverage-audit.md)
- [glm-5 coverage audit](glm-5/coverage-audit.md)
- [kimi-k2 coverage audit](kimi-k2/coverage-audit.md)
- [kimi-k3 coverage audit](kimi-k3/coverage-audit.md)
- [kimi-linear coverage audit](kimi-linear/coverage-audit.md)
- [deepseek-v4 coverage audit](deepseek-v4/coverage-audit.md)
- [deepseek-v4-1-flash coverage audit](deepseek-v4-1-flash/coverage-audit.md)
- [mamba coverage audit](mamba/coverage-audit.md)
- [clip coverage audit](clip/coverage-audit.md)
- [blip-2 coverage audit](blip-2/coverage-audit.md)
- [llava coverage audit](llava/coverage-audit.md)
- [qwen2-vl coverage audit](qwen2-vl/coverage-audit.md)
- [qwen3-vl coverage audit](qwen3-vl/coverage-audit.md)
- [gemma-3 coverage audit](gemma-3/coverage-audit.md)
- [internvl-3 coverage audit](internvl-3/coverage-audit.md)

## Original report figure review, revision 4

Guidance now recognizes licenses, permission and assessed applicable exceptions. Eight source figure crops were added/substituted across Qwen3, Qwen2-VL, Qwen3-VL, Llama 3, DeepSeek-V3 and LLaVA. Distinct worked diagrams remain. All six research states and canonical reports are reconciled, with prior revision 3 audits archived.

Fresh checks: 106 site tests, zero Astro diagnostics, static build and 43 docs lint clean; 18 revised-model viewport checks, 8 guidance views, 18 manually reviewed model figures, all eight source crops inspected, and all 25 model Markdown/MDX exports/search/agent manifests verified. Source excerpt assessments remain distinct from license grants. No model execution, commit, push or deployment. Existing bundler and redirect warnings remain.

## Report-backed family expansion, October 10, 2026

Added 16 full studies; the catalog now contains 41. This pass does not overwrite the historical audit records above. Families GPT, GLM, Gemma and MiniMax join existing collapsed groups; all study URLs remain stable.

| Added study | Exact report | Representative artifact | Numbered figures |
| --- | --- | --- | --- |
| [Qwen2.5](../qwen2-5/report.md) | [Exact report](https://arxiv.org/pdf/2412.15115v2) | [Model repository](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct) | 1 |
| [Qwen2.5-VL](../qwen2-5-vl/report.md) | [Exact report](https://arxiv.org/pdf/2502.13923v1) | [Model repository](https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct) | 1 |
| [Qwen2.5-1M](../qwen2-5-1m/report.md) | [Exact report](https://arxiv.org/pdf/2501.15383v1) | [Model repository](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-1M) | 2 |
| [Qwen3.8-Flash-Next](../qwen3-8-flash-next/report.md) | [Exact report](https://arxiv.org/pdf/2608.30320v1) | [Model repository](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | 3 |
| [GLM and GLM-130B](../glm/report.md) | [Exact report](https://arxiv.org/pdf/2103.10360v2) | [Model repository](https://huggingface.co/zai-org/glm-10b) | 3 |
| [GLM-4](../glm-4/report.md) | [Exact report](https://arxiv.org/pdf/2406.12793v2) | [Model repository](https://huggingface.co/zai-org/glm-4-9b-chat) | 2 |
| [GLM-4.5](../glm-4-5/report.md) | [Exact report](https://arxiv.org/pdf/2508.06471v1) | [Model repository](https://huggingface.co/zai-org/GLM-4.5) | 4 |
| [GLM-4.1V and GLM-4.5V](../glm-4-v/report.md) | [Exact report](https://arxiv.org/pdf/2507.01006v3) | [Model repository](https://huggingface.co/zai-org/GLM-4.1V-9B-Thinking) | 3 |
| [Gemma](../gemma/report.md) | [Exact report](https://arxiv.org/abs/2403.08295v4) | [Model repository](https://huggingface.co/google/gemma-7b) | 2 |
| [Gemma 2](../gemma-2/report.md) | [Exact report](https://arxiv.org/abs/2408.00118v3) | [Model repository](https://huggingface.co/google/gemma-2-9b) | 2 |
| [Gemma 4](../gemma-4/report.md) | [Exact report](https://arxiv.org/abs/2607.02770v2) | [Model repository](https://huggingface.co/google/gemma-4-31B-it) | 3 |
| [gpt-oss](../gpt-oss/report.md) | [Exact report](https://arxiv.org/pdf/2508.10925v1) | [Model repository](https://huggingface.co/openai/gpt-oss-120b) | 2 |
| [MiniMax 01](../minimax-01/report.md) | [Exact report](https://arxiv.org/pdf/2501.08313v1) | [Model repository](https://huggingface.co/MiniMaxAI/MiniMax-Text-01) | 1 |
| [MiniMax M1](../minimax-m1/report.md) | [Exact report](https://arxiv.org/pdf/2506.13585v1) | [Model repository](https://huggingface.co/MiniMaxAI/MiniMax-M1-80k) | 3 |
| [MiniMax M2 Series](../minimax-m2/report.md) | [Exact report](https://arxiv.org/pdf/2605.26494v2) | [Model repository](https://huggingface.co/MiniMaxAI/MiniMax-M2.7) | 2 |
| [MiniMax M3 and Sparse Attention](../minimax-m3/report.md) | [Exact report](https://arxiv.org/pdf/2606.13392v2) | [Model repository](https://huggingface.co/MiniMaxAI/MiniMax-M3) | 1 |

The 16 pages add 35 numbered figures, including 28 original report crops and seven independent explanations. 122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

See [integration report](family-expansion/report.md), [actual browser checks](family-expansion/browser-qa.json), [validation log](family-expansion/validation.log) and the full per-model workspaces. Related Qwen3-Next, Qwen3.5 and Gemma 3n releases remain explicit documentation/report-boundary notes, not unresearched placeholder pages. GLM-4.6V and Qwen3.5-Omni are outside these selected study scopes. No model benchmark reproduction, commit, push or deployment.
