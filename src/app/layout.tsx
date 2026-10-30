import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Oswald, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Preloader } from '@/components/ui/Preloader';
import { PageTransition } from '@/components/ui/PageTransition';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const condensedFont = Oswald({
  subsets: ['latin'],
  variable: '--font-condensed',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Puelche Lab — Estudio de Diseño Cross Media y Fotografía de Puerto Varas',
  description:
    'Somos un Estudio de Diseño Cross Media y Fotografía en Puerto Varas. Piezas gráficas para todos los medios: digitales, impresos y audiovisuales.',
  keywords: [
    'Puelche Lab',
    'Estudio de Diseño Puerto Varas',
    'Fotografía Puerto Varas',
    'Diseño Cross Media',
    'Diseño de Marca',
    'Desarrollo Web Puerto Varas',
    'Fotografía Inmobiliaria',
    'Fotografía Industrial',
    'Puerto Varas',
    'Región de Los Lagos',
  ],
  authors: [{ name: 'Puelche Lab' }],
  creator: 'Puelche Lab',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://www.puelchelab.cl',
    siteName: 'Puelche Lab',
    title: 'Puelche Lab — Estudio de Diseño Cross Media y Fotografía',
    description:
      'Somos un Estudio de Diseño Cross Media y Fotografía en Puerto Varas. Viento creativo en la Patagonia.',
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
  priceRange: '$$$',
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
  areaServed: [
    'Puerto Varas',
    'Llanquihue',
    'Frutillar',
    'Puerto Montt',
    'Chiloé',
    'Carretera Austral',
    'Aysén',
    'Magallanes',
  ],
  sameAs: [
    'https://www.facebook.com/puelchelab',
    'https://www.instagram.com/puelchelab',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${sansFont.variable} ${condensedFont.variable} ${monoFont.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-puelche-dark font-sans antialiased flex flex-col selection:bg-puelche-cyan selection:text-white">
        <Preloader />
        <PageTransition />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 w-full pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
