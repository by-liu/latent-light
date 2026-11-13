# Jensen Huang video collection — November 12, 2026

## Homepage cartoon avatar and dated support statement (latest)

Homepage now links to the collection through a small panel before Explore:
“A personal tribute / Jensen Huang. The GOAT.” The title reflects the author's
personal admiration. A transparent cartoon avatar was generated from the portrait
the author supplied for this purpose. A first render was refined into a clearly
drawn cartoon, then reduced to a 16 KiB, 256-square WebP. The supplied photograph
is not published. Prompts and method are in `visuals/homepage-avatar-prompt.json`;
asset provenance is in `public/figures/jensen/SOURCES.md`. CSS adds a gentle
six-second greeting tilt/bob and a small sparkle. The model generated the still,
not video frames. Reduced motion and print stop the animation.

The author also requested a resignation date and explicit continuing support.
Inspected primary sources November 12, 2026:

- NVIDIA Form 8-K, Item 5.02:
  https://www.sec.gov/Archives/edgar/data/1045810/000104581026000082/nvda-20261111.htm .
  The board accepted his resignation on November 11, effective immediately.
- NVIDIA public announcement, dated November 12:
  https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition/ .

The dedication distinguishes the effective date from public announcement rather
than labeling both as November 12. Added the author's first-person statement:
“I will always support him,” and hope for a return to leadership. These are
personal support and expectations, not an announced plan or factual prediction.
The date paragraph has a source marker, two primary links and a return link;
Markdown preserves the date distinction, support and native footnote.

Full validation passes: 49 deployment and 187 content tests, zero Astro
diagnostics, 108 built pages, 107 lint-clean MDX pages. Existing build notices
remain. Visually inspected homepage desktop/mobile and both themes, plus the
expanded mobile tribute. Actual avatar transform differs during the animation;
reduced-motion animation name is none. Keyboard link navigation and complete
homepage/tribute exports pass; all 26 recordings remain. Review:
`review-home-avatar-2026-11-12.json`. Ignored screenshots:
`output/jensen-home-avatar-review/`. Only the confirmed project dev server was
restarted to clear stale text exports; loopback 4327 remains available.
Local changes only; no commit, push or deployment authorized.

## All-In additions (latest)

Added two missing original-channel interviews at the author's request:

- September 14, 2026: https://www.youtube.com/watch?v=S7CrlFLAmEA .
  Original title: Jensen Huang: The Doomer Hoax, Superintelligence is Here,
  and The Future of AI (ft. President Trump).
- March 19, 2026: https://www.youtube.com/watch?v=gwW8GKwHB3I .
  Original title: Jensen Huang: Nvidia's Future, Physical AI, Rise of the Agent,
  Inference Explosion, AI PR Crisis.

Verified both original YouTube watch pages and oEmbed publisher identity:
All-In Podcast, https://www.youtube.com/@allin . Publication and upload timestamps
agree on the respective dates. Evidence retained in
`all-in-metadata-2026-11-12.json`. No unverified transcript or timestamp links added.
Short descriptions describe the recording rather than endorse its title's claims.
September entry is second in the catalog and present in the suggestion queue;
March entry appears in the next row. Both are categorized as Podcast / Technology
& the Future, with All-In, All In and Allin search aliases. Count now 26 recordings
across 18 original publisher channels. Page counts and complete Markdown export
derive automatically from the shared catalog. Existing source review dates for
the other recordings remain unchanged. Local only; publication not authorized.

## Video-first layout and inline playback (latest)

The author rejected the contribution timeline and philosophy sections and asked
for a clean video page without popup playback. Removed those sections, their
source list, their text-export content and the extra browsing journeys. The
opening, official song link and real 2026 photo remain. The complete personal
dedication remains near the opening in a native expandable note; both tribute
links open it. Print opens it temporarily and restores the reading state.

The collection now has one in-page viewing area, with a large poster/player and
current recording information, source/transcript links, stop and previous/next.
No dialog, backdrop, body scroll lock, floating player or video iframe at initial
load. Selecting a card or suggestion replaces the single inline iframe, focuses
its heading and brings the viewing area into view. Stop removes the iframe,
restores its poster and keyboard focus. Selection preserves active library
filters; previous/next traverses those results, and disables when results are
empty. Selecting a suggestion can play a recording outside the current filter
without silently changing that filter. Original links remain available.

Desktop pairs the viewing area with four compact suggestions. Mobile uses a
horizontal suggestion strip and compact thumbnail rows for the full library.
All 24 recordings remain searchable by text, year, format and topic, with browser
local Watch later storage, native expandable recording notes and transcript links.
The stylesheet was rewritten to remove the rejected context and modal layouts.

Actual Chromium review: 1440 desktop, 360/390 mobile, 768 and 1024 widths; no
horizontal document overflow. Initial 24 cards, zero iframes and zero dialogs.
Joe selection, filtered navigation, stop/replay, hero Stanford link, zero-result
reset, combined GTC/year filtering, podcasts, save/remove and saved-empty state,
keyboard Enter, focus, reduced motion, print and no-JavaScript source-link
baseline all passed. Inline iframe width equals its frame (811.27 px desktop).
No remote audiovisual playback was asserted; source fallback remains visible.
Export retains all 24 recordings and full tribute, and excludes rejected context.
Record: `review-inline-2026-11-12.json`. Screenshots in ignored
`output/jensen-inline-review/`. Local only; no commit/push/deployment authorized.

## Shine On: contribution and philosophy layout

Latest direction replaces the previous title with “Shine on you crazy diamond.”
and a direct Pink Floyd YouTube link. Used the official artist website's embedded
video, https://www.youtube.com/watch?v=Pd-qu_ErkbE , Parts 1–9, new stereo mix.
Original artist announcement:
https://www.pinkfloyd.com/shine-on-you-crazy-diamond-pts-1-9-new-stereo-mix-out-now/ .
YouTube oEmbed confirms publisher Pink Floyd, @pinkfloyd; retained metadata in
`pink-floyd-song-metadata-2026-11-12.json`. Excluded a search result labeled
“Official Music Video” whose actual publisher was Jellyfish Records. Only the
five-word song title is used; no lyrics beyond that, audio files, album artwork
or automatic music playback. Link opens YouTube explicitly.

Focused inquiry: make the personal video collection express NVIDIA's contribution
and Huang's approach to building, without making it a biography or inventing
quotations. New structure: editorial hero and real photo; four historical
milestones; three philosophy interpretations with further-listening links;
complete original first-person tribute; browsing journeys and original catalog.
Opening is condensed, but the author's complete dedication remains before the
catalog and is linked from the hero. Mobile places the real photo below the
headline/song link. Videos remain available immediately through the main CTA.

Inspected evidence and claim map, November 12, 2026:

- NVIDIA corporate timeline, https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/ :
  1993 founders/graphics purpose; 1999 GPU milestone; 2006 CUDA unveiling;
  2012 NVIDIA GPUs powering AlexNet. This is the company's historical account,
  not an independent ranking or an exclusive attribution of the AI revolution.
- NVIDIA, Vivek Singh, October 11, 2024,
  https://blogs.nvidia.com/blog/first-gpu-gaming-ai/ : GeForce 256 in 1999.
  Avoided the company's universal “first GPU” priority claim in our wording.
- Stripe Sessions 2024 original transcript,
  https://stripe.com/sessions/2024/a-conversation-with-nvidias-jensen-huang :
  first-principles checking of conviction (transcript paragraphs 524–528 in
  inspected text); creating markets (461–478); sustaining CUDA through early
  applications and delayed adoption (494–528). Three short mindset summaries
  are explicitly editorial interpretations, not verbatim quotations or verified
  timestamped segments in the linked Stanford, Acquired and YC recordings.

Rendered citations include source entries and return links; Markdown retains
native footnotes. Contributions credit co-founders, engineers, researchers and
developers rather than presenting all NVIDIA work as one person's invention.
The selected history is illustrative, not an exhaustive or current product map.

Review: desktop and mobile screenshots inspected for hero, timeline, mindset and
full dedication; 360/390/768/1024/1440 widths checked for overflow. Official song
link, four milestones, three interpretations, original 24 cards, reduced motion,
print, no-JS, complete tribute/context in Markdown, and the new mindset playback
links (selection, Escape cleanup and opener focus) pass. Existing gallery filter,
save, journey and player checks also rerun successfully. No actual remote
audiovisual playback asserted. Structured review:
`review-shine-2026-11-12.json`; screenshots ignored in `output/jensen-shine-review/`.
No commit, push or publication authorized.

## Recent real-photo hero and Pink Floyd title

Latest author direction supersedes the illustrated hero below. The title is now
“Jensen, wish you were here.” with a brief Pink Floyd acknowledgement. No audio,
album artwork or additional song lyrics are included.

Selected the original World Economic Forum photograph dated January 21, 2026:
https://www.flickr.com/photos/worldeconomicforum/55053488739 .
Credit: ©2026 World Economic Forum / Thibaut Bouvier. Inspected its license link:
CC BY-NC-SA 4.0. This is a personal, noncommercial collection. Source and all photo
derivatives retain that license, excluded from MIT. Credit, source, license and
modifications appear beside the image, in Markdown and public source records.

The image shows Jensen speaking and gesturing at Davos in his leather jacket.
The six-second camera loop preserves the photograph without generated facial
motion, speech or invented event details. Native GIF is retained; animated WebP
reduces page transfer from about 6.2 MiB to 1.4 MiB. Static WebP remains the
reduced-motion, print and no-JS fallback. Editable animation source is
`visuals/render-photo-motion.py`.

Rejected 2016 COMPUTEX (too old), the 2024 portrait (not a speech), CES 2025 crowd
photos (speaker too distant), a visually unsuitable mislabeled government-event
result, and Stanford 2026 selfies (after-talk moment). GTC 2026 official press
photos were found, but their linked general terms did not establish adaptation
rights for this page. The selected WEF image has an explicit adaptation license.

Visually reviewed desktop 1440 × 1080 and mobile 390 × 844. No horizontal overflow.
Motion selection, reduced motion, print, no-JS, tribute Markdown parity and
error-free browser execution checked in `review-photo-2026-11-12.json`.
Screenshots in ignored `output/jensen-photo-review/`. Catalog remains intact.
Local only; no commit, push or deployment authorized.

## Living tribute hero refinement

At the author's request, replaced the monochrome Stanford hero thumbnail with
original colorful AI-generated decorative artwork. The gallery thumbnails remain
original publisher previews. The new first-person English dedication preserves
the author's admiration, immigrant/American-dream perspective, personal sense of
encouragement, and hope for Jensen's return. “To me” and “I believe” identify the
evaluations and future expectations as the author's views, not predictions or
verified announcements. No allegation, obituary or fabricated quotation added.

Imagegen generated the still; an editable Python/SVG renderer adds circuit pulses
and chip sparks and assembles a six-second GIF. Asset provenance is retained in
`public/figures/jensen/SOURCES.md`, with the prompt and renderer in `visuals/`.
The image and caption identify it as generated illustration, not recorded footage.
The mobile layout places art after the headline and dedication, before the longer
personal text. Reduced motion, print, no JavaScript and offscreen/background
states use the static WebP. No playback toolbar was added.

Validation: 49 deployment tests and 187 content tests pass, Astro reports zero
errors/warnings, 108 pages build, 107 MDX pages lint clean. Existing Nimbus/Vite
directive and 25 legacy redirect indexing notices remain. Desktop/mobile visual
review, GIF/static selection, no-JS baseline and tribute Markdown parity pass;
all 60 coalesced GIF frames differ. Existing filters, source links, saves,
keyboard details, modal sizing/navigation/cleanup/focus and exports were checked
again. No actual remote audiovisual playback was asserted. Screenshots are in
ignored `output/jensen-tribute-review/`; structured review is
`review-tribute-2026-11-12.json`. Local only; no publication authorized.

Canonical catalog: `src/data/jensen-videos.json`. Standalone application: `/jensen/`.

Verified all seven IDs, exact titles and uploader identities through the public YouTube oEmbed endpoint. Original publishers: NVIDIA, Stanford GSB, Acquired and Caltech. GTC years appear in titles; Stanford 2024 and Acquired 2023 publication context cross-checked against discovery records. Caltech ceremony linked directly from NVIDIA's own article: https://blogs.nvidia.com/blog/jensen-huang-caltech-commencement-address/ . SIGGRAPH video is the Lauren Goode conversation, not the Zuckerberg interview; oEmbed corrected an initially ambiguous lead.

Inspection scope: publisher identity and video metadata; no claim of watching complete recordings, transcript verification, exact durations, chapter positions or specific quotations. Descriptions are brief editorial orientation, not detailed speech summaries. Caltech is explicitly labeled a complete ceremony containing the address. No unverified timestamps or invented quotes.

The November 12 resignation is reported in current AP coverage and an NVIDIA press-release discovery result. The gallery makes no claim about the event, allegations or motives; its purpose is a personal tribute through public speeches. No obituary language. Reference: https://apnews.com/article/5403f152a601cf82ce939f1d24fffa0f .

Videos remain hosted by original uploaders. Remote thumbnails link to original YouTube video IDs; no video download, rehosting, excerpt editing or representation of affiliation. Player is loaded only on explicit viewer action using youtube-nocookie.com. Captions, region restrictions and embedding permissions are controlled by the uploader/YouTube; direct source link remains available. Playback failure fallback is shown alongside player.

Local-only favorites, URL-shareable filters and accessible native dialog. No account, backend or analytics added. Desktop/mobile screenshots, keyboard dialog close/focus restoration, empty search, combined filters, save/filter behavior, reduced motion, static source links and production build reviewed. Storage failure handling inspected in code but not simulated. Player close removes the iframe. No publication authorized.

## English revision

The user requested English throughout the gallery. Updated the page language, editorial headings/descriptions, category/tag search vocabulary, controls, status messages, accessible names, metadata and Markdown export. Desktop/mobile reviewed; all seven source identities preserved; no Chinese display text remains. Full validation passed. No commit or publication requested.

## Broader coverage pass — November 12, 2026

Expanded from 7 to 24 recordings across 17 original publishing channels. Lex Fridman #494 and Joe Rogan Experience #2422 were missing from the first selection; both are now the first entries. Also added Dwarkesh Patel, YC Startup School, CHM oral history, two No Priors episodes, two BG2 appearances, Stanford SIEPR, two Milken conference conversations, two Bloomberg interviews, the CBS 60 Minutes profile, COMPUTEX 2023 and CES 2025. Existing NVIDIA/Stanford/Acquired/Caltech entries retained. No full recording is represented by an unofficial clip or condensed recap.

Verification: fetched original YouTube oEmbed metadata for all 17 additions. Rechecked all 24 original YouTube watch pages for publisher-supplied publishDate/uploadDate; every displayed year matches. Exact dates retained in publication-dates-2026-11-12.json. Episode sources inspected: https://lexfridman.com/jensen-huang/ and https://www.dwarkesh.com/p/jensen-huang ; their transcript links retained. YC video found through its own Startup Library. BG2 2026 discovered through a secondary index then validated against the actual Bg2 Pod uploader and publication date. Third-party pages were discovery leads, not the catalog's publisher identity evidence.

Earlier coverage: original Stanford archive pages for How a CEO Spends Time (January 29, 2003, excerpt) and Vision Matters (April 8, 2009, full archive talk). These are separate archive links, not invented YouTube IDs or extra recordings counted in the 24. Source pages: https://stvp.stanford.edu/av/how-ceo-spends-time and https://stvp.stanford.edu/av/vision-matters .

Skeptical checks: distinguish full podcasts from clips; CBS is an edited profile; Caltech is a complete ceremony; SIEPR is distinct from GSB; WIRED SIGGRAPH is Lauren Goode, not the Zuckerberg interview. Do not conflate a title's host credits with verified attendance: BG2 cards use generic original episode attribution. The NTU university page yields a video ID but its oEmbed lookup returned 403, so it was not admitted as a verified playable catalog entry. Goldman Sachs event and other SIGGRAPH/No Priors appearances remain potential further additions; this is a broad curated collection, not an exhaustive inventory of every appearance. No claim of watching all recordings or independently checking their spoken assertions.

Presentation adds a format filter and format labels to distinguish podcasts, interviews, conversations, keynotes, commencement, oral history and edited profiles. Existing topic/year/search/saved controls remain. Descriptions stay within inspected episode/event metadata; host transcript links provided where confirmed. All UI remains English.

## Warm editorial redesign — November 12, 2026

User requested a neat, interesting experience and questioned the dark background. Replaced the dark visual system with ivory paper, forest-green accents, self-hosted Inter and Georgia display type. Added three guided entry points, quieter card metadata, native expandable recording details and next/previous playback within the filtered collection. Preserve all 24 recordings, original titles, transcript/source links, search, filters, local saves and the standalone route. Source catalog remains unchanged.

Reviewed desktop/mobile screenshots and refined image rendering and small-text contrast. Removed decorative image transforms/overlays after a compositor artifact appeared in the initial proof. Fixed scoped CSS for dynamically inserted iframes: the child selector must be global; actual iframe and viewport widths now both 1098px in desktop review. Next/previous selects the expected recordings; closing removes the iframe and returns focus to the opener. Native recording details open with Enter. The podcast entry point selects eight matching records and focuses search without losing scroll position. Print uses a white background and hides controls. Reduced motion, no-JS source links, image loading through the whole catalog and full Markdown export passed. Review results in review-style-2026-11-12.json. No publication authorized.
