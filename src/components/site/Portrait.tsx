import portrait from "@/assets/portrait.png";

export function Portrait({ eager = false, className = "" }: { eager?: boolean; className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[4/5] w-full max-w-md ${className}`}>
      {/* dotted grid */}
      <div
        className="absolute inset-x-6 top-4 h-24 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(0.7 0.02 260) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      {/* red arch backdrop */}
      <div className="absolute inset-x-4 bottom-0 top-8 rounded-t-[999px] bg-primary" />
      <img
        src={portrait}
        alt="Clyde Walter, UI/UX and Brand Designer"
        loading={eager ? "eager" : "lazy"}
        className="relative z-10 h-full w-full object-contain object-bottom"
      />
    </div>
  );
}
