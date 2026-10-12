# GLM and GLM-130B: source figure notices

Educational technical commentary. Reports and creators are identified per asset; all exact report versions carry CC BY4.0. Model weights and code licenses are separate. Full PDFs are not distributed by this site.

## report-blank-infilling.png

**Figure 1.** Bidirectional context with autoregressive missing spans. Du et al., original GLM report Figure 2, March 2022 revision; figure-only crop under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).[^original]

Reuse basis: CC BY 4.0, verified through the exact arXiv version license. Changed only by figure-only crop and 300dpi PDF rasterization; complete panel labels retained. Not an endorsement.

No independent third-party image credit is shown in the extracted diagram. Integrated marks, if present, remain contextual report elements and are not redistributed as standalone logos.

SHA-256: f7f34a53bac3e22ae960a758306702c95495b17f7bd1310edbd64e2dfca2a769

## report-gradient-shrink.png

**Figure 2.** Shrink the gradient, not the embedding value. GLM-130B report Figure 4, October 2023 revision; both panels retained, under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).[^130b]

Reuse basis: CC BY 4.0, verified through the exact arXiv version license. Changed only by figure-only crop and 300dpi PDF rasterization; complete panel labels retained. Not an endorsement.

No independent third-party image credit is shown in the extracted diagram. Integrated marks, if present, remain contextual report elements and are not redistributed as standalone logos.

SHA-256: 451a86a6f4dc0c6e068b70d4d1c4f9d435aa268cbf2147623868ac0a0ae8d824

## report-quantization.png

**Figure 3.** Weight distributions affect quantization loss. GLM-130B report Figure 5, October 2023 revision; complete histogram and accuracy panels under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).[^130b]

Reuse basis: CC BY 4.0, verified through the exact arXiv version license. Changed only by figure-only crop and 300dpi PDF rasterization; complete panel labels retained. Not an endorsement.

No independent third-party image credit is shown in the extracted diagram. Integrated marks, if present, remain contextual report elements and are not redistributed as standalone logos.

SHA-256: ae640138f8ef72fb98fa28deb47fdbe9c069d11f5a3c1d96154b78eb0558968f

## References

[^original]: Zhengxiao Du, Yujie Qian, Xiao Liu et al. [GLM: General Language Model Pretraining with Autoregressive Blank Infilling](https://arxiv.org/pdf/2103.10360v2), March 17, 2022 revision, ACL 2022. Sections 2 and 3, Figures 2 and 4, Tables 1 and 6.
[^130b]: Aohan Zeng, Xiao Liu, Zhengxiao Du et al. [GLM-130B: An Open Bilingual Pre-Trained Model](https://arxiv.org/pdf/2210.02414v2), October 25, 2023 revision, ICLR 2023. Sections 2 to 5; Figures 4 and 5; Table 2; Appendices B.3, B.8 and B.9.
[^artifact]: THUDM / Z.ai. [Original GLM-10B card](https://huggingface.co/zai-org/glm-10b) and [released configuration](https://huggingface.co/zai-org/glm-10b/blob/696788d4f82ac96b90823555f547d1e754839ff4/config.json), inspected October 10, 2026. The resource is GLM-10B, not GLM-130B.
[^code]: THUDM. [Original GLM implementation](https://github.com/THUDM/GLM/blob/4f61ed7237a3b0187f4d62062429348276a78c84/model/modeling_glm.py), inspected October 10, 2026. Targeted input, position and mask interfaces; not executed.
[^release]: Z.ai / THUDM. [GLM-130B official repository](https://github.com/zai-org/GLM-130B), [model configuration](https://github.com/zai-org/GLM-130B/blob/212215c54f8a9da2deed51455868305235664370/configs/model_glm_130b.sh), [weight license](https://github.com/zai-org/GLM-130B/blob/212215c54f8a9da2deed51455868305235664370/MODEL_LICENSE) and [code license](https://github.com/zai-org/GLM-130B/blob/212215c54f8a9da2deed51455868305235664370/LICENSE), inspected October 10, 2026.
