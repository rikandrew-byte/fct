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
      
      const result = content.replace(/blue-/g, 'cyan-');
      
      if (content !== result) {
        fs.writeFileSync(fullPath, result, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceInFiles('d:/duanwebsite/src', 'blue-', 'cyan-');
console.log('Done (all blue- replaced)!');
