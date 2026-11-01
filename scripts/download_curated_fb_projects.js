const fs = require('fs');
const path = require('path');

const WebSocket = globalThis.WebSocket;
const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const OUT_DIR = path.join(__dirname, '../public/images/real/facebook');

const ASSETS_TO_DOWNLOAD = [
  // Hotel Arrebol
  {
    name: 'fb-arrebol-1.webp',
    url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/493894807_991182466528461_6174069315548336433_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960'
  },
  {
    name: 'fb-arrebol-2.webp',
    url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/494677461_991182476528460_2172283793827820501_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960'
  },
  {
    name: 'fb-arrebol-3.webp',
    url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/493278281_991182473195127_1653179971129952180_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960'
  },
  // El Reparabrisas
  {
    name: 'fb-reparabrisas-1.webp',
    url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.75761-15/500601327_18405923203108121_6033486866404934395_n.webp?stp=dst-jpg_tt6&cstp=mx1440x1800&ctp=p960x960'
  },
  {
    name: 'fb-reparabrisas-2.webp',
    url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.75761-15/501164212_18405923194108121_8439272729044000578_n.webp?stp=dst-jpg_tt6&cstp=mx1440x1800&ctp=p960x960'
  },
  {
    name: 'fb-reparabrisas-3.webp',
    url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.75761-15/500717806_18405923212108121_8670574369065849486_n.webp?stp=dst-jpg_tt6&cstp=mx1440x1800&ctp=p960x960'
  },
  // Chiloé Wine Fest
  {
    name: 'fb-winefest-1.webp',
    url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/491292745_986203117026396_182515239995944232_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960'
  },
  {
    name: 'fb-winefest-2.webp',
    url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/491300373_986203127026395_7406626999419474114_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960'
  },
  // Hotel Agua Nativa
  {
    name: 'fb-aguanativa-1.webp',
    url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.82787-15/581425141_18430232590108121_801742595919820664_n.webp?stp=dst-jpg_tt6&cstp=mx1440x960'
  },
  {
    name: 'fb-aguanativa-2.webp',
    url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.82787-15/582835368_18430232599108121_4602436299815298353_n.webp?stp=dst-jpg_tt6&cstp=mx1440x960'
  }
];

async function main() {
  console.log('Connecting to AdsPower CDP for curated asset download...');
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

  console.log(`Starting in-browser fetch for ${ASSETS_TO_DOWNLOAD.length} curated assets...`);
  for (let i = 0; i < ASSETS_TO_DOWNLOAD.length; i++) {
    const item = ASSETS_TO_DOWNLOAD[i];
    const dest = path.join(OUT_DIR, item.name);
    console.log(`[${i + 1}/${ASSETS_TO_DOWNLOAD.length}] Fetching ${item.name}...`);

    try {
      const fetchResult = await send('Runtime.evaluate', {
        expression: `(async () => {
          try {
            const res = await fetch(${JSON.stringify(item.url)});
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
          console.log(`  ✓ Saved ${item.name} (${buf.length} bytes)`);
        }
      } else {
        console.error(`  ✗ Error on ${item.name}:`, resVal?.error || 'Unknown error');
      }
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }

  console.log('Finished curated asset download!');
  ws.close();
}

main().catch(console.error);
