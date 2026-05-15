import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/tjanster")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Tjänster — N3 SmartKlimat" },
      { name: "description", content: "Totalrenovering, badrum, kök, tak, fasad och mer. Allt under ett tak." },
      { property: "og:title", content: "Tjänster — N3 SmartKlimat" },
      { property: "og:description", content: "Allt vi gör — från totalrenovering till inredning." },
    ],
  }),
});

function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Våra tjänster"
        title="Allt under ett tak"
        intro="Från första skissen till sista penseldraget. Ett team, ett ansvar, en garanti."
      />
      <section className="bg-white section-pad">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s, i) => (
              <Reveal key={s.slug} variant="up" delay={i * 0.05}>
                <Link
                  to="/tjanster/$slug"
                  params={{ slug: s.slug }}
                  className="service-card group block bg-white overflow-hidden"
                >
                  <div className="overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                    <img
                      src={s.img}
                      alt={s.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-[var(--tra)] text-[14px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-sans font-medium text-[20px] text-[var(--kol)]">{s.name}</h3>
                    </div>
                    <p className="mt-2 text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
                    <span className="mt-4 inline-block text-[13px] text-[var(--tra)] group-hover:translate-x-1 transition-transform">
                      Läs mer →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
