import { Suspense } from 'react';
import { getAllVibes } from '@/lib/vibes';
import { HomepageContent } from '@/components/HomepageContent';
import { AdSlot } from '@/components/AdSlot';
import { AD_SLOT_IDS } from '@/lib/constants';

export default function Home() {
  const vibes = getAllVibes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Design vibes, ready to use.
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-[var(--color-secondary)] max-w-2xl mx-auto">
          Curated aesthetic kits — colors, fonts, and visual direction. All in one card.
        </p>
      </section>

      {/* Ad Slot: Homepage Leaderboard */}
      {AD_SLOT_IDS.HOMEPAGE_LEADERBOARD && (
        <div className="max-w-4xl mx-auto mb-12">
          <AdSlot id={AD_SLOT_IDS.HOMEPAGE_LEADERBOARD} format="horizontal" />
        </div>
      )}

      {/* Filter + Grid */}
      <section className="pb-16">
        <Suspense fallback={null}>
          <HomepageContent allVibes={vibes} />
        </Suspense>
      </section>
    </div>
  );
}
