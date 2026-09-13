# ADRE-WEB

Self-contained multilingual Next.js website for ADRE.

## Languages
- Russian: `/ru`
- Kyrgyz: `/kg`
- English: `/en`

## Run
```bash
npm install
npm run dev
```

## Check
```bash
npm run check
```

## Included
- Technology-first positioning
- OCR vs ADRE comparison
- Confidence per field
- Logical validation and business rules
- Duplicate detection
- Batch processing
- Excel / PDF / CSV / JSON / ZIP exports
- Public API and webhooks
- Supported document types
- Company customization and sensitive-data masking
- RU / KG / EN localization
- Animated 4-step "how it works" demo on the hero section

The demo form sends requests through the server to `info@adre-cloud.app` and the configured Telegram bot. Keep delivery credentials in `.env.local` and set `TELEGRAM_CHAT_ID` to the personal chat or group that should receive notifications.

## Search indexing

The production canonical host is `https://www.adre-cloud.com`, matching the existing
308 redirect from `adre-cloud.com`. If the primary domain changes, update
`src/lib/seo.ts` and `scripts/check-seo.mjs` together with the hosting redirect.

- `src/lib/seo-texts.json` contains page-specific titles and descriptions in all three languages, adapted from the supplied SEO texts.
- `src/lib/seo.ts` supplies canonical URLs, reciprocal language alternates, Open Graph and Twitter metadata.
- `/kg` remains the Kyrgyz URL; its standard HTML/hreflang language code is `ky`.
- `src/app/sitemap.ts` generates all 33 canonical URLs with language alternates.
- `src/app/robots.ts` allows public pages and assets, excludes API crawling and points to the sitemap. Do not add conflicting copies in `public/`.
- All localized pages are prerendered, including their metadata and content. `/` permanently redirects to `/ru`.
- Sitemap dates are deliberately omitted rather than inventing modification dates on every build.

After building, run a production server and audit the HTTP responses:

```bash
npm run build
npm run start -- --port 3100
# In another terminal:
npm run check:seo
# After deployment:
npm run check:seo -- https://www.adre-cloud.com
```

Deploy these changes before submitting the sitemap. In Google Search Console and
Yandex Webmaster, verify ownership of the production domain and submit
`https://www.adre-cloud.com/sitemap.xml`. In Search Console, inspect the home and
main product URLs and request indexing. Confirm the production deployment is public
and does not inject `X-Robots-Tag: noindex`. Verification requires the owner's account
and the verification value issued by the search engine; no placeholder tokens are included.

Monitor indexing reports after submission. Crawling may take days or weeks and
indexing is not guaranteed. See [Google's recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
and [localized URL guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).
