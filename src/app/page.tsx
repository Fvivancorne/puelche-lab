'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown, Wind, Sparkles, Compass } from 'lucide-react';
import { PORTFOLIO_PROJECTS, STUDIO_SERVICES, CLIENT_LOGOS } from '@/data/portfolio';
import gsap from 'gsap';

export default function Home() {
  const heroWipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wipeTarget = heroWipeRef.current;
    if (wipeTarget) {
      gsap.set(wipeTarget, { '--wipe-lead': 0, '--wipe-trail': 0 });
      const wipeState = { progress: 0 };
      gsap.to(wipeState, {
        progress: 1,
        duration: 1.2,
        delay: 0.2,
        ease: 'power2.out',
        onUpdate: () => {
          gsap.set(wipeTarget, {
            '--wipe-lead': Math.min(1, 2 * wipeState.progress),
            '--wipe-trail': Math.max(0, 2 * wipeState.progress - 1),
          });
        },
      });
    }
  }, []);

  const featuredProjects = PORTFOLIO_PROJECTS.filter((p) => p.featured);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Editorial Section */}
      <section
        id="hero"
        aria-label="Puelche Lab Portada"
        className="relative w-full min-h-[85vh] flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-12 pb-16 border-b border-[#E8E8E0] bg-[#F9F9F6] overflow-hidden"
      >
        {/* Atmospheric Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/real/bg-home-2.jpg"
            alt="Patagonia Austral — Paisaje Puelche Lab"
            fill
            priority
            className="object-cover opacity-15 pointer-events-none"
          />
        </div>

        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 pointer-events-none grain-overlay z-0" />

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12 my-auto">
          {/* Top Geo Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E8E0] pb-6 font-mono text-xs uppercase tracking-widest text-[#8E9089]">
            <div className="inline-flex items-center gap-2 text-[#18191B]">
              <span className="w-2 h-2 rounded-full bg-[#C29B63] animate-pulse" />
              <span>PUERTO VARAS &bull; REGION DE LOS LAGOS</span>
            </div>
            <span>DISENO CROSS-MEDIA &bull; FOTOGRAFIA DE AUTOR</span>
          </div>

          {/* Colossal Kinetic Headline */}
          <div className="space-y-6 pt-4">
            <div ref={heroWipeRef} data-wipe-title>
              <h1 className="wipe-text font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-[#18191B] leading-[0.95]">
                Diseño que Habita <br />
                <span className="italic font-serif text-[#C29B63]">el Territorio.</span>
              </h1>
            </div>

            <p className="font-sans text-lg sm:text-2xl text-[#666863] max-w-3xl leading-relaxed font-light">
              Elevamos marcas y proyectos patagónicos mediante fotografía de alta gama, dirección de arte contemporánea y arquitectura web de autor.
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#E8E8E0]">
            <div className="flex items-center gap-4">
              <Link
                href="/portafolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#18191B] text-[#F9F9F6] font-mono text-xs uppercase tracking-wider hover:bg-[#2C3A32] transition-all shadow-lg hover:scale-105"
              >
                <span>Explorar Obras</span>
                <ArrowUpRight className="w-4 h-4 text-[#C29B63]" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FFFFFF] border border-[#E8E8E0] text-[#18191B] font-mono text-xs uppercase tracking-wider hover:bg-[#F1F1EB] transition-all"
              >
                <span>Cotizar Proyecto</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#8E9089]">
              <ArrowDown className="w-4 h-4 animate-bounce text-[#C29B63]" />
              <span>Desliza para conocer la fuerza del Puelche</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Manifiesto & Metáfora Territorial */}
      <section
        id="manifiesto"
        aria-label="El Manifiesto del Puelche"
        className="w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#18191B] text-[#F9F9F6] relative overflow-hidden"
      >
        {/* Atmospheric Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/real/bg-agencia.jpg"
            alt="Viento Puelche Cordillera"
            fill
            className="object-cover opacity-20 pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#202225] text-[#C29B63] font-mono text-xs uppercase tracking-widest border border-[#2A2B2E]">
              <Wind className="w-4 h-4" />
              <span>ORIGEN &bull; EL VIENTO PUELCHE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#F9F9F6]">
              Una fuerza cálida y limpia que transforma el paisaje.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-8 font-sans text-base sm:text-lg text-[#AEB0A9] leading-relaxed">
            <p>
              En el sur de Chile, el viento Puelche llega desde la cordillera despejando los cielos, templando el aire y revelando la geometría imponente de los volcanes y los lagos.
            </p>
            <p>
              Así entendemos nuestro trabajo: una fuerza creativa cross-media que despeja el ruido genérico del mercado y deja a la vista la pureza, el oficio y la verdadera escala de tu marca.
            </p>
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs uppercase tracking-wider text-[#C29B63] border-t border-[#2A2B2E]">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-[#F9F9F6]">10+</span>
                <span>Años de Oficio</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-[#F9F9F6]">100%</span>
                <span>Patagonia &amp; Lagos</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-[#F9F9F6]">4K</span>
                <span>Tecnología Austral</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Services Grid (4 Pilares) */}
      <section
        id="servicios"
        aria-label="Servicios Principales"
        className="w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#F9F9F6] border-b border-[#E8E8E0]"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8E8E0]">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C29B63]">
                [ 04 PILARES DE AUTOR ]
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18191B]">
                Nuestros Servicios
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-[#666863] max-w-md leading-relaxed">
              Soluciones integrales de diseño y producción visual donde la estética y la tecnología operan en sincronía.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {STUDIO_SERVICES.map((serv, index) => (
              <div
                key={serv.id}
                className="group p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E8E8E0] hover:border-[#C29B63] hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#8E9089]">0{index + 1} //</span>
                    <span className="px-3 py-1 rounded-full bg-[#F1F1EB] font-mono text-[10px] uppercase tracking-wider text-[#666863]">
                      {serv.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18191B] group-hover:text-[#C29B63] transition-colors">
                    {serv.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#666863] leading-relaxed">
                    {serv.shortDesc}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-[#F1F1EB] font-sans text-xs sm:text-sm text-[#8E9089]">
                    {serv.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#C29B63] font-mono">&bull;</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#E8E8E0] flex items-center justify-between">
                  <Link
                    href={serv.href}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#18191B] group-hover:text-[#C29B63] font-semibold transition-colors"
                  >
                    <span>Conocer Servicio</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Portfolio Showcase */}
      <section
        id="obras"
        aria-label="Obras y Proyectos Destacados"
        className="w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#F1F1EB] border-b border-[#E8E8E0]"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E5DC]">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C29B63]">
                [ SELECCIÓN DESTACADA ]
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#18191B]">
                Obras Recientes
              </h2>
            </div>
            <Link
              href="/portafolio"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#18191B] hover:text-[#C29B63] transition-colors"
            >
              <span>Ver Portafolio Completo</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col space-y-5 rounded-3xl bg-[#FFFFFF] p-6 sm:p-8 border border-[#E5E5DC] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8E8E0]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#18191B]/80 backdrop-blur-md text-[#F9F9F6] font-mono text-[10px] uppercase tracking-wider">
                    {project.category}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between font-mono text-xs text-[#8E9089]">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#18191B] group-hover:text-[#C29B63] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm text-[#666863] leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EBEBE5] flex flex-wrap gap-2">
                  {project.deliverables.map((deliv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#F1F1EB] font-mono text-[10px] text-[#666863]"
                    >
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Clientes & Confianza Territorial */}
      <section
        id="clientes-strip"
        aria-label="Marcas y Clientes"
        className="w-full py-20 px-6 md:px-12 lg:px-16 bg-[#F9F9F6] border-b border-[#E8E8E0]"
      >
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#8E9089]">
            [ EMPRESAS &bull; HOTELES &bull; INSTITUCIONES DEL SUR ]
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-serif text-xl sm:text-2xl text-[#666863]">
            {CLIENT_LOGOS.map((name, i) => (
              <span
                key={i}
                className="hover:text-[#18191B] transition-colors cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing Call to Action */}
      <section
        id="cta-cierre"
        aria-label="Iniciar Proyecto"
        className="w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#2C3A32] text-[#F9F9F6] text-center relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E2722] text-[#C29B63] font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DAR EL SIGUIENTE PASO</span>
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#F9F9F6]">
            Hagamos que tu proyecto pase al frente en la vitrina del mercado.
          </h2>
          <p className="font-sans text-base sm:text-xl text-[#AEB0A9] max-w-2xl mx-auto font-light leading-relaxed">
            Conversemos sobre tu próxima producción fotográfica, identidad de marca o plataforma web en Puerto Varas.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C29B63] text-[#18191B] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#E6D5B8] transition-all shadow-xl hover:scale-105"
            >
              <span>Completar Brief</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portafolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border border-[#F9F9F6]/30 text-[#F9F9F6] font-mono text-xs uppercase tracking-wider hover:bg-[#F9F9F6]/10 transition-all"
            >
              <span>Ver Trabajos</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
