import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/kontakt")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Kontakt — N3 SmartKlimat" },
      { name: "description", content: "Boka ett kostnadsfritt hembesök eller skicka en förfrågan. Vi svarar inom 24h." },
      { property: "og:title", content: "Kontakt — N3 SmartKlimat" },
      { property: "og:description", content: "Boka ett kostnadsfritt hembesök." },
    ],
  }),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        eyebrow="Kontakt"
        title="Boka ett kostnadsfritt möte"
        intro="Vi kommer hem till dig, lyssnar på dina önskemål och tar mått. Helt utan förpliktelser."
      />

      <section id="boka" className="bg-white section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          <Reveal variant="up">
            {submitted ? (
              <div className="bg-[var(--krita)] p-10 text-center">
                <h2 className="font-serif text-[28px] text-[var(--kol)]">Tack!</h2>
                <p className="mt-3 text-[#555]">Vi återkommer inom 24 timmar.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <Field label="Namn" name="namn" required />
                <Field label="E-post" name="email" type="email" required />
                <Field label="Telefon" name="tel" type="tel" />
                <div>
                  <label className="block text-[12px] tracking-widest uppercase text-[#888] mb-2">Tjänst</label>
                  <select
                    name="tjanst"
                    className="w-full bg-white border border-[#ddd] px-4 py-3 text-[15px] text-[var(--kol)] focus:border-[var(--tra)] outline-none"
                  >
                    <option>Totalrenovering</option>
                    <option>Badrum</option>
                    <option>Kök</option>
                    <option>Tak</option>
                    <option>Fasad</option>
                    <option>Altan & Terrass</option>
                    <option>Annat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] tracking-widest uppercase text-[#888] mb-2">Beskriv ditt projekt</label>
                  <textarea
                    name="meddelande"
                    rows={5}
                    className="w-full bg-white border border-[#ddd] px-4 py-3 text-[15px] text-[var(--kol)] focus:border-[var(--tra)] outline-none resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary">Skicka förfrågan</button>
                <p className="text-[12px] text-[#888]">Vi svarar inom 24 timmar.</p>
              </form>
            )}
          </Reveal>

          <Reveal variant="up" delay={0.15}>
            <div className="bg-[var(--kol)] text-white p-8">
              <h3 className="font-serif text-[24px]">Direktkontakt</h3>
              <ul className="mt-6 space-y-4 text-[14px] text-white/80">
                <li>
                  <div className="text-[11px] tracking-widest uppercase text-white/50">Telefon</div>
                  <a href="tel:+4681234567" className="text-white hover:text-[var(--tra)]">08-123 45 67</a>
                </li>
                <li>
                  <div className="text-[11px] tracking-widest uppercase text-white/50">E-post</div>
                  <a href="mailto:info@smartklimatn3.se" className="text-white hover:text-[var(--tra)]">info@smartklimatn3.se</a>
                </li>
                <li>
                  <div className="text-[11px] tracking-widest uppercase text-white/50">Adress</div>
                  <p className="text-white">Stockholm</p>
                </li>
                <li>
                  <div className="text-[11px] tracking-widest uppercase text-white/50">Öppettider</div>
                  <p className="text-white">Mån–Fre 07:00–17:00</p>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[12px] tracking-widest uppercase text-[#888] mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-white border border-[#ddd] px-4 py-3 text-[15px] text-[var(--kol)] focus:border-[var(--tra)] outline-none"
      />
    </div>
  );
}
