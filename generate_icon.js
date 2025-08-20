const fs = require('fs');
const path = require('path');

// Simple SVG icon with a TV and play button
const createTVIcon = (size, backgroundColor = '#e50914', iconColor = '#ffffff') => {
  const padding = size * 0.15;
  const iconSize = size - (padding * 2);
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.1}" fill="${backgroundColor}"/>
  
  <!-- TV Screen -->
  <rect x="${padding}" y="${padding}" width="${iconSize}" height="${iconSize * 0.7}" 
        rx="${size * 0.05}" fill="none" stroke="${iconColor}" stroke-width="${size * 0.03}"/>
  
  <!-- Play Button -->
  <path d="${createPlayPath(size/2, size/2 - size*0.05, size * 0.15)}" fill="${iconColor}"/>
  
  <!-- TV Stand -->
  <rect x="${size * 0.35}" y="${padding + iconSize * 0.7}" 
        width="${size * 0.3}" height="${size * 0.05}" fill="${iconColor}"/>
  <rect x="${size * 0.25}" y="${padding + iconSize * 0.75}" 
        width="${size * 0.5}" height="${size * 0.08}" rx="${size * 0.02}" fill="${iconColor}"/>
  
  <!-- Text -->
  <text x="${size/2}" y="${size * 0.92}" font-family="Arial, sans-serif" 
        font-size="${size * 0.08}" font-weight="bold" fill="${iconColor}" 
        text-anchor="middle">TV DEMO</text>
</svg>`;
};

const createPlayPath = (cx, cy, size) => {
  const x1 = cx - size * 0.5;
  const y1 = cy - size * 0.6;
  const x2 = cx - size * 0.5;
  const y2 = cy + size * 0.6;
  const x3 = cx + size * 0.7;
  const y3 = cy;
  return `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} Z`;
};

// Banner for Android TV (320x180)
const createTVBanner = () => {
  const width = 320;
  const height = 180;
  const backgroundColor = '#1a1a1a';
  const primaryColor = '#e50914';
  const textColor = '#ffffff';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background Gradient -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${backgroundColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
  
  <!-- TV Icon -->
  <rect x="40" y="50" width="80" height="60" rx="8" 
        fill="none" stroke="${primaryColor}" stroke-width="4"/>
  
  <!-- Play Button in TV -->
  <path d="M 70 70 L 70 90 L 90 80 Z" fill="${primaryColor}"/>
  
  <!-- TV Stand -->
  <rect x="60" y="110" width="40" height="8" fill="${primaryColor}"/>
  <rect x="50" y="118" width="60" height="12" rx="4" fill="${primaryColor}"/>
  
  <!-- App Title -->
  <text x="160" y="85" font-family="Arial, sans-serif" font-size="32" 
        font-weight="bold" fill="${textColor}">RN TV</text>
  <text x="160" y="115" font-family="Arial, sans-serif" font-size="20" 
        fill="${primaryColor}">Demo App</text>
</svg>`;
};

// Create icon files
const icons = [
  { name: 'ic_launcher.svg', size: 512, content: createTVIcon(512) },
  { name: 'tv_banner.svg', content: createTVBanner() }
];

// Save SVG files
icons.forEach(icon => {
  fs.writeFileSync(path.join(__dirname, icon.name), icon.content);
  console.log(`Created ${icon.name}`);
});

console.log('\nIcon SVG files created successfully!');
console.log('To convert to PNG:');
console.log('1. Use an online converter like https://cloudconvert.com/svg-to-png');
console.log('2. Or install ImageMagick and run: convert ic_launcher.svg ic_launcher.png');
console.log('\nFor Android, place the PNG files in:');
console.log('- ic_launcher.png -> android/app/src/main/res/mipmap-* directories');
console.log('- tv_banner.png -> android/app/src/main/res/drawable/');