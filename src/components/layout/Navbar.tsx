'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SoundscapeToggle } from '@/components/ui/SoundscapeToggle';

const PORTFOLIO_DROPDOWN = [
  { label: 'Diseño de Marca', href: '/servicios/branding' },
  { label: 'Desarrollo Web', href: '/servicios/desarrollo-web' },
  { label: 'Fotografía', href: '/servicios/fotografia' },
  { label: 'Edición Fotográfica', href: '/servicios/edicion-fotografica' },
  { label: 'Diseño Editorial', href: '/servicios/editorial' },
  { label: 'Redes Sociales', href: '/servicios/redes-sociales' },
];

const CLIENT_NAV_LINK = { label: 'Clientes', href: '/clientes' };

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isPortfolioActive =
    pathname === '/portafolio' || pathname.startsWith('/servicios');

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#2B2D31]/85 backdrop-blur-md border-b border-white/10 shadow-lg h-[70px] flex items-center transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: logo-top.png */}
        <Link href="/" className="flex items-center py-1 group shrink-0" aria-label="Puelche Lab Inicio">
          <Image
            src="/images/real/logo-top.png"
            alt="Puelche Lab — Estudio de Diseño Cross Media y Fotografía"
            width={220}
            height={55}
            priority
            className="h-8 md:h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 font-condensed uppercase tracking-wider text-[14px] xl:text-[15px] font-medium text-white">
          <Link
            href="/"
            className={cn(
              'transition-colors py-2 hover:text-puelche-cyan relative',
              pathname === '/' ? 'text-puelche-cyan font-semibold' : 'text-white'
            )}
          >
            HOME
          </Link>

          <Link
            href="/servicios"
            className={cn(
              'transition-colors py-2 hover:text-puelche-cyan relative',
              pathname === '/servicios' ? 'text-puelche-cyan font-semibold' : 'text-white'
            )}
          >
            SERVICIOS
          </Link>

          {/* Portafolio Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              href="/portafolio"
              className={cn(
                'inline-flex items-center gap-1.5 transition-colors py-2 hover:text-puelche-cyan relative',
                pathname === '/portafolio' ? 'text-puelche-cyan font-semibold' : 'text-white'
              )}
            >
              <span>PORTAFOLIO</span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  dropdownOpen ? 'rotate-180 text-puelche-cyan' : 'text-white/70'
                )}
              />
            </Link>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-60 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                <div className="bg-[#24262b] border border-white/15 shadow-2xl rounded-xl overflow-hidden py-1 backdrop-blur-xl">
                  <Link
                    href="/portafolio"
                    className="block px-4 py-2.5 text-xs font-condensed tracking-wider uppercase transition-colors border-b border-white/10 text-[#59BFD6] font-bold hover:bg-white/10"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Ver Todo el Portafolio &rarr;
                  </Link>
                  {PORTFOLIO_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block px-4 py-2 text-xs font-condensed tracking-wider uppercase transition-colors border-b border-white/5 last:border-0 hover:bg-white/10 hover:text-puelche-cyan',
                        pathname === item.href ? 'text-puelche-cyan bg-white/10 font-bold' : 'text-white/80'
                      )}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/auditor"
            className={cn(
              'inline-flex items-center gap-1.5 transition-colors py-2 hover:text-puelche-cyan relative',
              pathname === '/auditor' ? 'text-puelche-cyan font-semibold' : 'text-white'
            )}
          >
            <span>AUDITOR</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#59BFD6]/20 text-[#59BFD6] font-mono text-[9px] uppercase tracking-normal">
              20s
            </span>
          </Link>

          <Link
            href="/clientes"
            className={cn(
              'transition-colors py-2 hover:text-puelche-cyan relative',
              pathname === '/clientes' ? 'text-puelche-cyan font-semibold' : 'text-white'
            )}
          >
            CLIENTES
          </Link>

          <Link
            href="/contacto"
            className={cn(
              'transition-colors py-2 hover:text-puelche-cyan relative',
              pathname === '/contacto' ? 'text-puelche-cyan font-semibold' : 'text-white'
            )}
          >
            CONTACTO
          </Link>
        </nav>

        {/* CTA & Soundscape & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <SoundscapeToggle />

          <Link
            href="/cotizador"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-puelche-cyan text-white hover:bg-puelche-cyan-dark font-condensed uppercase tracking-wider text-xs font-bold transition-all duration-200 shadow"
          >
            <span>Cotizar Proyecto</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            className="lg:hidden p-2 text-white hover:text-puelche-cyan focus:outline-none"
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Hidden SEO navigation anchors */}
      <div className="sr-only">
        <Link href="/servicios/fotografia">Fotografía</Link>
        <Link href="/servicios/branding">Branding</Link>
        <Link href="/servicios/desarrollo-web">Desarrollo Web</Link>
        <Link href="/servicios/editorial">Editorial</Link>
        <Link href="/clientes">Clientes</Link>
        <Link href="/contacto">Cotizar Proyecto</Link>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-puelche-slate border-b border-puelche-slate-dark shadow-2xl py-6 px-6 font-condensed uppercase tracking-wider text-base z-50 max-h-[calc(100vh-70px)] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'py-2 border-b border-white/10 font-bold',
                pathname === '/' ? 'text-puelche-cyan font-semibold' : 'text-white'
              )}
            >
              HOME
            </Link>

            <Link
              href="/servicios"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'py-2 border-b border-white/10 font-bold',
                pathname === '/servicios' ? 'text-puelche-cyan font-semibold' : 'text-white'
              )}
            >
              SERVICIOS
            </Link>

            <div className="py-2 border-b border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <Link
                  href="/portafolio"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'text-xs font-bold hover:text-puelche-cyan transition-colors',
                    pathname === '/portafolio' ? 'text-puelche-cyan' : 'text-white'
                  )}
                >
                  PORTAFOLIO COMPLETO &rarr;
                </Link>
              </div>
              <div className="pl-3 space-y-2 text-sm pt-1">
                {PORTFOLIO_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block py-1 text-white/90 hover:text-puelche-cyan text-xs',
                      pathname === item.href && 'text-puelche-cyan font-semibold'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/auditor"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'py-2 border-b border-white/10 font-bold flex items-center justify-between',
                pathname === '/auditor' ? 'text-puelche-cyan font-semibold' : 'text-white'
              )}
            >
              <span>AUDITOR DIGITAL</span>
              <span className="px-2 py-0.5 rounded-full bg-[#59BFD6]/20 text-[#59BFD6] font-mono text-[10px]">
                20s
              </span>
            </Link>

            <Link
              href="/cotizador"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'py-2 border-b border-white/10 font-bold flex items-center justify-between text-[#59BFD6]',
                pathname === '/cotizador' && 'font-bold'
              )}
            >
              <span>COTIZADOR PARAMÉTRICO</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/clientes"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'py-2 border-b border-white/10 font-bold',
                pathname === '/clientes' ? 'text-puelche-cyan font-semibold' : 'text-white'
              )}
            >
              CLIENTES
            </Link>

            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'py-2 font-bold',
                pathname === '/contacto' ? 'text-puelche-cyan font-semibold' : 'text-white'
              )}
            >
              CONTACTO
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
