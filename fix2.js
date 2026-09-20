const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SAFE_COMMIT = '19bf421';
const ROOT = 'd:/duanwebsite';

const files = [
  'src/components/MobileNav.tsx',
  'src/components/ProjectsPageClient.tsx',
];

for (const f of files) {
  const original = execSync(`git show ${SAFE_COMMIT}:${f}`, { cwd: ROOT });
  let content = original.toString('utf8');

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

  fs.writeFileSync(path.join(ROOT, f), content, { encoding: 'utf8' });
  console.log('✓ Fixed:', f);
}
