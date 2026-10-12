# gpt-oss: Figure 1

Decoder block: Residual stream: Width 2,880; RMSNorm + attention: Local / full layers alternate; Residual addition: Retain the input path; RMSNorm + MoE: Four selected experts; Residual addition: Continue to next layer. 36 blocks in 120b; 24 in 20b. All attention remains causal.
Efficiency levers: MoE routing: Reduce active FFN work; GQA + local layers: Reduce attention/cache costs; MXFP4 experts: Reduce stored weight bytes. These are different savings. None removes all weights, all full-history cache, or the cost of long generation.

**Figure 1.** Three complementary efficiency mechanisms. Independent explanation of the model card and released configuration; the report has no corresponding architecture figure.[^report][^config]
