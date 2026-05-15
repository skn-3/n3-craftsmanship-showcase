import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "n3-exit-intent-shown";

export function ExitIntentCTA() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;
    if (sessionStorage.getItem(KEY)) return;

    let lastY = window.scrollY;
    let triggered = false;

    const onScroll = () => {
      if (triggered) return;
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? y / docH : 0;
      if (pct > 0.6 && y < lastY - 6) {
        triggered = true;
        setVisible(true);
        sessionStorage.setItem(KEY, "1");
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="hidden md:block fixed z-[998]"
      style={{
        right: 24,
        bottom: 24,
        width: 300,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
        padding: 20,
        animation: "exitSlideIn .35s ease-out",
      }}
    >
      <button
        onClick={() => setVisible(false)}
        aria-label="Stäng"
        style={{ position: "absolute", top: 10, right: 10, color: "#888" }}
      >
        <X size={16} />
      </button>
      {submitted ? (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="font-serif text-[18px] text-[var(--kol)]">Tack!</div>
          <p className="mt-2 text-[13px] text-[#555]">Vi hör av oss inom 24 timmar.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div
            className="font-serif text-[var(--kol)]"
            style={{ fontSize: 18, lineHeight: 1.3 }}
          >
            Vill du ha en kostnadsfri offert?
          </div>
          <input
            type="email"
            required
            placeholder="Din e-post"
            className="mt-3 w-full text-[14px] outline-none border-b py-2"
            style={{ borderColor: "#d4cdbf" }}
          />
          <button
            type="submit"
            className="mt-3 w-full text-white text-[12px] tracking-[0.15em] uppercase py-3 rounded-[6px]"
            style={{ background: "#2D5A3D" }}
          >
            Skicka
          </button>
        </form>
      )}
      <style>{`@keyframes exitSlideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}
