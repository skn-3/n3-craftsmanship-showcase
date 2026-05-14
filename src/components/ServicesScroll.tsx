import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Service = { img: string; name: string; desc: string };

export function ServicesScroll({ items }: { items: Service[] }) {
  const isMobile = useIsMobile();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [tx, setTx] = useState(0);

  // Mobile carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;
      const rect = pin.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = pin.offsetHeight - vh;
      const passed = -rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      const max = track.scrollWidth - track.clientWidth;
      setTx(-p * max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const el = carouselRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setActive(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (isMobile) {
    return (
      <div>
        <div className="container-x mb-8">
          <span className="label-eyebrow" style={{ color: "#999" }}>Våra tjänster</span>
          <h2 className="mt-3 text-[var(--kol)] text-[28px] leading-tight">Allt under ett tak</h2>
          <p className="mt-3 text-[#666] font-light text-[15px]">Från idé till inflyttning — vi tar hand om hela processen.</p>
        </div>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-5 pb-2"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {items.map((s) => (
            <article key={s.name} className="snap-center shrink-0 w-[88vw] bg-white">
              <img
                src={s.img}
                alt={s.name}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="p-5">
                <h3 className="font-sans font-medium text-[17px] text-[var(--kol)]">{s.name}</h3>
                <p className="mt-2 text-[14px] text-[#777] leading-relaxed">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Visa kort ${i + 1}`}
              onClick={() => carouselRef.current?.scrollTo({ left: i * carouselRef.current.clientWidth, behavior: "smooth" })}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <span
                className="block rounded-full transition-all"
                style={{
                  width: active === i ? 24 : 8,
                  height: 8,
                  background: active === i ? "var(--kol)" : "#bdbdbd",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop: pinned horizontal scroll
  const skip = () => {
    const pin = pinRef.current;
    if (!pin) return;
    const target = pin.offsetTop + pin.offsetHeight;
    window.scrollTo({ top: target, behavior: "smooth" });
  };
  const trackEl = trackRef.current;
  const max = trackEl ? trackEl.scrollWidth - trackEl.clientWidth : 1;
  const prog = max > 0 ? Math.min(1, Math.max(0, -tx / max)) : 0;

  return (
    <div ref={pinRef} style={{ height: `${items.length * 35 + 60}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="flex-1 flex">
          <div className="w-[35%] flex items-center px-10 lg:px-16">
            <div>
              <span className="label-eyebrow" style={{ color: "#999" }}>Våra tjänster</span>
              <h2 className="mt-4 text-[var(--kol)] text-[44px] lg:text-[56px] leading-[1.05]">
                Allt under<br />ett tak
              </h2>
              <p className="mt-6 text-[#666] font-light text-[16px] max-w-[340px] leading-relaxed">
                Från idé till inflyttning — vi tar hand om hela processen.
                Scrolla för att utforska våra nio specialiteter.
              </p>
              <div className="mt-10 flex items-center gap-3 text-[11px] tracking-widest uppercase text-[#999]">
                <span>Scrolla</span>
                <span className="block w-12 h-px bg-[var(--tra)]" />
              </div>
            </div>
          </div>
          <div ref={trackRef} className="w-[65%] flex items-center overflow-hidden">
            <div
              className="flex gap-8 pl-8 pr-16"
              style={{ transform: `translate3d(${tx}px,0,0)`, willChange: "transform" }}
            >
              {items.map((s, i) => (
                <article
                  key={s.name}
                  className="shrink-0 bg-white"
                  style={{ width: 400, height: 500 }}
                >
                  <div className="overflow-hidden" style={{ height: "70%" }}>
                    <img
                      src={s.img}
                      alt={s.name}
                      loading={i < 3 ? "eager" : "lazy"}
                      // @ts-expect-error fetchpriority
                      fetchpriority={i < 3 ? "high" : "auto"}
                      width={400}
                      height={350}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 h-[30%] flex flex-col justify-center">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-[var(--tra)] text-[14px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-sans font-medium text-[17px] text-[var(--kol)]">{s.name}</h3>
                    </div>
                    <p className="mt-2 text-[13px] text-[#777] leading-relaxed">{s.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="px-10 lg:px-16 pb-8 flex items-center gap-6">
          <div className="flex-1 h-px bg-[var(--sand)]/40 relative">
            <div
              className="absolute left-0 top-0 h-px bg-[var(--tra)] origin-left"
              style={{
                width: "100%",
                transform: `scaleX(${prog})`,
                transition: "transform .1s linear",
              }}
            />
          </div>
          <span className="text-[11px] tracking-widest uppercase text-[#999] tabular-nums">
            {Math.min(items.length, Math.round(prog * (items.length - 1)) + 1)} / {items.length}
          </span>
          <button
            onClick={skip}
            className="text-[11px] tracking-widest uppercase text-[#999] hover:text-[var(--kol)] transition-colors"
          >
            Hoppa till nästa sektion ↓
          </button>
        </div>
      </div>
    </div>
  );
}
