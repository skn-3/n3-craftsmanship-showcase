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

/* ---------------- Desktop: simple scroll-fade cards ---------------- */
function DesktopShowcase({ steps }: { steps: Step[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-20 max-w-5xl mx-auto">
      {steps.map((s, i) => {
        const Icon = ICONS[i] ?? Clipboard;
        return <FadeCard key={s.n} step={s} Icon={Icon} />;
      })}
    </div>
  );
}

function FadeCard({ step, Icon }: { step: Step; Icon: React.ElementType }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="relative bg-white p-10 overflow-hidden"
      style={{
        borderLeft: "3px solid #C4A97D",
        borderRadius: 12,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity .8s ease-out, transform .8s ease-out",
        minHeight: 280,
      }}
    >
      <span
        aria-hidden
        className="absolute -top-6 right-4 font-serif select-none pointer-events-none leading-none"
        style={{ fontSize: 180, color: "rgba(196,169,125,0.10)" }}
      >
        {step.n}
      </span>
      <div className="relative">
        <Icon size={36} strokeWidth={1.1} style={{ color: "var(--tra)" }} />
        <h3 className="mt-6 font-sans font-medium text-[22px] text-[var(--kol)]">
          {step.t}
        </h3>
        <p className="mt-4 text-[15px] text-[#666] leading-relaxed max-w-md">
          {step.d}
        </p>
      </div>
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
