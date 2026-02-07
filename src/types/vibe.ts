export interface FontSpec {
  family: string;
  weight: string;
  googleFontsId: string;
}

export interface Vibe {
  id: string;
  name: string;
  aesthetic: string;
  colors: string[]; // 4-5 hex codes
  headingFont: FontSpec;
  bodyFont: FontSpec;
  preview: {
    heading: string;
    body: string;
  };
  tags: string[];
  moods: string[];
  likes: number;
  createdAt: string;
  featured: boolean;
}

export type SortOption = 'popular' | 'new' | 'random';

export interface FilterState {
  tag: string | null;
  mood: string | null;
  sort: SortOption;
}
