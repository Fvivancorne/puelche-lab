import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Oswald, JetBrains_Mono } from 'next/font/google';
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
      <body className="min-h-screen bg-white text-puelche-dark font-sans antialiased flex flex-col selection:bg-puelche-cyan selection:text-white">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 w-full pt-[70px]">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
