const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SAFE_COMMIT = '19bf421'; // Before any color changes
const ROOT = 'd:/duanwebsite';

// Files confirmed corrupted
const corruptedFiles = [
  'src/components/AppShieldingFlow.tsx',
  'src/components/HsmArchitecture.tsx',
  'src/components/LongmaiAuthenticationFlow.tsx',
  'src/components/LongmaiSolutionBlock.tsx',
  'src/components/NewsSection.tsx',
  'src/components/Testimonials.tsx',
];

for (const f of corruptedFiles) {
  try {
    // Get the original file content from git at safe commit
    const original = execSync(`git show ${SAFE_COMMIT}:${f}`, { cwd: ROOT });
    
    // Apply blue->cyan color changes properly on the clean original
    let content = original.toString('utf8');
    
    // Tailwind class replacement
    content = content.replace(/\bblue-/g, 'cyan-');
    
    // Hardcoded hex/rgba
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
    
    // Write back with proper UTF-8 encoding (no BOM)
    fs.writeFileSync(path.join(ROOT, f), content, { encoding: 'utf8' });
    console.log('✓ Restored & updated:', f);
  } catch(e) {
    console.error('✗ Failed:', f, e.message);
  }
}

console.log('\nDone! All corrupted files restored from git and re-colored.');
