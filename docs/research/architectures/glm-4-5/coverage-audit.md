# GLM-4.5: mechanism and source coverage

The full canonical report and public study cover the following sections. A targeted source audit is not a claim of checkpoint reproduction or a complete training-code review.

- Highlights
- Model in numbers
- Architecture: routing without confusing the routers
- Base training and mid-training
- Post-training: build specialists, then a generalist
- The learning system behind tool rollouts
- Evidence and comparison limits
- Limits and practical lessons

## Inspected evidence

- [GLM-4.5: Agentic, Reasoning, and Coding (ARC) Foundation Models](https://arxiv.org/pdf/2508.06471v1): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-4.5 configuration](https://huggingface.co/zai-org/GLM-4.5/blob/cbb2c7cfb52fa128a9660cb1a7a78e017899e115/config.json): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-4.5 model card](https://huggingface.co/zai-org/GLM-4.5): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [Transformers GLM-4 MoE implementation](https://github.com/huggingface/transformers/blob/v4.57.1/src/transformers/models/glm4_moe/modeling_glm4_moe.py): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-4.1V-Thinking and GLM-4.5V](https://arxiv.org/pdf/2507.01006v3): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-4.5 code license](https://github.com/zai-org/GLM-4.5/blob/170f20b2c10659008fdbc909d478bc2a75bc3627/LICENSE): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.

## Explicit limits

- Full compute and data manifests
- component-level 355B ablations
- exact policy-lag correction and rollout filtering
- inference acceptance and throughput in a selected deployment.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

No unresolved source/artifact contradiction is silently presented as a complete recipe.
