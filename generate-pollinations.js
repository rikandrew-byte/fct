const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const postsDir = path.join(__dirname, 'public', 'images', 'posts');

const imagesToCreate = [
  {
    id: 'guardsquare-shield',
    prompt: 'A cinematic 3D render of a glowing futuristic energy shield protecting a modern smartphone. Code lines and digital data flowing in the background. Cyber security concept, app protection, dark background with vibrant blue and green neon accents, unreal engine 5, highly detailed, 8k resolution.'
  },
  {
    id: 'mobile-security-challenges',
    prompt: 'A futuristic conceptual illustration of four distinct glowing digital threats surrounding a smartphone. High-tech environment, dark background with glowing blue and orange elements, professional cybersecurity corporate style, cinematic lighting.'
  },
  {
    id: 'mobile-security-management',
    prompt: 'A sleek futuristic control panel hologram hovering above a smartphone, representing mobile device management and monitoring. Clean, professional UI elements, glowing blue and white holograms, dark corporate background, 3D rendering.'
  },
  {
    id: 'security-awareness',
    prompt: 'A conceptual illustration of human security awareness. A glowing digital brain connected to a smartphone, with a holographic shield icon. High-tech, clean digital art, cybersecurity training concept, dark blue and vibrant cyan colors.'
  },
  {
    id: 'malware-threats',
    prompt: 'A cinematic 3D image of a digital virus or malware threatening a mobile device. A smartphone surrounded by subtle digital glitch effects and floating red warning symbols, with a clean high-tech lock protecting it. Dark cinematic lighting, modern cybersecurity design.'
  },
  {
    id: 'attack-vectors',
    prompt: 'A conceptual high-tech 3D illustration showing three distinct glowing attack paths or laser vectors pointing towards a secured mobile phone. Cyber security concept, dark blue background, glowing red and neon blue lines, modern corporate style.'
  }
];

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch image: ${res.statusCode}`));
        return;
      }
      
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

async function generateWithPollinations(item) {
  console.log(`Generating AI image for ${item.id}...`);
  
  // URL encode the prompt
  const encodedPrompt = encodeURIComponent(item.prompt);
  // Add seed for randomness, set width/height
  const seed = Math.floor(Math.random() * 1000000);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&seed=${seed}&nologo=true`;
  
  try {
    const imageBuffer = await downloadImage(url);
    
    const outputPath = path.join(postsDir, `${item.id}.webp`);
    
    // Process with sharp to ensure it's a webp
    await sharp(imageBuffer)
      .resize(1200, 630, { fit: 'cover' })
      .webp({ quality: 90 })
      .toFile(outputPath);
      
    console.log(`✓ Successfully generated and saved: ${item.id}.webp`);
  } catch (err) {
    console.error(`✗ Failed to generate ${item.id}:`, err.message);
  }
}

async function main() {
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  console.log('Starting AI image generation via Pollinations.ai...');
  for (const item of imagesToCreate) {
    await generateWithPollinations(item);
    // Add a small delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  console.log('Finished generating AI images!');
}

main();
