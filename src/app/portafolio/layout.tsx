import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portafolio & Archivo Óptico Austral | Puelche Lab Puerto Varas',
  description:
    'Explora 34 casos documentados de autor: fotografía de arquitectura, hotelería boutique, faenas en alta mar, diseño editorial y desarrollo web en la Patagonia.',
  keywords: [
    'Portafolio Puelche Lab',
    'Fotografía Arquitectura Puerto Varas',
    'Casos de Estudio Branding Patagonia',
    'Diseño Web Puerto Varas',
    'Archivo Óptico Austral',
  ],
  openGraph: {
    title: 'Portafolio & Archivo Óptico Austral | Puelche Lab',
    description:
      '34 casos documentados de autor a través de la geografía del sur de Chile.',
    url: 'https://www.puelchelab.cl/portafolio',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'website',
    images: ['/opengraph-image'],
  },
};

export default function PortafolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
