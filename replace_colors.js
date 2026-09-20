const fs = require('fs');
const path = require('path');

function replaceInFiles(dir, searchStr, replaceStr) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInFiles(fullPath, searchStr, replaceStr);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(searchStr)) {
        // Regex replace 'blue-' with 'cyan-'
        // Only replace if preceded by word boundary or some character that implies it's a tailwind class
        // e.g. text-blue-600, bg-blue-700, border-blue-500
        const result = content.replace(/(text|bg|border|shadow|ring|from|to|via)-blue-/g, '$1-cyan-');
        
        if (content !== result) {
          fs.writeFileSync(fullPath, result, 'utf8');
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

replaceInFiles('d:/duanwebsite/src', 'blue-', 'cyan-');
console.log('Done!');
