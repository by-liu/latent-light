# High Agency short videos

The user generated these three clips with Google NotebookLM using Latent Light’s
standalone High Agency research document, supplied the original local MP4 files,
and uploaded them to their YouTube channel, Bingyuan. They requested inclusion
on the page and supplied the three playback URLs. This author instruction is the
reuse basis for these particular supplied clips, their text equivalents and
poster excerpts. It is not a general license for third-party NotebookLM outputs.
No separate Creative Commons or MIT grant is claimed for the media.

The published collection is an educational illustration of the fictional
community-workshop example. The clips overlap; they are not three independent
studies or an overview of the whole research article. Their numbered loops are
practice aids. The page explicitly distinguishes AI critique of a draft from
feedback by actual potential participants, because the third narration calls
AI critique a “trap” without that qualification. The narration is preserved in
the transcript; the explanatory qualification is outside it.

## Matching and source preservation

`videos.json` records every supplied filename, original filename, SHA-256,
duration, YouTube ID, verified upload title, canonical URL, author, poster and
transcript. Official YouTube oEmbed responses confirmed the title-to-file mapping;
selected public fields are retained in the three metadata records. Original MP4
files remain unchanged in local `output/`, outside the publication assets.
No video bytes were edited or uploaded by the agent. The original podcast
recording remains unchanged locally. Its complete MP3 is now publicly hosted
through Cloudflare R2 at `media.latentlit.com`. The High Agency article source
includes an opening player and a complete automatic transcript.

The [audio metadata](audio.json) and [hosting verification](../../../../media/r2-verification.json)
record the public URL, source preservation, and delivery checks completed on
October 12, 2026. Public media hosting and local page integration do not establish
that the article changes have been deployed to the production site.

## Poster extraction and rights

Each poster reproduces the complete frame at 00:03 from its corresponding supplied
clip. FFmpeg extracted a full-frame JPEG. Sharp resized the portrait frame to
480 by 853 pixels and converted it to WebP with quality 90 and effort 6. No cropping,
semantic alteration, watermark removal or new generated artwork was performed.
The visible Gemini NotebookLM mark is retained. One frame per clip serves as a
playback preview and thumbnail for the supplied clip; the public paths and checksums
are in `videos.json`. The user's request to publish their generated media authorizes
these excerpts. No external stock material or separate third-party artwork was
introduced. The underlying media are not covered by the site's MIT source-code grant.

## Text equivalents and review limits

All three complete audio tracks were extracted as mono 16 kHz PCM locally.
A temporary faster-whisper 1.2.1 environment used the cached Systran tiny model
on CPU to produce draft English transcriptions. The drafts were reviewed against
the original slide sequence and supplied on-screen captions previously sampled
throughout each complete clip. Duplicate segment-boundary words were removed;
“in private”, “It cannot tell you” and the negation “isn’t” were corrected against
visible context. Punctuation and paragraph breaks were normalized. These are
readable narration transcripts, not a claim of frame-perfect verbatim auditing or
independent human listening. They do not silently replace the narration's claims
with the article's more qualified explanation.

The original clips contain visible captions. Complete readable transcripts are
published on the page and included in Markdown exports. Local WebVTT drafts were
also retained in `output/` for possible later caption review. Those files were not
uploaded to YouTube and their timings are not certified; the website does not
claim that YouTube closed-caption tracks were added. Its player requests English
captions when a track is available.

## Delivery

A single large portrait player and three labelled clip choices follow the opening
infographic and short introduction. YouTube is loaded only after the reader selects
Play or a clip. Switching and closing remove the previous iframe. Privacy-enhanced
embeds preserve the origin Referer required by YouTube. Native external playback
links and readable transcripts remain available without JavaScript. Captions,
source links and the Google NotebookLM generation disclosure are retained.

Implementation references inspected: [YouTube embedded-player parameters](https://developers.google.com/youtube/player_parameters)
and [YouTube embedding and privacy-enhanced mode](https://support.google.com/youtube/answer/171780?hl=en).
