import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-[var(--kol)] text-white pt-20 pb-10 relative z-[2]">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <Reveal variant="up" delay={0}>
            <Link to="/" className="font-serif text-[28px]">N3</Link>
            <p className="mt-3 text-[12px] text-[#666]">SmartKlimat N3prenad AB</p>
            <p className="text-[12px] text-[#555]">Bygger med omtanke</p>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <h4 className="font-sans font-medium text-[13px] tracking-widest uppercase text-white">Tjänster</h4>
            <ul className="mt-4 space-y-2 text-[14px] text-[#888]">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/tjanster/$slug"
                    params={{ slug: s.slug }}
                    className="hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="up" delay={0.2}>
            <h4 className="font-sans font-medium text-[13px] tracking-widest uppercase text-white">Kontakt</h4>
            <ul className="mt-4 space-y-2 text-[14px] text-[#888]">
              <li>Telefon: 070-719 72 35</li>
              <li>E-post: n3prenad@smartklimat.org</li>
              <li>Adress: Stockholm</li>
              <li className="pt-2">
                <Link to="/faq" className="hover:text-white transition-colors">Vanliga frågor</Link>
              </li>
            </ul>
          </Reveal>
          <Reveal variant="up" delay={0.3}>
            <h4 className="font-sans font-medium text-[13px] tracking-widest uppercase text-white">Följ oss</h4>
            <ul className="mt-4 space-y-2 text-[14px] text-[#888]">
              <li><a href="https://instagram.com/n3smartklimat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://facebook.com/n3smartklimat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 pt-6 border-t border-[#333] flex flex-col md:flex-row gap-4 justify-between items-center text-[12px] text-[#666]">
          <p>© 2026 SmartKlimat N3prenad AB</p>
          <div className="flex items-center gap-4">
            <Link to="/integritetspolicy" className="hover:text-white transition-colors">Integritetspolicy</Link>
            <span>|</span>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
          <div className="inline-flex items-center gap-2 opacity-60">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--skog)" }} />
            CO2 Kompenserad
          </div>
        </div>
      </div>
    </footer>
  );
}
