import { useEffect, useState } from "react";

const KEY = "n3-loaded";

export function LoadingScreen() {
  const [phase, setPhase] = useState<"in" | "line" | "out" | "done">("in");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY) || window.location.pathname === "/") {
      setPhase("done");
      sessionStorage.setItem(KEY, "1");
      return;
    }
    const t1 = setTimeout(() => setPhase("line"), 250);
    const t2 = setTimeout(() => setPhase("out"), 250 + 800);
    const t3 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem(KEY, "1");
    }, 250 + 800 + 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center"
      style={{
        transform: phase === "out" ? "translateY(-100%)" : "translateY(0)",
        transition: "transform .6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="font-serif text-[var(--kol)] leading-none" style={{ fontSize: 72 }}>
        N3
      </div>
      <div className="mt-4 h-px bg-[var(--kol)] origin-left"
        style={{
          width: 96,
          transform: `scaleX(${phase === "in" ? 0 : 1})`,
          transition: "transform .8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
