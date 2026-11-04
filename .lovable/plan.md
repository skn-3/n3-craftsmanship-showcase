Felsökning offertformuläret (ingen kod ändrad)

1. Secrets: bara LOVABLE_API_KEY. RESEND_API_KEY saknas helt.
2. Resend-connectorn "Smartklimat.org" finns i workspace men är inte länkad till projektet. RESEND_API_KEY finns inte, varken från connectorn eller inlagd för hand.
3. Inga serverloggar för sendQuoteRequest den senaste timmen (live). Troligt fel enligt koden: "RESEND_API_KEY saknas". Ej bekräftat i logg.
4. Senaste commit lokalt: 36d0584 (garanti 10 → 5 år). Jag kan inte läsa vilken commit som är publicerad. Att live visar "10 års garanti" tyder på att publiceringen är äldre än 36d0584 och saknar t.ex. garantirättningen (och möjligen 29e0b39, spårning/cookiebanner).
5. n3prenad.se (primär) och www.n3prenad.se är kopplade och aktiva på den här Lovable-publiceringen.

Förslag på åtgärd (om godkänt):
- Länka Resend-connectorn och skriv om send-quote.ts att gå via connector-gatewayn (koden anropar idag api.resend.com direkt, vilket inte fungerar med connectorns nyckel).
- Testa formuläret i preview och publicera sedan om.
