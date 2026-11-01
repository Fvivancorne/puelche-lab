const fs = require('fs');
const path = require('path');
const https = require('https');

const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const OUT_DIR = path.join(__dirname, '../public/images/real/facebook');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('Connecting to AdsPower CDP for Facebook extraction...');
  const ws = new WebSocket(WS_URL);

  let messageId = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = messageId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const { resolve } = pending.get(data.id);
      pending.delete(data.id);
      resolve(data.result);
    }
  };

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  console.log('Connected! Scrolling feed...');
  for (let i = 0; i < 4; i++) {
    await send('Runtime.evaluate', { expression: 'window.scrollBy(0, 1500);' });
    await sleep(2000);
  }

  console.log('Extracting post images and text...');
  const evalResult = await send('Runtime.evaluate', {
    expression: `(() => {
      // Find all articles or feed items
      const articles = Array.from(document.querySelectorAll('div[role="feed"] > div, div[role="article"]'));
      const items = [];

      // Collect all images larger than 100px that are content
      const imgs = Array.from(document.querySelectorAll('img[src*="scontent"], img[src*="fbcdn"]'))
        .filter(img => {
          const w = img.naturalWidth || img.width || 0;
          const h = img.naturalHeight || img.height || 0;
          return w > 200 || h > 200 || img.src.includes('dst-jpg') || img.src.includes('p720x720') || img.src.includes('s552x414');
        });

      const seen = new Set();
      const unique = [];
      for (const img of imgs) {
        if (!seen.has(img.src) && !img.src.includes('rsrc.php')) {
          seen.add(img.src);
          // Try to clean up URL to get max resolution (remove crop parameters if present)
          let highRes = img.src;
          unique.push({
            src: highRes,
            alt: img.alt || ''
          });
        }
      }

      return JSON.stringify({
        total: unique.length,
        images: unique.slice(0, 24)
      });
    })()`
  });

  const parsed = JSON.parse(evalResult.result.value);
  console.log('Found ' + parsed.total + ' images!');

  const downloaded = [];
  for (let i = 0; i < parsed.images.length; i++) {
    const item = parsed.images[i];
    const filename = 'fb-asset-' + (i + 1) + '.webp';
    const dest = path.join(OUT_DIR, filename);

    console.log(`[${i+1}/${parsed.images.length}] Downloading ${filename}...`);
    try {
      await downloadImage(item.src, dest);
      console.log(`  ✓ Saved ${filename} (${fs.statSync(dest).size} bytes)`);
      downloaded.push({
        id: 'fb-' + (i + 1),
        filename,
        path: '/images/real/facebook/' + filename,
        alt: item.alt
      });
    } catch(err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }

  console.log(`Successfully downloaded ${downloaded.length} assets!`);
  ws.close();
}

main().catch(console.error);
