# Scripts

## OG Image Generation

### `generate-og-images.ts`

Automatically converts SVG social media card images to PNG format for maximum platform compatibility.

**Source files:**
- `public/og-image.svg` → `public/og-image.png` (1200x630)
- `public/twitter-card.svg` → `public/twitter-card.png` (1200x600)

**Usage:**

```bash
# Manual generation
npm run generate:og

# Automatic generation (runs before build)
npm run build
```

**How it works:**
1. Reads SVG files from `public/` directory
2. Uses Sharp to convert to high-quality PNG (95% quality, level 9 compression)
3. Outputs PNG files to `public/` directory
4. PNG files are gitignored and regenerated on each build

**Why PNG?**
- Better platform compatibility (some social platforms don't support SVG)
- Consistent rendering across all platforms
- Recommended by OpenGraph best practices

**Editing images:**
1. Edit the SVG source files (`og-image.svg`, `twitter-card.svg`)
2. Run `npm run generate:og` to regenerate PNGs
3. Or just run `npm run build` - PNGs are auto-generated via prebuild hook
