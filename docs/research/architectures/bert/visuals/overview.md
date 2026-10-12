Packed WordPiece text adds token, absolute position and sentence segment embeddings. Twelve bidirectional attention and GELU FFN blocks produce contextual token vectors. A downstream task head selects sentence labels, token labels or answer spans. Pretraining and task adaptation share the encoder but not a universal output head.

Original code native figure authored in src/content/docs/architectures/models/bert.mdx using ModelFlow.astro. No paper artwork copied. Its responsive HTML is generated with the site build; rendering review is pending.
