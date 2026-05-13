import { useState } from "react";
import { useScrolled } from "@/hooks/use-reveal";

const links = [
  { href: "#tjanster", label: "Tjänster" },
  { href: "#projekt", label: "Projekt" },
  { href: "#om", label: "Om oss" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Nav() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || open ? "bg-[var(--kol)]/95 backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-16 md:h-20">
          <a href="#top" className="font-serif text-white text-[28px] leading-none">N3</a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/80 hover:text-white text-sm tracking-wide transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a href="#kontakt" className="btn-primary">Boka möte</a>
          </nav>

          <button
            className="md:hidden text-white p-2"
            aria-label="Meny"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="w-6 h-px bg-white mb-1.5" />
            <div className="w-6 h-px bg-white mb-1.5" />
            <div className="w-6 h-px bg-white" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-[var(--kol)] flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white font-serif text-3xl"
            >
              {l.label}
            </a>
          ))}
          <a href="#kontakt" onClick={() => setOpen(false)} className="btn-primary mt-4">
            Boka möte
          </a>
        </div>
      )}
    </>
  );
}
