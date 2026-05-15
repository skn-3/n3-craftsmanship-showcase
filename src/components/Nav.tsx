import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useNavScroll } from "@/hooks/use-reveal";

const links = [
  { to: "/tjanster", label: "Tjänster", match: "/tjanster" },
  { to: "/projekt", label: "Projekt", match: "/projekt" },
  { to: "/om-oss", label: "Om oss", match: "/om-oss" },
  { to: "/kontakt", label: "Kontakt", match: "/kontakt" },
] as const;

export function Nav() {
  const { scrolled, hidden } = useNavScroll();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const solid = scrolled || open || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid ? "bg-[#1A1F1E]/95 backdrop-blur-md" : "bg-transparent"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container-x flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-serif text-white text-[28px] leading-none">N3</Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = pathname === l.to || pathname.startsWith(l.match + "/");
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm tracking-wide transition-colors ${
                    active ? "text-white font-medium" : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link to="/kontakt" hash="boka" className="btn-primary btn-pulse">Boka möte</Link>
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
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-white font-serif text-3xl"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/kontakt" hash="boka" onClick={() => setOpen(false)} className="btn-primary mt-4">
            Boka möte
          </Link>
        </div>
      )}
    </>
  );
}
