import Link from 'next/link';
import { Vibe } from '@/types/vibe';
import { VibeGrid } from './VibeGrid';

interface BrowsePageProps {
  title: string;
  description?: string;
  vibes: Vibe[];
  breadcrumbs?: { label: string; href: string }[];
}

export function BrowsePage({ title, description, vibes, breadcrumbs }: BrowsePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="py-4 text-xs text-[var(--color-secondary)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">Home</Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.href}>
              <span className="mx-2">/</span>
              <Link href={crumb.href} className="hover:text-[var(--color-foreground)] transition-colors">
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
      )}

      {/* Header */}
      <section className="py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-3 text-base text-[var(--color-secondary)] max-w-2xl">
            {description}
          </p>
        )}
        <p className="mt-2 text-sm text-[var(--color-secondary)]">
          {vibes.length} {vibes.length === 1 ? 'vibe' : 'vibes'}
        </p>
      </section>

      {/* Grid */}
      {vibes.length > 0 ? (
        <VibeGrid vibes={vibes} />
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-[var(--color-secondary)]">
            No vibes found for this filter.
          </p>
          <Link href="/" className="text-sm text-[var(--color-accent)] hover:underline mt-2 inline-block">
            Browse all vibes
          </Link>
        </div>
      )}
    </div>
  );
}
