import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Per-line additional delay in seconds (e.g. line 2 = 0.15) */
  lineDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}

/**
 * Wrap each child line in an overflow:hidden mask. Children should be
 * an array of strings or elements (one per line). On scroll-in, lines
 * slide from translateY(100%) to 0 with stagger.
 */
export function LineReveal({
  children,
  className = "",
  lineDelay = 0.15,
  as = "h2",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lines = Array.isArray(children) ? children : [children];
  const Tag = as as React.ElementType;

  return (
    <Tag ref={ref} className={`line-reveal ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className="line-inner" style={{ transitionDelay: `${i * lineDelay}s` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
