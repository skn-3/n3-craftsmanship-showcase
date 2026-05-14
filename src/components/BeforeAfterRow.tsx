import { useEffect, useRef, useState } from "react";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal } from "@/components/Reveal";

type Item = { before: string; after: string; alt: string; label: string };

export function BeforeAfterRow({ items }: { items: Item[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hinted, setHinted] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (!hinted && el.scrollLeft > 10) setHinted(true);
      if (raf) return;
      raf = requestAnimationFrame(() => {
        // Each card is ~85vw + 16px gap
        const cardW = el.clientWidth * 0.85 + 16;
        setActive(Math.round(el.scrollLeft / Math.max(1, cardW)));
        raf = 0;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hinted]);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0 ba-snap"
      >
        {items.map((item, i) => (
          <Reveal
            key={item.label}
            variant="up"
            delay={i * 0.12}
            className="ba-card shrink-0 md:w-auto"
          >
            <BeforeAfter before={item.before} after={item.after} alt={item.alt} />
            <p className="mt-4 font-medium text-[var(--kol)]">{item.label}</p>
          </Reveal>
        ))}
      </div>

      {/* Mobile dots */}
      <div className="flex md:hidden justify-center gap-2 mt-5">
        {items.map((_, i) => (
          <span
            key={i}
            className="rounded-full transition-all"
            style={{
              width: 8,
              height: 8,
              background: i === active ? "#C4A97D" : "transparent",
              border: `1px solid ${i === active ? "#C4A97D" : "#D4C5A9"}`,
            }}
          />
        ))}
      </div>

      {/* Mobile swipe hint */}
      <div
        className="md:hidden text-center mt-3 text-[12px] tracking-widest uppercase text-[#999] transition-opacity duration-500"
        style={{ opacity: hinted ? 0 : 1 }}
      >
        Svep →
      </div>
    </div>
  );
}
