import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Service = { img: string; name: string; desc: string };

export function ServicesScroll({ items }: { items: Service[] }) {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const closest = cards.reduce(
        (best, card, index) => {
          const distance = Math.abs(card.offsetLeft - el.scrollLeft);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      setActive(closest.index);
    };

    const onWheel = (event: WheelEvent) => {
      if (isMobile || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const next = Math.max(0, Math.min(maxScroll, el.scrollLeft + event.deltaY));
      const canMove = next !== el.scrollLeft;
      if (!canMove) return;
      event.preventDefault();
      el.scrollLeft = next;
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
    };
  }, [isMobile]);

  const skip = () => {
    const currentSection = sectionRef.current?.closest("section");
    const nextSection = currentSection?.nextElementSibling as HTMLElement | null;
    nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={sectionRef} className="container-x">
      <div className="mx-auto mb-10 max-w-[680px] text-center">
        <span className="label-eyebrow" style={{ color: "#999" }}>Våra tjänster</span>
        <h2 className="mt-3 text-[var(--kol)] text-[28px] md:text-[48px] lg:text-[56px] leading-[1.05]">
          Allt under ett tak
        </h2>
        <p className="mx-auto mt-4 max-w-[460px] text-[#666] font-light text-[15px] md:text-[16px] leading-relaxed">
          Från idé till inflyttning — vi tar hand om hela processen.
        </p>
      </div>

      <div
        ref={carouselRef}
        className="flex flex-nowrap gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-4"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {items.map((s, i) => (
          <article key={s.name} className="snap-start shrink-0 w-[85vw] md:w-[350px] bg-white">
            <div className="overflow-hidden">
              <img
                src={s.img}
                alt={s.name}
                loading={i < 3 ? "eager" : "lazy"}
                // @ts-expect-error fetchpriority
                fetchpriority={i < 3 ? "high" : "auto"}
                width={350}
                height={438}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="p-5 md:p-6 min-h-[150px]">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-[var(--tra)] text-[14px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans font-medium text-[17px] text-[var(--kol)]">{s.name}</h3>
              </div>
              <p className="mt-2 text-[13px] md:text-[14px] text-[#777] leading-relaxed">{s.desc}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex justify-center gap-2 md:order-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Visa kort ${i + 1}`}
              onClick={() => {
                const card = carouselRef.current?.children[i] as HTMLElement | undefined;
                card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
              }}
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
        <span className="text-[11px] tracking-widest uppercase text-[#999] tabular-nums md:order-1">
          {active + 1}/{items.length}
        </span>
        <button
          onClick={skip}
          className="min-h-[44px] text-[11px] tracking-widest uppercase text-[#999] hover:text-[var(--kol)] transition-colors md:order-3"
        >
          HOPPA TILL NÄSTA SEKTION
        </button>
      </div>
    </div>
  );
}
