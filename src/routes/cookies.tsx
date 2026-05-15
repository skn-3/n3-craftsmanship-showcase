import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Cookie-policy — N3 SmartKlimat" },
      { name: "description", content: "Information om hur vi använder cookies på vår webbplats." },
    ],
  }),
});

function CookiesPage() {
  return (
    <main>
      <PageHero eyebrow="Juridik" title="Cookie-policy" />
      <section className="bg-white section-pad">
        <div className="container-x max-w-3xl text-[15px] text-[#444] leading-[1.8] space-y-6">
          <p><strong>Senast uppdaterad:</strong> januari 2026</p>
          <p>
            En cookie är en liten textfil som lagras i din webbläsare när du besöker en webbplats.
            Vi använder cookies för att förbättra din upplevelse och förstå hur webbplatsen används.
          </p>
          <h2 className="font-serif text-[24px] text-[var(--kol)] mt-10">Cookies vi använder</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Nödvändiga cookies</strong> — krävs för att webbplatsen ska fungera.</li>
            <li><strong>Analyscookies</strong> — anonym statistik via Plausible/GA4 för att förbättra innehållet.</li>
          </ul>
          <h2 className="font-serif text-[24px] text-[var(--kol)] mt-10">Hantera cookies</h2>
          <p>Du kan när som helst stänga av cookies i din webbläsares inställningar.</p>
        </div>
      </section>
    </main>
  );
}
