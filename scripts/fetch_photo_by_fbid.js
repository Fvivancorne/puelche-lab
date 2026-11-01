const fs = require('fs');
const path = require('path');

const WebSocket = globalThis.WebSocket;
const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const OUT_DIR = path.join(__dirname, '../public/images/real/facebook');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
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

  const photos = [
    // El Reparabrisas
    { fbid: '1009135441399830', name: 'fb-reparabrisas-hero.webp' },
    { fbid: '1009135431399831', name: 'fb-reparabrisas-logo.webp' },
    // Hotel Arrebol
    { fbid: '991182466528461', name: 'fb-arrebol-logo.webp' },
    { fbid: '991182476528460', name: 'fb-arrebol-signage.webp' }
  ];

  for (const item of photos) {
    console.log(`Navigating to photo ${item.fbid}...`);
    await send('Page.navigate', { url: `https://www.facebook.com/photo/?fbid=${item.fbid}` });
    await sleep(3500);

    const evalResult = await send('Runtime.evaluate', {
      expression: `(async () => {
        // Look for the main photo image
        const img = document.querySelector('img[data-visualcompletion="media-vc-image"]') ||
                    Array.from(document.querySelectorAll('img[src*="scontent"]')).find(i => i.naturalWidth > 500);
        if (!img) return { error: 'No main image found' };
        
        try {
          const res = await fetch(img.src);
          if (!res.ok) return { error: 'HTTP ' + res.status };
          const blob = await res.blob();
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({
              base64: reader.result,
              w: img.naturalWidth,
              h: img.naturalHeight,
              src: img.src
            });
            reader.readAsDataURL(blob);
          });
        } catch(err) {
          return { error: err.message };
        }
      })()`,
      awaitPromise: true,
      returnByValue: true
    });

    const resVal = evalResult.result.value;
    if (resVal && resVal.base64) {
      const matches = resVal.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches[2]) {
        const buf = Buffer.from(matches[2], 'base64');
        const dest = path.join(OUT_DIR, item.name);
        fs.writeFileSync(dest, buf);
        console.log(`  ✓ Saved ${item.name} (${resVal.w}x${resVal.h}, ${buf.length} bytes)`);
      }
    } else {
      console.error(`  ✗ Error on ${item.name}:`, resVal?.error);
    }
  }

  // Navigate back to the Facebook profile
  console.log('Navigating back to Puelche Lab Facebook page...');
  await send('Page.navigate', { url: 'https://www.facebook.com/PuelcheLabPublicidad/' });
  await sleep(2000);

  ws.close();
}

main().catch(console.error);
