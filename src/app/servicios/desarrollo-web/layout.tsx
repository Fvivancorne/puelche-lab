import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo Web Next.js de Autor | Puelche Lab Puerto Varas',
  description:
    'Desarrollo web SSR con Next.js App Router, GSAP 120Hz y optimización GEO para motores de IA. Plataformas digitales veloces, seguras y cinematográficas.',
  keywords: [
    'Desarrollo Web Puerto Varas',
    'Páginas Web Next.js Chile',
    'Agencia Web Puerto Varas',
    'Awwwards Studio Chile',
    'Desarrollo Web Patagonia',
  ],
  openGraph: {
    title: 'Desarrollo Web SSR & Experiencias Awwwards | Puelche Lab',
    description:
      'Plataformas web de alto rendimiento en Next.js, optimizadas para Core Web Vitals y motores de búsqueda generativa (GEO).',
    url: 'https://www.puelchelab.cl/servicios/desarrollo-web',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'article',
    images: ['/opengraph-image'],
  },
};

export default function DesarrolloWebLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
