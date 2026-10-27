import Link from 'next/link';
import { STUDIO_SERVICES } from '@/data/portfolio';
import { ArrowUpRight, Camera, Compass, Cpu, BookOpen } from 'lucide-react';

const ICONS = [Camera, Compass, Cpu, BookOpen];

export const metadata = {
  title: 'Servicios de Diseño Cross-Media & Fotografía | Puelche Lab Puerto Varas',
  description: 'Cuatro disciplinas integradas para empresas e instituciones patagónicas: Fotografía profesional, Identidad de marca, Desarrollo web Next.js y Diseño editorial.',
};

export default function ServiciosIndexPage() {
  return (
    <div className="w-full flex-1 pt-8 md:pt-12 pb-24 px-6 md:px-12 bg-puelche-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-puelche-ink/10 pb-12 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-puelche-forest mb-4">
            <span className="w-2 h-2 rounded-full bg-puelche-copper"></span>
            <span>Disciplinas de Estudio</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-puelche-ink mb-6">
            Servicios integrados con raíz en el sur.
          </h1>
          <p className="text-lg md:text-xl text-puelche-charcoal max-w-3xl leading-relaxed font-sans">
            No somos una fábrica de contenidos genéricos. Operamos como un laboratorio boutique donde cada soporte (físico, audiovisual o digital) responde a una dirección de arte unificada.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {STUDIO_SERVICES.map((serv, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={serv.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-puelche-ink/10 hover:border-puelche-copper/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-puelche-sand/60 flex items-center justify-center text-puelche-ink group-hover:bg-puelche-ink group-hover:text-puelche-canvas transition-colors duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-puelche-canvas border border-puelche-ink/10 text-puelche-forest font-semibold">
                      {serv.tag}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-puelche-ink mb-3 group-hover:text-puelche-copper transition-colors">
                    {serv.title}
                  </h2>
                  <p className="text-sm md:text-base text-puelche-charcoal leading-relaxed mb-6 font-sans">
                    {serv.shortDesc}
                  </p>

                  <ul className="space-y-2 mb-8 border-t border-puelche-ink/5 pt-6 text-xs sm:text-sm font-sans text-puelche-charcoal">
                    {serv.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-puelche-copper font-bold">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={serv.href}
                  className="w-full py-4 rounded-full bg-puelche-canvas hover:bg-puelche-ink text-puelche-ink hover:text-puelche-canvas border border-puelche-ink/10 text-xs font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
                >
                  <span>Conocer propuesta y alcance</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Global CTA */}
        <div className="rounded-3xl bg-puelche-ink text-puelche-canvas p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-puelche-copper">Proyectos Combinados</span>
            <h3 className="font-serif text-3xl font-bold">¿Necesitas fotografía, marca y sitio web a la vez?</h3>
            <p className="text-sm text-puelche-canvas/70 max-w-xl">
              Nuestra mayor fortaleza es el cross-media: un solo equipo que produce la fotografía, diseña la identidad y programa el sitio web sin inconsistencias visuales.
            </p>
          </div>
          <Link
            href="/contacto"
            className="px-8 py-4 rounded-full bg-puelche-copper text-puelche-ink font-mono text-xs uppercase tracking-widest font-bold hover:bg-puelche-sand transition-colors shrink-0"
          >
            Cotizar Paquete Integral
          </Link>
        </div>
      </div>
    </div>
  );
}
