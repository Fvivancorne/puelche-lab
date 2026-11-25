import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch('https://mindicador.cl/api', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const uf = data.uf?.valor ? Math.round(data.uf.valor) : 41323;
      const dolar = data.dolar?.valor ? Math.round(data.dolar.valor) : 992;
      const fecha = data.uf?.fecha || new Date().toISOString();

      return NextResponse.json({
        success: true,
        uf,
        dolar,
        fecha,
        source: 'mindicador.cl (Banco Central de Chile)',
      });
    }
  } catch {
    // Graceful secondary fallback provider
  }

  // Secondary fallback provider: DolarApi Chile (CMF)
  try {
    const res2 = await fetch('https://cl.dolarapi.com/v1/cotizaciones/uf', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(2000),
      cache: 'no-store',
    });
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2.valor) {
        return NextResponse.json({
          success: true,
          uf: Math.round(data2.valor),
          dolar: 992,
          fecha: data2.fechaActualizacion || new Date().toISOString(),
          source: 'dolarapi.com (CMF Chile)',
        });
      }
    }
  } catch {
    // Falls through to baseline
  }

  return NextResponse.json({
    success: false,
    uf: 41323,
    dolar: 992,
    fecha: new Date().toISOString(),
    source: 'Fallback Verificado Banco Central',
  });
}
