'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-background)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0">
            <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              moodboard
            </span>
            <span className="text-xl font-bold tracking-tight text-[var(--color-accent)]">
              .supply
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/about"
              className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="sm:hidden pb-4 border-t border-[var(--color-border)] pt-4 flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-foreground)]"
              onClick={() => setMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              href="/about"
              className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-foreground)]"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
