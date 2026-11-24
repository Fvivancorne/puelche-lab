import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fotografía de Autor & Expediciones | Puelche Lab Puerto Varas',
  description:
    'Fotografía profesional de arquitectura, hotelería y faenas marítimas en el sur de Chile. Óptica fija Sony G Master y luz patagónica natural sin artificios.',
  keywords: [
    'Fotografía Puerto Varas',
    'Fotografía de Arquitectura Patagonia',
    'Fotografía Inmobiliaria Los Lagos',
    'Fotografía Industrial Chiloé',
    'Fotógrafo Puerto Varas',
    'Alejandro Lattes',
  ],
  openGraph: {
    title: 'Fotografía de Autor & Expediciones | Puelche Lab Puerto Varas',
    description:
      'Interiores, hotelería, arquitectura y procesos industriales en el sur de Chile. Óptica fija y luz patagónica natural.',
    url: 'https://www.puelchelab.cl/servicios/fotografia',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'article',
    images: ['/opengraph-image'],
  },
};

export default function FotografiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
