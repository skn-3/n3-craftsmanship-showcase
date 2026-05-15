import sTotal from "@/assets/s-total.png";
import sBath from "@/assets/s-bath.png";
import sKitchen from "@/assets/s-kitchen.png";
import sRoof from "@/assets/s-roof.png";
import sFacade from "@/assets/s-facade.png";
import sTerrace from "@/assets/s-terrace.png";
import sExtension from "@/assets/s-extension.png";
import sPainting from "@/assets/s-painting.png";
import sInterior from "@/assets/s-interior.jpg";
import villa from "@/assets/villa-saltsjobad-n3.png";
import baKitchenAfter from "@/assets/ba-kitchen-after.png";
import baBathAfter from "@/assets/ba-bath-after.png";
import baFacadeAfter from "@/assets/ba-facade-after.png";

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
    highlights: ["Egen projektledare", "Fast pris och tidplan", "10 års garanti på arbetet"],
  },
  {
    slug: "badrum",
    name: "Badrum",
    desc: "Lyxiga badrum med känsla för material och funktion.",
    img: sBath,
    long: "BKR-auktoriserade badrumsrenoveringar med våtrumssäkrade lösningar och materialval i världsklass.",
    highlights: ["BKR-auktoriserade", "Våtrumsintyg ingår", "Egen plattläggare"],
  },
  {
    slug: "kok",
    name: "Kök",
    desc: "Skräddarsydda kök där design möter vardagsliv.",
    img: sKitchen,
    long: "Vi designar och bygger kök som håller — platsbyggda lösningar, stenbänkskivor och integrerad belysning.",
    highlights: ["Platsbyggda luckor", "Stenbänkskivor", "Smart förvaring"],
  },
  {
    slug: "tak",
    name: "Tak",
    desc: "Takbyten och takrenovering med kvalitetsmaterial.",
    img: sRoof,
    long: "Tegel, plåt eller papp — vi byter och renoverar tak med fokus på täthet och hållbarhet i 50+ år.",
    highlights: ["ROT-avdrag ordnas", "Säkerhetsutbildat team", "Försäkringssamarbete"],
  },
  {
    slug: "fasad",
    name: "Fasad",
    desc: "Fasadrenovering som ger ditt hem nytt liv.",
    img: sFacade,
    long: "Putsade, träfasader eller tegel — vi renoverar med rätt teknik för husets ursprung och dagens energikrav.",
    highlights: ["Tilläggsisolering", "Färgsättning ingår", "Ställning vi sätter själva"],
  },
  {
    slug: "altan-terrass",
    name: "Altan & Terrass",
    desc: "Uterum och altaner byggda för skandinaviskt klimat.",
    img: sTerrace,
    long: "IPE, lärk eller kompositdäck. Vi bygger altaner med inbyggd belysning, glasräcken och pergola.",
    highlights: ["IPE & lärk", "Inbyggd LED", "Glasräcken"],
  },
  {
    slug: "tillbyggnad",
    name: "Tillbyggnad",
    desc: "Mer utrymme, smart planerat och sömlöst integrerat.",
    img: sExtension,
    long: "Från bygglov till nyckelfärdig tillbyggnad. Vi sköter ritningar, myndighetskontakter och bygget.",
    highlights: ["Bygglovshjälp", "Konstruktör i teamet", "Energiberäkning"],
  },
  {
    slug: "malning-tapetsering",
    name: "Målning & Tapetsering",
    desc: "Professionell målning och tapetsering som ger rummet ny karaktär.",
    img: sPainting,
    long: "Linoljefärg, lerputs eller designertapeter. Vi behärskar både traditionellt och modernt måleri.",
    highlights: ["Erfarna målare", "Miljövänliga färger", "Snabba leveranser"],
  },
  {
    slug: "inredning",
    name: "Inredning",
    desc: "Inredningshjälp som sätter pricken över i.",
    img: sInterior,
    long: "Vår inredare hjälper dig välja färger, material, möbler och belysning — så att helheten blir er.",
    highlights: ["3D-visualisering", "Materialprover", "Inköpshjälp"],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  img: string;
  summary: string;
  scope: string[];
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
    scope: ["Markarbete & dränering", "IPE-däck 48 kvm", "Inbyggd LED-belysning", "Glasräcke", "Pergola med segelduk"],
  },
  {
    slug: "kok-bromma",
    title: "Kök i Bromma",
    category: "Kök",
    location: "Bromma",
    year: "2024",
    img: baKitchenAfter,
    summary: "Ett 70-talskök förvandlat till ett ljust, platsbyggt kök i ek med stenbänkskiva.",
    scope: ["Platsbyggda luckor", "Stenbänkskiva", "Integrerad belysning", "Ny el och VVS"],
  },
  {
    slug: "badrum-nacka",
    title: "Badrum i Nacka",
    category: "Badrum",
    location: "Nacka",
    year: "2024",
    img: baBathAfter,
    summary: "Ett spa-likt badrum i marmor och borstad mässing — våtrumssäkrat enligt BKR.",
    scope: ["Tätskikt enligt BKR", "Marmorplattor", "Mässingsdetaljer", "Golvvärme"],
  },
  {
    slug: "fasad-taby",
    title: "Fasadrenovering i Täby",
    category: "Fasad",
    location: "Täby",
    year: "2024",
    img: baFacadeAfter,
    summary: "Putsad fasad med tilläggsisolering, ny färgsättning och nya fönsterbleck.",
    scope: ["Tilläggsisolering 100 mm", "KC-puts", "Färgsättning", "Nya bleck"],
  },
];

export const findService = (slug: string) => services.find((s) => s.slug === slug);
export const findProject = (slug: string) => projects.find((p) => p.slug === slug);
