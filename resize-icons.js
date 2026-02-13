const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function resizeIcons() {
  const inputFile = 'logo/001-modern-minimalist-app-icon-for-a-social-.png';
  const sizes = [16, 48, 128];
  
  for (const size of sizes) {
    await sharp(inputFile)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(`icons/icon${size}.png`);
    
    console.log(`Created icon${size}.png`);
  }
  
  console.log('All icons created successfully!');
}

resizeIcons().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
