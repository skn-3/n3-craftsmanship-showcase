import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { BeforeAfter } from "@/components/BeforeAfter";
import { useReveal } from "@/hooks/use-reveal";

import hero from "@/assets/hero.jpg";
import featured from "@/assets/featured.jpg";
import about from "@/assets/about.jpg";
import sTotal from "@/assets/s-total.jpg";
import sBath from "@/assets/s-bath.jpg";
import sKitchen from "@/assets/s-kitchen.jpg";
import sRoof from "@/assets/s-roof.jpg";
import sFacade from "@/assets/s-facade.jpg";
import sTerrace from "@/assets/s-terrace.jpg";
import sExtension from "@/assets/s-extension.jpg";
import sWindows from "@/assets/s-windows.jpg";
import sInterior from "@/assets/s-interior.jpg";
import before1 from "@/assets/before1.jpg";
import after1 from "@/assets/after1.jpg";
import before2 from "@/assets/before2.jpg";
import after2 from "@/assets/after2.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "N3 SmartKlimat – Hantverk med skandinavisk precision" },
      {
        name: "description",
        content:
          "N3 bygger hem som håller i generationer. Totalrenoveringar, badrum, kök, tak och fasad i Stockholm.",
      },
      { property: "og:title", content: "N3 SmartKlimat – Hantverk med skandinavisk precision" },
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
  { img: sWindows, name: "Fönster & Dörrar", desc: "Energieffektiva fönster och dörrar med stil." },
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

function Index() {
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  const r3 = useReveal<HTMLDivElement>();
  const r4 = useReveal<HTMLDivElement>();
  const r5 = useReveal<HTMLDivElement>();
  const r6 = useReveal<HTMLDivElement>();
  const r7 = useReveal<HTMLDivElement>();
  const r8 = useReveal<HTMLDivElement>();

  return (
    <div id="top">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <img
          src={hero}
          alt="Modernt skandinaviskt hem"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(26,31,30,0.85), rgba(26,31,30,0.3) 60%, rgba(26,31,30,0.6))" }}
        />
        <div ref={r1} className="reveal in container-x relative z-10 py-32">
          <div className="max-w-3xl">
            <Eyebrow light>Hantverkare sedan 2015</Eyebrow>
            <h1 className="font-serif text-white mt-6 leading-[1.05] text-[36px] md:text-[56px] lg:text-[64px]">
              Vi skapar hem som<br />håller i generationer
            </h1>
            <p className="mt-6 text-white/80 font-light text-base md:text-lg max-w-[560px] leading-relaxed">
              Totalrenoveringar, badrum, kök, tak och fasad — med skandinavisk precision och omtanke för varje detalj.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#projekt" className="btn-primary">Se våra projekt</a>
              <a href="#kontakt" className="btn-outline-light">Boka kostnadsfritt möte</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-scroll-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white py-12">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-50">
            {trusts.map((t) => (
              <div
                key={t}
                className="h-10 px-4 flex items-center justify-center bg-[var(--krita)] text-[11px] tracking-widest uppercase text-[#555]"
              >
                {t}
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-[13px] text-[#888]">
            <span style={{ color: "var(--tra)" }}>★★★★★</span> 4.9 av 5 baserat på 47 omdömen
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="tjanster" className="bg-[var(--krita)] section-pad">
        <div ref={r2} className="reveal container-x">
          <div className="max-w-2xl mb-14">
            <Eyebrow>Våra tjänster</Eyebrow>
            <h2 className="mt-4 text-[var(--kol)] text-[32px] md:text-[40px] leading-tight">Allt under ett tak</h2>
            <p className="mt-4 text-[#666] font-light text-base max-w-[480px]">
              Från idé till inflyttning — vi tar hand om hela processen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <article key={s.name} className="group cursor-pointer">
                <div className="overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-5">
                  <h3 className="font-sans font-medium text-[16px] text-[var(--kol)]">{s.name}</h3>
                  <p className="mt-2 text-[14px] text-[#777] leading-relaxed">{s.desc}</p>
                  <span className="inline-block mt-3 text-[13px] font-medium text-[var(--skog)]">Läs mer →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section id="projekt" className="bg-[var(--kol)]">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <img
              src={featured}
              alt="Villa Lindström"
              width={1200}
              height={1600}
              loading="lazy"
              className="w-full h-full object-cover aspect-[3/4]"
            />
          </div>
          <div ref={r3} className="reveal lg:col-span-2 flex items-center px-6 md:px-12 py-16 lg:py-0">
            <div>
              <Eyebrow light>Utvalt projekt</Eyebrow>
              <h2 className="mt-4 text-white text-[32px] md:text-[36px] leading-tight">Villa Lindström</h2>
              <p className="mt-2 text-[#999] font-light text-sm">Totalrenovering · Bromma</p>
              <p className="mt-6 text-white/75 leading-[1.7] text-[15px]">
                En komplett förvandling av en 70-tals villa till ett modernt familjehem. Nytt kök med marmorbänk, tre badrum i natursten, och en tillbyggnad med panoramafönster mot trädgården.
              </p>
              <p className="mt-6 text-[13px] font-medium" style={{ color: "var(--tra)" }}>
                12 veckor &nbsp;·&nbsp; 145 kvm &nbsp;·&nbsp; Totalrenovering
              </p>
              <a href="#kontakt" className="btn-outline-light mt-8">Se hela projektet →</a>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="bg-white section-pad">
        <div ref={r4} className="reveal container-x">
          <div className="mb-12">
            <Eyebrow>Resultat</Eyebrow>
            <h2 className="mt-4 text-[var(--kol)] text-[32px] md:text-[40px]">Före & efter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <BeforeAfter before={before1} after={after1} alt="Badrum" />
              <p className="mt-4 font-medium text-[var(--kol)]">Badrum, Östermalm</p>
              <p className="text-sm text-[#777]">Renovering · 6 veckor</p>
            </div>
            <div>
              <BeforeAfter before={before2} after={after2} alt="Kök" />
              <p className="mt-4 font-medium text-[var(--kol)]">Kök, Bromma</p>
              <p className="text-sm text-[#777]">Renovering · 4 veckor</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[var(--krita)] section-pad">
        <div ref={r5} className="reveal container-x">
          <div className="max-w-2xl mb-16">
            <Eyebrow>Så jobbar vi</Eyebrow>
            <h2 className="mt-4 text-[var(--kol)] text-[32px] md:text-[40px] leading-tight">
              Från första samtal<br />till sista penseldrag
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-[var(--sand)]" />
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="font-serif text-[48px] leading-none" style={{ color: "var(--tra)", opacity: 0.35 }}>
                  {s.n}
                </div>
                <h3 className="mt-4 font-sans font-medium text-[16px] text-[var(--kol)]">{s.t}</h3>
                <p className="mt-2 text-[14px] text-[#777] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--kol)] section-pad">
        <div ref={r6} className="reveal container-x">
          <div className="mb-14">
            <Eyebrow light>Kundröster</Eyebrow>
            <h2 className="mt-4 text-white text-[32px] md:text-[36px]">Vad våra kunder säger</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <div key={t.a} className="border-l-2 pl-6" style={{ borderColor: "var(--tra)" }}>
                <div className="text-[var(--tra)] mb-4 tracking-widest">★★★★★</div>
                <p className="font-serif italic text-[18px] text-white/90 leading-[1.6]">
                  “{t.q}”
                </p>
                <p className="mt-6 text-[13px] text-[#999]">— {t.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="om" className="bg-white section-pad">
        <div ref={r7} className="reveal container-x">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
            <div>
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
              <div className="mt-8 inline-flex items-center gap-2 text-[12px] text-[#999]">
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--skog)" }} />
                CO2 Kompenserad
              </div>
            </div>
            <div className="lg:order-last">
              <img
                src={about}
                alt="Hantverkare i arbete"
                width={1200}
                height={1500}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontakt" className="bg-[var(--skog)] section-pad">
        <div ref={r8} className="reveal container-x text-center">
          <h2 className="font-serif text-white text-[32px] md:text-[36px]">
            Redo att förverkliga ditt projekt?
          </h2>
          <p className="mt-4 text-white/80 font-light max-w-xl mx-auto">
            Boka ett kostnadsfritt hembesök — vi lyssnar, mäter och återkommer med en detaljerad offert.
          </p>
          <div className="mt-8">
            <a href="tel:08-1234567" className="btn-light">Boka möte</a>
          </div>
          <p className="mt-6 text-white/60 text-sm">Eller ring oss: 08-XXX XX XX</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--kol)] text-white pt-20 pb-10">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="font-serif text-[28px]">N3</div>
              <p className="mt-3 text-[12px] text-[#666]">SmartKlimat N3prenad AB</p>
              <p className="text-[12px] text-[#555]">Bygger med omtanke</p>
            </div>
            <div>
              <h4 className="font-sans font-medium text-[13px] tracking-widest uppercase text-white">Tjänster</h4>
              <ul className="mt-4 space-y-2 text-[14px] text-[#888]">
                {["Totalrenovering", "Badrum", "Kök", "Tak", "Fasad", "Altan"].map((s) => (
                  <li key={s}><a href="#tjanster" className="hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-medium text-[13px] tracking-widest uppercase text-white">Kontakt</h4>
              <ul className="mt-4 space-y-2 text-[14px] text-[#888]">
                <li>Telefon: 08-XXX XX XX</li>
                <li>E-post: info@smartklimatn3.se</li>
                <li>Adress: Stockholm</li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-medium text-[13px] tracking-widest uppercase text-white">Följ oss</h4>
              <ul className="mt-4 space-y-2 text-[14px] text-[#888]">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-[#333] flex flex-col md:flex-row gap-4 justify-between items-center text-[12px] text-[#666]">
            <p>© 2026 SmartKlimat N3prenad AB</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Integritetspolicy</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
            <div className="inline-flex items-center gap-2 opacity-60">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--skog)" }} />
              CO2 Kompenserad
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
