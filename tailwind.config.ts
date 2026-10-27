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
        background: '#F9F9F6',
        surface: '#FFFFFF',
        surfaceSecondary: '#F1F1EB',
        borderSubtle: '#EBEBE5',
        textPrimary: '#18191B',
        textSecondary: '#666863',
        textMuted: '#8E9089',
        puelche: {
          canvas: '#F9F9F6',
          sand: '#F1F1EB',
          ink: '#18191B',
          charcoal: '#666863',
          muted: '#8E9089',
          border: '#E8E8E0',
          copper: '#C29B63',
          forest: '#2C3A32',
          DEFAULT: '#C29B63',
          light: '#E6D5B8',
          dark: '#9E7843',
        },
        forest: {
          DEFAULT: '#2C3A32',
          light: '#3D5045',
          dark: '#1B241F',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.15em',
      },
    },
  },
  plugins: [],
};

export default config;
