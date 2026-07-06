/**
 * Spårningsmotor — Consent Mode v2 (basic): inga skript laddas före samtycke.
 * GA4 + Google Ads via gtag.js, Meta Pixel via fbq. Allt no-opar när ID saknas
 * eller samtycke nekats.
 */
import { GA4_ID, ADS_ID, ADS_LABEL, META_PIXEL_ID } from "./tracking-config";
import type { Consent } from "./consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
  }
}

let gtagLoaded = false;
let pixelLoaded = false;
let phoneListenerBound = false;

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Kör efter samtyckesval. Laddar/uppdaterar kanaler enligt valet. */
export function applyConsent(consent: Consent) {
  if (typeof window === "undefined") return;

  // --- Google (GA4 + Ads) ---
  if ((GA4_ID || ADS_ID) && (consent.analytics || consent.marketing)) {
    ensureGtagStub();
    if (!gtagLoaded) {
      gtagLoaded = true;
      // Consent Mode v2: default nekat, uppdatera enligt valet, sedan config.
      window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
        wait_for_update: 500,
      });
      window.gtag("js", new Date());
      loadScript(
        "https://www.googletagmanager.com/gtag/js?id=" + (GA4_ID || ADS_ID),
      );
      if (GA4_ID) window.gtag("config", GA4_ID, { send_page_view: false });
      if (ADS_ID) window.gtag("config", ADS_ID);
    }
    window.gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  }

  // --- Meta Pixel ---
  if (META_PIXEL_ID && consent.marketing && !pixelLoaded) {
    pixelLoaded = true;
    const fbq: Window["fbq"] = function fbqShim() {
      // eslint-disable-next-line prefer-rest-params
      (fbq!.queue = fbq!.queue || []).push(arguments);
    } as Window["fbq"];
    window.fbq = window.fbq || fbq;
    window._fbq = window._fbq || window.fbq;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq!("init", META_PIXEL_ID);
    window.fbq!("track", "PageView");
  }

  bindPhoneTracking();
}

/** Sidvisning vid klientnavigering (SSR ger första; router ger resten). */
export function trackPageview(path: string) {
  if (typeof window === "undefined") return;
  if (GA4_ID && gtagLoaded) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.origin + path,
    });
  }
  if (pixelLoaded && window.fbq) window.fbq("track", "PageView");
}

/** Lead-konvertering (offertformuläret skickat). eventId deduper webb + CAPI. */
export function trackLead(eventId: string) {
  if (typeof window === "undefined") return;
  if (gtagLoaded) {
    window.gtag("event", "generate_lead", { transaction_id: eventId });
    if (ADS_ID && ADS_LABEL) {
      window.gtag("event", "conversion", {
        send_to: ADS_ID + "/" + ADS_LABEL,
        transaction_id: eventId,
      });
    }
  }
  if (pixelLoaded && window.fbq) {
    window.fbq("track", "Lead", {}, { eventID: eventId });
  }
}

/** Telefonklick — delegation på alla tel:-länkar, en gång. */
function bindPhoneTracking() {
  if (phoneListenerBound || typeof window === "undefined") return;
  phoneListenerBound = true;
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"]');
      if (!a) return;
      if (gtagLoaded) window.gtag("event", "phone_call_click");
      if (pixelLoaded && window.fbq) window.fbq("trackCustom", "PhoneClick");
    },
    { capture: true, passive: true },
  );
}
