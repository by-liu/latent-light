The source, either task-prefixed text or text with sentinel gaps, enters a bidirectional encoder. A causal decoder reads target history and cross attends to fixed encoder memory, then predicts text output. Encoder full source context and decoder causal output history are separate contracts.

Original code native figure authored in src/content/docs/architectures/models/t5.mdx using ModelFlow.astro. No paper artwork copied. Its responsive HTML is generated with the site build; rendering review is pending.
