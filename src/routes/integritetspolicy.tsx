import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/integritetspolicy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Integritetspolicy — N3 SmartKlimat" },
      { name: "description", content: "Hur vi hanterar dina personuppgifter enligt GDPR." },
    ],
  }),
});

function PrivacyPage() {
  return (
    <main>
      <PageHero eyebrow="Juridik" title="Integritetspolicy" />
      <section className="bg-white section-pad">
        <div className="container-x max-w-3xl prose-policy text-[15px] text-[#444] leading-[1.8] space-y-6">
          <p><strong>Senast uppdaterad:</strong> januari 2026</p>
          <p>
            SmartKlimat N3prenad AB ("vi", "oss") värnar om din personliga integritet.
            Denna policy beskriver hur vi samlar in, använder och skyddar dina personuppgifter
            i enlighet med dataskyddsförordningen (GDPR).
          </p>
          <h2 className="font-serif text-[24px] text-[var(--kol)] mt-10">Vilka uppgifter vi samlar in</h2>
          <p>
            Vi samlar in uppgifter du själv lämnar i kontaktformulär — namn, e-post,
            telefonnummer och beskrivning av ditt projekt. Vi loggar även anonym statistik
            om besök på vår webbplats.
          </p>
          <h2 className="font-serif text-[24px] text-[var(--kol)] mt-10">Hur vi använder uppgifterna</h2>
          <p>Vi använder uppgifterna för att svara på din förfrågan, skicka offert och hålla dig informerad om ditt projekt.</p>
          <h2 className="font-serif text-[24px] text-[var(--kol)] mt-10">Dina rättigheter</h2>
          <p>Du har rätt att begära ut, rätta eller radera dina uppgifter. Kontakta oss på info@smartklimatn3.se.</p>
        </div>
      </section>
    </main>
  );
}
