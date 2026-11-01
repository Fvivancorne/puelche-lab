import fs from 'fs';
import path from 'path';

const ALBUMS = [
  { name: 'branding', url: 'https://web.facebook.com/media/set/?set=a.778207975557708&type=3' },
  { name: 'post_produccion', url: 'https://web.facebook.com/media/set/?set=a.778179508893888&type=3' },
  { name: 'diseno_editorial', url: 'https://web.facebook.com/media/set/?set=a.778173248894514&type=3' },
  { name: 'turistour', url: 'https://web.facebook.com/media/set/?set=a.910609628984208&type=3' },
  { name: 'carnaval_del_sur', url: 'https://web.facebook.com/media/set/?set=a.1075888345789668&type=3' },
  { name: 'pillan_aguas_azules', url: 'https://web.facebook.com/media/set/?set=a.973205169391320&type=3' },
  { name: 'art_and_deco', url: 'https://web.facebook.com/media/set/?set=a.778227682222404&type=3' },
  { name: 'polo_sur', url: 'https://web.facebook.com/media/set/?set=a.787388911306281&type=3' },
  { name: 'fotografia_producto', url: 'https://web.facebook.com/media/set/?set=a.1138204939558008&type=3' },
  { name: 'alimentos', url: 'https://web.facebook.com/media/set/?set=a.1138233539555148&type=3' },
];

const wsUrl = "ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C";
const ws = new WebSocket(wsUrl);

function sendCommand(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
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

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

ws.onopen = async () => {
  console.log('Connected to AdsPower CDP for Album Extraction...');

  for (const album of ALBUMS) {
    console.log(`\n========================================`);
    console.log(`Extracting Album: ${album.name.toUpperCase()} -> ${album.url}`);
    console.log(`========================================`);

    await sendCommand('Page.navigate', { url: album.url });
    await sleep(4000);

    const collected = new Map();

    for (let scroll = 0; scroll < 6; scroll++) {
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
        return { imgs };
      })()`);

      if (data && data.imgs) {
        for (const img of data.imgs) {
          if (img.w > 100 && !collected.has(img.src)) {
            collected.set(img.src, img);
          }
        }
      }
      await sleep(1000);
    }

    console.log(`Found ${collected.size} images in album ${album.name}`);

    const albumDir = path.resolve(`./public/images/real/facebook/albums/${album.name}`);
    if (!fs.existsSync(albumDir)) {
      fs.mkdirSync(albumDir, { recursive: true });
    }

    const items = Array.from(collected.values());
    let downloadedCount = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const filename = `${album.name}_${String(i + 1).padStart(3, '0')}.jpg`;
      const filePath = path.join(albumDir, filename);

      try {
        const res = await fetch(item.src);
        if (res.ok) {
          const buf = await res.arrayBuffer();
          fs.writeFileSync(filePath, Buffer.from(buf));
          downloadedCount++;
        }
      } catch (err) {
        console.error(`Failed ${filename}:`, err.message);
      }
    }

    console.log(`Successfully saved ${downloadedCount}/${items.length} images to ${albumDir}`);
  }

  console.log('\nALL ALBUMS DOWNLOADED SUCCESSFULLY!');
  ws.close();
};

ws.onerror = (err) => {
  console.error('WS Error:', err);
};
