# Latent Light media hosting

Status: active and verified on October 12, 2026 (UTC). The author activated
R2 through Cloudflare's dashboard. The dedicated Standard-storage bucket was
created, the prepared MP3 uploaded and `media.latentlit.com` connected with
active ownership and TLS. The existing site Worker and build workflow were
preserved. `r2-verification.json` records the read-back settings and actual
HTTP/browser delivery checks.

The media files belong in a dedicated `latent-light-media` Standard-storage
bucket, published through `media.latentlit.com`. The website's existing Worker,
production route and build workflow do not need an R2 binding or deployment.
Keep the development `r2.dev` endpoint disabled. Only publication-ready assets
belong in this bucket: its custom domain makes their object URLs public.

`r2-config.json` records the current object, headers, hash and activation status.
`r2-cors.json` contains a read-only policy for the public site and local port 4327.
It does not grant upload or administrative access.

## Activate the account

In Cloudflare Dashboard, choose **Storage & databases → R2 → Overview** and
complete the account activation checkout. Standard storage includes monthly free
usage; usage beyond the allowance is billed. No new token or secret needs to be
shared in chat. The existing authenticated Wrangler session can perform setup
once the account is enabled.

## Reproduce or maintain the setup

Use the pinned project Node version, currently 24.21.0. Run the installed Wrangler
with `npx --no-install`. Before changing anything, list existing buckets and
check any existing bucket or media-domain configuration. Preserve unrelated
resources; do not overwrite an existing asset with different bytes.

```bash
npx --no-install wrangler r2 bucket list
npx --no-install wrangler r2 bucket create latent-light-media --storage-class Standard --update-config=false
npx --no-install wrangler r2 bucket cors set latent-light-media --file docs/media/r2-cors.json
npx --no-install wrangler r2 object put latent-light-media/audio/high-agency/high-agency-your-superpower-in-the-ai-era-v1.mp3 --remote --file output/high-agency-your-superpower-in-the-ai-era.mp3 --content-type audio/mpeg --content-disposition 'inline; filename="high-agency-your-superpower-in-the-ai-era.mp3"' --cache-control 'public, max-age=31536000, immutable'
```

Connecting the custom domain also needs the current `latentlit.com` zone ID.
Verify that the proposed hostname is unused before connecting it. Use
`wrangler r2 bucket domain add --help` for the installed command's `--domain`,
`--zone-id` and `--min-tls` options. Set minimum TLS 1.2. Do not put account
credentials in these records or the repository.

The verified public URL is
`https://media.latentlit.com/audio/high-agency/high-agency-your-superpower-in-the-ai-era-v1.mp3`.
This URL is live. A complete download matches the local SHA-256; byte-range
requests return HTTP 206. Desktop and mobile Chromium viewport checks passed
metadata loading, user-triggered playback, seeking to 20 minutes and 1.5x speed.
These viewport checks do not claim testing on a physical iPhone or every browser.

## Verify delivery

- Confirm bucket Standard storage, the intended custom domain and the disabled
  development endpoint. Read back the CORS policy and object metadata.
- Verify HTTPS, `Content-Type: audio/mpeg`, file size and cache headers.
- Request a byte range and confirm HTTP 206 and the correct `Content-Range`.
- Request from the site's Origin and confirm the intended CORS response headers.
- Download the whole object and compare SHA-256 with `r2-config.json`.
- Check playback and seeking in desktop and mobile browsers.
- Update setup status, public URL and actual verification results after success.

Preparing and hosting the MP3 does not edit the original recording or reconcile
its narration with the article. Its duration is 25:03. The original M4A is retained
unchanged. The High Agency article source now includes an opening PodcastPlayer and a full,
clearly labelled automatic transcript. Website source edits have not been
deployed in this task.

Official references inspected:
[activation](https://developers.cloudflare.com/r2/get-started/),
[pricing](https://developers.cloudflare.com/r2/pricing/),
[public custom domains](https://developers.cloudflare.com/r2/buckets/public-buckets/),
[uploads](https://developers.cloudflare.com/r2/objects/upload-objects/), and
[CORS](https://developers.cloudflare.com/r2/buckets/cors/).
