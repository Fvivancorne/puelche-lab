'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowRight, Camera, Monitor, Compass, Sparkles } from 'lucide-react';

const HIGHLIGHT_PROJECTS = [
  {
    title: 'Estancia Rilan, Hotel y Cava',
    location: 'Península de Rilán, Chiloé',
    specialty: 'Fotografías de interiores e inmobiliario',
    image: '/images/real/bg-portafolios-fotografia-min.jpg',
    href: '/servicios/fotografia',
  },
  {
    title: 'Cala Melí, Cabañas',
    location: 'Puerto Varas',
    specialty: 'Fotografías de interiores e inmobiliario',
    image: '/images/real/bg-portafolios-fotografia-a-min.jpg',
    href: '/servicios/fotografia',
  },
  {
    title: 'Aqua Chile',
    location: 'Puerto Montt & Fiordos',
    specialty: 'Fotografía Industrial & Procesos',
    image: '/images/real/bg-portafolios-fotografia-g-min.jpg',
    href: '/servicios/fotografia',
  },
];

export default function HomePage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. HERO SECTION (100vh with bg-agencia.jpg and white central logo emblem) */}
      <section
        id="hero"
        aria-label="Puelche Lab Portada"
        className="relative w-full h-[calc(100vh-70px)] min-h-[600px] flex flex-col items-center justify-center text-center overflow-hidden px-6 md:px-12 lg:px-16"
      >
        {/* Background Image: Misty Forest of Puerto Varas */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/bg-agencia.jpg"
            alt="Puelche Lab — Bosque patagónico Puerto Varas"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Hero Center Content: Gigantic White Logo & Tagline */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center space-y-6">
          {/* Geographic Identity Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 text-white font-condensed uppercase tracking-widest text-xs">
            <span className="w-2 h-2 rounded-full bg-puelche-cyan animate-pulse" />
            <span>PUERTO VARAS &bull; REGION DE LOS LAGOS</span>
          </div>

          {/* Logo Emblem: White Cloud Camera Puelche Lab */}
          <div className="w-64 sm:w-80 md:w-96 max-w-full drop-shadow-2xl animate-in fade-in zoom-in-95 duration-700">
            <Image
              src="/images/real/logo-puelche.png"
              alt="Puelche Lab Logo Emblema"
              width={412}
              height={282}
              priority
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Slogan & Description with Fluid Responsive Classes */}
          <div className="space-y-2 text-white">
            <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-wider font-light text-white/95 drop-shadow">
              VIENTO CREATIVO
            </h1>
            <p className="font-condensed text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide font-bold text-puelche-cyan drop-shadow-md">
              Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/80 flex flex-col items-center space-y-1 animate-bounce">
          <span className="font-condensed uppercase tracking-widest text-xs text-white/90">Descubre</span>
          <ChevronDown className="w-5 h-5 text-puelche-cyan" />
        </div>
      </section>

      {/* 2. STORYTELLING SECTION (100vh with bg-home-2.jpg and Cross-Media Explanation) */}
      <section
        id="cross-media"
        aria-label="Qué es Cross Media"
        className="relative w-full min-h-[90vh] py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden"
      >
        {/* Background Image: Wooden fence and pasture with misty lake */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/bg-home-2.jpg"
            alt="Paisaje Sur de Chile — Puelche Lab"
            fill
            className="object-cover object-center"
          />
          {/* Dark Glass Overlay */}
          <div className="absolute inset-0 bg-puelche-slate-dark/75 backdrop-blur-[2px]" />
        </div>

        {/* Center Content Card */}
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
          <span className="inline-block font-condensed uppercase tracking-widest text-sm text-puelche-cyan font-semibold mb-4 px-3 py-1 rounded bg-puelche-cyan/15 border border-puelche-cyan/30">
            Puerto Varas &bull; Región de Los Lagos
          </span>

          <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-white mb-8 leading-tight">
            Somos un Estudio de Diseño Cross Media <br className="hidden sm:inline" />
            y Fotografía en Puerto Varas.
          </h2>

          <div className="bg-black/30 border border-white/10 rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-sm space-y-6">
            <h3 className="font-condensed text-xl sm:text-2xl font-bold text-puelche-cyan uppercase tracking-wider">
              Pero, ¿Qué es Cross Media?
            </h3>
            <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-light text-justify sm:text-center">
              Nos referimos a que hacemos piezas gráficas para todos los medios, ya sean digitales, impresos, y/o audiovisuales. Contamos con un estudio de fotografía y grabación muy bien equipado, tenemos iluminación profesional y equipos de alta gama, tanto para hacer trabajos en tierra o desde el aire, que junto con las habilidades técnicas de nuestro equipo hacemos resaltar tu producto o servicio, haciendo que pase al frente en la vitrina del mercado.
            </p>

            {/* Feature Badges with 1 to 2 column responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10 font-condensed uppercase tracking-wider text-xs sm:text-sm">
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center text-center">
                <span className="text-puelche-cyan font-bold text-base">ESTUDIO PROPIO</span>
                <span className="text-white/70 text-xs">En Puerto Varas</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center text-center">
                <span className="text-puelche-cyan font-bold text-base">TIERRA Y AIRE</span>
                <span className="text-white/70 text-xs">Dron 4K & Cine</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center text-center">
                <span className="text-puelche-cyan font-bold text-base">ILUMINACIÓN</span>
                <span className="text-white/70 text-xs">Set Profesional</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col items-center text-center">
                <span className="text-puelche-cyan font-bold text-base">CROSS-MEDIA</span>
                <span className="text-white/70 text-xs">Digital, Impreso, Video</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PORTFOLIO SHOWCASE STRIPES (Panoramic Projects with Cyan Overlay Cards) */}
      <section
        id="portafolio-preview"
        aria-label="Muestra de Portafolio"
        className="w-full flex flex-col"
      >
        <div className="bg-puelche-slate py-8 px-6 text-center">
          <div className="max-w-7xl mx-auto">
            <span className="font-condensed uppercase tracking-widest text-xs text-puelche-cyan font-bold block mb-1">
              Producciones Seleccionadas
            </span>
            <h2 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wider text-white font-bold">
              Fotografía de Alto Nivel en la Patagonia
            </h2>
          </div>
        </div>

        {HIGHLIGHT_PROJECTS.map((proj) => (
          <div
            key={proj.title}
            className="relative w-full h-[450px] sm:h-[520px] overflow-hidden group border-b border-puelche-slate-dark"
          >
            {/* Background Panorama */}
            <Image
              src={proj.image}
              alt={proj.title}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Signature Cyan Overlay Card on Bottom Left */}
            <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-md bg-puelche-cyan text-white p-6 sm:p-7 shadow-2xl rounded-sm transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="font-condensed uppercase tracking-wider text-lg sm:text-xl font-bold leading-snug">
                Cliente: {proj.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/95 mt-1 font-light">
                {proj.location}
              </p>
              <p className="font-sans text-xs sm:text-sm text-white/95 mt-0.5 font-light">
                {proj.specialty}
              </p>

              <div className="mt-4 pt-3 border-t border-white/30">
                <Link
                  href={proj.href}
                  className="inline-flex items-center gap-2 font-condensed uppercase tracking-widest text-xs sm:text-sm font-bold text-white hover:text-puelche-slate-dark transition-colors"
                >
                  <span>VER FOTOGRAFÍAS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* View All Projects CTA Banner */}
        <div className="bg-white py-12 px-6 text-center border-b border-gray-200">
          <Link
            href="/servicios/fotografia"
            className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-slate text-white font-condensed uppercase tracking-widest text-base font-bold rounded-sm hover:bg-puelche-cyan transition-colors duration-200 shadow-md"
          >
            <span>Ver Todo el Portafolio</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
