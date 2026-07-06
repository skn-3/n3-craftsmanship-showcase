import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

/**
 * ScrollBuildSequence — N3 SmartKlimat
 * ------------------------------------------------------------------
 * Scroll-scrubbad 3D-byggsekvens (hus → badrum → kök) direkt under
 * hero:n. Desktop scrubbar en all-intra-kodad video mot scroll-
 * positionen (Lodra-metoden); mobil får en lätt autoplay-loop.
 *
 * SSR-säker (TanStack Start): server + första klient-renderingen
 * visar poster-varianten; efter mount väljs scrub (desktop) eller
 * loop (mobil). Ingen hydration mismatch.
 *
 * Smoothness:
 *  - dt-korrigerad exponentiell lerp → identisk känsla på 60/120/144 Hz
 *  - fastSeek + kvantisering till 30 fps-grid → minimal seek-churn
 *  - scrub-videon lazy-laddas ~1,5 viewport innan sektionen nås
 *  - mobil-loopen lazy-mountas ~1 viewport innan (sparar data + jank)
 *
 * Kräver i /public/videos/:
 *   n3-build-scrub.mp4   (desktop, all-intra: ffmpeg -g 1)
 *   n3-build-loop.mp4    (mobil, 4:5-porträtt 864x1080)
 *   n3-build-poster.jpg  (posterframe 16:9, desktop)
 *   n3-build-poster-mobile.jpg (posterframe 4:5, mobil)
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
const SCRUB_SRC = "/videos/n3-build-scrub.mp4";
const LOOP_SRC = "/videos/n3-build-loop.mp4";
const POSTER = "/videos/n3-build-poster.jpg";
const POSTER_MOBILE = "/videos/n3-build-poster-mobile.jpg";
const FPS = 24; // matchar pipelinens utfil (veo levererar 24 fps)
const SMOOTH = 6.5; // lerp-hastighet; lägre = tyngre, mjukare känsla

const ScrollBuildSequence = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const [phase, setPhase] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  // SSR-säkert: avgörs efter mount så server + klient renderar lika.
  const [mounted, setMounted] = useState(false);
  const [scrubEnabled, setScrubEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrubSrc, setScrubSrc] = useState<string | null>(null);
  const [loopReady, setLoopReady] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(rm);
    setScrubEnabled(window.matchMedia("(min-width: 768px)").matches && !rm);
    setMounted(true);
  }, []);

  /* Desktop: lazy-load av scrub-videon ~1,5 viewport innan sektionen */
  useEffect(() => {
    if (!scrubEnabled || scrubSrc) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setScrubSrc(SCRUB_SRC);
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [scrubEnabled, scrubSrc]);

  /* Mobil: lazy-mounta loop-videon ~1 viewport innan sektionen */
  useEffect(() => {
    if (!mounted || scrubEnabled || loopReady) return;
    const el = mobileRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoopReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, scrubEnabled, loopReady]);

  /* Scroll-scrub-loopen */
  useEffect(() => {
    if (!scrubEnabled) return;
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
  }, [scrubEnabled]);

  /* ---------- Mobil / reduced motion / SSR: lätt loop-variant ---------- */
  if (!scrubEnabled) {
    return (
      <section
        ref={mobileRef}
        className="bg-[#F5F2ED] px-4 py-24"
        aria-label="Så bygger vi"
      >
        <div className="mx-auto max-w-xl">
          <Reveal variant="up">
            <span className="inline-block rounded-full border border-[#1A1F1E]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1A1F1E]/60">
              Så bygger vi
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1A1F1E]">
              Hus, badrum, kök —<br />steg för steg
            </h2>
          </Reveal>

          {/* Double-bezel-ram runt loop-videon */}
          <Reveal variant="up" delay={0.12}>
            <div className="mt-8 rounded-[2rem] bg-[#1A1F1E]/5 p-1.5 ring-1 ring-black/5">
              <div className="aspect-[4/5] overflow-hidden rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                {loopReady && !reducedMotion ? (
                  <video
                    src={LOOP_SRC}
                    poster={POSTER_MOBILE}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="block h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={POSTER_MOBILE}
                    alt="3D-visualisering: hus, badrum och kök som byggs steg för steg"
                    className="block h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </Reveal>

          <ul className="mt-10 space-y-6">
            {PHASES.map((p, i) => (
              <li key={p.no}>
                <Reveal variant="up" delay={0.15 + i * 0.1}>
                  <div className="flex gap-4">
                    <span className="font-serif text-2xl leading-none text-[#C4A97D]">
                      {p.no}
                    </span>
                    <div>
                      <h3 className="text-base font-medium text-[#1A1F1E]">
                        {p.heading}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#1A1F1E]/60">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  /* ---------------- Desktop: scroll-scrub ---------------- */
  return (
    <section ref={wrapRef} className="relative h-[340vh]" aria-label="Så bygger vi">
      <div className="sticky top-0 min-h-[100dvh] overflow-hidden">
        {/* Videon — fyller hela viewporten; src sätts först nära viewport */}
        <video
          ref={videoRef}
          src={scrubSrc ?? undefined}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Mjuk läsbarhets-gradient vänster */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[46%]"
          style={{
            background:
              "linear-gradient(90deg, rgba(245,242,237,0.92) 0%, rgba(245,242,237,0.55) 55%, rgba(245,242,237,0) 100%)",
          }}
        />

        {/* Fastext — crossfade per fas */}
        <div className="absolute inset-y-0 left-0 flex w-full max-w-xl items-center px-10 lg:px-20">
          <div className="relative h-56 w-full">
            {PHASES.map((p, i) => (
              <div
                key={p.no}
                className="absolute inset-0"
                aria-hidden={phase !== i}
                style={{
                  opacity: phase === i ? 1 : 0,
                  transform:
                    phase === i ? "translateY(0px)" : "translateY(14px)",
                  transition: `opacity 0.55s ${EASE}, transform 0.55s ${EASE}`,
                  pointerEvents: "none",
                }}
              >
                <span className="inline-block rounded-full border border-[#1A1F1E]/10 bg-white/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1A1F1E]/70 backdrop-blur-sm">
                  {p.no} — {p.label}
                </span>
                <h2 className="mt-5 font-serif text-4xl leading-[1.1] text-[#1A1F1E] lg:text-5xl">
                  {p.heading}
                </h2>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-[#1A1F1E]/65">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress-rail höger */}
        <div className="absolute right-8 top-1/2 h-40 w-px -translate-y-1/2 bg-[#1A1F1E]/10 lg:right-12">
          <div
            ref={railRef}
            className="h-full w-full origin-top bg-[#C4A97D]"
            style={{ transform: "scaleY(0)", willChange: "transform" }}
          />
        </div>

        {/* Fasräknare */}
        <div className="absolute bottom-10 right-8 font-serif text-sm tracking-widest text-[#1A1F1E]/50 lg:right-12">
          {PHASES[phase].no}
          <span className="mx-1 text-[#1A1F1E]/25">/</span>03
        </div>

        {/* Scroll-hint — tonar bort efter första scroll */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-[#1A1F1E]/40"
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
