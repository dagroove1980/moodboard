interface AdSlotProps {
  id: string;
  className?: string;
}

export function AdSlot({ id, className = '' }: AdSlotProps) {
  return (
    <div
      className={`w-full ${className}`}
      aria-hidden="true"
      data-ad-slot={id}
    >
      {/* <!-- Ad Slot: ${id} --> */}
      {/* AdSense will be inserted here */}
    </div>
  );
}
