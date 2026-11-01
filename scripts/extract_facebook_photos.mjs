// Script to connect to AdsPower CDP, scroll through Facebook photos, collect all image URLs and download them
import fs from 'fs';
import path from 'path';

const wsUrl = "ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C";
const ws = new WebSocket(wsUrl);

let msgId = 1;
function sendCommand(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    const handler = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      } catch (err) {
        reject(err);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function evaluate(expression) {
  return sendCommand('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  }).then(r => r.result?.value);
}

ws.onopen = async () => {
  console.log('Connected to AdsPower CDP!');
  try {
    // Collect images across multiple scrolls
    const collected = new Map();

    for (let scroll = 0; scroll < 35; scroll++) {
      const data = await evaluate(`(() => {
        window.scrollBy(0, 1500);
        const imgs = Array.from(document.querySelectorAll("img"))
          .filter(img => img.src && (img.src.includes("scontent") || img.src.includes("fbcdn")))
          .map(img => ({
            src: img.src,
            alt: img.alt || '',
            w: img.naturalWidth,
            h: img.naturalHeight
          }));
        return { imgs, scrollY: window.scrollY, bodyHeight: document.body.scrollHeight };
      })()`);

      if (data && data.imgs) {
        for (const img of data.imgs) {
          if (img.w > 80 && !collected.has(img.src)) {
            collected.set(img.src, img);
          }
        }
      }
      console.log(`Scroll ${scroll + 1}: Total collected so far: ${collected.size} images (scrollY: ${data?.scrollY}/${data?.bodyHeight})`);
      await new Promise(r => setTimeout(r, 1200));
    }

    console.log(`\nFinal unique images found: ${collected.size}`);
    const results = Array.from(collected.values());

    const outDir = path.resolve('./public/images/real/facebook/all_extracted');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(outDir, 'manifest.json'),
      JSON.stringify(results, null, 2)
    );
    console.log(`Saved manifest to ${path.join(outDir, 'manifest.json')}`);

  } catch (err) {
    console.error('Error during extraction:', err);
  } finally {
    ws.close();
  }
};

ws.onerror = (err) => {
  console.error('WebSocket Error:', err);
};
