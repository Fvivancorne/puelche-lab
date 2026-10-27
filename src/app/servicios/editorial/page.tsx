import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Palette, FileText, Printer, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Diseño Editorial & Publicaciones de Autor | Puelche Lab Puerto Varas',
  description: 'Memorias anuales, libros fotográficos de gran formato y catálogos de arte para instituciones y empresas del sur de Chile.',
};

export default function EditorialPage() {
  return (
    <div className="w-full flex-1 pt-8 md:pt-12 pb-24 px-6 md:px-12 bg-puelche-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-puelche-forest mb-4">
          <Link href="/servicios" className="hover:text-puelche-ink transition-colors">Servicios</Link>
          <span className="text-puelche-ink/30">/</span>
          <span className="text-puelche-copper">Diseño Editorial</span>
        </div>

        {/* Hero Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b border-puelche-ink/10 pb-16 mb-16">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-puelche-ink leading-[1.05]">
              El valor irremplazable de la página impresa.
            </h1>
            <p className="text-lg md:text-xl text-puelche-charcoal leading-relaxed max-w-2xl font-sans">
              En un entorno saturado de pantallas efímeras, un libro corporativo o una memoria anual encuadernada en tela y papel de algodón comunica permanencia, seriedad institucional y respeto hacia el lector.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="bg-white p-6 rounded-2xl border border-puelche-ink/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-puelche-forest font-semibold">Ficha de Servicio</span>
              <div className="space-y-2 text-xs text-puelche-charcoal font-mono">
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Enfoque</span>
                  <span className="font-bold text-puelche-ink">Grilla Suiza & Tipografía Fina</span>
                </div>
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Papeles</span>
                  <span className="font-bold text-puelche-ink">Certificación FSC & Algodón</span>
                </div>
                <div className="flex justify-between border-b border-puelche-ink/5 pb-1">
                  <span>Supervisión</span>
                  <span className="font-bold text-puelche-ink">Pie de Máquina en Imprenta</span>
                </div>
                <div className="flex justify-between">
                  <span>Versión Digital</span>
                  <span className="font-bold text-puelche-ink">PDF Interactivo & Webbook</span>
                </div>
              </div>
              <Link
                href="/contacto?servicio=editorial"
                className="w-full mt-2 block text-center px-4 py-3 rounded-full bg-puelche-ink text-puelche-canvas text-xs font-mono uppercase tracking-widest font-bold hover:bg-puelche-copper hover:text-puelche-ink transition-colors"
              >
                Planificar Publicación
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Editorial Design */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper">Disciplinas Editoriales</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-puelche-ink">
              Publicaciones concebidas como piezas de colección
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Memorias & Reportes ESG</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Transformación de balances y métricas complejas en narrativas visuales diáfanas para directorios e inversionistas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Libros de Fotografía</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Ediciones de gran formato dedicadas al patrimonio natural patagónico, arquitectura austral y crónicas de expedición.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Catálogos de Producto</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Material de ventas de alto impacto táctil para mobiliario de autor, productos gourmet y desarrollo inmobiliario.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-puelche-ink/10 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-puelche-sand flex items-center justify-center text-puelche-ink">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Control de Pre-Prensa</h3>
              <p className="text-sm text-puelche-charcoal leading-relaxed">
                Supervisión directa en talleres de impresión: revisión de densidad de tintas, pruebas de color cromalín y acabados especiales.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Case Study */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-puelche-ink/10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-puelche-sand">
              <Image
                src="/images/real/bg-portafolios-fotografia-d-min.jpg"
                alt="Guía Territorial Patagonia Austral"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-puelche-copper">Proyecto Editorial</span>
              <h3 className="font-serif text-3xl font-bold text-puelche-ink">Guía Territorial Patagonia Austral</h3>
              <p className="text-puelche-charcoal text-sm leading-relaxed">
                Para Viajes Falabella, diseñamos un compendio editorial de expediciones australes. Tipografía contemporánea, mapas de relieve trazados a medida y fotografías que capturan la escala sobrecogedora de los glaciares.
              </p>
              <div className="space-y-2 pt-2 text-xs font-mono text-puelche-charcoal">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-puelche-copper" />
                  <span>Encuadernación con costura a la vista y tapa dura</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-puelche-copper" />
                  <span>Papel estucado mate de 170g con barniz sectorizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-puelche-copper" />
                  <span>Distribución corporativa a clientes de segmento premier</span>
                </div>
              </div>
              <Link
                href="/portafolio"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-puelche-forest font-bold pt-4 hover:text-puelche-ink"
              >
                <span>Explorar proyectos editoriales</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="p-10 rounded-3xl bg-puelche-sand/50 border border-puelche-ink/10 text-center max-w-2xl mx-auto space-y-6">
          <h3 className="font-serif text-3xl font-bold text-puelche-ink">
            ¿Tu empresa cumple un hito o prepara su memoria anual?
          </h3>
          <p className="text-puelche-charcoal text-sm leading-relaxed">
            Coordinamos la redacción, curaduría fotográfica y producción editorial completa desde Puerto Varas para distribución nacional e internacional.
          </p>
          <Link
            href="/contacto?servicio=editorial"
            className="inline-block px-8 py-4 rounded-full bg-puelche-ink text-puelche-canvas font-mono text-xs uppercase tracking-widest font-bold hover:bg-puelche-copper hover:text-puelche-ink transition-colors"
          >
            Iniciar Proyecto Editorial
          </Link>
        </div>
      </div>
    </div>
  );
}
