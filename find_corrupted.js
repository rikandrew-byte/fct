const fs = require('fs');
const path = require('path');

// Restore from git at the safe commit BEFORE color changes 
// and then re-apply color changes with proper UTF-8 handling

const { execSync } = require('child_process');

// Get list of all files changed since the safe commit (before color changes)
// The safe commit is 19bf421 (logo transparent - before color replace)
const safeCommit = '19bf421';

const changedFiles = execSync(`git diff --name-only ${safeCommit} HEAD`, { cwd: 'd:/duanwebsite' })
  .toString().trim().split('\n')
  .filter(f => f.startsWith('src/') && (f.endsWith('.tsx') || f.endsWith('.ts')));

console.log('Files changed since safe commit:', changedFiles.length);

let brokenCount = 0;

for (const f of changedFiles) {
  try {
    const fullPath = path.join('d:/duanwebsite', f);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check for signs of corruption: lines with ? before closing punctuation where a " should be
    const lines = content.split('\n');
    const brokenLines = lines.filter(l => {
      // Pattern: Vietnamese string that ends with ? instead of closing "
      return /["'][^"']*\?[,;}\)]\s*$/.test(l.trim()) && l.includes(':') ;
    });
    
    if (brokenLines.length > 0) {
      console.log('\nCORRUPTED:', f);
      brokenLines.slice(0, 5).forEach(l => console.log('  L:', l.trim().substring(0, 100)));
      brokenCount++;
    }
  } catch(e) {
    console.log('Error reading:', f, e.message);
  }
}

console.log('\nTotal corrupted files found:', brokenCount);
