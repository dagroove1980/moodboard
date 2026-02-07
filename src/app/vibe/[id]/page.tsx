import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllVibes, getVibeById, getSimilarVibes } from '@/lib/vibes';
import { getLightestColor, getDarkestColor, textColorForBg } from '@/lib/colors';
import { fontPairingLabel, fontCssSnippet, googleFontsLink, buildGoogleFontsUrl } from '@/lib/fonts';
import { vibeMetaDescription, vibeStructuredData, coolorsUrl, canvaAffiliateUrl } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';
import { ColorSwatch } from '@/components/ColorSwatch';
import { FontPreview } from '@/components/FontPreview';
import { ShareButtons } from '@/components/ShareButtons';
import { SimilarVibes } from '@/components/SimilarVibes';
import { AdSlot } from '@/components/AdSlot';
import { AD_SLOT_IDS } from '@/lib/constants';
import { CopyButton } from './CopyButton';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllVibes().map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vibe = getVibeById(id);
  if (!vibe) return {};

  return {
    title: `${vibe.name} — ${vibe.aesthetic} Color Palette & Font Pairing`,
    description: vibeMetaDescription(vibe),
    openGraph: {
      title: `${vibe.name} — ${vibe.aesthetic} Color Palette & Font Pairing`,
      description: vibeMetaDescription(vibe),
      url: `${SITE_URL}/vibe/${vibe.id}`,
      type: 'article',
    },
    alternates: {
      canonical: `${SITE_URL}/vibe/${vibe.id}`,
    },
  };
}

export default async function VibePage({ params }: Props) {
  const { id } = await params;
  const vibe = getVibeById(id);
  if (!vibe) notFound();

  const similar = getSimilarVibes(vibe, 4);
  const bgColor = getLightestColor(vibe.colors);
  const headingColor = getDarkestColor(vibe.colors);
  const textOnBg = textColorForBg(bgColor);
  const bodyColor = vibe.colors[3] || vibe.colors[1];
  const cssSnippet = fontCssSnippet(vibe.headingFont, vibe.bodyFont);
  const allColorsHex = vibe.colors.join(', ');
  const fontsUrl = buildGoogleFontsUrl([vibe.headingFont, vibe.bodyFont]);

  return (
    <>
      {/* Preload vibe fonts for this page */}
      <link rel="stylesheet" href={fontsUrl} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vibeStructuredData(vibe)) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Breadcrumb */}
        <nav className="py-4 text-xs text-[var(--color-secondary)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-foreground)]">{vibe.name}</span>
        </nav>

        {/* Large Preview Area */}
        <section
          className="rounded-[var(--radius-card)] px-8 sm:px-12 py-16 sm:py-24 mb-12"
          style={{ backgroundColor: bgColor }}
        >
          <span
            className="inline-block text-xs font-medium px-3 py-1 rounded-[var(--radius-pill)] bg-white/80 backdrop-blur-sm mb-6"
            style={{ color: headingColor }}
          >
            {vibe.aesthetic}
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{
              color: headingColor,
              fontFamily: `"${vibe.headingFont.family}", serif`,
              fontWeight: vibe.headingFont.weight,
            }}
          >
            {vibe.preview.heading}
          </h1>
          <p
            className="mt-4 text-lg sm:text-xl max-w-xl opacity-80"
            style={{
              color: textOnBg === '#FFFFFF' ? '#FFFFFF' : bodyColor,
              fontFamily: `"${vibe.bodyFont.family}", sans-serif`,
              fontWeight: vibe.bodyFont.weight,
            }}
          >
            {vibe.preview.body}
          </p>
        </section>

        {/* Color Palette Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Color Palette</h2>
            <CopyButton text={allColorsHex} label="Copy All" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {vibe.colors.map((color) => (
              <ColorSwatch key={color} color={color} />
            ))}
          </div>
        </section>

        {/* Font Pairing Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Font Pairing</h2>
            <CopyButton text={cssSnippet} label="Copy CSS" />
          </div>
          <p className="text-sm font-mono text-[var(--color-secondary)] mb-8">
            {fontPairingLabel(vibe.headingFont.family, vibe.bodyFont.family)}
          </p>

          <div className="space-y-8 divide-y divide-[var(--color-border)]">
            <FontPreview font={vibe.headingFont} label="Heading Font" color={headingColor} />
            <div className="pt-8">
              <FontPreview font={vibe.bodyFont} label="Body Font" />
            </div>
          </div>
        </section>

        {/* Get the Tools (Affiliate Links) */}
        <section className="mb-12 p-6 rounded-[var(--radius-card)] bg-[var(--color-card)] border border-[var(--color-border)]">
          <h2 className="text-lg font-bold mb-4">Get the Tools</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={coolorsUrl(vibe.colors)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-[var(--radius-pill)] bg-[var(--color-background)] hover:bg-[var(--color-border)] transition-colors"
            >
              Edit palette in Coolors
            </a>
            <a
              href={googleFontsLink(vibe.headingFont.family)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-[var(--radius-pill)] bg-[var(--color-background)] hover:bg-[var(--color-border)] transition-colors"
            >
              {vibe.headingFont.family} on Google Fonts
            </a>
            <a
              href={googleFontsLink(vibe.bodyFont.family)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-[var(--radius-pill)] bg-[var(--color-background)] hover:bg-[var(--color-border)] transition-colors"
            >
              {vibe.bodyFont.family} on Google Fonts
            </a>
            <a
              href={canvaAffiliateUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-[var(--radius-pill)] bg-[var(--color-background)] hover:bg-[var(--color-border)] transition-colors"
            >
              Create in Canva
            </a>
          </div>
        </section>

        {/* Tags & Moods */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2">
            {vibe.tags.map((tag) => (
              <Link
                key={tag}
                href={`/palettes/${encodeURIComponent(tag)}`}
                className="text-xs px-3 py-1.5 rounded-[var(--radius-pill)] bg-[var(--color-card)] border border-[var(--color-border)] hover:bg-[var(--color-background)] transition-colors capitalize"
              >
                {tag}
              </Link>
            ))}
            {vibe.moods.map((mood) => (
              <Link
                key={mood}
                href={`/moods/${encodeURIComponent(mood)}`}
                className="text-xs px-3 py-1.5 rounded-[var(--radius-pill)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20 transition-colors capitalize"
              >
                {mood}
              </Link>
            ))}
          </div>
        </section>

        {/* Share */}
        <section className="mb-16">
          <ShareButtons url={`${SITE_URL}/vibe/${vibe.id}`} title={`${vibe.name} — ${vibe.aesthetic} | moodboard.supply`} />
        </section>

        {/* Ad Slot: Detail Page */}
        {AD_SLOT_IDS.DETAIL_PAGE && (
          <div className="mb-16">
            <AdSlot id={AD_SLOT_IDS.DETAIL_PAGE} format="horizontal" />
          </div>
        )}

        {/* Similar Vibes */}
        <SimilarVibes vibes={similar} />
      </div>
    </>
  );
}
