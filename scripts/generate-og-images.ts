#!/usr/bin/env tsx
/**
 * Render the social cards from scripts/og/card.html with a local headless
 * Chrome, so they use the site's own typeface (Chillax, loaded from
 * Fontshare). Run by hand after changing the card: `npm run generate:og`.
 * The PNGs are committed; the build does not regenerate them (Vercel's
 * build image has no Chrome).
 */

import { execFileSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";

const CHROME = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p): p is string => !!p && existsSync(p));

if (!CHROME) {
  console.error("No Chrome found. Set CHROME_PATH to a Chrome or Chromium binary.");
  process.exit(1);
}

const card = pathToFileURL(join(process.cwd(), "scripts/og/card.html")).href;
const cards = [
  { out: "public/og-image.png", width: 1200, height: 630 },
  { out: "public/twitter-card.png", width: 1200, height: 600 },
];

for (const { out, width, height } of cards) {
  execFileSync(CHROME, [
    "--headless=new",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${width},${height}`,
    "--virtual-time-budget=8000",
    `--screenshot=${join(process.cwd(), out)}`,
    `${card}?h=${height}`,
  ], { stdio: "ignore" });
  console.log(`✓ ${out} (${width}x${height})`);
}
