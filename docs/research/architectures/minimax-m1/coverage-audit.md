# MiniMax M1: coverage audit

RL-only rental cost versus foundation and7.5T continued training; capped detached ratio log-gradient versus PPO flat region; Figure2 Qwen2.5-32B AIME avg@32 not finalM1/pass@1/walltime. Numerical rollout/training mismatch and FP32 fix. Synthetic exclusion applies to continued pretraining, not RL.

Complete method, training, systems and evidence discussion in canonical report. Original figures: 2. Integrated browser/export QA passed.

## Completed integration check

122 site tests pass, zero Astro diagnostics, 59-page static build and 59-doc lint clean. Fresh browser regression checks cover all 41 model pages plus the catalog and Foundations at 1440 px light, 390 px light and 320 px dark (129 views), reduced motion, desktop focus, active family navigation, figure order, loaded images and local anchors; narrow figures remain keyboard-pannable and link to full-size originals. All 41 Markdown/MDX exports and both agent manifests checked; representative search queries resolve. All 35 new desktop figure renders received manual contact-sheet review; dense focus/mobile views and resource-card/catalog layout received additional manual inspection. Existing bundler directive and philosophy-redirect indexing warnings remain. No model execution or benchmark reproduction.

Cross-review added16 off-policy update rounds,40K-to80K staged curriculum, difficulty filtering, synthetic-reasoning downsampling, longer negative-sample imbalance and combined sample/token normalization. Core CISPO equation is explicitly not the entire80K recipe. Online GenRM length-bias recalibration and rule-first task curriculum added after direct section inspection.
