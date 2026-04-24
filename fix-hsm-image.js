const sharp = require('sharp');
const path = require('path');

const inputPath = 'C:\\Users\\rik_7\\.gemini\\antigravity\\brain\\ea6acea5-df7f-4226-b625-3b914909d16b\\thales_hsm_security_professional_1776995180879.png';
const outputPath = 'd:\\duanwebsite\\public\\images\\posts\\thales-hsm-security.jpg';

async function convert() {
  try {
    await sharp(inputPath)
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 95, chromaSubsampling: '4:4:4' }) // High quality JPG
      .toFile(outputPath);
    console.log('Successfully converted and saved as high-quality JPEG.');
  } catch (err) {
    console.error('Error during conversion:', err);
  }
}

convert();
