'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Compass, Sparkles, MapPin, Feather, Quote } from 'lucide-react';

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
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>('estancia-rilan');

  const toggleStory = (id: string) => {
    setExpandedStoryId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="cronicas-de-autor"
      aria-label="Crónicas del Puelche — Relatos Vivos de Autor"
      className="relative w-full bg-[#111215] text-white py-24 sm:py-32 md:py-40 px-6 sm:px-10 lg:px-16 border-t border-b border-white/[0.08] overflow-hidden"
    >
      {/* Resplandor ambiental orgánico en segundo plano */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#59BFD6]/[0.03] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#C29B63]/[0.03] blur-[160px] pointer-events-none" />

      {/* Marca de agua tipográfica suave */}
      <div className="absolute -top-12 right-10 select-none pointer-events-none opacity-[0.02] font-serif italic text-[16vw] font-normal text-white leading-none">
        Relatos
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Cabecera Editorial Empática */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em]">
            <Feather className="w-3.5 h-3.5 text-[#59BFD6]" />
            <span>CRÓNICAS DEL PUELCHE &bull; RELATOS DE CAMPO</span>
          </div>

          <h2 className="font-condensed text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight font-bold text-white leading-tight">
            La Historia Detrás <br />
            <span className="font-serif italic font-normal text-[#FAF8F5]/90 tracking-normal capitalize">
              del Disparo de Autor
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-white/75 font-light leading-relaxed">
            No creemos en la fotografía fría o distante. Cada imagen es el fruto de un encuentro humano: 
            madrugadas con pescadores, charlas con maestros carpinteros de tejuela y tardes de paciencia 
            esperando que la luz del sur revele la esencia de un lugar.
          </p>
        </div>

        {/* Lista de Relatos Vivos Expansivos (Siluetas de Canto Rodado) */}
        <div className="space-y-6">
          {STORIES.map((story) => {
            const isExpanded = expandedStoryId === story.id;
            return (
              <article
                key={story.id}
                className={`group relative rounded-[28px] sm:rounded-[36px] transition-all duration-700 overflow-hidden border ${
                  isExpanded
                    ? 'bg-[#18191E] border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.6)] ring-1 ring-[#59BFD6]/30'
                    : 'bg-[#151619] hover:bg-[#18191E] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Botón de Activación & Resumen del Relato */}
                <button
                  type="button"
                  onClick={() => toggleStory(story.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-6 sm:p-8 md:p-10 text-left flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-5 sm:gap-8">
                    {/* Número de Bitácora */}
                    <span className="font-mono text-sm sm:text-base text-[#59BFD6] font-semibold shrink-0 pt-1 sm:pt-0">
                      [ {story.num} ]
                    </span>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-white/50 uppercase tracking-wider">
                        <span className="text-[#C29B63] font-medium">{story.role}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1 text-white/70">
                          <MapPin className="w-3 h-3 text-[#59BFD6]" />
                          {story.location}
                        </span>
                      </div>

                      <h3 className="font-condensed text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide font-bold text-white group-hover:text-[#59BFD6] transition-colors">
                        {story.title}
                      </h3>

                      <p className="font-serif italic text-sm sm:text-base text-white/70 max-w-2xl line-clamp-1">
                        &ldquo;{story.fieldNote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Icono de Expansión Fluida */}
                  <div className="flex items-center gap-4 shrink-0 self-end md:self-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors hidden sm:inline">
                      {isExpanded ? 'Plegar relato' : 'Expandir relato'}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isExpanded
                          ? 'bg-[#59BFD6] border-[#59BFD6] text-puelche-dark rotate-180 shadow-[0_0_20px_rgba(89,191,214,0.4)]'
                          : 'bg-white/[0.04] border-white/15 text-white group-hover:bg-white/10 group-hover:border-white/30'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5 transition-transform duration-500" />
                    </div>
                  </div>
                </button>

                {/* Contenido Expansivo Orgánico (Crónica, Cita y Apuntes) */}
                {isExpanded && (
                  <div className="px-6 pb-8 sm:px-10 sm:pb-12 md:px-12 md:pb-14 pt-2 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-6">
                      {/* Fotografía de Autor en Marco Suave de Canto Rodado */}
                      <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[400px] rounded-[24px] overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
                        <Image
                          src={story.image}
                          alt={story.alt}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                        {/* Pie de foto documental */}
                        <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                          <span className="text-[#59BFD6] block font-medium mb-0.5">REGISTRO DE CAMPO</span>
                          <span className="text-white/80">{story.protagonist}</span>
                        </div>
                      </div>

                      {/* Crónica Editorial & Apuntes Humanos */}
                      <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                        <div className="space-y-6">
                          {/* Cita Editorial en Serif Cursiva */}
                          <div className="p-6 rounded-2xl bg-white/[0.03] border-l-2 border-[#C29B63] space-y-3">
                            <Quote className="w-5 h-5 text-[#C29B63]/60" />
                            <p className="font-serif italic text-lg sm:text-xl text-white/95 leading-relaxed font-light">
                              &ldquo;{story.curatorQuote}&rdquo;
                            </p>
                            <span className="font-mono text-xs uppercase tracking-widest text-[#C29B63] block">
                              &mdash; {story.quoteAuthor}
                            </span>
                          </div>

                          {/* Relato Documental */}
                          <div className="space-y-3">
                            <h4 className="font-condensed text-xs uppercase tracking-[0.25em] text-[#59BFD6] font-bold">
                              Crónica de la Expedición
                            </h4>
                            <p className="font-sans text-sm sm:text-base text-white/85 font-light leading-relaxed">
                              {story.chronicle}
                            </p>
                          </div>
                        </div>

                        {/* Apuntes Técnicos & Enlace */}
                        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[11px] text-white/60">
                            <div>
                              <span className="block text-white/40 uppercase">Momento Solar</span>
                              <span className="text-white/90">{story.expeditionDetails.hour}</span>
                            </div>
                            <div>
                              <span className="block text-white/40 uppercase">Clima</span>
                              <span className="text-white/90">{story.expeditionDetails.atmosphere}</span>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <span className="block text-white/40 uppercase">Óptica</span>
                              <span className="text-white/90">{story.expeditionDetails.lens}</span>
                            </div>
                          </div>

                          <Link
                            href={`/portafolio?proyecto=${story.projectSlug}`}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-[#59BFD6] text-white hover:text-puelche-dark font-condensed uppercase tracking-wider text-xs font-bold transition-all shadow-md shrink-0 hover:scale-105"
                          >
                            <span>Ver obra en archivo</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
