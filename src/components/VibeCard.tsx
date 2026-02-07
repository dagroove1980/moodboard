'use client';

import Link from 'next/link';
import { Vibe } from '@/types/vibe';
import { getLightestColor, getDarkestColor, textColorForBg } from '@/lib/colors';
import { fontPairingLabel } from '@/lib/fonts';
import { ColorStrip } from './ColorStrip';
import { FontLoader } from './FontLoader';

interface VibeCardProps {
  vibe: Vibe;
}

export function VibeCard({ vibe }: VibeCardProps) {
  const bgColor = getLightestColor(vibe.colors);
  const headingColor = getDarkestColor(vibe.colors);
  const bodyColor = vibe.colors[3] || vibe.colors[1];
  const textOnBg = textColorForBg(bgColor);

  return (
    <article className="rounded-[var(--radius-card)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-lift overflow-hidden">
      <FontLoader fonts={[vibe.headingFont, vibe.bodyFont]}>
        {(fontsLoaded) => (
          <>
            {/* Preview Area */}
            <Link href={`/vibe/${vibe.id}`} className="block">
              <div
                className="relative px-6 py-10 sm:py-12"
                style={{ backgroundColor: bgColor }}
              >
                {/* Aesthetic badge */}
                <span
                  className="absolute top-3 right-3 text-[10px] font-medium px-2.5 py-1 rounded-[var(--radius-pill)] bg-white/80 backdrop-blur-sm"
                  style={{ color: headingColor }}
                >
                  {vibe.aesthetic}
                </span>

                {/* Preview text with font loading transition */}
                <h3
                  className={`text-2xl sm:text-3xl font-bold leading-tight transition-opacity duration-300 ${
                    fontsLoaded ? 'opacity-100' : 'opacity-70'
                  }`}
                  style={{
                    color: headingColor,
                    fontFamily: `"${vibe.headingFont.family}", serif`,
                    fontWeight: vibe.headingFont.weight,
                  }}
                >
                  {vibe.preview.heading}
                </h3>
                <p
                  className={`mt-2 text-sm sm:text-base transition-opacity duration-300 ${
                    fontsLoaded ? 'opacity-80' : 'opacity-50'
                  }`}
                  style={{
                    color: textOnBg === '#FFFFFF' ? '#FFFFFF' : bodyColor,
                    fontFamily: `"${vibe.bodyFont.family}", sans-serif`,
                    fontWeight: vibe.bodyFont.weight,
                  }}
                >
                  {vibe.preview.body}
                </p>
              </div>
            </Link>

            {/* Color Strip */}
            <div className="px-3 pt-3">
              <ColorStrip colors={vibe.colors} />
            </div>

            {/* Info Section */}
            <div className="px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link href={`/vibe/${vibe.id}`}>
                    <h4 className="font-bold text-sm truncate hover:text-[var(--color-accent)] transition-colors">
                      {vibe.name}
                    </h4>
                  </Link>
                  <p className="text-xs text-[var(--color-secondary)] font-mono mt-0.5 truncate">
                    {fontPairingLabel(vibe.headingFont.family, vibe.bodyFont.family)}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--color-secondary)] shrink-0">
                  <svg className="w-3.5 h-3.5 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  <span>{vibe.likes.toLocaleString()}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {vibe.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/palettes/${encodeURIComponent(tag)}`}
                    className="text-[10px] px-2 py-0.5 rounded-[var(--radius-pill)] bg-[var(--color-background)] text-[var(--color-secondary)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-border)] transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </FontLoader>
    </article>
  );
}
