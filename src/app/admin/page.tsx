'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  Unlock,
  DollarSign,
  Layers,
  Camera,
  FolderKanban,
  Building2,
  Sliders,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Eye,
  Mail,
  Phone,
  Compass,
  Monitor,
  BookOpen,
  Share2,
  AlertCircle,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';
import defaultPricingConfig from '@/data/pricing-config.json';
import { ADMIN_CLIENT_LOGOS as CLIENT_LOGOS } from '@/data/clients';

export default function AdminCmsHubPage() {
  const [pin, setPin] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tarifario' | 'portafolio' | 'servicios' | 'clientes' | 'leads'>('tarifario');
  const [portfolioFilter, setPortfolioFilter] = useState<string>('todos');

  // Check stored auth session
  useEffect(() => {
    const stored = sessionStorage.getItem('puelche_admin_pin');
    if (stored === 'puelche2026') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'puelche2026') {
      setIsAuthenticated(true);
      setAuthError(null);
      sessionStorage.setItem('puelche_admin_pin', pin);
    } else {
      setAuthError('PIN incorrecto. Ingresa la clave maestra de administración.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('puelche_admin_pin');
    setIsAuthenticated(false);
    setPin('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0f14] text-white flex items-center justify-center px-6 selection:bg-[#59BFD6] selection:text-[#0b0d10]">
        <div className="w-full max-w-md bg-[#13161d] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#59BFD6]/10 text-[#59BFD6] flex items-center justify-center mx-auto border border-[#59BFD6]/20 shadow-[0_0_25px_rgba(89,191,214,0.15)]">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#59BFD6]">
                PUELCHE LAB • PLATAFORMA DE AUTOR
              </span>
              <h1 className="font-condensed text-3xl uppercase font-bold text-white tracking-wide">
                Consola Maestra CMS
              </h1>
              <p className="font-sans text-xs text-white/60">
                Gestión integral de contenidos, portafolio, clientes y tarifario
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div>
              <label htmlFor="pin-input" className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-2">
                PIN Maestro de Acceso
              </label>
              <input
                id="pin-input"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Ingresa la clave de administración"
                className="w-full bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-xl px-4 py-3.5 text-white font-mono text-sm outline-none transition-all focus:bg-white/[0.08]"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#59BFD6] hover:bg-white text-[#0b0d10] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_25px_rgba(89,191,214,0.3)] flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Unlock className="w-4 h-4" />
              <span>Ingresar a la Consola CMS</span>
            </button>
          </form>

          <div className="text-center pt-2 border-t border-white/5">
            <Link href="/" className="font-mono text-xs text-white/40 hover:text-white transition-colors">
              &larr; Volver al sitio público de Puelche Lab
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredProjects = portfolioFilter === 'todos'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category.toLowerCase().includes(portfolioFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white selection:bg-[#59BFD6] selection:text-[#0b0d10] pb-24">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 bg-[#13161d]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#59BFD6]/10 border border-[#59BFD6]/30 flex items-center justify-center text-[#59BFD6]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h1 className="font-condensed text-xl uppercase font-bold text-white tracking-wider">
                  Puelche Lab &bull; Consola Maestra CMS
                </h1>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                  v2026 Live
                </span>
              </div>
              <p className="font-sans text-xs text-white/50">
                Puerto Varas &bull; Centro de Mando Creativo y Comercial
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-white/80 transition-colors"
            >
              <span>Ver Web Pública</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono uppercase tracking-wider text-red-400 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-[#13161d] border border-white/10 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Obras de Autor</span>
            <div className="flex items-baseline gap-2">
              <span className="font-condensed text-3xl font-bold text-white">{PORTFOLIO_PROJECTS.length}</span>
              <span className="text-xs font-mono text-[#59BFD6]">Casos</span>
            </div>
            <span className="text-[11px] font-sans text-white/40 block">Curaduría territorial</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#13161d] border border-white/10 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Archivo Óptico</span>
            <div className="flex items-baseline gap-2">
              <span className="font-condensed text-3xl font-bold text-white">34</span>
              <span className="text-xs font-mono text-[#C29B63]">Pliegos</span>
            </div>
            <span className="text-[11px] font-sans text-white/40 block">Fotogramas RAW Sony</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#13161d] border border-white/10 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Disciplinas</span>
            <div className="flex items-baseline gap-2">
              <span className="font-condensed text-3xl font-bold text-white">6</span>
              <span className="text-xs font-mono text-emerald-400">Oficios</span>
            </div>
            <span className="text-[11px] font-sans text-white/40 block">Fotografía, Web, Marca...</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#13161d] border border-white/10 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Alianzas</span>
            <div className="flex items-baseline gap-2">
              <span className="font-condensed text-3xl font-bold text-white">{CLIENT_LOGOS.length}</span>
              <span className="text-xs font-mono text-purple-400">Marcas</span>
            </div>
            <span className="text-[11px] font-sans text-white/40 block">Patagonia & Austral</span>
          </div>

          <div className="col-span-2 md:col-span-1 p-5 rounded-2xl bg-[#59BFD6]/10 border border-[#59BFD6]/30 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#59BFD6] block">Tarifario Activo</span>
            <div className="flex items-baseline gap-2">
              <span className="font-condensed text-3xl font-bold text-white">
                ${(defaultPricingConfig.currency.ufRate || 39200).toLocaleString('es-CL')}
              </span>
            </div>
            <span className="text-[11px] font-sans text-white/60 block">Valor UF Indexado</span>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('tarifario')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === 'tarifario'
                ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.35)]'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Tarifario & Cotizador</span>
          </button>

          <button
            onClick={() => setActiveTab('portafolio')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === 'portafolio'
                ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.35)]'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Portafolio & Obras ({PORTFOLIO_PROJECTS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('servicios')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === 'servicios'
                ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.35)]'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Disciplinas (6)</span>
          </button>

          <button
            onClick={() => setActiveTab('clientes')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === 'clientes'
                ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.35)]'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Clientes & Alianzas ({CLIENT_LOGOS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === 'leads'
                ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.35)]'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Buzón & Expediciones</span>
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* TAB 1: TARIFARIO & COTIZADOR                                       */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'tarifario' && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#13161d] to-[#181d26] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#59BFD6]/10 text-[#59BFD6] font-mono text-xs border border-[#59BFD6]/20">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Calibración Paramétrica en Vivo</span>
                </div>
                <h2 className="font-condensed text-3xl font-bold uppercase text-white tracking-wide">
                  Panel de Tarifas & Presupuestos
                </h2>
                <p className="font-sans text-sm text-white/70 leading-relaxed">
                  Permite a Paula Valdivieso y Alejandro Lattes actualizar el valor de la UF, el dólar, los valores base de páginas web, multiplicadores por tamaño de empresa y costos de add-ons fotográficos sin requerir programadores ni redespliegues.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/admin/precios"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#59BFD6] hover:bg-white text-[#08090b] font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(89,191,214,0.35)] transition-all hover:scale-105"
                >
                  <span>Abrir Editor de Tarifas</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cotizador"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs uppercase tracking-wider text-white transition-colors"
                >
                  <span>Probar Cotizador Público</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Current Rates Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#13161d] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs text-white/50 uppercase">Tipo de Cambio</span>
                  <span className="w-2 h-2 rounded-full bg-[#59BFD6]" />
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-mono text-xs text-white/40 block">Valor 1 UF:</span>
                    <span className="font-mono text-2xl font-bold text-white">
                      ${(defaultPricingConfig.currency.ufRate || 39200).toLocaleString('es-CL')} CLP
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-white/40 block">Tasa 1 USD:</span>
                    <span className="font-mono text-lg font-bold text-white/90">
                      ${defaultPricingConfig.currency.usdToClpRate} CLP
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#13161d] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs text-white/50 uppercase">Valores Base Web</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/60">One-Page (1 Pág):</span>
                    <span className="text-white font-bold">$1.200.000 CLP</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/60">PyME Institucional (5 Págs):</span>
                    <span className="text-white font-bold">$1.800.000 CLP</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/60">Plataforma Corporativa:</span>
                    <span className="text-white font-bold">$2.800.000 CLP</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#13161d] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs text-white/50 uppercase">Add-ons Populares</span>
                  <span className="w-2 h-2 rounded-full bg-[#C29B63]" />
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/60">Jornada Fotografía Terreno:</span>
                    <span className="text-white font-bold">$1.200.000 CLP</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/60">Filmación Dron 4K:</span>
                    <span className="text-white font-bold">$750.000 CLP</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/60">Manual de Marca & Normas:</span>
                    <span className="text-white font-bold">$1.850.000 CLP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* TAB 2: PORTAFOLIO & OBRAS DE AUTOR                                 */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'portafolio' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-condensed text-2xl font-bold uppercase text-white">
                  Catálogo de Proyectos & Casos de Estudio ({PORTFOLIO_PROJECTS.length})
                </h2>
                <p className="font-sans text-xs text-white/60">
                  Obras fotográficas y multiplataforma documentadas en el territorio austral
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {['todos', 'fotografía', 'branding', 'web', 'editorial'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPortfolioFilter(cat)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors ${
                      portfolioFilter === cat
                        ? 'bg-[#59BFD6] text-[#08090b] font-bold'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl bg-[#13161d] border border-white/10 overflow-hidden hover:border-[#59BFD6]/40 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover contrast-105 brightness-90 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13161d] via-transparent to-black/40" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 font-mono text-[10px] text-[#59BFD6] uppercase">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white/60">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <span className="font-mono text-[11px] text-[#C29B63] block mb-1">
                        {project.client} &bull; {project.location}
                      </span>
                      <h3 className="font-condensed text-2xl font-bold uppercase text-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-sans text-xs text-white/70 line-clamp-2 mt-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">
                        Entregables de la obra:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.deliverables.map((d) => (
                          <span
                            key={d}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-[10px] text-white/80"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-white/40">
                        Slug: /{project.slug}
                      </span>
                      <Link
                        href={`/portafolio?proyecto=${project.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#59BFD6] hover:underline uppercase"
                      >
                        <span>Ver en Portafolio</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* TAB 3: DISCIPLINAS & SERVICIOS                                     */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'servicios' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-condensed text-2xl font-bold uppercase text-white">
                Las 6 Disciplinas de Puelche Lab
              </h2>
              <p className="font-sans text-xs text-white/60">
                Especialidades cross-media con páginas de aterrizaje individuales y ficha técnica
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 'fotografia',
                  title: 'Fotografía de Autor',
                  tag: 'TERRITORIO & FAENA',
                  href: '/servicios/fotografia',
                  icon: Camera,
                  clients: 'AquaChile • Turistour • Colbosting Chile',
                  focal: 'Sony FE 85mm f/1.4 GM II',
                },
                {
                  id: 'branding',
                  title: 'Diseño de Marca',
                  tag: 'IDENTIDAD AUSTRAL',
                  href: '/servicios/branding',
                  icon: Compass,
                  clients: 'Blue Seal Subsea • RMH • Gallo Negro',
                  focal: 'Sony FE 50mm f/1.2 GM',
                },
                {
                  id: 'desarrollo-web',
                  title: 'Desarrollo Web',
                  tag: 'ARQUITECTURA SOTD',
                  href: '/servicios/desarrollo-web',
                  icon: Monitor,
                  clients: 'Estancia Rilán • Tierra Sur • Maqui',
                  focal: 'Next.js Turbopack • GSAP 120 FPS',
                },
                {
                  id: 'edicion-fotografica',
                  title: 'Edición Fotográfica',
                  tag: 'REVELADO FINE-ART',
                  href: '/servicios/edicion-fotografica',
                  icon: Sliders,
                  clients: 'Colecciones de Autor • Ediciones Fine-Art',
                  focal: 'Sony FE 100mm f/2.8 STF GM',
                },
                {
                  id: 'editorial',
                  title: 'Diseño Editorial',
                  tag: 'MEMORIAS & LIBROS',
                  href: '/servicios/editorial',
                  icon: BookOpen,
                  clients: 'Libro Fotográfico Alejo Lattes • Phyllum',
                  focal: 'Sony FE 35mm f/1.4 GM',
                },
                {
                  id: 'redes-sociales',
                  title: 'Redes Sociales',
                  tag: 'DIRECCIÓN DIGITAL',
                  href: '/servicios/redes-sociales',
                  icon: Share2,
                  clients: 'Hotelería Boutique • Turismo Aventura',
                  focal: 'Sony FE 16-35mm f/2.8 GM',
                },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.id}
                    className="p-6 rounded-3xl bg-[#13161d] border border-white/10 space-y-4 hover:border-[#59BFD6]/40 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#59BFD6]/10 text-[#59BFD6] flex items-center justify-center border border-[#59BFD6]/20">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs text-white/40">[ 0{idx + 1} / 06 ]</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#59BFD6] uppercase tracking-wider block">
                          {s.tag}
                        </span>
                        <h3 className="font-condensed text-2xl font-bold uppercase text-white">
                          {s.title}
                        </h3>
                      </div>
                      <div className="space-y-1 text-xs font-mono text-white/60">
                        <p><span className="text-white/40">Óptica: </span>{s.focal}</p>
                        <p><span className="text-white/40">Clientes: </span>{s.clients}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <Link
                        href={s.href}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#59BFD6] hover:underline"
                      >
                        <span>Ver Landing Pública</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* TAB 4: CLIENTES & ALIANZAS TERRITORIALES                           */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'clientes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-condensed text-2xl font-bold uppercase text-white">
                  Directorio de Alianzas Territoriales ({CLIENT_LOGOS.length} Marcas)
                </h2>
                <p className="font-sans text-xs text-white/60">
                  Empresas e industrias de Los Lagos, Chiloé, Aysén y Magallanes documentadas
                </p>
              </div>

              <Link
                href="/clientes"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs uppercase tracking-wider text-white transition-colors"
              >
                <span>Ver Sección en Vivo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {CLIENT_LOGOS.map((client) => (
                <div
                  key={client.id}
                  className="p-4 rounded-2xl bg-[#13161d] border border-white/10 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/40">#{client.id}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-condensed text-lg font-bold uppercase text-white">
                      {client.name}
                    </h4>
                    <span className="font-sans text-xs text-[#59BFD6] block">
                      {client.scope}
                    </span>
                    <span className="font-mono text-[10px] text-white/40 block mt-0.5">
                      {client.region}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/5 font-mono text-[9px] text-white/30 truncate">
                    Asset: {client.file}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* TAB 5: BUZÓN & EXPEDICIONES (LEADS)                                */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#13161d] border border-white/10 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#59BFD6]">
                  Mesa de Despacho & Expedición
                </span>
                <h2 className="font-condensed text-3xl font-bold uppercase text-white">
                  Enrutamiento Directo de Consultas & Cotizaciones
                </h2>
                <p className="font-sans text-sm text-white/70 max-w-2xl leading-relaxed">
                  Las solicitudes de cotización generadas por el cotizador y el formulario de contacto se despachan de forma instantánea y en tiempo real a los canales de la mesa directiva:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#C29B63] block">
                    Dirección Comercial & Cotizaciones
                  </span>
                  <h3 className="font-condensed text-xl font-bold uppercase text-white">
                    Paula Valdivieso
                  </h3>
                  <div className="space-y-1.5 font-mono text-xs text-white/80">
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#59BFD6]" />
                      <span>paula.valdivieso@puelchelab.cl</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#59BFD6]" />
                      <span>+56 9 6617 7500 (WhatsApp Live)</span>
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#59BFD6] block">
                    Fundador & Dirección Creativa
                  </span>
                  <h3 className="font-condensed text-xl font-bold uppercase text-white">
                    Alejandro Lattes Corona
                  </h3>
                  <div className="space-y-1.5 font-mono text-xs text-white/80">
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#59BFD6]" />
                      <span>alejandro@puelchelab.cl</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#59BFD6]" />
                      <span>+56 9 9936 3705</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#59BFD6]/10 border border-[#59BFD6]/20 text-xs font-mono text-white/80 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#59BFD6] shrink-0" />
                <span>
                  Los clientes que cotizan en <code>/cotizador</code> o solicitan auditoría en <code>/auditor</code> envían un brief estructurado con desglose de páginas, add-ons seleccionados y total en UF y CLP listo para firma.
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
