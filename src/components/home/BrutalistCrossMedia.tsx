'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown, Camera, Sparkles, Wind, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Capability {
  id: string;
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  spec: string;
  meta: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'estudio',
    num: '01',
    tag: 'ESPACIO & SET',
    title: 'Luz de Estudio',
    subtitle: 'En Puerto Varas',
    description:
      'Set propio de fotografía y dirección de arte en el centro de Puerto Varas. Un espacio cálido y controlado para bodegones de autor, producto noble, retratos corporativos y sesiones editoriales.',
    image: '/images/real/bg-portafolios-fotografia-d-min.jpg',
    alt: 'Estudio de fotografía y set de trabajo Puelche Lab en Puerto Varas',
    spec: 'Maderas nativas • Luz suave • Bodegón de autor',
    meta: 'Sede Puerto Varas • Cuenca Llanquihue',
    icon: Camera,
  },
  {
    id: 'aereo',
    num: '02',
    tag: 'PAISAJE & ESCALA',
    title: 'Tierra y Aire',
    subtitle: 'Mirada Territorial',
    description:
      'Captura integral a ras de suelo y desde las alturas. Retratamos la inmensidad de la Patagonia: arquitectura bioclimática, campos agropecuarios, hoteles de madera y el silencio de los fiordos.',
    image: '/images/real/bg-fotografia-9-min.jpg',
    alt: 'Fotografía aérea y de territorio austral — Puelche Lab',
    spec: 'Perspectiva aérea • Escala de paisaje • Luz natural',
    meta: 'Los Lagos, Chiloé & Fiordos Australes',
    icon: Wind,
  },
  {
    id: 'iluminacion',
    num: '03',
    tag: 'OFICIO & MATERIA',
    title: 'Modelado de Luz',
    subtitle: 'Texturas Nobles',
    description:
      'Esculpimos la atmósfera con iluminación de alta fidelidad, diseñando contrastes suaves que honran la veta de las maderas, la frescura gastronómica, la arquitectura y la identidad viva de tu marca.',
    image: '/images/real/bg-portafolios-fotografia-a-min.jpg',
    alt: 'Set de iluminación profesional y modelado óptico Puelche Lab',
    spec: 'Atmósfera envolvente • Fidelidad cromática • Detalle táctil',
    meta: 'Dirección de Arte de Autor',
    icon: Sparkles,
  },
  {
    id: 'crossmedia',
    num: '04',
    tag: 'SISTEMAS VIVOS',
    title: 'Cross-Media',
    subtitle: 'Digital, Impreso & Cine',
    description:
      'Concebimos sistemas visuales completos con raíz en el territorio: plataformas web interactivas en Next.js, memorias editoriales en papeles finos, piezas audiovisuales y relatos para redes.',
    image: '/images/real/bg-portafolios-fotografia-b-min.jpg',
    alt: 'Diseño Cross Media: digital, impreso y audiovisual Puelche Lab',
    spec: 'Diseño editorial fine art • Web artesanal • Piezas cinematográficas',
    meta: 'Ecosistema de Marca Integral',
    icon: Layers,
  },
];

export function BrutalistCrossMedia() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const manifestoContainerRef = useRef<HTMLDivElement>(null);
  const manifestoLeftRef = useRef<HTMLDivElement>(null);
  const manifestoRightRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);

  // Coreografía Direccional del Viento con Pinned Stage, Resistencia Física (1.4s) y Cortina Óptica
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();

    // ── DESKTOP (>= 1024px): Pinned Stage Awwwards con Resistencia Media-Alta (200% scroll, scrub: 1.4s) ──
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 1.4, // Resistencia noble y orgánica con damping físico
            anticipatePin: 1,
          },
        });

        // 1. Fotografía de fondo: Apertura óptica de diafragma y sutil zoom
        if (bgWrapperRef.current) {
          pinTl.fromTo(
            bgWrapperRef.current,
            { scale: 1.15, filter: 'brightness(0.75)' },
            { scale: 1.04, filter: 'brightness(1)', ease: 'none', duration: 0.4 },
            0
          );
        }

        // 2. Titular "¿QUÉ ES CROSS MEDIA?": Ensamblado de izquierda a derecha con máscara óptica
        if (headlineRef.current) {
          pinTl.fromTo(
            headlineRef.current,
            { x: -160, opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' },
            { x: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.35 },
            0.04
          );
        }

        if (subheadRef.current) {
          pinTl.fromTo(
            subheadRef.current,
            { x: -100, opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' },
            { x: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.35 },
            0.08
          );
        }

        // 3. Cortina Óptica del Manifiesto Asimétrico (Se va armando para ponerse con fricción):
        // Tarjeta Izquierda (7 cols): Obturador que se corre de izquierda a derecha
        if (manifestoLeftRef.current) {
          pinTl.fromTo(
            manifestoLeftRef.current,
            { x: -120, opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' },
            { x: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.45 },
            0.12
          );
        }

        // Tarjeta Derecha (5 cols descolgada): Obturador opuesto que se corre de derecha a izquierda
        if (manifestoRightRef.current) {
          pinTl.fromTo(
            manifestoRightRef.current,
            { x: 120, opacity: 0, clipPath: 'inset(0% 0% 0% 100%)' },
            { x: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.45 },
            0.16
          );
        }

        // 4. MESETA DE LECTURA 100% ILUMINADA: Las tarjetas permanecen al 100% de opacidad y brillo
        // ¡NUNCA se oscurecen ni se desvanecen! Permanecen legibles durante todo el anclaje.
        if (cardsContainerRef.current) {
          const cards = cardsContainerRef.current.children;
          pinTl.fromTo(
            cards,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.05, ease: 'power2.out', duration: 0.35 },
            0.6
          );
        }
      }, section);

      return () => ctx.revert();
    });

    // ── MÓVIL Y TABLET (< 1024px): Scroll natural con revelado de obturador sin Pin ──
    media.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        if (headlineRef.current) {
          gsap.fromTo(
            headlineRef.current,
            { x: -60, opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' },
            {
              x: 0,
              opacity: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: headlineRef.current,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 1.0,
              },
            }
          );
        }

        if (manifestoLeftRef.current) {
          gsap.fromTo(
            manifestoLeftRef.current,
            { x: -50, opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' },
            {
              x: 0,
              opacity: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: manifestoLeftRef.current,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1.0,
              },
            }
          );
        }

        if (manifestoRightRef.current) {
          gsap.fromTo(
            manifestoRightRef.current,
            { x: 50, opacity: 0, clipPath: 'inset(0% 0% 0% 100%)' },
            {
              x: 0,
              opacity: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: manifestoRightRef.current,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1.0,
              },
            }
          );
        }

        if (cardsContainerRef.current) {
          const cards = cardsContainerRef.current.children;
          gsap.fromTo(
            cards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: 'top 90%',
                end: 'top 55%',
                scrub: 1.0,
              },
            }
          );
        }
      }, section);

      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cross-media"
      aria-label="El Manifiesto del Puelche y Capacidades Cross Media"
      className="relative w-full min-h-screen flex flex-col justify-between py-10 sm:py-12 md:py-14 px-6 md:px-12 lg:px-16 overflow-hidden bg-puelche-dark text-white select-none"
    >
      {/* 
        ======================================================================
        SISTEMA DE FONDOS CON MORPHING CINEMÁTICO (VELO LUMINOSO DE ALTO CONTRASTE)
        El velo se alivia para que las fotografías se noten nítidas y vibrantes
        ======================================================================
      */}
      <div ref={bgWrapperRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden scale-110">
        {/* Fondo Base / Reposo */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            activeIdx === null ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } transform transition-transform duration-1000`}
        >
          <Image
            src="/images/real/bg-home-2.jpg"
            alt="Patagonia Austral — Pastizal y Lago Puelche Lab"
            fill
            priority={false}
            className="object-cover"
          />
        </div>

        {/* Fondos Reactivos según la Capacidad Seleccionada */}
        {CAPABILITIES.map((cap, i) => (
          <div
            key={cap.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              activeIdx === i ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            } transform transition-transform duration-1000`}
          >
            <Image
              src={cap.image}
              alt={cap.alt}
              fill
              priority={false}
              className="object-cover"
            />
          </div>
        ))}

        {/* Velo Dinámico de Alto Contraste: Ligero y luminoso para que la foto brille con luz natural */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            activeIdx !== null
              ? 'bg-gradient-to-b from-[#1D2024]/50 via-transparent to-[#1D2024]/70 backdrop-brightness-105'
              : 'bg-gradient-to-b from-[#1D2024]/40 via-transparent to-[#1D2024]/65 backdrop-brightness-100'
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(29,32,36,0.45)_100%)] pointer-events-none" />
      </div>

      {/* Contenido Superior / Encabezado de Sección */}
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-6 sm:space-y-7">
        {/* Meta Bar Superior: Estilo Editorial */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-3 text-xs uppercase tracking-widest text-white/75 font-condensed">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-puelche-cyan" />
            <span className="text-white font-bold tracking-[0.2em]">VIENTO CREATIVO &bull; MANIFIESTO DE AUTOR</span>
          </div>
          <div className="flex items-center gap-3 text-puelche-cyan">
            <span className="font-medium">PUERTO VARAS &bull; REGIÓN DE LOS LAGOS</span>
            <span className="hidden sm:inline text-white/40 font-serif italic lowercase tracking-normal">patagonia chilena</span>
          </div>
        </div>

        {/* Titular Monumental */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-puelche-cyan font-condensed text-[11px] sm:text-xs uppercase tracking-wider">
              <span>ESTUDIO CROSS MEDIA &bull; PUERTO VARAS</span>
            </div>

            {/* Indicador Suave de Vista Activa */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-puelche-cyan/30 text-white/90 font-serif italic text-[11px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-puelche-cyan" />
              <span>{activeIdx !== null ? CAPABILITIES[activeIdx].title : 'Panorámica Austral'}</span>
            </div>
          </div>

          <h2
            ref={headlineRef}
            className="font-condensed text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-white leading-[0.88] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
          >
            ¿QUÉ ES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-puelche-cyan">
              CROSS MEDIA?
            </span>
          </h2>

          <p
            ref={subheadRef}
            className="font-serif italic text-base sm:text-xl md:text-2xl text-puelche-cyan font-normal max-w-3xl leading-snug drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]"
          >
            El arte de concebir piezas gráficas y cinematográficas para todos los soportes.
          </p>
        </div>

        {/* Manifiesto Editorial Suizo: Asimetría 7/5 con Cortina Óptica y Aire Territorial */}
        <div
          ref={manifestoContainerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-4 border-t border-white/15 font-sans overflow-hidden will-change-transform"
        >
          {/* Columna Izquierda (7 Cols): Declaración Monumental de Gran Formato */}
          <div
            ref={manifestoLeftRef}
            className="lg:col-span-7 flex flex-col justify-between space-y-4 bg-[#0e0f13]/90 backdrop-blur-xl p-6 sm:p-8 lg:p-9 rounded-[28px] sm:rounded-[32px] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden group will-change-transform"
          >
            {/* Velo de Iluminación Suave en Hover */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#59BFD6]/[0.06] rounded-full blur-3xl pointer-events-none group-hover:bg-[#59BFD6]/[0.12] transition-colors duration-700" />

            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#59BFD6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse" />
                <span>ESTUDIO DE AUTOR &bull; PUERTO VARAS</span>
              </div>

              <p className="text-white font-medium text-xl sm:text-2xl lg:text-3xl font-condensed uppercase tracking-tight leading-tight drop-shadow-md">
                Somos un Estudio de Diseño Cross Media y Fotografía en Puerto Varas.
              </p>
            </div>

            <p className="text-white/85 font-light text-sm sm:text-base lg:text-lg leading-relaxed relative z-10 max-w-2xl border-l-2 border-[#59BFD6]/40 pl-4 sm:pl-5">
              Pero, <span className="italic font-serif text-white font-normal">¿Qué es Cross Media?</span> Nos referimos a que creamos piezas visuales para todos los medios, ya sean digitales, impresos y/o audiovisuales.
            </p>
          </div>

          {/* Columna Derecha (5 Cols, Asimétrica Descolgada): Laboratorio Técnico & Equipo */}
          <div
            ref={manifestoRightRef}
            className="lg:col-span-5 lg:translate-y-4 flex flex-col justify-between space-y-4 bg-[#14151a]/85 backdrop-blur-xl p-6 sm:p-7 rounded-[28px] sm:rounded-[32px] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative overflow-hidden group will-change-transform"
          >
            <div className="space-y-2 relative z-10">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-white/50">
                INFRAESTRUCTURA &bull; EXPEDICIÓN
              </span>
              <p className="font-light text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed">
                Contamos con un estudio de fotografía y grabación muy bien equipado, iluminación profesional y equipos de alta gama, tanto en tierra firme como desde el aire con dron 4K, haciendo resaltar tu producto o servicio para que pase al frente en la vitrina del mercado.
              </p>
            </div>

            {/* Píldoras Táctiles con Acabado de Cuarto Oscuro */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10 font-mono text-[11px] text-white/80 relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90">
                Fotografía de autor
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90">
                Set propio
              </span>
              <span className="px-3 py-1 rounded-full bg-[#59BFD6]/15 text-[#59BFD6] border border-[#59BFD6]/30 font-medium">
                Territorio austral
              </span>
            </div>
          </div>
        </div>

        {/* 
          ======================================================================
          GRILLA EDITORIAL DE 4 EXPRESIONES DEL OFICIO
          ======================================================================
        */}
        <div className="pt-6">
          <div className="flex items-center justify-between pb-4 text-xs font-condensed uppercase tracking-wider text-white/70">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-puelche-cyan" />
              <span className="font-bold text-white tracking-widest">CUATRO DIMENSIONES DE NUESTRO OFICIO</span>
            </span>
          </div>

          <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              const isSelected = activeIdx === i;

              return (
                <div
                  key={cap.id}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => setActiveIdx(i)}
                  className={`group relative p-6 sm:p-7 rounded-[28px] border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden backdrop-blur-md ${
                    isSelected
                      ? 'bg-[#1D2024]/95 border-puelche-cyan/70 shadow-[0_20px_50px_rgba(0,0,0,0.6)] -translate-y-2'
                      : 'bg-[#1D2024]/70 border-white/10 hover:border-white/30 hover:bg-[#1D2024]/85'
                  }`}
                  data-cursor="VER"
                >
                  {/* Cabecera de la Tarjeta */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif italic text-3xl sm:text-4xl text-puelche-cyan drop-shadow-md">
                        {cap.num}
                      </span>
                      <div
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isSelected
                            ? 'bg-puelche-cyan text-puelche-dark border-puelche-cyan shadow-md'
                            : 'bg-white/5 text-white/70 border-white/10 group-hover:text-puelche-cyan'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Mini-Ventana Fotográfica de la Tarjeta */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 group-hover:border-puelche-cyan/40 transition-colors shadow-inner">
                      <Image
                        src={cap.image}
                        alt={cap.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                        <span className="font-condensed uppercase tracking-wider text-puelche-cyan font-bold truncate">{cap.tag}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-condensed text-2xl font-bold uppercase tracking-wider text-white group-hover:text-puelche-cyan transition-colors">
                        {cap.title}
                      </h3>
                      <p className="font-serif italic text-xs sm:text-sm text-puelche-cyan font-normal tracking-wide">
                        {cap.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                      {cap.description}
                    </p>
                  </div>

                  {/* Micro-Metadata Editorial al pie */}
                  <div className="pt-4 mt-4 border-t border-white/10 text-xs text-white/60 space-y-1">
                    <div className="text-white/85 font-medium truncate font-sans text-[11px]">{cap.spec}</div>
                    <div className="text-puelche-cyan font-serif italic text-[11px]">{cap.meta}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fila de Acciones y Conversión */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-6 border-t border-white/15">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/portafolio"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-puelche-cyan text-[#1D2024] font-condensed uppercase tracking-wider text-sm font-bold hover:bg-white transition-all shadow-lg hover:scale-105"
            >
              <span>Explorar Obras</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="#footer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#3B3D42] bg-puelche-slate border border-white/20 text-white font-condensed uppercase tracking-wider text-sm font-medium hover:bg-white/20 transition-all"
            >
              <span>Contáctanos</span>
              <ArrowDown className="w-4 h-4 text-puelche-cyan" />
            </a>
          </div>

          <div className="text-xs text-white/70 font-sans hidden md:flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-puelche-cyan" />
            <span className="font-serif italic">Estudio propio en Puerto Varas &bull; Sesiones en toda la Patagonia</span>
          </div>
        </div>
      </div>
    </section>
  );
}
