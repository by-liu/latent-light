An image plus optional crops passes through a frozen SigLIP encoder and pooled projector, producing256 soft tokens per encoded view. These visual embeddings join text embeddings; repeated five-local/one-global decoder cycles generate text.

Original code native figure authored in src/content/docs/architectures/models/gemma-3.mdx using ModelFlow.astro. No paper artwork copied. Its responsive HTML is generated with the site build; rendering review is pending.
