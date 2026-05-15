import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { findService, services } from "@/lib/site-data";

export const Route = createFileRoute("/tjanster/$slug")({
  loader: ({ params }) => {
    const service = findService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.name} — N3 SmartKlimat` },
          { name: "description", content: loaderData.service.desc },
          { property: "og:title", content: `${loaderData.service.name} — N3 SmartKlimat` },
          { property: "og:description", content: loaderData.service.desc },
          { property: "og:image", content: loaderData.service.img },
        ]
      : [],
  }),
  component: ServicePage,
  notFoundComponent: () => (
    <main className="bg-white section-pad pt-32">
      <div className="container-x text-center">
        <h1 className="font-serif text-[40px] text-[var(--kol)]">Tjänsten finns inte</h1>
        <Link to="/tjanster" className="btn-primary mt-6 inline-block">Tillbaka till tjänster</Link>
      </div>
    </main>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main>
      <section className="bg-[var(--kol)] pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-x">
          <Link to="/tjanster" className="text-white/60 text-[13px] tracking-widest uppercase hover:text-white">
            ← Tjänster
          </Link>
          <h1 className="font-serif text-white mt-6 leading-[1.05] text-[40px] md:text-[64px]">
            {service.name}
          </h1>
          <p className="mt-6 text-white/75 text-base md:text-lg max-w-[620px] leading-relaxed">{service.desc}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-0">
          <Reveal variant="fade">
            <img
              src={service.img}
              alt={service.name}
              className="w-full object-cover"
              style={{ aspectRatio: "16 / 9", marginTop: -40, borderRadius: 4 }}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
          <Reveal variant="up">
            <p className="text-[#444] text-[18px] leading-[1.7]">{service.long ?? service.desc}</p>
          </Reveal>
          {service.highlights && (
            <Reveal variant="up" delay={0.15}>
              <div className="bg-[var(--krita)] p-8">
                <span className="label-eyebrow" style={{ color: "#999" }}>Det här ingår</span>
                <ul className="mt-4 space-y-3 text-[15px] text-[var(--kol)]">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="text-[var(--tra)]">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/kontakt" className="btn-primary mt-8 inline-block">Begär offert</Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-[var(--krita)] section-pad">
        <div className="container-x">
          <h2 className="font-serif text-[var(--kol)] text-[28px] md:text-[36px]">Andra tjänster</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {others.map((s) => (
              <Link
                key={s.slug}
                to="/tjanster/$slug"
                params={{ slug: s.slug }}
                className="group block bg-white overflow-hidden"
              >
                <div className="overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]" />
                </div>
                <div className="p-5">
                  <h3 className="font-sans font-medium text-[18px] text-[var(--kol)]">{s.name}</h3>
                  <p className="mt-2 text-[14px] text-[#666]">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
