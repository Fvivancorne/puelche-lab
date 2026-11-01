import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync('./public/images/real/facebook/all_extracted/manifest.json', 'utf8'));
const outDir = path.resolve('./public/images/real/facebook/gallery');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log(`Starting download of ${manifest.length} Facebook photos...`);

async function downloadImage(item, index) {
  const filename = `fb_photo_${String(index + 1).padStart(4, '0')}.jpg`;
  const filePath = path.join(outDir, filename);

  if (fs.existsSync(filePath)) {
    return { index, status: 'exists', filename };
  }

  try {
    const res = await fetch(item.src);
    if (!res.ok) {
      return { index, status: 'error', code: res.status };
    }
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
    return { index, status: 'ok', filename, size: arrayBuffer.byteLength };
  } catch (err) {
    return { index, status: 'fail', error: err.message };
  }
}

async function run() {
  const concurrency = 20;
  let completed = 0;
  const results = [];

  for (let i = 0; i < manifest.length; i += concurrency) {
    const batch = manifest.slice(i, i + concurrency);
    const promises = batch.map((item, bIdx) => downloadImage(item, i + bIdx));
    const batchRes = await Promise.all(promises);
    results.push(...batchRes);
    completed += batch.length;
    console.log(`Downloaded ${completed}/${manifest.length} photos...`);
  }

  const okCount = results.filter(r => r.status === 'ok' || r.status === 'exists').length;
  console.log(`Finished downloading! Success: ${okCount} / ${manifest.length}`);

  // Save metadata
  fs.writeFileSync(
    path.join(outDir, 'gallery_index.json'),
    JSON.stringify(manifest.map((m, idx) => ({
      file: `fb_photo_${String(idx + 1).padStart(4, '0')}.jpg`,
      alt: m.alt,
      width: m.w,
      height: m.h
    })), null, 2)
  );
}

run();
