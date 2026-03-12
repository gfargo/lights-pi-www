#!/usr/bin/env node

/**
 * Simple favicon.ico generator
 * Creates a basic ICO file from our brand colors
 * 
 * For production, use a proper tool like ImageMagick or an online converter
 * to convert favicon.svg to favicon.ico
 */

const fs = require('fs');
const path = require('path');

console.log('Note: For best results, convert favicon.svg to favicon.ico using:');
console.log('  - ImageMagick: convert -background none favicon.svg -define icon:auto-resize=16,32,48 favicon.ico');
console.log('  - Online: https://convertio.co/svg-ico/');
console.log('  - Or install sharp: npm install sharp sharp-ico');
console.log('\nFor now, the SVG favicon will work in modern browsers.');
console.log('Add favicon.ico manually for broader compatibility.');
