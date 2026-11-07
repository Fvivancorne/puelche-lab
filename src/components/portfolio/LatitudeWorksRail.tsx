'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Compass, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface LatitudeStation {
  lat: string;
  coord: string;
  region: string;
  place: string;
  title: string;
  client: string;
  humanCaption: string;
  image: string;
  projectSlug: string;
  category: string;
}

export const LATITUDE_STATIONS: LatitudeStation[] = [
  {
    lat: '41°19′S',
    coord: '41°19′S 72°59′W',
    region: 'Cuenca del Llanquihue',
    place: 'Puerto Varas',
    title: 'Luz en el Lago',
    client: 'CoHosting & Muebles Yunge',
    humanCaption: 'Interiorismo contemporáneo y madera nativa bajo el reflejo del volcán Osorno.',
    image: '/images/real/facebook/fb-cohosting-1.jpg',
    projectSlug: 'cohosting-chile',
    category: 'Fotografía & Interiorismo',
  },
  {
    lat: '41°38′S',
    coord: '41°38′S 72°18′W',
    region: 'Cochamó & Cordillera',
    place: 'Río Puelo',
    title: 'El Cruce del Puelo',
    client: 'Tagua Tagua Lodge',
    humanCaption: 'Navegación fluvial entre farellones de granito y aguas color esmeralda.',
    image: '/images/real/bg-home-2.jpg',
    projectSlug: 'tagua-tagua-lodge',
    category: 'Expedición & Territorio',
  },
  {
    lat: '41°45′S',
    coord: '41°45′S 72°50′W',
    region: 'Seno de Reloncaví',
    place: 'Puerto Montt & Canal',
    title: 'Ojos en las Profundidades',
    client: 'Nazca Oceanografía & AquaChile',
    humanCaption: 'Robótica submarina y temple humano en faenas de altamar en el Pacífico sur.',
    image: '/images/real/facebook/fb-nazca-1.jpg',
    projectSlug: 'nazca-oceanografia-puertomontt',
    category: 'Faena Industrial & Robótica',
  },
  {
    lat: '42°30′S',
    coord: '42°30′S 73°45′W',
    region: 'Archipiélago de Chiloé',
    place: 'Península de Rilán',
    title: 'Maderas Vernáculas',
    client: 'Estancia Rilán Hotel & Cava',
    humanCaption: 'Bruma costera, tejuelas de alerce centenario y cava subterránea frente al mar interior.',
    image: '/images/real/bg-portafolios-fotografia-a-min.jpg',
    projectSlug: 'estancia-rilan',
    category: 'Arquitectura & Hospitalidad',
  },
  {
    lat: '51°43′S',
    coord: '51°43′S 72°31′W',
    region: 'Última Esperanza',
    place: 'Puerto Natales',
    title: 'Fiordo del Viento',
    client: 'Hotel Costaustralis',
    humanCaption: 'Arquitectura señorial que resiste el embate del viento y el hielo milenario.',
    image: '/images/real/bg-portafolios-fotografia-c-min.jpg',
    projectSlug: 'hotel-costaustralis',
    category: 'Hotelería Austral',
  },
  {
    lat: '53°09′S',
    coord: '53°09′S 70°55′W',
    region: 'Estrecho de Magallanes',
    place: 'Punta Arenas',
    title: 'Chispas en el Fin del Mundo',
    client: 'Soldasur & Cabo de Hornos',
    humanCaption: 'Maestranza pesada y hospitalidad en la última frontera antes de la Antártica.',
    image: '/images/real/bg-portafolios-fotografia-d-min.jpg',
    projectSlug: 'soldasur-industrial',
    category: 'Industria & Territorio',
  },
];

export function LatitudeWorksRail({ onSelectProject }: { onSelectProject?: (slug: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStationIdx, setActiveStationIdx] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('.lat-station-item');
    const triggers: ScrollTrigger[] = [];

    items.forEach((item, idx) => {
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top center+=100',
        end: 'bottom center',
        onEnter: () => setActiveStationIdx(idx),
        onEnterBack: () => setActiveStationIdx(idx),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  const activeStation = LATITUDE_STATIONS[activeStationIdx] || LATITUDE_STATIONS[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 md:py-24 border-t border-b border-white/10"
      aria-label="Regla de Latitud Austral — 41°S a 53°S"
    >
      {/* Cabecera Conceptual */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em]">
            <Compass className="w-3.5 h-3.5 text-[#59BFD6] animate-spin-slow" />
            <span>LA REGLA AUSTRAL &bull; 41°S A 53°S</span>
          </div>
          <h2 className="font-condensed text-3xl sm:text-5xl uppercase tracking-tight font-bold text-white leading-none">
            El Mapa Convertido en Recorrido
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
            Nuestras obras descienden por la espina dorsal de la Patagonia. Cada proyecto responde a la luz, al viento y a la latitud exacta de su territorio.
          </p>
        </div>

        {/* Coordenada Activa Fija */}
        <div className="shrink-0 font-mono text-right p-4 rounded-2xl bg-white/[0.03] border border-white/10">
          <span className="text-[10px] uppercase tracking-widest text-[#59BFD6] block">
            Latitud Activa
          </span>
          <span className="font-condensed text-3xl sm:text-4xl text-white font-bold tracking-tight block">
            {activeStation.lat}
          </span>
          <span className="text-xs text-white/50 block">
            {activeStation.place} &bull; {activeStation.region}
          </span>
        </div>
      </div>

      {/* Riel Central: Regla de Latitud Lateral + Estaciones Fotográficas Luminosas */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Regla Geográfica Lateral (Sticky en Escritorio) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-32 space-y-6 select-none">
          <div className="border-l-2 border-white/10 pl-6 space-y-8 relative">
            {/* Marcador deslizante de posición */}
            <div
              className="absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-[#59BFD6] shadow-[0_0_12px_#59BFD6] transition-all duration-500"
              style={{
                top: `${(activeStationIdx / (LATITUDE_STATIONS.length - 1)) * 100}%`,
              }}
            />

            {LATITUDE_STATIONS.map((station, idx) => {
              const isActive = idx === activeStationIdx;
              return (
                <div
                  key={station.lat}
                  className={`transition-all duration-300 ${
                    isActive ? 'text-[#59BFD6] scale-105' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  <span className="font-condensed text-2xl font-bold tracking-tight block">
                    {station.lat}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider block">
                    {station.place}
                  </span>
                  <span className="font-sans text-[11px] text-white/50 line-clamp-1 block">
                    {station.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lista de Estaciones Territoriales */}
        <div className="col-span-1 lg:col-span-9 space-y-16 md:space-y-24">
          {LATITUDE_STATIONS.map((station, idx) => (
            <article
              key={station.lat}
              className="lat-station-item group relative rounded-3xl overflow-hidden border border-white/15 bg-[#141518] hover:border-[#59BFD6]/50 transition-all duration-500 shadow-2xl"
            >
              {/* Fotografía de Autor en Gran Formato (Luminosa y Diáfana) */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/40">
                <Image
                  src={station.image}
                  alt={`${station.title} — ${station.place}`}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
                {/* Gradiente sutil inferior exclusivamente para el pie de foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                {/* Badge de Latitud Flotante */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-condensed text-base font-bold text-white tracking-wider">
                    {station.lat}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[11px] text-[#59BFD6] uppercase tracking-wider hidden sm:inline">
                    {station.coord}
                  </span>
                </div>

                {/* Categoría */}
                <div className="absolute top-5 right-5 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-[#C29B63]/90 text-puelche-dark font-mono text-[10px] font-bold uppercase tracking-wider">
                    {station.category}
                  </span>
                </div>
              </div>

              {/* Pie Editorial de la Estación */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#59BFD6] mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{station.place} &bull; {station.region}</span>
                    </div>
                    <h3 className="font-condensed text-2xl sm:text-3xl lg:text-4xl uppercase font-bold text-white tracking-tight leading-tight">
                      {station.title}
                    </h3>
                  </div>

                  <span className="font-mono text-xs text-white/50 uppercase tracking-wider sm:text-right">
                    {station.client}
                  </span>
                </div>

                <p className="font-sans text-sm sm:text-base text-white/85 font-light leading-relaxed">
                  {station.humanCaption}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40">
                    Estación 0{idx + 1} / 0{LATITUDE_STATIONS.length}
                  </span>

                  {onSelectProject ? (
                    <button
                      type="button"
                      onClick={() => onSelectProject(station.projectSlug)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#59BFD6] hover:bg-white text-puelche-dark font-condensed uppercase tracking-wider text-xs font-bold transition-all shadow-md hover:scale-105"
                    >
                      <span>Abrir caso de estudio</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href={`/portafolio?proyecto=${station.projectSlug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#59BFD6] hover:bg-white text-puelche-dark font-condensed uppercase tracking-wider text-xs font-bold transition-all shadow-md hover:scale-105"
                    >
                      <span>Abrir caso de estudio</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
