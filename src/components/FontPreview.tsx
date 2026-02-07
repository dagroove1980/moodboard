'use client';

import { FontSpec } from '@/types/vibe';
import { googleFontsLink } from '@/lib/fonts';

interface FontPreviewProps {
  font: FontSpec;
  label: string;
  color?: string;
}

const SPECIMEN_TEXT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const PARAGRAPH_TEXT = 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.';

export function FontPreview({ font, label, color }: FontPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--color-secondary)]">{label}</p>
          <p className="text-sm font-mono mt-0.5">{font.family}</p>
        </div>
        <a
          href={googleFontsLink(font.family)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--color-accent)] hover:underline"
        >
          Open in Google Fonts
        </a>
      </div>

      {/* Large specimen */}
      <div
        className="text-4xl sm:text-5xl leading-tight"
        style={{
          fontFamily: `"${font.family}", serif`,
          fontWeight: font.weight,
          color: color || 'var(--color-foreground)',
        }}
      >
        Aa
      </div>

      {/* Alphabet */}
      <p
        className="text-sm leading-relaxed text-[var(--color-secondary)] break-all"
        style={{
          fontFamily: `"${font.family}", serif`,
          fontWeight: font.weight,
        }}
      >
        {SPECIMEN_TEXT}
      </p>

      {/* Paragraph */}
      <p
        className="text-base leading-relaxed"
        style={{
          fontFamily: `"${font.family}", serif`,
          fontWeight: font.weight,
          color: color || 'var(--color-foreground)',
        }}
      >
        {PARAGRAPH_TEXT}
      </p>
    </div>
  );
}
