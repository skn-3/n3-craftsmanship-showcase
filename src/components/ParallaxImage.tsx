import { useEffect, useRef, type CSSProperties } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  speed?: number; // 0.85 = image moves at 85% of scroll speed
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

/**
 * Container clips overflow; inner image is 120% tall and translates
 * with scroll for a subtle parallax drift. GPU accelerated.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  style,
  speed = 0.85,
  width,
  height,
  loading = "lazy",
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const i = img.current;
    if (!w || !i) return;
    const drift = 1 - speed; // amount of image overhang we use
    let raf = 0;
    const update = () => {
      const r = w.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: -1 (just below) → 0 (centered) → 1 (just above)
      const center = r.top + r.height / 2;
      const p = (center - vh / 2) / (vh / 2 + r.height / 2);
      // image is 120% tall => 20% extra to play with; map p to translate
      const offsetPct = -p * drift * 100; // %
      i.style.transform = `translate3d(0, ${offsetPct}%, 0)`;
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
  }, [speed]);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`} style={style}>
      <img
        ref={img}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`absolute inset-x-0 top-0 w-full object-cover ${imgClassName}`}
        style={{ height: "120%", willChange: "transform" }}
      />
    </div>
  );
}
