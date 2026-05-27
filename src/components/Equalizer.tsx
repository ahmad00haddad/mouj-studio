export function Equalizer({ bars = 32, className = "" }: { bars?: number; className?: string }) {
  return (
    <div className={`flex items-end gap-[3px] h-24 ${className}`} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="eq-bar"
          style={{
            animationDelay: `${(i * 0.07) % 1.4}s`,
            animationDuration: `${0.8 + (i % 5) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
