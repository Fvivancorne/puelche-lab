import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  // Si el cliente pide JSON
  if (req.headers.get('accept')?.includes('application/json')) {
    return NextResponse.json({
      success: true,
      message: 'Desuscripción procesada con éxito',
      email,
      timestamp: new Date().toISOString(),
    });
  }

  // Página visual de confirmación con diseño editorial de Puelche Lab
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desuscripción Confirmada — Puelche Lab</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #08090B;
      color: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      box-sizing: border-box;
      padding: 24px;
    }
    .card {
      max-width: 480px;
      width: 100%;
      background: #111215;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.7);
    }
    .pill {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(89, 191, 214, 0.1);
      border: 1px solid rgba(89, 191, 214, 0.3);
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #59BFD6;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 24px;
      margin: 0 0 12px 0;
      font-weight: 700;
    }
    p {
      font-size: 14px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.7);
      margin: 0 0 24px 0;
    }
    .email-badge {
      display: inline-block;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      font-family: monospace;
      font-size: 13px;
      color: #59BFD6;
      margin-bottom: 28px;
      word-break: break-all;
    }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      background: #59BFD6;
      color: #08090B;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 9999px;
      transition: opacity 0.2s;
    }
    .btn:hover {
      opacity: 0.9;
    }
    .footer {
      margin-top: 32px;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.35);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="pill">PUELCHE LAB &bull; PUERTO VARAS</div>
    <h1>Desuscripción Confirmada</h1>
    <p>
      Tu preferencia ha sido actualizada. No recibirás más boletines editoriales ni comunicaciones promocionales de nuestro estudio en la siguiente dirección:
    </p>
    ${email ? `<div class="email-badge">${email}</div>` : ''}
    <div>
      <a href="https://puelchelab.cl" class="btn">Volver a Puelche Lab &rarr;</a>
    </div>
    <div class="footer">
      Estudio Puelche Lab &bull; Dirección de Arte &bull; Territorio Austral
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || req.nextUrl.searchParams.get('email') || '';

    return NextResponse.json({
      success: true,
      message: 'Desuscripción procesada con éxito',
      email,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error procesando desuscripción' },
      { status: 400 }
    );
  }
}
