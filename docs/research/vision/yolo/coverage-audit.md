# YOLO coverage and evidence audit

Evidence cutoff: November 8, 2026. Canonical narrative: `src/content/docs/yolo/index.mdx`.

This is a family tutorial and source study, not a checkpoint reproduction. Source-specific inspection scope is recorded in `state/sources.jsonl`. No external repository code was executed; no weights, training datasets or inference engines were installed or run.

## Evidence dimensions

- Motivation and original contract: original YOLO introduction, method, training, inference and limitations. Grid ownership, shared class vector, confidence definition and original fully connected head distinguished from later designs.
- Evolution: original mechanism sections of v2/v3/v4, YOLOX, v6 v3, v7/v9/v10/v12/v13. This is selective mechanism coverage, not an assertion of reading every report and appendix end to end.
- Software-origin models: v5 v7.0 README; v8 and YOLO11 official docs and released YAMLs. No invented canonical paper for those releases. Original v5 distinguished from current v5u.
- Current release: official YOLO26 launch January 14, 2026, report June 2, 2026, Ultralytics v8.4.208 source. YOLO27 preview distinguished from executable released artifacts.
- Open vocabulary: World and E abstracts and author READMEs, plus YOLO26 Section 3.6. This supports a bounded conceptual overview, not a detailed implementation or zero-shot benchmark audit.
- Measurement: YOLO26 Table 7 and caption, original evaluation context, COCO evaluator parameters. No combined historical FPS leaderboard. Reported timings are not full camera-to-result measurements or local measurements.
- Skeptical direction: withdrawn v14 record, default-head drift, AP/head mismatch, STAL threshold drift; independent ODVerse33 setup and conclusions. ODVerse33 is explicitly confined to its v5–v11 cohort.

## Released-code trace

Frozen release: Ultralytics `v8.4.208`, published November 8, 2026. `artifact-manifest.json` retains exact inspected file URLs and SHA-256 values. Downloaded source snapshots and PDFs live only in ignored `output/research/yolo/`.

| Question | Inspected source | Finding |
|---|---|---|
| Feature scales and DFL | `cfg/models/26/yolo26.yaml` | P3/8, P4/16, P5/32; `reg_max: 1`, `end2end: True` architecture capability |
| Actual API head selection | `cfg/default.yaml`, `engine/predictor.py: setup_model`, `engine/validator.py` | `nms=None` default; `end2end=self.args.nms is False` in inference setup; architecture capability does not determine high-level default |
| Raw and decoded outputs | `nn/modules/head.py: Detect.forward_head, forward, _inference, postprocess` | Separate 4R box and C class logits; sigmoid class scores; decoded NMS path vs selected `(B,K,6)` E2E output |
| One-to-one feature gradients | `Detect.forward` | Training features detached before one-to-one head; do not claim both loss weights equally govern shared feature gradients |
| Loss weighting | `utils/loss.py: E2ELoss` | One-to-many top-k 10, one-to-one candidate top-k 7 then secondary 1; branch weighting starts .8/.2 and approaches .1/.9 |
| Small-object candidates | `utils/tal.py: select_candidates_in_gts` | Current code floors sides below 16 to 16; paper expands only sides below 8 to 16; original regression boxes retained |
| Original v8 and YOLO11 | Their YAMLs | Version-specific modern blocks and three-scale fusion; do not infer an unchanged head from the YOLO name |

## Figures reviewed

- Original YOLO Figure 3 inspected as text; not reused. Its arXiv distribution license is not a reuse grant. Original grid mechanism receives an independent teaching illustration.
- YOLOv10 Figure 2 inspected visually on PDF page 4. Reuse only the left head-structure schematic; omit the embedded cat photograph, matching panels and chart. CC BY 4.0 verified on arXiv record; crop disclosed.
- YOLO26 Figure 2 inspected visually on PDF page 6: pure training schematic, CC BY 4.0. Crop whitespace and exclude caption/table. Published caption separately credited and paraphrased on site.
- YOLO26 Figure 3 inspected visually on PDF page 10 as deployment context; not reused because its “default” label is superseded by the inspected API behavior and the page already explains both paths.
- Native overview, grid, pyramid, NMS illustration and device pipeline: original editable code. Simplified geometry and hypothetical values labeled as such; no inferred lineage edges or measured-performance implication.

## Deliberate limits

The article covers major numbered branches and selected influential non-numbered families, not every domain-specific YOLO modification. Research mechanisms do not establish superior performance on a reader's camera or accelerator. Repository model links establish published artifacts, not independently tested availability or model quality. Legal permissions for code, checkpoints, data and figures are separate; reused figure licenses do not license model deployment.
