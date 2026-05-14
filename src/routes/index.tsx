import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal } from "@/components/Reveal";
import { useCountUp, useParallax, useScrollProgress } from "@/hooks/use-reveal";

import heroVideo from "@/assets/hero.mp4";
import heroMobile from "@/assets/hero-mobile.png";
import featured from "@/assets/villa-saltsjobad-n3.png";
import about from "@/assets/team.png";
import sTotal from "@/assets/s-total.png";
import sBath from "@/assets/s-bath.png";
import sKitchen from "@/assets/s-kitchen.png";
import sRoof from "@/assets/s-roof.png";
import sFacade from "@/assets/s-facade.png";
import sTerrace from "@/assets/s-terrace.png";
import sExtension from "@/assets/s-extension.png";
import sPainting from "@/assets/s-painting.png";
import sInterior from "@/assets/s-interior.jpg";
import baKitchenBefore from "@/assets/ba-kitchen-before.png";
import baKitchenAfter from "@/assets/ba-kitchen-after.png";
import baBathBefore from "@/assets/ba-bath-before.png";
import baBathAfter from "@/assets/ba-bath-after.png";
import baFacadeBefore from "@/assets/ba-facade-before.png";
import baFacadeAfter from "@/assets/ba-facade-after.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "N3 SmartKlimat – Renovering & Bygg i Stockholm" },
      {
        name: "description",
        content:
          "N3 bygger hem som håller i generationer. Totalrenoveringar, badrum, kök, tak och fasad i Stockholm.",
      },
      { property: "og:title", content: "N3 SmartKlimat – Renovering & Bygg i Stockholm" },
      { property: "og:description", content: "Totalrenoveringar, badrum, kök, tak och fasad – byggt med omtanke." },
    ],
  }),
});

const services = [
  { img: sTotal, name: "Totalrenovering", desc: "Komplett förvandling av ditt hem, från golv till tak." },
  { img: sBath, name: "Badrum", desc: "Lyxiga badrum med känsla för material och funktion." },
  { img: sKitchen, name: "Kök", desc: "Skräddarsydda kök där design möter vardagsliv." },
  { img: sRoof, name: "Tak", desc: "Takbyten och takrenovering med kvalitetsmaterial." },
  { img: sFacade, name: "Fasad", desc: "Fasadrenovering som ger ditt hem nytt liv." },
  { img: sTerrace, name: "Altan & Terrass", desc: "Uterum och altaner byggda för skandinaviskt klimat." },
  { img: sExtension, name: "Tillbyggnad", desc: "Mer utrymme, smart planerat och sömlöst integrerat." },
  { img: sPainting, name: "Målning & Tapetsering", desc: "Professionell målning och tapetsering som ger rummet ny karaktär." },
  { img: sInterior, name: "Inredning", desc: "Inredningshjälp som sätter pricken över i." },
];

const steps = [
  { n: "01", t: "Kostnadsfritt möte", d: "Vi kommer till dig, lyssnar på dina önskemål och tar mått. Helt utan förpliktelser." },
  { n: "02", t: "Design & offert", d: "Du får en detaljerad offert med 3D-visualisering och materialförslag inom 5 arbetsdagar." },
  { n: "03", t: "Byggnation", d: "Vårt team tar hand om allt — från rivning till slutbesiktning. Du har en fast kontaktperson hela vägen." },
  { n: "04", t: "Överlämning", d: "Slutbesiktning tillsammans, genomgång av garantier, och ditt drömhem är redo att flytta in i." },
];

const testimonials = [
  { q: "N3 förvandlade vårt 70-talskök till något vi inte trodde var möjligt. Professionellt från dag ett till sista detaljerna. Kan inte rekommendera dem nog.", a: "Maria & Johan, Bromma" },
  { q: "Badrumsrenoveringen blev exakt som vi drömt. Teamet var alltid i tid, städade efter sig, och resultatet överträffade våra förväntningar.", a: "Anders K., Nacka" },
  { q: "Vi har anlitat N3 för tre olika projekt nu. Takbyte, fasad och altan. Samma höga kvalitet varje gång. De är vår go-to byggare.", a: "Familjen Eriksson, Täby" },
];

const trusts = ["BKR Auktoriserad", "ID06", "Hantverkarkoll", "Länsförsäkringar", "Elsäkerhetsverket"];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className="label-eyebrow" style={{ color: light ? "var(--sand)" : "#999" }}>
      {children}
    </span>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="mb-4 tracking-widest text-[18px]">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star-mask">
          ★<span style={{ ["--sd" as string]: `${i * 0.12}s` } as React.CSSProperties}>★</span>
        </span>
      ))}
    </div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, ref] = useCountUp<HTMLSpanElement>(to);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function Index() {
  const [processProgress, processRef] = useScrollProgress<HTMLDivElement>();
  const [ctaOffset, ctaRef] = useParallax<HTMLDivElement>(0.5);
  const [policy, setPolicy] = useState<null | "integritet" | "cookies">(null);

  return (
    <div id="top">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img
          src={heroMobile}
          alt="N3 hem"
          className="md:hidden absolute inset-0 w-full h-full object-cover object-center hero-zoom"
        />
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block absolute inset-0 w-full h-full object-cover hero-zoom"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(26,31,30,0.85), rgba(26,31,30,0.3) 60%, rgba(26,31,30,0.6))" }}
        />
        <div className="container-x relative z-10 py-32">
          <div className="max-w-3xl">
            <div className="hero-rise" style={{ ["--d" as string]: "0.05s" } as React.CSSProperties}>
              <Eyebrow light>Hantverkare sedan 2015</Eyebrow>
            </div>
            <h1
              className="hero-rise font-serif text-white mt-6 leading-[1.05] text-[32px] md:text-[56px] lg:text-[64px]"
              style={{ ["--d" as string]: "0.2s" } as React.CSSProperties}
            >
              Vi skapar hem som<br />håller i generationer
            </h1>
            <p
              className="hero-rise mt-6 text-white/80 font-light text-base md:text-lg max-w-[560px] leading-relaxed"
              style={{ ["--d" as string]: "0.5s" } as React.CSSProperties}
            >
              Totalrenoveringar, badrum, kök, tak och fasad — med skandinavisk precision och omtanke för varje detalj.
            </p>
            <div
              className="hero-rise mt-10 flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4"
              style={{ ["--d" as string]: "0.8s" } as React.CSSProperties}
            >
              <a href="#projekt" className="btn-primary w-full md:w-auto text-center">Se våra projekt</a>
              <a href="#kontakt" className="btn-outline-light w-full md:w-auto text-center">Boka kostnadsfritt möte</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 text-white/60 animate-scroll-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white py-12">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {trusts.map((t, i) => (
              <Reveal
                key={t}
                variant="left"
                delay={i * 0.1}
                className="h-10 px-4 flex items-center justify-center bg-[var(--krita)] text-[11px] tracking-widest uppercase text-[#555]"
              >
                {t}
              </Reveal>
            ))}
          </div>
          <Reveal variant="fade" delay={0.6} className="text-center mt-6 text-[13px] text-[#888]">
            <span style={{ color: "var(--tra)" }}>★★★★★</span> 4.9 av 5 baserat på 47 omdömen
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="tjanster" className="bg-[var(--krita)] section-pad">
        <div className="container-x">
          <Reveal variant="up" className="max-w-2xl mb-14">
            <Eyebrow>Våra tjänster</Eyebrow>
            <h2 className="mt-4 text-[var(--kol)] text-[32px] md:text-[40px] leading-tight">Allt under ett tak</h2>
            <p className="mt-4 text-[#666] font-light text-base max-w-[480px]">
              Från idé till inflyttning — vi tar hand om hela processen.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.name} variant="up" delay={i * 0.1}>
                <article className="group cursor-pointer service-card bg-white">
                  <div className="overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.name}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-sans font-medium text-[16px] text-[var(--kol)]">{s.name}</h3>
                    <p className="mt-2 text-[14px] text-[#777] leading-relaxed">{s.desc}</p>
                    <span className="inline-block mt-3 text-[13px] font-medium text-[var(--skog)]">Läs mer →</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section id="projekt" className="bg-[var(--kol)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <Reveal variant="left" className="lg:col-span-3">
            <img
              src={featured}
              alt="Villa Sandberg"
              width={1200}
              height={1600}
              loading="lazy"
              className="w-full h-full object-cover aspect-[3/4]"
            />
          </Reveal>
          <Reveal variant="right" delay={0.2} className="lg:col-span-2 flex items-center px-6 md:px-12 py-16 lg:py-0">
            <div>
              <Eyebrow light>Utvalt projekt</Eyebrow>
              <h2 className="mt-4 text-white text-[32px] md:text-[36px] leading-tight">Villa Sandberg</h2>
              <p className="mt-2 text-[#999] font-light text-sm">Altan & Terrass · Saltsjöbaden</p>
              <p className="mt-6 text-white/75 leading-[1.7] text-[15px]">
                En komplett terrasslösning i IPE-trä med inbyggda sittbänkar, integrerad LED-belysning i trappstegen och glasräcke mot sjöutsikten. Projektet inkluderade markarbete, dränering och en pergola med segelduk för sommardagarna.
              </p>
              <div className="mt-8 flex gap-8 text-white">
                <div>
                  <div className="font-serif text-[36px] leading-none" style={{ color: "var(--tra)" }}>
                    6
                  </div>
                  <div className="text-[11px] tracking-widest uppercase text-white/60 mt-1">Veckor</div>
                </div>
                <div>
                  <div className="font-serif text-[36px] leading-none" style={{ color: "var(--tra)" }}>
                    48
                  </div>
                  <div className="text-[11px] tracking-widest uppercase text-white/60 mt-1">Kvm</div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-[11px] tracking-widest uppercase text-white/60">Altan</div>
                  <div className="text-[11px] tracking-widest uppercase text-white/60">& Terrass</div>
                </div>
              </div>
              <a href="#kontakt" className="btn-outline-light mt-8">Se hela projektet →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="bg-white section-pad">
        <div className="container-x">
          <Reveal variant="up" className="mb-12">
            <Eyebrow>Resultat</Eyebrow>
            <h2 className="mt-4 text-[var(--kol)] text-[32px] md:text-[40px]">Före & efter</h2>
          </Reveal>
          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0">
            {[
              { before: baKitchenBefore, after: baKitchenAfter, alt: "Kök", label: "Köksrenovering · Bromma" },
              { before: baBathBefore, after: baBathAfter, alt: "Badrum", label: "Badrumsrenovering · Nacka" },
              { before: baFacadeBefore, after: baFacadeAfter, alt: "Fasad", label: "Fasadrenovering · Täby" },
            ].map((item, i) => (
              <Reveal key={item.label} variant="up" delay={i * 0.12} className="snap-start shrink-0 w-[85%] md:w-auto">
                <BeforeAfter before={item.before} after={item.after} alt={item.alt} />
                <p className="mt-4 font-medium text-[var(--kol)]">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[var(--krita)] section-pad">
        <div className="container-x">
          <Reveal variant="up" className="max-w-2xl mb-16">
            <Eyebrow>Så jobbar vi</Eyebrow>
            <h2 className="mt-4 text-[var(--kol)] text-[32px] md:text-[40px] leading-tight">
              Från första samtal<br />till sista penseldrag
            </h2>
          </Reveal>

          <div ref={processRef} className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            {/* desktop horizontal track */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-[var(--sand)]/40" />
            <div
              className="hidden md:block absolute top-12 left-[12.5%] h-px bg-[var(--tra)] origin-left"
              style={{ right: "12.5%", transform: `scaleX(${processProgress})`, transition: "transform .2s ease-out" }}
            />
            {/* mobile vertical track */}
            <div className="md:hidden absolute top-0 bottom-0 left-3 w-px bg-[var(--sand)]/40" />
            <div
              className="md:hidden absolute top-0 left-3 w-px bg-[var(--tra)] origin-top"
              style={{ height: "100%", transform: `scaleY(${processProgress})`, transition: "transform .2s ease-out" }}
            />
            {steps.map((s, i) => (
              <Reveal key={s.n} variant="left" delay={i * 0.12} className="relative md:pl-0 pl-10">
                <div
                  className="font-serif text-[48px] leading-none origin-left"
                  style={{
                    color: "var(--tra)",
                    opacity: 0.55,
                    animation: "hero-rise .6s ease-out forwards",
                    animationDelay: `${i * 0.12 + 0.1}s`,
                  }}
                >
                  {s.n}
                </div>
                <h3 className="mt-4 font-sans font-medium text-[16px] text-[var(--kol)]">{s.t}</h3>
                <p className="mt-2 text-[14px] text-[#777] leading-relaxed">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--kol)] section-pad">
        <div className="container-x">
          <Reveal variant="up" className="mb-14">
            <Eyebrow light>Kundröster</Eyebrow>
            <h2 className="mt-4 text-white text-[32px] md:text-[36px]">Vad våra kunder säger</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <Reveal key={t.a} variant="up" delay={i * 0.15} className="border-l-2 pl-6" style={{ borderColor: "var(--tra)" }}>
                <Stars />
                <p className="font-serif italic text-[18px] text-white/90 leading-[1.6]">
                  “{t.q}”
                </p>
                <p className="mt-6 text-[13px] text-[#999]">— {t.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="om" className="bg-white section-pad overflow-hidden">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
            <Reveal variant="right" delay={0.2}>
              <Eyebrow>Om N3</Eyebrow>
              <h2 className="mt-4 text-[var(--kol)] text-[32px] md:text-[36px] leading-tight">
                Hantverk med<br />modern precision
              </h2>
              <div className="mt-6 space-y-5 text-[#555] leading-[1.7] text-[15px]">
                <p>
                  N3 grundades med en enkel idé: att bygga som om det vore vårt eget hem. Vi kombinerar traditionellt hantverk med moderna material och metoder. Varje projekt börjar med att lyssna — och slutar med att överträffa förväntningar.
                </p>
                <p>
                  Vi är ett tight team av snickare, projektledare och designers som brinner för kvalitet. Och ja — vi CO2-kompenserar varje projekt vi genomför. Inte för att det ser bra ut, utan för att det är rätt.
                </p>
              </div>
              <Reveal variant="scale" delay={0.6} className="mt-8 inline-flex items-center gap-2 text-[12px] text-[#999]">
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--skog)" }} />
                CO2 Kompenserad
              </Reveal>
            </Reveal>
            <Reveal variant="left" className="lg:order-last">
              <img
                src={about}
                alt="Hantverkare i arbete"
                width={1200}
                height={1500}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} id="kontakt" className="relative bg-[var(--skog)] section-pad overflow-hidden">
        <div
          className="absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 70% 80%, rgba(196,169,125,0.18), transparent 50%)",
            transform: `translate3d(0, ${ctaOffset}px, 0)`,
            willChange: "transform",
          }}
        />
        <div className="container-x text-center relative">
          <Reveal variant="up">
            <h2 className="font-serif text-white text-[32px] md:text-[36px]">
              Redo att förverkliga ditt projekt?
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.15}>
            <p className="mt-4 text-white/80 font-light max-w-xl mx-auto">
              Boka ett kostnadsfritt hembesök — vi lyssnar, mäter och återkommer med en detaljerad offert.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.3} className="mt-8">
            <a href="tel:+4681234567" className="btn-light">Boka möte</a>
          </Reveal>
          <Reveal variant="fade" delay={0.5}>
            <p className="mt-6 text-white/60 text-sm">Eller ring oss: 08-123 45 67</p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--kol)] text-white pt-20 pb-10">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <Reveal variant="up" delay={0}>
              <div className="font-serif text-[28px]">N3</div>
              <p className="mt-3 text-[12px] text-[#666]">SmartKlimat N3prenad AB</p>
              <p className="text-[12px] text-[#555]">Bygger med omtanke</p>
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <h4 className="font-sans font-medium text-[13px] tracking-widest uppercase text-white">Tjänster</h4>
              <ul className="mt-4 space-y-2 text-[14px] text-[#888]">
                {["Totalrenovering", "Badrum", "Kök", "Tak", "Fasad", "Altan"].map((s) => (
                  <li key={s}><a href="#tjanster" className="hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="up" delay={0.2}>
              <h4 className="font-sans font-medium text-[13px] tracking-widest uppercase text-white">Kontakt</h4>
              <ul className="mt-4 space-y-2 text-[14px] text-[#888]">
                <li>Telefon: 08-123 45 67</li>
                <li>E-post: info@smartklimatn3.se</li>
                <li>Adress: Stockholm</li>
              </ul>
            </Reveal>
            <Reveal variant="up" delay={0.3}>
              <h4 className="font-sans font-medium text-[13px] tracking-widest uppercase text-white">Följ oss</h4>
              <ul className="mt-4 space-y-2 text-[14px] text-[#888]">
                <li><a href="https://instagram.com/n3smartklimat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="https://facebook.com/n3smartklimat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </Reveal>
          </div>

          <div className="mt-16 pt-6 border-t border-[#333] flex flex-col md:flex-row gap-4 justify-between items-center text-[12px] text-[#666]">
            <p>© 2026 SmartKlimat N3prenad AB</p>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => setPolicy("integritet")} className="hover:text-white transition-colors">Integritetspolicy</button>
              <span>|</span>
              <button type="button" onClick={() => setPolicy("cookies")} className="hover:text-white transition-colors">Cookies</button>
            </div>
            <div className="inline-flex items-center gap-2 opacity-60">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--skog)" }} />
              CO2 Kompenserad
            </div>
          </div>
        </div>
      </footer>

      {policy && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
          onClick={() => setPolicy(null)}
        >
          <div
            className="bg-white text-[var(--kol)] max-w-md w-full p-8 rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-[24px] mb-3">
              {policy === "integritet" ? "Integritetspolicy" : "Cookie-policy"}
            </h3>
            <p className="text-sm text-[#555] leading-relaxed">
              {policy === "integritet"
                ? "Integritetspolicy kommer snart."
                : "Cookie-policy kommer snart."}
            </p>
            <button
              type="button"
              onClick={() => setPolicy(null)}
              className="mt-6 text-[12px] tracking-widest uppercase text-[var(--kol)] hover:opacity-60 transition-opacity"
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
