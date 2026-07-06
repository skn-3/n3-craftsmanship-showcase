import { useEffect, useRef, useState } from "react";

/**
 * ScrollBuildSequence — N3 SmartKlimat
 * ------------------------------------------------------------------
 * Scroll-scrubbad 3D-byggsekvens (hus → badrum → kök) direkt under
 * hero:n — full-bleed och pinnad på ALLA enheter (Lodra-metoden).
 * Desktop scrubbar 16:9-mastern, mobil en dedikerad 4:5-fil med
 * fastexterna nere vid tummen.
 *
 * Scrubbning styr video.currentTime via scrollen — ingen uppspelning,
 * ingen autoplay-policy inblandad. Fungerar därför även i iOS
 * Lågenergiläge, till skillnad från autoplay-loopar.
 *
 * SSR-säker (TanStack Start): sektionen renderas identiskt på server
 * och klient (video utan src); rätt fil och poster väljs efter mount.
 *
 * Kräver i /public/videos/:
 *   n3-build-scrub.mp4          (desktop 16:9, all-intra: ffmpeg -g 1)
 *   n3-build-scrub-mobile.mp4   (mobil 4:5 720x900, all-intra)
 *   n3-build-poster.jpg         (posterframe 16:9)
 *   n3-build-poster-mobile.jpg  (posterframe 4:5)
 *
 * VIKTIGT: html/body måste ha overflow-x: clip (INTE hidden),
 * annars slutar position: sticky att fungera. (Verifierat i styles.css.)
 */

const PHASES = [
  {
    no: "01",
    label: "Huset",
    heading: "Från grund till nock",
    body: "Stomme, tak och fasad — vi bygger hela hem med precision i varje moment.",
  },
  {
    no: "02",
    label: "Badrummet",
    heading: "Precision i varje fog",
    body: "Tätskikt, kakel och inredning som håller i trettio år.",
  },
  {
    no: "03",
    label: "Köket",
    heading: "Hjärtat får ta plats",
    body: "Skräddarsytt ner till sista lucka — där livet händer.",
  },
] as const;

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const SCRUB_DESKTOP = "/videos/n3-build-scrub.mp4";
const SCRUB_MOBILE = "/videos/n3-build-scrub-mobile.mp4";
const POSTER = "/videos/n3-build-poster.jpg";
const POSTER_MOBILE = "/videos/n3-build-poster-mobile.jpg";
const FPS = 24; // matchar pipelinens utfil (veo levererar 24 fps)
const SMOOTH = 6.0; // lerp-hastighet; lägre = tyngre, mjukare känsla

const ScrollBuildSequence = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const [phase, setPhase] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  // SSR-säkert: avgörs efter mount så server + klient renderar lika.
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrubSrc, setScrubSrc] = useState<string | null>(null);
  const [posterSrc, setPosterSrc] = useState(POSTER);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (!window.matchMedia("(min-width: 768px)").matches) {
      setPosterSrc(POSTER_MOBILE);
    }
    setMounted(true);
  }, []);

  /* Lazy-load: rätt scrubfil väljs och börjar hämtas ~1,5 viewport innan */
  useEffect(() => {
    if (!mounted || reducedMotion || scrubSrc) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setScrubSrc(
            window.matchMedia("(min-width: 768px)").matches
              ? SCRUB_DESKTOP
              : SCRUB_MOBILE,
          );
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, reducedMotion, scrubSrc]);

  /* Scroll-scrub-loopen — samma motor på alla enheter */
  useEffect(() => {
    if (!mounted || reducedMotion) return;
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    let raf = 0;
    let lastPhase = 0;
    let lastTime = performance.now();

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      target.current = Math.min(1, Math.max(0, -rect.top / total));
      if (target.current > 0.02) setHasScrolled(true);
    };

    const tick = (now: number) => {
      // dt-korrigerad lerp: samma mjukhet oavsett skärmens Hz
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const k = 1 - Math.exp(-SMOOTH * dt);
      const next = current.current + (target.current - current.current) * k;
      current.current = next;

      // Scrubba videon — kvantiserat till framegrid, fastSeek där det finns
      if (video.duration) {
        const t = Math.min(
          video.duration - 1 / FPS,
          Math.round(next * video.duration * FPS) / FPS,
        );
        if (Math.abs(video.currentTime - t) >= 1 / (2 * FPS)) {
          if (typeof video.fastSeek === "function") {
            video.fastSeek(t); // all-intra ⇒ varje frame är seekpunkt
          } else {
            video.currentTime = t;
          }
        }
      }

      // Progress-rail direkt via ref — ingen React-render per frame
      if (railRef.current) {
        railRef.current.style.transform = `scaleY(${next})`;
      }

      // Fasbyte — setState endast när fasen faktiskt ändras
      const p = Math.min(PHASES.length - 1, Math.floor(next * PHASES.length));
      if (p !== lastPhase) {
        lastPhase = p;
        setPhase(p);
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mounted, reducedMotion]);

  /* -------- Reduced motion: statiskt kort + stegen som lista -------- */
  if (mounted && reducedMotion) {
    return (
      <section className="bg-[#F5F2ED] px-4 py-24" aria-label="Så bygger vi">
        <div className="mx-auto max-w-xl">
          <span className="inline-block rounded-full border border-[#1A1F1E]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1A1F1E]/60">
            Så bygger vi
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1A1F1E]">
            Hus, badrum, kök —<br />steg för steg
          </h2>
          <div className="mt-8 rounded-[2rem] bg-[#1A1F1E]/5 p-1.5 ring-1 ring-black/5">
            <div className="overflow-hidden rounded-[calc(2rem-0.375rem)]">
              <img
                src={posterSrc}
                alt="3D-visualisering: hus, badrum och kök som byggs steg för steg"
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          </div>
          <ul className="mt-10 space-y-6">
            {PHASES.map((p) => (
              <li key={p.no} className="flex gap-4">
                <span className="font-serif text-2xl leading-none text-[#C4A97D]">{p.no}</span>
                <div>
                  <h3 className="text-base font-medium text-[#1A1F1E]">{p.heading}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#1A1F1E]/60">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  /* ---------- Full-bleed scroll-scrub — alla enheter ---------- */
  return (
    <section ref={wrapRef} className="relative h-[500vh]" aria-label="Så bygger vi">
      <div className="sticky top-0 min-h-[100dvh] overflow-hidden bg-[#F5F2ED]">
        {/* Videon — fyller hela viewporten; src och format sätts efter mount */}
        <video
          ref={videoRef}
          src={scrubSrc ?? undefined}
          poster={posterSrc}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Läsbarhets-gradient: nerifrån på mobil, från vänster på desktop */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] md:hidden"
          style={{
            background:
              "linear-gradient(0deg, rgba(245,242,237,0.95) 0%, rgba(245,242,237,0.6) 50%, rgba(245,242,237,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[46%] md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(245,242,237,0.92) 0%, rgba(245,242,237,0.55) 55%, rgba(245,242,237,0) 100%)",
          }}
        />

        {/* Fastext — vid tummen på mobil, vänster-centrerad på desktop */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-28 md:inset-y-0 md:bottom-auto md:left-0 md:flex md:w-full md:max-w-xl md:items-center md:px-20 md:pb-0">
          <div className="relative h-40 w-full md:h-56">
            {PHASES.map((p, i) => (
              <div
                key={p.no}
                className="absolute inset-0"
                aria-hidden={phase !== i}
                style={{
                  opacity: phase === i ? 1 : 0,
                  transform: phase === i ? "translateY(0px)" : "translateY(14px)",
                  transition: `opacity 0.55s ${EASE}, transform 0.55s ${EASE}`,
                  pointerEvents: "none",
                }}
              >
                <span className="inline-block rounded-full border border-[#1A1F1E]/10 bg-white/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1A1F1E]/70 backdrop-blur-sm">
                  {p.no} — {p.label}
                </span>
                <h2 className="mt-4 font-serif text-[28px] leading-[1.1] text-[#1A1F1E] md:mt-5 md:text-5xl">
                  {p.heading}
                </h2>
                <p className="mt-3 max-w-[85%] text-sm leading-relaxed text-[#1A1F1E]/70 md:mt-4 md:max-w-sm md:text-base">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress-rail höger */}
        <div className="absolute right-5 top-1/2 h-28 w-px -translate-y-1/2 bg-[#1A1F1E]/10 md:h-40 lg:right-12">
          <div
            ref={railRef}
            className="h-full w-full origin-top bg-[#C4A97D]"
            style={{ transform: "scaleY(0)", willChange: "transform" }}
          />
        </div>

        {/* Fasräknare — ovanför mobilens CTA-bar */}
        <div className="absolute bottom-28 right-5 font-serif text-sm tracking-widest text-[#1A1F1E]/50 md:bottom-10 lg:right-12">
          {PHASES[phase].no}
          <span className="mx-1 text-[#1A1F1E]/25">/</span>03
        </div>

        {/* Scroll-hint — endast desktop */}
        <div
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-[#1A1F1E]/40 md:block"
          style={{
            opacity: hasScrolled ? 0 : 1,
            transition: `opacity 0.8s ${EASE}`,
          }}
        >
          Scrolla
        </div>
      </div>
    </section>
  );
};

export default ScrollBuildSequence;
