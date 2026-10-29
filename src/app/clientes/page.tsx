import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Clientes | Puelche Lab Puerto Varas — Clientes & Territorio Austral',
  description:
    'Empresas, instituciones y proyectos que confían en Puelche Lab a lo largo de Los Lagos, Chiloé, Aysén y Magallanes.',
};

interface ClientLogo {
  id: number;
  name: string;
  file: string;
  projectSlug?: string;
  scope: string;
  region: string;
}

// The 20 real clients of Puelche Lab with verified scope and portfolio linkage
const CLIENT_LOGOS: ClientLogo[] = [
  { id: 1, name: 'Soldasur', file: 'cliente1-1.png', projectSlug: 'soldasur', scope: 'Soldadura Marina & Faenas', region: 'Puerto Montt' },
  { id: 2, name: 'Seremi de Salud', file: 'cliente2-1.png', scope: 'Campañas Sanitarias & Soporte', region: 'Región de Los Lagos' },
  { id: 3, name: 'Anasac', file: 'cliente3-1.png', scope: 'Agroindustria & Alimentos', region: 'Zona Sur Austral' },
  { id: 4, name: 'Estancia Rilán', file: 'cliente4-1.png', projectSlug: 'estancia-rilan', scope: 'Fotografía Arquitectura & Cava', region: 'Chiloé' },
  { id: 5, name: 'Hotel Quilquico', file: 'cliente5-1.png', scope: 'Hospitalidad & Turismo Rural', region: 'Chiloé' },
  { id: 6, name: 'Hotel Costaustralis', file: 'cliente6-1.png', projectSlug: 'hotel-costaustralis', scope: 'Fotografía Hotelera & Catálogo', region: 'Puerto Natales' },
  { id: 7, name: 'Hotel Cabo de Hornos', file: 'cliente7-1.png', projectSlug: 'hotel-cabo-de-hornos', scope: 'Dirección de Arte & Campaña', region: 'Punta Arenas' },
  { id: 8, name: 'Viajes Falabella', file: 'cliente8-1.png', projectSlug: 'viajes-falabella-patagonia', scope: 'Diseño Editorial Guía Patagonia', region: 'Chile & Argentina' },
  { id: 9, name: 'AquaChile', file: 'cliente9-1.png', projectSlug: 'aquachile', scope: 'Fotografía Industrial & Procesos', region: 'Puerto Montt & Fiordos' },
  { id: 10, name: 'Cala Melí', file: 'cliente10-1.png', projectSlug: 'cala-meli', scope: 'Fotografía de Interiores & Web', region: 'Puerto Varas' },
  { id: 11, name: 'Tagua Tagua Lodge', file: 'cliente11-1.png', projectSlug: 'tagua-tagua-lodge', scope: 'Dron Paisajístico & Contenido', region: 'Río Puelo' },
  { id: 12, name: 'Hotel Ohana', file: 'cliente12-1.png', projectSlug: 'hotel-ohana', scope: 'Hospitalidad & Arquitectura', region: 'Rapa Nui' },
  { id: 13, name: 'Gallo Negro', file: 'cliente13-1.png', scope: 'Identidad de Marca & Gastro', region: 'Puerto Varas' },
  { id: 14, name: 'Blue Seal Subsea', file: 'cliente14-1.png', projectSlug: 'blue-seal', scope: 'Identidad de Marca & Robótica', region: 'Puerto Montt' },
  { id: 15, name: 'Cirumed', file: 'cliente15-1.png', scope: 'Fotografía de Catálogo Clínico', region: 'Los Lagos' },
  { id: 16, name: 'El Triwe', file: 'cliente16-1.png', scope: 'Hotelería & Refugios Nativos', region: 'Cuenca Llanquihue' },
  { id: 17, name: 'Centro Maqui', file: 'cliente17-1.png', scope: 'Superalimentos & Packaging', region: 'Río Bueno / Llanquihue' },
  { id: 18, name: 'ARMH', file: 'cliente18-1.png', scope: 'Diseño Técnico & Comunicaciones', region: 'Puerto Montt' },
  { id: 19, name: 'San Ambrosio', file: 'cliente19-1.png', scope: 'Tradición Agrícola & Marca', region: 'Osorno / Frutillar' },
  { id: 20, name: 'Saltos del Maullín', file: 'cliente20-1.png', scope: 'Ecoturismo & Fotografía Aérea', region: 'Llanquihue' },
];

export interface ClientProfile {
  name: string;
  industry: string;
  region: string;
  scope: string;
}

export const CLIENT_PROFILES: ClientProfile[] = [
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

export const TESTIMONIALS = [
  {
    quote: 'Puelche Lab comprende como nadie la luz de Chiloé. El registro de Estancia Rilán capturó la atmósfera de silencio y distinción que buscan nuestros huéspedes.',
    author: 'Dirección General',
    organization: 'Estancia Rilán Hotel & Cava',
    location: 'Chiloé',
  },
  {
    quote: 'El estándar de producción en faena industrial y la rapidez de entrega en Puerto Montt nos permitieron posicionar nuestra memoria corporativa al más alto nivel.',
    author: 'Comunicaciones Corporativas',
    organization: 'AquaChile',
    location: 'Puerto Montt',
  },
  {
    quote: 'El rediseño de marca y la fotografía aérea aumentaron el impacto visual de nuestra propuesta inmobiliaria de conservación.',
    author: 'Desarrollo Territorial',
    organization: 'Sur Terra',
    location: 'Lago Llanquihue',
  },
];

export default function ClientesPage() {
  return (
    <div className="w-full flex-1 bg-puelche-cyan min-h-screen text-white">
      {/* Top Banner on Cyan */}
      <section className="py-16 md:py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-white/80 block">
            CONFIANZA & TRAYECTORIA
          </span>
          <h1 className="font-condensed text-5xl sm:text-6xl md:text-7xl uppercase tracking-wider text-white font-bold">
            CLIENTES
          </h1>
          <p className="font-sans text-base sm:text-lg text-white/95 max-w-2xl mx-auto font-light leading-relaxed">
            Empresas, hoteles, industrias y marcas que han confiado su imagen y comunicación al viento creativo de Puelche Lab.
          </p>
        </div>
      </section>

      {/* 20 White Logos Grid — Con Micro-Fichas y Enlaces al Caso de Estudio */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-center">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.id}
              data-cursor="CLIENTE"
              className="relative h-48 sm:h-52 rounded-xl bg-[#1D2024]/75 border border-white/20 backdrop-blur-md flex flex-col justify-between overflow-hidden transition-all duration-300 hover:bg-[#1D2024]/95 hover:border-white/60 hover:scale-105 hover:shadow-2xl group"
            >
              {/* Logo Centrado */}
              <div className="relative w-full flex-1 flex items-center justify-center p-4 transition-transform duration-300 group-hover:-translate-y-5">
                <Image
                  src={`/images/real/clients/${client.file}`}
                  alt={`Logo ${client.name} — Cliente Puelche Lab`}
                  width={320}
                  height={200}
                  unoptimized
                  className="max-h-[85%] max-w-[85%] object-contain filter brightness-100 drop-shadow-md group-hover:scale-95 transition-all duration-300"
                />
              </div>

              {/* Micro-Drawer de Alcance & Link al Caso de Estudio */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 via-black/90 to-transparent border-t border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col gap-1 z-10">
                <div className="flex items-center justify-between text-white">
                  <span className="font-condensed text-xs font-bold uppercase tracking-wider truncate">
                    {client.name}
                  </span>
                  <span className="font-mono text-[9px] text-[#59BFD6] uppercase tracking-wider shrink-0">
                    {client.region}
                  </span>
                </div>
                <p className="text-[10px] text-white/70 font-sans font-light truncate">
                  {client.scope}
                </p>

                {client.projectSlug ? (
                  <Link
                    href={`/portafolio?proyecto=${client.projectSlug}`}
                    className="mt-1 w-full py-1.5 px-2.5 rounded bg-[#59BFD6] text-puelche-dark font-condensed font-bold text-[11px] uppercase tracking-wider hover:bg-white transition-colors shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Ver Caso de Estudio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href={`/contacto?servicio=${encodeURIComponent(client.scope)}`}
                    className="mt-1 w-full py-1.5 px-2.5 rounded bg-white/10 border border-white/20 text-white font-condensed font-bold text-[11px] uppercase tracking-wider hover:bg-white hover:text-puelche-dark transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Cotizar Servicio</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#59BFD6]" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Territorial Scope Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 border-t border-white/20 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-condensed uppercase tracking-widest text-xs text-white/80 font-bold block mb-1">
            ALCANCE GEOGRÁFICO
          </span>
          <h2 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wider font-bold">
            Radio de Acción en la Patagonia Chilena
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 border border-white/20 p-6 rounded-lg backdrop-blur-sm space-y-2">
            <span className="font-condensed text-xs uppercase tracking-widest font-bold text-white/80">Nodo 01</span>
            <h3 className="font-condensed text-xl font-bold uppercase">Cuenca Llanquihue</h3>
            <p className="font-sans text-xs text-white/90 leading-relaxed font-light">
              Puerto Varas, Frutillar, Puerto Octay y Puerto Montt. Sede central con estudio propio.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-6 rounded-lg backdrop-blur-sm space-y-2">
            <span className="font-condensed text-xs uppercase tracking-widest font-bold text-white/80">Nodo 02</span>
            <h3 className="font-condensed text-xl font-bold uppercase">Archipiélago Chiloé</h3>
            <p className="font-sans text-xs text-white/90 leading-relaxed font-light">
              Castro, Rilán, Dalcahue y Ancud. Hoteles boutique, cava y maderas vernáculas.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-6 rounded-lg backdrop-blur-sm space-y-2">
            <span className="font-condensed text-xs uppercase tracking-widest font-bold text-white/80">Nodo 03</span>
            <h3 className="font-condensed text-xl font-bold uppercase">Carretera Austral & Aysén</h3>
            <p className="font-sans text-xs text-white/90 leading-relaxed font-light">
              Cochamó, Río Puelo y fiordos australes. Lodges de pesca y reservas ecológicas.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-6 rounded-lg backdrop-blur-sm space-y-2">
            <span className="font-condensed text-xs uppercase tracking-widest font-bold text-white/80">Nodo 04</span>
            <h3 className="font-condensed text-xl font-bold uppercase">Magallanes Austral</h3>
            <p className="font-sans text-xs text-white/90 leading-relaxed font-light">
              Punta Arenas y Puerto Natales. Hotelería patrimonial y expediciones australes.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Table */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24 border-t border-white/20 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-condensed uppercase tracking-widest text-xs text-white/80 font-bold block mb-1">
            REGISTRO INSTITUCIONAL
          </span>
          <h2 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wider font-bold">
            Directorio de Relaciones Corporativas
          </h2>
        </div>

        <div className="overflow-x-auto bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm">
          <table className="w-full min-w-[700px] text-left text-xs sm:text-sm font-sans">
            <thead className="border-b border-white/20 bg-white/5 font-condensed uppercase tracking-wider text-white">
              <tr>
                <th className="py-4 px-6">Cliente</th>
                <th className="py-4 px-6">Industria</th>
                <th className="py-4 px-6">Territorio</th>
                <th className="py-4 px-6">Alcance de Servicio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/90">
              {CLIENT_PROFILES.map((cp, idx) => (
                <tr key={idx} className="hover:bg-puelche-sand/20 transition-colors hover:bg-white/10">
                  <td className="py-3.5 px-6 font-bold">{cp.name}</td>
                  <td className="py-3.5 px-6">{cp.industry}</td>
                  <td className="py-3.5 px-6">{cp.region}</td>
                  <td className="py-3.5 px-6 text-white/80">{cp.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
