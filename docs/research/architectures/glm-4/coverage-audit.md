# GLM-4: mechanism and source coverage

The full canonical report and public study cover the following sections. A targeted source audit is not a claim of checkpoint reproduction or a complete training-code review.

- Highlights
- Model in numbers
- Trace the actual network
- The training recipe and what it discloses
- From function calling to All Tools
- Read checkpoint-specific evidence
- What remains undisclosed
- Lessons

## Inspected evidence

- [ChatGLM: A Family of Large Language Models from GLM-130B to GLM-4 All Tools](https://arxiv.org/pdf/2406.12793v2): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [Original GLM-4-9B-Chat configuration](https://huggingface.co/zai-org/glm-4-9b-chat/blob/bd8234fe5e0c09c48637a92abb0c797cb5fa0e73/config.json): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [GLM-4-9B-Chat model card](https://huggingface.co/zai-org/glm-4-9b-chat): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [Released modeling implementation](https://huggingface.co/zai-org/glm-4-9b-chat/blob/bd8234fe5e0c09c48637a92abb0c797cb5fa0e73/modeling_chatglm.py): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.
- [Selected weight license](https://huggingface.co/zai-org/glm-4-9b-chat/blob/bd8234fe5e0c09c48637a92abb0c797cb5fa0e73/LICENSE): Targeted report methods, figures, experiment protocols and limitations or cited artifact/configuration/code fields; no checkpoint execution. Not a full source-code or every appendix-example review.

## Explicit limits

- Checkpoint-specific data exposure and training compute
- exact alignment algorithm and reward setup
- effective retrieval quality near128K
- measured serving memory and latency under the chosen backend.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

No unresolved source/artifact contradiction is silently presented as a complete recipe.
