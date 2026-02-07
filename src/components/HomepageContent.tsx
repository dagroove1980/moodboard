'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Vibe, SortOption } from '@/types/vibe';
import { FilterBar } from './FilterBar';
import { VibeGrid } from './VibeGrid';

interface HomepageContentProps {
  allVibes: Vibe[];
}

export function HomepageContent({ allVibes }: HomepageContentProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');
  const activeMood = searchParams.get('mood');
  const activeSort = (searchParams.get('sort') ?? 'popular') as SortOption;

  const filteredVibes = useMemo(() => {
    let filtered = allVibes;

    if (activeTag) {
      filtered = filtered.filter((v) => v.tags.includes(activeTag));
    }
    if (activeMood) {
      filtered = filtered.filter((v) => v.moods.includes(activeMood));
    }

    switch (activeSort) {
      case 'popular':
        return [...filtered].sort((a, b) => b.likes - a.likes);
      case 'new':
        return [...filtered].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'random': {
        const shuffled = [...filtered];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      }
      default:
        return filtered;
    }
  }, [allVibes, activeTag, activeMood, activeSort]);

  return (
    <>
      <FilterBar />
      {filteredVibes.length > 0 ? (
        <VibeGrid vibes={filteredVibes} />
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-[var(--color-secondary)]">
            No vibes match your filters.
          </p>
          <p className="text-sm text-[var(--color-secondary)] mt-1">
            Try adjusting your filters or browse all vibes.
          </p>
        </div>
      )}
    </>
  );
}
