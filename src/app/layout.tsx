import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Oswald, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Preloader } from '@/components/ui/Preloader';
import { PageTransition } from '@/components/ui/PageTransition';
import { AwwwardsCursor } from '@/components/ui/AwwwardsCursor';
import { FilmGrain } from '@/components/ui/FilmGrain';

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
  metadataBase: new URL('https://www.puelchelab.cl'),
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
    'https://www.instagram.com/puelche_lab/',
  ],
  about: [
    {
      '@type': 'Place',
      name: 'Puerto Varas',
      sameAs: 'https://www.wikidata.org/wiki/Q1012921',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Región de Los Lagos',
      sameAs: 'https://www.wikidata.org/wiki/Q2170',
    },
    {
      '@type': 'Place',
      name: 'Patagonia',
      sameAs: 'https://www.wikidata.org/wiki/Q1507',
    },
    {
      '@type': 'Place',
      name: 'Archipiélago de Chiloé',
      sameAs: 'https://www.wikidata.org/wiki/Q193630',
    },
    {
      '@type': 'Place',
      name: 'Lago Llanquihue',
      sameAs: 'https://www.wikidata.org/wiki/Q154432',
    },
  ],
  knowsAbout: [
    'Cross-media Design',
    'Commercial Photography',
    'Brand Identity',
    'Fine-Art Editorial Design',
    'Next.js Web Development',
    'Architecture Photography',
  ],
  founder: {
    '@type': 'Person',
    name: 'Paula Valdivieso',
    jobTitle: 'Directora Creativa',
    email: 'paula.valdivieso@puelchelab.cl',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+56966177500',
    contactType: 'customer service',
    areaServed: 'CL',
    availableLanguage: ['Spanish', 'English'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Estudio Creativo',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fotografía Profesional & Film',
          description: 'Interiores, arquitectura, faenas marítimas y drones 4K en el sur de Chile.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Diseño de Marca & Identidad Cross-Media',
          description: 'Estrategia de marca, manual de normas, señalética y narrativa con raíz territorial.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Diseño Editorial & Publicaciones',
          description: 'Memorias anuales, libros fotográficos corporativos y catálogos de arte.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Edición Fotográfica & Postproducción',
          description: 'Sala de magia digital, revelado fino y balance cromático de precisión.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Desarrollo Web & Experiencias Digitales',
          description: 'Sitios web rápidos, elegantes y nivel boutique programados en Next.js.',
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${sansFont.variable} ${condensedFont.variable} ${monoFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#111215] text-white font-sans antialiased flex flex-col selection:bg-puelche-cyan selection:text-white">
        <Preloader />
        <PageTransition />
        <AwwwardsCursor />
        <FilmGrain />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 w-full relative pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
