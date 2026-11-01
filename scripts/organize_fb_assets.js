const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/real/facebook');

const mappings = [
  ['fb-hires-20.webp', 'fb-transforma-1.webp'],
  ['fb-hires-21.webp', 'fb-transforma-2.webp'],
  ['fb-hires-23.webp', 'fb-transforma-3.webp'],
  ['fb-hires-15.webp', 'fb-nazca-1.webp'],
  ['fb-hires-16.webp', 'fb-nazca-2.webp'],
  ['fb-hires-19.webp', 'fb-nazca-3.webp'],
  ['fb-hires-25.webp', 'fb-cohosting-1.webp'],
  ['fb-hires-26.webp', 'fb-cohosting-2.webp'],
  ['fb-hires-10.webp', 'fb-parcelacion-1.webp'],
  ['fb-hires-11.webp', 'fb-parcelacion-2.webp'],
  ['fb-arrebol-arch.webp', 'fb-arrebol-1.webp'],
  ['fb-arrebol-tags.webp', 'fb-arrebol-2.webp'],
  ['fb-arrebol-logo.webp', 'fb-arrebol-3.webp'],
  ['fb-reparabrisas-mockup.webp', 'fb-reparabrisas-1.webp'],
  ['fb-reparabrisas-hero.webp', 'fb-reparabrisas-2.webp'],
  ['fb-reparabrisas-red.webp', 'fb-reparabrisas-3.webp']
];

for (const [srcName, destName] of mappings) {
  const src = path.join(dir, srcName);
  const dest = path.join(dir, destName);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${srcName} -> ${destName} (${fs.statSync(dest).size} bytes)`);
  } else {
    console.warn(`Source not found: ${srcName}`);
  }
}
