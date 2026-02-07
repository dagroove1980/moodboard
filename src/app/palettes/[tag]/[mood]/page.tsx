import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getValidTagMoodCombos, getVibesByTagAndMood } from '@/lib/vibes';
import { TAG_INTROS, MOOD_INTROS, SITE_URL } from '@/lib/constants';
import { BrowsePage } from '@/components/BrowsePage';

interface Props {
  params: Promise<{ tag: string; mood: string }>;
}

export async function generateStaticParams() {
  return getValidTagMoodCombos(3).map(({ tag, mood }) => ({ tag, mood }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag, mood } = await params;
  const decodedTag = decodeURIComponent(tag);
  const decodedMood = decodeURIComponent(mood);
  const title = `${capitalize(decodedMood)} ${capitalize(decodedTag)} Design Kits — Color Palettes & Font Pairings`;
  const description = `Browse ${decodedMood} ${decodedTag} aesthetic kits with curated color palettes and font pairings.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/palettes/${tag}/${mood}` },
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function TagMoodPage({ params }: Props) {
  const { tag, mood } = await params;
  const decodedTag = decodeURIComponent(tag);
  const decodedMood = decodeURIComponent(mood);
  const vibes = getVibesByTagAndMood(decodedTag, decodedMood);

  if (vibes.length < 3) notFound();

  const title = `${capitalize(decodedMood)} ${capitalize(decodedTag)} Design Kits`;
  const tagIntro = TAG_INTROS[decodedTag];
  const moodIntro = MOOD_INTROS[decodedMood];
  const description = tagIntro && moodIntro
    ? `${moodIntro.description} ${tagIntro.description}`
    : `Browse ${decodedMood} ${decodedTag} aesthetic kits with curated color palettes and font pairings.`;

  return (
    <BrowsePage
      title={title}
      description={description}
      vibes={vibes}
      breadcrumbs={[
        { label: `${capitalize(decodedTag)} Palettes`, href: `/palettes/${tag}` },
        { label: capitalize(decodedMood), href: `/palettes/${tag}/${mood}` },
      ]}
    />
  );
}
