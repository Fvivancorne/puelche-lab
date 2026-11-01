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

  const photo = { fbid: '1216035944016111', name: 'fb-arrebol-hero.webp' };
  console.log(`Navigating to photo ${photo.fbid}...`);
  await send('Page.navigate', { url: `https://www.facebook.com/photo/?fbid=${photo.fbid}` });
  await sleep(4000);

  const evalResult = await send('Runtime.evaluate', {
    expression: `(async () => {
      // Find all image candidates in viewer
      const imgs = Array.from(document.querySelectorAll('img[src*="scontent"], img[src*="fbcdn"]'))
        .filter(i => (i.naturalWidth > 400 || i.width > 400));
        
      if (!imgs.length) return { error: 'No image > 400px found' };
      // Sort by size descending
      imgs.sort((a, b) => (b.naturalWidth * b.naturalHeight) - (a.naturalWidth * a.naturalHeight));
      const img = imgs[0];
      
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
      const dest = path.join(OUT_DIR, photo.name);
      fs.writeFileSync(dest, buf);
      console.log(`  ✓ Saved ${photo.name} (${resVal.w}x${resVal.h}, ${buf.length} bytes)`);
    }
  } else {
    console.error(`  ✗ Error:`, resVal?.error);
  }

  // Navigate back to the Facebook profile
  console.log('Navigating back to Puelche Lab Facebook page...');
  await send('Page.navigate', { url: 'https://www.facebook.com/PuelcheLabPublicidad/' });
  await sleep(2000);

  ws.close();
}

main().catch(console.error);
