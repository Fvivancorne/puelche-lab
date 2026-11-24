import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diseño Editorial de Colección | Puelche Lab Puerto Varas',
  description:
    'Libros de fotografía de autor, memorias corporativas y catálogos de arte producidos bajo retícula suiza con los más altos estándares gráficos australes.',
  keywords: [
    'Diseño Editorial Chile',
    'Libros de Fotografía Puerto Varas',
    'Memorias Corporativas Patagonia',
    'Catálogos de Arte Los Lagos',
  ],
  openGraph: {
    title: 'Diseño Editorial & Publicaciones de Colección | Puelche Lab',
    description:
      'Curaduría tipográfica suiza, libros de autor y memorias corporativas en la Patagonia Austral.',
    url: 'https://www.puelchelab.cl/servicios/editorial',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'article',
    images: ['/opengraph-image'],
  },
};

export default function EditorialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
