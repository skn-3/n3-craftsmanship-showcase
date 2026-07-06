import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    links: [{ rel: "canonical", href: "https://n3prenad.se/faq" }],
    meta: [
      { title: "Vanliga frågor — N3 SmartKlimat" },
      { name: "description", content: "Svar på vanliga frågor om renovering, offert, ROT-avdrag och garantier." },
      { property: "og:title", content: "Vanliga frågor — N3 SmartKlimat" },
      { property: "og:description", content: "Svar på vanliga frågor om vårt arbete." },
    ],
  }),
});

const FAQS: { q: string; a: string }[] = [
  {
    q: "Vad kostar en renovering?",
    a: "Varje projekt är unikt, så det är svårt att ge ett exakt pris utan att se utrymmet. Som riktmärke: en badrumsrenovering startar runt 120 000 kr, ett nytt kök från 80 000 kr, och en totalrenovering av lägenhet från 8 000 kr/kvm. Vi ger alltid ett fast pris efter kostnadsfritt hembesök.",
  },
  {
    q: "Hur lång tid tar en renovering?",
    a: "Beroende på omfattning: ett badrum tar normalt 3–5 veckor, ett kök 2–4 veckor, och en totalrenovering 8–16 veckor. Vi ger en tidsplan redan i offerten och håller dig uppdaterad löpande.",
  },
  {
    q: "Kan jag bo kvar under renoveringen?",
    a: "I de flesta fall ja, men det beror på projektets omfattning. Vid totalrenoveringar rekommenderar vi ofta att flytta ut under de mest intensiva faserna. Vi planerar alltid för att minimera störningarna.",
  },
  {
    q: "Vad är ROT-avdrag och hur funkar det?",
    a: "ROT-avdrag innebär att du får 30% skattereduktion på arbetskostnaden (inte materialkostnaden). Max 50 000 kr per person och år. Vi drar av det direkt på fakturan, så du betalar mindre. Äger ni bostaden tillsammans kan ni kombinera avdragen, upp till 100 000 kr per år. Det gäller privatpersoner som äger sin bostad.",
  },
  {
    q: "Har ni garanti på arbetet?",
    a: "Ja, vi lämnar 5 års garanti på allt arbete vi utför. Dessutom är alla våra projekt försäkrade via Länsförsäkringar. Om något inte håller måttet fixar vi det.",
  },
  {
    q: "Jobbar ni med underentreprenörer?",
    a: "För el och VVS samarbetar vi med certifierade partners som vi arbetat med i många år. Allt snickeri och byggnadsarbete utförs av vårt eget team.",
  },
  {
    q: "Vilka områden täcker ni?",
    a: "Vi är baserade i Stockholm och arbetar i hela Stockholmsregionen — från Norrtälje till Nynäshamn, och från Södertälje till Vaxholm.",
  },
  {
    q: "Hur går det till att begära offert?",
    a: "Fyll i formuläret på vår kontaktsida eller ring oss. Vi bokar ett kostnadsfritt hembesök där vi lyssnar på dina önskemål, tar mått och fotar. Inom 5 arbetsdagar får du en detaljerad offert med fast pris.",
  },
  {
    q: "Är ni CO₂-kompenserade?",
    a: "Ja, vi kompenserar koldioxidutsläppen från varje projekt vi genomför. Det inkluderar materialtransporter och energiförbrukning under byggtiden. Vi samarbetar med en certifierad partner för att säkerställa att kompensationen gör verklig skillnad.",
  },
  {
    q: "Kan jag se referensprojekt?",
    a: "Ja. På projektsidan finns bilder och beskrivningar av genomförda projekt, och vi lämnar gärna kontaktuppgifter till tidigare kunder.",
  },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main>
      {/* HERO */}
      <section
        className="bg-[var(--kol)] flex items-end"
        style={{ minHeight: "25vh", paddingTop: 140, paddingBottom: 48 }}
      >
        <div className="container-x">
          <h1 className="font-serif text-white leading-[1.05]" style={{ fontSize: "clamp(36px, 6vw, 48px)" }}>
            Vanliga frågor
          </h1>
        </div>
      </section>

      {/* ACCORDION */}
      <section className="bg-white section-pad">
        <div className="container-x max-w-[820px]">
          <ul>
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b" style={{ borderColor: "#E8E3DA" }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span
                      className="font-medium text-[var(--kol)] transition-colors group-hover:text-[var(--tra)]"
                      style={{ fontSize: 16 }}
                    >
                      {item.q}
                    </span>
                    <span
                      className="shrink-0 text-[var(--tra)] transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      <Plus size={22} strokeWidth={1.5} />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pr-12" style={{ color: "#555", fontSize: 15, lineHeight: 1.7 }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Didn't find */}
          <Reveal variant="up">
            <div className="mt-16 bg-[var(--krita)] p-10 rounded-[8px] text-center">
              <h2 className="font-serif text-[24px] md:text-[28px] text-[var(--kol)]">
                Hittade du inte svaret?
              </h2>
              <p className="mt-3 text-[#666] max-w-[460px] mx-auto">
                Hör av dig så svarar vi personligen — oftast inom samma dag.
              </p>
              <Link to="/kontakt" className="btn-primary mt-7 inline-block">
                Kontakta oss
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
