export const SITE_NAME = 'moodboard.supply';
export const SITE_URL = 'https://moodboard-supply.vercel.app';
export const SITE_DESCRIPTION = 'Curated aesthetic kits — colors, fonts, and visual direction. All in one card.';

export const ALL_TAGS = [
  'brand', 'wedding', 'startup', 'interior', 'social media',
  'café', 'fashion', 'blog', 'gaming', 'education',
  'photography', 'real estate',
] as const;

export const ALL_MOODS = [
  'minimal', 'bold', 'elegant', 'playful', 'retro',
  'warm', 'cool', 'dark', 'earthy', 'luxe',
  'futuristic', 'organic', 'editorial',
] as const;

export const TAG_INTROS: Record<string, { title: string; description: string }> = {
  brand: {
    title: 'Brand Color Palettes & Font Pairings',
    description: 'Complete aesthetic kits for brand identity — curated color palettes paired with fonts that set the right tone for your brand.',
  },
  wedding: {
    title: 'Wedding Color Palettes & Font Pairings',
    description: 'Romantic, elegant, and timeless design kits for wedding invitations, websites, and stationery.',
  },
  startup: {
    title: 'Startup Color Palettes & Font Pairings',
    description: 'Modern, clean design kits built for startup landing pages, pitch decks, and product interfaces.',
  },
  interior: {
    title: 'Interior Design Color Palettes & Font Pairings',
    description: 'Curated aesthetic kits inspired by interior spaces — from minimalist living rooms to cozy cafés.',
  },
  'social media': {
    title: 'Social Media Color Palettes & Font Pairings',
    description: 'Eye-catching design kits for Instagram feeds, TikTok thumbnails, and social content that pops.',
  },
  café: {
    title: 'Café & Restaurant Color Palettes & Font Pairings',
    description: 'Warm, inviting design kits for coffee shops, bakeries, and restaurant branding.',
  },
  fashion: {
    title: 'Fashion Color Palettes & Font Pairings',
    description: 'Bold, editorial aesthetic kits for fashion brands, lookbooks, and style-driven projects.',
  },
  blog: {
    title: 'Blog Color Palettes & Font Pairings',
    description: 'Clean, readable design kits for personal blogs, newsletters, and editorial sites.',
  },
  gaming: {
    title: 'Gaming Color Palettes & Font Pairings',
    description: 'Bold, high-energy design kits for gaming channels, esports teams, and gaming brands.',
  },
  education: {
    title: 'Education Color Palettes & Font Pairings',
    description: 'Friendly, accessible design kits for educational platforms, courses, and learning materials.',
  },
  photography: {
    title: 'Photography Color Palettes & Font Pairings',
    description: 'Minimal, gallery-style design kits that let your photos take center stage.',
  },
  'real estate': {
    title: 'Real Estate Color Palettes & Font Pairings',
    description: 'Professional, trustworthy design kits for real estate websites, listings, and property branding.',
  },
};

export const MOOD_INTROS: Record<string, { title: string; description: string }> = {
  minimal: {
    title: 'Minimal Design Kits',
    description: 'Clean lines, generous whitespace, and restrained palettes. Less is more.',
  },
  bold: {
    title: 'Bold Design Kits',
    description: 'High contrast, strong colors, and confident typography that commands attention.',
  },
  elegant: {
    title: 'Elegant Design Kits',
    description: 'Refined palettes and sophisticated font pairings for a premium, polished feel.',
  },
  playful: {
    title: 'Playful Design Kits',
    description: 'Bright colors, fun fonts, and energetic vibes for projects that don\'t take themselves too seriously.',
  },
  retro: {
    title: 'Retro Design Kits',
    description: 'Nostalgic palettes and vintage-inspired typography with a modern twist.',
  },
  warm: {
    title: 'Warm Design Kits',
    description: 'Cozy earth tones, golden hues, and inviting palettes that feel like home.',
  },
  cool: {
    title: 'Cool Design Kits',
    description: 'Blues, grays, and icy tones for a calm, collected, professional feel.',
  },
  dark: {
    title: 'Dark Mode Design Kits',
    description: 'Rich dark backgrounds with carefully chosen accent colors for dramatic, modern interfaces.',
  },
  earthy: {
    title: 'Earthy Design Kits',
    description: 'Natural tones inspired by forests, deserts, and organic materials.',
  },
  luxe: {
    title: 'Luxe Design Kits',
    description: 'Opulent palettes with gold, deep tones, and premium typography for luxury brands.',
  },
  futuristic: {
    title: 'Futuristic Design Kits',
    description: 'Neon accents, dark backgrounds, and tech-forward typography for cutting-edge projects.',
  },
  organic: {
    title: 'Organic Design Kits',
    description: 'Soft, natural palettes with flowing typography that feels handmade and authentic.',
  },
  editorial: {
    title: 'Editorial Design Kits',
    description: 'Magazine-worthy palettes and typefaces for longform content and visual storytelling.',
  },
};

export const VIBES_PER_PAGE = 24;

// AdSense Configuration
export const ADSENSE_PUBLISHER_ID = 'ca-pub-3452665186406442';

// Ad Slot IDs - Set these in your .env.local file
// Get these from your AdSense dashboard: Ads > Ad units
export const AD_SLOT_IDS = {
  HOMEPAGE_LEADERBOARD: process.env.NEXT_PUBLIC_ADSENSE_HOMEPAGE_SLOT_ID || '',
  DETAIL_PAGE: process.env.NEXT_PUBLIC_ADSENSE_DETAIL_SLOT_ID || '',
  IN_GRID: process.env.NEXT_PUBLIC_ADSENSE_INGRID_SLOT_ID || '',
} as const;
