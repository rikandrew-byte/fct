const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Script to automatically compress and convert all PNG/JPG images in /public
 * to WebP format to improve PageSpeed scores.
 * 
 * Usage:
 * 1. npm install sharp
 * 2. node convert-webp.js
 */

const publicDir = path.join(__dirname, 'public');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function convert() {
  console.log('--- Starting Image Optimization (WebP) ---');
  const files = getAllFiles(publicDir);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const output = file.replace(ext, '.webp');
      const isLogo = file.toLowerCase().includes('logo');
      
      try {
        await sharp(file)
          .webp({ quality: isLogo ? 95 : 80, effort: 6 })
          .toFile(output);
        
        const oldSize = fs.statSync(file).size / 1024;
        const newSize = fs.statSync(output).size / 1024;
        
        console.log(`✅ Converted: ${path.relative(__dirname, file)}`);
        console.log(`   Size: ${oldSize.toFixed(2)}KB -> ${newSize.toFixed(2)}KB`);
        
        // Optional: If you want to keep only webp, you can delete the old one
        // fs.unlinkSync(file); 
      } catch (err) {
        console.error(`❌ Error converting ${file}:`, err.message);
      }
    }
  }
  console.log('--- Optimization Complete ---');
}

convert();
