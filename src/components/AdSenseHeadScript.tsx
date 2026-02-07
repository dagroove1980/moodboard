import { ADSENSE_PUBLISHER_ID } from '@/lib/constants';

export function AdSenseHeadScript() {
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
      crossOrigin="anonymous"
    />
  );
}
