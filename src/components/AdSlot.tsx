'use client';

import { useEffect } from 'react';
import { ADSENSE_PUBLISHER_ID } from '@/lib/constants';

interface AdSlotProps {
  id: string;
  className?: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot({ id, className = '', format = 'auto' }: AdSlotProps) {
  // Don't render if no ad slot ID provided
  if (!id) {
    return null;
  }

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`w-full ${className}`} aria-hidden="true">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={id}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
