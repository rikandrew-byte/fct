const fs = require('fs'), path = require('path');
const ROOT = 'd:/duanwebsite/src';
const results = [];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { walk(full); continue; }
    if (!/\.(tsx|ts|css|js|jsx)$/.test(e.name)) continue;

    // Read raw buffer - avoids BOM / encoding issues
    const buf = fs.readFileSync(full);
    let txt = buf.toString('utf8');
    const orig = txt;

    // 1. Tailwind class replacements
    txt = txt.replace(/\bblue-/g, 'cyan-');

    // 2. Hardcoded hex & rgba replacements
    txt = txt.replace(/rgba\(59,\s*130,\s*246/g,  'rgba(6,182,212');   // blue-500 -> cyan-500
    txt = txt.replace(/rgba\(37,\s*99,\s*235/g,   'rgba(8,145,178');   // blue-600 -> cyan-600
    txt = txt.replace(/rgba\(29,\s*78,\s*216/g,   'rgba(14,116,144'); // blue-700 -> cyan-700
    txt = txt.replace(/rgba\(96,\s*165,\s*250/g,  'rgba(34,211,238'); // blue-400 -> cyan-400
    txt = txt.replace(/#3b82f6/gi, '#06b6d4');  // blue-500
    txt = txt.replace(/#2563eb/gi, '#0891b2');  // blue-600
    txt = txt.replace(/#1d4ed8/gi, '#0e7490');  // blue-700
    txt = txt.replace(/#60a5fa/gi, '#22d3ee');  // blue-400
    txt = txt.replace(/#93c5fd/gi, '#67e8f9');  // blue-300
    txt = txt.replace(/#bfdbfe/gi, '#a5f3fc');  // blue-200
    txt = txt.replace(/#dbeafe/gi, '#cffafe');  // blue-100
    txt = txt.replace(/#eff6ff/gi, '#ecfeff');  // blue-50

    if (txt !== orig) {
      fs.writeFileSync(full, Buffer.from(txt, 'utf8'));
      const rel = path.relative('d:/duanwebsite', full);
      const blueLeft = (txt.match(/blue-/g) || []).length;
      console.log(`Updated: ${rel}  (remaining blue-: ${blueLeft})`);
      results.push(rel);
    }
  }
}

walk(ROOT);
console.log('\nTotal files changed:', results.length);
