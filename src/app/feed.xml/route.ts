import { NextResponse } from 'next/server';
import { STUDIO_SERVICES } from '@/data/portfolio';

export async function GET() {
  const siteUrl = 'https://www.puelchelab.cl';
  const now = new Date().toUTCString();

  const itemsXml = STUDIO_SERVICES.map(service => `
    <item>
      <title><![CDATA[${service.title} | Puelche Lab Puerto Varas]]></title>
      <link>${siteUrl}${service.href}</link>
      <guid isPermaLink="true">${siteUrl}${service.href}</guid>
      <description><![CDATA[${service.shortDesc}. Estudio boutique de diseño cross-media y fotografía de autor en Puerto Varas, Región de Los Lagos, Patagonia Austral.]]></description>
      <pubDate>${now}</pubDate>
      <category>Diseño y Fotografía</category>
    </item>
  `).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#">
  <channel>
    <title>Puelche Lab — Estudio de Diseño Cross Media y Fotografía Austral</title>
    <link>${siteUrl}</link>
    <description>Publicaciones, proyectos y disciplinas de autor desde Puerto Varas, Patagonia Chilena. Optimizado para Google Publisher Center y Google AI Overviews.</description>
    <language>es-CL</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <geo:lat>-41.3195</geo:lat>
    <geo:long>-72.9854</geo:long>
    ${itemsXml}
  </channel>
</rss>`.trim();

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
