const fs = require('fs');
const path = require('path');

const cleanJson = (filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Loại bỏ BOM nếu có
        const cleanContent = content.replace(/^\uFEFF/, '');
        const data = JSON.parse(cleanContent);
        
        if (Array.isArray(data)) {
            console.log(`File ${filePath} is a valid array with ${data.length} items.`);
            // Ghi lại tệp tin để đảm bảo định dạng sạch
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        } else {
            console.error(`File ${filePath} is NOT an array! Type: ${typeof data}`);
        }
    } catch (e) {
        console.error(`Error cleaning ${filePath}: ${e.message}`);
    }
};

const dataDir = path.join(__dirname, 'src', 'data');
cleanJson(path.join(dataDir, 'news_vi.json'));
cleanJson(path.join(dataDir, 'news_en.json'));
cleanJson(path.join(dataDir, 'projects_vi.json'));
cleanJson(path.join(dataDir, 'projects_en.json'));
