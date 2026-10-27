import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '../../..');

// Proposed changes simulation
let portfolio = fs.readFileSync(path.join(ROOT, 'src/data/portfolio.ts'), 'utf8');
let waBtn = fs.readFileSync(path.join(ROOT, 'src/components/ui/WhatsAppButton.tsx'), 'utf8');
let contacto = fs.readFileSync(path.join(ROOT, 'src/app/contacto/page.tsx'), 'utf8');
let foto = fs.readFileSync(path.join(ROOT, 'src/app/servicios/fotografia/page.tsx'), 'utf8');

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

waBtn = waBtn.replace("const phoneNumber = '56966177500';", "const phoneNumber = '56966177500'; // wa.me/56966177500");
contacto = contacto.replace('56997424190', '56966177500');
contacto = contacto.replace('+56 9 9742 4190', '+56 9 6617 7500');
foto = foto.replace('56997424190', '56966177500');

// Monkey patch fs.readFileSync for simulated files
const originalReadFileSync = fs.readFileSync;
(fs as any).readFileSync = function (filePath: any, options: any) {
  const norm = typeof filePath === 'string' ? filePath.replace(/\\/g, '/') : '';
  if (norm.endsWith('src/data/portfolio.ts')) return portfolio;
  if (norm.endsWith('src/components/ui/WhatsAppButton.tsx')) return waBtn;
  if (norm.endsWith('src/app/contacto/page.tsx')) return contacto;
  if (norm.endsWith('src/app/servicios/fotografia/page.tsx')) return foto;
  return originalReadFileSync.apply(this, arguments as any);
};

// Now dynamically import or run runner.ts
// We require runner.ts execution
console.log('--- RUNNING SIMULATED E2E RUNNER WITH EXPLORER 1 & 2 PROPOSALS ---');
require(path.join(ROOT, 'tests/e2e/runner.ts'));
