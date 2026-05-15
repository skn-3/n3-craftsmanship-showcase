import { useEffect, useRef, useState } from "react";

interface Props {
  value: string; // e.g. "120+", "11", "4.9"
  duration?: number; // ms
  className?: string;
}

/** Counts up to the numeric portion of `value` when scrolled into view, preserving any prefix/suffix. */
export function CountUp({ value, duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!match) return;
    const prefix = match[1] ?? "";
    const numStr = match[2];
    const suffix = match[3] ?? "";
    const target = parseFloat(numStr.replace(",", "."));
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`);

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = (target * eased).toFixed(decimals);
          setDisplay(`${prefix}${cur}${suffix}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
