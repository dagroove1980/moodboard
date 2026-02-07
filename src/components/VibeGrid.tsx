'use client';

import { useState } from 'react';
import { Vibe } from '@/types/vibe';
import { VibeCard } from './VibeCard';
import { VIBES_PER_PAGE } from '@/lib/constants';

interface VibeGridProps {
  vibes: Vibe[];
  initialCount?: number;
}

export function VibeGrid({ vibes, initialCount = VIBES_PER_PAGE }: VibeGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const visibleVibes = vibes.slice(0, visibleCount);
  const hasMore = visibleCount < vibes.length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleVibes.map((vibe, index) => (
          <div key={vibe.id}>
            <VibeCard vibe={vibe} />
            {/* Ad slot every 12 cards */}
            {(index + 1) % 12 === 0 && index < visibleVibes.length - 1 && (
              <div className="col-span-full my-6" aria-hidden="true">
                {/* <!-- Ad Slot: In-Grid --> */}
                {/* AdSense will be inserted here */}
              </div>
            )}
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((c) => c + VIBES_PER_PAGE)}
            className="px-8 py-3 text-sm font-medium rounded-[var(--radius-pill)] bg-[var(--color-foreground)] text-[var(--color-background)] hover:opacity-90 transition-opacity"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
