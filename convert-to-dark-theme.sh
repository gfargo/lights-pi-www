#!/bin/bash

# Script to convert Lights Pi marketing site to QLC+ dark theme
# Colors: Orange (#FF9800) and Blue (#2196F3) on dark gray backgrounds

echo "Converting to QLC+ dark theme..."

# Find all TSX files
find app components -name "*.tsx" -type f | while read file; do
  echo "Processing: $file"
  
  # Background colors
  sed -i '' 's/bg-white /bg-gray-900 /g' "$file"
  sed -i '' 's/bg-slate-50/bg-gray-800/g' "$file"
  sed -i '' 's/bg-blue-50/bg-gray-900/g' "$file"
  sed -i '' 's/bg-purple-50/bg-gray-900/g' "$file"
  sed -i '' 's/bg-pink-50/bg-gray-900/g' "$file"
  sed -i '' 's/bg-green-50/bg-gray-900/g' "$file"
  sed -i '' 's/bg-red-50/bg-gray-900/g' "$file"
  sed -i '' 's/bg-orange-50/bg-gray-900/g' "$file"
  sed -i '' 's/bg-indigo-50/bg-gray-900/g' "$file"
  
  # Text colors - dark to light
  sed -i '' 's/text-gray-900/text-white/g' "$file"
  sed -i '' 's/text-gray-800/text-gray-100/g' "$file"
  sed -i '' 's/text-gray-700/text-gray-300/g' "$file"
  sed -i '' 's/text-gray-600/text-gray-400/g' "$file"
  sed -i '' 's/text-gray-500/text-gray-400/g' "$file"
  
  # Border colors
  sed -i '' 's/border-gray-200/border-gray-700/g' "$file"
  sed -i '' 's/border-gray-100/border-gray-800/g' "$file"
  sed -i '' 's/border-blue-100/border-blue-900\/50/g' "$file"
  sed -i '' 's/border-purple-100/border-gray-800/g' "$file"
  sed -i '' 's/border-pink-100/border-gray-800/g' "$file"
  sed -i '' 's/border-red-100/border-red-900\/50/g' "$file"
  sed -i '' 's/border-green-100/border-green-900\/50/g' "$file"
  
  # Gradient colors - blue/purple to orange/blue
  sed -i '' 's/from-blue-600 to-purple-600/from-orange-500 to-blue-500/g' "$file"
  sed -i '' 's/from-blue-500 to-purple-500/from-orange-500 to-blue-500/g' "$file"
  sed -i '' 's/from-purple-600 to-pink-600/from-orange-500 to-blue-500/g' "$file"
  sed -i '' 's/from-purple-500 to-pink-500/from-orange-500 to-blue-500/g' "$file"
  
  # Hover states - change to orange
  sed -i '' 's/hover:text-blue-600/hover:text-orange-500/g' "$file"
  sed -i '' 's/hover:text-blue-700/hover:text-orange-500/g' "$file"
  sed -i '' 's/hover:text-purple-600/hover:text-orange-500/g' "$file"
  sed -i '' 's/hover:bg-blue-50/hover:bg-gray-800/g' "$file"
  sed -i '' 's/hover:bg-gray-50/hover:bg-gray-800/g' "$file"
  sed -i '' 's/hover:bg-purple-50/hover:bg-gray-800/g' "$file"
  sed -i '' 's/hover:border-blue-300/hover:border-orange-500/g' "$file"
  
  # Button and accent colors
  sed -i '' 's/bg-blue-600/bg-orange-500/g' "$file"
  sed -i '' 's/bg-blue-500/bg-orange-500/g' "$file"
  sed -i '' 's/bg-purple-600/bg-blue-500/g' "$file"
  sed -i '' 's/bg-purple-500/bg-blue-500/g' "$file"
  
  # Text accent colors
  sed -i '' 's/text-blue-600/text-orange-500/g' "$file"
  sed -i '' 's/text-blue-700/text-orange-500/g' "$file"
  sed -i '' 's/text-blue-500/text-blue-400/g' "$file"
  sed -i '' 's/text-purple-600/text-orange-500/g' "$file"
  sed -i '' 's/text-purple-500/text-orange-500/g' "$file"
  
  # Ring colors (focus states)
  sed -i '' 's/ring-blue-200/ring-orange-500\/50/g' "$file"
  sed -i '' 's/ring-white/ring-gray-700/g' "$file"
  
  # Special background patterns
  sed -i '' 's/bg-gradient-to-b from-slate-50 to-white/bg-gradient-to-b from-gray-900 to-gray-800/g' "$file"
  sed -i '' 's/bg-gradient-to-b from-white to-slate-50/bg-gradient-to-b from-gray-800 to-gray-900/g' "$file"
  
  # Icon colors
  sed -i '' 's/text-yellow-500 fill-yellow-500/text-orange-500 fill-orange-500/g' "$file"
  
  # Specific component fixes
  sed -i '' 's/bg-blue-100 text-blue-700/bg-orange-900\/50 text-orange-400/g' "$file"
  sed -i '' 's/bg-purple-100 text-purple-700/bg-blue-900\/50 text-blue-400/g' "$file"
  
done

echo "Conversion complete!"
echo "Please review the changes and test the site."
