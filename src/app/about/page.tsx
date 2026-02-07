import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about moodboard.supply — curated aesthetic kits for designers, marketers, and creators.',
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
        About moodboard.supply
      </h1>

      <div className="space-y-6 text-base leading-relaxed text-[var(--color-foreground)]">
        <p>
          <strong>moodboard.supply</strong> is a curated collection of aesthetic kits — complete
          design vibes with color palettes, font pairings, and visual direction, all in one card.
        </p>

        <p>
          Every kit is hand-picked to work together. The colors complement each other. The fonts
          pair naturally. The overall vibe tells a clear story. No more hours of trial and error
          trying to find colors and fonts that work.
        </p>

        <h2 className="text-xl font-bold pt-4">Who is this for?</h2>
        <p>
          Anyone who needs design direction. Whether you&apos;re a designer starting a new brand,
          a marketer creating social content, a founder building a landing page, a wedding planner
          choosing a palette, or a content creator looking for a cohesive aesthetic — there&apos;s
          a vibe here for you.
        </p>

        <h2 className="text-xl font-bold pt-4">How to use it</h2>
        <ol className="list-decimal list-inside space-y-2 text-[var(--color-secondary)]">
          <li>Browse vibes by category, mood, or popularity</li>
          <li>Find a vibe you love</li>
          <li>Click any color to copy its hex code</li>
          <li>Open the vibe detail page for font CSS, palette codes, and external tool links</li>
          <li>Use the colors and fonts in your project</li>
        </ol>

        <p className="text-[var(--color-secondary)]">
          Every palette links directly to{' '}
          <a href="https://coolors.co" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">
            Coolors
          </a>{' '}
          for editing, and every font links to{' '}
          <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">
            Google Fonts
          </a>{' '}
          for download. One click from inspiration to implementation.
        </p>

        <hr className="border-[var(--color-border)] my-8" />

        <p className="text-sm text-[var(--color-secondary)]">
          Made with care by [your name here].
        </p>
        <p className="text-sm text-[var(--color-secondary)]">
          Questions or feedback? Reach out at{' '}
          <a href="mailto:hello@moodboard.supply" className="text-[var(--color-accent)] hover:underline">
            hello@moodboard.supply
          </a>
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/"
          className="text-sm text-[var(--color-accent)] hover:underline"
        >
          &larr; Back to browsing
        </Link>
      </div>
    </div>
  );
}
