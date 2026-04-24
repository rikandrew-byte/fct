const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'logo.jpg');
const outputPath = path.join(__dirname, 'public', 'logo.png');

async function makeTransparent() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error('Không tìm thấy file logo.jpg');
      return;
    }

    // Tách nền trắng: Biến các pixel gần trắng thành trong suốt
    await sharp(inputPath)
      .ensureAlpha()
      .unflatten() // Đảm bảo có kênh alpha
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Nếu pixel gần trắng (R, G, B > 240) thì cho alpha = 0
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0;
          }
        }
        return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
          .png()
          .toFile(outputPath);
      });

    console.log('Đã tạo logo.png trong suốt thành công!');
  } catch (err) {
    console.error('Lỗi xử lý logo:', err);
  }
}

makeTransparent();
