# Figure 1

**Figure 1.** MuonClip's post update safeguard. Original explanatory diagram informed by the report's Algorithm 1 and Appendix D.[^report]

## Meaning

Training step: Forward and backward: Record each head's largest attention score; Muon update: Momentum, orthogonalization, scale and weight decay; QK-Clip: Rescale only heads above threshold; Next forward pass: Apply the rescaled projections. The clipping changes weights after the update. It is not a soft cap inserted into the current attention softmax.

Report and rendered page retain the adjacent explanation. Source asset inspection is not HTML/browser QA.
