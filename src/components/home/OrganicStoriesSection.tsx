'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Feather, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface OrganicStory {
  id: string;
  num: string;
  title: string;
  protagonist: string;
  role: string;
  location: string;
  image: string;
  alt: string;
  fieldNote: string;
  curatorQuote: string;
  quoteAuthor: string;
  chronicle: string;
  expeditionDetails: {
    hour: string;
    atmosphere: string;
    lens: string;
  };
  projectSlug: string;
}

const STORIES: OrganicStory[] = [
  {
    id: 'tagua-tagua',
    num: '01',
    title: 'El Cruce del Río Puelo',
    protagonist: 'Guías & Navegantes Fluviales',
    role: 'Expedición Cordillerana',
    location: 'Río Puelo & Cochamó, Los Lagos',
    image: '/images/real/bg-home-2.jpg',
    alt: 'Tagua Tagua Lodge — Navegación fluvial y cordillera en Río Puelo',
    fieldNote:
      'El silencio del río solo se interrumpe por el sonido del agua contra el casco. Llegar a este rincón de la cordillera exige navegar dos horas sin señal de teléfono.',
    curatorQuote:
      'En la Patagonia profunda, la distancia no es un obstáculo: es el filtro natural que preserva la pureza del territorio.',
    quoteAuthor: 'Paula Valdivieso • Bitácora de Expedición',
    chronicle:
      'Para documentar Tagua Tagua Lodge nos internamos en la cuenca del Puelo en otoño temprano. Esperamos la salida del sol sobre los farellones de granito para captar la barcaza cruzando las aguas color esmeralda, registrando la comunión entre el aislamiento geográfico y la hospitalidad de alta montaña.',
    expeditionDetails: {
      hour: '07:20 AM • Luz de Cordillera',
      atmosphere: 'Bruma fluvial & 6°C',
      lens: '24-70mm f/2.8 Pro',
    },
    projectSlug: 'tagua-tagua-lodge',
  },
  {
    id: 'nazca-oceanografia',
    num: '02',
    title: 'Ojos en las Profundidades',
    protagonist: 'Tripulación de Robótica Submarina',
    role: 'Oceanografía & Buceo Técnico',
    location: 'Seno de Reloncaví & Océano Pacífico',
    image: '/images/real/facebook/fb-nazca-1.jpg',
    alt: 'Nazca Oceanografía — Robótica submarina y equipo técnico en faena marítima',
    fieldNote:
      'En la cubierta de un barco de investigación a merced del oleaje, cada segundo cuenta. Buscamos el pulso de concentración del equipo mientras operan en el Pacífico sur.',
    curatorQuote:
      'La técnica más sofisticada carece de sentido si detrás no se siente la templanza humana de quienes desafían el mar.',
    quoteAuthor: 'Dirección de Fotografía Puelche Lab',
    chronicle:
      'Acompañamos las faenas de Nazca Oceanografía para documentar la operación del robot submarino DEFENDER. Combinamos vuelos de dron a baja cota sobre el canal con registro documental a pulso en el puente de mando, capturando la precisión técnica de hombres que trabajan donde la luz del sol ya no llega.',
    expeditionDetails: {
      hour: '11:45 AM • Faena en Altamar',
      atmosphere: 'Oleaje Pacífico & 11°C',
      lens: '35mm f/1.4 Weather-Sealed',
    },
    projectSlug: 'nazca-oceanografia-puertomontt',
  },
  {
    id: 'cohosting-chile',
    num: '03',
    title: 'La Casa del Lago y el Silencio',
    protagonist: 'Interiorismo Austral Contemporáneo',
    role: 'Arquitectura & Luz Natural',
    location: 'Puerto Varas & Lago Llanquihue',
    image: '/images/real/facebook/fb-cohosting-1.jpg',
    alt: 'CoHosting Chile — Interiorismo contemporáneo y vistas abiertas en Puerto Varas',
    fieldNote:
      'Esperamos el momento exacto en que la brisa del lago se calmó por completo. La luz exterior inundó los espacios de doble altura revelando la riqueza de las maderas nativas.',
    curatorQuote:
      'Un buen retrato de interiores no muestra cómo es un espacio: transmite cómo se respira y se descansa en él.',
    quoteAuthor: 'Dirección de Arte Puelche Lab',
    chronicle:
      'Para CoHosting Chile, documentamos residencias contemporáneas donde el diseño nórdico dialoga con el paisaje austral. Registramos la fluidez entre el interior y la inmensidad del lago Llanquihue, utilizando exclusivamente luz natural indirecta para preservar el balance cromático original de las vigas y pavimentos.',
    expeditionDetails: {
      hour: '16:15 PM • Luz Natural Indirecta',
      atmosphere: 'Atmósfera serena & 17°C',
      lens: '16-35mm Architectural Prime',
    },
    projectSlug: 'cohosting-chile',
  },
  {
    id: 'cabo-de-hornos',
    num: '04',
    title: 'El Viento del Estrecho',
    protagonist: 'Punta Arenas & Última Frontera',
    role: 'Arquitectura Antártica',
    location: 'Punta Arenas, Estrecho de Magallanes',
    image: '/images/real/bg-portafolios-fotografia-d-min.jpg',
    alt: 'Hotel Cabo de Hornos — Arquitectura histórica frente al Estrecho de Magallanes',
    fieldNote:
      'El viento en Magallanes no amaina. Para registrar los interiores del hotel esperamos la hora azul, cuando las luces cálidas del salón contrastan con la penumbra del estrecho.',
    curatorQuote:
      'En el extremo sur, un refugio no es un lujo decorativo: es la diferencia entre resistir a la intemperie o ser vencido por ella.',
    quoteAuthor: 'Crónica Austral Puelche Lab',
    chronicle:
      'Ubicado en la plaza Muñoz Gamero de Punta Arenas, Hotel Cabo de Hornos es el punto de partida hacia el territorio antártico. Nuestro encargo documentó la sobriedad señorial de sus espacios, la madera labrada y la luz de sus ventanales, ofreciendo un testimonio visual de la hospitalidad más austral del planeta.',
    expeditionDetails: {
      hour: '19:40 PM • Hora Azul Austral',
      atmosphere: 'Viento 35 nudos & 4°C',
      lens: '50mm f/1.4 Fine Art Prime',
    },
    projectSlug: 'hotel-cabo-de-hornos',
  },
];

export function OrganicStoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  useEffect(() => {
    const runway = sectionRef.current;
    const track = trackRef.current;
    if (!runway || !track) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.to(track, {
          x: () => -window.innerWidth * (STORIES.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: runway,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.65,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressFillRef.current) {
                gsap.set(progressFillRef.current, { scaleX: self.progress });
              }

              // React solo recibe cambios discretos de historia, no cada frame del scroll.
              const nextIndex = Math.min(
                STORIES.length - 1,
                Math.round(self.progress * (STORIES.length - 1))
              );
              setActiveStoryIdx((current) => (current === nextIndex ? current : nextIndex));
            },
          },
        });
      }, runway);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  const activeStory = STORIES[activeStoryIdx] || STORIES[0];

  return (
    <section
      id="cronicas-de-autor"
      aria-label="Crónicas del Puelche — Relatos Vivos de Autor"
      className="relative w-full bg-[#0d0e12] text-white border-t border-b border-white/[0.08]"
    >
      {/* 
        ======================================================================
        VERSIÓN ESCRITORIO: STICKY HORIZONTAL SCROLL RUNWAY (350vh)
        La pantalla se fija en top-0 y el avance del scroll vertical desplaza
        las fotografías monumentales y tarjetas flotantes de derecha a izquierda.
        ======================================================================
      */}
      <div
        ref={sectionRef}
        className="stories-desktop-runway hidden md:block relative w-full h-[350vh]"
      >
        <div className="stories-desktop-sticky sticky top-0 w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between">
          {/* Cabecera Flotante Discreta */}
          <header className="absolute top-6 left-8 md:left-16 z-30 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em]">
              <Feather className="w-3.5 h-3.5 text-[#59BFD6]" />
              <span>CRÓNICAS DEL PUELCHE</span>
            </div>
          </header>

          {/* Track Horizontal de Obras */}
          <div
            ref={trackRef}
            className="stories-desktop-track flex h-full will-change-transform"
            style={{
              width: `${STORIES.length * 100}vw`,
            }}
          >
            {STORIES.map((story, idx) => (
              <div
                key={story.id}
                className="stories-desktop-slide w-screen h-full shrink-0 relative flex items-center justify-end px-8 md:px-16 lg:px-24 py-16"
              >
                {/* Fotografía Monumental de Fondo Completo (100% Pantalla, Luminosa y de Autor) */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center scale-105 transition-transform duration-1000"
                    sizes="100vw"
                  />
                  {/* Gradiente sutil localizado exclusivamente tras el bloque editorial para preservar 80%+ de luz diáfana */}
                  <div className="absolute inset-y-0 right-0 w-full md:w-3/5 bg-gradient-to-l from-black/55 via-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Tarjeta Flotante Aireada y Luminosa con el Relato */}
                <article className="relative z-10 max-w-lg w-full bg-black/40 backdrop-blur-md rounded-3xl border border-white/20 p-7 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.6)] space-y-5">
                  {/* Metadata de Cabecera */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#59BFD6]">
                      <MapPin className="w-3.5 h-3.5 text-[#59BFD6]" />
                      <span className="uppercase tracking-wider">{story.location}</span>
                    </div>

                    <h3 className="font-condensed text-3xl sm:text-4xl uppercase tracking-tight font-bold text-white leading-tight">
                      {story.title}
                    </h3>
                  </div>

                  {/* Cita Editorial en Serif Cursiva */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.05] border-l-2 border-[#C29B63] space-y-2">
                    <Quote className="w-4 h-4 text-[#C29B63]/70" />
                    <p className="font-serif italic text-base sm:text-lg text-white/95 leading-relaxed font-light">
                      &ldquo;{story.curatorQuote}&rdquo;
                    </p>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#C29B63] block">
                      &mdash; {story.quoteAuthor}
                    </span>
                  </div>

                  {/* Crónica de Campo */}
                  <p className="font-sans text-sm sm:text-base text-white/85 font-light leading-relaxed line-clamp-4">
                    {story.chronicle}
                  </p>

                  {/* CTA Directo a la Obra */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#59BFD6] font-medium tracking-wide">
                      [ {story.num} / 04 ] &bull; {story.role}
                    </span>

                    <Link
                      href={`/portafolio?proyecto=${story.projectSlug}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#59BFD6] hover:bg-white text-puelche-dark font-condensed uppercase tracking-wider text-xs font-bold transition-all shadow-md shrink-0 hover:scale-105"
                    >
                      <span>Ver obra en archivo</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Barra de Progreso Austral en la Base */}
          <footer className="stories-desktop-progress absolute bottom-6 left-8 right-8 md:left-16 md:right-16 z-30 flex items-center justify-between text-xs font-mono text-white/80 bg-black/70 backdrop-blur-md px-6 py-3.5 rounded-full border border-white/15 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[#59BFD6] font-bold tracking-wider">
                [ {activeStory.num} / 04 ]
              </span>
              <span className="hidden sm:inline text-white/90 font-medium">
                {activeStory.title}
              </span>
              <span className="text-white/30 hidden sm:inline">&bull;</span>
              <span className="text-white/50 hidden md:inline">
                {activeStory.location}
              </span>
            </div>

            {/* Track Fino de Progreso en Cyan */}
            <div className="flex items-center gap-4">
              <div className="w-36 sm:w-56 h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div
                  ref={progressFillRef}
                  className="h-full bg-[#59BFD6] rounded-full transition-all duration-150 shadow-[0_0_8px_#59BFD6]"
                  style={{
                    width: '100%',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left center',
                  }}
                />
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* 
        ======================================================================
        VERSIÓN MÓVIL (SMARTPHONES): DESLIZAMIENTO TÁCTIL HORIZONTAL (SWIPE)
        Desplazamiento horizontal nativo con snap, fluido con el pulgar.
        ======================================================================
      */}
      <div className="block md:hidden py-16 px-4">
        {/* Encabezado Móvil */}
        <div className="px-2 mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.2em]">
            <Feather className="w-3 h-3 text-[#59BFD6]" />
            <span>CRÓNICAS DEL PUELCHE</span>
          </div>
          <h2 className="font-condensed text-3xl uppercase font-bold text-white tracking-tight">
            La Historia Detrás del Disparo
          </h2>
          <p className="font-sans text-xs text-white/70">
            Relatos de expedición y registro de campo en el territorio austral.
          </p>
        </div>

        {/* Carrusel Swipe Nativo */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 -mx-4 px-4">
          {STORIES.map((story) => (
            <article
              key={story.id}
              className="w-[88vw] shrink-0 snap-center rounded-[28px] overflow-hidden relative min-h-[580px] flex flex-col justify-end p-6 border border-white/15 shadow-2xl bg-black"
            >
              {/* Fotografía de Fondo con Máxima Luminosidad Austral */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  className="object-cover object-center"
                  sizes="88vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
              </div>

              {/* Contenido Flotante al Pie */}
              <div className="relative z-10 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#59BFD6]">
                    <MapPin className="w-3 h-3 text-[#59BFD6]" />
                    <span className="uppercase tracking-wider">{story.location}</span>
                  </div>
                  <h3 className="font-condensed text-2xl uppercase font-bold text-white leading-tight">
                    {story.title}
                  </h3>
                </div>

                <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md border-l-2 border-[#C29B63]">
                  <p className="font-serif italic text-xs text-white/95">
                    &ldquo;{story.curatorQuote}&rdquo;
                  </p>
                </div>

                <p className="font-sans text-xs text-white/80 line-clamp-3">
                  {story.chronicle}
                </p>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
                  <span className="font-mono text-[10px] text-white/60">
                    [ {story.num} / 04 ] &bull; {story.role}
                  </span>
                  <Link
                    href={`/portafolio?proyecto=${story.projectSlug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#59BFD6] text-puelche-dark font-condensed uppercase tracking-wider text-[11px] font-bold"
                  >
                    <span>Ver obra</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
