# Atlantis Three Sixty — atlantisthreesixtyzirakpur.com

Single-page lead-gen site. HTML5 + Tailwind CDN + vanilla JS — no build step, works from static hosting (GitHub Pages / Cloudflare Workers, same as your other sites).

## v2 update
- Real logo added: cut out from your uploaded JPG (dark teal square) into a clean transparent PNG, recolored gold to match the site palette, and used in the header, mobile nav, footer, and as the favicon.
- Hero background now uses your two uploaded video clips — landscape for desktop, portrait for mobile — switched via JS based on screen width (not the `<source media>` attribute, which isn't reliably honored across browsers).
- Luxury polish pass: gold sheen sweep on primary buttons, subtle grain texture on dark sections, gold rule accents under section labels, hover lift on amenity/highlight/floor-plan cards, and scroll-reveal entrance animation on each section.
- Mobile pass: hero stats now wrap 2×2 instead of horizontal-scrolling on small screens, tower tabs scroll cleanly on narrow widths, header brand/button sizing tightens below 400px so nothing overflows, and section padding is tighter on mobile.

## v6 update — SEO pass + performance cleanup
- **Title/meta description rewritten** to Google's optimal length: title was 80 characters (was getting truncated in search results), now 58. Description was 239 characters, now 150 — both lead with the primary keyword and RERA/unit facts.
- Added **BreadcrumbList schema** alongside the existing ApartmentComplex + FAQPage schema for richer search result presentation.
- Verified all 9 internal anchor links resolve correctly, all 15 image/video asset references exist on disk, sitemap.xml is valid XML with today's lastmod date.
- **Performance**: compressed `promo.mp4` from 10.4MB to 3.8MB (the one video I'd missed compressing earlier) and removed ~8MB of dead assets that were no longer referenced anywhere (old hero video clips, old poster frames, unused logo lockup variants) — total asset payload down from ~20MB to ~12MB.
- Keyword coverage checked: "Zirakpur" (35), "PR-7" (14), "Airport Road" (13), "RERA" (19) all appear naturally through body content, not just meta tags.

## v5 update
- Footer legal text fixed: the disclaimer paragraph and copyright line were inheriting a generic 14px paragraph style meant for the rest of the footer, making them look oversized and unevenly wrapped. Now centered, constrained to a readable width, and sized correctly as a distinct legal block.
- Replaced the sample-flat walkthrough with your newly trimmed cut and compressed it (~8.8MB → ~2.6MB) for faster loading — same file name (`assets/video/sample-flat-tour.mp4`), so no other changes needed.

## v4 update
- **Logo fixed properly**: the earlier crop was cutting off the top of the bird icon and squashing it into a forced square, which is what made it look trimmed and made the footer row look uneven/distorted. Re-extracted using pixel-level component analysis of your logo file so the full bird icon (wingtip to base) and full "ATLANTIS THREE SIXTY" wordmark are captured intact, and the image now renders at its true aspect ratio everywhere (header, mobile nav, footer, legal pages, favicon) instead of being stretched into a square box.
- **Hero fixed for desktop**: the tower render has a large flat empty navy panel on its right third — invisible on mobile's cropped portrait view, but dominant on wide desktop screens, which is why it looked fine on mobile and not on desktop. Rebuilt as a true split layout on screens ≥960px — image on the left, headline/copy on a solid navy panel on the right — so desktop no longer depends on how the browser happens to crop a wide image. Mobile is untouched since you confirmed it already looks right.
- **DilaDeGhar.com removed** from the footer disclaimer, copyright line, privacy policy, terms page, and structured data — the "independent, not the official site" disclaimer stays (still legally important since the developer's own site claims to be the only official one), just without naming the brand.
- Additional luxury detailing: gold accent line on the hero eyebrow, gold top-edge on the enquiry modal.

## v3 update
- **Hero rebuilt**: replaced the short looping video clips with the high-resolution dusk tower render as a static background with a slow, subtle zoom (CSS-only, no cropping/looping issues across devices) — this reads more premium and avoids the video-hero cropping problems your other projects have run into. The stat row is now a floating glass-panel strip anchored under the headline instead of a plain row of numbers.
- **Location section**: removed the Google Maps embed and the old location map image (it was incorrect) — now uses your campaign poster creative as the location map image, renamed to `assets/img/location-map.jpg`.
- **Two new video sections** added from your latest uploads: "Step Inside" (sample flat walkthrough) after the floor plans, and "The Sense of Convenience" (connectivity reel) after the location section — both as portrait video cards with supporting copy, not backgrounds, so nothing gets cropped.
- Gallery's poster-image slot swapped for a real sample-flat interior still (the campaign poster now lives in Location instead, so it isn't shown twice).
- Your two earlier hero video clips (`hero-desktop.mp4`, `hero-mobile.mp4`) are no longer used but kept in `assets/video/` in case you want a video-hero variant later — just say the word.

## Deploy
1. Push this folder's contents to your GitHub repo for the domain, or upload to your Cloudflare Worker/Pages project.
2. Point `atlantisthreesixtyzirakpur.com` DNS at it (same pattern as your other projects).
3. Verify in Google Search Console and submit `sitemap.xml`.

## Lead capture
- Wired to your **shared Google Apps Script** endpoint (same sheet as Escon Primera / Vintage Greens / Aveda Arenium / Ananta Aspire), with `project: "Atlantis Three Sixty"` on every row — check that a matching tab/filter exists in your sheet.
- No phone number or WhatsApp is shown anywhere on the site, per your instruction — the only conversion path is the Enquire Now form (header, hero, sticky mobile bar, every tower panel, every price row, footer, and the final on-page form all open the same modal or scroll to the form).
- Form submission is fire-and-forget (doesn't wait on the Apps Script response) so the "Thank you" confirmation shows instantly.
- `dataLayer` events fire on real submissions only: `atlantis360_form_submit` (with `source` and `configuration`), `atlantis360_modal_open`.

## Still needed from you
- **GTM container**: no container ID is wired in yet. Create a dedicated GTM container for this project (same one-container-per-project pattern as your other sites) and I'll drop the snippet in and hook up the conversion trigger on `atlantis360_form_submit`.
- **Starting price (₹1.88 Cr)**: this came from a third-party listing (RealEstateIndia), not an official price list — worth confirming with the developer/your source before it stays live.
- **Possession date**: third-party listings show ~Jan 2029, but this isn't confirmed from official material, so I deliberately left it off the site. Let me know if you want it added.
- Real Google reviews for a testimonials section — none were available yet, so the section was left out entirely rather than filled with placeholders.

## Data sources
- Site plan, gatefold brochure, and full floor-plan PDFs you uploaded (all 5 towers' floor plans extracted directly from your PDF, not redrawn).
- Cross-checked against the official site (atlantisthreesixty.com) for tower-by-tower BHK/floor/area breakdown and RERA number.
- Third-party listings (RealEstateIndia) used only for price and possession estimates, clearly flagged above.
- Logo cut out and recolored from your uploaded JPG; hero videos are your uploaded desktop/mobile clips.

## Compliance
- Footer + terms.html carry the "independent, not the official website" disclaimer, matching the pattern used on Marq/Vamana/Ananta/Aveda — the official site explicitly claims to be the *only* authorized site, so this framing matters here.
- RERA PBRERA-SAS79-PR1159 is shown in the hero badge, footer, and FAQ, and links out to rera.punjab.gov.in in terms.html.
