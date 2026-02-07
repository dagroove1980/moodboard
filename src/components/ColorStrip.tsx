'use client';

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface ColorStripProps {
  colors: string[];
}

export function ColorStrip({ colors }: ColorStripProps) {
  const { copy, copiedText } = useCopyToClipboard();

  return (
    <div className="flex h-8 rounded-lg overflow-hidden" role="group" aria-label="Color palette">
      {colors.map((color) => {
        const isCopied = copiedText === color;
        return (
          <button
            key={color}
            className="flex-1 relative group transition-all duration-200 hover:flex-[2] focus:flex-[2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-inset"
            style={{ backgroundColor: color }}
            onClick={() => copy(color)}
            title={`Copy ${color}`}
            aria-label={`Copy color ${color}`}
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
              <span className="text-[10px] font-mono font-medium px-1 py-0.5 rounded bg-white/90 text-[#1A1A1A] shadow-sm">
                {isCopied ? 'Copied' : color}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
