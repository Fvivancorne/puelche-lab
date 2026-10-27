'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const PORTFOLIO_DROPDOWN = [
  { label: 'Diseño de Marca', href: '/servicios/branding' },
  { label: 'Desarrollo Web', href: '/servicios/desarrollo-web' },
  { label: 'Fotografía', href: '/servicios/fotografia' },
  { label: 'Edición Fotográfica', href: '/servicios/edicion-fotografica' },
  { label: 'Diseño Editorial', href: '/servicios/editorial' },
  { label: 'Redes Sociales', href: '/servicios/redes-sociales' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isPortfolioActive =
    pathname === '/portafolio' || pathname.startsWith('/servicios');

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-puelche-slate border-b border-puelche-slate-dark/40 shadow-md h-[70px] flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: logo-top.png */}
        <Link href="/" className="flex items-center py-1 group" aria-label="Puelche Lab Inicio">
          <Image
            src="/images/real/logo-top.png"
            alt="Puelche Lab — Estudio de Diseño Cross Media y Fotografía"
            width={220}
            height={55}
            priority
            className="h-9 sm:h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-condensed uppercase tracking-wider text-[15px] font-medium text-white">
          <Link
            href="/"
            className={cn(
              'transition-colors py-2 hover:text-puelche-cyan',
              pathname === '/' ? 'text-puelche-cyan font-semibold' : 'text-white'
            )}
          >
            Home
          </Link>

          {/* Portafolio Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              href="/servicios/fotografia"
              className={cn(
                'inline-flex items-center gap-1.5 transition-colors py-2 hover:text-puelche-cyan',
                isPortfolioActive ? 'text-puelche-cyan font-semibold' : 'text-white'
              )}
            >
              <span>Portafolio</span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  dropdownOpen ? 'rotate-180 text-puelche-cyan' : 'text-white/70'
                )}
              />
            </Link>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-56 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-puelche-slate border border-puelche-slate-light/30 shadow-xl rounded-md overflow-hidden py-1">
                  {PORTFOLIO_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block px-4 py-2.5 text-sm uppercase tracking-wide transition-colors border-b border-puelche-slate-light/10 last:border-0 hover:bg-puelche-slate-dark hover:text-puelche-cyan',
                        pathname === item.href ? 'text-puelche-cyan bg-puelche-slate-dark/50' : 'text-white/90'
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
            href="/clientes"
            className={cn(
              'transition-colors py-2 hover:text-puelche-cyan',
              pathname === '/clientes' ? 'text-puelche-cyan font-semibold' : 'text-white'
            )}
          >
            Clientes
          </Link>

          <Link
            href="/contacto"
            className={cn(
              'transition-colors py-2 hover:text-puelche-cyan',
              pathname === '/contacto' ? 'text-puelche-cyan font-semibold' : 'text-white'
            )}
          >
            Contacto
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="p-2 text-white hover:text-puelche-cyan focus:outline-none"
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] bg-puelche-slate border-b border-puelche-slate-dark shadow-2xl py-6 px-6 font-condensed uppercase tracking-wider text-base z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'py-2 border-b border-puelche-slate-light/20',
                pathname === '/' ? 'text-puelche-cyan font-semibold' : 'text-white'
              )}
            >
              Home
            </Link>

            <div className="py-2 border-b border-puelche-slate-light/20 space-y-2">
              <span className="text-white/60 text-xs">Portafolio</span>
              <div className="pl-3 space-y-2 text-sm">
                {PORTFOLIO_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block py-1 text-white/90 hover:text-puelche-cyan',
                      pathname === item.href && 'text-puelche-cyan font-semibold'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/clientes"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'py-2 border-b border-puelche-slate-light/20',
                pathname === '/clientes' ? 'text-puelche-cyan font-semibold' : 'text-white'
              )}
            >
              Clientes
            </Link>

            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'py-2',
                pathname === '/contacto' ? 'text-puelche-cyan font-semibold' : 'text-white'
              )}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
