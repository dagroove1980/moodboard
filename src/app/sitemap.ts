import { MetadataRoute } from 'next';
import { getAllVibes, getAllTags, getAllMoods, getValidTagMoodCombos } from '@/lib/vibes';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const vibes = getAllVibes();
  const tags = getAllTags();
  const moods = getAllMoods();
  const combos = getValidTagMoodCombos(3);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/popular`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/new`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/random`, changeFrequency: 'daily', priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const vibePages: MetadataRoute.Sitemap = vibes.map((v) => ({
    url: `${SITE_URL}/vibe/${v.id}`,
    lastModified: v.createdAt,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${SITE_URL}/palettes/${encodeURIComponent(tag)}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const moodPages: MetadataRoute.Sitemap = moods.map((mood) => ({
    url: `${SITE_URL}/moods/${encodeURIComponent(mood)}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const comboPages: MetadataRoute.Sitemap = combos.map(({ tag, mood }) => ({
    url: `${SITE_URL}/palettes/${encodeURIComponent(tag)}/${encodeURIComponent(mood)}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticPages, ...vibePages, ...tagPages, ...moodPages, ...comboPages];
}
