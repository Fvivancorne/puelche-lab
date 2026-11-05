/**
 * Measure Content Height vs Viewport Height for Section 2 on Mobile, Tablet, Desktop
 */

import fs from 'fs';
import path from 'path';

const homeCode = fs.readFileSync(path.resolve(__dirname, '../src/app/page.tsx'), 'utf-8');

// Extract Section 2 content
const sec2Match = homeCode.match(/<section[\s\S]*?id="cross-media"[\s\S]*?<\/section>/);
if (!sec2Match) {
  console.error('Section 2 not found');
  process.exit(1);
}

const sec2 = sec2Match[0];

console.log('--- SECTION 2 CLASSES ---');
const classMatch = sec2.match(/className="([^"]+)"/);
console.log('Section 2 Classes:', classMatch ? classMatch[1] : 'none');

// Viewports:
// Mobile: 375px width x 667px height (iPhone SE)
// Tablet: 768px width x 1024px height (iPad)
// Desktop: 1440px width x 900px height (MacBook)

// Let's analyze text content lengths:
const paragraphs = [
  "Somos un Estudio de Diseño Cross Media y Fotografía en Puerto Varas.",
  "Pero, ¿Qué es Cross Media? Nos referimos a que hacemos piezas gráficas para todos los medios, ya sean digitales, impresos, y/o audiovisuales.",
  "Contamos con un estudio de fotografía y grabación muy bien equipado, tenemos iluminación profesional y equipos de alta gama, tanto para hacer trabajos en tierra o desde el aire, que junto con las habilidades técnicas de nuestro equipo hacemos resaltar tu producto o servicio, haciendo que pase al frente en la vitrina del mercado."
];

const totalChars = paragraphs.join(' ').length;
console.log(`Total characters in manifesto: ${totalChars}`);

// In 375px width, typical line width is ~30-35 characters.
const estMobileLines = paragraphs.reduce((acc, p) => acc + Math.ceil(p.length / 32), 0);
console.log(`Estimated lines on 375px mobile: ${estMobileLines}`);
const estMobileTextHeight = estMobileLines * 24; // 1.5rem line-height at 16px font-size
console.log(`Estimated paragraph text height on 375px: ${estMobileTextHeight}px`);

// Badges:
// On mobile (<md), grid-cols-1 -> 4 badges stacked vertically
// Each badge: py-3.5 (28px) + border (2px) + title text (24px) + subtitle text (16px) = ~70px
// 4 badges stacked = 280px + 3 gaps of 16px = 328px
const estBadgesHeightMobile = 4 * 70 + 3 * 16;
console.log(`Estimated badges height on 375px (grid-cols-1): ${estBadgesHeightMobile}px`);

// On tablet (md), grid-cols-2 -> 2 rows of 2 badges = 2 * 70 + 16 = 156px
// On desktop (lg), grid-cols-4 -> 1 row of 4 badges = 70px

// Action row:
const actionRowMobile = 48 + 16 + 48; // stacked buttons: ~112px
const actionRowDesktop = 48; // side by side

// Header badge + H2 + gaps:
const headerAndH2Mobile = 30 + 32 + 40 + 32; // ~134px

const totalContentHeightMobile = headerAndH2Mobile + estMobileTextHeight + 32 + estBadgesHeightMobile + 32 + actionRowMobile;
console.log(`\nEstimated TOTAL Content Height on 375px Mobile: ~${totalContentHeightMobile}px`);
console.log(`Viewport height on iPhone SE (375x667): 667px`);
console.log(`Difference (Overflow amount): ~${totalContentHeightMobile - 667}px`);

if (classMatch && classMatch[1].includes('h-screen') && classMatch[1].includes('overflow-hidden')) {
  console.log('\n[WARNING] Section 2 uses "h-screen" AND "overflow-hidden".');
  console.log(`On 375x667 mobile screens, ~${totalContentHeightMobile - 667}px of content could be clipped or require scrolling, but overflow-hidden cuts off the bottom action buttons.`);
} else {
  console.log('\n[OK] Section 2 allows content expansion or scrolling.');
}
