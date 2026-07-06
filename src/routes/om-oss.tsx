import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/ParallaxImage";
import { CountUp } from "@/components/CountUp";
import team from "@/assets/team.webp";
import { Award, Eye, Leaf, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/om-oss")({
  component: AboutPage,
  head: () => ({
    links: [{ rel: "canonical", href: "https://n3prenad.se/om-oss" }],
    meta: [
      { title: "Om N3 — Hantverk med modern precision" },
      { name: "description", content: "Vi bygger som om det vore vårt eget hem. Möt teamet bakom N3 SmartKlimat." },
      { property: "og:title", content: "Om N3 — Hantverk med modern precision" },
      { property: "og:description", content: "Vi bygger som om det vore vårt eget hem." },
      { property: "og:image", content: team },
    ],
  }),
});

const VALUES = [
  {
    icon: Award,
    title: "Kvalitet framför kvantitet",
    desc: "Vi tar på oss färre projekt för att ge varje kund 100%. Ingen löpande band-renovering.",
  },
  {
    icon: Eye,
    title: "Transparens",
    desc: "Fast pris, tydlig tidsplan, och en kontaktperson du faktiskt når. Inga överraskningar.",
  },
  {
    icon: Leaf,
    title: "Hållbarhet",
    desc: "Vi CO2-kompenserar varje projekt och väljer material med omtanke. Det kostar lite mer och är värt det.",
  },
];

const CERTS = [
  "BKR Auktoriserad",
  "ID06",
  "Hantverkarkoll-verifierad",
  "Ansvarsförsäkring via Länsförsäkringar",
  "Elsäkerhetsverket (via partners)",
];

function AboutPage() {
  return (
    <main>
      {/* HERO */}
      <section
        className="relative flex items-end"
        style={{
          height: "40vh",
          minHeight: 360,
          backgroundImage: `url(${team})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(26,31,30,0.6)" }} />
        <div className="container-x relative pb-12 md:pb-16">
          <h1 className="font-serif text-white leading-[1.05]" style={{ fontSize: "clamp(40px, 6vw, 48px)" }}>
            Om N3
          </h1>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-[var(--krita)] section-pad">
        <div className="container-x max-w-[860px]">
          <Reveal variant="up">
            <span className="label-eyebrow" style={{ color: "#999" }}>Vår historia</span>
            <h2 className="font-serif text-[var(--kol)] mt-3 text-[32px] md:text-[44px]">Vår historia</h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <div className="mt-10 space-y-6 text-[#444] text-[17px] leading-[1.8]">
              <p>
                N3 startade 2015 med en enkel filosofi: vi bygger som om det vore vårt eget hem. Grundaren insåg
                tidigt att marknaden saknade hantverkare som kombinerade genuint hantverk med modern projekt­ledning
                och transparent prissättning.
              </p>
              <p>
                Idag är vi ett team av erfarna snickare, projektledare och samarbetspartners som tillsammans
                genomför allt från badrumsrenoveringar till kompletta villaprojekt. Vi är baserade i Stockholm
                men arbetar i hela Stockholmsregionen.
              </p>
              <p>
                Varje projekt börjar med att lyssna. Vi tror att de bästa resultaten kommer från att verkligen
                förstå hur du lever i ditt hem — inte från att applicera en standardlösning.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white section-pad">
        <div className="container-x">
          <Reveal variant="up">
            <span className="label-eyebrow" style={{ color: "#999" }}>Vad vi står för</span>
            <h2 className="font-serif text-[var(--kol)] mt-3 text-[32px] md:text-[44px]">Våra principer</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-14">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} variant="up" delay={i * 0.08}>
                <div
                  className="h-full p-8 lg:p-10 rounded-[8px] transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)]"
                  style={{
                    background: i % 2 === 1 ? "var(--krita)" : "transparent",
                    border: i % 2 === 1 ? "1px solid transparent" : "1px solid #ECE7DD",
                  }}
                >
                  <v.icon size={32} strokeWidth={1.25} className="text-[var(--tra)]" />
                  <h3 className="mt-6 font-serif text-[24px] text-[var(--kol)] leading-tight">{v.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#666" }}>
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-[var(--krita)] section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal variant="right">
            <div className="overflow-hidden rounded-[8px]" style={{ aspectRatio: "4 / 5" }}>
              <ParallaxImage src={team} alt="N3 teamet" className="w-full h-full" />
            </div>
          </Reveal>
          <Reveal variant="left" delay={0.1}>
            <span className="label-eyebrow" style={{ color: "#999" }}>Människorna</span>
            <h2 className="font-serif text-[var(--kol)] mt-3 text-[32px] md:text-[44px]">Teamet</h2>
            <p className="mt-6 text-[#444] text-[17px] leading-[1.8]">
              Vi är ett tight team som jobbar ihop dag ut och dag in. Det märks i resultatet.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-[420px]">
              <Stat n="120+" l="Färdiga projekt" />
              <Stat n="11" l="År i branschen" />
              <Stat n="4.9" l="Kundbetyg" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-white section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
          <Reveal variant="up">
            <span className="label-eyebrow" style={{ color: "#999" }}>Trygghet</span>
            <h2 className="font-serif text-[var(--kol)] mt-3 text-[32px] md:text-[44px]">
              Certifieringar &amp; försäkringar
            </h2>
            <ul className="mt-10 space-y-4">
              {CERTS.map((c) => (
                <li key={c} className="flex items-start gap-4 border-b pb-4" style={{ borderColor: "#eee" }}>
                  <ShieldCheck size={20} className="text-[var(--tra)] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span className="text-[16px] text-[var(--kol)]">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="up" delay={0.15}>
            <div
              className="rounded-full mx-auto flex flex-col items-center justify-center text-center p-6"
              style={{
                width: 220,
                height: 220,
                border: "2px dashed var(--tra)",
                background: "var(--krita)",
              }}
            >
              <Leaf size={32} className="text-[var(--tra)]" strokeWidth={1.25} />
              <div className="mt-3 font-serif text-[20px] text-[var(--kol)] leading-tight">CO₂-kompenserat</div>
              <div className="mt-2 text-[11px] tracking-[0.18em] uppercase text-[#888]">Varje projekt</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: "#1f4030" }}>
        <div className="container-x text-center">
          <Reveal variant="up">
            <h2 className="font-serif text-white text-[32px] md:text-[44px] leading-[1.1] max-w-[760px] mx-auto">
              Vill du veta mer? Kontakta oss för ett kostnadsfritt möte.
            </h2>
            <Link to="/kontakt" className="btn-light mt-10 inline-block">
              Boka möte
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <CountUp value={n} className="font-serif text-[36px] leading-none text-[var(--tra)] block" />
      <div className="text-[12px] tracking-widest uppercase text-[#888] mt-2">{l}</div>
    </div>
  );
}
