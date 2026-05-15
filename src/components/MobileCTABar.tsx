import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    let pastHero = false;
    let footerVisible = false;

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.8;
      setVisible(pastHero && !footerVisible);
    };

    let io: IntersectionObserver | null = null;
    if (footer) {
      io = new IntersectionObserver(
        ([e]) => {
          footerVisible = e.isIntersecting;
          setVisible(pastHero && !footerVisible);
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      io.observe(footer);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      className="md:hidden fixed left-0 right-0 bottom-0 z-[999]"
      style={{
        background: "#1A1F1E",
        borderTop: "1px solid rgba(196,169,125,0.3)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
        paddingBottom: "env(safe-area-inset-bottom)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform .3s ease-out",
        willChange: "transform",
      }}
    >
      <div className="flex gap-2" style={{ height: 64, padding: "10px 16px" }}>
        <a
          href="/kontakt"
          className="flex items-center justify-center text-white uppercase"
          style={{
            width: "60%",
            background: "#2D5A3D",
            borderRadius: 8,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: "1px",
          }}
        >
          Begär offert
        </a>
        <a
          href="tel:08-1234567"
          className="flex items-center justify-center gap-2 text-white"
          style={{
            width: "40%",
            border: "1px solid #fff",
            background: "transparent",
            borderRadius: 8,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          <Phone size={16} strokeWidth={1.6} />
          Ring oss
        </a>
      </div>
    </div>
  );
}
