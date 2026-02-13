const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgs = [
  { file: 'logo-simple.svg', name: 'blue' },
  { file: 'logo-teal.svg', name: 'teal' },
  { file: 'logo-coral.svg', name: 'coral' }
];

const sizes = [16, 48, 128];

async function convertSvgs() {
  for (const svg of svgs) {
    const svgPath = path.join(__dirname, 'logo/v2', svg.file);
    
    if (!fs.existsSync(svgPath)) {
      console.log(`Skipping ${svg.file} - not found`);
      continue;
    }
    
    const svgBuffer = fs.readFileSync(svgPath);
    
    for (const size of sizes) {
      const outputDir = path.join(__dirname, 'logo/v2', svg.name);
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
    
    // Also create 1024x1024 for high-res
    const outputDir = path.join(__dirname, 'logo/v2', svg.name);
    const outputPath = path.join(outputDir, 'logo-1024.png');
    
    await sharp(svgBuffer)
      .resize(1024, 1024)
      .png()
      .toFile(outputPath);
    
    console.log(`Created ${svg.name}/logo-1024.png`);
  }
  
  console.log('\n✅ All logos generated successfully!');
  console.log('Variations: blue, teal, coral');
}

convertSvgs().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
