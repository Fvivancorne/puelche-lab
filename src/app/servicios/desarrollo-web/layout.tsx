import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo Web Next.js & Experiencias Awwwards | Puelche Lab Puerto Varas',
  description:
    'Desarrollo web SSR y Static Generation con Next.js App Router, Turbopack, GSAP 120Hz y optimización GEO para motores de IA. Sitios corporativos veloces, seguros y de clase mundial.',
  keywords: [
    'Desarrollo Web Puerto Varas',
    'Páginas Web Next.js Chile',
    'Agencia Web Puerto Varas',
    'Awwwards Studio Chile',
    'Desarrollo Web Patagonia',
  ],
  openGraph: {
    title: 'Desarrollo Web SSR & Experiencias Awwwards — Puelche Lab',
    description:
      'Plataformas web de alto rendimiento en Next.js, optimizadas para Core Web Vitals y motores de búsqueda generativa (GEO).',
    url: 'https://www.puelchelab.cl/servicios/desarrollo-web',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'article',
  },
};

export default function DesarrolloWebLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
