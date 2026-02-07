import { Metadata } from 'next';
import { getPopularVibes } from '@/lib/vibes';
import { BrowsePage } from '@/components/BrowsePage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Most Popular Design Vibes',
  description: 'Browse the most popular aesthetic kits — curated color palettes and font pairings loved by the community.',
  alternates: { canonical: `${SITE_URL}/popular` },
};

export default function PopularPage() {
  const vibes = getPopularVibes();

  return (
    <BrowsePage
      title="Most Popular Vibes"
      description="The most-loved aesthetic kits, sorted by community favorites."
      vibes={vibes}
      breadcrumbs={[{ label: 'Popular', href: '/popular' }]}
    />
  );
}
