import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { findProject, projects } from "@/lib/site-data";

export const Route = createFileRoute("/projekt/$slug")({
  loader: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — N3 SmartKlimat` },
          { name: "description", content: loaderData.project.summary },
          { property: "og:title", content: `${loaderData.project.title} — N3 SmartKlimat` },
          { property: "og:description", content: loaderData.project.summary },
          { property: "og:image", content: loaderData.project.img },
        ]
      : [],
  }),
  component: ProjectPage,
  notFoundComponent: () => (
    <main className="bg-white section-pad pt-32">
      <div className="container-x text-center">
        <h1 className="font-serif text-[40px] text-[var(--kol)]">Projektet finns inte</h1>
        <Link to="/projekt" className="btn-primary mt-6 inline-block">Tillbaka till projekt</Link>
      </div>
    </main>
  ),
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <main>
      <section className="bg-[var(--kol)] pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-x">
          <Link to="/projekt" className="text-white/60 text-[13px] tracking-widest uppercase hover:text-white">
            ← Projekt
          </Link>
          <div className="mt-6 flex items-baseline gap-4 text-[12px] tracking-widest uppercase text-white/60">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.location}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
          <h1 className="font-serif text-white mt-4 leading-[1.05] text-[40px] md:text-[64px]">{project.title}</h1>
        </div>
      </section>

      <section className="bg-white">
        <Reveal variant="fade">
          <img src={project.img} alt={project.title} className="w-full object-cover" style={{ aspectRatio: "16 / 9" }} />
        </Reveal>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
          <Reveal variant="up">
            <p className="text-[#444] text-[18px] leading-[1.7]">{project.summary}</p>
          </Reveal>
          <Reveal variant="up" delay={0.15}>
            <div className="bg-[var(--krita)] p-8">
              <span className="label-eyebrow" style={{ color: "#999" }}>Omfattning</span>
              <ul className="mt-4 space-y-3 text-[15px] text-[var(--kol)]">
                {project.scope.map((h: string) => (
                  <li key={h} className="flex gap-3">
                    <span className="text-[var(--tra)]">·</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <Link to="/kontakt" className="btn-primary mt-8 inline-block">Diskutera ditt projekt</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-[var(--krita)] section-pad">
          <div className="container-x">
            <h2 className="font-serif text-[var(--kol)] text-[28px] md:text-[36px]">Fler projekt</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {others.slice(0, 3).map((p) => (
                <Link key={p.slug} to="/projekt/$slug" params={{ slug: p.slug }} className="group block bg-white overflow-hidden">
                  <div className="overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-[20px] text-[var(--kol)]">{p.title}</h3>
                    <p className="text-[12px] text-[#888] mt-1">{p.category} · {p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
