import { useEffect } from "react";
import Lenis from "lenis";
import { useIsMobile } from "@/hooks/use-mobile";

export function SmoothScroll() {
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) return;
    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.1,
      smoothWheel: true,
    });
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [isMobile]);
  return null;
}
