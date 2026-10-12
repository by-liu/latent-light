# figure-1

Decoder path: Chat tokens Text, tool definitions and observations; Causal GQA 32 query heads share 2 KV groups; SwiGLU FFN RMSNorm and residual stream; Next-token logits Text or serialized tool request. Forty decoder layers. A tool runtime is outside these neural operations.
Persistent state: Previous keys / values 2 groups per layer, not 32; New token projections Append current K and V; Attention backend Reuse or expand shared groups. Persistent KV savings do not guarantee the same reduction in compute or temporary buffers.

**Figure 1.** Query heads are not cache heads. Original explanatory diagram based on the released configuration and targeted code.[^config][^code]

Complete source crop inspected at full resolution. Integrated browser/HTML/mobile/focus/export review is pending parent QA.
