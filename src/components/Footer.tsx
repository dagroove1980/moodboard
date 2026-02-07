import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-0">
            <span className="text-sm font-bold font-[family-name:var(--font-heading)]">
              moodboard
            </span>
            <span className="text-sm font-bold text-[var(--color-accent)]">
              .supply
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
            >
              About
            </Link>
            {/* Social links placeholder */}
            <a
              href="#"
              className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
              aria-label="X / Twitter"
            >
              X
            </a>
          </nav>
        </div>

        <p className="text-center text-xs text-[var(--color-secondary)] mt-8">
          Curated aesthetic kits for designers, marketers, and creators.
        </p>
      </div>
    </footer>
  );
}
