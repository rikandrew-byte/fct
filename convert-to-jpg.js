const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'public', 'images', 'posts'),
  path.join(__dirname, 'public', 'images', 'products')
];

async function convertToJpg(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return; // Already jpg
  if (ext !== '.png' && ext !== '.webp') return; // Only convert png/webp

  // Skip SVGs and other formats
  const parsedPath = path.parse(filePath);
  const jpgPath = path.join(parsedPath.dir, `${parsedPath.name}.jpg`);

  try {
    // If it's a PNG, we might need a white background if it has transparency
    await sharp(filePath)
      .flatten({ background: { r: 255, g: 255, b: 255 } }) // Flatten transparency
      .jpeg({ quality: 90 })
      .toFile(jpgPath);
    console.log(`Converted: ${path.basename(filePath)} -> ${path.basename(jpgPath)}`);
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err.message);
  }
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      await convertToJpg(fullPath);
    }
  }
}

async function main() {
  console.log('Starting conversion to JPG...');
  for (const dir of directories) {
    await processDirectory(dir);
  }
  console.log('Conversion complete!');
}

main();
