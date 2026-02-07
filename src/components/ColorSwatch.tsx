'use client';

import { hexToRgb, hexToHsl, textColorForBg } from '@/lib/colors';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface ColorSwatchProps {
  color: string;
}

export function ColorSwatch({ color }: ColorSwatchProps) {
  const { copy, copiedText } = useCopyToClipboard();
  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);
  const textColor = textColorForBg(color);

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const formats = [
    { label: 'HEX', value: color },
    { label: 'RGB', value: rgbStr },
    { label: 'HSL', value: hslStr },
  ];

  return (
    <div className="rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card)]">
      <div
        className="h-28 sm:h-36 flex items-end p-4"
        style={{ backgroundColor: color }}
      >
        <span
          className="text-sm font-mono font-medium"
          style={{ color: textColor }}
        >
          {color}
        </span>
      </div>
      <div className="bg-[var(--color-card)] p-3 space-y-1.5">
        {formats.map((f) => (
          <button
            key={f.label}
            onClick={() => copy(f.value)}
            className="flex items-center justify-between w-full text-left group hover:bg-[var(--color-background)] rounded px-2 py-1 -mx-2 transition-colors"
          >
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-secondary)]">
              {f.label}
            </span>
            <span className="text-xs font-mono text-[var(--color-foreground)]">
              {copiedText === f.value ? 'Copied!' : f.value}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
