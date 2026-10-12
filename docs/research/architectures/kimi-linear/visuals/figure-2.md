# Figure 2

**Figure 2.** Recurrent memory and direct history lookup. Original explanatory diagram informed by the recurrence and hybrid design.[^report][^config]

## Meaning

KDA layer: Prior matrix state: 128 × 128 per head; Channel decay: Choose which channels persist; Corrective write: Update the current key's value; Query read: Read the updated state. The updated state becomes the prior state for the next token. Its shape does not grow with history.
Periodic MLA layer: Previous token history: Retained keys and values; Global attention: Direct content lookup; Output representation: Mix retrieved values. This cache still grows with sequence length. The hybrid is not an entirely fixed memory model.

Report and rendered page retain the adjacent explanation. Source asset inspection is not HTML/browser QA.
