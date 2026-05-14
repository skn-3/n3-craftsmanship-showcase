import { useEffect, useRef, useState } from "react";
import { Clipboard, PencilRuler, Hammer, Key } from "lucide-react";

type Step = { n: string; t: string; d: string };

const ICONS = [Clipboard, PencilRuler, Hammer, Key];

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = -r.height + vh * 0.25;
      const range = start - end;
      const passed = start - r.top;
      setProgress(Math.max(0, Math.min(1, passed / range)));
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
  }, []);

  return (
    <div ref={wrap} className="relative">
      {/* desktop progress bar */}
      <div className="hidden md:block relative mb-12 h-px bg-[var(--sand)]/40">
        <div
          className="absolute left-0 top-0 h-px bg-[var(--tra)] origin-left"
          style={{
            width: "100%",
            transform: `scaleX(${progress})`,
            transition: "transform .15s linear",
            willChange: "transform",
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s, i) => {
          const Icon = ICONS[i] ?? Clipboard;
          const cardBg = i % 2 === 0 ? "#FFFFFF" : "#F5F2ED";
          // Per-card fill for mobile left border
          const segStart = i / steps.length;
          const segEnd = (i + 1) / steps.length;
          const localProg = Math.max(0, Math.min(1, (progress - segStart) / (segEnd - segStart)));
          return (
            <div
              key={s.n}
              className="relative overflow-hidden p-8 md:p-10"
              style={{ background: cardBg, minHeight: 280 }}
            >
              {/* mobile left border fill */}
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--sand)]/30" />
              <div
                className="md:hidden absolute left-0 top-0 w-[3px] bg-[var(--tra)] origin-top"
                style={{
                  height: "100%",
                  transform: `scaleY(${localProg})`,
                  transition: "transform .2s linear",
                }}
              />
              {/* big background number */}
              <span
                aria-hidden
                className="absolute -top-4 right-2 font-serif select-none pointer-events-none leading-none"
                style={{
                  fontSize: 120,
                  color: "rgba(196,169,125,0.10)",
                }}
              >
                {s.n}
              </span>
              <div className="relative">
                <Icon size={28} strokeWidth={1.25} style={{ color: "var(--tra)" }} />
                <h3 className="mt-5 font-sans font-medium text-[17px] text-[var(--kol)]">
                  {s.t}
                </h3>
                <p className="mt-3 text-[14px] text-[#777] leading-relaxed">{s.d}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
