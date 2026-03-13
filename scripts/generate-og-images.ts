#!/usr/bin/env tsx
/**
 * Generate PNG versions of OG images from SVG sources
 * Runs automatically before build to ensure PNG versions are up-to-date
 */

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = join(process.cwd(), 'public');

const images = [
  { svg: 'og-image.svg', png: 'og-image.png', width: 1200, height: 630 },
  { svg: 'twitter-card.svg', png: 'twitter-card.png', width: 1200, height: 600 },
];

async function convertSvgToPng(svgPath: string, pngPath: string, width: number, height: number) {
  try {
    const svgBuffer = await readFile(svgPath);
    
    const pngBuffer = await sharp(svgBuffer)
      .resize(width, height)
      .png({ quality: 95, compressionLevel: 9 })
      .toBuffer();
    
    await writeFile(pngPath, pngBuffer);
    
    console.log(`✓ Generated ${pngPath} (${width}x${height})`);
  } catch (error) {
    console.error(`✗ Failed to generate ${pngPath}:`, error);
    throw error;
  }
}

async function main() {
  console.log('🎨 Generating PNG versions of OG images...\n');
  
  for (const image of images) {
    const svgPath = join(PUBLIC_DIR, image.svg);
    const pngPath = join(PUBLIC_DIR, image.png);
    
    await convertSvgToPng(svgPath, pngPath, image.width, image.height);
  }
  
  console.log('\n✨ All OG images generated successfully!');
}

main().catch((error) => {
  console.error('Failed to generate OG images:', error);
  process.exit(1);
});
