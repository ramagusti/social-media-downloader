const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgs = [
  { file: 'logo-text-navy.svg', name: 'text-navy' },
  { file: 'logo-text-minimal.svg', name: 'text-minimal' },
  { file: 'logo-monogram.svg', name: 'monogram' },
  { file: 'logo-badge.svg', name: 'badge' }
];

const sizes = [16, 48, 128];

async function convertSvgs() {
  for (const svg of svgs) {
    const svgPath = path.join(__dirname, 'logo/v3', svg.file);
    
    if (!fs.existsSync(svgPath)) {
      console.log(`Skipping ${svg.file} - not found`);
      continue;
    }
    
    const svgBuffer = fs.readFileSync(svgPath);
    
    for (const size of sizes) {
      const outputDir = path.join(__dirname, 'logo/v3', svg.name);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputPath = path.join(outputDir, `icon${size}.png`);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`Created ${svg.name}/icon${size}.png`);
    }
    
    // Also create 1024x1024 for high-res preview
    const outputDir = path.join(__dirname, 'logo/v3', svg.name);
    const outputPath = path.join(outputDir, 'logo-1024.png');
    
    await sharp(svgBuffer)
      .resize(1024, 1024)
      .png()
      .toFile(outputPath);
    
    console.log(`Created ${svg.name}/logo-1024.png`);
  }
  
  console.log('\n✅ All text logos generated successfully!');
}

convertSvgs().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
