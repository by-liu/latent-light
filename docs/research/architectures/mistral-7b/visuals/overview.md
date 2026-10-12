Thirty two query heads share eight key/value heads. Each layer reads a causal recent window of4096 positions, then continues through residual and gated FFN updates. A rolling buffer bounds raw KV storage, but deeper information paths do not make discarded tokens directly accessible.

Original code native figure authored in src/content/docs/architectures/models/mistral-7b.mdx using ModelFlow.astro. No paper artwork copied. Its responsive HTML is generated with the site build; rendering review is pending.
