'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  Unlock, 
  DollarSign, 
  Layers, 
  Building2, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Sliders,
  ExternalLink,
  Shield
} from 'lucide-react';
import defaultPricingConfig from '@/data/pricing-config.json';

interface AddonItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  active: boolean;
}

interface CompanySize {
  id: string;
  label: string;
  desc: string;
  multiplier: number;
}

interface Tier {
  maxPages: number;
  basePrice: number;
  pricePerPage: number;
  baseWeeks: number;
}

interface PricingConfig {
  lastUpdated: string;
  updatedBy: string;
  currency: {
    usdToClpRate: number;
    ufRate?: number;
    label: string;
  };
  tiers: Tier[];
  companySizes: CompanySize[];
  addons: AddonItem[];
}

export default function AdminPreciosPage() {
  const [pin, setPin] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [config, setConfig] = useState<PricingConfig>(defaultPricingConfig as PricingConfig);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Check stored auth
  useEffect(() => {
    const stored = sessionStorage.getItem('puelche_admin_pin');
    if (stored === 'puelche2026') {
      setIsAuthenticated(true);
      fetchCurrentConfig();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'puelche2026') {
      setIsAuthenticated(true);
      setAuthError(null);
      sessionStorage.setItem('puelche_admin_pin', pin);
      fetchCurrentConfig();
    } else {
      setAuthError('PIN incorrecto. Ingresa el PIN maestro de administración.');
    }
  };

  const fetchCurrentConfig = async () => {
    try {
      const res = await fetch('/api/admin/pricing');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch {
      // Fallback to loaded default
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('puelche_admin_pin') || 'puelche2026'}`,
        },
        body: JSON.stringify({
          pin: 'puelche2026',
          updatedBy: 'Alejandro (Admin Panel)',
          config,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setSaveError(json.error || 'Error al guardar los cambios.');
      }
    } catch (err) {
      setSaveError('Fallo de conexión al guardar.');
    } finally {
      setIsSaving(false);
    }
  };

  // Updaters
  const updateUsdRate = (rate: number) => {
    setConfig((prev) => ({
      ...prev,
      currency: { ...prev.currency, usdToClpRate: rate },
    }));
  };

  const updateUfRate = (rate: number) => {
    setConfig((prev) => ({
      ...prev,
      currency: { ...prev.currency, ufRate: rate },
    }));
  };

  const updateSizeMultiplier = (id: string, multiplier: number) => {
    setConfig((prev) => ({
      ...prev,
      companySizes: prev.companySizes.map((s) => (s.id === id ? { ...s, multiplier } : s)),
    }));
  };

  const updateAddonPrice = (id: string, price: number) => {
    setConfig((prev) => ({
      ...prev,
      addons: prev.addons.map((a) => (a.id === id ? { ...a, price } : a)),
    }));
  };

  const toggleAddon = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      addons: prev.addons.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    }));
  };

  const updateTierPrice = (index: number, field: 'basePrice' | 'pricePerPage', val: number) => {
    setConfig((prev) => {
      const newTiers = [...prev.tiers];
      newTiers[index] = { ...newTiers[index], [field]: val };
      return { ...prev, tiers: newTiers };
    });
  };

  // Preview calculation
  const sampleBase = config.tiers[1]?.basePrice || 1800000;
  const sampleMultiplier = config.companySizes.find((s) => s.id === 'pyme')?.multiplier || 1.15;
  const sampleCalcClp = Math.round(sampleBase * sampleMultiplier);
  const sampleCalcUsd = Math.round(sampleCalcClp / (config.currency.usdToClpRate || 950));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111317] text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#161920] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#59BFD6]/10 text-[#59BFD6] flex items-center justify-center mx-auto border border-[#59BFD6]/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-condensed text-2xl uppercase font-bold text-white tracking-wider">
              Puelche Lab CMS
            </h1>
            <p className="font-sans text-xs text-white/60">
              Panel de Control de Tarifas & Configuración Paramétrica
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="pin-input" className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                PIN de Acceso Maestro
              </label>
              <input
                id="pin-input"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Ingresa tu clave de acceso"
                className="w-full bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-xl px-4 py-3 text-white font-mono text-sm outline-none transition-colors"
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
              className="w-full py-3.5 rounded-xl bg-[#59BFD6] hover:bg-[#4eaac0] text-[#0b0d10] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Ingresar al Panel de Alejandro</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="font-mono text-xs text-white/40 hover:text-white transition-colors">
              &larr; Volver al sitio público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111317] text-white selection:bg-[#59BFD6] selection:text-[#0b0d10] pb-24">
      {/* Header Superior */}
      <header className="sticky top-0 z-40 bg-[#161920]/90 backdrop-blur-md border-b border-white/10 px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/cotizador"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Ver Cotizador Público"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h1 className="font-condensed text-xl uppercase font-bold text-white tracking-wider">
                  Panel Admin &bull; Tarifario Puelche Lab
                </h1>
              </div>
              <p className="font-mono text-[11px] text-white/50">
                Ajuste en vivo de precios, multiplicadores y add-ons para cotizaciones
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sessionStorage.removeItem('puelche_admin_pin');
                setIsAuthenticated(false);
              }}
              className="px-3 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white font-mono text-xs transition-colors"
            >
              Cerrar Sesión
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#59BFD6] hover:bg-[#4eaac0] text-[#0b0d10] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{isSaving ? 'Guardando...' : 'Guardar Cambios en Vivo'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Alerta de guardado */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-6">
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Tarifas guardadas exitosamente. El cotizador público en /cotizador ya está actualizado con los nuevos valores.</span>
          </div>
        )}
        {saveError && (
          <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 font-mono text-xs flex items-center gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Columna Principal de Edición (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* SECCIÓN 1: TIPO DE CAMBIO */}
          <div className="bg-[#161920] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-condensed text-xl uppercase font-bold text-white tracking-wider flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#59BFD6]" />
                  <span>1. Moneda & Tipo de Cambio</span>
                </h2>
                <p className="font-mono text-xs text-white/50 pt-1">
                  Define la tasa de conversión para mostrar valores aproximados en dólares a clientes internacionales.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                  Valor 1 UF en CLP ($) (Estándar Nacional Chile)
                </label>
                <input
                  type="number"
                  value={config.currency.ufRate || 39200}
                  onChange={(e) => updateUfRate(Number(e.target.value) || 39200)}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-xl px-4 py-3 text-white font-mono text-sm outline-none"
                />
                <span className="font-mono text-[10px] text-white/40 block mt-1">
                  Permite anclar propuestas ejecutivas en Unidades de Fomento.
                </span>
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                  Tasa 1 USD en CLP ($) (Referencial Extranjero)
                </label>
                <input
                  type="number"
                  value={config.currency.usdToClpRate}
                  onChange={(e) => updateUsdRate(Number(e.target.value) || 950)}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#C29B63] rounded-xl px-4 py-3 text-white font-mono text-sm outline-none"
                />
                <span className="font-mono text-[10px] text-white/40 block mt-1">
                  Referencia secundaria para clientes internacionales.
                </span>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: ESCALAS DE EMPRESA */}
          <div className="bg-[#161920] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-condensed text-xl uppercase font-bold text-white tracking-wider flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#C29B63]" />
                  <span>2. Multiplicadores por Escala de Empresa</span>
                </h2>
                <p className="font-mono text-xs text-white/50 pt-1">
                  Factor que indexa el valor según la capacidad económica y complejidad de la organización.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.companySizes.map((size) => (
                <div key={size.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-white">{size.label}</span>
                    <span className="font-mono text-xs text-[#C29B63] font-bold">{size.multiplier}x</span>
                  </div>
                  <p className="font-mono text-[10px] text-white/50">{size.desc}</p>
                  <div className="pt-2">
                    <input
                      type="number"
                      step="0.05"
                      min="0.5"
                      max="3.0"
                      value={size.multiplier}
                      onChange={(e) => updateSizeMultiplier(size.id, parseFloat(e.target.value) || 1.0)}
                      className="w-full bg-white/5 border border-white/15 focus:border-[#C29B63] rounded-lg px-3 py-1.5 text-white font-mono text-xs outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECCIÓN 3: PRECIOS BASE POR PÁGINAS */}
          <div className="bg-[#161920] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-condensed text-xl uppercase font-bold text-white tracking-wider flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#59BFD6]" />
                  <span>3. Tramos de Páginas & Valor Base</span>
                </h2>
                <p className="font-mono text-xs text-white/50 pt-1">
                  Estructura de precios según el volumen de páginas del sitio web.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {config.tiers.map((tier, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <span className="font-mono text-xs font-bold text-white block">
                      {idx === 0 ? '1 Página (Landing de Autor)' : `Hasta ${tier.maxPages} Páginas`}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">Plazo estimado: {tier.baseWeeks} semanas</span>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-white/50 uppercase">Precio Base Tramo</label>
                    <input
                      type="number"
                      step="50000"
                      value={tier.basePrice}
                      onChange={(e) => updateTierPrice(idx, 'basePrice', Number(e.target.value) || 0)}
                      className="w-full bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-lg px-3 py-1.5 text-white font-mono text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-white/50 uppercase">Costo Página Adicional</label>
                    <input
                      type="number"
                      step="25000"
                      value={tier.pricePerPage}
                      onChange={(e) => updateTierPrice(idx, 'pricePerPage', Number(e.target.value) || 0)}
                      disabled={idx === 0}
                      className="w-full bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-lg px-3 py-1.5 text-white font-mono text-xs outline-none disabled:opacity-30"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECCIÓN 4: CATÁLOGO DE ADD-ONS */}
          <div className="bg-[#161920] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-condensed text-xl uppercase font-bold text-white tracking-wider flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-emerald-400" />
                  <span>4. Add-ons Especializados ({config.addons.length})</span>
                </h2>
                <p className="font-mono text-xs text-white/50 pt-1">
                  Servicios complementarios de fotografía, dron, SEO y branding.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {config.addons.map((addon) => (
                <div
                  key={addon.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    addon.active
                      ? 'bg-white/[0.03] border-white/10'
                      : 'bg-white/[0.01] border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-5 h-5 rounded-md mt-0.5 border flex items-center justify-center transition-colors ${
                          addon.active ? 'bg-[#59BFD6] border-[#59BFD6] text-[#0b0d10]' : 'border-white/20'
                        }`}
                        title={addon.active ? 'Desactivar add-on' : 'Activar add-on'}
                      >
                        {addon.active && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white">{addon.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 font-mono text-[9px]">
                            {addon.category}
                          </span>
                        </div>
                        <p className="font-mono text-[10px] text-white/50 pt-1">{addon.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs text-white/50">CLP $</span>
                      <input
                        type="number"
                        step="50000"
                        value={addon.price}
                        onChange={(e) => updateAddonPrice(addon.id, Number(e.target.value) || 0)}
                        className="w-32 bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-lg px-3 py-1.5 text-white font-mono text-xs outline-none text-right"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Lateral: Resumen en Vivo & Guardado (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 bg-gradient-to-b from-[#181c24] to-[#14161d] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#59BFD6] block">
                SIMULACIÓN DE PRUEBA
              </span>
              <h3 className="font-condensed text-2xl uppercase font-bold text-white mt-1">
                Ejemplo PyME (5 Págs)
              </h3>
            </div>

            <div className="space-y-2">
              <div className="font-condensed text-4xl font-black text-white">
                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(sampleCalcClp)}
              </div>
              <div className="font-mono text-sm text-[#59BFD6] font-semibold">
                &asymp; ${sampleCalcUsd.toLocaleString()} USD
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs text-white/70">
              <div className="flex justify-between">
                <span>Base (5 páginas):</span>
                <span>{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(sampleBase)}</span>
              </div>
              <div className="flex justify-between">
                <span>Factor PyME:</span>
                <span className="text-[#C29B63]">{sampleMultiplier}x</span>
              </div>
              <div className="flex justify-between">
                <span>Tasa Dólar:</span>
                <span>${config.currency.usdToClpRate} CLP</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-4 rounded-2xl bg-[#59BFD6] hover:bg-[#4eaac0] text-[#0b0d10] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{isSaving ? 'Guardando...' : 'Publicar Nuevos Precios'}</span>
              </button>

              <Link
                href="/cotizador"
                target="_blank"
                className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <span>Ver Cotizador en Vivo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-white/50 space-y-1">
              <div className="flex items-center gap-1.5 text-white/70">
                <Shield className="w-3.5 h-3.5 text-[#59BFD6]" />
                <span className="font-semibold">Seguridad Puelche Lab:</span>
              </div>
              <p>
                Los cambios se guardan directamente en el archivo de configuración de producción sin requerir código ni redespliegues.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
