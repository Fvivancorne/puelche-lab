const fs = require('fs');
const path = require('path');

const WebSocket = globalThis.WebSocket;
const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const OUT_DIR = path.join(__dirname, '../public/images/real/facebook');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('Connecting to AdsPower CDP to scroll and capture deeper posts...');
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

  // Scroll down 5 times to load older posts (Transforma, Reparabrisas, Arrebol)
  console.log('Scrolling down feed...');
  for (let s = 0; s < 6; s++) {
    await send('Runtime.evaluate', { expression: 'window.scrollBy(0, 2000);' });
    await sleep(2500);
    console.log(`  Scrolled ${s + 1}/6`);
  }

  console.log('Extracting all newly loaded high-res images...');
  const evalResult = await send('Runtime.evaluate', {
    expression: `(() => {
      const imgs = Array.from(document.querySelectorAll('img[src*="scontent"], img[src*="fbcdn"]'));
      const seen = new Set();
      const unique = [];
      for (const img of imgs) {
        if (!seen.has(img.src) && !img.src.includes('rsrc.php')) {
          seen.add(img.src);
          const w = img.naturalWidth || img.width || 0;
          const h = img.naturalHeight || img.height || 0;
          if (w >= 300 || h >= 300) {
            unique.push({
              src: img.src,
              w,
              h,
              alt: img.alt || ''
            });
          }
        }
      }
      return unique;
    })()`,
    returnByValue: true
  });

  const images = evalResult.result.value;
  console.log(`Found ${images.length} total high-resolution images after deep scrolling!`);

  let newCount = 0;
  for (let i = 0; i < images.length; i++) {
    const item = images[i];
    const filename = `fb-hires-${i + 1}.webp`;
    const dest = path.join(OUT_DIR, filename);

    // If file already exists and is > 20kb, skip
    if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
      continue;
    }

    newCount++;
    console.log(`[${i + 1}/${images.length}] Fetching in browser (${item.w}x${item.h}): ${filename}...`);
    try {
      const fetchResult = await send('Runtime.evaluate', {
        expression: `(async () => {
          try {
            const res = await fetch(${JSON.stringify(item.src)});
            if (!res.ok) return { error: 'HTTP ' + res.status };
            const blob = await res.blob();
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve({ base64: reader.result });
              reader.readAsDataURL(blob);
            });
          } catch(err) {
            return { error: err.message };
          }
        })()`,
        awaitPromise: true,
        returnByValue: true
      });

      const resVal = fetchResult.result.value;
      if (resVal && resVal.base64) {
        const matches = resVal.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches[2]) {
          const buf = Buffer.from(matches[2], 'base64');
          fs.writeFileSync(dest, buf);
          console.log(`  ✓ Saved ${filename} (${buf.length} bytes)`);
        }
      }
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }

  console.log(`Finished! Downloaded ${newCount} new assets! Total in DOM: ${images.length}`);
  ws.close();
}

main().catch(console.error);
