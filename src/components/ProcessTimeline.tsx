import { useEffect, useRef, useState } from "react";

type Step = { n: string; t: string; d: string };

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
      // start at top entering 80% vh, end at bottom leaving 20% vh
      const start = vh * 0.8;
      const end = -r.height + vh * 0.2;
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

  const n = steps.length;

  return (
    <div ref={wrap} className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
      {/* desktop horizontal track */}
      <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-[var(--sand)]/40" />
      <div
        className="hidden md:block absolute top-12 left-[12.5%] h-px bg-[var(--tra)] origin-left"
        style={{
          right: "12.5%",
          transform: `scaleX(${progress})`,
          transition: "transform .15s linear",
          willChange: "transform",
        }}
      />
      {/* mobile vertical track */}
      <div className="md:hidden absolute top-0 bottom-0 left-3 w-px bg-[var(--sand)]/40" />
      <div
        className="md:hidden absolute top-0 left-3 w-px bg-[var(--tra)] origin-top"
        style={{
          height: "100%",
          transform: `scaleY(${progress})`,
          transition: "transform .15s linear",
          willChange: "transform",
        }}
      />
      {steps.map((s, i) => {
        // Each step activates when progress passes its threshold
        const threshold = (i + 0.3) / n;
        const active = progress >= threshold;
        return (
          <div key={s.n} className="relative md:pl-0 pl-10">
            <div
              className="md:hidden absolute left-0 top-2 w-6 h-6 rounded-full"
              style={{
                background: active ? "var(--tra)" : "var(--sand)",
                transform: `scale(${active ? 1 : 0.6})`,
                transition: "transform .4s cubic-bezier(.2,.7,.2,1), background-color .4s ease",
              }}
            />
            <div
              className="hidden md:block absolute top-9 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
              style={{
                background: active ? "var(--tra)" : "var(--sand)",
                transform: `translateX(-50%) scale(${active ? 1 : 0.4})`,
                transition: "transform .4s cubic-bezier(.2,.7,.2,1), background-color .4s ease",
              }}
            />
            <div
              className="font-serif text-[48px] leading-none origin-left mt-12 md:mt-20"
              style={{
                color: "var(--tra)",
                opacity: active ? 0.55 : 0.15,
                transform: active ? "translateX(0)" : "translateX(-20px)",
                transition: "opacity .5s ease-out, transform .6s cubic-bezier(.2,.7,.2,1)",
              }}
            >
              {s.n}
            </div>
            <h3
              className="mt-4 font-sans font-medium text-[16px] text-[var(--kol)]"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateX(0)" : "translateX(-20px)",
                transition: "opacity .6s ease-out .1s, transform .6s cubic-bezier(.2,.7,.2,1) .1s",
              }}
            >
              {s.t}
            </h3>
            <p
              className="mt-2 text-[14px] text-[#777] leading-relaxed"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateX(0)" : "translateX(-20px)",
                transition: "opacity .6s ease-out .2s, transform .6s cubic-bezier(.2,.7,.2,1) .2s",
              }}
            >
              {s.d}
            </p>
          </div>
        );
      })}
    </div>
  );
}
