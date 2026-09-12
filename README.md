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
