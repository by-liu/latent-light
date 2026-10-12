# Figure 2

**Figure 2.** The student chooses the trajectory; the teacher scores it. Independent diagram of on policy distillation, not a copied report figure.[^distillation]

## Meaning

A prompt and student-generated prefix go to both frozen teacher and trainable student. The student samples the next token, extending its own prefix. Teacher and student distributions on that same prefix enter a KL matching loss. Only the student is updated. The report does not specify the KL direction.

Asset: ../../../../public/figures/model-studies/qwen3/on-policy-distillation.svg

Report and rendered page retain the adjacent explanation. Source asset inspection is not HTML/browser QA.
