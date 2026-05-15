import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/ParallaxImage";
import about from "@/assets/team.png";

export const Route = createFileRoute("/om-oss")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Om oss — N3 SmartKlimat" },
      { name: "description", content: "Vi är ett tight team av snickare, projektledare och designers som bygger som om det vore vårt eget hem." },
      { property: "og:title", content: "Om N3 SmartKlimat" },
      { property: "og:description", content: "Hantverk med modern precision sedan 2015." },
    ],
  }),
});

function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="Om N3"
        title="Hantverk med modern precision"
        intro="Vi grundades med en enkel idé: att bygga som om det vore vårt eget hem."
      />
      <section className="bg-white section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal variant="right">
            <ParallaxImage src={about} alt="Vårt team" className="w-full aspect-[4/5]" />
          </Reveal>
          <Reveal variant="left" delay={0.15}>
            <div className="space-y-6 text-[#444] text-[16px] leading-[1.8]">
              <p>
                N3 SmartKlimat startade 2015 i Stockholm. Vi är ett tight team av snickare, projektledare och designers som brinner för kvalitet och välbyggda hem.
              </p>
              <p>
                Vi kombinerar traditionellt hantverk med moderna material och metoder. Varje projekt börjar med att lyssna — och slutar med att överträffa förväntningar.
              </p>
              <p>
                Vi CO2-kompenserar varje projekt. Inte för att det ser bra ut, utan för att det är rätt.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <Stat n="120+" l="Färdiga projekt" />
              <Stat n="11" l="År i branschen" />
              <Stat n="4.9" l="Kundbetyg" />
            </div>
            <Link to="/kontakt" className="btn-primary mt-10 inline-block">Träffa oss</Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-serif text-[36px] leading-none text-[var(--tra)]">{n}</div>
      <div className="text-[12px] tracking-widest uppercase text-[#888] mt-2">{l}</div>
    </div>
  );
}
