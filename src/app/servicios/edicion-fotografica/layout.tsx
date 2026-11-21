import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retoque Fine Art & Revelado RAW | Puelche Lab Puerto Varas',
  description:
    'Revelado cromático fino de capturas RAW, balance tonal estricto, calibración óptica de microtexturas y gradación cinemática de autor para catálogos y campañas de alto impacto.',
  keywords: [
    'Retoque Fotográfico Chile',
    'Revelado RAW Profesional',
    'Color Grading Fotografía',
    'Fine Art Puerto Varas',
    'Postproducción Fotográfica Patagonia',
  ],
  openGraph: {
    title: 'Retoque Fine Art & Revelado RAW — Puelche Lab Puerto Varas',
    description:
      'Mesa de revelado interactiva, balance térmico y gradación tonal cinemática de autor.',
    url: 'https://www.puelchelab.cl/servicios/edicion-fotografica',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'article',
  },
};

export default function EdicionFotograficaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
