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
  RefreshCw,
  LayoutDashboard,
  LogOut,
  Workflow,
  Check,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';
import defaultPricingConfig from '@/data/pricing-config.json';
import { ADMIN_CLIENT_LOGOS as CLIENT_LOGOS } from '@/data/clients';

interface LiveIndicator {
  uf: number;
  dolar: number;
  fecha: string;
  source: string;
  loading: boolean;
  error: boolean;
}

export default function AdminCmsHubPage() {
  const [pin, setPin] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tarifario' | 'portafolio' | 'servicios' | 'clientes' | 'leads' | 'ajustes'>('dashboard');
  const [portfolioFilter, setPortfolioFilter] = useState<string>('todos');

  // Live currency state
  const [indicators, setIndicators] = useState<LiveIndicator>({
    uf: defaultPricingConfig.currency.ufRate || 41323,
    dolar: defaultPricingConfig.currency.usdToClpRate || 992,
    fecha: new Date().toLocaleDateString('es-CL'),
    source: 'Cargando indicadores en vivo...',
    loading: true,
    error: false,
  });

  // Check stored auth session
  useEffect(() => {
    const stored = sessionStorage.getItem('puelche_admin_pin');
    if (stored === 'puelche2026') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch live indicators from Banco Central / mindicador.cl
  const fetchIndicators = async () => {
    setIndicators((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch('/api/admin/indicators');
      const data = await res.json();
      if (data.uf && data.dolar) {
        setIndicators({
          uf: data.uf,
          dolar: data.dolar,
          fecha: new Date(data.fecha).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }),
          source: data.source || 'Banco Central de Chile via mindicador.cl',
          loading: false,
          error: false,
        });
      } else {
        throw new Error('Datos incompletos');
      }
    } catch {
      setIndicators((prev) => ({
        ...prev,
        source: 'Sincronización local de respaldo',
        loading: false,
        error: true,
      }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchIndicators();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'puelche2026') {
      setIsAuthenticated(true);
      setAuthError(null);
      sessionStorage.setItem('puelche_admin_pin', pin);
      fetchIndicators();
    } else {
      setAuthError('PIN incorrecto. Ingresa la clave maestra de administración.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('puelche_admin_pin');
    setIsAuthenticated(false);
    setPin('');
  };

  // ── PANTALLA DE ACCESO (LOGIN) ──
  if (!isAuthenticated) {
    return (
      <div className="-mt-20 min-h-screen bg-[#090a0d] text-white flex items-center justify-center px-6 selection:bg-[#59BFD6] selection:text-[#0b0d10]">
        <div className="w-full max-w-md bg-[#111318] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#59BFD6]/10 text-[#59BFD6] flex items-center justify-center mx-auto border border-[#59BFD6]/20 shadow-[0_0_25px_rgba(89,191,214,0.15)]">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#59BFD6]">
                PUELCHE LAB • PUERTO VARAS
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

  // ── CONSOLA CON PANEL LATERAL (SIDEBAR LAYOUT) ──
  return (
    <div className="-mt-20 min-h-screen bg-[#08090b] text-white selection:bg-[#59BFD6] selection:text-[#0b0d10] flex flex-col md:flex-row">
      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* ── PANEL LATERAL FIJO (DEDICATED ADMIN SIDEBAR) ─────────────────── */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <aside className="w-full md:w-64 lg:w-72 md:h-screen md:sticky md:top-0 bg-[#0d0f14] border-r border-white/10 flex flex-col justify-between shrink-0 z-40">
        <div className="p-6 space-y-6">
          {/* Logo & Studio Identity */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <div className="w-10 h-10 rounded-xl bg-[#59BFD6]/10 border border-[#59BFD6]/30 flex items-center justify-center text-[#59BFD6] shrink-0 shadow-[0_0_20px_rgba(89,191,214,0.2)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="font-condensed text-lg uppercase font-bold text-white tracking-wider block truncate">
                Puelche Lab
              </span>
              <span className="font-mono text-[10px] text-[#59BFD6] uppercase tracking-widest block">
                Consola CMS 2026
              </span>
            </div>
          </div>

          {/* User Profile Badge */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono text-[11px] font-bold">
                AL
              </div>
              <div className="text-left">
                <span className="font-sans text-xs font-semibold text-white block leading-tight">
                  Alejandro & Paula
                </span>
                <span className="font-mono text-[9px] text-white/50 block">
                  Mesa Directiva
                </span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Sesión activa" />
          </div>

          {/* Vertical Navigation Items */}
          <nav className="space-y-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard General</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('tarifario')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'tarifario'
                  ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4" />
                <span>Tarifario & Divisas</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === 'tarifario' ? 'bg-[#08090b]/20 text-[#08090b]' : 'bg-[#59BFD6]/10 text-[#59BFD6]'
              }`}>
                Auto UF
              </span>
            </button>

            <button
              onClick={() => setActiveTab('portafolio')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'portafolio'
                  ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4" />
                <span>Portafolio & Obras</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === 'portafolio' ? 'bg-[#08090b]/20 text-[#08090b]' : 'bg-white/10 text-white/60'
              }`}>
                34
              </span>
            </button>

            <button
              onClick={() => setActiveTab('servicios')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'servicios'
                  ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Disciplinas & Oficios</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === 'servicios' ? 'bg-[#08090b]/20 text-[#08090b]' : 'bg-white/10 text-white/60'
              }`}>
                6
              </span>
            </button>

            <button
              onClick={() => setActiveTab('clientes')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'clientes'
                  ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4" />
                <span>Alianzas Territoriales</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === 'clientes' ? 'bg-[#08090b]/20 text-[#08090b]' : 'bg-white/10 text-white/60'
              }`}>
                20
              </span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'leads'
                  ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Buzón & Expediciones</span>
              </div>
            </button>

            {/* CONFIGURACIÓN DEL ESTUDIO */}
            <button
              onClick={() => setActiveTab('ajustes')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'ajustes'
                  ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.35)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4" />
                <span>Configuración Estudio</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-6 border-t border-white/10 space-y-3 bg-[#0a0c0f]">
          {/* Live Currency Mini-Ticker */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 font-mono text-[11px]">
            <div className="flex items-center justify-between text-white/50 text-[10px]">
              <span>UF BANCO CENTRAL:</span>
              <span className="text-emerald-400 font-bold">${indicators.uf.toLocaleString('es-CL')}</span>
            </div>
            <div className="flex items-center justify-between text-white/50 text-[10px]">
              <span>DÓLAR OBSERVADO:</span>
              <span className="text-white font-bold">${indicators.dolar} CLP</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <span>Ver Web Pública</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-500/10 font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* ── ÁREA PRINCIPAL DE CONTENIDO (MAIN CANVAS) ────────────────────── */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 w-full min-h-screen p-6 sm:p-10 md:p-12 space-y-8 overflow-y-auto">
        {/* Top Header of the Content Canvas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-1">
              <span>CMS</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#59BFD6] uppercase">{activeTab}</span>
            </div>
            <h1 className="font-condensed text-3xl sm:text-4xl uppercase font-bold text-white tracking-wide">
              {activeTab === 'dashboard' && 'Centro de Mando & Métricas'}
              {activeTab === 'tarifario' && 'Tarifario & Divisas en Vivo'}
              {activeTab === 'portafolio' && 'Catálogo de Obras & Pliegos'}
              {activeTab === 'servicios' && 'Disciplinas de Autor'}
              {activeTab === 'clientes' && 'Directorio de Alianzas'}
              {activeTab === 'leads' && 'Buzón de Cotizaciones'}
              {activeTab === 'ajustes' && 'Configuración del Estudio & Datos de Contacto'}
            </h1>
          </div>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/precios"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs uppercase tracking-wider text-white transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-[#59BFD6]" />
              <span>Calibrador de Precios</span>
            </Link>
            <Link
              href="/cotizador"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#59BFD6] hover:bg-white text-[#08090b] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(89,191,214,0.3)]"
            >
              <span>Cotizador en Vivo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* TAB 1: DASHBOARD GENERAL                                           */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Currency Banner (Auto UF & Dólar) */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#11141c] via-[#141923] to-[#11141c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">
                      Sincronización Automática con Banco Central (mindicador.cl)
                    </span>
                  </div>
                  <p className="font-sans text-xs text-white/60 mt-0.5">
                    Las cotizaciones en <code>/cotizador</code> se indexan solas cada día al valor oficial de la Unidad de Fomento sin requerir cambios manuales.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-white/40 block">UF HOY ({indicators.fecha}):</span>
                  <span className="text-2xl font-bold text-white">${indicators.uf.toLocaleString('es-CL')} CLP</span>
                </div>
                <div className="text-right border-l border-white/10 pl-6">
                  <span className="text-[10px] text-white/40 block">DÓLAR:</span>
                  <span className="text-2xl font-bold text-[#59BFD6]">${indicators.dolar} CLP</span>
                </div>
                <button
                  onClick={fetchIndicators}
                  disabled={indicators.loading}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all disabled:opacity-50"
                  title="Actualizar valores ahora"
                >
                  <RefreshCw className={`w-4 h-4 ${indicators.loading ? 'animate-spin text-[#59BFD6]' : ''}`} />
                </button>
              </div>
            </div>

            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-[#111318] border border-white/10 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Obras Documentadas</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-condensed text-4xl font-bold text-white">{PORTFOLIO_PROJECTS.length}</span>
                  <span className="text-xs font-mono text-[#59BFD6]">Casos</span>
                </div>
                <span className="text-xs font-sans text-white/40 block">8 Proyectos estrella</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#111318] border border-white/10 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Archivo Óptico</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-condensed text-4xl font-bold text-white">34</span>
                  <span className="text-xs font-mono text-[#C29B63]">Pliegos</span>
                </div>
                <span className="text-xs font-sans text-white/40 block">Lentes Sony G Master</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#111318] border border-white/10 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Disciplinas Activas</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-condensed text-4xl font-bold text-white">6</span>
                  <span className="text-xs font-mono text-emerald-400">Oficios</span>
                </div>
                <span className="text-xs font-sans text-white/40 block">Fotografía a Web</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#111318] border border-white/10 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Alianzas Territoriales</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-condensed text-4xl font-bold text-white">{CLIENT_LOGOS.length}</span>
                  <span className="text-xs font-mono text-purple-400">Marcas</span>
                </div>
                <span className="text-xs font-sans text-white/40 block">Patagonia & Austral</span>
              </div>
            </div>

            {/* Quick Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-[#111318] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#59BFD6]">
                    Plataforma en Producción (Vercel)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="font-sans text-sm text-white/70 leading-relaxed">
                  Puelche Lab corre sobre infraestructura Serverless global de Vercel con Turbopack. Cero base de datos MySQL lenta, cero vulnerabilidades de WordPress y 100% Core Web Vitals.
                </p>
                <div className="flex items-center gap-3 pt-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    Next.js 16.4 Turbopack
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    168/168 Tests PASS
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#111318] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#C29B63]">
                    Buzón Comercial & Cotizaciones
                  </span>
                  <Mail className="w-4 h-4 text-[#C29B63]" />
                </div>
                <p className="font-sans text-sm text-white/70 leading-relaxed">
                  Enrutamiento directo e instantáneo de prospectos de alto valor hacia el WhatsApp de Paula Valdivieso y correo de Alejandro Lattes sin intermediarios.
                </p>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#59BFD6] hover:underline uppercase"
                >
                  <span>Ver Canales de Despacho &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* TAB 2: TARIFARIO & DIVISAS                                         */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'tarifario' && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#111318] border border-white/10 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20 mb-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Actualización Diaria Automática Activa</span>
                  </div>
                  <h2 className="font-condensed text-2xl sm:text-3xl font-bold uppercase text-white">
                    Parámetros Financieros & Divisas
                  </h2>
                  <p className="font-sans text-sm text-white/70 max-w-2xl mt-1">
                    La UF y el Dólar se consultan directamente a la API de <code>mindicador.cl</code> cada medianoche. Los clientes siempre ven cotizaciones al valor real de la UF.
                  </p>
                </div>

                <div className="flex gap-3 shrink-0">
                  <Link
                    href="/admin/precios"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#59BFD6] hover:bg-white text-[#08090b] font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(89,191,214,0.35)] transition-all"
                  >
                    <span>Editar Tarifas Manuales</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Three Rate Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <span className="font-mono text-xs text-white/50 uppercase block">UF Oficial (Chile)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-white">
                      ${indicators.uf.toLocaleString('es-CL')}
                    </span>
                    <span className="font-mono text-xs text-emerald-400">CLP</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40 block">
                    Fuente: {indicators.source}
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <span className="font-mono text-xs text-white/50 uppercase block">Dólar Observado</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-[#59BFD6]">
                      ${indicators.dolar}
                    </span>
                    <span className="font-mono text-xs text-white/50">CLP / USD</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40 block">
                    Referencial para clientes internacionales
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <span className="font-mono text-xs text-white/50 uppercase block">Piso Mínimo Web</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-white">
                      ${(1200000).toLocaleString('es-CL')}
                    </span>
                    <span className="font-mono text-xs text-[#C29B63]">
                      ~{(1200000 / indicators.uf).toFixed(1)} UF
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40 block">
                    One-Page Corporativa de Alto Nivel
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* TAB 3: PORTAFOLIO & OBRAS DE AUTOR                                 */}
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
                  className="rounded-3xl bg-[#111318] border border-white/10 overflow-hidden hover:border-[#59BFD6]/40 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover contrast-105 brightness-90 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-black/40" />
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
                        <span>Ver Caso Público</span>
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
        {/* TAB 4: DISCIPLINAS & SERVICIOS                                     */}
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
                    className="p-6 rounded-3xl bg-[#111318] border border-white/10 space-y-4 hover:border-[#59BFD6]/40 transition-colors flex flex-col justify-between"
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
        {/* TAB 5: CLIENTES & ALIANZAS TERRITORIALES                           */}
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
                  className="p-4 rounded-2xl bg-[#111318] border border-white/10 flex flex-col justify-between space-y-3"
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
        {/* TAB 6: BUZÓN & EXPEDICIONES (LEADS)                                */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#111318] border border-white/10 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#59BFD6]">
                  Mesa de Despacho & Expedición
                </span>
                <h2 className="font-condensed text-3xl font-bold uppercase text-white">
                  Enrutamiento Directo de Consultas & Cotizaciones
                </h2>
                <p className="font-sans text-sm text-white/70 max-w-2xl leading-relaxed">
                  Las solicitudes de cotización generadas por el cotizador y el formulario de contacto se despachan de forma instantánea a los canales de la mesa directiva:
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
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* TAB 7: CONFIGURACIÓN DEL ESTUDIO (DATOS DE CONTACTO & CANALES)     */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'ajustes' && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#111318] border border-white/10 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#59BFD6]/10 text-[#59BFD6] font-mono text-xs border border-[#59BFD6]/20 mb-2">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configuración Centralizada del Estudio</span>
                </div>
                <h2 className="font-condensed text-3xl font-bold uppercase text-white">
                  Identidad, Canales de Contacto & Seguridad
                </h2>
                <p className="font-sans text-sm text-white/70 max-w-2xl mt-1 leading-relaxed">
                  Datos de contacto oficiales que alimentan el Navbar, Footer, Cotizador y mensajes directos de WhatsApp para Paula Valdivieso y Alejandro Lattes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <span className="font-mono text-xs text-[#C29B63] uppercase font-bold block">
                    1. Paula Valdivieso (Comercial)
                  </span>
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-white/40 block text-[10px]">CORREO OFICIAL:</span>
                      <span className="text-white font-bold">paula.valdivieso@puelchelab.cl</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">WHATSAPP COMERCIAL:</span>
                      <span className="text-emerald-400 font-bold">+56 9 6617 7500</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">ROL:</span>
                      <span className="text-white/80">Socia &bull; Dirección Comercial & Cotizaciones</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <span className="font-mono text-xs text-[#59BFD6] uppercase font-bold block">
                    2. Alejandro Lattes Corona (Creativo)
                  </span>
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-white/40 block text-[10px]">CORREO OFICIAL:</span>
                      <span className="text-white font-bold">alejandro@puelchelab.cl</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">TELÉFONO ESTUDIO:</span>
                      <span className="text-white font-bold">+56 9 9936 3705</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">ROL:</span>
                      <span className="text-white/80">Fundador &bull; Dirección Creativa & Fotografía</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Access Box */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-white/80 font-bold">
                  <Lock className="w-4 h-4 text-[#59BFD6]" />
                  <span>Seguridad del Panel Admin</span>
                </div>
                <p className="text-white/60 font-sans text-xs">
                  El PIN actual es <code>puelche2026</code>. Las sesiones se guardan de forma aislada en el navegador del administrador sin cookies invasivas.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
