# Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/lights-pi-marketing)

1. Click the button above
2. Connect your GitHub account
3. Deploy!

## Manual Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

### Self-Hosted

```bash
npm run build
npm run start
```

The site will be available on port 3000.

## Environment Variables

No environment variables required for basic deployment.

Optional:
- `NEXT_PUBLIC_GITHUB_REPO` - GitHub repository URL
- `NEXT_PUBLIC_DISCORD_INVITE` - Discord invite link
- `NEXT_PUBLIC_ANALYTICS_ID` - Analytics tracking ID

## Performance

The site is optimized for:
- Lighthouse score: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Total page size: <500KB

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

## SSL/HTTPS

Both Vercel and Netlify provide automatic SSL certificates.

For self-hosted deployments, use:
- Let's Encrypt with Certbot
- Cloudflare SSL
- Reverse proxy (nginx/caddy) with SSL

## Monitoring

Recommended tools:
- Vercel Analytics (built-in)
- Plausible Analytics (privacy-friendly)
- Google Analytics
- Sentry (error tracking)
