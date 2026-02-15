import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Moodboard Supply — Creative Resources for Designers';
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
                    background: '#f3f4f6', // Light gray background
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'serif',
                }}
            >
                {/* Artistic collage background */}
                <div
                    style={{
                        position: 'absolute',
                        top: 50, left: 50, width: 300, height: 400,
                        background: '#e5e7eb',
                        borderRadius: '2px',
                        transform: 'rotate(-5deg)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: 50, right: 50, width: 350, height: 300,
                        background: '#d1d5db',
                        borderRadius: '2px',
                        transform: 'rotate(3deg)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: -50, right: 200, width: 200, height: 200,
                        background: '#fca5a5', // Soft red
                        borderRadius: '50%',
                        opacity: 0.5,
                        filter: 'blur(40px)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -50, left: 200, width: 200, height: 200,
                        background: '#93c5fd', // Soft blue
                        borderRadius: '50%',
                        opacity: 0.5,
                        filter: 'blur(40px)',
                    }}
                />

                {/* Content Card */}
                <div
                    style={{
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(12px)',
                        padding: '40px 80px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 10,
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div style={{ fontSize: 48, marginBottom: 10 }}>🎨</div>
                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 400,
                            color: '#1f2937',
                            letterSpacing: '-0.02em',
                            fontStyle: 'italic',
                        }}
                    >
                        Moodboard Supply
                    </div>
                    <div
                        style={{
                            width: 100,
                            height: 1,
                            background: '#000',
                            margin: '20px 0',
                        }}
                    />
                    <div
                        style={{
                            fontSize: 24,
                            color: '#4b5563',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 600,
                            fontFamily: 'sans-serif',
                        }}
                    >
                        Curated Assets for Creators
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
