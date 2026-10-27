'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Portafolio', href: '/portafolio' },
  { label: 'Fotografía', href: '/servicios/fotografia' },
  { label: 'Branding', href: '/servicios/branding' },
  { label: 'Desarrollo Web', href: '/servicios/desarrollo-web' },
  { label: 'Editorial', href: '/servicios/editorial' },
  { label: 'Clientes', href: '/clientes' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 lg:px-16 py-4 md:py-6',
          isScrolled
            ? 'bg-[#F9F9F6]/90 backdrop-blur-md border-b border-[#E8E8E0] shadow-sm py-3 md:py-4'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Official Puelche Lab Brand Logo */}
          <Link href="/" className="group flex items-center py-1" aria-label="Puelche Lab Inicio">
            <Image
              src="/images/real/logo-top.png"
              alt="Puelche Lab — Estudio de Diseño Cross Media y Fotografía"
              width={250}
              height={63}
              priority
              className="h-8 md:h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-85"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#666863]">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors relative py-1 hover:text-[#18191B]',
                    active ? 'text-[#18191B] font-semibold' : 'text-[#666863]'
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C29B63]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contacto"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18191B] text-[#F9F9F6] hover:bg-[#2C3A32] text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105"
            >
              <span>Cotizar Proyecto</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C29B63]" />
            </Link>

            {/* Mobile menu toggle: default state aria-label="Abrir menú" */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 rounded-xl text-[#18191B] hover:bg-[#E8E8E0] transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F9F6] flex flex-col justify-between px-8 py-24 lg:hidden">
          <div className="space-y-6 pt-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8E9089]">
              [ Navegación ]
            </span>
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-3xl font-normal text-[#18191B] hover:text-[#C29B63] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-[#E8E8E0] space-y-4">
            <p className="text-xs font-mono uppercase text-[#8E9089]">
              Estudio de Diseño &bull; Puerto Varas &bull; Patagonia
            </p>
            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#18191B] text-[#F9F9F6] font-mono text-sm uppercase tracking-wider"
            >
              <span>Iniciar Conversación</span>
              <ArrowUpRight className="w-4 h-4 text-[#C29B63]" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
