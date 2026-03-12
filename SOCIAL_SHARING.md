# Social Sharing & SEO Setup

## Open Graph Images

The site includes custom Open Graph images for optimal social media sharing:

- **Main OG Image**: `/og-image.svg` (1200x630px)
  - Used by Facebook, LinkedIn, Discord, Slack
  - Displays when sharing any page on the site
  
- **Twitter Card**: `/twitter-card.svg` (1200x600px)
  - Optimized for Twitter/X's card format
  - Shows when sharing on Twitter/X

## Favicons

Multiple favicon formats for broad compatibility:

- **SVG Favicon**: `/favicon.svg` - Modern browsers, scalable
- **Apple Touch Icon**: `/apple-touch-icon.svg` - iOS home screen
- **ICO Favicon**: `/favicon.ico` - Legacy browser support (generate manually)

### Generating favicon.ico

For maximum compatibility, generate a favicon.ico file:

```bash
# Using ImageMagick
convert -background none -density 256x256 public/favicon.svg -define icon:auto-resize=16,32,48 public/favicon.ico

# Or use online converter
# https://convertio.co/svg-ico/
```

## Vercel Analytics

Analytics are automatically enabled when deployed to Vercel:

- **Vercel Analytics**: Tracks page views, user behavior
- **Speed Insights**: Monitors Core Web Vitals, performance metrics

No configuration needed - works out of the box on Vercel deployments.

### Viewing Analytics

1. Go to your Vercel dashboard
2. Select the project
3. Click "Analytics" tab
4. View real-time and historical data

## Testing Social Sharing

### Facebook/LinkedIn Debugger
- https://developers.facebook.com/tools/debug/
- Enter your URL to see how it appears
- Click "Scrape Again" to refresh cache

### Twitter Card Validator
- https://cards-dev.twitter.com/validator
- Enter your URL to preview the card
- Requires Twitter developer account

### General Preview
- https://www.opengraph.xyz/
- Quick preview of how links appear across platforms

## Metadata Structure

Each page includes:
- Title (optimized for SEO)
- Description (155 characters or less)
- Keywords
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD)

## Best Practices

1. **Image Sizes**: OG images are 1200x630px (1.91:1 ratio)
2. **File Format**: SVG for scalability and small file size
3. **Alt Text**: Always included for accessibility
4. **Cache**: Social platforms cache images - use debuggers to refresh
5. **Testing**: Test on multiple platforms before major launches

## Customizing Per Page

To customize OG images for specific pages, add to page metadata:

```typescript
export const metadata: Metadata = {
  title: "Custom Page Title",
  description: "Custom description",
  openGraph: {
    images: ["/custom-og-image.svg"],
  },
};
```
