# Original on device computing diagrams

Sources checked October 12, 2026, Vancouver time. No vendor artwork, logos, photographs or benchmark curves are copied.

| Asset | SHA-256 | Geometry | Purpose |
| --- | --- | --- | --- |
| memory-topologies.svg | 0a8569f432ac4a618a9d47a2f638721bc522475b4f8b5aa980262bc3e9ef32be | viewBox 1000 × 640 | Dedicated GPU memory, shared DRAM and small SRAM examples; not a universal cloud/device boundary |
| soc-roles.svg | be93c980d38039eb130f26308537b8bcad8792638fd3ba5967451d5ea651ee4f | viewBox 1000 × 650 | Processor roles and shared resources; not a vendor floorplan or mandatory work allocation |

Editable source: docs/research/edge-ai/on-device-computing/visuals/diagrams.mjs. The original SVGs and generator use the repository's MIT license. No image-generation model was used. Arrows show possible memory or signal connections, not exact coherency, bandwidth, scheduling or performance.

Sources: [CUDA memory](https://docs.nvidia.com/cuda/cuda-programming-guide/02-basics/understanding-memory.html), [MLX](https://ml-explore.github.io/mlx/build/html/usage/unified_memory.html), [CPU/GPU roles](https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/introduction.html), [Arm Ethos](https://www.arm.com/products/silicon-ip-cpu/ethos/ethos-u85), [NXP](https://www.nxp.com/products/i.MX95), [STM32N6](https://www.st.com/en/microcontrollers-microprocessors/stm32n6-series.html) and [Snapdragon Gen 6](https://www.qualcomm.com/smartphones/products/8-series/snapdragon-8-elite-extreme-gen-6-mobile-platform). Relevant passages were inspected; source drawings were not copied.

Native HTML Figure 3 separately presents a proposed engineering investigation. Complete text equivalents remain in the page and Markdown export. Final diagrams were inspected in the actual local production preview at desktop, Focus and mobile widths, in light and dark themes. Crowded labels were shortened before the final review.
