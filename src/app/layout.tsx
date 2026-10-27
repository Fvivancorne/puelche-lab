import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Puelche Lab — Estudio de Diseño Cross Media & Fotografía | Puerto Varas',
  description:
    'Estudio boutique de diseño cross-media, fotografía profesional de arquitectura y desarrollo web en Puerto Varas, Región de Los Lagos. Transformamos marcas del sur de Chile.',
  keywords: [
    'Puelche Lab',
    'Fotografía Puerto Varas',
    'Diseño Web Puerto Varas',
    'Branding Patagonia',
    'Fotografía Arquitectura Los Lagos',
    'Estudio Cross Media Chile',
    'AquaChile',
    'Estancia Rilán',
  ],
  authors: [{ name: 'Puelche Lab' }],
  creator: 'Puelche Lab',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://www.puelchelab.cl',
    siteName: 'Puelche Lab',
    title: 'Puelche Lab — Diseño Cross Media & Fotografía en Puerto Varas',
    description:
      'Estudio boutique de diseño cross-media, fotografía profesional de arquitectura y desarrollo web en Puerto Varas y la Patagonia chilena.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Puelche Lab',
  image: 'https://www.puelchelab.cl/logo-puelche.png',
  description:
    'Estudio de diseño cross media, fotografía profesional y desarrollo web en Puerto Varas, Región de Los Lagos.',
  url: 'https://www.puelchelab.cl',
  telephone: '+56966177500',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Puerto Varas',
    addressRegion: 'Región de Los Lagos',
    addressCountry: 'CL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -41.3195,
    longitude: -72.9854,
  },
  priceRange: '$$$',
  areaServed: [
    'Puerto Varas',
    'Llanquihue',
    'Frutillar',
    'Puerto Montt',
    'Chiloé',
    'Patagonia',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#F9F9F6] text-[#18191B] font-sans antialiased selection:bg-[#C29B63] selection:text-[#18191B]">
        <SmoothScrollProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main id="main-content" className="flex-1 flex flex-col pt-20">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
