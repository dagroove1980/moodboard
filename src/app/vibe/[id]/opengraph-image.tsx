import { ImageResponse } from 'next/og';
import { getAllVibes, getVibeById } from '@/lib/vibes';
import { textColorForBg } from '@/lib/colors';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export async function generateStaticParams() {
  return getAllVibes().map((v) => ({ id: v.id }));
}

export default async function OGImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vibe = getVibeById(id);
  if (!vibe) {
    return new ImageResponse(
      <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
        Not found
      </div>,
      { ...size }
    );
  }

  const bgColor = vibe.colors[2] || vibe.colors[0];
  const textColor = textColorForBg(bgColor);
  const c = vibe.colors;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: bgColor,
          padding: 60,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 20, color: textColor, opacity: 0.6, marginBottom: 12 }}>
            {vibe.aesthetic}
          </div>
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, color: textColor, lineHeight: 1.1 }}>
            {vibe.name}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 48, fontWeight: 700, color: c[0] || textColor, lineHeight: 1.2 }}>
            {vibe.preview.heading}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: textColor, opacity: 0.7, marginTop: 12 }}>
            {vibe.preview.body}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 8, backgroundColor: c[0] }} />
            <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 8, backgroundColor: c[1] }} />
            <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 8, backgroundColor: c[2] }} />
            <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 8, backgroundColor: c[3] }} />
            {c[4] && <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 8, backgroundColor: c[4] }} />}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', fontSize: 16, color: textColor, opacity: 0.6 }}>
              {vibe.headingFont.family} + {vibe.bodyFont.family}
            </div>
            <div style={{ display: 'flex', fontSize: 18, fontWeight: 700, color: textColor, marginTop: 4 }}>
              moodboard.supply
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
