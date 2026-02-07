export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        break;
      case gn:
        h = ((bn - rn) / d + 2) / 6;
        break;
      case bn:
        h = ((rn - gn) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hexToRgbString(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
}

export function hexToHslString(hex: string): string {
  const { h, s, l } = hexToHsl(hex);
  return `${h}, ${s}%, ${l}%`;
}

function linearize(c: number): number {
  const srgb = c / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function textColorForBg(bgHex: string): '#FFFFFF' | '#1A1A1A' {
  const lum = relativeLuminance(bgHex);
  return lum > 0.179 ? '#1A1A1A' : '#FFFFFF';
}

export function meetsAA(foreground: string, background: string): boolean {
  return contrastRatio(foreground, background) >= 4.5;
}

export function getLightestColor(colors: string[]): string {
  let lightest = colors[0];
  let maxLum = -1;
  for (const color of colors) {
    const lum = relativeLuminance(color);
    if (lum > maxLum) {
      maxLum = lum;
      lightest = color;
    }
  }
  return lightest;
}

export function getDarkestColor(colors: string[]): string {
  let darkest = colors[0];
  let minLum = Infinity;
  for (const color of colors) {
    const lum = relativeLuminance(color);
    if (lum < minLum) {
      minLum = lum;
      darkest = color;
    }
  }
  return darkest;
}
