# GLM and GLM-130B: mechanism and source coverage

The full canonical report and public study cover the following sections. A targeted source audit is not a claim of checkpoint reproduction or a complete training-code review.

- Highlights
- Model in numbers
- Blank infilling, step by step
- What the original ablation actually establishes
- Scaling the objective to GLM-130B
- A small intervention for a large instability
- Inference and INT4: what becomes smaller
- Evidence limits and release boundaries
- Lessons

## Inspected evidence

- [GLM: General Language Model Pretraining with Autoregressive Blank Infilling](https://arxiv.org/pdf/2103.10360v2): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-130B: An Open Bilingual Pre-Trained Model](https://arxiv.org/pdf/2210.02414v2): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [Original GLM-10B card](https://huggingface.co/zai-org/glm-10b): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [Original GLM implementation](https://github.com/THUDM/GLM/blob/4f61ed7237a3b0187f4d62062429348276a78c84/model/modeling_glm.py): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-130B official repository](https://github.com/zai-org/GLM-130B): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.

## Explicit limits

- Exact selected original 10B training exposure
- complete 130B compute accounting
- scale-transfer of small ablations
- modern backend INT4 replication.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

No unresolved source/artifact contradiction is silently presented as a complete recipe.
