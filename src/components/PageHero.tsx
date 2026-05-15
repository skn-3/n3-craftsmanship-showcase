import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <section className="bg-[var(--kol)] pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container-x max-w-3xl">
        <span className="label-eyebrow" style={{ color: "var(--sand)" }}>{eyebrow}</span>
        <h1 className="font-serif text-white mt-4 leading-[1.05] text-[36px] md:text-[56px]">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 text-white/75 text-base md:text-lg max-w-[620px] leading-relaxed">{intro}</p>
        )}
      </div>
    </section>
  );
}
