# Lights Pi Marketing Website

Modern, beautiful marketing website for Lights Pi - the open-source Raspberry Pi lighting controller.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
marketing-site/
├── app/
│   ├── layout.tsx          # Root layout with nav & footer
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Main navigation
│   ├── Footer.tsx          # Site footer
│   └── home/               # Homepage sections
│       ├── Hero.tsx
│       ├── ProblemSolution.tsx
│       ├── KeyFeatures.tsx
│       ├── UseCases.tsx
│       ├── HowItWorks.tsx
│       ├── CostComparison.tsx
│       ├── SocialProof.tsx
│       └── FinalCTA.tsx
└── public/                 # Static assets
```

## Features

- Responsive design
- Modern gradient aesthetics
- Smooth animations
- Interactive components
- SEO optimized
- Fast performance

## Deployment

This site is ready to deploy to Vercel, Netlify, or any Next.js hosting platform.

```bash
npm run build
npm run start
```

## License

MIT
