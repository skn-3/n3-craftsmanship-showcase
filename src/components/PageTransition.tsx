import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Crossfade page transitions + scroll-to-top on route change.
 * Pure CSS, no framer-motion dependency.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [displayed, setDisplayed] = useState(children);
  const [shown, setShown] = useState(true);
  const prev = useRef(pathname);

  const [duration, setDuration] = useState(0.3);

  useEffect(() => {
    if (prev.current === pathname) {
      setDisplayed(children);
      return;
    }
    setDuration(0.2);
    setShown(false);
    const fadeOut = window.setTimeout(() => {
      setDisplayed(children);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      prev.current = pathname;
      setDuration(0.3);
      requestAnimationFrame(() => setShown(true));
    }, 200);
    return () => window.clearTimeout(fadeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, children]);

  return (
    <div
      style={{
        opacity: shown ? 1 : 0,
        transition: `opacity ${duration}s ease`,
      }}
    >
      {displayed}
    </div>
  );
}
