'use client';

import React from 'react';

interface KineticTextSwapProps {
  primaryText: string;
  secondaryText?: string;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
}

/**
 * KineticTextSwap — Awwwards-style typographic rolling text swap.
 * On hover, the primary text glides out while the secondary text rolls into position
 * with cinematic cubic-bezier timing. Fully accessible with aria-hidden duplicate.
 */
export function KineticTextSwap({
  primaryText,
  secondaryText = primaryText,
  className = '',
  primaryClassName = '',
  secondaryClassName = 'text-[#59BFD6]',
}: KineticTextSwapProps) {
  return (
    <span
      className={`group/kinetic relative inline-flex flex-col overflow-hidden leading-tight select-none ${className}`}
    >
      {/* Primary Text Layer */}
      <span
        className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/kinetic:-translate-y-full motion-reduce:transform-none ${primaryClassName}`}
      >
        {primaryText}
      </span>

      {/* Duplicate / Accent Text Layer Rolling In */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover/kinetic:translate-y-0 motion-reduce:hidden ${secondaryClassName}`}
      >
        {secondaryText}
      </span>
    </span>
  );
}

export default KineticTextSwap;
