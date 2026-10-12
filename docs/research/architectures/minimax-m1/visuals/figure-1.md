# MiniMax M1: Figure 1

Backbone: Text 01 checkpoint: 456B / 45.9B active; Hybrid attention: Seven lightning, one full; Long rollouts: Reduced attention work. The full layers still retain exact token history. This is not an entirely fixed-memory decoder.
Training: Continue pretraining: 7.5T additional tokens; Cold start SFT: Teach reasoning patterns; CISPO RL: Verifiers + generative rewards; 40K then 80K: Extended thinking budget. Context extension also progresses gradually; input context and generated reasoning length are not interchangeable.

**Figure 1.** The inherited network and new reasoning recipe. Independent map of report Sections 1 to 4; the source report does not supply a new backbone architecture drawing.[^report]
