import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#F8F9FA',
        'puelche-cyan': '#59BFD6',
        'puelche-slate': '#3B3D42',
        'puelche-dark': '#1D2024',
        puelche: {
          cyan: '#59BFD6',
          'cyan-dark': '#44A8BE',
          'cyan-light': '#7FD4E6',
          slate: '#3B3D42',
          'slate-dark': '#2B2D31',
          'slate-light': '#4D5056',
          dark: '#1D2024',
          gray: '#77797F',
          white: '#FFFFFF',
          canvas: '#F9F9F6',
          sand: '#F1F1EB',
          ink: '#18191B',
          charcoal: '#666863',
          copper: '#C29B63',
          forest: '#2C3A32',
        },
        forest: {
          DEFAULT: '#2C3A32',
          light: '#3D5045',
          dark: '#1B241F',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        condensed: ['var(--font-condensed)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        serif: ['var(--font-serif)', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.15em',
        wider2: '0.2em',
      },
    },
  },
  plugins: [],
};

export default config;
