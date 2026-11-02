import { ImageResponse } from 'next/og';

export const alt = 'Puelche Lab — Estudio de Diseño Cross Media & Fotografía en Puerto Varas';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0C0E',
          backgroundImage:
            'radial-gradient(circle at 50% 40%, rgba(89, 191, 214, 0.18) 0%, transparent 60%)',
          color: '#ffffff',
          padding: '48px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid border overlay */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid rgba(89, 191, 214, 0.25)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
        >
          {/* Safe-Zone 1:1 centered container (WhatsApp safe preview) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: '820px',
            }}
          >
            {/* Top eyebrow badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 16px',
                borderRadius: '999px',
                backgroundColor: 'rgba(89, 191, 214, 0.15)',
                border: '1px solid rgba(89, 191, 214, 0.4)',
                color: '#59BFD6',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              PUERTO VARAS • PATAGONIA • CHILE
            </div>

            {/* Main Brand Title */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '64px',
                fontWeight: 900,
                letterSpacing: '-1px',
                textTransform: 'uppercase',
                color: '#ffffff',
                lineHeight: 1.05,
                marginBottom: '16px',
              }}
            >
              <span>PUELCHE</span>
              <span style={{ color: '#59BFD6', marginLeft: '14px' }}>LAB</span>
            </div>

            {/* Subtitle / Positioning */}
            <div
              style={{
                display: 'flex',
                fontSize: '22px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.85)',
                letterSpacing: '0.5px',
                maxWidth: '700px',
                lineHeight: 1.4,
                marginBottom: '26px',
                textAlign: 'center',
              }}
            >
              Estudio de Diseño Cross Media, Fotografía de Autor & Plataformas Digitales
            </div>

            {/* Bottom Proof Metrics */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.65)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                paddingTop: '14px',
              }}
            >
              <span>AquaChile</span>
              <span>•</span>
              <span>Viajes Falabella</span>
              <span>•</span>
              <span>Arrebol Chiloé</span>
              <span>•</span>
              <span>Turistour</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
