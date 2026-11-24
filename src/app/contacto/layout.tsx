import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Diálogo & Expedición | Puelche Lab Puerto Varas',
  description:
    'Comunícate directamente con Paula Valdivieso y Alejandro Lattes en Puerto Varas. Precalificación de briefs, cotizaciones y atención directa vía WhatsApp.',
  keywords: [
    'Contacto Puelche Lab',
    'Agencia Creativa Puerto Varas Contacto',
    'Fotógrafo Puerto Varas Teléfono',
    'Paula Valdivieso WhatsApp',
  ],
  openGraph: {
    title: 'Iniciar Diálogo & Expedición | Puelche Lab Puerto Varas',
    description:
      'Diálogo directo con la mesa directiva de Puelche Lab en Puerto Varas.',
    url: 'https://www.puelchelab.cl/contacto',
    siteName: 'Puelche Lab',
    locale: 'es_CL',
    type: 'website',
    images: ['/opengraph-image'],
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
