import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Clientes | Puelche Lab Puerto Varas — Clientes & Territorio Austral',
  description:
    'Empresas, instituciones y proyectos que confían en Puelche Lab a lo largo de Los Lagos, Chiloé, Aysén y Magallanes.',
};

// The 20 real clients of Puelche Lab
const CLIENT_LOGOS = [
  { id: 1, name: 'Soldasur', file: 'cliente1-1.png' },
  { id: 2, name: 'Seremi de Salud', file: 'cliente2-1.png' },
  { id: 3, name: 'Anasac', file: 'cliente3-1.png' },
  { id: 4, name: 'Estancia Rilán', file: 'cliente4-1.png' },
  { id: 5, name: 'Hotel Quilquico', file: 'cliente5-1.png' },
  { id: 6, name: 'Hotel Costaustralis', file: 'cliente6-1.png' },
  { id: 7, name: 'Hotel Cabo de Hornos', file: 'cliente7-1.png' },
  { id: 8, name: 'Viajes Falabella', file: 'cliente8-1.png' },
  { id: 9, name: 'AquaChile', file: 'cliente9-1.png' },
  { id: 10, name: 'Cala Melí', file: 'cliente10-1.png' },
  { id: 11, name: 'Tagua Tagua Lodge', file: 'cliente11-1.png' },
  { id: 12, name: 'Hotel Ohana', file: 'cliente12-1.png' },
  { id: 13, name: 'Gallo Negro', file: 'cliente13-1.png' },
  { id: 14, name: 'Blue Seal Subsea', file: 'cliente14-1.png' },
  { id: 15, name: 'Cirumed', file: 'cliente15-1.png' },
  { id: 16, name: 'El Triwe', file: 'cliente16-1.png' },
  { id: 17, name: 'Centro Maqui', file: 'cliente17-1.png' },
  { id: 18, name: 'ARMH', file: 'cliente18-1.png' },
  { id: 19, name: 'San Ambrosio', file: 'cliente19-1.png' },
  { id: 20, name: 'Saltos del Maullín', file: 'cliente20-1.png' },
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
    location: 'Chiloé, Los Lagos',
  },
  {
    quote: 'En operaciones industriales remotas se necesita un equipo autónomo y respetuoso de normas de seguridad. Puelche Lab cumplió al 100%.',
    author: 'Gerencia de Comunicaciones',
    organization: 'Operaciones Zona Austral',
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

      {/* 20 White Logos Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-center">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.id}
              data-cursor="CLIENTE"
              className="h-32 sm:h-36 p-6 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-lg group"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={`/images/real/clients/${client.file}`}
                  alt={`Logo ${client.name} — Cliente Puelche Lab`}
                  width={270}
                  height={180}
                  className="max-h-full max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all duration-200"
                />
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
