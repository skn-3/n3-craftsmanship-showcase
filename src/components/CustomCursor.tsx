import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Mode = "default" | "link" | "image" | "slider";

export function CustomCursor() {
  const isMobile = useIsMobile();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [pressed, setPressed] = useState(false);

  // detect coarse pointer (touch) — disable cursor entirely
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (isMobile) return;
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
  }, [isMobile]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-hidden");
    return () => document.documentElement.classList.remove("cursor-hidden");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("[data-cursor='slider']")) setMode("slider");
      else if (t.closest("img, video, [data-cursor='image']")) setMode("image");
      else if (t.closest("a, button, [role='button']")) setMode("link");
      else setMode("default");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = mode === "image" ? 72 : mode === "link" ? 48 : mode === "slider" ? 48 : 32;
  const ringBg =
    mode === "image" ? "rgba(255,255,255,0.1)" :
    mode === "link" ? "rgba(45,90,61,0.1)" :
    "transparent";
  const pressScale = pressed ? 0.9 : 1;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#1A1F1E] flex items-center justify-center"
        style={{
          width: ringSize,
          height: ringSize,
          background: ringBg,
          transition: "width .25s cubic-bezier(.2,.7,.2,1), height .25s cubic-bezier(.2,.7,.2,1), background .25s ease",
          willChange: "transform, width, height",
          mixBlendMode: mode === "image" ? "difference" : "normal",
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: mode === "image" ? "#fff" : "transparent",
            transform: `scale(${pressScale})`,
            transition: "transform .15s ease",
          }}
        >
          {mode === "image" ? "Visa" : mode === "slider" ? "↔" : ""}
        </span>
      </div>
      <div
        ref={dot}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#1A1F1E]"
        style={{
          width: 8 * pressScale,
          height: 8 * pressScale,
          transition: "width .15s ease, height .15s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
