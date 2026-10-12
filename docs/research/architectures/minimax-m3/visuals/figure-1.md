# MiniMax M3 and Sparse Attention: Figure 1

A lightweight index projection scores causal keys, max pools into blocks and selects a different top K mask for each GQA group; the main QKV branch attends exactly within selected blocks

**Figure 1.** Learned block selection followed by exact sparse attention. Original MSA report Figure 1.[^report][^figure]
