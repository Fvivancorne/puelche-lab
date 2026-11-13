export interface ClientLogo {
  id: number;
  name: string;
  file: string;
  projectSlug?: string;
  scope: string;
  region: string;
  websiteUrl?: string;
}

export const ADMIN_CLIENT_LOGOS: ClientLogo[] = [
  { id: 1, name: 'AquaChile', file: 'cliente1-1.png', projectSlug: 'aquachile', scope: 'Fotografía Industrial & Procesos', region: 'Puerto Montt & Fiordos', websiteUrl: 'https://www.aquachile.com' },
  { id: 2, name: 'Soldasur', file: 'cliente2-1.png', projectSlug: 'soldasur', scope: 'Soldadura Marina & Faenas', region: 'Puerto Montt' },
  { id: 3, name: 'Seremi del Medio Ambiente', file: 'cliente3-1.png', scope: 'Campañas Ambientales & Conservación', region: 'Región de Los Lagos', websiteUrl: 'https://mma.gob.cl' },
  { id: 4, name: 'Anasac', file: 'cliente4-1.png', scope: 'Agroindustria & Alimentos', region: 'Zona Sur Austral', websiteUrl: 'https://www.anasac.cl' },
  { id: 5, name: 'Estancia Rilán', file: 'cliente5-1.png', projectSlug: 'estancia-rilan', scope: 'Fotografía Arquitectura & Cava', region: 'Península de Rilán, Chiloé', websiteUrl: 'https://estanciarilan.cl' },
  { id: 6, name: 'Hotel Quilquico', file: 'cliente6-1.png', scope: 'Hospitalidad & Turismo Rural', region: 'Chiloé' },
  { id: 7, name: 'Hotel Costaustralis', file: 'cliente7-1.png', projectSlug: 'hotel-costaustralis', scope: 'Fotografía Hotelera & Catálogo', region: 'Puerto Natales, Patagonia', websiteUrl: 'https://hotelcostaustralis.com' },
  { id: 8, name: 'Hotel Cabo de Hornos', file: 'cliente8-1.png', projectSlug: 'hotel-cabo-de-hornos', scope: 'Dirección de Arte & Campaña', region: 'Punta Arenas', websiteUrl: 'https://hotelcabodehornos.com' },
  { id: 9, name: 'Viajes Falabella', file: 'cliente9-1.png', projectSlug: 'viajes-falabella-patagonia', scope: 'Diseño Editorial Guía Patagonia', region: 'Chile & Argentina', websiteUrl: 'https://www.viajesfalabella.cl' },
  { id: 10, name: 'Cala Melí', file: 'cliente10-1.png', projectSlug: 'cala-meli', scope: 'Fotografía de Interiores & Web', region: 'Puerto Varas' },
  { id: 11, name: 'Tagua Tagua Lodge', file: 'cliente11-1.png', projectSlug: 'tagua-tagua-lodge', scope: 'Dron Paisajístico & Contenido', region: 'Río Puelo / Cochamó' },
  { id: 12, name: 'Hotel Ohana', file: 'cliente12-1.png', projectSlug: 'hotel-ohana', scope: 'Hospitalidad & Arquitectura', region: 'Rapa Nui' },
  { id: 13, name: 'Gallo Negro', file: 'cliente13-1.png', projectSlug: 'gallo-negro-marca', scope: 'Identidad de Marca & Gastro', region: 'Puerto Varas' },
  { id: 14, name: 'Blue Seal Subsea', file: 'cliente14-1.png', projectSlug: 'blue-seal', scope: 'Identidad de Marca & Robótica', region: 'Puerto Montt' },
  { id: 15, name: 'Cirumed', file: 'cliente15-1.png', projectSlug: 'cirumed-marca', scope: 'Fotografía de Catálogo Clínico', region: 'Los Lagos' },
  { id: 16, name: 'El Triwe', file: 'cliente16-1.png', scope: 'Hotelería & Refugios Nativos', region: 'Cuenca Llanquihue' },
  { id: 17, name: 'Centro Maqui', file: 'cliente17-1.png', projectSlug: 'centro-maqui-marca', scope: 'Atención Integral & Salud Infantil', region: 'Llanquihue' },
  { id: 18, name: 'ARMH', file: 'cliente18-1.png', scope: 'Diseño Técnico & Comunicaciones', region: 'Puerto Montt' },
  { id: 19, name: 'San Ambrosio', file: 'cliente19-1.png', scope: 'Servicios Navieros & Rescate', region: 'Osorno / Frutillar' },
  { id: 20, name: 'Saltos del Maullín', file: 'cliente20-1.png', scope: 'Ecoturismo & Fotografía Aérea', region: 'Llanquihue' },
];
