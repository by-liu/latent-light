# GLM-4.1V and GLM-4.5V: mechanism and source coverage

The full canonical report and public study cover the following sections. A targeted source audit is not a claim of checkpoint reproduction or a complete training-code review.

- Highlights
- Model in numbers
- From pixels to a language-model sequence
- Build the visual foundation before RL
- Reinforcement learning with curriculum sampling
- Verification is a first-class component
- Does mixing domains always help?
- Inference budget and evaluation boundaries
- Limits and lessons

## Inspected evidence

- [GLM-4.1V-Thinking and GLM-4.5V: Towards Versatile Multimodal Reasoning with Scalable Reinforcement Learning](https://arxiv.org/pdf/2507.01006v3): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-4.1V-9B-Thinking configuration](https://huggingface.co/zai-org/GLM-4.1V-9B-Thinking/blob/3c1471e51dc811b589d4d12b1c1c7c1c941267c2/config.json): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-4.1V-9B-Thinking card](https://huggingface.co/zai-org/GLM-4.1V-9B-Thinking): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-4V processor](https://github.com/huggingface/transformers/blob/v4.57.1/src/transformers/models/glm4v/processing_glm4v.py): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-4V modeling implementation](https://github.com/huggingface/transformers/blob/v4.57.1/src/transformers/models/glm4v/modeling_glm4v.py): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [Official GLM-V code license](https://github.com/zai-org/GLM-V/blob/767626468e275892abdf4f7c67f792e51528c0fc/LICENSE): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.

## Explicit limits

- Final processed-token and trajectory budgets
- compute-matched mixing ablations
- independent verifier audits
- reason-step correctness
- detailed image/video latency and memory in the selected backend.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

No unresolved source/artifact contradiction is silently presented as a complete recipe.
