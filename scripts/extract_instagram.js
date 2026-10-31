const fs = require('fs');
const path = require('path');
const https = require('https');

const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const OUT_DIR = path.join(__dirname, '../public/images/real/instagram');

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
  console.log('Connecting to AdsPower CDP...');
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

  console.log('Connected! Scrolling to load posts...');

  // Scroll down a bit to fetch ~16 posts
  for (let i = 0; i < 3; i++) {
    await send('Runtime.evaluate', {
      expression: 'window.scrollBy(0, 1000);'
    });
    await sleep(1500);
  }

  console.log('Extracting post DOM nodes...');
  const evalResult = await send('Runtime.evaluate', {
    expression: `(() => {
      const links = Array.from(document.querySelectorAll('a[href*="/p/"]'));
      const seen = new Set();
      const results = [];

      for (const a of links) {
        const href = a.href;
        if (seen.has(href)) continue;
        seen.add(href);

        const img = a.querySelector('img');
        if (!img || !img.src) continue;

        // Extract shortcode
        const match = href.match(/\\/p\\/([^\\/]+)/);
        const shortcode = match ? match[1] : ('post_' + results.length);

        results.push({
          shortcode,
          url: href,
          src: img.src,
          alt: img.alt || ''
        });
      }
      return JSON.stringify(results);
    })()`
  });

  const posts = JSON.parse(evalResult.result.value);
  console.log(`Found ${posts.length} posts! Taking top 16...`);
  const topPosts = posts.slice(0, 16);

  const downloadedData = [];

  for (let i = 0; i < topPosts.length; i++) {
    const post = topPosts[i];
    const filename = `ig-${post.shortcode}.webp`;
    const localPath = path.join(OUT_DIR, filename);
    const publicPath = `/images/real/instagram/${filename}`;

    console.log(`[${i+1}/${topPosts.length}] Downloading: ${post.shortcode}...`);
    try {
      await downloadImage(post.src, localPath);
      console.log(`  ✓ Saved ${filename} (${fs.statSync(localPath).size} bytes)`);

      // Determine category based on alt text
      let category = 'Fotografía';
      const altLower = post.alt.toLowerCase();
      if (altLower.includes('drone') || altLower.includes('aéreo') || altLower.includes('alturas')) {
        category = 'Drone & Aéreo';
      } else if (altLower.includes('interiores') || altLower.includes('inmobiliari') || altLower.includes('arquitectura') || altLower.includes('hotel')) {
        category = 'Interiores & Arquitectura';
      } else if (altLower.includes('industria') || altLower.includes('faena') || altLower.includes('robótica') || altLower.includes('proceso') || altLower.includes('steel')) {
        category = 'Industrial & Faena';
      } else if (altLower.includes('marca') || altLower.includes('logo') || altLower.includes('identidad')) {
        category = 'Branding & Marca';
      } else if (altLower.includes('arte') || altLower.includes('expo') || altLower.includes('galería') || altLower.includes('autor')) {
        category = 'Fotografía de Autor';
      }

      // Extract a clean title from the first sentence or heading
      const firstLine = post.alt.split('\n')[0].trim().replace(/[#\.\-_]/g, ' ').trim() || 'Producción Visual Puelche Lab';
      const title = firstLine.length > 50 ? firstLine.substring(0, 47) + '...' : firstLine;

      downloadedData.push({
        id: post.shortcode,
        shortcode: post.shortcode,
        title: title || 'Registro Visual Austral',
        category,
        caption: post.alt.replace(/\n\n+/g, '\n').trim(),
        image: publicPath,
        instagramUrl: post.url,
      });
    } catch (err) {
      console.error(`  ✗ Error downloading ${post.shortcode}:`, err.message);
    }
  }

  // Write TypeScript data module
  const tsContent = `// Auténticos Casos y Fotografía de Instagram extraídos de @puelche_lab
export interface InstagramPost {
  id: string;
  shortcode: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  instagramUrl: string;
}

export const INSTAGRAM_POSTS: InstagramPost[] = ${JSON.stringify(downloadedData, null, 2)};
`;

  const tsPath = path.join(__dirname, '../src/data/instagram.ts');
  fs.writeFileSync(tsPath, tsContent);
  console.log(`\n✓ Generated ${tsPath} with ${downloadedData.length} authentic posts!`);

  ws.close();
}

main().catch(console.error);
