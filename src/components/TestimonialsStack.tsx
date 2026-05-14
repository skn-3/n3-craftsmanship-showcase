import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Reveal } from "@/components/Reveal";

type T = { q: string; a: string };

export function TestimonialsStack({ items }: { items: T[] }) {
  const isMobile = useIsMobile();
  const wrap = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const passed = -r.top;
      setProgress(Math.max(0, Math.min(1, passed / total)));
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="space-y-8">
        {items.map((t, i) => (
          <Reveal key={t.a} variant="up" delay={i * 0.12} className="border-l-2 pl-5" style={{ borderColor: "var(--tra)" }}>
            <p className="font-serif italic text-[18px] text-white/90 leading-[1.6]">“{t.q}”</p>
            <p className="mt-4 text-[12px] text-[#999]">— {t.a}</p>
          </Reveal>
        ))}
      </div>
    );
  }

  // Desktop: pinned card stack
  const n = items.length;
  return (
    <div ref={wrap} style={{ height: `${n * 90}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full max-w-2xl mx-auto" style={{ height: 360 }}>
          {items.map((t, i) => {
            // Each card occupies a slice of progress
            const slice = 1 / n;
            const local = (progress - i * slice) / slice; // 0..1 for this card
            const cardP = Math.max(0, Math.min(1, local));
            const isTop = progress < (i + 1) * slice && progress >= i * slice;
            // Cards above current: slid out up & faded
            // Cards below current: stacked offset down
            let translateY = 0;
            let opacity = 1;
            let rotate = i === 0 ? -1 : i === 1 ? 0 : 1;
            const baseOffset = (i - Math.floor(progress * n)) * 8;
            if (progress >= (i + 1) * slice) {
              // Already passed — out of view
              translateY = -120;
              opacity = 0;
            } else if (isTop) {
              translateY = -cardP * 120;
              opacity = 1 - cardP;
              rotate = rotate * (1 - cardP);
            } else {
              translateY = baseOffset;
              opacity = 1;
            }
            const z = 100 - i;
            return (
              <article
                key={t.a}
                className="absolute inset-0 bg-[#23302a] border-l-2 px-10 py-12 flex flex-col justify-center"
                style={{
                  borderColor: "var(--tra)",
                  transform: `translate3d(0, ${translateY}px, 0) rotate(${rotate}deg)`,
                  opacity,
                  zIndex: z,
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
                  transition: "transform .15s linear, opacity .15s linear",
                  willChange: "transform, opacity",
                }}
              >
                <p className="font-serif italic text-[22px] md:text-[26px] text-white/95 leading-[1.5]">
                  “{t.q}”
                </p>
                <p className="mt-8 text-[12px] tracking-widest uppercase text-[#aaa]">— {t.a}</p>
                <div className="mt-2 text-[11px] text-[#666]">
                  {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
