import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    borderRadius: 0, // Squared for "swatch" look
                    border: '1px solid #d1d5db',
                }}
            >
                🎨
            </div>
        ),
        {
            ...size,
        }
    );
}
