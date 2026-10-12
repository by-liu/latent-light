# Figure 1

**Figure 1.** Two separate selection and feedback systems. Original explanatory diagram informed by the report and configuration.[^report][^config]

## Meaning

Network path: Token stream: Text, reasoning and serialized tool results; DSA indexer: Select up to 2,048 prior positions; Sparse MLA: Attend over selected content latents; Expert FFN: 1 shared + 8 routed experts. The indexer chooses positions, not experts. The expert router chooses computation, not history.
Asynchronous training path: Rollout services: Agents interact with environments; TITO gateway: Exact token IDs and rollout probabilities; Learner: Correct mismatch and filter stale samples; Weight refresh: Update actors periodically. Weight refresh feeds back to rollout services; it is a loop, not the terminal output of training.

Report and rendered page retain the adjacent explanation. Source asset inspection is not HTML/browser QA.
