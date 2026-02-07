import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getVibesByTag } from '@/lib/vibes';
import { TAG_INTROS, SITE_URL } from '@/lib/constants';
import { BrowsePage } from '@/components/BrowsePage';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const intro = TAG_INTROS[decodedTag];
  if (!intro) return {};

  return {
    title: intro.title,
    description: intro.description,
    alternates: { canonical: `${SITE_URL}/palettes/${tag}` },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const vibes = getVibesByTag(decodedTag);
  const intro = TAG_INTROS[decodedTag];

  if (vibes.length === 0 && !intro) notFound();

  return (
    <BrowsePage
      title={intro?.title || `${decodedTag} Palettes`}
      description={intro?.description}
      vibes={vibes}
      breadcrumbs={[
        { label: `${decodedTag} Palettes`, href: `/palettes/${tag}` },
      ]}
    />
  );
}
