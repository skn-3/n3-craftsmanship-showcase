import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    links: [{ rel: "canonical", href: "https://n3prenad.se/cookies" }],
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
            <li><strong>Analyscookies</strong> — anonym statistik via Google Analytics 4 (t.ex. _ga) för att förbättra innehållet. Sätts endast med ditt samtycke.</li>
            <li><strong>Marknadsföringscookies</strong> — mäter våra annonser via Google Ads och Meta (t.ex. _fbp). Sätts endast med ditt samtycke.</li>
          </ul>
          <p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("n3-open-consent"))}
              className="rounded-full bg-[var(--kol)] px-5 py-2.5 text-[13px] font-medium text-white transition-transform active:scale-95"
            >
              Hantera cookie-inställningar
            </button>
          </p>
          <h2 className="font-serif text-[24px] text-[var(--kol)] mt-10">Hantera cookies</h2>
          <p>Du kan när som helst stänga av cookies i din webbläsares inställningar.</p>
        </div>
      </section>
    </main>
  );
}
