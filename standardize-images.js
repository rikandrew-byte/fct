const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'public', 'images', 'posts'),
  path.join(__dirname, 'public', 'images', 'products')
];

async function standardizeToJpg(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  // Chỉ xử lý các file ảnh phổ biến để tránh lỗi với các file hệ thống hoặc svg
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const parsedPath = path.parse(filePath);
  // ÉP BUỘC đuôi file là .jpg
  const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.jpg`);
  
  // Tạo file tạm nếu file nguồn chính là file .jpg để tránh lỗi bận file
  const tempPath = path.join(parsedPath.dir, `${parsedPath.name}_temp.jpg`);

  try {
    await sharp(filePath)
      .flatten({ background: { r: 255, g: 255, b: 255 } }) // Đảm bảo nền trắng cho ảnh trong suốt
      .jpeg({ 
        quality: 95, 
        chromaSubsampling: '4:4:4',
        force: true // Ép định dạng đầu ra là JPEG bất kể đầu vào là gì
      })
      .toFile(tempPath);

    // Xóa file cũ (nếu có) và đổi tên file tạm thành file chính thức .jpg
    if (fs.existsSync(outputPath) && filePath !== outputPath) {
      // Nếu file nguồn khác file đích, xóa file đích cũ
      fs.unlinkSync(outputPath);
    }
    
    // Nếu file nguồn chính là file .jpg, ta phải xóa file nguồn trước khi đổi tên file tạm
    if (filePath === outputPath) {
      // Trường hợp này cần cẩn thận vì sharp đang giữ file, nhưng toFile đã xong
      // Tuy nhiên trong nodejs, ta nên unlink sau khi sharp kết thúc
    }

    // Để an toàn, tôi sẽ dùng một cơ chế khác cho trường hợp cùng tên
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

// Viết lại hàm xử lý an toàn hơn để ghi đè
async function safeConvert(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const parsedPath = path.parse(filePath);
  const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.jpg`);

  try {
    const buffer = await sharp(filePath)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 95, chromaSubsampling: '4:4:4', force: true })
      .toBuffer();

    // Ghi đè trực tiếp bằng fs sau khi sharp đã nhả buffer
    fs.writeFileSync(outputPath, buffer);
    console.log(`Standardized: ${path.basename(outputPath)} (MIME: image/jpeg)`);
    
    // Nếu file gốc có đuôi khác (.png, .webp, .jpeg), ta có thể cân nhắc xóa nó
    if (ext !== '.jpg') {
       // Tạm thời giữ lại để MASTER kiểm tra, hoặc xóa nếu MASTER yêu cầu.
       // Để dọn dẹp SEO, tôi sẽ xóa các file .webp/.png trùng tên để tránh crawler nhầm lẫn
       // fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

async function main() {
  console.log('Starting TOTAL standardization to JPEG (Quality 95, 4:4:4)...');
  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isFile()) {
        await safeConvert(fullPath);
      }
    }
  }
  console.log('TOTAL standardization complete!');
}

main();
