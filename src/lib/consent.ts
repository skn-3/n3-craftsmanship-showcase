/**
 * Samtyckesstate för cookies (GDPR). Lagras i localStorage.
 * Events: "n3-consent-changed" (efter val), "n3-open-consent" (öppna bannern igen).
 */
export type Consent = {
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

const KEY = "n3-consent-v1";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean, marketing: boolean) {
  const consent: Consent = { analytics, marketing, ts: Date.now() };
  try {
    localStorage.setItem(KEY, JSON.stringify(consent));
  } catch {
    /* privat läge utan storage — valet gäller sessionen ut */
  }
  window.dispatchEvent(new CustomEvent("n3-consent-changed", { detail: consent }));
  return consent;
}

export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent("n3-open-consent"));
}
