import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function IntroOverlay() {
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState<"black" | "logo" | "morph" | "done">("black");

  useEffect(() => {
    // Mobile: short — just fade out after 0.5s (no morph)
    if (isMobile) {
      const t = setTimeout(() => setPhase("done"), 500);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setPhase("logo"), 300);
    const t2 = setTimeout(() => setPhase("morph"), 1500);
    const t3 = setTimeout(() => setPhase("done"), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isMobile]);

  useEffect(() => {
    if (phase === "morph" || phase === "done") {
      document.documentElement.classList.add("hero-revealed");
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{
        background: phase === "morph" ? "transparent" : "#0a0c0c",
        transition: "background .6s ease-out",
      }}
    >
      {!isMobile && (
        <div
          className="absolute font-serif text-white leading-none"
          style={{
            left: phase === "morph" ? "20px" : "50%",
            top: phase === "morph" ? "16px" : "50%",
            transform:
              phase === "logo"
                ? "translate(-50%, -50%) scale(1)"
                : phase === "morph"
                ? "translate(0, 0) scale(0.233)"
                : "translate(-50%, -50%) scale(0.6)",
            transformOrigin: "left top",
            fontSize: "120px",
            opacity: phase === "black" ? 0 : 1,
            transition:
              "opacity .6s ease-out, transform .9s cubic-bezier(.7,0,.2,1), top .9s cubic-bezier(.7,0,.2,1), left .9s cubic-bezier(.7,0,.2,1)",
          }}
        >
          N3
        </div>
      )}
    </div>
  );
}
