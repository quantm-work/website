type GrainOverlayProps = {
  className?: string;
};

export function GrainOverlay({ className }: GrainOverlayProps) {
  return (
    <div
      className={`grain-overlay pointer-events-none fixed inset-0 z-[9998] h-full w-full ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
