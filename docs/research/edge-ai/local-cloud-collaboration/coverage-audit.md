# Coverage and skeptical evidence review

Reviewed October 17, 2026. Canonical explanation:
`src/content/docs/edge-ai/local-cloud-collaboration.mdx`.
This record is an audit, not a second article or a claim of independent replication.

## Coverage choices

| Dimension | Inspected evidence and treatment |
| --- | --- |
| Request routing versus answer cascades | RouteLLM v4 and FrugalGPT v1. Differentiate selection before generation from checking a candidate after paying for it. |
| Domain expertise versus sheer scale | Co-LLM v1 and Advisor Models v2. Smaller and specialized does not imply weaker on every input. Learned advice is not automatic quality preservation. |
| Parallel local work | Published Minions sections 3–6 and Tables 1–2; arXiv v1 Figure 1 for exact artwork. Keep editions separate. |
| Advice in both directions | Advisor Models' small-to-large guidance versus Learning to Ask's small reasoner consulting a stronger advisor. Do not equate the two roles. |
| Recent research | October 1, 2026 Learning to Ask: separate query model, one advisor interaction, weighted API-cost evaluation and explicit limitations. Conductor used only for its abstract/intro coordination idea, not a full technical study. |
| Collaborative versus speculative decoding | Co-LLM changes the generated distribution to combine expertise. Exact speculative decoding preserves a specified target distribution; target correctness remains a separate question. |
| Hardware-level inference collaboration | SpecEdge v2 for edge draft/server verification; Neurosurgeon for historical layer partitioning. Generic chat endpoints do not provide the needed inference control. |
| Current product architecture | Apple's June 2026 disclosure, September update, opening family and execution targets checked. No independently verified deployment share or universal API availability inferred. |
| Robotics | Original 2025 report section 3.1 and Figure 14 caption checked in PDF. Separate June 2025 on-device announcement; no assertion that all current robotics uses the same design. |
| Privacy | ActInv's passive server with full model knowledge; PCC as an explicit security architecture. Compression, token IDs and hidden states are not privacy guarantees. |
| Practical use | Proposed document/figure assistant, evidence package, bounded return loop and local authorization. No employer-specific or measured deployment claims. |
| Complete evaluation | Local only, cloud original evidence, cloud same preprocessing, simple routing, actual policy and action-set-limited oracle. Include quality, time, bytes, device energy and costs. |

## Skeptical checks that changed or bounded the draft

1. **Cost is not latency.** The older Minions HTML does not include the
   published paper's latency section. Read published Table 2: ten LongHealth
   samples, RTX 4090 MinionS timing 23.65/31.81 seconds versus 11 seconds
   cloud only. The reported ratios are approximately 2.15/2.89. API cost
   excludes local hardware and energy. Headline cloud-cost ratios are
   reported as published, not falsely reconstructed from rounded table cells.
2. **Do not promote a router benchmark into a phone result.** RouteLLM's
   overhead uses Google Cloud VMs, including an L4 GPU. Table 6's 95% quality
   is relative to its GPT-4 evaluation score, not absolute task accuracy.
3. **Do not promote token latency into completed-task latency.** SpecEdge's
   main comparator already uses tree speculation. Its measured WAN RTT is
   14.07ms, edge resources are RTX4090 GPUs from providers, and its metrics
   focus on output tokens after prefill. Preserve all three caveats.
4. **A strong headline can hide a narrow task.** Advisor Models' RuleArena
   study uses the easiest subset and a 75/25 split. Retain 31.2% to53.6% as
   reported, but do not invent repeated evaluation details to explain those
   decimals. Omitted an initial unsupported phrase about repetitions.
   Do not use the abstract's SWE-step percentage as a wall-clock speed claim.
5. **Frozen weights do not mean invariant system behavior.** Advice changes
   prompts and outputs. Include the null MATH-500 limit finding, not a generic
   guarantee that specialization cannot hurt other inputs.
6. **A new preprint is not a proven product.** Learning to Ask permits at
   most one consultation per trajectory. Its extra Qmaker is another 7B
   based component; count that overhead. A whole-request oracle has a
   smaller action space than a consultation workflow.
7. **The privacy threat must remain specific.** ActInv assumes white-box
   knowledge and passive access to activations. The unfinished publication
   template is not venue evidence. No generalized attack rate or blanket
   security claim is made.
8. **Proposed arithmetic is not measurement.** The tensor dimensions and
   timing constants are deliberately hypothetical. Their references motivate
   the mechanism, not those invented workload parameters. Exact calculation:
   2048×4096×2=16,777,216bytes; payload time at20Mbit/s is6.7108864s.
   Cascade mean .35+.05+.2×1.2=.64s; escalated path .35+.05+1.2=1.60s.
9. **Source independence matters.** Hazy Research's retrospective is an
   author/project account. It is not independent corroboration of Minions or
   evidence of market-wide adoption. The page uses it only as an ecosystem signal.

## Visual decisions

- **Figure 1:** independent boundary synthesis. No source figure covered the
  full combination of computation, selected disclosure and authorization.
  A precise code-native SVG is more appropriate than generated artwork.
- **Figure 2:** exact original Minions diagram because it contrasts the
  protocols and shows job preparation, execution/filtering and aggregation.
  Preserve all panels rather than an attractive but incomplete crop.
- **Figure 3:** exact Advisor Models diagram to explain which weights learn
  and which remain frozen. Clarify training versus inference in prose.
- **Figure 4:** native responsive proposal for a document assistant. It has
  its own evidence/return/authorization teaching purpose, not another picture
  of the general architecture.
- No normalized cross-paper speedup bar chart: the baselines, units,
  accounting and hardware are incompatible. Use a caveated evidence table.
- Two figure excerpts are CC BY4.0 in their exact editions. Full PDFs are
  unmodified temporary study copies outside the repository; local paths are
  not embedded in tracked source records.

## Remaining uncertainty

No protocol is established as universally best. Network state, device class,
training amortization, evidence quality and task distribution can reverse a
favorable result. No device measurement or independent reproduction occurred.
The page gives an evaluation method rather than inventing those missing results.
