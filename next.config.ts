import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
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
