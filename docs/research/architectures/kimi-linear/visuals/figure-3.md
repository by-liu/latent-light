# Figure 3

**Figure 3.** Parallel inside a causal chunk, recurrent across chunks. Independent mechanism diagram of Equations (8)–(9).[^chunks]

## Meaning

An incoming state carries earlier chunks. Current chunk queries and transformed keys/values form a causal lower-triangular parallel contribution. That contribution combines with a decayed state read for current outputs. A boundary update passes the new state to the next chunk. No future-token information is used.

Asset: ../../../../public/figures/model-studies/kimi-linear/chunk-computation.svg

Report and rendered page retain the adjacent explanation. Source asset inspection is not HTML/browser QA.
