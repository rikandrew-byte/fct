const txt = require('fs').readFileSync('C:/Users/rik_7/.gemini/antigravity/brain/3f8aefd9-56ea-4780-a7bf-9a1b2fb4b7ad/.system_generated/steps/253/content.md','utf8');
const blueClass = [...new Set((txt.match(/(?:bg|text|border|shadow|ring|from|to|via)-blue-\d+/g)||[]))];
const blueRgba = [...new Set((txt.match(/rgba\(59,130,246[^)]*\)|#3b82f6|#2563eb/gi)||[]))];
console.log('Blue Tailwind classes still live:', blueClass);
console.log('Blue hex/rgba still live:', blueRgba);
