# Analytics & Conversion Tracking

This site uses Vercel Analytics for tracking page views, user behavior, and conversion events.

## Setup

Analytics are automatically enabled when deployed to Vercel. No additional configuration needed.

### Components

- `@vercel/analytics` - Page views and custom events
- `@vercel/speed-insights` - Core Web Vitals monitoring
- `lib/analytics.ts` - Custom event tracking helpers

## Tracked Events

### Primary Conversions

1. **Get Started CTA** (`cta_get_started`)
   - Locations: hero, final_cta, hardware_cta, comparison_cta
   - Tracks clicks to /quick-start page

2. **View GitHub** (`cta_view_github`)
   - Locations: hero, final_cta, navigation, footer
   - Tracks external GitHub repository visits

3. **Join Community** (`cta_join_community`)
   - Locations: community_page, footer
   - Tracks Discord/community engagement

### Secondary Conversions

4. **View Documentation** (`cta_view_docs`)
   - Tracks navigation to docs pages

5. **Hardware Guide** (`cta_hardware_guide`)
   - Tracks interest in hardware setup

6. **Shopping Item Clicks** (`shopping_item_click`)
   - Properties: item name, price
   - Tracks which hardware items users are interested in

### User Interactions

7. **Code Copied** (`code_copied`)
   - Location: filename or language
   - Tracks when users copy installation commands

8. **Demo Interactions** (`demo_interaction`)
   - Action: specific demo action
   - Tracks engagement with interactive demo

9. **Blog Post Views** (`blog_post_view`)
   - Properties: title, version (for releases)
   - Tracks content engagement

10. **External Links** (`external_link`)
    - Properties: url, location
    - Tracks clicks to external resources

## Viewing Analytics

### Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select the `lights-pi-www` project
3. Click "Analytics" tab
4. View:
   - Page views over time
   - Top pages
   - Custom events
   - Conversion funnels
   - User demographics

### Key Metrics to Monitor

- **Conversion Rate**: Get Started clicks / Total visitors
- **Engagement**: Demo interactions, code copies
- **Drop-off Points**: Where users leave the funnel
- **Popular Content**: Most viewed pages and blog posts
- **Hardware Interest**: Which items get the most clicks

## Custom Event Usage

```typescript
import { trackEvent } from '@/lib/analytics';

// Track a conversion
trackEvent.clickGetStarted('hero');

// Track user interaction
trackEvent.copyCode('install-command');

// Track shopping interest
trackEvent.clickShoppingItem('Raspberry Pi 4', '$55');
```

## Best Practices

1. **Consistent Naming**: Use snake_case for event names
2. **Location Context**: Always include where the event occurred
3. **Meaningful Properties**: Add context that helps understand user behavior
4. **Privacy First**: Don't track PII or sensitive information
5. **Test Events**: Verify events appear in dashboard after deployment

## Conversion Funnel

Typical user journey:

1. Land on homepage (page_view)
2. Click "Get Started" (cta_get_started)
3. View Quick Start guide (page_view)
4. Copy installation command (code_copied)
5. Click hardware link (cta_hardware_guide)
6. Click shopping item (shopping_item_click)
7. Return to complete setup (installation_started)

## A/B Testing

Vercel Analytics supports A/B testing through feature flags. Use the existing fargo-flags setup:

```typescript
// Example: Test different CTA text
const ctaText = useFlag('cta-variant') 
  ? 'Start Building Now' 
  : 'Get Started in 10 Minutes';
```

Track both variants to compare conversion rates.

## Privacy & Compliance

- Vercel Analytics is GDPR compliant
- No cookies required
- No personal data collected
- Aggregated analytics only
- Users can opt-out via browser settings

## Troubleshooting

### Events not showing up?

1. Check you're on production deployment
2. Wait 5-10 minutes for data to appear
3. Verify `@vercel/analytics` is installed
4. Check browser console for errors

### Testing locally?

Events are disabled in development by default. Deploy to preview branch to test.

## Resources

- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Custom Events Guide](https://vercel.com/docs/analytics/custom-events)
- [Speed Insights](https://vercel.com/docs/speed-insights)
