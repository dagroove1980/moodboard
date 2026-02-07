import { FontSpec } from '@/types/vibe';

export function buildGoogleFontsUrl(fonts: FontSpec[]): string {
  const families = fonts.map((f) => `family=${f.googleFontsId}`).join('&');
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export function fontFamilyDeclaration(font: FontSpec): string {
  return `"${font.family}", ${getFontCategory(font.family)}`;
}

function getFontCategory(family: string): string {
  const serifs = [
    'Playfair Display', 'Lora', 'Merriweather', 'Crimson Text', 'Source Serif 4',
    'Cormorant Garamond', 'DM Serif Display', 'Libre Baskerville', 'EB Garamond',
    'Fraunces', 'Bitter', 'Spectral', 'Vollkorn',
  ];
  const monos = ['IBM Plex Mono', 'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Space Mono'];

  if (serifs.includes(family)) return 'serif';
  if (monos.includes(family)) return 'monospace';
  return 'sans-serif';
}

export function fontPairingLabel(headingFamily: string, bodyFamily: string): string {
  return `${headingFamily} + ${bodyFamily}`;
}

export function googleFontsLink(family: string): string {
  return `https://fonts.google.com/specimen/${family.replace(/\s+/g, '+')}`;
}

export function fontCssSnippet(headingFont: FontSpec, bodyFont: FontSpec): string {
  const linkTag = `<link href="${buildGoogleFontsUrl([headingFont, bodyFont])}" rel="stylesheet">`;
  const css = `/* Heading */
font-family: ${fontFamilyDeclaration(headingFont)};
font-weight: ${headingFont.weight};

/* Body */
font-family: ${fontFamilyDeclaration(bodyFont)};
font-weight: ${bodyFont.weight};`;

  return `${linkTag}\n\n${css}`;
}
