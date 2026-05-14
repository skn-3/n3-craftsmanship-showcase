import { useEffect, useRef, useState } from "react";

interface Props {
  before: string;
  after: string;
  alt: string;
}

export function BeforeAfter({ before, after, alt }: Props) {
  const [pos, setPos] = useState(50);
  const [interacted, setInteracted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchAxis = useRef<"none" | "x" | "y">("none");

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  useEffect(() => {
    const up = () => {
      dragging.current = false;
      touchStart.current = null;
      touchAxis.current = "none";
    };
    const mv = (e: MouseEvent) => dragging.current && move(e.clientX);
    const tmv = (e: TouchEvent) => {
      if (!dragging.current) return;
      const t = touches(e);
      if (!t) return;

      // Lock axis on first significant movement
      if (touchAxis.current === "none" && touchStart.current) {
        const dx = Math.abs(t.clientX - touchStart.current.x);
        const dy = Math.abs(t.clientY - touchStart.current.y);
        if (dx < 6 && dy < 6) return;
        touchAxis.current = dx > dy ? "x" : "y";
      }

      if (touchAxis.current === "x") {
        e.preventDefault();
        move(t.clientX);
      }
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", mv);
    window.addEventListener("touchend", up);
    window.addEventListener("touchcancel", up);
    window.addEventListener("touchmove", tmv, { passive: false });
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("touchend", up);
      window.removeEventListener("touchcancel", up);
      window.removeEventListener("touchmove", tmv);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-cursor="slider"
      className="relative w-full overflow-hidden select-none md:cursor-col-resize"
      style={{ aspectRatio: "4/3", touchAction: "pan-y" }}
      onMouseDown={(e) => {
        dragging.current = true;
        setInteracted(true);
        move(e.clientX);
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        dragging.current = true;
        touchStart.current = { x: t.clientX, y: t.clientY };
        touchAxis.current = "none";
      }}
    >
      {/* Before image (underneath) */}
      <img
        src={before}
        alt={`${alt} före`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        loading="lazy"
        draggable={false}
      />
      {/* After image (on top, clipped from the right based on pos) */}
      <img
        src={after}
        alt={`${alt} efter`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1, clipPath: `inset(0 0 0 ${pos}%)` }}
        loading="lazy"
        draggable={false}
      />
      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white pointer-events-none"
        style={{ left: `${pos}%`, zIndex: 2 }}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center ${
            interacted ? "" : "handle-pulse"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1F1E" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" transform="translate(6 0)" />
          </svg>
        </div>
      </div>
      <span className="absolute top-4 left-4 label-eyebrow text-white bg-black/40 px-2 py-1" style={{ zIndex: 2 }}>
        Före
      </span>
      <span className="absolute top-4 right-4 label-eyebrow text-white bg-black/40 px-2 py-1" style={{ zIndex: 2 }}>
        Efter
      </span>
    </div>
  );
}

function touches(e: TouchEvent): { clientX: number; clientY: number } | null {
  const t = e.touches[0] ?? e.changedTouches[0];
  return t ? { clientX: t.clientX, clientY: t.clientY } : null;
}
