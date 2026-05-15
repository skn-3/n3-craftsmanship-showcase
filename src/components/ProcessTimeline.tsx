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

/* ---------- Desktop: sticky image left, steps right ---------- */
function Desktop({ steps }: { steps: Step[] }) {
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

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

      const sec = sectionRef.current;
      if (sec) {
        const r = sec.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const passed = Math.min(Math.max(-r.top, 0), Math.max(total, 1));
        setProgress(total > 0 ? passed / total : 0);
      }
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
    <div
      ref={sectionRef}
      className="process-grid"
    >
      {/* LEFT — sticky image */}
      <div className="process-image-column">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "3 / 4", borderRadius: 12 }}
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
                transform: active === i ? "scale(1)" : "scale(1.03)",
                transition: "opacity .6s ease-out, transform .6s ease-out",
              }}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — steps with vertical progress line */}
      <div className="process-steps-column relative" style={{ paddingLeft: 24 }}>
        {/* track */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: "#E8E3DA",
          }}
        />
        {/* fill */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 2,
            height: `${Math.round(progress * 100)}%`,
            background: "#C4A97D",
            transition: "height .15s linear",
          }}
        />
        {steps.map((s, i) => (
          <StepBlock
            key={s.n}
            step={s}
            i={i}
            active={active === i}
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
  registerRef,
}: {
  step: Step;
  i: number;
  active: boolean;
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
      className="process-step"
      style={{
        position: "relative",
        padding: "40px 0",
        opacity: visible ? (active ? 1 : 0.25) : 0,
        transition: "opacity .5s ease, transform .8s ease",
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* active accent bar */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: -24,
          top: 40,
          width: 3,
          height: active ? "calc(100% - 80px)" : 0,
          background: "#C4A97D",
          transition: "height .5s ease",
        }}
      />
      <div
        style={{
          transform: active ? "translateX(-8px)" : "translateX(0)",
          transition: "transform .5s ease",
        }}
      >
        <div
          className="font-serif leading-none"
          style={{
            fontSize: 64,
            color: active ? "rgba(196,169,125,1)" : "rgba(196,169,125,0.3)",
            transition: "color .5s ease",
          }}
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
    </div>
  );
}

/* ---------- Mobile ---------- */
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
