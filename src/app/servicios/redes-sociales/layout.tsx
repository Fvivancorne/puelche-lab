import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estrategia de Redes Sociales de Autor | Puelche Lab Puerto Varas',
  description:
    'Estrategia de contenidos visuales de alto valor, dirección de arte fotográfica y presencia digital sin clichés para marcas del sur de Chile con aspiración global.',
  keywords: [
    'Redes Sociales Puerto Varas',
    'Community Management Boutique',
    'Creación de Contenido Patagonia',
    'Estrategia Digital Los Lagos',
  ],
  openGraph: {
    title: 'Estrategia de Redes Sociales de Autor — Puelche Lab',
    description:
      'Narrativa visual contemporánea y presencia digital sin clichés para marcas con raíz territorial.',
    url: 'https://www.puelchelab.cl/servicios/redes-sociales',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'article',
  },
};

export default function RedesSocialesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
