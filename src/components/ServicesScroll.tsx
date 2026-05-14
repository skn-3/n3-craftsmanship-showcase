import { useEffect, useRef, useState } from "react";

type Service = { img: string; name: string; desc: string };

export function ServicesScroll({ items }: { items: Service[] }) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((s, i) => (
          <ServiceCard key={s.name} s={s} i={i} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ s, i }: { s: Service; i: number }) {
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
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="group bg-white overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease-out ${i * 0.1}s, transform .7s ease-out ${i * 0.1}s, box-shadow .35s ease`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 18px 40px -20px rgba(0,0,0,0.25)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div className="overflow-hidden">
        <img
          src={s.img}
          alt={s.name}
          loading={i < 3 ? "eager" : "lazy"}
          width={500}
          height={625}
          className="w-full aspect-[4/5] object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-[var(--tra)] text-[14px]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-sans font-medium text-[18px] text-[var(--kol)]">{s.name}</h3>
        </div>
        <p className="mt-2 text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
      </div>
    </article>
  );
}
