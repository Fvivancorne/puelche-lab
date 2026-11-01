const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT_DIR = path.join(__dirname, '../public/images/real/facebook');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
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
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Timeout downloading ' + url));
    });
  });
}

const ASSETS = [
  // Hotel Boutique Arrebol Chiloé
  { name: 'fb-arrebol-1.jpg', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/493894807_991182466528461_6174069315548336433_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960' },
  { name: 'fb-arrebol-2.jpg', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/494677461_991182476528460_2172283793827820501_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960' },
  { name: 'fb-arrebol-3.jpg', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/493278281_991182473195127_1653179971129952180_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960' },
  { name: 'fb-arrebol-4.jpg', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/494594917_991182459861795_3120006869106369706_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960' },
  // Summit TRANSFORMA 2026
  { name: 'fb-transforma-1.webp', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.82787-15/628793062_18446646592108121_1584952508550325039_n.webp?stp=dst-jpg_tt6&cstp=mx1440x1920&ctp=p960x960' },
  { name: 'fb-transforma-2.webp', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.82787-15/627655707_18446646601108121_896177071299342758_n.webp?stp=dst-jpg_tt6&cstp=mx1440x1920&ctp=p960x960' },
  { name: 'fb-transforma-3.webp', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.82787-15/634583240_18446646610108121_2264956336209847574_n.webp?stp=dst-jpg_tt6&cstp=mx1440x1920&ctp=p960x960' },
  // El Reparabrisas Puerto Natales
  { name: 'fb-reparabrisas-1.webp', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.75761-15/500601327_18405923203108121_6033486866404934395_n.webp?stp=dst-jpg_tt6&cstp=mx1440x1800&ctp=p960x960' },
  { name: 'fb-reparabrisas-2.webp', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.75761-15/501164212_18405923194108121_8439272729044000578_n.webp?stp=dst-jpg_tt6&cstp=mx1440x1800&ctp=p960x960' },
  { name: 'fb-reparabrisas-3.webp', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.75761-15/500717806_18405923212108121_8670574369065849486_n.webp?stp=dst-jpg_tt6&cstp=mx1440x1800&ctp=p960x960' },
  // Nazca Robótica Submarina & Drone
  { name: 'fb-nazca-1.webp', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.82787-15/631806993_18447892861108121_2529486577707474455_n.webp?stp=dst-jpg_tt6&cstp=mx1213x809&ctp=s1213x809' },
  { name: 'fb-nazca-2.webp', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.82787-15/637693302_18447892858108121_7937906900318929178_n.webp?stp=dst-jpg_tt6&cstp=mx1440x809&ctp=p720x720' },
  { name: 'fb-nazca-3.webp', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.82787-15/629005154_18447892870108121_694381292727003870_n.webp?stp=dst-jpg_tt6&cstp=mx1440x809&ctp=p720x720' },
  { name: 'fb-nazca-4.webp', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t51.82787-15/633786903_18447892879108121_9001605636675355456_n.webp?stp=dst-jpg_tt6&cstp=mx1440x809&ctp=p720x720' },
  // Chiloé Wine Fest 2025
  { name: 'fb-winefest-1.jpg', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/491292745_986203117026396_182515239995944232_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960' },
  { name: 'fb-winefest-2.jpg', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/491300373_986203127026395_7406626999419474114_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=p960x960' },
  // Parcelaciones de Ríos (Drone)
  { name: 'fb-parcelacion-1.jpg', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/555468807_25295604080058090_3590091819806158097_n.jpg?stp=dst-jpg_tt6&cstp=mx960x539&ctp=p843x403' },
  { name: 'fb-parcelacion-2.jpg', url: 'https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/555498238_25295604183391413_4435924643682679592_n.jpg?stp=dst-jpg_tt6&cstp=mx960x539&ctp=p843x403' }
];

async function run() {
  console.log(`Starting download of ${ASSETS.length} master Facebook assets...`);
  for (let i = 0; i < ASSETS.length; i++) {
    const item = ASSETS[i];
    const dest = path.join(OUT_DIR, item.name);
    try {
      await downloadImage(item.url, dest);
      const size = fs.statSync(dest).size;
      console.log(`[${i+1}/${ASSETS.length}] Saved ${item.name} (${Math.round(size/1024)} KB)`);
    } catch (e) {
      console.error(`[${i+1}/${ASSETS.length}] Error on ${item.name}: ${e.message}`);
    }
  }
  console.log('Finished downloading master Facebook assets!');
}

run();
