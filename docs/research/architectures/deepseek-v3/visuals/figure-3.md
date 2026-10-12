# Figure 3

**Figure 3.** The extra prediction branch, not the full decoder. Original explanatory diagram informed by the report.[^report]

## Meaning

One additional training depth: Main representation: Causal hidden state at position i; Merge valid next prefix token: Normalize, concatenate the embedding at i + 1, then project; Causal MTP block: Use the extended prefix; Extra target: Predict token i + 2 through the shared output head. The main predictor still targets i + 1 without seeing that token. Only the extra predictor receives it as part of its valid prefix. Ordinary inference can omit this branch.

Report and rendered page retain the adjacent explanation. Source asset inspection is not HTML/browser QA.
