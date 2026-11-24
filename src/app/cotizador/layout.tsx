import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cotizador Paramétrico en Tiempo Real (UF / CLP) | Puelche Lab',
  description:
    'Calcula en segundos el presupuesto exacto para tu proyecto web o fotográfico. Indexación a la UF del Banco Central de Chile con total transparencia.',
  keywords: [
    'Cotizador Web Puerto Varas',
    'Precios Páginas Web Chile UF',
    'Presupuesto Fotografía Profesional',
    'Calculadora Desarrollo Web Next.js',
  ],
  openGraph: {
    title: 'Cotizador Paramétrico en Tiempo Real | Puelche Lab',
    description:
      'Calcula tu inversión con indexación oficial a la UF del Banco Central de Chile.',
    url: 'https://www.puelchelab.cl/cotizador',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'website',
    images: ['/opengraph-image'],
  },
};

export default function CotizadorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
