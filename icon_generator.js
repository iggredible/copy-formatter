// This script can be used to convert the SVG icon to PNG files of different sizes
// You'll need to run this with Node.js and have the sharp package installed
// Install sharp: npm install sharp

const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

// Sizes for the icons
const sizes = [16, 48, 128];

// Read the SVG file
const svgBuffer = fs.readFileSync(path.join(__dirname, 'icon.svg'));

// Generate PNG files for each size
sizes.forEach(size => {
  sharp(svgBuffer)
    .resize(size, size)
    .toFile(path.join(iconsDir, `icon${size}.png`), (err) => {
      if (err) {
        console.error(`Error generating icon${size}.png:`, err);
      } else {
        console.log(`Generated icon${size}.png`);
      }
    });
});

console.log('Icons generation script complete. If successful, you should see the generated icons in the icons/ directory.');
