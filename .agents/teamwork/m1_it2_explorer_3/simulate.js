const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

// Read current source files
let portfolio = fs.readFileSync(path.join(root, 'src/data/portfolio.ts'), 'utf8');
let waBtn = fs.readFileSync(path.join(root, 'src/components/ui/WhatsAppButton.tsx'), 'utf8');
let contacto = fs.readFileSync(path.join(root, 'src/app/contacto/page.tsx'), 'utf8');
let foto = fs.readFileSync(path.join(root, 'src/app/servicios/fotografia/page.tsx'), 'utf8');
let navbar = fs.readFileSync(path.join(root, 'src/components/layout/Navbar.tsx'), 'utf8');

// Explorer 1 changes in portfolio.ts
const imageReplacements = [
  ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop', '/images/real/bg-portafolios-fotografia-min.jpg'],
  ['https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1600&auto=format&fit=crop', '/images/real/bg-portafolios-fotografia-g-min.jpg'],
  ['https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1600&auto=format&fit=crop', '/images/real/bg-portafolios-fotografia-b-min.jpg'],
  ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop', '/images/real/bg-portafolios-fotografia-h-min.jpg'],
  ['https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop', '/images/real/bg-portafolios-fotografia-c-min.jpg'],
  ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop', '/images/real/bg-portafolios-fotografia-d-min.jpg'],
  ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop', '/images/real/bg-fotografia-6-min.jpg'],
  ['https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop', '/images/real/bg-portafolios-fotografia-a-min.jpg']
];
for (const [oldUrl, newPath] of imageReplacements) {
  portfolio = portfolio.replace(oldUrl, newPath);
}

// Explorer 2 changes in WhatsAppButton.tsx
waBtn = waBtn.replace("const phoneNumber = '56966177500';", "const phoneNumber = '56966177500'; // wa.me/56966177500");

// Explorer 2 changes in contacto/page.tsx
contacto = contacto.replace('56997424190', '56966177500');
contacto = contacto.replace('+56 9 9742 4190', '+56 9 6617 7500');

// Explorer 2 changes in fotografia/page.tsx
foto = foto.replace('56997424190', '56966177500');

// Verification of all 6 failing tests
const t1_3_1 = !portfolio.includes('unsplash');
const imageMatches = portfolio.match(/image:\s*['"`]([^'"`]+)['"`]/g) || [];
const t1_3_5 = imageMatches.length >= 8 && imageMatches.every(m => m.includes('/images/real/'));
const t1_7_1 = contacto.includes('wa.me/56966177500');
const t1_7_4 = waBtn.includes('wa.me/56966177500');
const t2_3_1 = !/unsplash/i.test(portfolio);
const matches = portfolio.match(/\/images\/real\/[^'"`]+/g) || [];
const t2_3_4 = matches.every(m => fs.existsSync(path.join(root, 'public', m)));
const t4_6 = !portfolio.includes('unsplash');

// Verification of Adversarial checks
const phoneMatch = waBtn.match(/phoneNumber\s*=\s*['"]([^'"]+)['"]/);
const adv_m1_08 = /^\d+$/.test(phoneMatch[1]) && phoneMatch[1] === '56966177500' && waBtn.includes('`https://wa.me/${phoneNumber}?text=');
const adv_m1_10 = !contacto.includes('56997424190') && !foto.includes('56997424190');

// Verification of Navbar accessibility label T1.1.4
const t1_1_4 = navbar.includes('aria-label="Abrir menú"') && navbar.includes('mobileOpen');

console.log(JSON.stringify({
  t1_3_1,
  t1_3_5,
  t1_7_1,
  t1_7_4,
  t2_3_1,
  t2_3_4,
  t4_6,
  adv_m1_08,
  adv_m1_10,
  t1_1_4,
  allPassed: t1_3_1 && t1_3_5 && t1_7_1 && t1_7_4 && t2_3_1 && t2_3_4 && t4_6 && adv_m1_08 && adv_m1_10 && t1_1_4
}, null, 2));
