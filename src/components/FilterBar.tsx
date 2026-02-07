'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ALL_TAGS, ALL_MOODS } from '@/lib/constants';
import { SortOption } from '@/types/vibe';

interface FilterBarProps {
  activeTag?: string | null;
  activeMood?: string | null;
  activeSort?: SortOption;
}

export function FilterBar({
  activeTag: propTag,
  activeMood: propMood,
  activeSort: propSort,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTag = propTag ?? searchParams.get('tag');
  const activeMood = propMood ?? searchParams.get('mood');
  const activeSort = (propSort ?? searchParams.get('sort') ?? 'popular') as SortOption;

  const updateParams = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const query = params.toString();
      router.push(query ? `/?${query}` : '/', { scroll: false });
    },
    [router, searchParams]
  );

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popular', label: 'Popular' },
    { value: 'new', label: 'New' },
    { value: 'random', label: 'Random' },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Tag pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Filter by use case">
        <button
          onClick={() => updateParams('tag', null)}
          className={`shrink-0 text-xs px-3.5 py-1.5 rounded-[var(--radius-pill)] transition-colors ${
            !activeTag
              ? 'bg-[var(--color-foreground)] text-[var(--color-background)]'
              : 'bg-[var(--color-card)] text-[var(--color-secondary)] hover:text-[var(--color-foreground)] border border-[var(--color-border)]'
          }`}
          role="tab"
          aria-selected={!activeTag}
        >
          All
        </button>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => updateParams('tag', activeTag === tag ? null : tag)}
            className={`shrink-0 text-xs px-3.5 py-1.5 rounded-[var(--radius-pill)] transition-colors capitalize ${
              activeTag === tag
                ? 'bg-[var(--color-foreground)] text-[var(--color-background)]'
                : 'bg-[var(--color-card)] text-[var(--color-secondary)] hover:text-[var(--color-foreground)] border border-[var(--color-border)]'
            }`}
            role="tab"
            aria-selected={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Mood pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Filter by mood">
        <button
          onClick={() => updateParams('mood', null)}
          className={`shrink-0 text-xs px-3.5 py-1.5 rounded-[var(--radius-pill)] transition-colors ${
            !activeMood
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-[var(--color-card)] text-[var(--color-secondary)] hover:text-[var(--color-foreground)] border border-[var(--color-border)]'
          }`}
          role="tab"
          aria-selected={!activeMood}
        >
          All Moods
        </button>
        {ALL_MOODS.map((mood) => (
          <button
            key={mood}
            onClick={() => updateParams('mood', activeMood === mood ? null : mood)}
            className={`shrink-0 text-xs px-3.5 py-1.5 rounded-[var(--radius-pill)] transition-colors capitalize ${
              activeMood === mood
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-card)] text-[var(--color-secondary)] hover:text-[var(--color-foreground)] border border-[var(--color-border)]'
            }`}
            role="tab"
            aria-selected={activeMood === mood}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Sort tabs */}
      <div className="flex gap-1 bg-[var(--color-card)] rounded-[var(--radius-pill)] p-1 w-fit border border-[var(--color-border)]" role="tablist" aria-label="Sort vibes">
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateParams('sort', opt.value === 'popular' ? null : opt.value)}
            className={`text-xs px-4 py-1.5 rounded-[var(--radius-pill)] transition-colors ${
              activeSort === opt.value
                ? 'bg-[var(--color-foreground)] text-[var(--color-background)]'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-foreground)]'
            }`}
            role="tab"
            aria-selected={activeSort === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
