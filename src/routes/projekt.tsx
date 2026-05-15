import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site-data";

export const Route = createFileRoute("/projekt")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projekt — N3 SmartKlimat" },
      { name: "description", content: "Ett urval av projekt vi byggt — totalrenoveringar, kök, badrum, fasader och altaner." },
      { property: "og:title", content: "Projekt — N3 SmartKlimat" },
      { property: "og:description", content: "Se ett urval av våra färdiga projekt." },
    ],
  }),
});

function ProjectsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Projektgalleri"
        title="Hem vi byggt"
        intro="Varje projekt är ett samarbete. Bläddra genom ett urval av det vi gjort de senaste åren."
      />
      <section className="bg-white section-pad">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {projects.map((p, i) => (
              <Reveal key={p.slug} variant="up" delay={i * 0.08}>
                <Link
                  to="/projekt/$slug"
                  params={{ slug: p.slug }}
                  className="group block bg-white overflow-hidden"
                >
                  <div className="overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between text-[12px] tracking-widest uppercase text-[#999]">
                      <span>{p.category}</span>
                      <span>{p.year}</span>
                    </div>
                    <h3 className="font-serif text-[24px] text-[var(--kol)] mt-3">{p.title}</h3>
                    <p className="text-[13px] text-[#888] mt-1">{p.location}</p>
                    <p className="mt-3 text-[14px] text-[#555] leading-relaxed">{p.summary}</p>
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
