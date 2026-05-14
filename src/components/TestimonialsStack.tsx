import { Reveal } from "@/components/Reveal";

type T = { q: string; a: string };

export function TestimonialsStack({ items }: { items: T[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {items.map((t, i) => (
        <Reveal
          key={t.a}
          variant="up"
          delay={i * 0.12}
          className="border-l-2 pl-5 md:pl-6 bg-[#23302a]/40 p-6 md:p-8 rounded-[8px]"
          style={{ borderColor: "var(--tra)" }}
        >
          <p className="font-serif italic text-[18px] md:text-[20px] text-white/90 leading-[1.6]">
            “{t.q}”
          </p>
          <p className="mt-5 text-[12px] tracking-widest uppercase text-[#aaa]">— {t.a}</p>
        </Reveal>
      ))}
    </div>
  );
}
