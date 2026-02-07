import { Metadata } from 'next';
import { getNewVibes } from '@/lib/vibes';
import { BrowsePage } from '@/components/BrowsePage';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Newest Design Vibes',
  description: 'Discover the latest aesthetic kits — fresh color palettes and font pairings added recently.',
  alternates: { canonical: `${SITE_URL}/new` },
};

export default function NewPage() {
  const vibes = getNewVibes();

  return (
    <BrowsePage
      title="Newest Vibes"
      description="The latest aesthetic kits, added most recently."
      vibes={vibes}
      breadcrumbs={[{ label: 'New', href: '/new' }]}
    />
  );
}
