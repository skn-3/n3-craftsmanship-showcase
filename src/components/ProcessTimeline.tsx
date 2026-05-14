import { useEffect, useRef, useState } from "react";
import { Clipboard, PencilRuler, Hammer, Key } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type Step = { n: string; t: string; d: string };

const ICONS = [Clipboard, PencilRuler, Hammer, Key];

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <MobileCarousel steps={steps} />
  ) : (
    <DesktopShowcase steps={steps} />
  );
}

/* ---------------- Desktop: pinned crossfade showcase ---------------- */
function DesktopShowcase({ steps }: { steps: Step[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 over the whole pinned scroll

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: starts when top hits 0, ends when bottom passes vh
      const total = r.height - vh;
      const passed = -r.top;
      setProgress(Math.max(0, Math.min(1, passed / Math.max(1, total))));
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

  // Map progress to per-step opacity (crossfade)
  const stepOpacity = (i: number) => {
    const center = (i + 0.5) / steps.length;
    const span = 1 / steps.length;
    const dist = Math.abs(progress - center);
    return Math.max(0, 1 - dist / span);
  };

  // Section is pinned for steps.length * 100vh
  return (
    <div
      ref={wrap}
      style={{ height: `${steps.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full grid grid-cols-[45%_55%] gap-10 items-center pr-8">
          {/* LEFT: number + text crossfade */}
          <div className="relative min-h-[420px]">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="absolute inset-0 flex flex-col justify-center"
                style={{
                  opacity: stepOpacity(i),
                  transition: "opacity .4s ease-out",
                  pointerEvents: stepOpacity(i) > 0.5 ? "auto" : "none",
                }}
              >
                <div
                  className="font-serif leading-none select-none"
                  style={{
                    fontSize: 200,
                    color: "#C4A97D",
                    opacity: 0.15,
                  }}
                >
                  {s.n}
                </div>
                <h3
                  className="mt-6 font-sans text-[var(--kol)]"
                  style={{ fontSize: 24, fontWeight: 500 }}
                >
                  {s.t}
                </h3>
                <p
                  className="mt-4 max-w-md leading-relaxed"
                  style={{ fontSize: 16, color: "#666" }}
                >
                  {s.d}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT: illustration crossfade */}
          <div className="relative aspect-[4/3] bg-white overflow-hidden">
            {steps.map((s, i) => {
              const Icon = ICONS[i] ?? Clipboard;
              const op = stepOpacity(i);
              return (
                <div
                  key={s.n}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background:
                      i === 0
                        ? "#F5F2ED"
                        : i === 1
                          ? "#EFEDE6"
                          : i === 2
                            ? "#F3F0E9"
                            : "#F8F4EB",
                    opacity: op,
                    transition: "opacity .4s ease-out",
                  }}
                >
                  <StepIllustration index={i} Icon={Icon} progress={progress} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Vertical progress bar */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-[60vh] w-[3px] bg-[var(--sand)]/30">
          <div
            className="w-full bg-[var(--tra)] origin-top"
            style={{
              height: "100%",
              transform: `scaleY(${progress})`,
              transition: "transform .15s linear",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StepIllustration({
  index,
  Icon,
  progress,
}: {
  index: number;
  Icon: React.ElementType;
  progress: number;
}) {
  // Local progress within this step's "active range"
  const total = 4;
  const local = Math.max(0, Math.min(1, progress * total - index));

  if (index === 0) {
    // Clipboard with check that draws on scroll
    return (
      <div className="relative">
        <Icon size={140} strokeWidth={0.8} style={{ color: "#1A1F1E" }} />
        <svg
          className="absolute inset-0 m-auto"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          style={{ top: 30 }}
        >
          <path
            d="M5 12 l4 4 l10 -10"
            stroke="#C4A97D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 30,
              strokeDashoffset: 30 - local * 30,
              transition: "stroke-dashoffset .2s linear",
            }}
          />
        </svg>
      </div>
    );
  }
  if (index === 1) {
    // Blueprint lines drawing
    return (
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
        {[
          "M20 20 H220",
          "M20 20 V160",
          "M220 20 V160",
          "M20 160 H220",
          "M20 80 H140",
          "M140 80 V160",
          "M140 110 H220",
        ].map((d, i) => {
          const len = 240;
          const start = i / 7;
          const lp = Math.max(0, Math.min(1, (local - start) * 4));
          return (
            <path
              key={i}
              d={d}
              stroke="#1A1F1E"
              strokeWidth="1.2"
              style={{
                strokeDasharray: len,
                strokeDashoffset: len - lp * len,
                transition: "stroke-dashoffset .2s linear",
              }}
            />
          );
        })}
        <Icon
          x={170}
          y={30}
          width={28}
          height={28}
          strokeWidth={1.2}
          style={{ color: "#C4A97D" }}
        />
      </svg>
    );
  }
  if (index === 2) {
    // Progress bar fill
    return (
      <div className="w-[260px]">
        <Icon size={48} strokeWidth={1} style={{ color: "#1A1F1E" }} />
        <div className="mt-6 h-2 bg-[var(--sand)]/40 overflow-hidden">
          <div
            className="h-full bg-[var(--tra)] origin-left"
            style={{
              width: "100%",
              transform: `scaleX(${local})`,
              transition: "transform .2s linear",
            }}
          />
        </div>
        <div className="mt-2 text-[12px] text-[#666] tracking-widest uppercase">
          {Math.round(local * 100)}%
        </div>
      </div>
    );
  }
  // index 3: Key with golden glow
  return (
    <div
      className="relative"
      style={{
        filter: `drop-shadow(0 0 ${20 + local * 30}px rgba(196,169,125,${0.3 + local * 0.5}))`,
        transition: "filter .3s ease-out",
      }}
    >
      <Icon size={140} strokeWidth={0.9} style={{ color: "#C4A97D" }} />
    </div>
  );
}

/* ---------------- Mobile: scroll-snap card carousel ---------------- */
function MobileCarousel({ steps }: { steps: Step[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth;
        setActive(Math.round(el.scrollLeft / Math.max(1, w)));
        raf = 0;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div>
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto -mx-5 px-5 gap-4 pb-2"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {steps.map((s, i) => {
          const Icon = ICONS[i] ?? Clipboard;
          return (
            <div
              key={s.n}
              className="relative shrink-0 w-full bg-white overflow-hidden"
              style={{
                scrollSnapAlign: "center",
                minHeight: 300,
                borderLeft: "3px solid #C4A97D",
                borderRadius: 12,
                padding: "32px 24px",
              }}
            >
              <span
                aria-hidden
                className="absolute -top-4 right-2 font-serif select-none pointer-events-none leading-none"
                style={{ fontSize: 140, color: "rgba(196,169,125,0.10)" }}
              >
                {s.n}
              </span>
              <div className="relative">
                <Icon size={28} strokeWidth={1.25} style={{ color: "var(--tra)" }} />
                <h3 className="mt-5 font-sans font-medium text-[18px] text-[var(--kol)]">
                  {s.t}
                </h3>
                <p className="mt-3 text-[14px] text-[#666] leading-relaxed">{s.d}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {steps.map((_, i) => (
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
    </div>
  );
}
