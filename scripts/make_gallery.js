const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/real/facebook');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));

let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Puelche Facebook Assets Gallery</title>
<style>
  body { background: #111; color: #eee; font-family: sans-serif; padding: 20px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .card { background: #222; border-radius: 8px; overflow: hidden; padding: 8px; }
  img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; display: block; }
  .name { font-size: 13px; margin-top: 8px; font-weight: bold; color: #4dc; word-break: break-all; }
  .size { font-size: 11px; color: #888; }
</style>
</head>
<body>
<h1>Puelche Lab Facebook Assets (${files.length})</h1>
<div class="grid">
`;

for (const file of files) {
  const stat = fs.statSync(path.join(dir, file));
  html += `
  <div class="card">
    <img src="../public/images/real/facebook/${file}" alt="${file}" />
    <div class="name">${file}</div>
    <div class="size">${(stat.size / 1024).toFixed(1)} KB</div>
  </div>`;
}

html += `</div></body></html>`;

fs.writeFileSync(path.join(__dirname, 'gallery.html'), html);
console.log('Saved scripts/gallery.html with ' + files.length + ' assets!');
