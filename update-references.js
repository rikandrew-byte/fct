const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/[lang]/layout.tsx',
  'src/app/[lang]/posts/[slug]/page.tsx',
  'src/app/[lang]/about/page.tsx',
  'src/app/[lang]/knowledge/page.tsx',
  'src/app/[lang]/products/page.tsx',
  'src/app/[lang]/projects/page.tsx',
  'src/app/[lang]/products/guardsquare/page.tsx',
  'src/app/[lang]/products/longmai/page.tsx',
  'src/app/[lang]/products/thales-sentinel/page.tsx',
  'src/data/news_vi.json',
  'src/data/news_en.json'
];

for (const relPath of filesToUpdate) {
  const fullPath = path.join(__dirname, relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace all image extensions to .jpg for meta and JSON
    content = content.replace(/og-image\.png/g, 'og-image.jpg');
    content = content.replace(/\.webp/g, '.jpg');
    // Ensure dexguard.png and others become jpg
    content = content.replace(/\/images\/products\/([a-zA-Z0-9_-]+)\.png/g, '/images/products/$1.jpg');
    
    // Fix layout.tsx which we just changed to .png
    content = content.replace(/images: \["https:\/\/fct\.vn\/og-image\.png"\]/g, 'images: ["https://fct.vn/og-image.jpg"]');
    content = content.replace(/url: "https:\/\/fct\.vn\/og-image\.png"/g, 'url: "https://fct.vn/og-image.jpg"');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated: ${relPath}`);
  }
}
