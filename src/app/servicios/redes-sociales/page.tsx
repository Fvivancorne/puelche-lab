'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, X, ChevronRight, ChevronLeft, Eye, ArrowRight, Instagram, Sparkles, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS, InstagramPost } from '@/data/instagram';

interface SocialProject {
  id: string;
  client: string;
  location: string;
  specialty: string;
  image: string;
  gallery: string[];
}

const REAL_SOCIAL_PROJECTS: SocialProject[] = [
  {
    id: 'blue-seal-social',
    client: 'BlueSeal.SPA',
    location: 'Puerto Montt & Océano Pacífico',
    specialty: 'Estrategia de contenidos, comunidad digital y difusión técnica submarina',
    image: '/images/real/bg-redes-1-min.jpg',
    gallery: [
      '/images/real/bg-redes-1-min.jpg',
      '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
    ],
  },
  {
    id: 'estrategia-social-puelche',
    client: 'Estrategia & Difusión Cross-Media',
    location: 'Puerto Varas, Región de Los Lagos',
    specialty: 'Gestión y segmentación publicitaria para marcas del territorio austral',
    image: '/images/real/bg-redes-1-min.jpg',
    gallery: [
      '/images/real/bg-redes-1-min.jpg',
      '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
    ],
  },
];

const CATEGORIES = [
  'Todos',
  'Interiores & Arquitectura',
  'Drone & Robótica',
  'Industrial & Faena',
  'Hotelería & Turismo',
  'Branding & Marca',
  'Fotografía de Autor',
];

export default function RedesSocialesPage() {
  const [activeModalProject, setActiveModalProject] = useState<SocialProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Instagram Feed State
  const [activeInstagramPost, setActiveInstagramPost] = useState<InstagramPost | null>(null);
  const [instagramPostIndex, setInstagramPostIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const filteredPosts =
    selectedCategory === 'Todos'
      ? INSTAGRAM_POSTS
      : INSTAGRAM_POSTS.filter((p) => p.category === selectedCategory);

  const openModal = (proj: SocialProject) => {
    setActiveModalProject(proj);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setActiveModalProject(null);
  };

  const nextProject = () => {
    if (!activeModalProject) return;
    const currIdx = REAL_SOCIAL_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const nextIdx = (currIdx + 1) % REAL_SOCIAL_PROJECTS.length;
    setActiveModalProject(REAL_SOCIAL_PROJECTS[nextIdx]);
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    if (!activeModalProject) return;
    const currIdx = REAL_SOCIAL_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const prevIdx = (currIdx - 1 + REAL_SOCIAL_PROJECTS.length) % REAL_SOCIAL_PROJECTS.length;
    setActiveModalProject(REAL_SOCIAL_PROJECTS[prevIdx]);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    if (!activeModalProject) return;
    if (activeModalProject.gallery.length > 1 && currentImageIndex < activeModalProject.gallery.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      nextProject();
    }
  };

  const handlePrev = () => {
    if (!activeModalProject) return;
    if (activeModalProject.gallery.length > 1 && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    } else {
      prevProject();
    }
  };

  const nextImage = handleNext;
  const prevImage = handlePrev;

  const openInstagramModal = (post: InstagramPost, index: number) => {
    setActiveInstagramPost(post);
    setInstagramPostIndex(index);
  };

  const closeInstagramModal = () => {
    setActiveInstagramPost(null);
  };

  const nextInstagramPost = () => {
    if (!filteredPosts.length) return;
    const nextIdx = (instagramPostIndex + 1) % filteredPosts.length;
    setInstagramPostIndex(nextIdx);
    setActiveInstagramPost(filteredPosts[nextIdx]);
  };

  const prevInstagramPost = () => {
    if (!filteredPosts.length) return;
    const prevIdx =
      instagramPostIndex === 0 ? filteredPosts.length - 1 : instagramPostIndex - 1;
    setInstagramPostIndex(prevIdx);
    setActiveInstagramPost(filteredPosts[prevIdx]);
  };

  useEffect(() => {
    const isAnyModalOpen = Boolean(activeModalProject || activeInstagramPost);
    const lenis = typeof window !== 'undefined' ? (window as any).lenisInstance : null;

    if (isAnyModalOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
          closeInstagramModal();
        }
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          if (activeModalProject) handleNext();
          if (activeInstagramPost) nextInstagramPost();
        }
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          if (activeModalProject) handlePrev();
          if (activeInstagramPost) prevInstagramPost();
        }
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          if (activeModalProject) nextProject();
          if (activeInstagramPost) nextInstagramPost();
        }
        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          if (activeModalProject) prevProject();
          if (activeInstagramPost) prevInstagramPost();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        if (lenis) lenis.start();
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }
  }, [activeModalProject, activeInstagramPost, instagramPostIndex, currentImageIndex]);

  return (
    <div className="w-full flex flex-col -mt-20 bg-[#0d0e12] text-white selection:bg-[#59BFD6] selection:text-[#0d0e12]">
      {/* ── 1. AUTHENTIC HERO BANNER (MacBook Pro BlueSeal shot) ── */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black">
        <Image
          src="/images/real/bg-redes-1-min.jpg"
          alt="Puelche Lab - Redes Sociales"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-black/30 to-black/45" />

        {/* Editorial Title Block */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 md:left-16 z-20 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#59BFD6]" />
            <span>DISCIPLINA DE AUTOR &bull; ESTRATEGIA & COMUNIDADES</span>
          </div>
          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight font-black text-white leading-none drop-shadow-2xl">
            Redes Sociales
          </h1>
          <p className="font-condensed uppercase tracking-wider text-sm sm:text-base md:text-lg text-white/80 font-medium pt-1 drop-shadow-md">
            Estrategia de contenidos, segmentación publicitaria y fotografía genuina en terreno.
          </p>
        </div>

        {/* Bottom Right Cue */}
        <div className="absolute bottom-12 right-6 sm:right-12 z-20 hidden sm:flex items-center gap-3 text-white">
          <a
            href="#feed-instagram"
            className="px-5 py-2.5 rounded-full bg-black/60 hover:bg-[#59BFD6] hover:text-[#0d0e12] text-white text-xs font-mono uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 hover:scale-105"
          >
            <Instagram className="w-4 h-4" />
            <span>Ver Feed @puelche_lab</span>
          </a>
          <a
            href="#estrategia"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Ir a estrategia"
          >
            <ArrowDown className="w-4 h-4 animate-bounce text-[#59BFD6]" />
          </a>
        </div>
      </section>

      {/* ── 2. SECTION 2: ORGANIC EDITORIAL TYPOGRAPHY ON LANDSCAPE ── */}
      <section
        id="estrategia"
        className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black text-white px-6 sm:px-12"
      >
        {/* Full Viewport Landscape Image: Patagonian Grassland with wooden fence */}
        <Image
          src="/images/real/bg-redes-2-min.jpg"
          alt="Estrategia en Redes Sociales Puelche Lab"
          fill
          priority
          className="object-cover object-center scale-105 will-change-transform"
        />

        {/* Subtle, soft ambient vignette */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />

        {/* Centered Organic Poetic Copy */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug sm:leading-tight text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] tracking-normal">
            Aplicamos las estrategias que tu marca necesita para atraer,{' '}
            <span className="font-normal italic">convertir y fidelizar clientes en tus redes sociales.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/95 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Creamos y administramos comunidades digitales en Facebook, Twitter, YouTube, Instagram, LinkedIn y otras redes sociales. 
            Configuramos, administramos y monitoreamos cuentas en redes sociales, diseñando una estrategia a través de anuncios publicitarios que se adecuan al objetivo de tu negocio.
          </p>

          {/* Interactive Portal Icon: Smooth Scroll to Live Instagram Feed */}
          <div className="pt-4 flex flex-col items-center justify-center space-y-3">
            <a
              href="#feed-instagram"
              data-cursor="explore"
              data-cursor-text="VER FEED"
              className="group/btn relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-puelche-cyan/90 hover:bg-puelche-cyan text-white flex items-center justify-center shadow-[0_0_30px_rgba(89,191,214,0.5)] transition-all duration-300 hover:scale-110 border border-white/40"
              aria-label="Ver vitrina y feed de Instagram @puelche_lab"
            >
              <Instagram className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover/btn:scale-110" />
              <div className="absolute inset-0 rounded-full animate-ping bg-puelche-cyan opacity-25 pointer-events-none" />
            </a>
            <span className="font-mono text-xs sm:text-sm text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wider">
              Haz click en el ícono para conocer nuestro trabajo y feed en terreno.
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. LIVE INSTAGRAM FEED & FIELD EXPEDITIONS (Bento / Editorial Grid) ── */}
      <section
        id="feed-instagram"
        className="w-full bg-[#0c0d10] text-white py-24 sm:py-32 px-6 sm:px-12 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-3 max-w-2xl">
              <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <span>PRODUCCIÓN VISUAL & REDES SOCIALES EN VIVO • PUERTO VARAS</span>
              </span>
              <h2 className="font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider font-extrabold text-white">
                @puelche_lab EN TERRENO
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed">
                Fotografía de interiores, faena industrial, robótica submarina, identidad corporativa y expediciones en la Patagonia. 
                Casos reales documentados en terreno para marcas del territorio austral.
              </p>
            </div>

            {/* Profile CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://www.instagram.com/puelche_lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-puelche-cyan hover:bg-white text-puelche-dark font-condensed uppercase tracking-wider text-sm font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Seguir @puelche_lab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-puelche-cyan text-puelche-dark font-bold shadow-md'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bento / Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, idx) => (
              <div
                key={post.id}
                onClick={() => openInstagramModal(post, idx)}
                className="group relative bg-[#18191B] rounded-xl overflow-hidden border border-white/10 hover:border-puelche-cyan/60 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between shadow-xl"
              >
                {/* Photo Preview with Aspect Ratio */}
                <div className="relative w-full aspect-square overflow-hidden bg-black/40">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-wider border border-white/15">
                      {post.category}
                    </span>
                  </div>

                  {/* Top Right Instagram Icon */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:bg-puelche-cyan group-hover:text-puelche-dark transition-all">
                    <Instagram className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-5 sm:p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <h3 className="font-condensed text-lg sm:text-xl font-bold uppercase tracking-wide text-white group-hover:text-puelche-cyan transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-sans text-xs text-white/60 line-clamp-2 font-light leading-relaxed">
                    {post.caption}
                  </p>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                    <span className="group-hover:text-puelche-cyan transition-colors flex items-center gap-1.5 font-medium">
                      <span>Ver detalles & post</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-white/40">@puelche_lab</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BOTTOM CTA ── */}
      <section className="bg-[#141519] py-20 px-6 border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-[#59BFD6]">
            ESTRATEGIA & GESTIÓN DIGITAL
          </span>
          <h3 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wider font-bold text-white">
            ¿Listo para llevar tus redes a un nivel profesional?
          </h3>
          <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Conversemos sobre tu marca y diseñemos una pauta de contenidos auténtica, con fotografía real en Puerto Varas y la Patagonia.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/servicios#redes-sociales"
              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-xs font-condensed uppercase tracking-wider text-white font-bold transition-all"
            >
              Ver en One-Page de Servicios
            </Link>
            <Link
              href="/contacto?servicio=Redes%20Sociales"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#59BFD6] text-puelche-dark font-condensed uppercase tracking-widest text-xs font-bold rounded-full hover:bg-white transition-all shadow-lg hover:scale-105"
            >
              <span>Cotizar Redes Sociales</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. LIGHTBOX MODAL FOR BLUE SEAL CASE STUDY ── */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-[100] bg-[#0c0d10] flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between text-white border-b border-white/20 pb-4">
            <div>
              <span className="text-puelche-cyan font-condensed uppercase tracking-widest text-xs font-bold block">
                Puelche Lab • Redes Sociales
              </span>
              <h2 className="text-lg sm:text-2xl font-condensed font-bold tracking-wide uppercase">
                {activeModalProject.client}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-sans font-light">
                {activeModalProject.location} • {activeModalProject.specialty}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Display */}
          <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full max-w-6xl max-h-[75vh]">
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt={`${activeModalProject.client} - Fotografía ${currentImageIndex + 1}`}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Botones Laterales Flotantes en Pantalla (< y >) */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/75 hover:bg-[#59BFD6] text-white hover:text-puelche-dark transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
              aria-label="Anterior (←)"
              title="Anterior (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/75 hover:bg-[#59BFD6] text-white hover:text-puelche-dark transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
              aria-label="Siguiente (→)"
              title="Siguiente (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Barrita Lateral Tickeable de Proyectos Sociales */}
            <aside
              aria-label="Proyectos de redes sociales"
              className="hidden lg:flex absolute right-4 bottom-4 z-30 items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-xl"
            >
              {REAL_SOCIAL_PROJECTS.map((proj, idx) => {
                const isActive = proj.id === activeModalProject.id;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProject(proj);
                      setCurrentImageIndex(0);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-5 h-1.5 bg-[#59BFD6] shadow-[0_0_8px_#59BFD6]'
                        : 'w-2 h-1 bg-white/30 hover:bg-white/80 hover:w-3.5'
                    }`}
                    title={`${idx + 1}. ${proj.client}`}
                    aria-label={`Ver ${proj.client}`}
                  />
                );
              })}
            </aside>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-white/80 border-t border-white/20 pt-4 text-xs sm:text-sm font-sans">
            <div>
              Imagen <span className="text-puelche-cyan font-bold">{currentImageIndex + 1}</span> de{' '}
              <span className="font-bold">{activeModalProject.gallery.length}</span>
            </div>
            <Link
              href="/contacto?servicio=redes-sociales"
              className="text-puelche-cyan font-condensed uppercase tracking-wider font-bold hover:underline"
            >
              Cotizar Proyecto Similar &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* ── 6. HYBRID LIGHTBOX MODAL FOR INSTAGRAM POSTS ── */}
      {activeInstagramPost && (
        <div
          className="fixed inset-0 z-[100] bg-[#0c0d10] flex flex-col md:flex-row items-stretch justify-between p-4 sm:p-6 md:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Main Visual Display (Left / Center) */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black/60 rounded-xl p-2 sm:p-4">
            <div className="relative w-full h-full max-w-5xl max-h-[75vh] md:max-h-[85vh]">
              <Image
                src={activeInstagramPost.image}
                alt={activeInstagramPost.title}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Navigation Arrows */}
            {filteredPosts.length > 1 && (
              <>
                <button
                  onClick={prevInstagramPost}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-puelche-cyan text-white transition-all shadow-lg"
                  aria-label="Publicación anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextInstagramPost}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-puelche-cyan text-white transition-all shadow-lg"
                  aria-label="Siguiente publicación"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Right Editorial Sidebar */}
          <div className="w-full md:w-96 lg:w-[440px] md:pl-8 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/15 shrink-0">
            <div className="space-y-4">
              {/* Header and Close */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-puelche-cyan">
                  <Instagram className="w-4 h-4" />
                  <span className="font-condensed uppercase tracking-widest text-xs font-bold">
                    @puelche_lab • Instagram Oficial
                  </span>
                </div>
                <button
                  onClick={closeInstagramModal}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Category */}
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-puelche-cyan/20 text-puelche-cyan text-[11px] font-mono uppercase tracking-wider inline-block">
                  {activeInstagramPost.category}
                </span>
                <h2 className="font-condensed text-xl sm:text-2xl font-bold uppercase tracking-wide text-white leading-tight">
                  {activeInstagramPost.title}
                </h2>
              </div>

              {/* Full Caption */}
              <div className="max-h-[32vh] md:max-h-[46vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 space-y-2">
                <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed whitespace-pre-line">
                  {activeInstagramPost.caption}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 space-y-3 border-t border-white/10">
              <a
                href={activeInstagramPost.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-condensed uppercase tracking-wider text-sm font-bold rounded-lg hover:opacity-95 transition-all shadow-lg hover:scale-[1.02]"
              >
                <Instagram className="w-4 h-4" />
                <span>Ver publicación en Instagram ↗</span>
              </a>

              <Link
                href="/contacto?servicio=redes-sociales"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-puelche-cyan hover:text-puelche-dark text-white font-condensed uppercase tracking-wider text-sm font-bold rounded-lg transition-all"
              >
                <span>Cotizar Proyecto Similar &rarr;</span>
              </Link>

              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 pt-1">
                <span>Puerto Varas • Patagonia</span>
                <span>
                  Post {instagramPostIndex + 1} de {filteredPosts.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
