const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

walk('src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.json')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    const original = content;
    
    // Replace /news/ with /posts/
    content = content.replace(/\/news\//g, '/posts/');
    
    // Replace /${lang}/news with /${lang}/posts
    // Note: In JS string, we need to be careful with ${}
    content = content.replace(/\/\$\{lang\}\/news/g, '/${lang}/posts');
    
    // Replace /vi/news with /vi/posts
    content = content.replace(/\/vi\/news/g, '/vi/posts');
    
    // Replace /en/news with /en/posts
    content = content.replace(/\/en\/news/g, '/en/posts');
    
    // Specific check for Footer/Navbar which might have /news without trailing slash
    content = content.replace(/href={`\/\${lang}\/news`}/g, 'href={`/${lang}/posts`}');
    content = content.replace(/href={`\/${lang}\/news`}/g, 'href={`/${lang}/posts`}');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
