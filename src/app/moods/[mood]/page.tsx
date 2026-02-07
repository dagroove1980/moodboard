import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllMoods, getVibesByMood } from '@/lib/vibes';
import { MOOD_INTROS, SITE_URL } from '@/lib/constants';
import { BrowsePage } from '@/components/BrowsePage';

interface Props {
  params: Promise<{ mood: string }>;
}

export async function generateStaticParams() {
  return getAllMoods().map((mood) => ({ mood }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mood } = await params;
  const decodedMood = decodeURIComponent(mood);
  const intro = MOOD_INTROS[decodedMood];
  if (!intro) return {};

  return {
    title: intro.title,
    description: intro.description,
    alternates: { canonical: `${SITE_URL}/moods/${mood}` },
  };
}

export default async function MoodPage({ params }: Props) {
  const { mood } = await params;
  const decodedMood = decodeURIComponent(mood);
  const vibes = getVibesByMood(decodedMood);
  const intro = MOOD_INTROS[decodedMood];

  if (vibes.length === 0 && !intro) notFound();

  return (
    <BrowsePage
      title={intro?.title || `${decodedMood} Vibes`}
      description={intro?.description}
      vibes={vibes}
      breadcrumbs={[
        { label: `${decodedMood} Vibes`, href: `/moods/${mood}` },
      ]}
    />
  );
}
