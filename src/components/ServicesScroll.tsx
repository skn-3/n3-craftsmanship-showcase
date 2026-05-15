import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";

type Service = { img: string; name: string; desc: string; slug: string };

export function ServicesScroll({ items }: { items: Service[] }) {
  const byName = (n: string) => {
    const i = items.findIndex((s) => s.name === n);
    return i >= 0 ? { ...items[i], idx: i } : null;
  };

  const order = [
    "Totalrenovering",
    "Kök",
    "Badrum",
    "Tak",
    "Fasad",
    "Altan & Terrass",
    "Tillbyggnad",
    "Målning & Tapetsering",
    "Inredning",
  ]
    .map(byName)
    .filter(Boolean) as (Service & { idx: number })[];

  // Fallback: if names don't match, fall back to original ordering
  const list = order.length === 9 ? order : items.map((s, i) => ({ ...s, idx: i }));

  const [r1a, r1b, r2a, r2b, r2c, feat, r4a, r4b, r4c] = list;
  const isMobile = useIsMobile();

  let n = 0;
  const next = () => n++;

  return (
    <div className="container-x">
      <div className="mx-auto mb-12 max-w-[680px] text-center">
        <span className="label-eyebrow" style={{ color: "#999" }}>Våra tjänster</span>
        <h2 className="mt-3 text-[var(--kol)] text-[28px] md:text-[48px] lg:text-[56px] leading-[1.05]">
          Allt under ett tak
        </h2>
        <p className="mx-auto mt-4 max-w-[460px] text-[#666] font-light text-[15px] md:text-[16px] leading-relaxed">
          Från idé till inflyttning — vi tar hand om hela processen.
        </p>
      </div>

      {isMobile ? (
        <MobileCarousel list={list} />
      ) : (
        <>
      {/* Row 1: 60 / 40 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        <div className="md:col-span-3">
          <Card s={r1a} i={next()} ratio="16 / 9" />
        </div>
        <div className="md:col-span-2">
          <Card s={r1b} i={next()} ratio="3 / 4" />
        </div>
      </div>

      {/* Row 2: 3 equal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
        <Card s={r2a} i={next()} ratio="4 / 3" />
        <Card s={r2b} i={next()} ratio="4 / 3" />
        <Card s={r2c} i={next()} ratio="4 / 3" />
      </div>

      {/* Row 3: full-width feature horizontal */}
      <div className="mt-6 md:mt-8">
        <FeatureCard s={feat} i={next()} />
      </div>

      {/* Row 4: 3 equal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
        <Card s={r4a} i={next()} ratio="4 / 3" />
        <Card s={r4b} i={next()} ratio="4 / 3" />
        <Card s={r4c} i={next()} ratio="4 / 3" />
      </div>
        </>
      )}
    </div>
  );
}

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Card({
  s,
  i,
  ratio,
}: {
  s: Service & { idx: number };
  i: number;
  ratio: string;
}) {
  const { ref, visible } = useReveal();
  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity .7s ease-out ${i * 0.08}s, transform .7s ease-out ${i * 0.08}s, box-shadow .35s ease`,
  };
  return (
    <Link
      to="/tjanster/$slug"
      params={{ slug: s.slug }}
      ref={ref as React.Ref<HTMLAnchorElement>}
      className="group bg-white overflow-hidden cursor-pointer block"
      style={style}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 18px 40px -20px rgba(0,0,0,0.25)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div className="overflow-hidden" style={{ aspectRatio: ratio }}>
        <img
          src={s.img}
          alt={s.name}
          loading={i < 2 ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-[var(--tra)] text-[14px]">
            {String(s.idx + 1).padStart(2, "0")}
          </span>
          <h3 className="font-sans font-medium text-[18px] text-[var(--kol)]">{s.name}</h3>
        </div>
        <p className="mt-2 text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
        <span className="mt-4 inline-block text-[13px] tracking-wide text-[var(--tra)] group-hover:translate-x-1 transition-transform">
          Läs mer →
        </span>
      </div>
    </Link>
  );
}

function FeatureCard({ s, i }: { s: Service & { idx: number }; i: number }) {
  const { ref, visible } = useReveal();
  return (
    <article
      ref={ref}
      className="group bg-white overflow-hidden grid grid-cols-1 md:grid-cols-2 cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease-out ${i * 0.08}s, transform .7s ease-out ${i * 0.08}s, box-shadow .35s ease`,
        minHeight: 300,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 18px 40px -20px rgba(0,0,0,0.25)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div className="overflow-hidden h-full">
        <img
          src={s.img}
          alt={s.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
          style={{ minHeight: 300 }}
        />
      </div>
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-[var(--tra)] text-[16px]">
            {String(s.idx + 1).padStart(2, "0")}
          </span>
          <h3 className="font-sans font-medium text-[24px] md:text-[28px] text-[var(--kol)]">{s.name}</h3>
        </div>
        <p className="mt-4 text-[15px] md:text-[16px] text-[#666] leading-relaxed max-w-[460px]">{s.desc}</p>
      </div>
    </article>
  );
}

function MobileCarousel({ list }: { list: (Service & { idx: number })[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    if (hintVisible) setHintVisible(false);
    const cardW = el.clientWidth * 0.8 + 16;
    const i = Math.round(el.scrollLeft / cardW);
    setActive(Math.max(0, Math.min(list.length - 1, i)));
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="services-mobile-scroller"
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          gap: 16,
          padding: "0 20px",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {list.map((s) => (
          <article
            key={s.name}
            className="bg-white overflow-hidden"
            style={{
              flex: "0 0 80vw",
              scrollSnapAlign: "start",
            }}
          >
            <div className="overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
              <img src={s.img} alt={s.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-[var(--tra)] text-[14px]">
                  {String(s.idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans font-medium text-[18px] text-[var(--kol)]">{s.name}</h3>
              </div>
              <p className="mt-2 text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {list.map((_, i) => (
          <span
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: i === active ? "#C4A97D" : "transparent",
              border: `1px solid ${i === active ? "#C4A97D" : "#D4C5A9"}`,
              transition: "background .2s ease",
            }}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <div
        className="text-center mt-3 text-[13px] text-[#999]"
        style={{
          opacity: hintVisible ? 1 : 0,
          transition: "opacity .4s ease",
          pointerEvents: "none",
        }}
      >
        Svep →
      </div>
    </div>
  );
}

