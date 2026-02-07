import { Metadata } from 'next';
import { getRandomVibes } from '@/lib/vibes';
import { BrowsePage } from '@/components/BrowsePage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Random Design Vibes',
  description: 'Discover random aesthetic kits — shuffle through curated color palettes and font pairings.',
  alternates: { canonical: `${SITE_URL}/random` },
};

export default function RandomPage() {
  const vibes = getRandomVibes();

  return (
    <BrowsePage
      title="Random Vibes"
      description="A random selection of aesthetic kits. Refresh for a new shuffle."
      vibes={vibes}
      breadcrumbs={[{ label: 'Random', href: '/random' }]}
    />
  );
}
