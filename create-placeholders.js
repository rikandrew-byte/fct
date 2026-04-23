const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const postsDir = path.join(__dirname, 'public', 'images', 'posts');

const imagesToCreate = [
  {
    id: 'guardsquare-shield',
    title: 'Guardsquare\nMobile App Security',
    subtitle: 'Lớp Giáp Cuối Cùng Bảo Vệ Tài Sản',
    colors: ['#0f172a', '#1e3a8a'] // Dark blue
  },
  {
    id: 'mobile-security-challenges',
    title: '4 Thách Thức',
    subtitle: 'Trong Bảo Mật Thiết Bị Di Động',
    colors: ['#171717', '#991b1b'] // Dark red
  },
  {
    id: 'mobile-security-management',
    title: 'Quản Trị Bảo Mật',
    subtitle: 'Thiết Bị Di Động Kỷ Nguyên Số',
    colors: ['#064e3b', '#0f172a'] // Emerald to Slate
  },
  {
    id: 'security-awareness',
    title: 'Nâng Cao Nhận Thức',
    subtitle: 'Bảo Mật Thiết Bị Di Động',
    colors: ['#312e81', '#4c1d95'] // Indigo to Violet
  },
  {
    id: 'malware-threats',
    title: 'Nguy Cơ Mã Độc',
    subtitle: 'Phá Hủy Bảo Mật Di Động',
    colors: ['#450a0a', '#000000'] // Dark maroon
  },
  {
    id: 'attack-vectors',
    title: '3 Hình Thức',
    subtitle: 'Tấn Công Lớp Bảo Mật Di Động',
    colors: ['#0f172a', '#0891b2'] // Slate to Cyan
  }
];

async function generateSvgImage(item) {
  const width = 1200;
  const height = 630;
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${item.colors[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${item.colors[1]};stop-opacity:1" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#grad${item.id})" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      <!-- Abstract shapes -->
      <circle cx="1000" cy="100" r="300" fill="white" opacity="0.03" />
      <circle cx="150" cy="500" r="200" fill="white" opacity="0.02" />
      <path d="M0,300 Q600,100 1200,400" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" />
      <path d="M0,350 Q600,150 1200,450" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />

      <!-- Text Container -->
      <g transform="translate(600, 280)" text-anchor="middle">
        <rect x="-40" y="-80" width="80" height="4" fill="#3b82f6" rx="2" />
        
        <text x="0" y="0" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="64" fill="#ffffff" letter-spacing="2">
          ${item.title.split('\n').map((line, i) => `<tspan x="0" dy="${i === 0 ? 0 : 80}">${line}</tspan>`).join('')}
        </text>
        
        <text x="0" y="${item.title.includes('\n') ? 140 : 80}" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="#94a3b8" font-weight="normal" letter-spacing="1">
          ${item.subtitle}
        </text>
      </g>
      
      <!-- Footer Branding -->
      <g transform="translate(600, 580)" text-anchor="middle">
        <text font-family="Arial, Helvetica, sans-serif" font-size="20" fill="rgba(255,255,255,0.4)" font-weight="bold" letter-spacing="4">
          FCT VINH THINH SECURITY SOLUTIONS
        </text>
      </g>
    </svg>
  `;

  const outputPath = path.join(postsDir, `${item.id}.webp`);
  
  await sharp(Buffer.from(svg))
    .webp({ quality: 90 })
    .toFile(outputPath);
    
  console.log(`✓ Created: ${item.id}.webp`);
}

async function main() {
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  console.log('Generating high-quality typographic placeholders...');
  for (const item of imagesToCreate) {
    try {
      await generateSvgImage(item);
    } catch (err) {
      console.error(`✗ Failed to create ${item.id}:`, err);
    }
  }
  console.log('Done!');
}

main();
