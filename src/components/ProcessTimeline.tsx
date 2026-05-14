import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import team from "@/assets/team.png";
import sKitchen from "@/assets/s-kitchen.png";
import sTotal from "@/assets/s-total.png";
import sTerrace from "@/assets/s-terrace.png";

type Step = { n: string; t: string; d: string };

const STEP_IMAGES = [team, sKitchen, sTotal, sTerrace];

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const isMobile = useIsMobile();
  return isMobile ? <Mobile steps={steps} /> : <Desktop steps={steps} />;
}

/* ---------- Desktop: sticky image left, scrolling steps right ---------- */
function Desktop({ steps }: { steps: Step[] }) {
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const vhCenter = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - vhCenter);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* LEFT — sticky image */}
      <div className="lg:sticky lg:top-[120px] self-start">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "4 / 3", borderRadius: 12 }}
        >
          {STEP_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={steps[i]?.t ?? ""}
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: active === i ? 1 : 0,
                transition: "opacity .5s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — steps */}
      <div>
        {steps.map((s, i) => (
          <StepBlock
            key={s.n}
            step={s}
            i={i}
            active={active === i}
            isLast={i === steps.length - 1}
            registerRef={(el) => (stepRefs.current[i] = el)}
          />
        ))}
      </div>
    </div>
  );
}

function StepBlock({
  step,
  i,
  active,
  isLast,
  registerRef,
}: {
  step: Step;
  i: number;
  active: boolean;
  isLast: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    registerRef(el);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [registerRef]);

  return (
    <div
      ref={ref}
      style={{
        paddingTop: i === 0 ? 0 : 80,
        paddingBottom: 80,
        borderBottom: isLast ? "none" : "1px solid #E8E3DA",
        opacity: visible ? (active ? 1 : 0.3) : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity .5s ease, transform .8s ease",
      }}
    >
      <div
        className="font-serif leading-none"
        style={{ fontSize: 64, color: "#C4A97D" }}
      >
        {step.n}
      </div>
      <h3
        className="font-sans"
        style={{
          fontWeight: 500,
          fontSize: 24,
          color: "#1A1F1E",
          marginTop: 12,
        }}
      >
        {step.t}
      </h3>
      <p
        className="font-sans"
        style={{
          fontWeight: 400,
          fontSize: 16,
          color: "#666",
          marginTop: 8,
          maxWidth: 400,
          lineHeight: 1.6,
        }}
      >
        {step.d}
      </p>
    </div>
  );
}

/* ---------- Mobile: image on top of each step card ---------- */
function Mobile({ steps }: { steps: Step[] }) {
  return (
    <div className="space-y-6">
      {steps.map((s, i) => (
        <MobileCard key={s.n} step={s} i={i} />
      ))}
    </div>
  );
}

function MobileCard({ step, i }: { step: Step; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const img = STEP_IMAGES[i];
  return (
    <div
      ref={ref}
      className="bg-white overflow-hidden"
      style={{
        borderLeft: "3px solid #C4A97D",
        borderRadius: 12,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .7s ease ${i * 0.05}s, transform .7s ease ${i * 0.05}s`,
      }}
    >
      {img && (
        <img
          src={img}
          alt={step.t}
          loading="lazy"
          className="w-full object-cover"
          style={{ height: 200 }}
        />
      )}
      <div style={{ padding: "24px 20px" }}>
        <div className="font-serif leading-none" style={{ fontSize: 48, color: "#C4A97D" }}>
          {step.n}
        </div>
        <h3 className="font-sans" style={{ fontWeight: 500, fontSize: 20, color: "#1A1F1E", marginTop: 8 }}>
          {step.t}
        </h3>
        <p style={{ fontSize: 15, color: "#666", marginTop: 8, lineHeight: 1.6 }}>{step.d}</p>
      </div>
    </div>
  );
}
