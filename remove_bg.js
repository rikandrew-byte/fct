const sharp = require('sharp');

async function processImage() {
  try {
    const input = 'C:/Users/rik_7/.gemini/antigravity/brain/3f8aefd9-56ea-4780-a7bf-9a1b2fb4b7ad/.user_uploaded/media_1789894925304.jpg';
    
    const { data, info } = await sharp(input)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      
      const dist = Math.sqrt(
        Math.pow(255 - r, 2) + 
        Math.pow(255 - g, 2) + 
        Math.pow(255 - b, 2)
      );

      // Threshholds tweaked for better anti-aliasing
      if (dist < 20) {
        data[i+3] = 0; // Fully transparent
      } else if (dist < 100) {
        // Smooth transition for edges
        const alpha = Math.floor(((dist - 20) / 80) * 255);
        data[i+3] = alpha;
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile('d:/duanwebsite/public/logo.png');
    
    console.log('Background removed successfully!');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

processImage();
