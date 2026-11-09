'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  ArrowRight,
  ArrowUpRight,
  X,
  ChevronRight,
  ChevronLeft,
  Eye,
  Sparkles,
  Layers,
  MapPin,
  Calendar,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface BrandProject {
  id: string;
  client: string;
  subtitle: string;
  category: string;
  image: string;
  gallery: string[];
  tag?: string;
  quote?: string;
}

const FEATURED_BRAND_SHOWCASE: BrandProject[] = [
  {
    id: 'hotel-arrebol',
    client: 'Hotel Boutique Arrebol Chiloé',
    subtitle: 'Diseño de marca e identidad visual para hotelería boutique en Castro (ex Hotel Veliche)',
    category: 'Hotelería Boutique & Arquitectura',
    image: '/images/real/facebook/fb-arrebol-1.jpg',
    gallery: [
      '/images/real/facebook/fb-arrebol-1.jpg',
      '/images/real/facebook/fb-arrebol-2.jpg',
      '/images/real/facebook/fb-arrebol-3.jpg',
      '/images/real/facebook/fb-arrebol-4.jpg',
    ],
    tag: 'Nueva Identidad Austral',
    quote: 'La nueva marca e identidad visual de marca del ex hotel Veliche de Chiloé, nuevo Hotel Arrebol, diseñada en nuestro Lab con trazos arquitectónicos inspirados en los canales chilotes y señalética en cueros y maderas nativas.',
  },
  {
    id: 'summit-transforma',
    client: 'Summit TRANSFORMA 2026',
    subtitle: 'Cumbre de innovación y tecnología en Puerto Varas, Región de Los Lagos',
    category: 'Innovación & Tecnología',
    image: '/images/real/facebook/fb-transforma-1.jpg',
    gallery: [
      '/images/real/facebook/fb-transforma-1.jpg',
      '/images/real/facebook/fb-transforma-2.jpg',
      '/images/real/facebook/fb-transforma-3.jpg',
    ],
    tag: 'Cumbre Tecnológica',
    quote: 'Marca potente, moderna y con visión de futuro para la cumbre tecnológica de Los Lagos. Monograma de volcanes con circuitos topográficos verde flúor sobre fondos azul océano profundo.',
  },
  {
    id: 'el-reparabrisas',
    client: 'El Reparabrisas Puerto Natales',
    subtitle: 'Personaje de marca estilo cómic vintage, tipografía a medida y aplicaciones móviles',
    category: 'Servicios Automotrices & Ruta Austral',
    image: '/images/real/facebook/fb-reparabrisas-1.jpg',
    gallery: [
      '/images/real/facebook/fb-reparabrisas-1.jpg',
      '/images/real/facebook/fb-reparabrisas-2.jpg',
      '/images/real/facebook/fb-reparabrisas-3.jpg',
      '/images/real/facebook/fb-reparabrisas-mockup.jpg',
    ],
    tag: 'Diseño de Personaje',
    quote: 'Para los queridos amigos de @el_reparabrisas en Puerto Natales. Creamos un superhéroe musculoso dorado que resuelve emergencias contra el viento patagónico, con tipografía contundente a medida.',
  },
  {
    id: 'bomberos-santiago',
    client: 'Vigésima Compañía de Bomberos de Santiago',
    subtitle: 'Compañía especializada en incendios en altura',
    category: 'Caso Insigne Pro-Bono',
    image: '/images/real/bg-portafolios-marca-bomberos-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-bomberos-min.jpg',
      '/images/real/bg-edit-fotografica-7-min.jpg',
    ],
    tag: 'Hito Pro-Bono de Honor',
    quote: 'Nuestro orgullo más grande, haber tenido el honor de crear la marca para la Vigésima Compañía de Bomberos de Santiago. Proyecto OBVIAMENTE gratis. Ellos no reciben ni uno haciendo su pega, es más, deben pagar para ser bomberos. Ver nuestro trabajo bordado en cada butaca de la nueva máquina, no tiene precio.',
  },
];

const REAL_BRAND_PROJECTS: BrandProject[] = [
  {
    id: 'hotel-arrebol-grid',
    client: 'Hotel Boutique Arrebol Chiloé',
    subtitle: 'Diseño de marca e identidad visual para hotelería boutique en Castro (ex Hotel Veliche)',
    category: 'Hotelería Boutique & Arquitectura',
    image: '/images/real/facebook/fb-arrebol-1.jpg',
    gallery: [
      '/images/real/facebook/fb-arrebol-1.jpg',
      '/images/real/facebook/fb-arrebol-2.jpg',
      '/images/real/facebook/fb-arrebol-3.jpg',
      '/images/real/facebook/fb-arrebol-4.jpg',
    ],
  },
  {
    id: 'summit-transforma-grid',
    client: 'Summit TRANSFORMA 2026',
    subtitle: 'Cumbre de innovación y tecnología en Puerto Varas, Región de Los Lagos',
    category: 'Innovación & Tecnología',
    image: '/images/real/facebook/fb-transforma-1.jpg',
    gallery: [
      '/images/real/facebook/fb-transforma-1.jpg',
      '/images/real/facebook/fb-transforma-2.jpg',
      '/images/real/facebook/fb-transforma-3.jpg',
    ],
  },
  {
    id: 'el-reparabrisas-grid',
    client: 'El Reparabrisas Puerto Natales',
    subtitle: 'Personaje de marca estilo cómic, tipografía a medida y aplicaciones móviles',
    category: 'Servicios Automotrices & Ruta Austral',
    image: '/images/real/facebook/fb-reparabrisas-1.jpg',
    gallery: [
      '/images/real/facebook/fb-reparabrisas-1.jpg',
      '/images/real/facebook/fb-reparabrisas-2.jpg',
      '/images/real/facebook/fb-reparabrisas-3.jpg',
      '/images/real/facebook/fb-reparabrisas-mockup.jpg',
    ],
  },
  {
    id: 'estancia-rilan',
    client: 'Estancia Rilán',
    subtitle: 'Hotel y Cava Austral',
    category: 'Hospitalidad & Cava Austral',
    image: '/images/real/bg-portafolios-marca-rilan-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-rilan-min.jpg',
      '/images/real/bg-portafolios-fotografia-a-min.jpg',
      '/images/real/bg-portafolios-web-rilan-min.jpg',
    ],
  },
  {
    id: 'blue-seal',
    client: 'Blue Seal',
    subtitle: 'Trabajos submarinos, equipo técnico humano y robótica marina',
    category: 'Ingeniería Submarina',
    image: '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
      '/images/real/bg-redes-1-min.jpg',
    ],
  },
  {
    id: 'cirumed',
    client: 'Cirumed',
    subtitle: 'Proveedores de insumos médicos para el área de estética y cirugía',
    category: 'Salud & Instrumental Quirúrgico',
    image: '/images/real/bg-portafolios-marca-cirumed-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-cirumed-min.jpg',
    ],
  },
  {
    id: 'tti-chile',
    client: 'TRI Chile',
    subtitle: 'Servicios de robótica submarina e inspección portuaria',
    category: 'Robótica & Operaciones Portuarias',
    image: '/images/real/bg-portafolios-marca-tti-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-tti-min.jpg',
    ],
  },
  {
    id: 'rmh-emergencias',
    client: 'RMH',
    subtitle: 'Servicio y venta de equipamiento de emergencias y vehículos de rescate',
    category: 'Equipamiento & Flota de Emergencia',
    image: '/images/real/bg-portafolios-marca-rmh-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-rmh-min.jpg',
      '/images/real/bg-portafolios-marca-rmh2-min.jpg',
    ],
  },
  {
    id: 'centro-maqui',
    client: 'Centro Maqui',
    subtitle: 'Centro de atención integral infantil y desarrollo cognitivo',
    category: 'Atención Infantil & Desarrollo',
    image: '/images/real/bg-portafolios-marca-maqui-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-maqui-min.jpg',
      '/images/real/bg-portafolios-web-maqui-min.jpg',
    ],
  },
  {
    id: 'san-ambrosio',
    client: 'San Ambrosio',
    subtitle: 'Servicios Navieros, Remolque y Rescate en canales australes',
    category: 'Operaciones Marítimas & Rescate',
    image: '/images/real/bg-portafolios-marca-san-ambrosio-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-san-ambrosio-min.jpg',
    ],
  },
  {
    id: 'sur-terra',
    client: 'Sur Terra',
    subtitle: 'Gestión y venta de propiedades, parcelaciones y conservación',
    category: 'Conservación & Bienes Raíces',
    image: '/images/real/bg-portafolios-marca-sur-terra-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-sur-terra-min.jpg',
      '/images/real/bg-portafolios-web-tierrasur-min.jpg',
    ],
  },
  {
    id: 'andesmaq',
    client: 'Andesmaq',
    subtitle: 'Constructora vial, maquinaria pesada y movimientos de tierra',
    category: 'Construcción & Obras Viales',
    image: '/images/real/bg-portafolios-marca-andesmaq-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-andesmaq-min.jpg',
    ],
  },
  {
    id: 'gallo-negro',
    client: 'Gallo Negro',
    subtitle: 'Café de especialidad, tostaduría y restorán de autor',
    category: 'Gastronomía Austral',
    image: '/images/real/bg-portafolios-marca-gallo-negro-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-gallo-negro-min.jpg',
    ],
  },
  {
    id: 'bomberos-santiago',
    client: 'Vigésima Compañía de Bomberos de Santiago',
    subtitle: 'Compañía especializada en incendios en altura y rescate urbano',
    category: 'Caso Insigne Pro-Bono',
    image: '/images/real/bg-portafolios-marca-bomberos-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-bomberos-min.jpg',
      '/images/real/bg-edit-fotografica-7-min.jpg',
    ],
    quote: 'Nuestro orgullo más grande, haber tenido el honor de crear la marca para la Vigésima Compañía de Bomberos de Santiago. Proyecto OBVIAMENTE gratis. Ellos no reciben ni uno haciendo su pega, es más, deben pagar para ser bomberos. Ver nuestro trabajo bordado en cada butaca de la nueva máquina, no tiene precio.',
  },
];

export default function BrandingPage() {
  const [activeModalProject, setActiveModalProject] = useState<BrandProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [navDirection, setNavDirection] = useState<'next' | 'prev'>('next');
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);
  const [brandActiveIdx, setBrandActiveIdx] = useState(0);

  const runwayRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);

  const handleCardPointerDown = (e: React.PointerEvent) => {
    pointerStartXRef.current = e.clientX;
    pointerStartYRef.current = e.clientY;
  };

  const handleCardClick = (e: React.MouseEvent, proj: BrandProject) => {
    const deltaX = Math.abs(e.clientX - pointerStartXRef.current);
    const deltaY = Math.abs(e.clientY - pointerStartYRef.current);
    if (deltaX > 8 || deltaY > 8) {
      e.preventDefault();
      return;
    }
    openModal(proj);
  };

  const openModal = (proj: BrandProject) => {
    setActiveModalProject(proj);
    setCurrentImageIndex(0);
    setNavDirection('next');
  };

  const closeModal = () => {
    setActiveModalProject(null);
  };

  const nextProject = () => {
    if (!activeModalProject) return;
    setNavDirection('next');
    const currIdx = REAL_BRAND_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const nextIdx = (currIdx + 1) % REAL_BRAND_PROJECTS.length;
    setActiveModalProject(REAL_BRAND_PROJECTS[nextIdx]);
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    if (!activeModalProject) return;
    setNavDirection('prev');
    const currIdx = REAL_BRAND_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const prevIdx = (currIdx - 1 + REAL_BRAND_PROJECTS.length) % REAL_BRAND_PROJECTS.length;
    setActiveModalProject(REAL_BRAND_PROJECTS[prevIdx]);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    if (!activeModalProject) return;
    setNavDirection('next');
    if (activeModalProject.gallery.length > 1 && currentImageIndex < activeModalProject.gallery.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      nextProject();
    }
  };

  const handlePrev = () => {
    if (!activeModalProject) return;
    setNavDirection('prev');
    if (activeModalProject.gallery.length > 1 && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    } else {
      prevProject();
    }
  };

  const nextShowcase = () => {
    setActiveShowcaseIdx((prev) => (prev + 1) % FEATURED_BRAND_SHOWCASE.length);
  };

  const prevShowcase = () => {
    setActiveShowcaseIdx((prev) =>
      prev === 0 ? FEATURED_BRAND_SHOWCASE.length - 1 : prev - 1
    );
  };

  // ── GSAP ScrollTrigger: Pasarela Pinned 3D de Identidades de Marca ──
  useEffect(() => {
    const runway = runwayRef.current;
    const track = trackRef.current;
    if (!runway || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const getScrollDistance = () => {
          return Math.max(0, track.scrollWidth - window.innerWidth + 140);
        };

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: runway,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressFillRef.current) {
                gsap.set(progressFillRef.current, { scaleX: Math.max(0.05, self.progress) });
              }
              const nextIdx = Math.min(
                REAL_BRAND_PROJECTS.length - 1,
                Math.floor(self.progress * REAL_BRAND_PROJECTS.length)
              );
              setBrandActiveIdx((curr) => (curr === nextIdx ? curr : nextIdx));
            },
          },
        });
      }, runway);

      return () => ctx.revert();
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      media.revert();
    };
  }, []);

  // ── DESPLAZAMIENTO HORIZONTAL EN LA PASARELA: PAD MOUSE TRACKPAD WHEEL (0.65x) ──
  useEffect(() => {
    if (activeModalProject) return;

    const runway = runwayRef.current;
    if (!runway) return;

    const handleRunwayWheel = (e: WheelEvent) => {
      if (activeModalProject) return;

      const rect = runway.getBoundingClientRect();
      if (rect.top > 120 || rect.bottom < 120) {
        return;
      }

      // Si el usuario desliza horizontalmente con 2 dedos en trackpad (pad mouse)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
        e.preventDefault();
        const lenis = (window as any).lenisInstance;
        const step = e.deltaX * 0.65;
        if (lenis) {
          lenis.scrollTo(lenis.scroll + step, { immediate: true });
        } else {
          window.scrollBy({ top: step, behavior: 'auto' });
        }
      }
    };

    window.addEventListener('wheel', handleRunwayWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleRunwayWheel);
    };
  }, [activeModalProject]);

  // ── MODAL LISTENERS: WHEEL INERCIA, TOUCH & KEYBOARD ──
  useEffect(() => {
    const lenis = typeof window !== 'undefined' ? (window as any).lenisInstance : null;
    if (activeModalProject) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehaviorX = 'none';
      document.documentElement.style.overscrollBehaviorX = 'none';

      let accumulatorX = 0;
      let isMomentumLocked = false;
      let unlockTimer: NodeJS.Timeout | null = null;
      const HORIZONTAL_THRESHOLD = 160;

      const handleModalWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) > 0) {
          e.preventDefault();
        }

        const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 3;
        if (!isHorizontal) return;

        e.preventDefault();
        e.stopPropagation();

        if (isMomentumLocked) {
          if (unlockTimer) clearTimeout(unlockTimer);
          unlockTimer = setTimeout(() => {
            isMomentumLocked = false;
            accumulatorX = 0;
          }, 250);
          return;
        }

        accumulatorX += e.deltaX;

        if (Math.abs(accumulatorX) >= HORIZONTAL_THRESHOLD) {
          isMomentumLocked = true;
          if (accumulatorX > 0) {
            handleNext();
          } else {
            handlePrev();
          }
          accumulatorX = 0;

          if (unlockTimer) clearTimeout(unlockTimer);
          unlockTimer = setTimeout(() => {
            isMomentumLocked = false;
            accumulatorX = 0;
          }, 750);
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') handleNext();
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') handlePrev();
        if (e.key === 'ArrowDown' || e.key === 'PageDown') nextProject();
        if (e.key === 'ArrowUp' || e.key === 'PageUp') prevProject();
      };

      let touchStartX = 0;
      let touchStartY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (e.changedTouches.length === 1) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          const deltaY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && Math.abs(deltaX) > 60) {
            if (deltaX < 0) {
              handleNext();
            } else {
              handlePrev();
            }
          }
        }
      };

      window.addEventListener('wheel', handleModalWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        if (unlockTimer) clearTimeout(unlockTimer);
        if (lenis) lenis.start();
        document.body.style.overflow = '';
        document.body.style.overscrollBehaviorX = '';
        document.documentElement.style.overscrollBehaviorX = '';
        window.removeEventListener('wheel', handleModalWheel);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      document.body.style.overscrollBehaviorX = '';
      document.documentElement.style.overscrollBehaviorX = '';
    }
  }, [activeModalProject, currentImageIndex]);

  const currentFeatured = FEATURED_BRAND_SHOWCASE[activeShowcaseIdx];

  return (
    <div className="w-full flex flex-col -mt-20 bg-[#07080b] text-white selection:bg-[#59BFD6] selection:text-[#07080b]">
      {/* ── 1. AUTHENTIC FULL-BLEED 100VH HERO ── */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black">
        <Image
          src="/images/real/bg-portafolios-marca-min-1.jpg"
          alt="Puelche Lab - Diseño de Marca & Identidad Corporativa"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-black/30 pointer-events-none" />

        {/* Editorial Title Block */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 md:left-16 z-20 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#59BFD6]" />
            <span>DISCIPLINA DE AUTOR &bull; SISTEMAS VISUALES & IDENTIDAD</span>
          </div>
          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight font-black text-white leading-none drop-shadow-2xl">
            Diseño de Marca
          </h1>
          <p className="font-condensed uppercase tracking-wider text-sm sm:text-base md:text-lg text-white/80 font-medium pt-1 drop-shadow-md">
            Identidades corporativas con arraigo territorial austral y proyección internacional.
          </p>
        </div>

        {/* Bottom Caption & Manifesto */}
        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#59BFD6] block mb-1">
              ESTUDIO PUELCHE LAB • FILOSOFÍA VISUAL
            </span>
            <p className="font-sans text-sm sm:text-base text-white/95 font-light leading-relaxed italic">
              &ldquo;La Identidad Corporativa es mucho más que el logotipo: es el reflejo de la filosofía de la empresa, su manera de trabajar. Nuestro trabajo consiste en plasmar visualmente todos esos conceptos y hacer que sean perceptibles por las personas.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. CARRUSEL CINEMÁTICO AWWWARDS: CASOS INSIGNIA DE BRANDING ── */}
      <section id="carrusel-casos" className="bg-[#0b0c10] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-12 border-b border-white/10 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#59BFD6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#59BFD6]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-6">
            <div>
              <div className="flex items-center gap-2 text-[#59BFD6] font-mono text-xs uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Casos Destacados • Identidad Territorial & Corporativa</span>
              </div>
              <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white">
                Sistemas Visuales de Alto Impacto
              </h2>
            </div>
            
            {/* Paginator & Navigation Controls */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm tracking-widest text-white/60">
                <span className="text-[#59BFD6] font-bold">{String(activeShowcaseIdx + 1).padStart(2, '0')}</span> / {String(FEATURED_BRAND_SHOWCASE.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevShowcase}
                  className="p-3 rounded-full bg-white/5 hover:bg-[#59BFD6] hover:text-[#07080b] text-white/80 transition-all border border-white/10 hover:border-[#59BFD6]"
                  aria-label="Caso anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextShowcase}
                  className="p-3 rounded-full bg-white/5 hover:bg-[#59BFD6] hover:text-[#07080b] text-white/80 transition-all border border-white/10 hover:border-[#59BFD6]"
                  aria-label="Siguiente caso"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Case Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {FEATURED_BRAND_SHOWCASE.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveShowcaseIdx(idx)}
                className={`text-left p-3 sm:p-4 rounded-sm transition-all duration-300 border ${
                  activeShowcaseIdx === idx
                    ? 'bg-white/10 border-[#59BFD6] shadow-[0_0_20px_rgba(89,191,214,0.2)]'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                }`}
              >
                <span className="font-mono text-[10px] text-[#59BFD6] block mb-1">
                  0{idx + 1} • {item.tag}
                </span>
                <span className="font-condensed font-bold text-sm sm:text-base uppercase tracking-wider block text-white truncate">
                  {item.client.split('—')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Cinematic Active Slide Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch bg-white/[0.03] border border-white/10 rounded-sm p-4 sm:p-6 md:p-8">
            {/* Visual Preview Stage (7 cols) - Framed & Centered (Anti-Cropping) */}
            <div
              className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] md:min-h-[540px] rounded-sm overflow-hidden group cursor-pointer bg-[#08090c] border border-white/10 flex items-center justify-center p-4 sm:p-6 md:p-8"
              onClick={() => openModal(currentFeatured)}
            >
              {/* Layer 1: Ambient atmospheric blur glow based on artwork */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  src={currentFeatured.image}
                  alt=""
                  fill
                  className="object-cover blur-3xl opacity-20 scale-125"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
              </div>

              {/* Layer 2: Studio Framing Gridlines & Corner Brackets */}
              <div className="absolute inset-3 border border-white/10 rounded-sm pointer-events-none z-10" />
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#59BFD6] pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#59BFD6] pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#59BFD6] pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#59BFD6] pointer-events-none z-10" />

              {/* Layer 3: Main Artwork Centered in Frame - 100% visible, complete, never cropped */}
              <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] md:min-h-[480px] flex items-center justify-center z-10">
                <Image
                  src={currentFeatured.image}
                  alt={currentFeatured.client}
                  fill
                  priority
                  className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-5 left-5 z-20 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#59BFD6] text-[#07080b] font-condensed text-xs uppercase font-bold tracking-wider rounded-sm shadow-md">
                  {currentFeatured.tag}
                </span>
                <span className="px-3 py-1 bg-black/75 backdrop-blur-md text-white/90 font-mono text-[11px] uppercase tracking-wider rounded-sm border border-white/15">
                  {currentFeatured.gallery.length} piezas gráficas
                </span>
              </div>

              {/* Hover Trigger Action */}
              <div className="absolute bottom-5 right-5 z-20 bg-black/80 backdrop-blur-md group-hover:bg-[#59BFD6] group-hover:text-[#07080b] text-white px-4 py-2 rounded-sm text-xs font-condensed uppercase tracking-wider font-bold transition-all flex items-center gap-2 border border-white/20 group-hover:border-[#59BFD6] shadow-xl">
                <Eye className="w-3.5 h-3.5" />
                <span>Ampliar Galería</span>
              </div>
            </div>

            {/* Narrative & Details (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#59BFD6] block">
                  {currentFeatured.category}
                </span>
                <h3 className="font-condensed text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-white leading-tight">
                  {currentFeatured.client}
                </h3>
                <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
                  {currentFeatured.subtitle}
                </p>

                {currentFeatured.quote && (
                  <div className="p-4 bg-white/[0.04] border-l-2 border-[#59BFD6] rounded-r-sm space-y-2 mt-4">
                    <p className="font-sans text-xs sm:text-sm text-white/90 font-light italic leading-relaxed">
                      &ldquo;{currentFeatured.quote}&rdquo;
                    </p>
                    <span className="text-[11px] font-condensed uppercase tracking-wider text-[#59BFD6] block font-semibold">
                      — Puelche Lab Studio, Puerto Varas
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openModal(currentFeatured)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#59BFD6] text-[#07080b] font-condensed uppercase tracking-wider font-bold text-sm rounded-sm hover:bg-[#48abc0] transition-all shadow-md hover:scale-[1.02]"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Piezas en Alta Resolución</span>
                </button>
                <Link
                  href={`/contacto?proyecto=${encodeURIComponent(currentFeatured.client)}`}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 hover:border-white text-white font-condensed uppercase tracking-wider font-bold text-sm rounded-sm hover:bg-white/10 transition-colors"
                >
                  <span>Cotizar Branding</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURE STORY: VIGÉSIMA COMPAÑÍA DE BOMBEROS DE SANTIAGO ── */}
      <section className="bg-[#F8FAFB] py-14 px-6 sm:px-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-sm border-l-4 border-[#59BFD6] shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#59BFD6] font-condensed uppercase tracking-widest text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>Hito de Honor • Puelche Lab Pro-Bono</span>
          </div>
          <blockquote className="font-sans text-base sm:text-lg text-[#1e2229] font-light italic leading-relaxed">
            &ldquo;Nuestro orgullo más grande, haber tenido el honor de crear la marca para la Vigésima Compañía de Bomberos de Santiago. Proyecto OBVIAMENTE gratis. Ellos no reciben ni uno haciendo su pega, es más, ¡deben pagar para ser bomberos! Así es que nosotros no les cobramos ni uno. Ver nuestro trabajo bordado en cada butaca de la nueva máquina, no tiene precio.&rdquo;
          </blockquote>
          <div className="flex items-center justify-between pt-2">
            <span className="font-condensed uppercase tracking-wider text-xs font-bold text-[#4b5563]">
              — Equipo Puelche Lab, Puerto Varas
            </span>
            <button
              onClick={() => openModal(FEATURED_BRAND_SHOWCASE[3])}
              className="text-xs font-condensed uppercase tracking-wider font-bold text-[#59BFD6] hover:underline inline-flex items-center gap-1"
            >
              <span>Ver Insignia & Fotografía</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. AWWWARDS PINNED 3D BRAND RUNWAY (CARRUSEL AL SCROLL) ── */}
      <section
        id="obras"
        ref={runwayRef}
        aria-label="Pasarela Tridimensional de Diseño de Marca"
        className="relative w-full overflow-visible bg-[#07080b]"
        style={{
          height: `${Math.max(320, REAL_BRAND_PROJECTS.length * 48)}vh`,
        }}
      >
        {/* Contenedor Sticky que se ancla en el viewport mientras el scroll vertical desplaza el track */}
        <div className="sticky top-0 w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between pt-20 pb-6 bg-[#07080b] border-y border-white/10">
          {/* Barra Superior de Coordenadas, Título y Ticker */}
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between font-mono text-xs text-white/70 border-b border-white/10 pb-4 z-20">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#59BFD6] animate-pulse shadow-[0_0_8px_#59BFD6]" />
              <span className="text-white uppercase tracking-wider font-semibold">
                41°S &mdash; 53°S &bull; PASARELA TRIDIMENSIONAL DE BRANDING
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-[#59BFD6] uppercase tracking-wider font-semibold">
                [ {String(brandActiveIdx + 1).padStart(2, '0')} / {String(REAL_BRAND_PROJECTS.length).padStart(2, '0')} ]
              </span>
              <span className="hidden sm:inline text-white/80 font-sans font-medium uppercase tracking-wide">
                {REAL_BRAND_PROJECTS[brandActiveIdx]?.client || ''}
              </span>
            </div>
          </div>

          {/* Pista Horizontal de Tarjetas de Branding 3D */}
          <div className="relative w-full flex-1 flex items-center overflow-hidden">
            {/* Botones Flotantes de Navegación Lateral */}
            <button
              type="button"
              onClick={() => {
                const lenis = (window as any).lenisInstance;
                const step = -window.innerHeight * 0.85;
                if (lenis) lenis.scrollTo(lenis.scroll + step, { duration: 0.8 });
                else window.scrollBy({ top: step, behavior: 'smooth' });
              }}
              className="hidden sm:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 hover:bg-[#59BFD6] text-white hover:text-[#07080b] border border-white/20 hover:border-[#59BFD6] backdrop-blur-md shadow-2xl transition-all duration-300 items-center justify-center group"
              aria-label="Deslizar marcas hacia la izquierda"
              title="Anterior (← o Pad)"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => {
                const lenis = (window as any).lenisInstance;
                const step = window.innerHeight * 0.85;
                if (lenis) lenis.scrollTo(lenis.scroll + step, { duration: 0.8 });
                else window.scrollBy({ top: step, behavior: 'smooth' });
              }}
              className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 hover:bg-[#59BFD6] text-white hover:text-[#07080b] border border-white/20 hover:border-[#59BFD6] backdrop-blur-md shadow-2xl transition-all duration-300 items-center justify-center group"
              aria-label="Deslizar marcas hacia la derecha"
              title="Siguiente (→ o Pad)"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div
              ref={trackRef}
              className="flex items-center gap-8 sm:gap-12 lg:gap-14 px-6 md:px-16 w-max will-change-transform py-4"
            >
              {REAL_BRAND_PROJECTS.map((proj, idx) => {
                return (
                  <article
                    key={proj.id}
                    data-cursor="explore"
                    data-cursor-text="VER MARCA"
                    onPointerDown={handleCardPointerDown}
                    onClick={(e) => handleCardClick(e, proj)}
                    className="group shrink-0 cursor-pointer w-[86vw] sm:w-[66vw] md:w-[50vw] lg:w-[40vw] xl:w-[36vw] select-none flex flex-col justify-between transition-all duration-700"
                  >
                    {/* Tarjeta Tridimensional Monumental */}
                    <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#0c0d12] border border-white/10 group-hover:border-[#59BFD6] shadow-[0_30px_90px_rgba(0,0,0,0.85)] group-hover:shadow-[0_40px_100px_rgba(89,191,214,0.22)] transition-all duration-700 group-hover:-translate-y-2 flex items-center justify-center p-4 sm:p-6 md:p-8">
                      {/* Atmospheric ambient blur backdrop */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <Image
                          src={proj.image}
                          alt=""
                          fill
                          loading="eager"
                          className="object-cover blur-3xl opacity-25 scale-125"
                          aria-hidden="true"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                      </div>

                      {/* Studio Framing Gridlines & Corner Brackets */}
                      <div className="absolute inset-3 border border-white/10 rounded-[20px] sm:rounded-[26px] pointer-events-none z-10 transition-colors group-hover:border-[#59BFD6]/30" />
                      <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-[#59BFD6] pointer-events-none z-10" />
                      <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-[#59BFD6] pointer-events-none z-10" />
                      <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-[#59BFD6] pointer-events-none z-10" />
                      <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-[#59BFD6] pointer-events-none z-10" />

                      {/* Obra de Arte Centrada - 100% visible, sin cortes */}
                      <div className="relative w-full h-full flex items-center justify-center z-10">
                        <Image
                          src={proj.image}
                          alt={proj.client}
                          fill
                          loading="eager"
                          draggable={false}
                          className="object-contain object-center drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-out group-hover:scale-[1.03] select-none"
                          sizes="(max-width: 640px) 86vw, (max-width: 1024px) 66vw, 40vw"
                        />
                      </div>

                      {/* Brand Token Badges Overlay (Top) */}
                      <div className="absolute top-5 left-5 z-20 flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[#59BFD6] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold shadow-md">
                          {proj.category.split('&')[0].trim()}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 font-mono text-[10px] uppercase tracking-wider border border-white/10">
                          {proj.gallery.length} {proj.gallery.length === 1 ? 'PIEZA' : 'PIEZAS'}
                        </span>
                      </div>

                      {/* Circular Kinetic Action Button (Top-Right) */}
                      <div className="absolute top-5 right-5 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/75 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#59BFD6] group-hover:text-[#07080b] transition-all duration-300 backdrop-blur-md shadow-xl group-hover:scale-110">
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>

                      {/* Hover Trigger Action Overlay (Bottom-Right) */}
                      <div className="absolute bottom-5 right-5 z-20 bg-black/85 backdrop-blur-md group-hover:bg-[#59BFD6] text-white group-hover:text-[#07080b] px-3.5 py-1.5 rounded-full text-[11px] font-condensed uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 border border-white/15 group-hover:border-[#59BFD6] shadow-xl">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Piezas</span>
                      </div>
                    </div>

                    {/* Bloque Editorial & Narrativa al Pie */}
                    <div className="pt-4 sm:pt-5 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#59BFD6] uppercase tracking-wider">
                        <span>OBRA 0{idx + 1} / {String(REAL_BRAND_PROJECTS.length).padStart(2, '0')}</span>
                        <span className="text-white/40">{proj.category}</span>
                      </div>

                      <h3 className="font-condensed text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#59BFD6] transition-colors leading-[1.08] truncate">
                        {proj.client}
                      </h3>

                      <p className="text-xs sm:text-sm text-white/70 font-sans font-light leading-relaxed line-clamp-2">
                        {proj.subtitle}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Barra Inferior de Progreso, Indicadores Tickeables e Instrucciones */}
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/60 z-20">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Barra de progreso lumínica */}
              <div className="h-1 w-36 sm:w-48 bg-white/10 rounded-full overflow-hidden relative">
                <div
                  ref={progressFillRef}
                  className="h-full w-full bg-[#59BFD6] origin-left scale-x-[0.05] transition-transform duration-100 ease-out shadow-[0_0_8px_#59BFD6]"
                />
              </div>
              <span className="text-[11px] text-white/50 hidden md:inline">
                Scroll vertical o pad para avanzar pasarela
              </span>
            </div>

            {/* Selector de Píldoras Rápidas (14 Proyectos) */}
            <div className="hidden lg:flex items-center gap-1.5">
              {REAL_BRAND_PROJECTS.map((proj, idx) => {
                const isActive = idx === brandActiveIdx;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      const runway = runwayRef.current;
                      if (!runway) return;
                      const rect = runway.getBoundingClientRect();
                      const runwayTop = window.scrollY + rect.top;
                      const scrollableRunway = runway.offsetHeight - window.innerHeight;
                      const targetY = runwayTop + (idx / (REAL_BRAND_PROJECTS.length - 1)) * scrollableRunway;
                      const lenis = (window as any).lenisInstance;
                      if (lenis) lenis.scrollTo(targetY, { duration: 0.8 });
                      else window.scrollTo({ top: targetY, behavior: 'smooth' });
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-5 h-1.5 bg-[#59BFD6] shadow-[0_0_8px_#59BFD6]'
                        : 'w-2 h-1 bg-white/30 hover:bg-white/80 hover:w-3.5'
                    }`}
                    title={`${idx + 1}. ${proj.client}`}
                    aria-label={`Ir a ${proj.client}`}
                  />
                );
              })}
            </div>

            {/* CTA Directo a Cotización */}
            <Link
              href="/contacto?servicio=branding"
              className="inline-flex items-center gap-2 text-xs font-condensed uppercase tracking-wider text-[#59BFD6] hover:text-white transition-colors font-bold"
            >
              <span>Cotizar Identidad Corporativa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. BOTTOM CTA ── */}
      <section className="bg-white py-16 px-6 text-center text-[#1e2229]">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-condensed text-2xl sm:text-3xl uppercase tracking-wider font-bold text-[#1e2229]">
            ¿Construyendo la identidad de tu empresa en el sur?
          </h3>
          <p className="font-sans text-sm text-[#4b5563] font-light">
            Creamos manuales de identidad, señalética y aplicaciones con identidad territorial y proyección global.
          </p>
          <div>
            <Link
              href="/contacto?servicio=branding"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#59BFD6] text-[#07080b] font-condensed uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-[#48abc0] transition-colors shadow-md"
            >
              <span>Cotizar Diseño de Marca</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MODAL LIGHTBOX CON SLIDE CINEMÁTICO & SOMBRA DE ARRASTRE ── */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-[100] bg-[#0c0d10] flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between text-white border-b border-white/20 pb-4">
            <div>
              <span className="text-[#59BFD6] font-condensed uppercase tracking-widest text-xs font-bold block">
                Puelche Lab • Diseño de Marca
              </span>
              <h2 className="text-lg sm:text-2xl font-condensed font-bold tracking-wide uppercase">
                {activeModalProject.client}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-sans font-light">
                {activeModalProject.subtitle}
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

          <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden bg-black/60 rounded-sm border border-white/10 p-4 sm:p-6">
            {/* Ambient blur behind lightbox image */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt=""
                fill
                className="object-cover blur-3xl opacity-20 scale-125"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Visor Principal con Key Única y Slide Cinemático con Sombra de Arrastre */}
            <div
              key={`${activeModalProject.id}-${currentImageIndex}`}
              className={`relative w-full h-full max-w-5xl max-h-[78vh] flex items-center justify-center z-10 ${
                navDirection === 'next' ? 'animate-pliego-next' : 'animate-pliego-prev'
              }`}
            >
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt={`${activeModalProject.client} - Pieza ${currentImageIndex + 1}`}
                fill
                priority
                className="object-contain object-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              />
            </div>

            {/* Botones Laterales Flotantes en Pantalla (< y >) */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/75 hover:bg-[#59BFD6] text-white hover:text-[#07080b] transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
              aria-label="Anterior (←)"
              title="Anterior (← o Pad)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/75 hover:bg-[#59BFD6] text-white hover:text-[#07080b] transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
              aria-label="Siguiente (→)"
              title="Siguiente (→ o Pad)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Barrita Lateral Tickeable de Proyectos de Branding */}
            <aside
              aria-label="Proyectos de branding"
              className="hidden lg:flex absolute right-4 bottom-4 z-30 items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-xl"
            >
              {REAL_BRAND_PROJECTS.map((proj, idx) => {
                const isActive = proj.id === activeModalProject.id;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNavDirection(idx > REAL_BRAND_PROJECTS.findIndex((p) => p.id === activeModalProject.id) ? 'next' : 'prev');
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

          <div className="flex items-center justify-between text-white/80 border-t border-white/20 pt-4 text-xs sm:text-sm font-sans">
            <div className="flex items-center gap-3">
              <span>
                Pieza <span className="text-[#59BFD6] font-bold">{currentImageIndex + 1}</span> de{' '}
                <span className="font-bold">{activeModalProject.gallery.length}</span>
              </span>
              <span className="text-white/40 hidden sm:inline">&bull; Desliza con 2 dedos en el pad mouse o flechas [← / →]</span>
            </div>
            <Link
              href={`/contacto?proyecto=${encodeURIComponent(activeModalProject.client)}`}
              className="text-[#59BFD6] font-condensed uppercase tracking-wider font-bold hover:underline"
            >
              Cotizar Proyecto Similar &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
