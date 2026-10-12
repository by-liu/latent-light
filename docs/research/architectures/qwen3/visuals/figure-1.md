# Figure 1

**Figure 1.** Shared computation and flagship response mode training. Original explanatory diagram informed by the report and released artifacts.[^report][^config][^template]

## Meaning

Shared network: Chat template: Messages, tool schema and mode control; GQA attention: 64 Q heads share 4 KV groups; Expert FFN: 8 of 128; no shared experts; Output tokens: Thinking block then answer, or direct answer. The same 94 layer flagship network supports both modes.
Flagship post training: Cold start: Filtered long reasoning examples; Reasoning RL: Verifiable difficult prompts; Mode fusion: Mix thinking and direct answers; General RL: Tools, preferences and format

Report and rendered page retain the adjacent explanation. Source asset inspection is not HTML/browser QA.
