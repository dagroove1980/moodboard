'use client';

import { ReactNode } from 'react';
import { FontSpec } from '@/types/vibe';
import { useInView } from '@/hooks/useInView';
import { useFontLoader } from '@/hooks/useFontLoader';

interface FontLoaderProps {
  fonts: FontSpec[];
  children: (loaded: boolean) => ReactNode;
}

export function FontLoader({ fonts, children }: FontLoaderProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px' });
  const loaded = useFontLoader(fonts, inView);

  return <div ref={ref}>{children(loaded)}</div>;
}
