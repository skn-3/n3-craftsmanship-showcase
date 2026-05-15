import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Kontakta oss — N3 SmartKlimat" },
      { name: "description", content: "Berätta om ditt projekt — vi återkommer inom 24 timmar." },
      { property: "og:title", content: "Kontakta oss — N3 SmartKlimat" },
      { property: "og:description", content: "Berätta om ditt projekt — vi återkommer inom 24 timmar." },
    ],
  }),
});

const TRUSTS = ["BKR Auktoriserad", "ID06", "Hantverkarkoll", "Länsförsäkringar", "Elsäkerhetsverket"];

const PROJECT_TYPES = [
  "Totalrenovering",
  "Badrum",
  "Kök",
  "Tak",
  "Fasad",
  "Altan & Terrass",
  "Tillbyggnad",
  "Målning & Tapetsering",
  "Inredning",
  "Annat",
];
const BUDGETS = [
  "Vet ej",
  "Under 100 000 kr",
  "100 000 - 300 000 kr",
  "300 000 - 500 000 kr",
  "500 000 - 1 000 000 kr",
  "Över 1 000 000 kr",
];
const STARTS = ["Så snart som möjligt", "Inom 1 månad", "Inom 3 månader", "Inom 6 månader", "Nästa år"];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // eslint-disable-next-line no-console
    console.log("Offertförfrågan:", data);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      {/* HERO */}
      <section
        className="bg-[var(--kol)] flex items-end"
        style={{ minHeight: "30vh", paddingTop: 140, paddingBottom: 56 }}
      >
        <div className="container-x">
          <h1 className="font-serif text-white leading-[1.05]" style={{ fontSize: "clamp(36px, 6vw, 48px)" }}>
            Kontakta oss
          </h1>
          <p className="mt-4 font-light text-white/70" style={{ fontSize: 16 }}>
            Berätta om ditt projekt — vi återkommer inom 24 timmar.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white section-pad">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20">
          {/* LEFT: FORM */}
          <Reveal variant="up">
            {submitted ? (
              <div className="bg-[var(--krita)] p-12 rounded-[8px] text-center">
                <div
                  className="mx-auto flex items-center justify-center rounded-full"
                  style={{
                    width: 72,
                    height: 72,
                    background: "#2D5A3D",
                    animation: "popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <Check size={36} color="#fff" strokeWidth={2.5} />
                </div>
                <h2 className="font-serif text-[28px] text-[var(--kol)] mt-6">Tack!</h2>
                <p className="mt-3 text-[#555] max-w-[420px] mx-auto leading-relaxed">
                  Vi har mottagit din förfrågan och återkommer inom 24 timmar.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-[var(--kol)] text-[28px] md:text-[36px]">Begär offert</h2>
                <form onSubmit={onSubmit} className="mt-10 space-y-7">
                  <UnderlineField label="Namn" name="namn" required />
                  <UnderlineField label="E-post" name="email" type="email" required />
                  <UnderlineField label="Telefon" name="telefon" type="tel" required />
                  <UnderlineSelect label="Typ av projekt" name="typ" options={PROJECT_TYPES} required />
                  <UnderlineField label="Adress" name="adress" />
                  <UnderlineSelect label="Ungefärlig budget" name="budget" options={BUDGETS} />
                  <UnderlineSelect label="Önskad startperiod" name="start" options={STARTS} />
                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#888] mb-3">
                      Beskriv ditt projekt
                    </label>
                    <textarea
                      name="meddelande"
                      rows={4}
                      className="w-full bg-transparent text-[15px] text-[var(--kol)] resize-none outline-none border-0 border-b py-2 focus:border-[var(--tra)] transition-colors"
                      style={{ borderBottomWidth: 1, borderColor: "#d4cdbf" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#888] mb-3">
                      Bifoga bilder på utrymmet (valfritt)
                    </label>
                    <input
                      type="file"
                      name="bilder"
                      multiple
                      accept="image/*"
                      className="block w-full text-[14px] text-[#555] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[12px] file:tracking-[0.15em] file:uppercase file:bg-[var(--krita)] file:text-[var(--kol)] hover:file:bg-[#ebe6dd]"
                    />
                  </div>
                  <label className="flex items-start gap-3 text-[13px] text-[#555] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-[#2D5A3D]"
                      required
                    />
                    <span>
                      Jag godkänner att N3 SmartKlimat lagrar mina uppgifter enligt vår{" "}
                      <a href="/integritetspolicy" className="underline hover:text-[var(--kol)]">
                        integritetspolicy
                      </a>
                      .
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={!consent}
                    className="w-full py-4 text-[13px] tracking-[0.15em] uppercase text-white rounded-[4px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "#2D5A3D" }}
                  >
                    Skicka förfrågan
                  </button>
                </form>
              </>
            )}
          </Reveal>

          {/* RIGHT: INFO */}
          <Reveal variant="up" delay={0.1}>
            <div className="space-y-8">
              {/* Contact info card */}
              <div className="bg-[var(--krita)] p-8 rounded-[8px]">
                <h3 className="font-serif text-[22px] text-[var(--kol)]">Direktkontakt</h3>
                <ul className="mt-6 space-y-5">
                  <InfoRow icon={<Phone size={18} strokeWidth={1.5} />} label="Telefon">
                    <a href="tel:+4681234567" className="hover:text-[var(--tra)]">08-123 45 67</a>
                  </InfoRow>
                  <InfoRow icon={<Mail size={18} strokeWidth={1.5} />} label="E-post">
                    <a href="mailto:info@smartklimatn3.se" className="hover:text-[var(--tra)] break-all">
                      info@smartklimatn3.se
                    </a>
                  </InfoRow>
                  <InfoRow icon={<MapPin size={18} strokeWidth={1.5} />} label="Adress">
                    Stockholm
                  </InfoRow>
                  <InfoRow icon={<Clock size={18} strokeWidth={1.5} />} label="Öppettider">
                    Mån–Fre 07:00–17:00
                  </InfoRow>
                </ul>
              </div>

              {/* Book a call */}
              <div id="boka" className="bg-[var(--kol)] text-white p-8 rounded-[8px] scroll-mt-32">
                <h3 className="font-serif text-[22px]">Boka telefonsamtal</h3>
                <p className="mt-3 text-white/70 text-[14px] leading-relaxed">
                  Föredrar du att prata direkt? Boka en tid som passar dig.
                </p>
                <a
                  href="https://calendly.com/n3smartklimat"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block px-6 py-3 text-[12px] tracking-[0.15em] uppercase rounded-[4px] transition-colors"
                  style={{ background: "var(--tra)", color: "var(--kol)" }}
                >
                  Välj tid
                </a>
                <p className="mt-3 text-[12px] text-white/50">15 min kostnadsfritt samtal</p>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-[8px]" style={{ aspectRatio: "4 / 3" }}>
                <iframe
                  title="N3 SmartKlimat — Stockholm"
                  src="https://www.google.com/maps?q=Stockholm,Sweden&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-[var(--krita)] py-12 border-t" style={{ borderColor: "#e8e3da" }}>
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-[12px] tracking-[0.18em] text-[#999] uppercase">
            {TRUSTS.map((t, i) => (
              <span key={t} className="flex items-center">
                {t}
                {i < TRUSTS.length - 1 && <span className="mx-3 text-[#ccc]">|</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <style>{`@keyframes popIn { 0% { transform: scale(0); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }`}</style>
    </main>
  );
}

function UnderlineField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.18em] uppercase text-[#888] mb-3">
        {label}
        {required && <span className="text-[var(--tra)] ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-transparent text-[15px] text-[var(--kol)] outline-none border-0 border-b py-2 focus:border-[var(--tra)] transition-colors"
        style={{ borderBottomWidth: 1, borderColor: "#d4cdbf" }}
      />
    </div>
  );
}

function UnderlineSelect({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.18em] uppercase text-[#888] mb-3">
        {label}
        {required && <span className="text-[var(--tra)] ml-1">*</span>}
      </label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full bg-transparent text-[15px] text-[var(--kol)] outline-none border-0 border-b py-2 focus:border-[var(--tra)] transition-colors appearance-none cursor-pointer"
        style={{
          borderBottomWidth: 1,
          borderColor: "#d4cdbf",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='none' stroke='%23999' stroke-width='1.5' d='M1 1l5 5 5-5'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 4px center",
        }}
      >
        <option value="" disabled>
          Välj…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="text-[var(--tra)] mt-1 shrink-0">{icon}</span>
      <div>
        <div className="text-[11px] tracking-[0.18em] uppercase text-[#888]">{label}</div>
        <div className="mt-1 text-[15px] text-[var(--kol)]">{children}</div>
      </div>
    </li>
  );
}
