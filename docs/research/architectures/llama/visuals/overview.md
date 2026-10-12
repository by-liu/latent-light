Original text tokens enter a dense causal decoder. Each of 32 layers applies pre RMSNorm attention and a separate pre RMSNorm SwiGLU residual update. Rotary embeddings transform queries and keys. Final RMSNorm and a vocabulary projection produce next token logits. Original attention keeps full per-query-head KV state.

Original code native figure authored in src/content/docs/architectures/models/llama.mdx using ModelFlow.astro. No paper artwork copied. Its responsive HTML is generated with the site build; rendering review is pending.
