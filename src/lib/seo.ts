import { Vibe } from '@/types/vibe';
import { SITE_URL } from './constants';

export function vibeStructuredData(vibe: Vibe) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${vibe.name} — ${vibe.aesthetic} Color Palette & Font Pairing`,
    description: vibeMetaDescription(vibe),
    url: `${SITE_URL}/vibe/${vibe.id}`,
    keywords: [...vibe.tags, ...vibe.moods, vibe.aesthetic].join(', '),
    dateCreated: vibe.createdAt,
    creator: {
      '@type': 'Organization',
      name: 'moodboard.supply',
    },
  };
}

export function vibeMetaDescription(vibe: Vibe): string {
  const colorWords = vibe.colors.slice(0, 3).join(', ');
  return `Get the ${vibe.name} design kit: ${colorWords} palette, paired with ${vibe.headingFont.family} + ${vibe.bodyFont.family}. Perfect for ${vibe.tags.join(', ')}.`;
}

export function coolorsUrl(colors: string[]): string {
  const hex = colors.map((c) => c.replace('#', '')).join('-');
  return `https://coolors.co/${hex}`;
}

export function canvaAffiliateUrl(): string {
  // Placeholder affiliate URL - replace with actual affiliate link
  return 'https://www.canva.com/';
}
