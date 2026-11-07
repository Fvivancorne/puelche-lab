import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Globe, MapPin, Building2, Quote, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Clientes | Puelche Lab Puerto Varas — Clientes & Territorio Austral',
  description:
    'Empresas, instituciones y proyectos que confían en Puelche Lab a lo largo de Los Lagos, Chiloé, Aysén y Magallanes.',
};

export interface ClientLogo {
  id: number;
  name: string;
  file: string;
  projectSlug?: string;
  scope: string;
  region: string;
  websiteUrl?: string;
}

// 20 authentic clients verified 1:1 against public/images/real/clients/ via Apple Vision OCR
export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 1,
    name: 'AquaChile',
    file: 'cliente1-1.png',
    projectSlug: 'aquachile',
    scope: 'Fotografía Industrial & Procesos',
    region: 'Puerto Montt & Fiordos',
    websiteUrl: 'https://www.aquachile.com',
  },
  {
    id: 2,
    name: 'Soldasur',
    file: 'cliente2-1.png',
    projectSlug: 'soldasur',
    scope: 'Soldadura Marina & Faenas',
    region: 'Puerto Montt',
  },
  {
    id: 3,
    name: 'Seremi del Medio Ambiente',
    file: 'cliente3-1.png',
    scope: 'Campañas Ambientales & Conservación',
    region: 'Región de Los Lagos',
    websiteUrl: 'https://mma.gob.cl',
  },
  {
    id: 4,
    name: 'Anasac',
    file: 'cliente4-1.png',
    scope: 'Agroindustria & Alimentos',
    region: 'Zona Sur Austral',
    websiteUrl: 'https://www.anasac.cl',
  },
  {
    id: 5,
    name: 'Estancia Rilán',
    file: 'cliente5-1.png',
    projectSlug: 'estancia-rilan',
    scope: 'Fotografía Arquitectura & Cava',
    region: 'Península de Rilán, Chiloé',
    websiteUrl: 'https://estanciarilan.cl',
  },
  {
    id: 6,
    name: 'Hotel Quilquico',
    file: 'cliente6-1.png',
    scope: 'Hospitalidad & Turismo Rural',
    region: 'Chiloé',
  },
  {
    id: 7,
    name: 'Hotel Costaustralis',
    file: 'cliente7-1.png',
    projectSlug: 'hotel-costaustralis',
    scope: 'Fotografía Hotelera & Catálogo',
    region: 'Puerto Natales, Patagonia',
    websiteUrl: 'https://hotelcostaustralis.com',
  },
  {
    id: 8,
    name: 'Hotel Cabo de Hornos',
    file: 'cliente8-1.png',
    projectSlug: 'hotel-cabo-de-hornos',
    scope: 'Dirección de Arte & Campaña',
    region: 'Punta Arenas',
    websiteUrl: 'https://hotelcabodehornos.com',
  },
  {
    id: 9,
    name: 'Viajes Falabella',
    file: 'cliente9-1.png',
    projectSlug: 'viajes-falabella-patagonia',
    scope: 'Diseño Editorial Guía Patagonia',
    region: 'Chile & Argentina',
    websiteUrl: 'https://www.viajesfalabella.cl',
  },
  {
    id: 10,
    name: 'Cala Melí',
    file: 'cliente10-1.png',
    projectSlug: 'cala-meli',
    scope: 'Fotografía de Interiores & Web',
    region: 'Puerto Varas',
  },
  {
    id: 11,
    name: 'Tagua Tagua Lodge',
    file: 'cliente11-1.png',
    projectSlug: 'tagua-tagua-lodge',
    scope: 'Dron Paisajístico & Contenido',
    region: 'Río Puelo / Cochamó',
  },
  {
    id: 12,
    name: 'Hotel Ohana',
    file: 'cliente12-1.png',
    projectSlug: 'hotel-ohana',
    scope: 'Hospitalidad & Arquitectura',
    region: 'Rapa Nui',
  },
  {
    id: 13,
    name: 'Gallo Negro',
    file: 'cliente13-1.png',
    scope: 'Identidad de Marca & Gastro',
    region: 'Puerto Varas',
  },
  {
    id: 14,
    name: 'Blue Seal Subsea',
    file: 'cliente14-1.png',
    projectSlug: 'blue-seal',
    scope: 'Identidad de Marca & Robótica',
    region: 'Puerto Montt',
  },
  {
    id: 15,
    name: 'Cirumed',
    file: 'cliente15-1.png',
    scope: 'Fotografía de Catálogo Clínico',
    region: 'Los Lagos',
  },
  {
    id: 16,
    name: 'El Triwe',
    file: 'cliente16-1.png',
    scope: 'Hotelería & Refugios Nativos',
    region: 'Cuenca Llanquihue',
  },
  {
    id: 17,
    name: 'Centro Maqui',
    file: 'cliente17-1.png',
    scope: 'Atención Integral & Salud Infantil',
    region: 'Llanquihue',
  },
  {
    id: 18,
    name: 'ARMH',
    file: 'cliente18-1.png',
    scope: 'Diseño Técnico & Comunicaciones',
    region: 'Puerto Montt',
  },
  {
    id: 19,
    name: 'San Ambrosio',
    file: 'cliente19-1.png',
    scope: 'Servicios Navieros & Rescate',
    region: 'Osorno / Frutillar',
  },
  {
    id: 20,
    name: 'Saltos del Maullín',
    file: 'cliente20-1.png',
    scope: 'Ecoturismo & Fotografía Aérea',
    region: 'Llanquihue',
  },
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
    <div className="w-full flex-1 bg-[#0D0E12] text-white min-h-screen">
      {/* ── CABECERA EDITORIAL AWWWARDS SOTD (FONDO OBSIDIANA AUSTRAL & ACENTOS QUIRÚRGICOS) ── */}
      <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 px-6 sm:px-8 lg:px-12 text-center overflow-hidden border-b border-white/10">
        {/* Glow atmosférico suave de fondo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#59BFD6]/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-[0.25em] uppercase text-[#59BFD6] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse shadow-[0_0_8px_#59BFD6]" />
            <span>41°S &mdash; 53°S &bull; ARCHIVO TERRITORIAL DE MARCAS</span>
          </div>

          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-white font-bold drop-shadow-2xl leading-[0.95]">
            ALIANZAS DEL TERRITORIO
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed pt-2">
            20 empresas, industrias, hoteles e instituciones que han encomendado su imagen, relatos y plataformas digitales al rigor visual y la luz austral de Puelche Lab.
          </p>

          {/* Interactive Navigation Anchor Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-6">
            <a
              href="#marcas"
              className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-[#59BFD6] hover:text-puelche-dark border border-white/15 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-white transition-all flex items-center gap-2 backdrop-blur-md hover:scale-105 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6]"></span>
              <span>20 Marcas</span>
            </a>
            <a
              href="#territorio"
              className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-[#59BFD6] hover:text-puelche-dark border border-white/15 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-white transition-all flex items-center gap-2 backdrop-blur-md hover:scale-105 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span>Radio Territorial</span>
            </a>
            <a
              href="#testimonios"
              className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-[#59BFD6] hover:text-puelche-dark border border-white/15 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-white transition-all flex items-center gap-2 backdrop-blur-md hover:scale-105 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span>Testimonios</span>
            </a>
            <a
              href="#directorio"
              className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-[#59BFD6] hover:text-puelche-dark border border-white/15 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-white transition-all flex items-center gap-2 backdrop-blur-md hover:scale-105 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span>Directorio</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 20 LOGOS OFICIALES: PROOF WALL SOBRIO EN OBSIDIANA ── */}
      <section id="marcas" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch justify-center">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.id}
              data-cursor="CLIENTE"
              className="relative h-48 sm:h-52 rounded-2xl bg-[#121418]/90 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:bg-[#16191f] hover:border-[#59BFD6]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:-translate-y-1.5 group"
            >
              {/* Logo Centrado con amplitud y respiración */}
              <div className="relative w-full h-full flex items-center justify-center p-6 transition-all duration-300 group-hover:scale-90 group-hover:-translate-y-4">
                <Image
                  src={`/images/real/clients/${client.file}`}
                  alt={`Logo oficial ${client.name} — Cliente Puelche Lab`}
                  width={320}
                  height={180}
                  unoptimized
                  className="max-h-[75px] w-auto max-w-[80%] object-contain filter brightness-100 group-hover:brightness-125 transition-all duration-300 drop-shadow-md"
                />
              </div>

              {/* Sutil pie de identificación en reposo */}
              <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-white/50 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
                <span className="font-condensed text-xs uppercase tracking-wider text-white/80 font-semibold truncate">
                  {client.name}
                </span>
                <span className="font-mono text-[9px] text-[#59BFD6] uppercase tracking-wider shrink-0">
                  {client.region.split(',')[0]}
                </span>
              </div>

              {/* Micro-Drawer de Alcance & Links al Hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/95 to-black/85 border-t border-[#59BFD6]/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col gap-2 z-10">
                <div className="flex items-center justify-between">
                  <span className="font-condensed text-sm font-bold uppercase tracking-wider text-white">
                    {client.name}
                  </span>
                  <span className="font-mono text-[9px] text-[#59BFD6] uppercase tracking-wider">
                    {client.region}
                  </span>
                </div>
                <p className="text-[11px] text-white/80 font-sans font-light leading-snug">
                  {client.scope}
                </p>

                <div className="mt-1 flex flex-col gap-1.5">
                  {client.projectSlug && (
                    <Link
                      href={`/portafolio?proyecto=${client.projectSlug}`}
                      className="w-full py-1.5 px-3 rounded-lg bg-[#59BFD6] text-puelche-dark font-condensed font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>Ver Caso de Estudio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {client.websiteUrl && (
                    <a
                      href={client.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1 px-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-condensed text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Globe className="w-3 h-3 text-[#59BFD6]" />
                      <span>Visitar Sitio Oficial</span>
                      <ArrowUpRight className="w-3 h-3 text-white/60" />
                    </a>
                  )}

                  {!client.projectSlug && (
                    <Link
                      href={`/contacto?servicio=${encodeURIComponent(client.scope)}`}
                      className="w-full py-1.5 px-3 rounded-lg bg-white/10 border border-white/20 text-white font-condensed font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-puelche-dark transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Cotizar Servicio</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#59BFD6]" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Invitación Cinética al Scroll — Elimina el Falso Suelo */}
        <div className="mt-14 flex flex-col items-center justify-center text-center">
          <a
            href="#territorio"
            className="group inline-flex flex-col items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-white/90 group-hover:text-white">
              <span className="w-2 h-2 rounded-full bg-[#59BFD6] animate-pulse"></span>
              <span>Explorar Radio Territorial en la Patagonia</span>
              <span className="text-[#59BFD6] group-hover:translate-y-1 transition-transform">↓</span>
            </div>
          </a>
        </div>
      </section>

      {/* Darkroom Cinematic Transition — Alcance Geográfico + Directorio */}
      <div className="relative bg-[#101216] text-white border-t border-white/15 overflow-hidden">
        {/* Authentic Background with Moody Parallax Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <Image
            src="/images/real/bg-fotografia-9-min.jpg"
            alt="Patagonia Austral — Puelche Lab"
            fill
            className="object-cover filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#101216] via-[#101216]/90 to-[#101216]"></div>
        </div>

        {/* Territorial Scope Grid — Radio de Acción en la Patagonia */}
        <section id="territorio" className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
            <div className="max-w-2xl space-y-3">
              <span className="font-serif italic text-sm text-[#59BFD6] block">
                Territorio &amp; Rutas de Expedición
              </span>
              <h2 className="font-condensed text-4xl sm:text-5xl uppercase tracking-wider font-bold text-white">
                Radio de Acción en la Patagonia Chilena
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed">
                Presencia en terreno con base operativa en Puerto Varas y cobertura en 4 paisajes del sur austral.
              </p>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-serif italic text-white/70 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#59BFD6]"></span>
              <span>Cuatro paisajes de trabajo en la Patagonia</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#181B20]/90 border border-white/10 p-7 rounded-2xl backdrop-blur-md space-y-4 hover:border-[#59BFD6]/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="font-serif italic text-xs text-[#59BFD6]">
                  Nodo 01 &bull; Cuenca Lacustre
                </span>
                <MapPin className="w-4 h-4 text-white/40 group-hover:text-[#59BFD6] transition-colors" />
              </div>
              <h3 className="font-condensed text-2xl font-bold uppercase tracking-wide text-white">
                Cuenca Llanquihue
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                Puerto Varas, Frutillar, Puerto Octay y Puerto Montt. Sede central con estudio propio y sala de postproducción de color.
              </p>
            </div>

            <div className="bg-[#181B20]/90 border border-white/10 p-7 rounded-2xl backdrop-blur-md space-y-4 hover:border-[#59BFD6]/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="font-serif italic text-xs text-[#59BFD6]">
                  Nodo 02 &bull; El Mar Interior
                </span>
                <MapPin className="w-4 h-4 text-white/40 group-hover:text-[#59BFD6] transition-colors" />
              </div>
              <h3 className="font-condensed text-2xl font-bold uppercase tracking-wide text-white">
                Archipiélago Chiloé
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                Castro, Rilán, Dalcahue y Ancud. Hoteles boutique, cava y maderas vernáculas con navegación costera y fiordos interiores.
              </p>
            </div>

            <div className="bg-[#181B20]/90 border border-white/10 p-7 rounded-2xl backdrop-blur-md space-y-4 hover:border-[#59BFD6]/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="font-serif italic text-xs text-[#59BFD6]">
                  Nodo 03 &bull; Fiordos &amp; Selva Fría
                </span>
                <MapPin className="w-4 h-4 text-white/40 group-hover:text-[#59BFD6] transition-colors" />
              </div>
              <h3 className="font-condensed text-2xl font-bold uppercase tracking-wide text-white">
                Carretera Austral & Aysén
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                Cochamó, Río Puelo y fiordos australes. Lodges de pesca y reservas ecológicas con acceso aéreo y terrestre de alta exigencia.
              </p>
            </div>

            <div className="bg-[#181B20]/90 border border-white/10 p-7 rounded-2xl backdrop-blur-md space-y-4 hover:border-[#59BFD6]/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="font-serif italic text-xs text-[#59BFD6]">
                  Nodo 04 &bull; El Confín Austral
                </span>
                <MapPin className="w-4 h-4 text-white/40 group-hover:text-[#59BFD6] transition-colors" />
              </div>
              <h3 className="font-condensed text-2xl font-bold uppercase tracking-wide text-white">
                Magallanes Austral
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                Punta Arenas y Puerto Natales. Hotelería patrimonial y expediciones australes en el confín austral de Chile y Patagonia profunda.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section — Voces de Liderazgo Austral */}
        <section id="testimonios" className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24 border-t border-white/10 pt-20 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-serif italic text-sm text-[#59BFD6] block">
              Vínculo Territorial &amp; Confianza
            </span>
            <h2 className="font-condensed text-4xl sm:text-5xl uppercase tracking-wider font-bold text-white">
              Voz de Nuestras Alianzas
            </h2>
            <p className="font-sans text-sm text-white/70 font-light">
              Reflexiones de directores y gerencias sobre el estándar visual y la precisión territorial de Puelche Lab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#181B20]/80 border border-white/10 p-8 rounded-2xl flex flex-col justify-between relative group hover:border-[#59BFD6]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <Quote className="w-8 h-8 text-[#59BFD6]/40 mb-4 group-hover:text-[#59BFD6] transition-colors" />
                <p className="font-sans text-sm text-white/85 font-light italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-white/10 pt-4 mt-auto">
                  <div className="font-condensed text-sm font-bold uppercase tracking-wider text-white">
                    {t.author}
                  </div>
                  <div className="text-xs text-[#59BFD6] font-medium">
                    {t.organization}
                  </div>
                  <div className="text-[11px] text-white/50 font-serif italic mt-0.5">
                    {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Directory Table — Registro Institucional */}
        <section id="directorio" className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-28 border-t border-white/10 pt-20 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="font-serif italic text-sm text-[#59BFD6] block">
                Historial Documentado
              </span>
              <h2 className="font-condensed text-4xl sm:text-5xl uppercase tracking-wider font-bold text-white">
                Directorio de Relaciones Corporativas
              </h2>
              <p className="font-sans text-sm text-white/70 font-light">
                Historial documentado de alcances técnicos e industrias atendidas en la Patagonia.
              </p>
            </div>
            <div className="font-serif italic text-xs text-white/60 bg-white/5 px-4 py-2 rounded-full border border-white/10 self-start md:self-auto">
              Alianzas y memorias territoriales
            </div>
          </div>

          <div className="overflow-x-auto bg-[#14171B] border border-white/15 rounded-2xl shadow-2xl">
            <table className="w-full min-w-[700px] text-left text-xs sm:text-sm font-sans">
              <thead className="border-b border-white/15 bg-white/5 font-condensed uppercase tracking-wider text-white">
                <tr>
                  <th className="py-4 px-6">Cliente</th>
                  <th className="py-4 px-6">Industria</th>
                  <th className="py-4 px-6">Territorio</th>
                  <th className="py-4 px-6">Alcance de Servicio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/90">
                {CLIENT_PROFILES.map((cp, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-puelche-sand/20 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-white font-condensed tracking-wide text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6]"></span>
                      <span>{cp.name}</span>
                    </td>
                    <td className="py-4 px-6 text-white/80">{cp.industry}</td>
                    <td className="py-4 px-6 text-[#59BFD6] font-mono text-xs">{cp.region}</td>
                    <td className="py-4 px-6 text-white/70">{cp.scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Footer Block */}
          <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-puelche-dark to-[#1d2024] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-condensed text-2xl md:text-3xl font-bold uppercase tracking-wider text-white">
                ¿Tu marca necesita elevar su estándar visual en el sur?
              </h3>
              <p className="font-sans text-sm text-white/70 max-w-xl font-light">
                Conversemos sobre tu próxima sesión fotográfica, identidad de marca o plataforma web desarrollada a la medida.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contacto"
                className="py-3 px-6 rounded-xl bg-[#59BFD6] text-puelche-dark font-condensed font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-2"
              >
                <span>Iniciar Brief de Proyecto</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portafolio"
                className="py-3 px-6 rounded-xl bg-white/10 border border-white/20 text-white font-condensed font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-puelche-dark transition-all"
              >
                <span>Ver Portafolio Completo</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
