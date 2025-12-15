# PWA Icons

This directory contains all the icons required for the AgriConecta PWA.

## Icons Included

- **icon-192x192.png** - Standard PWA icon (192x192px)
- **icon-512x512.png** - Standard PWA icon (512x512px)  
- **icon-maskable-192x192.png** - Maskable icon with safe zone (192x192px)
- **icon-maskable-512x512.png** - Maskable icon with safe zone (512x512px)
- **apple-touch-icon.png** - Apple touch icon (180x180px)

## Favicon

The favicon is located in the `public/` directory:
- **favicon.ico** - 32x32px favicon for browsers

## Design

All icons feature the AgriConecta brand:
- 🌾 Emoji on a green gradient background (#16a34a to #15803d)
- Rounded corners for standard icons
- Full bleed for maskable icons to work with different icon shapes

## Regenerating Icons

If you need to regenerate these icons:

1. Install sharp: `npm install --save-dev sharp`
2. Create source SVG files with your design
3. Use the icon generation script to convert SVG to PNG
4. Remove sharp when done: `npm uninstall sharp`
