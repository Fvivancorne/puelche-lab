import Image from 'next/image';
import Link from 'next/link';
import { Compass, PenTool, LayoutTemplate, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';

const BRANDING_PROJECTS = PORTFOLIO_PROJECTS.filter(p => p.category === 'Branding');

export const metadata = {
  title: 'Diseño de Marca & Identidad Cross-Media | Puelche Lab Puerto Varas',
  description: 'Construcción de sistemas de identidad visual con raíz territorial. Manuales de marca, tipografía, packaging y narrativa para empresas patagónicas.',
};

export default function BrandingPage() {
  return (
    <div className="w-full flex-1 pt-8 md:pt-12 pb-24 px-6 md:px-12 bg-puelche-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-puelche-forest mb-4">
          <Link href="/servicios" className="hover:text-puelche-ink transition-colors">Servicios</Link>
          <span className="text-puelche-ink/30">/</span>
          <span className="text-puelche-copper">Branding & Identidad</span>
        </div>

        {/* Hero Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b border-puelche-ink/10 pb-16 mb-16">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-puelche-ink leading-[1.05]">
              Marcas con carácter de origen y peso contemporáneo.
            </h1>
            <p className="text-lg md:text-xl text-puelche-charcoal leading-relaxed max-w-2xl font-sans">
              Una marca en el sur no puede ser una plantilla descargada de internet. Diseñamos identidades que dialogan con el paisaje, el viento, la madera y la ingeniería de vanguardia, resistiendo el paso del tiempo y las modas efímeras.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="bg-white p-6 rounded-2xl border border-puelche-ink/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-puelche-forest font-semibold">Enfoque de Estudio</span>
              <div className="space-y-2 text-xs text-puelche-charcoal font-mono">
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Metodología</span>
                  <span className="font-bold text-puelche-ink">Cross-Media Modular</span>
                </div>
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Entregable</span>
                  <span className="font-bold text-puelche-ink">Manual de Normas & Assets</span>
                </div>
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Soportes</span>
                  <span className="font-bold text-puelche-ink">Físico, Packaging, Digital</span>
                </div>
                <div className="flex justify-between">
                  <span>Plazo promedio</span>
                  <span className="font-bold text-puelche-ink">4 a 6 Semanas</span>
                </div>
              </div>
              <Link
                href="/contacto?servicio=branding"
                className="w-full mt-2 block text-center px-4 py-3 rounded-full bg-puelche-ink text-puelche-canvas text-xs font-mono uppercase tracking-widest font-bold hover:bg-puelche-copper hover:text-puelche-ink transition-colors"
              >
                Diseñar Marca
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Branding */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper">Proceso de Construcción</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-puelche-ink">
              Cómo forjamos una identidad
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">1. Raíz & Tono</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Investigación de origen, arquetipo de marca, competencia regional y narrativa territorial antes de trazar la primera línea.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">2. Dibujo & Tipografía</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Logotipos geométricos, monogramas con proporción áurea y selección de fuentes que resisten tanto en pantalla Retina como en bajorrelieve en madera.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">3. Sistema Tangible</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Aplicación a señalética de hotel, uniformes de personal, cajas de embalaje, etiquetas de botellas y papelería corporativa de autor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">4. Ecosistema Digital</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Assets vectoriales optimizados en SVG, guías de diseño para redes sociales y coherencia cromática para plataformas web modernas.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Case Study */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-puelche-ink/10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-puelche-ink">
              <Image
                src="/images/real/bg-portafolios-fotografia-h-min.jpg"
                alt="Blue Seal Branding"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-puelche-copper">Caso Destacado</span>
              <h3 className="font-serif text-3xl font-bold text-puelche-ink">Blue Seal Subsea</h3>
              <p className="text-puelche-charcoal text-sm leading-relaxed">
                Para esta compañía de tecnología submarina y buceo técnico de Puerto Montt, creamos una identidad basada en la hidrodinámica y la resistencia de alta presión en el mar austral.
              </p>
              <div className="space-y-2 pt-2 text-xs font-mono text-puelche-charcoal">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-puelche-copper" />
                  <span>Imagotipo geométrico inspirado en sellos de compresión</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-puelche-copper" />
                  <span>Señalética para embarcaciones de apoyo y equipos ROV</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-puelche-copper" />
                  <span>Manual de marca digital para el equipo de ingeniería</span>
                </div>
              </div>
              <Link
                href="/portafolio"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-puelche-forest font-bold pt-4 hover:text-puelche-ink"
              >
                <span>Ver otros casos en portafolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="p-10 rounded-3xl bg-puelche-sand/50 border border-puelche-ink/10 text-center max-w-2xl mx-auto space-y-6">
          <h3 className="font-serif text-3xl font-bold text-puelche-ink">
            ¿Tu marca refleja el valor real de lo que haces?
          </h3>
          <p className="text-puelche-charcoal text-sm leading-relaxed">
            Hablemos sobre el estado actual de tu identidad visual y evaluemos si requiere un rediseño evolutivo o una refundación completa.
          </p>
          <Link
            href="/contacto?servicio=branding"
            className="inline-block px-8 py-4 rounded-full bg-puelche-ink text-puelche-canvas font-mono text-xs uppercase tracking-widest font-bold hover:bg-puelche-copper hover:text-puelche-ink transition-colors"
          >
            Iniciar Consulta de Marca
          </Link>
        </div>
      </div>
    </div>
  );
}
