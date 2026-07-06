import sTotal from "@/assets/s-total.webp";
import sBath from "@/assets/s-bath.webp";
import sKitchen from "@/assets/s-kitchen.webp";
import sRoof from "@/assets/s-roof.webp";
import sFacade from "@/assets/s-facade.webp";
import sTerrace from "@/assets/s-terrace.webp";
import sExtension from "@/assets/s-extension.webp";
import sPainting from "@/assets/s-painting.webp";
import sInterior from "@/assets/s-interior.webp";
import villa from "@/assets/villa-saltsjobad-n3.webp";
import baKitchenAfter from "@/assets/ba-kitchen-after.webp";
import baBathAfter from "@/assets/ba-bath-after.webp";
import baFacadeAfter from "@/assets/ba-facade-after.webp";
import nTotal1 from "@/assets/n3-total-renovering1.webp";
import nTotal2 from "@/assets/n3-total-renovering2.webp";
import nTotal3 from "@/assets/n3-total-renovering3.webp";
import nBadDusch1 from "@/assets/n3-badrum-dusch-1.webp";
import nBadDusch2 from "@/assets/n3-badrum-dusch-2.webp";
import nBad3 from "@/assets/n3-badrum-3.webp";
import nBad4 from "@/assets/n3-badrum-4.webp";
import nKok1 from "@/assets/n3-kok-1.webp";
import nTak1 from "@/assets/n3-tak-1.webp";
import nTak2 from "@/assets/n3-tak-2.webp";
import nTak3 from "@/assets/n3-tak-3.webp";
import nFasad1 from "@/assets/n3-fasad-1.webp";
import nAltan1 from "@/assets/n3-altan-1.webp";
import nAltan2 from "@/assets/n3-altan-2.webp";
import nAltan3 from "@/assets/n3-altan-3.webp";
import nUtbyggnad1 from "@/assets/n3-utbyggnad-1.webp";
import nMalning1 from "@/assets/n3-malning-1.webp";
import nMalning2 from "@/assets/n3-malning-2.webp";
import nMalning3 from "@/assets/n3-malning-3.webp";
import nInredning1 from "@/assets/n3-inredning-1.webp";
import nInredning2 from "@/assets/n3-inredning-2.webp";
import nInredning3 from "@/assets/n3-inredning-3.webp";
import pSandberg2 from "@/assets/projekt-sandberg-2.webp";
import pSandberg3 from "@/assets/projekt-sandberg-3.webp";
import pBromma2 from "@/assets/projekt-bromma-2.webp";
import pNacka2 from "@/assets/projekt-nacka-2.webp";
import pTaby2 from "@/assets/projekt-taby-2.webp";
import pDjursholm2 from "@/assets/projekt-djursholm-2.webp";
import pSodermalm2 from "@/assets/projekt-sodermalm-2.webp";

export type ServiceScopeItem = { title: string; desc: string };
export type ServiceProcessStep = { title: string; desc: string };

export type Service = {
  slug: string;
  name: string;
  desc: string;
  img: string;
  long?: string;
  highlights?: string[];
  intro?: string;
  scope?: ServiceScopeItem[];
  process?: ServiceProcessStep[];
  gallery?: string[];
  price?: string;
};

export const services: Service[] = [
  {
    slug: "totalrenovering",
    name: "Totalrenovering",
    desc: "Komplett förvandling av ditt hem, från golv till tak.",
    img: sTotal,
    long: "Vi tar hand om hela renoveringen — rivning, stomme, el, VVS, ytskikt och inredning. En projektledare, ett team, ett ansvar.",
    highlights: ["Egen projektledare", "Fast pris och tidplan", "5 års garanti på arbetet"],
  },
  {
    slug: "badrum",
    name: "Badrum",
    desc: "Badrum byggda rätt från tätskiktet och ut.",
    img: sBath,
    long: "BKR-auktoriserad badrumsrenovering. Tätskikt enligt branschregler, material ni valt själva och ett våtrumsintyg när vi är klara.",
    highlights: ["BKR-auktoriserade", "Våtrumsintyg ingår", "Egen plattläggare"],
  },
  {
    slug: "kok",
    name: "Kök",
    desc: "Platsbyggda kök ritade efter hur ni faktiskt lagar mat.",
    img: sKitchen,
    long: "Platsbyggda kök med stenbänkskiva och ljus där det behövs. Vi ritar, bygger och monterar själva.",
    highlights: ["Platsbyggda luckor", "Stenbänkskivor", "Smart förvaring"],
  },
  {
    slug: "tak",
    name: "Tak",
    desc: "Takbyten och takrenovering med kvalitetsmaterial.",
    img: sRoof,
    long: "Vi byter och lägger tak i tegel, plåt och papp. Rätt utfört ska det hålla i femtio år, och det är så vi bygger.",
    highlights: ["ROT-avdrag ordnas", "Säkerhetsutbildat team", "Försäkringssamarbete"],
  },
  {
    slug: "fasad",
    name: "Fasad",
    desc: "Fasadrenovering som ger ditt hem nytt liv.",
    img: sFacade,
    long: "Vi renoverar putsade fasader, träfasader och tegel med teknik som passar husets ålder och dagens energikrav.",
    highlights: ["Tilläggsisolering", "Färgsättning ingår", "Ställning vi sätter själva"],
  },
  {
    slug: "altan-terrass",
    name: "Altan & Terrass",
    desc: "Uterum och altaner byggda för skandinaviskt klimat.",
    img: sTerrace,
    long: "Altaner i IPE, lärk eller komposit, med belysning i trappstegen och glasräcke om utsikten förtjänar det.",
    highlights: ["IPE & lärk", "Inbyggd LED", "Glasräcken"],
  },
  {
    slug: "tillbyggnad",
    name: "Tillbyggnad",
    desc: "Mer yta som ser ut att alltid ha funnits där.",
    img: sExtension,
    long: "Från bygglov till nyckelfärdig tillbyggnad. Vi sköter ritningar, myndighetskontakter och bygget.",
    highlights: ["Bygglovshjälp", "Konstruktör i teamet", "Energiberäkning"],
  },
  {
    slug: "malning-tapetsering",
    name: "Målning & Tapetsering",
    desc: "Professionell målning och tapetsering som ger rummet ny karaktär.",
    img: sPainting,
    long: "Vi målar med allt från linoljefärg till lerputs, och tapetserar både klassiskt och modernt.",
    highlights: ["Erfarna målare", "Miljövänliga färger", "Snabba leveranser"],
  },
  {
    slug: "inredning",
    name: "Inredning",
    desc: "Hjälp att välja färg, material och ljus när allt annat är på plats.",
    img: sInterior,
    long: "Vår inredare hjälper er välja färger, material och belysning så att helheten blir er, inte en katalogbild.",
    highlights: ["3D-visualisering", "Materialprover", "Inköpshjälp"],
  },
];

export type ProjectStats = { duration: string; area: string; type: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  img: string;
  summary: string;
  description: string;
  stats: ProjectStats;
  scope: string[];
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "villa-sandberg",
    title: "Villa Sandberg",
    category: "Altan & Terrass",
    location: "Saltsjöbaden",
    year: "2025",
    img: villa,
    summary:
      "Komplett terrasslösning i IPE-trä med inbyggda sittbänkar, integrerad LED-belysning och glasräcke mot sjöutsikten.",
    description:
      "En komplett terrasslösning i IPE-trä med inbyggda sittbänkar, integrerad LED-belysning i trappstegen och glasräcke mot sjöutsikten. Projektet inkluderade markarbete, dränering och en pergola med segelduk för sommardagarna.",
    stats: { duration: "6 veckor", area: "48 kvm", type: "Altan & Terrass" },
    scope: ["Markarbete & dränering", "IPE-däck 48 kvm", "Inbyggd LED-belysning", "Glasräcke", "Pergola med segelduk"],
    gallery: [pSandberg2, pSandberg3],
  },
  {
    slug: "kok-bromma",
    title: "Köksrenovering Bromma",
    category: "Kök",
    location: "Bromma",
    year: "2024",
    img: baKitchenAfter,
    summary: "Ett 70-talskök förvandlat till ett ljust, platsbyggt kök i ek med stenbänkskiva.",
    description:
      "Totalrenovering av ett 80-talskök i Bromma. Nya skåpluckor i greige, marmor-look komposit bänkskiva, mässingsblandare och fiskbensparkett i ek. Köket öppnades upp mot vardagsrummet för en luftigare planlösning.",
    stats: { duration: "5 veckor", area: "22 kvm", type: "Kök" },
    scope: ["Platsbyggda luckor", "Stenbänkskiva", "Integrerad belysning", "Ny el och VVS"],
    gallery: [pBromma2],
  },
  {
    slug: "badrum-nacka",
    title: "Badrumsrenovering Nacka",
    category: "Badrum",
    location: "Nacka",
    year: "2024",
    img: baBathAfter,
    summary: "Ett spa-likt badrum i marmor och borstad mässing — våtrumssäkrat enligt BKR.",
    description:
      "Komplett badrumsrenovering i en villa i Nacka. Storformat gråbeige klinker, floating ek-kommod med stenbänkskiva, walk-in dusch med takdusch i mässing, och handdukstork. Nya tätskikt enligt branschstandard.",
    stats: { duration: "4 veckor", area: "9 kvm", type: "Badrum" },
    scope: ["Tätskikt enligt BKR", "Storformat klinker", "Walk-in dusch", "Golvvärme"],
    gallery: [pNacka2],
  },
  {
    slug: "fasad-taby",
    title: "Fasadrenovering Täby",
    category: "Fasad",
    location: "Täby",
    year: "2024",
    img: baFacadeAfter,
    summary: "Putsad fasad med tilläggsisolering, ny färgsättning och nya fönsterbleck.",
    description:
      "Total fasadförvandling av en 70-tals tegelvilla i Täby. Ny vertikal träpanel i mörkbetsad ceder på övervåningen, putsad och vitmålad sockel, nya svartlackerade fönster och nyanlagd trädgård med grusvägar.",
    stats: { duration: "8 veckor", area: "160 kvm fasad", type: "Fasad" },
    scope: ["Vertikal cederpanel", "Putsad sockel", "Nya fönster", "Trädgårdsanläggning"],
    gallery: [pTaby2],
  },
  {
    slug: "tillbyggnad-djursholm",
    title: "Tillbyggnad Djursholm",
    category: "Tillbyggnad",
    location: "Djursholm",
    year: "2024",
    img: sExtension,
    summary: "Modern glasvolym till klassisk träpanelvilla — matsal och vardagsrum med trädgårdsutblick.",
    description:
      "Modern tillbyggnad på en klassisk vit träpanelvilla i Djursholm. Ny glasvolym med grönt tak, takfönster och golvvärme. Används som matsal och vardagsrum med direkt utblick mot trädgården.",
    stats: { duration: "12 veckor", area: "35 kvm", type: "Tillbyggnad" },
    scope: ["Bygglovshantering", "Grund & stomme", "Glasparti & takfönster", "Golvvärme"],
    gallery: [pDjursholm2],
  },
  {
    slug: "totalrenovering-sodermalm",
    title: "Totalrenovering Södermalm",
    category: "Totalrenovering",
    location: "Södermalm",
    year: "2025",
    img: sTotal,
    summary: "Sekelskifteslägenhet — bevarad karaktär kombinerad med nytt kök, badrum och slipade ekgolv.",
    description:
      "Totalrenovering av en trerumslägenhet på Södermalm. Bevarad karaktär med originalbjälklag och tegelvägg kombinerat med nytt kök, badrum och slipade ekgolv. Öppen planlösning mellan kök och vardagsrum.",
    stats: { duration: "10 veckor", area: "78 kvm", type: "Totalrenovering" },
    scope: ["Rivning & stomarbete", "El & VVS", "Kök & badrum", "Slipade ekgolv"],
    gallery: [pSodermalm2],
  },
  {
    slug: "takbyte-lidingo",
    title: "Takbyte Lidingö",
    category: "Tak",
    location: "Lidingö",
    year: "2025",
    img: nTak3,
    summary:
      "Komplett takbyte på 70-talsvilla med nytt plåttak i mörkgrå stående falsad plåt, nya hängrännor och stuprör.",
    description:
      "Komplett takbyte på en 70-talsvilla i Lidingö. Nytt stående falsad plåttak i antracitgrå, nya hängrännor och stuprör i matchande kulör. Inkluderade ny underlagspapp, ventilationshuvar och isolering av vindsutrymme.",
    stats: { duration: "3 veckor", area: "140 kvm takyta", type: "Tak" },
    scope: ["Ny underlagspapp", "Stående falsad plåt", "Hängrännor & stuprör", "Vindsisolering"],
    gallery: [nTak1, nTak2],
  },
];

type ServiceContent = Pick<Service, "intro" | "scope" | "process" | "gallery" | "price">;

const serviceContent: Record<string, ServiceContent> = {
  totalrenovering: {
    intro:
      "En totalrenovering är mer än att byta material — det handlar om att skapa ett hem som passar ditt liv. Vi tar hand om allt: planering, rivning, el och VVS, ytskikt och slutdetaljer. Du får en fast kontaktperson som håller dig uppdaterad genom hela processen. Oavsett om det handlar om en lägenhet på Södermalm eller en villa i Djursholm anpassar vi lösningen efter dina behov och din budget.",
    scope: [
      { title: "Projektering & bygglov", desc: "Ritningar, bygganmälan och myndighetskontakter." },
      { title: "Rivning & stomarbete", desc: "Säker rivning och nya bärande konstruktioner." },
      { title: "El & VVS", desc: "Utfört av certifierade partners enligt branschregler." },
      { title: "Golvläggning & ytskikt", desc: "Trä, klinker, målning och tapetsering." },
      { title: "Kök & badrum", desc: "Komplett installation med våtrumsintyg." },
      { title: "Slutstädning & besiktning", desc: "Vi lämnar över ett färdigt hem, inflyttningsklart." },
    ],
    process: [
      { title: "Hembesök & behovsanalys", desc: "Vi besöker dig, mäter upp och förstår era önskemål." },
      { title: "Förslag & fast offert", desc: "Detaljerat upplägg med tidplan och fast pris." },
      { title: "Byggnation", desc: "Vårt team genomför arbetet med dagliga avstämningar." },
      { title: "Slutbesiktning & överlämning", desc: "Vi går igenom allt tillsammans innan nyckelöverlämning." },
    ],
    gallery: [nTotal1, nTotal2, nTotal3],
    price: "Totalrenovering av lägenhet från 8 000 kr/kvm. Villa från 12 000 kr/kvm.",
  },
  badrum: {
    intro:
      "Badrummet är hemmets mest tekniskt krävande rum — här möts vatten, el och ventilation på minimal yta. Vi har renoverat hundratals badrum i Stockholmsområdet och vet exakt vad som krävs för att resultatet ska hålla i 30+ år. Vi arbetar med tätskikt enligt branschstandard, och alla våra badrumsrenoveringar är försäkrade via Länsförsäkringar.",
    scope: [
      { title: "Rivning av befintligt badrum", desc: "Säker hantering av material och avfall." },
      { title: "Nya tätskikt", desc: "Godkänd våtrumsmetod med fullständig dokumentation." },
      { title: "Kakel & klinker", desc: "Plattsättning av certifierad plattläggare." },
      { title: "VVS & golvvärme", desc: "Modern installation med komfortvärme." },
      { title: "Belysning & el", desc: "Spotlights, spegelbelysning och säkra uttag." },
      { title: "Inredning", desc: "Kommod, dusch och badkar enligt era önskemål." },
    ],
    process: [
      { title: "Mått & materialval", desc: "Vi mäter och hjälper er välja kakel, klinker och inredning." },
      { title: "Rivning & tätskikt", desc: "Allt rivs och nya tätskikt appliceras enligt branschregler." },
      { title: "Plattsättning & installation", desc: "Kakel, VVS, el och inredning monteras." },
      { title: "Våtrumsintyg & överlämning", desc: "Ni får full dokumentation och garantier." },
    ],
    gallery: [nBadDusch1, nBadDusch2, nBad3, nBad4],
    price: "Badrumsrenovering från 120 000 kr (litet badrum) till 250 000 kr+ (stort badrum med badkar).",
  },
  kok: {
    intro:
      "Köket är hemmets hjärta. Vi designar och bygger kök som är lika funktionella som de är vackra — från kompakta lägenhetskök till stora familjekök med köksö. Vi samarbetar med ledande köksleverantörer men kan även bygga helt skräddarsydda lösningar i massivt trä.",
    scope: [
      { title: "Köksdesign & 3D-visualisering", desc: "Se ditt nya kök innan vi börjar bygga." },
      { title: "Rivning av gammalt kök", desc: "Demontering och bortforsling ingår." },
      { title: "El, vatten & avlopp", desc: "Nya dragningar av certifierade installatörer." },
      { title: "Köksluckor & stommar", desc: "Montering av platsbyggda eller standardlösningar." },
      { title: "Bänkskiva", desc: "Laminat, sten eller komposit efter önskemål." },
      { title: "Vitvaror", desc: "Installation och inkoppling av nya maskiner." },
    ],
    process: [
      { title: "Designmöte & ritning", desc: "Vi ritar köket i 3D tillsammans med er." },
      { title: "Materialval & offert", desc: "Luckor, bänkskivor och vitvaror specificeras." },
      { title: "Rivning & installation", desc: "Det gamla rivs, det nya monteras på plats." },
      { title: "Justering & överlämning", desc: "Slutkontroll, justering av luckor och genomgång." },
    ],
    gallery: [nKok1],
    price: "Köksrenovering från 80 000 kr (byte av luckor & bänkskiva) till 350 000 kr+ (komplett nytt kök).",
  },
  tak: {
    intro:
      "Taket skyddar allt du äger. Ett slitet tak leder till fuktskador, mögel och dyra reparationer. Vi byter och renoverar tak på villor och flerfamiljshus med material som håller i 40-50 år. Vi arbetar med plåt, tegel och betongpannor, och hjälper även till med takavvattning och hängrännor.",
    scope: [
      { title: "Inspektion & offert", desc: "Vi går upp på taket och dokumenterar status." },
      { title: "Rivning av gammalt tak", desc: "Säker hantering av eternit och äldre material." },
      { title: "Underlagspapp & läkt", desc: "Ny ångspärr och läktning för långsiktig täthet." },
      { title: "Nytt takmaterial", desc: "Plåt, tegel eller betong efter husets karaktär." },
      { title: "Hängrännor & stuprör", desc: "Komplett takavvattning installeras." },
      { title: "Ventilation & tilluftsdon", desc: "Korrekt ventilation för ett friskt tak." },
    ],
    process: [
      { title: "Takinspektion", desc: "Vi besöker, dokumenterar och föreslår åtgärder." },
      { title: "Materialval & offert", desc: "Ni väljer material — vi tar fram fast pris." },
      { title: "Takarbete", desc: "Rivning, ny papp och nytt takmaterial monteras." },
      { title: "Slutbesiktning", desc: "Vi går igenom allt och lämnar fullständiga garantier." },
    ],
    gallery: [nTak1, nTak2, nTak3],
    price: "Takbyte villa från 1 500 kr/kvm takyta.",
  },
  fasad: {
    intro:
      "Fasaden är det första man ser. En renoverad fasad höjer inte bara husets utseende utan också dess värde och energieffektivitet. Vi arbetar med träpanel, puts, tegelfasad och modern fasadbeklädnad. Vårt team hanterar allt från ställning till slutlig målning.",
    scope: [
      { title: "Fasadinspektion", desc: "Vi bedömer skick och ger förslag på åtgärder." },
      { title: "Ställningsmontering", desc: "Säker ställning sätts upp av eget team." },
      { title: "Byte av beklädnad eller puts", desc: "Träpanel, puts eller tegel — efter husets stil." },
      { title: "Tilläggsisolering", desc: "Sänk energikostnader och öka komforten." },
      { title: "Fönsterbänkar & detaljer", desc: "Nya bleck och anslutningar runt fönster." },
      { title: "Målning", desc: "Slutfärg som klarar nordiskt klimat i decennier." },
    ],
    process: [
      { title: "Inspektion & offert", desc: "Statusbedömning och fast pris." },
      { title: "Ställning & rivning", desc: "Vi förbereder fasaden för renovering." },
      { title: "Ny beklädnad", desc: "Puts, panel eller tegel monteras fackmannamässigt." },
      { title: "Målning & avetablering", desc: "Slutfärg och bortforsling av ställning." },
    ],
    gallery: [nFasad1],
    price: "Fasadrenovering från 2 000 kr/kvm fasadyta.",
  },
  "altan-terrass": {
    intro:
      "En välbyggd altan förlänger den svenska sommaren med veckor. Vi bygger altaner och terrasser i tryckimpregnerat trä, cederträ och komposit — alltid anpassade efter husets arkitektur och tomtens förutsättningar. Vi hjälper även med bygglov om det behövs.",
    scope: [
      { title: "Design & konstruktionsritning", desc: "Vi ritar altanen efter tomt och hus." },
      { title: "Markarbete & grund", desc: "Plintar eller betongplatta beroende på markförhållanden." },
      { title: "Stomme & golvplankor", desc: "Trä eller komposit av högsta kvalitet." },
      { title: "Räcken & trappor", desc: "Glas, trä eller smide efter önskemål." },
      { title: "Belysning", desc: "Integrerad LED för stämning och säkerhet." },
      { title: "Tak / pergola", desc: "Vid behov — för skugga och regnskydd." },
    ],
    process: [
      { title: "Platsbesök & ritning", desc: "Vi mäter tomten och tar fram förslag." },
      { title: "Materialval & offert", desc: "Trä, komposit och tillbehör specificeras." },
      { title: "Bygge", desc: "Mark, stomme, däck och räcken monteras." },
      { title: "Belysning & slutkoll", desc: "LED kopplas in och allt finjusteras." },
    ],
    gallery: [nAltan1, nAltan2, nAltan3],
    price: "Altan från 3 500 kr/kvm. Inglasad altan från 8 000 kr/kvm.",
  },
  tillbyggnad: {
    intro:
      "Ibland behöver hemmet helt enkelt mer plats. En tillbyggnad är ofta smartare och billigare än att flytta — och kan öka husets värde markant. Vi hjälper med allt från arkitektritningar och bygglov till färdig tillbyggnad med el, VVS och ytskikt.",
    scope: [
      { title: "Arkitektritning & bygglov", desc: "Vi tar fram ritningar och söker bygglov." },
      { title: "Grundläggning", desc: "Platta eller plintar dimensionerade efter mark." },
      { title: "Stomresning", desc: "Trä eller stål, monterat av erfarna byggare." },
      { title: "Tak & fasad", desc: "Anpassas i material och färg efter befintligt hus." },
      { title: "El & VVS", desc: "Nya dragningar integreras med befintligt system." },
      { title: "Invändiga ytskikt", desc: "Färdig tillbyggnad redo att använda." },
    ],
    process: [
      { title: "Skiss & bygglov", desc: "Vi tar fram förslag och hanterar myndighetskontakt." },
      { title: "Konstruktion & offert", desc: "Konstruktör räknar och vi ger fast pris." },
      { title: "Bygge", desc: "Grund, stomme, tak, fasad och installationer." },
      { title: "Slutbesiktning", desc: "Komplett genomgång och överlämning." },
    ],
    gallery: [nUtbyggnad1],
    price: "Tillbyggnad från 25 000 kr/kvm.",
  },
  "malning-tapetsering": {
    intro:
      "Färg förändrar allt. Rätt kulör och teknik kan göra ett litet rum luftigt och ett stort rum ombonat. Våra målare har erfarenhet av allt från nya lägenheter till sekelskiftespärlor med stuckaturer. Vi arbetar med miljövänliga färger och tapeter från ledande leverantörer.",
    scope: [
      { title: "Färgrådgivning", desc: "Vi hjälper er välja kulörer och material." },
      { title: "Spackling & slipning", desc: "Perfekt underlag för perfekt resultat." },
      { title: "Målning", desc: "Väggar, tak och snickerier i miljövänliga färger." },
      { title: "Tapetsering", desc: "Allt från standardtapeter till handtryck." },
      { title: "Lackning", desc: "Dörrar, lister och foder fräschas upp." },
      { title: "Fasadmålning", desc: "Utvändig målning av trä och puts." },
    ],
    process: [
      { title: "Möte & färgval", desc: "Vi går igenom önskemål och föreslår kulörer." },
      { title: "Förberedelse", desc: "Spackling, slipning och maskering." },
      { title: "Målning & tapetsering", desc: "Arbetet utförs i lugn och ordning." },
      { title: "Slutkontroll", desc: "Vi städar och går igenom resultatet med er." },
    ],
    gallery: [nMalning1, nMalning2, nMalning3],
    price: "Ommålning av lägenhet (3 rok) från 25 000 kr.",
  },
  inredning: {
    intro:
      "Vi samarbetar med inredningsarkitekter som hjälper dig att få ihop helheten — från materialval och färgsättning till möbler och textilier. Perfekt som komplement till en renovering, eller som fristående tjänst när du vill förnya utan att bygga om.",
    scope: [
      { title: "Inredningskonsultation", desc: "Hembesök och behovsanalys." },
      { title: "Moodboard & koncept", desc: "Visuellt förslag som binder ihop helheten." },
      { title: "Materialval & färgsättning", desc: "Konkreta prover och rekommendationer." },
      { title: "Möblering & textilier", desc: "Möbler, mattor och textil som passar." },
      { title: "Belysningsplanering", desc: "Allmän-, punkt- och stämningsbelysning." },
      { title: "Styling", desc: "Inför visning, foto eller bara för er själva." },
    ],
    process: [
      { title: "Hembesök", desc: "Vi besöker er och förstår stilen och behoven." },
      { title: "Koncept & moodboard", desc: "Visuellt förslag presenteras." },
      { title: "Inköp & beställning", desc: "Vi sköter beställningar och leveranser." },
      { title: "Styling & överlämning", desc: "Möbler placeras och allt arrangeras." },
    ],
    gallery: [nInredning1, nInredning2, nInredning3],
    price: "Inredningskonsultation från 2 500 kr/tillfälle.",
  },
};

for (const s of services) {
  const c = serviceContent[s.slug];
  if (c) Object.assign(s, c);
}

export const findService = (slug: string) => services.find((s) => s.slug === slug);
export const findProject = (slug: string) => projects.find((p) => p.slug === slug);

