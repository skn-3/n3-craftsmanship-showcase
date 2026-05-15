import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "Vanliga frågor — N3 SmartKlimat" },
      { name: "description", content: "Svar på vanliga frågor om renovering, offert, ROT-avdrag och garantier." },
      { property: "og:title", content: "Vanliga frågor — N3 SmartKlimat" },
      { property: "og:description", content: "Svar på vanliga frågor om vårt arbete." },
    ],
  }),
});

const faqs = [
  { q: "Vad kostar en renovering?", a: "Det beror helt på omfattning, materialval och nuvarande skick. Vi kommer gärna ut för ett kostnadsfritt hembesök och återkommer med en detaljerad offert inom 5 arbetsdagar." },
  { q: "Hjälper ni till med ROT-avdrag?", a: "Ja, vi sköter all administration kring ROT-avdraget. Du betalar nettobeloppet direkt på fakturan." },
  { q: "Hur lång garanti har ni?", a: "Vi lämnar 10 års garanti på vårt arbete och fem år på material enligt branschstandard. För badrum gäller dessutom BKR:s garantier." },
  { q: "Kan jag bo kvar under renoveringen?", a: "Ofta ja, beroende på projektets omfattning. Vid totalrenoveringar rekommenderar vi att flytta ut för att hålla tidplanen." },
  { q: "Hur lång tid tar ett kök?", a: "Ett standardkök tar normalt 4–6 veckor från rivning till färdigt resultat. Specialbygda lösningar kan ta längre tid." },
  { q: "Är ni försäkrade?", a: "Ja, vi har full ansvars- och allriskförsäkring via Länsförsäkringar samt är BKR-auktoriserade och har ID06." },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Vanliga frågor"
        intro="Hittar du inte svaret? Hör gärna av dig till oss."
      />
      <section className="bg-white section-pad">
        <div className="container-x max-w-3xl">
          <div className="divide-y divide-[#eee] border-y border-[#eee]">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-sans font-medium text-[18px] text-[var(--kol)]">{f.q}</span>
                    <span
                      className="text-[var(--tra)] text-[24px] leading-none transition-transform"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? 400 : 0,
                      overflow: "hidden",
                      transition: "max-height .35s ease",
                    }}
                  >
                    <p className="pb-6 text-[15px] text-[#555] leading-[1.7] max-w-[640px]">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
