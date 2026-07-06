import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { getConsent, setConsent, type Consent } from "@/lib/consent";
import { applyConsent, trackPageview } from "@/lib/tracking";

/**
 * CookieConsent — GDPR-banner (Consent Mode v2, basic).
 * Inga spårningsskript laddas innan besökaren gjort ett val.
 * Återöppnas via CustomEvent "n3-open-consent" (knapp på /cookies).
 */

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

const CookieConsent = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [mounted, setMounted] = useState(false);

  /* Tillämpa sparat val, eller visa bannern */
  useEffect(() => {
    setMounted(true);
    const stored = getConsent();
    if (stored) {
      applyConsent(stored);
      trackPageview(window.location.pathname);
    } else {
      setVisible(true);
    }

    const onOpen = () => {
      const current = getConsent();
      if (current) {
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener("n3-open-consent", onOpen);
    return () => window.removeEventListener("n3-open-consent", onOpen);
  }, []);

  /* Sidvisningar vid klientnavigering */
  useEffect(() => {
    return router.subscribe("onResolved", () => {
      trackPageview(window.location.pathname);
    });
  }, [router]);

  const choose = (a: boolean, m: boolean) => {
    const c: Consent = setConsent(a, m);
    applyConsent(c);
    trackPageview(window.location.pathname);
    setVisible(false);
    setExpanded(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-inställningar"
      className="fixed inset-x-4 bottom-4 z-[120] mx-auto max-w-xl rounded-2xl bg-[#1A1F1E] p-5 text-[#F5F2ED] shadow-2xl ring-1 ring-white/10 md:inset-x-auto md:left-6 md:bottom-6 md:p-6"
      style={{ animation: `n3-consent-in 0.5s ${EASE}` }}
    >
      <style>{`@keyframes n3-consent-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <p className="font-serif text-lg leading-snug">Vi använder cookies</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[#F5F2ED]/70">
        Nödvändiga cookies gör att sajten fungerar. Med ditt samtycke använder vi
        även cookies för analys och marknadsföring. Läs mer i vår{" "}
        <a href="/cookies" className="underline decoration-[#C4A97D] underline-offset-2">
          cookie-policy
        </a>{" "}
        och{" "}
        <a href="/integritetspolicy" className="underline decoration-[#C4A97D] underline-offset-2">
          integritetspolicy
        </a>
        .
      </p>

      {expanded && (
        <div className="mt-4 space-y-3 rounded-xl bg-white/5 p-4">
          <label className="flex items-start gap-3 text-[13px]">
            <input type="checkbox" checked disabled className="mt-0.5 accent-[#C4A97D]" />
            <span>
              <span className="font-medium">Nödvändiga</span>
              <span className="block text-[#F5F2ED]/60">Krävs för att sajten ska fungera. Alltid på.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-[13px]">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-0.5 accent-[#C4A97D]"
            />
            <span>
              <span className="font-medium">Analys</span>
              <span className="block text-[#F5F2ED]/60">Anonym statistik (Google Analytics) för att förbättra sajten.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-[13px]">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-0.5 accent-[#C4A97D]"
            />
            <span>
              <span className="font-medium">Marknadsföring</span>
              <span className="block text-[#F5F2ED]/60">Mäter våra annonser (Google Ads, Meta) och gör dem relevantare.</span>
            </span>
          </label>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {expanded ? (
          <button
            type="button"
            onClick={() => choose(analytics, marketing)}
            className="rounded-full bg-[#2D5A3D] px-5 py-2.5 text-[13px] font-medium tracking-wide transition-transform active:scale-95"
          >
            Spara val
          </button>
        ) : (
          <button
            type="button"
            onClick={() => choose(true, true)}
            className="rounded-full bg-[#2D5A3D] px-5 py-2.5 text-[13px] font-medium tracking-wide transition-transform active:scale-95"
          >
            Godkänn alla
          </button>
        )}
        <button
          type="button"
          onClick={() => choose(false, false)}
          className="rounded-full border border-white/20 px-5 py-2.5 text-[13px] font-medium tracking-wide transition-colors hover:border-white/40"
        >
          Endast nödvändiga
        </button>
        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-[13px] text-[#F5F2ED]/60 underline underline-offset-2 hover:text-[#F5F2ED]"
          >
            Anpassa
          </button>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
