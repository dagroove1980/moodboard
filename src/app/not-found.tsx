import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-6xl font-bold tracking-tight mb-4">404</p>
      <h1 className="text-xl font-medium text-[var(--color-secondary)] mb-8">
        This vibe doesn&apos;t exist yet.
      </h1>
      <Link
        href="/"
        className="inline-flex px-6 py-3 rounded-full bg-[var(--color-foreground)] text-[var(--color-background)] text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Browse all vibes
      </Link>
    </div>
  );
}
