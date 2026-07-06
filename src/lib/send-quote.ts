import { createServerFn } from "@tanstack/react-start";
import { META_PIXEL_ID } from "./tracking-config";

/**
 * Skickar offertförfrågan via Resend (send.smartklimat.org).
 * Kräver RESEND_API_KEY som secret i deploy-miljön (Lovable → Settings → Secrets).
 * Körs enbart på servern — nyckeln når aldrig klienten.
 */

export type QuotePayload = {
  namn: string;
  email: string;
  telefon: string;
  typ: string;
  adress?: string;
  budget?: string;
  start?: string;
  meddelande?: string;
  bilder?: string;
  eventId?: string;
  marketingConsent?: boolean;
};

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const REQUIRED = ["namn", "email", "telefon", "typ"] as const;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const sendQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((data: QuotePayload) => {
    if (!data || typeof data !== "object") throw new Error("Ogiltig förfrågan");
    for (const f of REQUIRED) {
      if (!data[f] || typeof data[f] !== "string" || !data[f].trim()) {
        throw new Error(`Fältet ${f} saknas`);
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("Ogiltig e-postadress");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("Mailtjänsten är inte konfigurerad (RESEND_API_KEY saknas)");
    }

    const rows: Array<[string, string | undefined]> = [
      ["Namn", data.namn],
      ["E-post", data.email],
      ["Telefon", data.telefon],
      ["Typ av projekt", data.typ],
      ["Adress", data.adress],
      ["Budget", data.budget],
      ["Önskad start", data.start],
      ["Bifogade bilder (filnamn)", data.bilder],
    ];

    const table = rows
      .filter(([, v]) => v && v.trim())
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#888;font-size:13px;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#1A1F1E;font-size:14px">${esc(v as string)}</td></tr>`,
      )
      .join("");

    const message = data.meddelande?.trim()
      ? `<p style="margin:20px 0 6px;color:#888;font-size:13px">Beskrivning</p><p style="margin:0;color:#1A1F1E;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(data.meddelande)}</p>`
      : "";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "N3 Offertförfrågan <no-reply@send.smartklimat.org>",
        to: ["n3prenad@smartklimat.org"],
        reply_to: data.email,
        subject: `Offertförfrågan: ${data.typ} — ${data.namn}`,
        html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px"><h2 style="color:#1A1F1E;font-size:18px;margin:0 0 16px">Ny offertförfrågan via n3prenad.se</h2><table style="border-collapse:collapse">${table}</table>${message}<p style="margin:28px 0 0;color:#aaa;font-size:12px">Svara direkt på det här mejlet så når du kunden (${esc(data.email)}).</p></div>`,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Resend svarade ${res.status}: ${body.slice(0, 200)}`);
    }

    // Meta Conversions API — endast med marknadsföringssamtycke.
    // Fel här får ALDRIG fälla leadet; mejlet är redan skickat.
    const capiToken = process.env.META_CAPI_TOKEN;
    if (data.marketingConsent && data.eventId && META_PIXEL_ID && capiToken) {
      try {
        const em = await sha256Hex(data.email.trim().toLowerCase());
        await fetch(
          `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${capiToken}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: [
                {
                  event_name: "Lead",
                  event_time: Math.floor(Date.now() / 1000),
                  action_source: "website",
                  event_id: data.eventId,
                  event_source_url: "https://n3prenad.se/kontakt",
                  user_data: { em: [em] },
                },
              ],
            }),
          },
        );
      } catch {
        /* CAPI-fel ignoreras medvetet */
      }
    }

    return { ok: true as const };
  });
