import Image from 'next/image';
import Link from 'next/link';
import { Cpu, Zap, ShieldAlert, Smartphone, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export const metadata = {
  title: 'Desarrollo Web & Experiencias Digitales en Next.js | Puelche Lab Puerto Varas',
  description: 'Sitios web ultra-rápidos, seguros y con diseño boutique para empresas del sur de Chile. Adiós a WordPress: arquitectura moderna en Next.js y React.',
};

export default function DesarrolloWebPage() {
  return (
    <div className="w-full flex-1 pt-8 md:pt-12 pb-24 px-6 md:px-12 bg-puelche-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-puelche-forest mb-4">
          <Link href="/servicios" className="hover:text-puelche-ink transition-colors">Servicios</Link>
          <span className="text-puelche-ink/30">/</span>
          <span className="text-puelche-copper">Desarrollo Web</span>
        </div>

        {/* Hero Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b border-puelche-ink/10 pb-16 mb-16">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-puelche-ink leading-[1.05]">
              Ingeniería web que vuela. Sin el peso muerto de WordPress.
            </h1>
            <p className="text-lg md:text-xl text-puelche-charcoal leading-relaxed max-w-2xl font-sans">
              La mayoría de los sitios en la región sufren por plantillas sobrecargadas, plugins desactualizados y tiempos de carga de más de 4 segundos. Nosotros construimos plataformas de autor con Next.js y React 19: carga en menos de 1 segundo, seguridad impenetrable y conversión directa a WhatsApp.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="bg-white p-6 rounded-2xl border border-puelche-ink/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-puelche-forest font-semibold">Parámetros Técnicos</span>
              <div className="space-y-2 text-xs text-puelche-charcoal font-mono">
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Stack</span>
                  <span className="font-bold text-puelche-ink">Next.js 16 + React 19</span>
                </div>
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Velocidad LCP</span>
                  <span className="font-bold text-puelche-forest">&lt; 0.8 Segundos</span>
                </div>
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Puntaje Lighthouse</span>
                  <span className="font-bold text-puelche-forest">95 - 100 / 100</span>
                </div>
                <div className="flex justify-between">
                  <span>Hosting</span>
                  <span className="font-bold text-puelche-ink">Edge Global (Cero Caídas)</span>
                </div>
              </div>
              <Link
                href="/contacto?servicio=desarrollo-web"
                className="w-full mt-2 block text-center px-4 py-3 rounded-full bg-puelche-ink text-puelche-canvas text-xs font-mono uppercase tracking-widest font-bold hover:bg-puelche-copper hover:text-puelche-ink transition-colors"
              >
                Cotizar Sitio Web
              </Link>
            </div>
          </div>
        </div>

        {/* Next.js vs WordPress Comparison Table */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper">Contraste Tecnológico</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-puelche-ink">
              ¿Por qué migramos empresas de WordPress a Next.js?
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-puelche-ink/10 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-puelche-ink/10 text-xs font-mono uppercase tracking-wider text-puelche-charcoal">
                  <th className="py-4 px-4">Criterio de Evaluación</th>
                  <th className="py-4 px-4 text-puelche-forest font-bold">Puelche Lab (Next.js Moderno)</th>
                  <th className="py-4 px-4 text-puelche-charcoal/60">Agencias Tradicionales (WordPress)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-puelche-ink/5 text-sm">
                <tr>
                  <td className="py-4 px-4 font-semibold text-puelche-ink">Velocidad de Carga Móvil</td>
                  <td className="py-4 px-4 text-puelche-forest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Instantánea (0.6s - 0.9s)</span>
                  </td>
                  <td className="py-4 px-4 text-puelche-charcoal/70 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Lenta (3.5s - 7.0s por exceso de plugins)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-puelche-ink">Vulnerabilidad & Hackeos</td>
                  <td className="py-4 px-4 text-puelche-forest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Sin base de datos expuesta (Inmune a inyecciones)</span>
                  </td>
                  <td className="py-4 px-4 text-puelche-charcoal/70 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Frecuente caída por plugins obsoletos</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-puelche-ink">Diseño Visual & Fluidez</td>
                  <td className="py-4 px-4 text-puelche-forest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Nivel de autor a medida, animaciones sutiles</span>
                  </td>
                  <td className="py-4 px-4 text-puelche-charcoal/70 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Plantilla prediseñada que se ve igual a 500 sitios</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-puelche-ink">Posicionamiento SEO Local</td>
                  <td className="py-4 px-4 text-puelche-forest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Schema.org nativo + indexación instantánea en Google</span>
                  </td>
                  <td className="py-4 px-4 text-puelche-charcoal/70 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Dependencia de plugins pesados como Yoast</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-puelche-ink">Mantenimiento Mensual</td>
                  <td className="py-4 px-4 text-puelche-forest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Cero rotura por updates de PHP</span>
                  </td>
                  <td className="py-4 px-4 text-puelche-charcoal/70 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Cobros recurrentes solo para que no se caiga</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real Case Example */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-puelche-ink/10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-puelche-sand">
              <Image
                src="/images/real/bg-home-2.jpg"
                alt="Sur Terra Inmobiliaria"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-puelche-copper">Caso Destacado</span>
              <h3 className="font-serif text-3xl font-bold text-puelche-ink">Sur Terra Inmobiliaria</h3>
              <p className="text-puelche-charcoal text-sm leading-relaxed">
                Desarrollo web para comercialización de loteos ecológicos en la cuenca del Lago Llanquihue. Interfaz limpia, fotografías aéreas optimizadas y canal directo de asesoría inmobiliaria.
              </p>
              <div className="p-4 rounded-xl bg-puelche-sand/40 border border-puelche-ink/5 space-y-2 text-xs font-mono text-puelche-charcoal">
                <div className="flex justify-between">
                  <span>Puntaje Google Móvil</span>
                  <span className="font-bold text-puelche-forest">98 / 100</span>
                </div>
                <div className="flex justify-between">
                  <span>Tiempo de carga</span>
                  <span className="font-bold text-puelche-forest">0.7 seg</span>
                </div>
                <div className="flex justify-between">
                  <span>Incremento de Leads</span>
                  <span className="font-bold text-puelche-ink">+140% vía WhatsApp</span>
                </div>
              </div>
              <Link
                href="/portafolio"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-puelche-forest font-bold pt-2 hover:text-puelche-ink"
              >
                <span>Ver detalles del proyecto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="p-10 rounded-3xl bg-puelche-ink text-puelche-canvas text-center max-w-2xl mx-auto space-y-6">
          <h3 className="font-serif text-3xl font-bold">
            ¿Listo para dejar atrás los sitios lentos?
          </h3>
          <p className="text-puelche-canvas/80 text-sm leading-relaxed">
            Hacemos la migración completa desde tu sitio actual sin perder posiciones en Google y asegurando todas tus redirecciones.
          </p>
          <Link
            href="/contacto?servicio=desarrollo-web"
            className="inline-block px-8 py-4 rounded-full bg-puelche-copper text-puelche-ink font-mono text-xs uppercase tracking-widest font-bold hover:bg-puelche-sand transition-colors"
          >
            Auditar mi Sitio Actual
          </Link>
        </div>
      </div>
    </div>
  );
}
