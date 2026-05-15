import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
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
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const descriptionParas = project.description.split(/\n+/).filter(Boolean);

  return (
    <main>
      {/* HERO */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "40vh", paddingTop: 140, paddingBottom: 56 }}
      >
        <img
          src={project.img}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(15,18,17,0.55) 0%, rgba(15,18,17,0.78) 100%)" }}
        />
        <div className="container-x relative">
          <nav aria-label="Brödsmulor" className="text-[12px] tracking-[0.15em] uppercase text-white/70">
            <Link to="/" className="hover:text-white">Hem</Link>
            <span className="mx-2 text-white/40">/</span>
            <Link to="/projekt" className="hover:text-white">Projekt</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white">{project.title}</span>
          </nav>
          <h1
            className="font-serif text-white mt-6 leading-[1.05]"
            style={{ fontSize: "clamp(32px, 5.5vw, 48px)" }}
          >
            {project.title}
          </h1>
          <p className="mt-4 font-light text-white/80 text-[16px]">
            {project.stats.type} · {project.location}
          </p>
        </div>
      </section>

      {/* DESCRIPTION + STATS */}
      <section className="bg-white section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16">
          <Reveal variant="up">
            <div className="space-y-5 text-[#444] text-[18px] leading-[1.75]">
              {descriptionParas.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal variant="up" delay={0.12}>
            <dl className="bg-[var(--krita)] p-8 grid grid-cols-1 gap-6 rounded-[8px]">
              {[
                { label: "Tidsåtgång", value: project.stats.duration },
                { label: "Yta", value: project.stats.area },
                { label: "Projekttyp", value: project.stats.type },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="label-eyebrow" style={{ color: "#999" }}>{s.label}</dt>
                  <dd className="font-serif text-[var(--kol)] text-[24px] mt-2 leading-tight">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="bg-white pb-24 md:pb-32">
          <div className="container-x">
            <Reveal variant="up">
              <span className="label-eyebrow" style={{ color: "#999" }}>Galleri</span>
              <h2 className="font-serif text-[var(--kol)] mt-3 text-[28px] md:text-[36px]">Fler bilder</h2>
            </Reveal>
            <div
              className={`mt-10 columns-1 gap-4 ${
                project.gallery.length === 1
                  ? ""
                  : project.gallery.length === 2
                    ? "md:columns-2"
                    : "md:columns-2 lg:columns-3"
              }`}
            >
              {project.gallery.map((src: string, i: number) => (
                <Reveal key={src + i} variant="fade" delay={i * 0.06}>
                  <button
                    type="button"
                    onClick={() => setLightbox(src)}
                    className="group mb-4 block w-full overflow-hidden rounded-[8px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-[500ms] hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                    style={{ breakInside: "avoid" }}
                  >
                    <img
                      src={src}
                      alt={`${project.title} bild ${i + 1}`}
                      className="block w-full h-auto object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]"
                    />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-pad" style={{ background: "var(--krita)" }}>
        <div className="container-x text-center">
          <h2 className="font-serif text-[var(--kol)] text-[28px] md:text-[40px] leading-[1.1]">
            Vill du ha ett liknande resultat?
          </h2>
          <p className="mt-4 text-[#666] max-w-[520px] mx-auto">
            Kontakta oss så tar vi fram ett kostnadsfritt förslag för ditt projekt.
          </p>
          <Link to="/kontakt" className="btn-primary mt-8 inline-block">
            Kontakta oss
          </Link>
        </div>
      </section>

      {/* MORE PROJECTS */}
      {others.length > 0 && (
        <section className="bg-white section-pad border-t" style={{ borderColor: "#eee" }}>
          <div className="container-x">
            <h2 className="font-serif text-[var(--kol)] text-[28px] md:text-[36px]">Fler projekt</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {others.slice(0, 3).map((p) => (
                <Link key={p.slug} to="/projekt/$slug" params={{ slug: p.slug }} className="group block bg-white overflow-hidden">
                  <div className="overflow-hidden rounded-[6px]" style={{ aspectRatio: "4 / 3" }}>
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]" />
                  </div>
                  <div className="pt-4">
                    <h3 className="font-serif text-[20px] text-[var(--kol)]">{p.title}</h3>
                    <p className="text-[12px] text-[#888] mt-1">{p.category} · {p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(15,18,17,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            aria-label="Stäng"
          >
            <X size={32} strokeWidth={1.25} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full object-contain rounded-[8px]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
