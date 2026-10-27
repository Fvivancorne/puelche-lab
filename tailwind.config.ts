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
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        condensed: ['var(--font-condensed)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
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
