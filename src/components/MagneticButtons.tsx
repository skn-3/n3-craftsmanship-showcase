import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const SELECTOR = ".btn-primary, .btn-outline-light, .btn-outline-dark, .btn-light";
const RADIUS = 100;
const MAX = 8;

/**
 * Globally attach magnetic hover effect to any matching button.
 * Disabled on mobile / coarse pointer.
 */
export function MagneticButtons() {
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const state = new WeakMap<Element, { raf: number }>();

    const onMove = (e: MouseEvent) => {
      const els = document.querySelectorAll<HTMLElement>(SELECTOR);
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const range = Math.max(r.width, r.height) / 2 + RADIUS;
        if (dist < range) {
          const k = 1 - dist / range;
          const tx = Math.max(-MAX, Math.min(MAX, dx * 0.25 * k));
          const ty = Math.max(-MAX, Math.min(MAX, dy * 0.25 * k));
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
          // text counter-parallax
          const inner = el.firstElementChild as HTMLElement | null;
          if (inner && inner.tagName !== "IMG") {
            inner.style.transform = `translate3d(${-tx * 0.25}px, ${-ty * 0.25}px, 0)`;
          }
          el.style.transition = "transform .15s linear";
        } else if (el.style.transform) {
          el.style.transform = "";
          el.style.transition = "transform .4s cubic-bezier(0.16,1,0.3,1)";
          const inner = el.firstElementChild as HTMLElement | null;
          if (inner) inner.style.transform = "";
        }
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        el.style.transform = "";
        el.style.transition = "";
      });
      void state;
    };
  }, [isMobile]);
  return null;
}
