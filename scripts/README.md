# Scripts

## Social cards

`generate-og-images.ts` renders `scripts/og/card.html` with a local headless
Chrome into:

- `public/og-image.png` (1200×630, Open Graph)
- `public/twitter-card.png` (1200×600, Twitter / X)

The card uses the site's typeface (Chillax, loaded from Fontshare) and the
Sunset scene's swatch colours. The PNGs are committed; the build does not
regenerate them, because Vercel's build image has no Chrome.

```bash
npm run generate:og        # set CHROME_PATH if Chrome isn't in the usual place
```

To change the card, edit `scripts/og/card.html` (open it in a browser with
`?h=630` or `?h=600` to preview), then run the command above and commit the
PNGs.

## Icons

The favicon and Apple touch icon are rendered by `app/icon.tsx` and
`app/apple-icon.tsx` from `lib/icon-mark.tsx`. `public/favicon.svg` is the
same mark as a static file (used as the schema.org logo).
