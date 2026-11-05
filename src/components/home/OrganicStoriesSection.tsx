'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Feather, Quote, Compass } from 'lucide-react';

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
    id: 'estancia-rilan',
    num: '01',
    title: 'El Silencio de las Tejuelas',
    protagonist: 'Maestros Carpinteros de Rilán',
    role: 'Oficio Tradicional Chilote',
    location: 'Península de Rilán, Chiloé',
    image: '/images/real/bg-portafolios-fotografia-a-min.jpg',
    alt: 'Estancia Rilán en Chiloé — Arquitectura de tejuela y niebla matinal',
    fieldNote:
      'Llegamos antes del alba. La humedad del mar interior envolvía la estructura de alerce. No buscamos iluminar el espacio con artificios: dejamos que la penumbra hablara del oficio de cortar la madera con hacha.',
    curatorQuote:
      'La arquitectura en el sur no compite con el paisaje; se rinde ante él para resistir el invierno.',
    quoteAuthor: 'Paula Valdivieso • Dirección de Arte',
    chronicle:
      'En Chiloé la madera respira y tiene memoria. Para registrar Estancia Rilán esperamos tres días hasta que el viento sur despejó la bruma marina durante apenas cuarenta minutos. Ese instante de luz rasante doró cada tejuela de alerce cortada a mano, revelando las hendiduras que sólo el ojo paciente sabe encontrar.',
    expeditionDetails: {
      hour: '06:45 AM • Luz Rasante',
      atmosphere: 'Bruma marina & 8°C',
      lens: '35mm Fine Art Prime',
    },
    projectSlug: 'estancia-rilan-chile',
  },
  {
    id: 'arrebol-patagonia',
    num: '02',
    title: 'El Refugio Entre los Coigües',
    protagonist: 'Familia Fundadora & Arquitectos',
    role: 'Hospitalidad de Autor',
    location: 'Cerros de Puerto Varas',
    image: '/images/real/instagram/ig-DNRhZyEOL7E.webp',
    alt: 'Hotel Arrebol Patagonia — Arquitectura de maderas nobles en Puerto Varas',
    fieldNote:
      'El olor a leña y ciprés de las guaitecas te recibe antes de cruzar la puerta. Retratar un hogar austral exige bajar el ritmo, escuchar el crepitar del fuego y captar la calidez que abriga al viajero.',
    curatorQuote:
      'Un buen retrato de interiores no muestra cómo es una habitación: transmite cómo se siente descansar en ella.',
    quoteAuthor: 'Crónica de Expedición Puelche Lab',
    chronicle:
      'Emplazado en una loma con vista panorámica al lago Llanquihue, Hotel Arrebol fue concebido como un refugio donde la veta de la madera nativa dialoga con los ventanales hacia los volcanes. Nuestro encargo fue capturar la experiencia íntima del hospedaje: la textura táctil de los telares de lana, el vapor de una taza de café recién hecha y el atardecer tiñendo de carmín las vigas de roble.',
    expeditionDetails: {
      hour: '18:15 PM • Golden Hour Austral',
      atmosphere: 'Luz cálida de atardecer',
      lens: '50mm f/1.4 Natural Light',
    },
    projectSlug: 'hotel-arrebol-patagonia',
  },
  {
    id: 'nazca-oceanografia',
    num: '03',
    title: 'Ojos en las Profundidades',
    protagonist: 'Tripulación de Robótica Submarina',
    role: 'Oceanografía & Buceo Técnico',
    location: 'Seno de Reloncaví & Océano Pacífico',
    image: '/images/real/instagram/ig-DU38TZDDgR0.webp',
    alt: 'Nazca Oceanografía — Robótica submarina y equipo técnico en faena marítima',
    fieldNote:
      'En la cubierta de un barco de investigación a merced del oleaje, cada segundo cuenta. Buscamos el rostro concentrado del piloto del ROV mientras desciende a doscientos metros bajo el mar.',
    curatorQuote:
      'La técnica más sofisticada carece de sentido si detrás no se siente el pulso humano de quienes desafían el mar.',
    quoteAuthor: 'Bitácora Marina Puelche Lab',
    chronicle:
      'Navegamos junto al equipo de Nazca en jornadas de frío polar para documentar la inspección submarina de cables y fondos marinos. Combinamos sobrevuelos de dron a baja cota sobre el canal Tenglo con fotografía documental en el puente de mando, capturando la camaradería y la precisión milimétrica de hombres que operan tecnología de punta en aguas australes.',
    expeditionDetails: {
      hour: '11:20 AM • Luz Cenital Nubosa',
      atmosphere: 'Viento Puelche 22 nudos',
      lens: '24-70mm f/2.8 Weather Sealed',
    },
    projectSlug: 'nazca-oceanografia-puertomontt',
  },
  {
    id: 'residencia-frutillar',
    num: '04',
    title: 'La Casa del Lago y el Silencio',
    protagonist: 'Estudio de Arquitectura Bioclimática',
    role: 'Residencia en el Lago',
    location: 'Frutillar, Cuenca Llanquihue',
    image: '/images/real/instagram/ig-DNRk49ptN7H.webp',
    alt: 'Residencia en Frutillar — Arquitectura de madera reflejada en el agua',
    fieldNote:
      'Esperamos el momento exacto en que la brisa del lago se calmó por completo. El agua de la piscina se convirtió en un espejo absoluto que duplicó la calidez de las maderas y el cielo azul.',
    curatorQuote:
      'Fotografiar arquitectura es aprender a dialogar con la geometría y esperar a que el sol complete la obra.',
    quoteAuthor: 'Dirección de Arte Puelche Lab',
    chronicle:
      'Encargada por CoHosting Chile, esta imponente residencia en Frutillar requería una mirada que equilibrara la modernidad de sus líneas con la nobleza de su emplazamiento rural. Cada encuadre fue compuesto honrando la relación entre el interior calefaccionado y la inmensidad del paisaje exterior.',
    expeditionDetails: {
      hour: '16:40 PM • Cielo Despejado',
      atmosphere: 'Silencio absoluto & 19°C',
      lens: '16-35mm Architectural Tilt-Shift',
    },
    projectSlug: 'turistour-expediciones',
  },
];

export function OrganicStoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          if (totalScrollable <= 0) return;

          // Progress va de 0 a 1 mientras la sección cruza la pantalla
          const currentProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
          setScrollProgress(currentProgress);

          const storyIndex = Math.min(
            STORIES.length - 1,
            Math.floor(currentProgress * STORIES.length)
          );
          setActiveStoryIdx(storyIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
        className="hidden md:block relative w-full h-[350vh]"
      >
        <div className="sticky top-0 w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between">
          {/* Cabecera Flotante Discreta */}
          <header className="absolute top-6 left-8 md:left-16 z-30 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em]">
              <Feather className="w-3.5 h-3.5 text-[#59BFD6]" />
              <span>CRÓNICAS DEL PUELCHE</span>
            </div>
          </header>

          {/* Track Horizontal de Obras */}
          <div
            className="flex h-full will-change-transform transition-transform ease-out duration-100"
            style={{
              width: `${STORIES.length * 100}vw`,
              transform: `translate3d(-${scrollProgress * (STORIES.length - 1) * 100}vw, 0, 0)`,
            }}
          >
            {STORIES.map((story, idx) => (
              <div
                key={story.id}
                className="w-screen h-full shrink-0 relative flex items-center justify-end px-8 md:px-16 lg:px-24 py-16"
              >
                {/* Fotografía Monumental de Fondo Completo (100% Pantalla) */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center scale-105 transition-transform duration-1000"
                    sizes="100vw"
                  />
                  {/* Gradiente cinemático de alto contraste para garantizar 100% legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/90 pointer-events-none" />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </div>

                {/* Tarjeta Flotante de Cristal Oscuro con el Relato */}
                <article className="relative z-10 max-w-xl w-full bg-[#111215]/85 backdrop-blur-md rounded-[28px] sm:rounded-[36px] border border-white/15 p-8 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] space-y-6">
                  {/* Metadata de Cabecera */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs text-[#59BFD6]">
                      <span className="font-bold tracking-wider">[ {story.num} / 04 ]</span>
                      <span className="text-[#C29B63] uppercase tracking-wider">{story.role}</span>
                    </div>

                    <h3 className="font-condensed text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight font-bold text-white leading-tight">
                      {story.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-white/60">
                      <MapPin className="w-3.5 h-3.5 text-[#59BFD6]" />
                      <span>{story.location}</span>
                    </div>
                  </div>

                  {/* Cita Editorial en Serif Cursiva */}
                  <div className="p-5 rounded-2xl bg-white/[0.04] border-l-2 border-[#C29B63] space-y-2">
                    <Quote className="w-4 h-4 text-[#C29B63]/70" />
                    <p className="font-serif italic text-base sm:text-lg text-white/95 leading-relaxed font-light">
                      &ldquo;{story.curatorQuote}&rdquo;
                    </p>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#C29B63] block">
                      &mdash; {story.quoteAuthor}
                    </span>
                  </div>

                  {/* Crónica de Campo */}
                  <div className="space-y-2">
                    <span className="font-condensed text-xs uppercase tracking-[0.25em] text-[#59BFD6] font-bold block">
                      Crónica de Expedición
                    </span>
                    <p className="font-sans text-sm sm:text-base text-white/85 font-light leading-relaxed line-clamp-4">
                      {story.chronicle}
                    </p>
                  </div>

                  {/* Bitácora Técnica & CTA */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="grid grid-cols-2 gap-3 font-mono text-[10px] text-white/60">
                      <div>
                        <span className="block text-white/40 uppercase">Momento Solar</span>
                        <span className="text-white/90">{story.expeditionDetails.hour}</span>
                      </div>
                      <div>
                        <span className="block text-white/40 uppercase">Óptica</span>
                        <span className="text-white/90">{story.expeditionDetails.lens}</span>
                      </div>
                    </div>

                    <Link
                      href={`/portafolio?proyecto=${story.projectSlug}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#59BFD6] hover:bg-white text-puelche-dark font-condensed uppercase tracking-wider text-xs font-bold transition-all shadow-md shrink-0 hover:scale-105"
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
          <footer className="absolute bottom-6 left-8 right-8 md:left-16 md:right-16 z-30 flex items-center justify-between text-xs font-mono text-white/80 bg-black/70 backdrop-blur-md px-6 py-3.5 rounded-full border border-white/15 shadow-2xl">
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
                  className="h-full bg-[#59BFD6] rounded-full transition-all duration-150 shadow-[0_0_8px_#59BFD6]"
                  style={{
                    width: `${Math.max(8, scrollProgress * 100)}%`,
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
              {/* Fotografía de Fondo */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  className="object-cover object-center"
                  sizes="88vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Contenido Flotante al Pie */}
              <div className="relative z-10 space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#59BFD6] font-bold block">
                    [ {story.num} / 04 ] &bull; {story.role}
                  </span>
                  <h3 className="font-condensed text-2xl uppercase font-bold text-white leading-tight">
                    {story.title}
                  </h3>
                  <span className="font-mono text-[11px] text-white/60 block">
                    {story.location}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/60 backdrop-blur-md border-l-2 border-[#C29B63]">
                  <p className="font-serif italic text-xs text-white/90">
                    &ldquo;{story.curatorQuote}&rdquo;
                  </p>
                </div>

                <p className="font-sans text-xs text-white/80 line-clamp-3">
                  {story.chronicle}
                </p>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
                  <span className="font-mono text-[10px] text-white/50">
                    {story.expeditionDetails.hour}
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
