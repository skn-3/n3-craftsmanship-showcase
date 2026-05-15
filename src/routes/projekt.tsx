import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site-data";

export const Route = createFileRoute("/projekt")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projekt — N3 SmartKlimat" },
      { name: "description", content: "Ett urval av genomförda renoveringar och byggen i Stockholmsområdet." },
      { property: "og:title", content: "Projekt — N3 SmartKlimat" },
      { property: "og:description", content: "Ett urval av genomförda renoveringar och byggen." },
    ],
  }),
});

const FILTERS = [
  "Alla",
  "Totalrenovering",
  "Badrum",
  "Kök",
  "Tak",
  "Fasad",
  "Altan",
  "Tillbyggnad",
] as const;

function ProjectsPage() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("Alla");

  const filtered = useMemo(() => {
    if (active === "Alla") return projects;
    return projects.filter((p) =>
      active === "Altan" ? p.category.toLowerCase().includes("altan") : p.category === active,
    );
  }, [active]);

  return (
    <main>
      {/* HERO */}
      <section
        className="bg-[var(--kol)] flex items-end"
        style={{ minHeight: "30vh", paddingTop: 140, paddingBottom: 56 }}
      >
        <div className="container-x">
          <h1 className="font-serif text-white leading-[1.05]" style={{ fontSize: "clamp(36px, 6vw, 48px)" }}>
            Våra projekt
          </h1>
          <p className="mt-4 font-light text-white/70" style={{ fontSize: 16 }}>
            Ett urval av genomförda renoveringar och byggen.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="bg-white border-b" style={{ borderColor: "#eee" }}>
        <div className="container-x py-6">
          <div className="flex md:flex-wrap gap-2 md:gap-3 overflow-x-auto whitespace-nowrap no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {FILTERS.map((f) => {
              const isActive = f === active;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className="shrink-0 px-4 py-2 text-[13px] tracking-[0.1em] uppercase rounded-full transition-all duration-300"
                  style={{
                    background: isActive ? "#2D5A3D" : "transparent",
                    color: isActive ? "#fff" : "var(--kol)",
                    border: `1px solid ${isActive ? "#2D5A3D" : "var(--kol)"}`,
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-white section-pad">
        <div className="container-x">
          <div
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            style={{ animation: "fadeIn 0.5s ease-out" }}
          >
            {filtered.map((p, i) => (
              <Reveal key={p.slug} variant="up" delay={i * 0.05}>
                <Link
                  to="/projekt/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                >
                  <div
                    className="relative overflow-hidden rounded-[6px]"
                    style={{ aspectRatio: "3 / 4" }}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.06]"
                    />
                    <div
                      className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(to top, rgba(26,31,30,0.85), rgba(26,31,30,0) 60%)" }}
                    >
                      <h3 className="font-serif text-white text-[24px] leading-tight">{p.title}</h3>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="font-medium text-[16px] text-[var(--kol)]">{p.title}</h3>
                    <p className="mt-1 text-[14px]" style={{ color: "#999" }}>
                      {p.category} · {p.location}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[#888] py-16">Inga projekt i denna kategori ännu.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: "var(--krita)" }}>
        <div className="container-x text-center">
          <h2 className="font-serif text-[var(--kol)] text-[32px] md:text-[44px] leading-[1.1]">
            Har du ett projekt i tankarna?
          </h2>
          <p className="mt-4 text-[#666] max-w-[520px] mx-auto">
            Vi tar fram ett kostnadsfritt förslag och en transparent offert.
          </p>
          <Link to="/kontakt" className="btn-primary mt-8 inline-block">
            Kontakta oss
          </Link>
        </div>
      </section>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </main>
  );
}
