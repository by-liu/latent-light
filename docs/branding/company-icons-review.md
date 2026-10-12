# Company explorer icon review

Reviewed October 11, 2026. This change adds identification marks, not new market
claims. The existing source verification dates and analytical content are retained.

## Scope and asset review

- All four landscape Company explorers use the shared server-rendered pattern.
- 99 company rows: 88 display official website marks and 11 display initials.
- 73 distinct identity mappings: 64 local marks and 9 explicit initials fallbacks.
- The marks are 24 px, with the original proportions and colors. Highest available
  ICO frames replaced soft first-frame extractions before installation.
- A labeled contact sheet was inspected for identity mismatches, generic hosting
  placeholders and unusable artwork. No accelerator logo stands in for a company.
- Sources, checksums, transformations and contextual reuse assessments are in
  `company-icons.json`. The public notice is `public/licenses/company-icons.txt`.
- Logos are supplemental and hidden from assistive reading. Text names, original
  official links, geo qualifiers and citation anchors remain canonical.
- A white neutral canvas preserves dark marks in both themes. No recoloring,
  animation, colored badges, third party logo service or runtime hotlinks were added.

## Actual validation

- `npm run validate`: 48 deployment and 118 content tests passed. Astro reported
  zero errors, warnings or hints. The 76-page production build and lint passed.
- 20 Chromium views: all four pages at 1440 px in both themes, 390 px in both
  themes, and 320 px in dark mode. Eight additional desktop Focus views passed.
- All local icons decoded. Mark size, text space, no overlap and no page overflow
  were checked. Representative desktop, mobile, Focus and failure screenshots
  were visually inspected, in addition to the automated layout assertions.
- Search, category filter, empty state, Reset focus, keyboard table panning,
  reduced motion and unfiltered print behavior passed.
- All four no-JavaScript tables retained their complete rows and identity marks.
- A deliberately failed image returned to visible initials without replacing
  the company text. Unknown marks and unrelated hosts cannot claim another brand.
- Full Markdown tables and references remain unchanged apart from page metadata.
  Markdown and MDX endpoints, Pagefind searches and production privacy checks passed.
- The actual local site on port 4327 was checked separately: all four pages served
  the expected marks, decoded the assets and initialized the explorer controls.
- `git diff --check` passed. Existing unrelated working-tree changes were preserved.
- Existing Pagefind notices about redirect-only pages having no HTML remain;
  no new validation failure was introduced.

## Publication boundary

No commit, push or deployment was performed. Company artwork is excluded from
the site MIT grant. Recheck rights for advertising, sponsorship, merchandising
or a material change of distribution.

The local preview is ready for the author’s review.

## Physical AI revision 4

Reviewed 36 new identities on a labeled contact sheet. 33 use official local
identification assets. UBTECH, Leju and ANYbotics use text initials because a
matching usable icon was not verified. Alibaba and ByteDance reuse existing
parent identities with exact repository/subdomain mappings. Generic GitHub
icons are never assigned to companies. Earlier provenance is preserved.

The full registry has 109 identities: 97 local official marks and 12 initials
fallbacks. These counts describe identity assets, not distinct companies.

Revision 4 delivery checks passed: the Physical AI explorer has 52 identity
marks, including 44 decoded local official assets and eight initials. All four
landscapes passed desktop/mobile, light/dark, Focus, keyboard, filtering, print,
no-JavaScript and failed-image checks. All unfiltered text exports retain the
complete directories. The existing site on port 4327 was inspected. Full site
validation passed with 48 deployment and 119 content tests. Existing build
notices and unrelated working-tree changes were preserved. No commit, push or
deployment was performed.
