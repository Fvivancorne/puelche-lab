import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cabina de Autopsia Web Forense & Diagnóstico GEO | Puelche Lab',
  description:
    'Audita velocidad, Core Web Vitals, semántica y preparación para agentes de Inteligencia Artificial (GEO) de tu sitio web en 20 segundos con Puelche Lab.',
  keywords: [
    'Auditoría Web Puerto Varas',
    'Test Velocidad Web Chile',
    'Auditoría GEO Inteligencia Artificial',
    'Autopsia Web Forense',
    'Core Web Vitals Test',
  ],
  openGraph: {
    title: 'Cabina de Autopsia Web Forense & Diagnóstico GEO | Puelche Lab',
    description:
      'Diagnóstico de rendimiento, visibilidad y preparación para motores generativos de IA en 20 segundos.',
    url: 'https://www.puelchelab.cl/auditor',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'website',
    images: ['/opengraph-image'],
  },
};

export default function AuditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
