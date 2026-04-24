const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'public', 'images', 'posts'),
  path.join(__dirname, 'public', 'images', 'products')
];

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const parsedPath = path.parse(filePath);
  const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.jpg`);

  try {
    // 1. Đọc toàn bộ file vào memory để không bị lock file nguồn
    const inputBuffer = fs.readFileSync(filePath);

    // 2. Xử lý bằng sharp từ buffer
    const outputBuffer = await sharp(inputBuffer)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ 
        quality: 95, 
        chromaSubsampling: '4:4:4', 
        force: true 
      })
      .toBuffer();

    // 3. Ghi ra file tạm trước
    const tempPath = outputPath + '.tmp';
    fs.writeFileSync(tempPath, outputBuffer);

    // 4. Đổi tên file tạm thành file chính (Windows safe move)
    if (fs.existsSync(outputPath)) {
        try {
            fs.unlinkSync(outputPath);
        } catch (e) {
            // Nếu không unlink được ngay (do lock), ta chờ 100ms
            await new Promise(r => setTimeout(r, 100));
            fs.unlinkSync(outputPath);
        }
    }
    fs.renameSync(tempPath, outputPath);

    console.log(`Successfully standardized: ${path.basename(outputPath)}`);
    
    // 5. Nếu file gốc không phải .jpg, ta xóa nó để dọn dẹp (giảm thiểu nhầm lẫn MIME)
    if (ext !== '.jpg' && ext !== '.jpeg') {
       // fs.unlinkSync(filePath); // Tùy chọn xóa file gốc
    }

  } catch (err) {
    console.error(`Failed to process ${path.basename(filePath)}:`, err.message);
  }
}

async function main() {
  console.log('Starting ROBUST standardization to JPEG (Quality 95, 4:4:4)...');
  
  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;
    console.log(`Processing directory: ${dir}`);
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isFile()) {
        await processFile(fullPath);
      }
    }
  }
  console.log('ROBUST standardization complete!');
}

main();
