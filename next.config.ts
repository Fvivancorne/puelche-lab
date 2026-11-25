import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    agentUpgrade: 'security',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.puelchelab.cl',
      },
      {
        protocol: 'https',
        hostname: 'mlj4vapaxyc9.i.optimole.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/cpanel', destination: 'https://cpanel.puelchelab.cl', permanent: false },
      { source: '/cpanel/', destination: 'https://cpanel.puelchelab.cl', permanent: false },
      { source: '/webmail', destination: 'https://webmail.puelchelab.cl', permanent: false },
      { source: '/webmail/', destination: 'https://webmail.puelchelab.cl', permanent: false },
      { source: '/diseno-de-marca', destination: '/servicios/branding', permanent: true },
      { source: '/diseno-de-marca/', destination: '/servicios/branding', permanent: true },
      { source: '/fotografia-y-edicion-2', destination: '/servicios/fotografia', permanent: true },
      { source: '/fotografia-y-edicion-2/', destination: '/servicios/fotografia', permanent: true },
      { source: '/edicion-fotografica', destination: '/servicios/fotografia', permanent: true },
      { source: '/edicion-fotografica/', destination: '/servicios/fotografia', permanent: true },
      { source: '/diseno-editorial', destination: '/servicios/editorial', permanent: true },
      { source: '/diseno-editorial/', destination: '/servicios/editorial', permanent: true },
      { source: '/redes-sociales', destination: '/servicios/branding', permanent: true },
      { source: '/redes-sociales/', destination: '/servicios/branding', permanent: true },
      { source: '/nuestros-clientes', destination: '/clientes', permanent: true },
      { source: '/nuestros-clientes/', destination: '/clientes', permanent: true },
    ];
  },
};

export default nextConfig;
