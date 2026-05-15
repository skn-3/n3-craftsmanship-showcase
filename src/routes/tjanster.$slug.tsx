import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/ParallaxImage";
import { findService, services } from "@/lib/site-data";
import {
  Hammer,
  Ruler,
  Wrench,
  PaintBucket,
  Sparkles,
  ClipboardCheck,
  Home,
  Lightbulb,
  Layers,
  Droplets,
  CheckCircle2,
  Square,
  X,
} from "lucide-react";

const SCOPE_ICONS = [Ruler, Hammer, Wrench, Layers, PaintBucket, Sparkles, Lightbulb, Droplets, Home, ClipboardCheck, Square, CheckCircle2];

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
        <Link to="/tjanster" className="btn-primary mt-6 inline-block">
          Tillbaka till tjänster
        </Link>
      </div>
    </main>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <main>
      {/* HERO BANNER */}
      <section
        className="relative flex items-end"
        style={{
          height: "40vh",
          minHeight: 360,
          backgroundImage: `url(${service.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(26,31,30,0.6)" }} />
        <div className="container-x relative pb-12 md:pb-16">
          <nav className="text-white/60 text-[12px] tracking-[0.15em] uppercase">
            <Link to="/" className="hover:text-white">Hem</Link>
            <span className="mx-2">/</span>
            <Link to="/tjanster" className="hover:text-white">Tjänster</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{service.name}</span>
          </nav>
          <h1 className="font-serif text-white mt-4 leading-[1.05]" style={{ fontSize: "clamp(36px, 6vw, 48px)" }}>
            {service.name}
          </h1>
          <p className="mt-4 text-white/80 font-light max-w-[640px]" style={{ fontSize: 18 }}>
            {service.desc}
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="bg-[var(--krita)] section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
          <Reveal variant="up">
            <span className="label-eyebrow" style={{ color: "#999" }}>Om tjänsten</span>
            <p className="mt-6 text-[#444] text-[17px] leading-[1.75] whitespace-pre-line">
              {service.intro ?? service.long ?? service.desc}
            </p>
          </Reveal>
          <Reveal variant="fade" delay={0.1}>
            <div className="overflow-hidden rounded-[12px]" style={{ aspectRatio: "4 / 5" }}>
              <ParallaxImage src={service.img} alt={service.name} className="w-full h-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DO */}
      {service.scope && (
        <section className="bg-white section-pad">
          <div className="container-x">
            <Reveal variant="up">
              <span className="label-eyebrow" style={{ color: "#999" }}>Omfattning</span>
              <h2 className="font-serif text-[var(--kol)] mt-3 text-[32px] md:text-[44px]">Vad ingår</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mt-14">
              {service.scope.map((item, i) => {
                const Icon = SCOPE_ICONS[i % SCOPE_ICONS.length];
                return (
                  <Reveal key={item.title} variant="up" delay={i * 0.05}>
                    <Icon size={28} strokeWidth={1.25} className="text-[var(--tra)]" />
                    <h3 className="mt-5 font-medium text-[16px] text-[var(--kol)]">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.6]" style={{ color: "#777" }}>
                      {item.desc}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      {service.process && (
        <section className="bg-[var(--krita)] section-pad">
          <div className="container-x">
            <Reveal variant="up">
              <span className="label-eyebrow" style={{ color: "#999" }}>Arbetsgång</span>
              <h2 className="font-serif text-[var(--kol)] mt-3 text-[32px] md:text-[44px]">Så här går det till</h2>
            </Reveal>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
              {service.process.map((step, i) => (
                <Reveal key={step.title} variant="up" delay={i * 0.08}>
                  <div className="border-t-2 pt-5" style={{ borderColor: "var(--tra)" }}>
                    <span className="font-serif text-[var(--tra)] text-[28px] leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-medium text-[17px] text-[var(--kol)]">{step.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.65]" style={{ color: "#666" }}>
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="bg-white section-pad">
          <div className="container-x">
            <Reveal variant="up">
              <span className="label-eyebrow" style={{ color: "#999" }}>Tidigare projekt</span>
              <h2 className="font-serif text-[var(--kol)] mt-3 text-[32px] md:text-[44px]">Galleri</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {service.gallery.map((src, i) => (
                <Reveal key={src + i} variant="fade" delay={i * 0.08}>
                  <button
                    type="button"
                    onClick={() => setLightbox(src)}
                    className="group block w-full overflow-hidden rounded-[6px]"
                    style={{ aspectRatio: i === 0 ? "4 / 5" : "1 / 1" }}
                  >
                    <img
                      src={src}
                      alt={`${service.name} projekt ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.04]"
                    />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRICE */}
      {service.price && (
        <section className="bg-white pb-24 md:pb-32">
          <div className="container-x">
            <div className="border-t pt-16 max-w-[820px]" style={{ borderColor: "#e8e3da" }}>
              <span className="label-eyebrow" style={{ color: "#999" }}>Investering</span>
              <h2 className="font-serif text-[var(--kol)] mt-3 text-[28px] md:text-[36px]">Prisindikation</h2>
              <p className="mt-6 text-[var(--kol)] text-[20px] md:text-[22px] leading-[1.5]">{service.price}</p>
              <p className="mt-4 text-[14px] text-[#777]">
                Varje projekt är unikt. Kontakta oss för en kostnadsfri offert.
              </p>
              <p className="mt-6 text-[14px] text-[#555] bg-[var(--krita)] p-5 rounded-[6px] leading-[1.6]">
                <strong className="text-[var(--kol)]">ROT-avdrag:</strong> Glöm inte att du kan göra ROT-avdrag på arbetskostnaden
                (30%, max 50&nbsp;000 kr per person och år).
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section className="section-pad" style={{ background: "#1f4030" }}>
        <div className="container-x text-center">
          <Reveal variant="up">
            <h2 className="font-serif text-white text-[32px] md:text-[44px] leading-[1.1] max-w-[760px] mx-auto">
              Intresserad av {service.name.toLowerCase()}? Boka ett kostnadsfritt hembesök.
            </h2>
            <Link to="/kontakt" hash="boka" className="btn-light mt-10 inline-block">
              Begär offert
            </Link>
          </Reveal>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="bg-[var(--krita)] section-pad">
        <div className="container-x">
          <h2 className="font-serif text-[var(--kol)] text-[28px] md:text-[36px]">Andra tjänster</h2>
          <div
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {others.map((s) => (
              <Link
                key={s.slug}
                to="/tjanster/$slug"
                params={{ slug: s.slug }}
                className="group block bg-white overflow-hidden rounded-[6px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-sans font-medium text-[18px] text-[var(--kol)]">{s.name}</h3>
                  <p className="mt-2 text-[14px] text-[#666]">{s.desc}</p>
                  <span className="mt-4 inline-block text-[13px] tracking-[0.15em] uppercase text-[var(--tra)]">
                    Läs mer →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
