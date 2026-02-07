import { Vibe } from '@/types/vibe';
import { VibeCard } from './VibeCard';

interface SimilarVibesProps {
  vibes: Vibe[];
}

export function SimilarVibes({ vibes }: SimilarVibesProps) {
  if (vibes.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Similar Vibes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vibes.map((vibe) => (
          <VibeCard key={vibe.id} vibe={vibe} />
        ))}
      </div>
    </section>
  );
}
