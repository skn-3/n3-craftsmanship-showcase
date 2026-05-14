import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Variant = "up" | "down" | "left" | "right" | "scale" | "fade";

interface Props {
  variant?: Variant;
  delay?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string;
}

export function Reveal({
  variant = "up",
  delay = 0,
  threshold = 0.15,
  className = "",
  style,
  children,
  id,
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
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      id={id}
      className={`rv rv-${variant} ${className}`}
      style={{ ...(style ?? {}), ["--d" as string]: `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
