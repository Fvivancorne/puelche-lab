import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disciplinas & Oficios de Autor | Puelche Lab Puerto Varas',
  description:
    'Explora los 6 oficios de Puelche Lab: Fotografía de Autor, Diseño de Marca, Desarrollo Web SSR, Diseño Editorial, Retoque Fine Art y Redes Sociales en la Patagonia Austral.',
  keywords: [
    'Servicios Creativos Puerto Varas',
    'Fotografía Profesional Patagonia',
    'Estudio de Diseño Puerto Varas',
    'Desarrollo Web Los Lagos',
    'Branding Austral',
  ],
  openGraph: {
    title: 'Disciplinas & Oficios de Autor — Puelche Lab',
    description:
      'Estudio cross-media y fotografía de autor esculpido bajo el rigor y la luz de la Patagonia austral.',
    url: 'https://www.puelchelab.cl/servicios',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
