import { Vibe, SortOption } from '@/types/vibe';
import vibesData from '../../data/vibes.json';

const vibes: Vibe[] = vibesData as Vibe[];

export function getAllVibes(): Vibe[] {
  return vibes;
}

export function getVibeById(id: string): Vibe | undefined {
  return vibes.find((v) => v.id === id);
}

export function getVibesByTag(tag: string): Vibe[] {
  return vibes.filter((v) => v.tags.includes(tag));
}

export function getVibesByMood(mood: string): Vibe[] {
  return vibes.filter((v) => v.moods.includes(mood));
}

export function getVibesByTagAndMood(tag: string, mood: string): Vibe[] {
  return vibes.filter((v) => v.tags.includes(tag) && v.moods.includes(mood));
}

export function getPopularVibes(): Vibe[] {
  return [...vibes].sort((a, b) => b.likes - a.likes);
}

export function getNewVibes(): Vibe[] {
  return [...vibes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getRandomVibes(seed?: number): Vibe[] {
  const s = seed ?? new Date().toISOString().slice(0, 10).replace(/-/g, '').length;
  const shuffled = [...vibes];
  // Simple seeded shuffle (Fisher-Yates with LCG PRNG)
  let state = s;
  for (let i = shuffled.length - 1; i > 0; i--) {
    state = (state * 1664525 + 1013904223) % 4294967296;
    const j = state % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function sortVibes(vibeList: Vibe[], sort: SortOption): Vibe[] {
  switch (sort) {
    case 'popular':
      return [...vibeList].sort((a, b) => b.likes - a.likes);
    case 'new':
      return [...vibeList].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'random':
      return getRandomVibes();
    default:
      return vibeList;
  }
}

export function getSimilarVibes(vibe: Vibe, count: number = 4): Vibe[] {
  const others = vibes.filter((v) => v.id !== vibe.id);

  const scored = others.map((v) => {
    let score = 0;
    // Shared tags
    for (const tag of v.tags) {
      if (vibe.tags.includes(tag)) score += 2;
    }
    // Shared moods
    for (const mood of v.moods) {
      if (vibe.moods.includes(mood)) score += 3;
    }
    // Same aesthetic
    if (v.aesthetic === vibe.aesthetic) score += 5;
    return { vibe: v, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.vibe);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const v of vibes) {
    for (const t of v.tags) tags.add(t);
  }
  return Array.from(tags).sort();
}

export function getAllMoods(): string[] {
  const moods = new Set<string>();
  for (const v of vibes) {
    for (const m of v.moods) moods.add(m);
  }
  return Array.from(moods).sort();
}

export function getValidTagMoodCombos(minVibes: number = 3): { tag: string; mood: string }[] {
  const combos: { tag: string; mood: string }[] = [];
  for (const tag of getAllTags()) {
    for (const mood of getAllMoods()) {
      if (getVibesByTagAndMood(tag, mood).length >= minVibes) {
        combos.push({ tag, mood });
      }
    }
  }
  return combos;
}

export function getFeaturedVibes(): Vibe[] {
  return vibes.filter((v) => v.featured);
}
