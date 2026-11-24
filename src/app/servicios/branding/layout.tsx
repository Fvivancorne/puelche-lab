import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diseño de Marca & Identidad Cross-Media | Puelche Lab Puerto Varas',
  description:
    'Estrategia de marca, manual de normas y sistemas tipográficos con raíz territorial en el sur de Chile. Identidades memorables con proyección global.',
  keywords: [
    'Diseño de Marca Puerto Varas',
    'Branding Patagonia',
    'Identidad Corporativa Los Lagos',
    'Diseño Gráfico Puerto Varas',
    'Paula Valdivieso',
  ],
  openGraph: {
    title: 'Diseño de Marca & Identidad Cross-Media | Puelche Lab',
    description:
      'Estrategia de marca, manual de normas, señalética y narrativa con raíz territorial austral.',
    url: 'https://www.puelchelab.cl/servicios/branding',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'article',
    images: ['/opengraph-image'],
  },
};

export default function BrandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
