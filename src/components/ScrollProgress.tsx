import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
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
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[9997] h-[2px] pointer-events-none"
      style={{ background: "rgba(0,0,0,0.05)" }}
    >
      <div
        className="h-full origin-left"
        style={{
          background: "linear-gradient(to right, #2D5A3D, #C4A97D)",
          transform: `scaleX(${p})`,
          willChange: "transform",
        }}
      />
    </div>
  );
}
