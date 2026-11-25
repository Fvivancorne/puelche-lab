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
  mobileTitle?: string;
  protagonist: string;
  role: string;
  location: string;
  image: string;
  alt: string;
  fieldNote: string;
  curatorQuote: string;
  mobileQuote?: string;
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
    title: 'Navegación en Río Puelo',
    mobileTitle: 'Expedición Fluvial en Río Puelo',
    protagonist: 'Tagua Tagua Lodge',
    role: 'Fotografía en Terreno & Hospitalidad',
    location: 'Río Puelo, Cochamó',
    image: '/images/real/bg-home-2.jpg',
    alt: 'Tagua Tagua Lodge: Navegación fluvial y cordillera en Río Puelo',
    fieldNote:
      'Documentación fotográfica de traslados náuticos e instalaciones del lodge en la cuenca cordillerana del Puelo.',
    curatorQuote:
      'La luz matinal sobre los farellones de granito y el paso de la barcaza en las aguas esmeralda del río.',
    mobileQuote:
      'Producción fotográfica de expedición y hotelería en la cuenca del Puelo.',
    quoteAuthor: 'Paula Valdivieso • Puelche Lab',
    chronicle:
      'Para Tagua Tagua Lodge registramos la experiencia de navegación fluvial hacia el lodge y sus instalaciones en la cuenca cordillerana, destacando la relación entre el entorno natural y la estadía de montaña.',
    expeditionDetails: {
      hour: '07:20 AM • Luz Matinal',
      atmosphere: 'Bruma fluvial & 6°C',
      lens: '24-70mm f/2.8 Pro',
    },
    projectSlug: 'tagua-tagua-lodge',
  },
  {
    id: 'nazca-oceanografia',
    num: '02',
    title: 'Robótica Submarina & Oceanografía',
    mobileTitle: 'Operaciones en Seno de Reloncaví',
    protagonist: 'Tripulación Técnica • Nazca Oceanografía',
    role: 'Oceanografía & Inspección Submarina',
    location: 'Puerto Montt • Seno de Reloncaví',
    image: '/images/real/facebook/fb-nazca-1.jpg',
    alt: 'Nazca Oceanografía: Robótica submarina y equipo técnico en faena marítima',
    fieldNote:
      'Registro en terreno durante la operación del robot DEFENDER en aguas del seno. Documentamos las maniobras de cubierta y el monitoreo batimétrico.',
    curatorQuote:
      'Documentar faenas en el mar exige sincronía con la tripulación y respuesta inmediata ante las condiciones del canal.',
    mobileQuote:
      'Registro técnico en terreno para robótica submarina e inspección marítima.',
    quoteAuthor: 'Puelche Lab • Producción en Terreno',
    chronicle:
      'Acompañamos las faenas de Nazca Oceanografía para documentar la operación del robot submarino DEFENDER. Realizamos registro documental continuo en cubierta y puente de mando, capturando el trabajo técnico en aguas del Seno de Reloncaví.',
    expeditionDetails: {
      hour: '11:45 AM • Faena en Terreno',
      atmosphere: 'Aguas del Seno & 11°C',
      lens: '35mm f/1.4 Weather-Sealed',
    },
    projectSlug: 'nazca-oceanografia-puertomontt',
  },
  {
    id: 'cohosting-chile',
    num: '03',
    title: 'Arquitectura & Hospitalidad Austral',
    mobileTitle: 'Residencia Contemporánea en Lago Llanquihue',
    protagonist: 'CoHosting Chile',
    role: 'Fotografía de Interiores',
    location: 'Puerto Varas & Lago Llanquihue',
    image: '/images/real/facebook/fb-cohosting-1.jpg',
    alt: 'CoHosting Chile: Interiorismo contemporáneo y vistas abiertas en Puerto Varas',
    fieldNote:
      'Sesión de interiores aprovechando la luz natural indirecta de la tarde para destacar maderas nativas y líneas contemporáneas.',
    curatorQuote:
      'Fotografía de arquitectura que comunica la escala, los materiales nobles y la habitabilidad real de cada espacio.',
    mobileQuote:
      'Registro de interiores con luz natural y fidelidad en texturas de maderas nativas.',
    quoteAuthor: 'Puelche Lab • Fotografía de Arquitectura',
    chronicle:
      'Para CoHosting Chile documentamos residencias en la cuenca del lago Llanquihue, utilizando luz natural para reflejar la calidez y el diseño de espacios concebidos para estadías de descanso.',
    expeditionDetails: {
      hour: '16:15 PM • Luz Natural',
      atmosphere: 'Atmósfera despejada & 17°C',
      lens: '16-35mm Architectural Prime',
    },
    projectSlug: 'cohosting-chile',
  },
  {
    id: 'cabo-de-hornos',
    num: '04',
    title: 'Patrimonio & Hotelería en Magallanes',
    mobileTitle: 'Hotel Cabo de Hornos en Punta Arenas',
    protagonist: 'Hotel Cabo de Hornos',
    role: 'Fotografía Institucional & Arquitectura',
    location: 'Punta Arenas • Estrecho de Magallanes',
    image: '/images/real/bg-portafolios-fotografia-d-min.jpg',
    alt: 'Hotel Cabo de Hornos: Arquitectura histórica frente al Estrecho de Magallanes',
    fieldNote:
      'Registro fotográfico de salones, maderas labradas y fachada histórica en la plaza principal de Punta Arenas.',
    curatorQuote:
      'Testimonio visual de una arquitectura clásica que ha recibido a exploradores y viajeros durante décadas en el extremo austral.',
    mobileQuote:
      'Fotografía editorial para uno de los hoteles históricos más emblemáticos de la Patagonia.',
    quoteAuthor: 'Puelche Lab • Producción Fotográfica',
    chronicle:
      'En la plaza Muñoz Gamero de Punta Arenas, documentamos los interiores señoriales del Hotel Cabo de Hornos: maderas nobles, iluminación cálida y vistas hacia el estrecho, preservando la identidad del recinto.',
    expeditionDetails: {
      hour: '19:40 PM • Hora Azul',
      atmosphere: 'Viento & 4°C',
      lens: '50mm f/1.4 Prime',
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
      aria-label="Crónicas del Puelche: Relatos Vivos de Autor"
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
          {/* Track Horizontal de Obras */}
          <div
            ref={trackRef}
            className="stories-desktop-track flex h-full will-change-transform"
            style={{
              width: `${STORIES.length * 100}vw`,
            }}
          >
            {STORIES.map((story, idx) => {
              // Historias impares (0, 2) → Inmersión a sangre: foto domina, texto superpuesto
              // Historias pares (1, 3)  → Split: tarjeta flotante lateral
              const isImmersive = idx % 2 === 0;

              return (
              <div
                key={story.id}
                className={`stories-desktop-slide w-screen h-full shrink-0 relative flex items-center py-16 ${
                  isImmersive
                    ? 'justify-center px-8 md:px-16'
                    : 'justify-end px-8 md:px-16 lg:px-24'
                }`}
              >
                {/* Fotografía Monumental de Fondo Completo */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center scale-105 transition-transform duration-1000"
                    sizes="100vw"
                  />
                  {isImmersive ? (
                    /* Inmersión: gradiente suave de abajo para texto legible */
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  ) : (
                    /* Split: gradiente lateral derecho para tarjeta */
                    <div className="absolute inset-y-0 right-0 w-full md:w-3/5 bg-gradient-to-l from-black/55 via-black/20 to-transparent pointer-events-none" />
                  )}
                </div>

                {isImmersive ? (
                  /* ═══ MODO INMERSIÓN A SANGRE ═══ */
                  <article className="relative z-10 max-w-3xl w-full flex flex-col items-start justify-end h-full pb-24 space-y-4">
                    <div className="text-xs font-mono text-[#59BFD6] uppercase tracking-[0.2em]">
                      {story.location}
                    </div>

                    <h3 className="font-condensed text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight font-bold text-white leading-[0.95] drop-shadow-2xl">
                      {story.title}
                    </h3>

                    <p className="font-serif italic text-lg sm:text-xl text-white/90 leading-relaxed font-light max-w-xl drop-shadow-lg">
                      &ldquo;{story.curatorQuote}&rdquo;
                    </p>

                    <div className="pt-4 flex items-center gap-6">
                      <span className="font-mono text-xs text-white/50 tracking-wide">
                        {story.num} / 04
                      </span>
                      <Link
                        href={`/portafolio?proyecto=${story.projectSlug}`}
                        className="group inline-flex items-center gap-2 font-condensed uppercase tracking-wider text-sm text-white/80 hover:text-[#59BFD6] transition-colors"
                      >
                        <span>Ver obra</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ) : (
                  /* ═══ MODO SPLIT: TARJETA FLOTANTE LATERAL ═══ */
                  <article className="relative z-10 max-w-lg w-full bg-black/40 backdrop-blur-md rounded-3xl border border-white/20 p-7 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.6)] space-y-5">
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-[#59BFD6] uppercase tracking-[0.2em]">
                        {story.location}
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
                        {story.quoteAuthor}
                      </span>
                    </div>

                    {/* CTA Discreto — enlace con flecha, no botón sólido */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-xs text-white/50 tracking-wide">
                        {story.num} / 04 &bull; {story.role}
                      </span>

                      <Link
                        href={`/portafolio?proyecto=${story.projectSlug}`}
                        className="group inline-flex items-center gap-2 font-condensed uppercase tracking-wider text-xs text-white/70 hover:text-[#59BFD6] transition-colors"
                      >
                        <span>Ver obra</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </article>
                )}
              </div>
              );
            })}
          </div>

          {/* Barra de Progreso Austral en la Base */}
          <footer className="stories-desktop-progress absolute bottom-6 left-8 right-8 md:left-16 md:right-16 z-30 flex items-center justify-between text-xs font-mono text-white/80 bg-black/70 backdrop-blur-md px-6 py-3.5 rounded-full border border-white/15 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[#59BFD6] font-bold tracking-wider">
                {activeStory.num} / 04
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
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#59BFD6]">
            Relatos de Expedición
          </span>
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
                  <div className="text-xs font-mono text-[#59BFD6] uppercase tracking-[0.2em]">
                    {story.location}
                  </div>
                  <h3 className="font-condensed text-2xl uppercase font-bold text-white leading-tight">
                    {story.mobileTitle || story.title}
                  </h3>
                </div>

                <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md border-l-2 border-[#C29B63]">
                  <p className="font-serif italic text-xs text-white/95">
                    &ldquo;{story.mobileQuote || story.curatorQuote}&rdquo;
                  </p>
                </div>

                <p className="font-sans text-xs text-white/80 line-clamp-3">
                  {story.chronicle}
                </p>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
                  <span className="font-mono text-[10px] text-white/60">
                    {story.num} / 04 &bull; {story.role}
                  </span>
                  <Link
                    href={`/portafolio?proyecto=${story.projectSlug}`}
                    className="inline-flex items-center gap-1.5 font-condensed uppercase tracking-wider text-[11px] text-white/70 hover:text-[#59BFD6] transition-colors"
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
