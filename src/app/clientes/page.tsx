import Link from 'next/link';
import { CLIENT_LOGOS } from '@/data/portfolio';
import { MapPin, Building2, Quote, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Clientes & Territorio Austral | Puelche Lab Puerto Varas',
  description: 'Empresas, instituciones y proyectos que confían en Puelche Lab a lo largo de Los Lagos, Chiloé, Aysén y Magallanes.',
};

interface ClientProfile {
  name: string;
  industry: string;
  region: string;
  scope: string;
}

const CLIENT_PROFILES: ClientProfile[] = [
  { name: 'AquaChile', industry: 'Acuicultura & Alimentos', region: 'Puerto Montt & Fiordos', scope: 'Fotografía Industrial & Procesos' },
  { name: 'Estancia Rilán', industry: 'Hospitalidad & Cava', region: 'Península de Rilán, Chiloé', scope: 'Fotografía Arquitectura & Film' },
  { name: 'Hotel Costaustralis', industry: 'Hotelería Boutique', region: 'Puerto Natales, Patagonia', scope: 'Fotografía Hotelera & Catálogo' },
  { name: 'Hotel Cabo de Hornos', industry: 'Turismo Histórico', region: 'Punta Arenas', scope: 'Dirección de Arte & Campaña' },
  { name: 'Doosan Bobcat Chile', industry: 'Maquinaria Pesada', region: 'Zona Sur Austral', scope: 'Fotografía en Faena & Soporte Gráfico' },
  { name: 'Viajes Falabella', industry: 'Turismo Corporativo', region: 'Chile & Argentina', scope: 'Diseño Editorial Guía Patagonia' },
  { name: 'Tagua Tagua Lodge', industry: 'Ecoturismo & Pesca', region: 'Río Puelo / Cochamó', scope: 'Dron Paisajístico & Contenido' },
  { name: 'Blue Seal Subsea', industry: 'Robótica Submarina', region: 'Puerto Montt', scope: 'Identidad de Marca & Branding' },
  { name: 'Sur Terra Inmobiliaria', industry: 'Loteos Ecológicos', region: 'Lago Llanquihue', scope: 'Plataforma Web Next.js & Dron' },
  { name: 'Cala Melí Cabañas', industry: 'Refugio Lacustre', region: 'Puerto Varas', scope: 'Fotografía de Interiores & Web' },
  { name: 'Muebles Yunge', industry: 'Mueblería de Autor', region: 'Puerto Varas', scope: 'Catálogo de Producto & Estudio' },
  { name: 'Cirumed', industry: 'Equipamiento Médico', region: 'Los Lagos', scope: 'Fotografía de Catálogo Clínico' },
];

const TESTIMONIALS = [
  {
    quote: 'Puelche Lab comprende como nadie la luz de Chiloé. El registro de Estancia Rilán no solo capturó las maderas y la arquitectura, sino la atmósfera de silencio que buscan nuestros huéspedes internacionales.',
    author: 'Dirección General',
    organization: 'Estancia Rilán Hotel & Cava',
    location: 'Chiloé, Los Lagos',
  },
  {
    quote: 'En operaciones acuícolas remotas se necesita un equipo autónomo, respetuoso con las normas de bioseguridad y con una velocidad de respuesta impecable. Puelche Lab cumplió al 100% en condiciones climáticas muy complejas.',
    author: 'Gerencia de Comunicaciones',
    organization: 'Operaciones Zona Austral',
    location: 'Puerto Montt',
  },
  {
    quote: 'El rediseño de nuestra plataforma web y la fotografía aérea aumentaron un 140% las consultas directas de inversionistas interesados en la conservación del lago. El sitio vuela y la estética es impecable.',
    author: 'Desarrollo Inmobiliario',
    organization: 'Sur Terra',
    location: 'Lago Llanquihue',
  },
];

export default function ClientesPage() {
  return (
    <div className="w-full flex-1 pt-8 md:pt-12 pb-24 px-6 md:px-12 bg-puelche-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-puelche-ink/10 pb-12 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-puelche-forest mb-4">
            <span className="w-2 h-2 rounded-full bg-puelche-copper"></span>
            <span>Relaciones Territoriales</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-puelche-ink mb-6">
            Empresas que confían en nuestra mirada.
          </h1>
          <p className="text-lg md:text-xl text-puelche-charcoal max-w-3xl leading-relaxed font-sans">
            Desde la cuenca del Lago Llanquihue hasta los fiordos de Magallanes. Trabajamos con marcas consolidadas e iniciativas emergentes que exigen rigor, sensibilidad estética y cumplimiento estricto de plazos.
          </p>
        </div>

        {/* Territory Scope Map Grid */}
        <div className="mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper">Alcance Geográfico</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-puelche-ink mt-2 mb-8">
            Radio de acción en la Patagonia Chilena
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-puelche-ink/10 space-y-2">
              <span className="text-xs font-mono font-bold text-puelche-copper uppercase">Nodo 01</span>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Cuenca Llanquihue</h3>
              <p className="text-xs text-puelche-charcoal leading-relaxed font-sans">
                Puerto Varas, Frutillar, Puerto Octay, Ensenada y Puerto Montt. Sede principal del laboratorio con estudio propio y movilidad inmediata.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-puelche-ink/10 space-y-2">
              <span className="text-xs font-mono font-bold text-puelche-copper uppercase">Nodo 02</span>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Archipiélago Chiloé</h3>
              <p className="text-xs text-puelche-charcoal leading-relaxed font-sans">
                Castro, Ancud, Rilán, Dalcahue y Quellón. Arquitectura en tejuelas, hoteles de diseño e industrias marinas conectadas al mar interior.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-puelche-ink/10 space-y-2">
              <span className="text-xs font-mono font-bold text-puelche-copper uppercase">Nodo 03</span>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Carretera Austral & Aysén</h3>
              <p className="text-xs text-puelche-charcoal leading-relaxed font-sans">
                Cochamó, Río Puelo, Chaitén, Coyhaique y Puerto Río Tranquilo. Ecoturismo de alta gama, lodges de pesca y reservas de conservación.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-puelche-ink/10 space-y-2">
              <span className="text-xs font-mono font-bold text-puelche-copper uppercase">Nodo 04</span>
              <h3 className="font-serif text-xl font-bold text-puelche-ink">Magallanes Austral</h3>
              <p className="text-xs text-puelche-charcoal leading-relaxed font-sans">
                Punta Arenas, Puerto Natales y Torres del Paine. Hotelería patrimonial, expediciones navales y empresas del fin del mundo.
              </p>
            </div>
          </div>
        </div>

        {/* Complete Client Directory Table */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper">Directorio de Colaboraciones</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-puelche-ink mt-1">
                Cartera de Clientes & Sectores
              </h2>
            </div>
            <span className="text-xs font-mono text-puelche-charcoal">
              {CLIENT_PROFILES.length} Alianzas Activas
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-puelche-ink/10 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-puelche-ink/10 text-xs font-mono uppercase tracking-wider text-puelche-charcoal bg-puelche-sand/30">
                    <th className="py-4 px-6">Cliente / Entidad</th>
                    <th className="py-4 px-6">Sector Industrial</th>
                    <th className="py-4 px-6">Ubicación</th>
                    <th className="py-4 px-6">Alcance Desarrollado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-puelche-ink/5 text-sm font-sans">
                  {CLIENT_PROFILES.map((cli, idx) => (
                    <tr key={idx} className="hover:bg-puelche-sand/20 transition-colors">
                      <td className="py-4 px-6 font-bold text-puelche-ink font-serif text-base">
                        {cli.name}
                      </td>
                      <td className="py-4 px-6 text-puelche-charcoal">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-puelche-sand/50 text-puelche-forest border border-puelche-ink/5">
                          {cli.industry}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs font-mono text-puelche-charcoal flex items-center gap-1.5 pt-5">
                        <MapPin className="w-3.5 h-3.5 text-puelche-copper shrink-0" />
                        <span>{cli.region}</span>
                      </td>
                      <td className="py-4 px-6 text-xs font-mono text-puelche-charcoal">
                        {cli.scope}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper">Voz de Quienes Trabajan Con Nosotros</span>
            <h2 className="font-serif text-3xl font-bold text-puelche-ink mt-2">
              Testimonios de Terreno
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-puelche-ink/10 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-puelche-copper/40" />
                  <p className="text-sm text-puelche-charcoal leading-relaxed font-sans italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-puelche-ink/5 pt-4 space-y-1">
                  <div className="font-serif font-bold text-puelche-ink text-base">{t.organization}</div>
                  <div className="text-xs font-mono text-puelche-forest">{t.author}</div>
                  <div className="text-[11px] font-mono text-puelche-charcoal/60 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-puelche-copper" />
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl bg-puelche-sand/50 border border-puelche-ink/10 p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-6">
          <h3 className="font-serif text-3xl font-bold text-puelche-ink">
            ¿Sumamos tu proyecto a este mapa?
          </h3>
          <p className="text-puelche-charcoal text-sm leading-relaxed">
            Estamos disponibles para reuniones presenciales en Puerto Varas y Puerto Montt, o vía videollamada para clientes en Santiago y el extranjero.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="px-8 py-4 rounded-full bg-puelche-ink text-puelche-canvas font-mono text-xs uppercase tracking-widest font-bold hover:bg-puelche-copper hover:text-puelche-ink transition-colors"
            >
              Agendar Conversación
            </Link>
            <Link
              href="/portafolio"
              className="px-8 py-4 rounded-full bg-white border border-puelche-ink/20 text-puelche-ink font-mono text-xs uppercase tracking-widest font-bold hover:bg-puelche-sand transition-colors"
            >
              Revisar Casos de Estudio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
