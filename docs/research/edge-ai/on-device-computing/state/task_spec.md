# On device computing

## Inquiry

How does inference on a device differ from serving a model on cloud GPUs? Which execution engines, memory arrangements and software contracts should an AI researcher understand, and which representative chip platforms serve different device classes?

## Intended reader and use

Researchers and engineers familiar with AI models and cloud GPUs, but new to device computing. Build a mental model for research and deployment planning, not a purchasing recommendation.

## Scope and time boundary

Inference on PCs, phones, glasses, cameras, TVs, robots, industrial controllers and microcontrollers. Primary sources were inspected on October 12, 2026 in Vancouver. Distinguish published specifications, availability statements, controlled demonstrations and future plans. Mutable documentation needs another check before a deployment decision.

## Exclusions

No exhaustive leaderboard, prices, stock audit, hardware benchmark, fabrication tutorial, proprietary material or whole-robot safety certification. Do not assume that different precisions or sparsity rules are comparable. A planned date is not proof of shipment.

## Deliverables

One canonical page with a searchable catalog of 19 platforms, a separate roadmap table, two original hardware diagrams and an engineering workflow. Add navigation and relevant companion links. Retain a source, claim and visual ledger for future updates.

## Output contract

Canonical page: src/content/docs/edge-ai/on-device-computing.mdx. Use nearby numbered citations and complete Markdown, MDX, search and discovery exports. Keep internal research records separate from the article. Preserve unrelated work. Do not commit, push or deploy.

## Visual contract

Use original SVGs to explain memory topology and processor roles across multiple sources. A vendor floorplan would misleadingly imply one universal layout, so do not copy one. Keep sequential figure numbers, useful descriptions, mobile panning and full-size links. Use a native HTML flow for the separate engineering workflow. Review actual renders before completion.

## Research map

Mechanisms: CUDA and MLX memory, CPU/GPU roles, Core ML, QNN, OpenVINO, Ryzen AI Software, and Arm/NXP/ST sensor and embedded systems. Current platforms: manufacturer pages, current product briefs and dated announcements. Challenge physical versus managed memory, graph fallback, precision, sparsity, SKU combinations, power scope, application access and availability.

## Budget and checkpoints

Bounded primary-source pass, separate skeptical review, draft, actual browser review, export checks and full validation. Check desktop and mobile widths, both themes, Focus mode, keyboard navigation, table search and no-JavaScript access. Restore the editable server on port 4327. Do not perform a device benchmark.

## Success criteria

The reader can explain the cloud/device differences, distinguish engine roles and memory quantities, interpret peak performance labels, find representative device platforms and identify the next software checks. Source, visual, output and delivery gates must pass. Unmeasured device performance remains an empirical question, not a missing result to invent.

## User-supplied facts

The reader has an AI research or engineering background. The requested scope includes PCs, phones, glasses, cameras, TVs and robots. The page belongs under Edge AI in Latent Light.

## Assumptions and decisions

Interpret state of the art as current frontier families within device classes, not one universal winner. Include established specialist platforms where they explain a distinct computing regime. Treat this page as a focused companion to the existing ten-topic landscape. Publish no confidential material or copied vendor artwork.
