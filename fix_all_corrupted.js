const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SAFE_COMMIT = '19bf421';
const ROOT = 'd:/duanwebsite';

// Get ALL src files changed since safe commit
const changedFiles = execSync(`git diff --name-only ${SAFE_COMMIT} HEAD`, { cwd: ROOT })
  .toString().trim().split('\n')
  .filter(f => f.startsWith('src/') && (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css')));

console.log(`Checking ${changedFiles.length} changed files...\n`);

let fixed = 0;

for (const f of changedFiles) {
  try {
    const fullPath = path.join(ROOT, f);
    const current = fs.readFileSync(fullPath, 'utf8');
    
    // Detect corruption: garbled chars (CJK range U+4E00-U+9FFF in non-comment lines)
    const hasCJK = /[\u4e00-\u9fff]/.test(current);
    // Also detect: lines ending with ? before closing punctuation (broken string)
    const hasBrokenString = /["'][^"'\n]*\?[,;}\)\n]/.test(current);
    
    if (hasCJK || hasBrokenString) {
      console.log(`CORRUPTED: ${f}`);
      
      // Restore from safe commit
      const original = execSync(`git show ${SAFE_COMMIT}:${f}`, { cwd: ROOT });
      let content = original.toString('utf8');
      
      // Re-apply color replacements
      content = content.replace(/\bblue-/g, 'cyan-');
      content = content.replace(/rgba\(59,\s*130,\s*246/g, 'rgba(6,182,212');
      content = content.replace(/rgba\(37,\s*99,\s*235/g,  'rgba(8,145,178');
      content = content.replace(/rgba\(29,\s*78,\s*216/g,  'rgba(14,116,144');
      content = content.replace(/rgba\(96,\s*165,\s*250/g, 'rgba(34,211,238');
      content = content.replace(/#3b82f6/gi, '#06b6d4');
      content = content.replace(/#2563eb/gi, '#0891b2');
      content = content.replace(/#1d4ed8/gi, '#0e7490');
      content = content.replace(/#60a5fa/gi, '#22d3ee');
      content = content.replace(/#93c5fd/gi, '#67e8f9');
      content = content.replace(/#bfdbfe/gi, '#a5f3fc');
      content = content.replace(/#dbeafe/gi, '#cffafe');
      content = content.replace(/#eff6ff/gi, '#ecfeff');
      
      fs.writeFileSync(fullPath, content, { encoding: 'utf8' });
      console.log(`  ✓ Restored & recolored`);
      fixed++;
    }
  } catch(e) {
    console.log(`  ERR: ${f}: ${e.message}`);
  }
}

console.log(`\nDone. Fixed ${fixed} files.`);
