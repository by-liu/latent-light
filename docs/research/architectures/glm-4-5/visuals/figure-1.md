# figure-1

One network block: Residual stream 5,120 dimensions; Causal GQA 96 Q / 8 KV; partial RoPE; FFN router Select 8 of 160 experts; Combine outputs Selected experts + 1 shared expert. The selected FFN experts run inside this network; they are not independent reasoning or agent models.
Post-training policies: Capability specialists Reasoning, agentic, general chat; Distilled SFT data Mix validated specialist responses; One generalist Hybrid thinking / non-thinking; Unified RL Refine general response quality. These are full training-stage policies, distinct from per-token expert routing.

**Figure 1.** Two meanings of specialization. Original explanatory diagram from the report and released routing implementation.[^report][^code]

Complete source crop inspected at full resolution. Integrated browser/HTML/mobile/focus/export review is pending parent QA.
