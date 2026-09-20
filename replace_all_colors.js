const fs = require('fs');
const path = require('path');

let count = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(tsx|ts|css|js|jsx)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf8');
      const updated = content.replace(/blue-/g, 'cyan-');
      if (content !== updated) {
        fs.writeFileSync(full, updated, 'utf8');
        console.log('Updated:', full);
        count++;
      }
    }
  }
}

walk(path.join('d:', 'duanwebsite', 'src'));
console.log(`\nTotal files updated: ${count}`);
