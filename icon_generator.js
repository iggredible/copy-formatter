// npm install sharp
// node icon_generator.js

const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

const sizes = [16, 48, 128];

const svgBuffer = fs.readFileSync(path.join(__dirname, 'icon.svg'));

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
