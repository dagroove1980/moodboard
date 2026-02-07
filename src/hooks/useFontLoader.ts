'use client';

import { useState, useEffect, useCallback } from 'react';
import { FontSpec } from '@/types/vibe';

// Global state: track which font families are already loaded or loading
const loadedFamilies = new Set<string>();
const loadingFamilies = new Set<string>();

// Batching: queue font requests and flush after a short delay
let pendingFonts: FontSpec[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function flushPendingFonts() {
  if (pendingFonts.length === 0) return;

  // Deduplicate
  const unique = pendingFonts.filter((f) => {
    if (loadedFamilies.has(f.family) || loadingFamilies.has(f.family)) return false;
    loadingFamilies.add(f.family);
    return true;
  });

  pendingFonts = [];

  if (unique.length === 0) return;

  // Build a single Google Fonts CSS2 URL for all families in this batch
  const families = unique.map((f) => `family=${f.googleFontsId}`).join('&');
  const url = `https://fonts.googleapis.com/css2?${families}&display=swap`;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.onload = () => {
    unique.forEach((f) => {
      loadedFamilies.add(f.family);
      loadingFamilies.delete(f.family);
    });
    // Dispatch custom event so hooks can react
    window.dispatchEvent(new CustomEvent('fontsloaded'));
  };
  link.onerror = () => {
    unique.forEach((f) => loadingFamilies.delete(f.family));
  };
  document.head.appendChild(link);
}

function queueFont(font: FontSpec) {
  if (loadedFamilies.has(font.family) || loadingFamilies.has(font.family)) return;
  pendingFonts.push(font);

  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flushPendingFonts, 50);
}

export function useFontLoader(fonts: FontSpec[], shouldLoad: boolean = true) {
  const [loaded, setLoaded] = useState(() =>
    fonts.every((f) => loadedFamilies.has(f.family))
  );

  const checkLoaded = useCallback(() => {
    if (fonts.every((f) => loadedFamilies.has(f.family))) {
      setLoaded(true);
    }
  }, [fonts]);

  useEffect(() => {
    if (!shouldLoad) return;

    // Check if already loaded
    if (fonts.every((f) => loadedFamilies.has(f.family))) {
      setLoaded(true);
      return;
    }

    // Queue fonts for batch loading
    fonts.forEach(queueFont);

    // Listen for load completion
    window.addEventListener('fontsloaded', checkLoaded);
    return () => window.removeEventListener('fontsloaded', checkLoaded);
  }, [fonts, shouldLoad, checkLoaded]);

  return loaded;
}
