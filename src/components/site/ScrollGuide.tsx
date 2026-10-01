import { useEffect, useRef, useState } from "react";

export type GuideSection = { id: string; label: string };

/**
 * A circular stylized portrait that travels down a vertical track
 * as the visitor scrolls between the page's story sections.
 */
export function ScrollGuide({ sections }: { sections: GuideSection[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      setProgress(p);

      const middle = window.scrollY + window.innerHeight * 0.4;
      let current = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= middle) current = i;
      });
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  const trackHeight = 260;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-10 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <div ref={trackRef} className="relative w-14" style={{ height: trackHeight }}>
        {/* track */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-border" />
        <div
          className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 rounded-full bg-primary transition-[height] duration-200 ease-out"
          style={{ height: `${progress * 100}%` }}
        />

        {/* section dots */}
        {sections.map((s, i) => (
          <div
            key={s.id}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${(i / Math.max(1, sections.length - 1)) * 100}%` }}
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                i <= active ? "bg-primary" : "bg-border"
              }`}
            />
          </div>
        ))}

        {/* travelling avatar */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
          style={{ top: `${progress * 100}%` }}
        >
          <div className="relative">
            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-primary bg-card shadow-lg">
              <img
                src="/portrait.png"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full scale-[1.35] object-cover object-top"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary" />
            <div className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold text-muted-foreground shadow-sm">
              {sections[active]?.label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
