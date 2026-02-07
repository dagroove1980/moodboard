'use client';

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface CopyButtonProps {
  text: string;
  label: string;
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const { copy, copiedText } = useCopyToClipboard();
  const isCopied = copiedText === text;

  return (
    <button
      onClick={() => copy(text)}
      className="text-xs px-4 py-2 rounded-[var(--radius-pill)] bg-[var(--color-card)] border border-[var(--color-border)] hover:bg-[var(--color-background)] transition-colors"
    >
      {isCopied ? 'Copied!' : label}
    </button>
  );
}
