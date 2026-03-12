# Public Assets

## Favicon Generation

The favicon.svg is the source file. To generate favicon.ico for broader browser support:

### Using ImageMagick (if available):
```bash
convert -background none -density 256x256 favicon.svg -define icon:auto-resize=16,32,48 favicon.ico
```

### Using online converter:
1. Go to https://convertio.co/svg-ico/
2. Upload favicon.svg
3. Download favicon.ico
4. Place in public/ directory

### Using Node.js (sharp):
```bash
npm install sharp sharp-ico
node -e "const sharp = require('sharp'); const toIco = require('sharp-ico'); sharp('favicon.svg').resize(32, 32).toBuffer().then(buf => toIco([buf]).then(ico => require('fs').writeFileSync('favicon.ico', ico)));"
```

## Open Graph Images

- `og-image.svg` - Main Open Graph image (1200x630)
- `twitter-card.svg` - Twitter/X card image (1200x600)
- `apple-touch-icon.svg` - Apple touch icon (180x180)

All images use SVG format for crisp rendering at any size and small file size.
