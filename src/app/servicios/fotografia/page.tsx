import Image from 'next/image';
import Link from 'next/link';
import { Camera, Video, Layers, Eye, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';

const PHOTO_PROJECTS = PORTFOLIO_PROJECTS.filter(p => p.category === 'Fotografía');

export const metadata = {
  title: 'Fotografía Profesional & Film en Puerto Varas y Patagonia | Puelche Lab',
  description: 'Documentación visual de alta precisión para arquitectura, hoteles boutique, faenas industriales y paisajes australes. Drones 4K y revelado fine art.',
};

export default function FotografiaPage() {
  return (
    <div className="w-full flex-1 pt-8 md:pt-12 pb-24 px-6 md:px-12 bg-puelche-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-puelche-forest mb-4">
          <Link href="/servicios" className="hover:text-puelche-ink transition-colors">Servicios</Link>
          <span className="text-puelche-ink/30">/</span>
          <span className="text-puelche-copper">Fotografía & Film</span>
        </div>

        {/* Hero Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b border-puelche-ink/10 pb-16 mb-16">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-puelche-ink leading-[1.05]">
              La luz austral capturada con rigor óptico.
            </h1>
            <p className="text-lg md:text-xl text-puelche-charcoal leading-relaxed max-w-2xl font-sans">
              No hacemos fotografía genérica de stock. Documentamos la arquitectura patagónica, la infraestructura productiva y los espacios de hospitalidad conociendo el clima extremo, las mareas y la luz rasante del paralelo 41°.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="bg-white p-6 rounded-2xl border border-puelche-ink/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-puelche-forest font-semibold">Resumen de Capacidad</span>
              <div className="space-y-2 text-xs text-puelche-charcoal font-mono">
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Equipamiento</span>
                  <span className="font-bold text-puelche-ink">Full Frame & Dron Cine</span>
                </div>
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Resolución</span>
                  <span className="font-bold text-puelche-ink">61MP RAW / 4K ProRes</span>
                </div>
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Radio Operativo</span>
                  <span className="font-bold text-puelche-ink">Los Lagos a Magallanes</span>
                </div>
                <div className="flex justify-between">
                  <span>Entrega</span>
                  <span className="font-bold text-puelche-ink">Color Grading & Licencia Total</span>
                </div>
              </div>
              <Link
                href="/contacto?servicio=fotografia"
                className="w-full mt-2 block text-center px-4 py-3 rounded-full bg-puelche-ink text-puelche-canvas text-xs font-mono uppercase tracking-widest font-bold hover:bg-puelche-copper hover:text-puelche-ink transition-colors"
              >
                Agendar Expedición
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Photo Service */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper">Disciplinas Ópticas</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-puelche-ink">
              Cuatro campos de especialidad visual
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Arquitectura & Hotelería</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Lectura de líneas, volúmenes bioclimáticos y texturas de madera nativa. Corrección de perspectiva y ambientación lumínica nocturna y diurna.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Inspección Aérea 4K</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Vuelos con Dron Cine en condiciones de viento patagónico. Planos de relieve territorial, costas de fiordos y avances de obra inmobiliaria.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Industria & Procesos</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Documentación técnica en centros de cultivo acuícola, plantas de valor agregado y faenas agrícolas sin interrumpir la operación productiva.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Gastronomía & Producto</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Puesta en escena de ingredientes de origen (mariscos, trucha, carnes maduradas y botánicos) con iluminación de estudio de alta fidelidad cromática.
              </p>
            </div>
          </div>
        </div>

        {/* Selected Works Gallery */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper">Casos Reales</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-puelche-ink">
                Fotografía en el terreno austral
              </h2>
            </div>
            <Link
              href="/portafolio"
              className="text-xs font-mono uppercase tracking-wider text-puelche-forest hover:text-puelche-ink flex items-center gap-1.5 font-bold"
            >
              <span>Ver archivo completo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PHOTO_PROJECTS.slice(0, 3).map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-puelche-ink/10 hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden bg-puelche-sand">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-black/60 text-white backdrop-blur-sm">
                      {item.location}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <div className="text-xs font-mono text-puelche-copper font-semibold">{item.client}</div>
                  <h4 className="font-serif text-xl font-bold text-puelche-ink">{item.title}</h4>
                  <p className="text-xs text-puelche-charcoal leading-relaxed">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Technical Rig / Equipment Section */}
        <div className="bg-puelche-ink text-puelche-canvas rounded-3xl p-8 sm:p-14 mb-20">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-puelche-copper">Parque Técnico</span>
            <h3 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-6">
              Herramientas de grado cinematográfico para condiciones implacables.
            </h3>
            <p className="text-puelche-canvas/80 text-base leading-relaxed mb-8">
              En el sur de Chile la ventana de buen clima puede durar 45 minutos. No improvisamos con equipamiento de aficionado. Contamos con cuerpos sellados contra lluvia y condensación, ópticas fijas de apertura rápida y sistemas de estabilización giroscópica.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-puelche-copper shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-mono text-sm font-bold">Óptica Fija de Arquitectura</h5>
                  <p className="text-xs text-puelche-canvas/60 mt-1">Lentes descentrables tilt-shift para líneas verticales perfectas sin distorsión.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-puelche-copper shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-mono text-sm font-bold">Unidades Dron Certificadas DGAC</h5>
                  <p className="text-xs text-puelche-canvas/60 mt-1">Operadores con licencia para espacios restringidos, borde costero y parques nacionales.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-puelche-copper shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-mono text-sm font-bold">Iluminación Autónoma a Batería</h5>
                  <p className="text-xs text-puelche-canvas/60 mt-1">Generación de luz en locaciones remotas sin conexión a red eléctrica.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-puelche-copper shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-mono text-sm font-bold">Flujo de Color Calibrado (DCI-P3)</h5>
                  <p className="text-xs text-puelche-canvas/60 mt-1">Garantía de correspondencia entre el archivo digital y la impresión offset en papel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center max-w-xl mx-auto space-y-6">
          <h3 className="font-serif text-3xl font-bold text-puelche-ink">
            ¿Planificando una sesión en el sur?
          </h3>
          <p className="text-puelche-charcoal text-sm leading-relaxed">
            Revisamos el pronóstico y la disponibilidad de fechas para asegurar la ventana de luz óptima para tu proyecto.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto?servicio=fotografia"
              className="px-8 py-4 rounded-full bg-puelche-ink text-puelche-canvas font-mono text-xs uppercase tracking-widest font-bold hover:bg-puelche-copper hover:text-puelche-ink transition-colors"
            >
              Consultar Disponibilidad
            </Link>
            <Link
              href="https://wa.me/56966177500?text=Hola%20Puelche%20Lab,%20me%20gustar%C3%ADa%20cotizar%20un%20servicio%20de%20fotograf%C3%ADa"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white border border-puelche-ink/20 text-puelche-ink font-mono text-xs uppercase tracking-widest font-bold hover:bg-puelche-sand transition-colors"
            >
              Hablar por WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
