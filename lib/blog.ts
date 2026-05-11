export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "divider" }
  | { type: "faq"; items: { q: string; a: string }[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: string;
  content: ContentBlock[];
}

export const posts: BlogPost[] = [
  {
    slug: "hva-koster-en-nettside-i-norge-i-2026",
    title: "Hva koster en nettside i Norge i 2026?",
    excerpt: "Priser, forskjeller og hva du bør vite før du investerer.",
    date: "2026-05-11",
    category: "Guider",
    coverImage: "/hva-koster-en-nettside-2026.png",
    content: [
      {
        type: "paragraph",
        text: "Mange små bedrifter lurer på det samme før de tar kontakt med et webbyrå:",
      },
      {
        type: "paragraph",
        text: "Hva koster egentlig en profesjonell nettside i Norge?",
      },
      {
        type: "paragraph",
        text: "Det korte svaret er at det varierer veldig. Noen betaler 5.000 kroner, andre betaler 150.000+. Forskjellen handler ofte om hvor avansert løsningen er, hvem som bygger den, og hvor mye som er inkludert.",
      },
      {
        type: "paragraph",
        text: "For små og mellomstore bedrifter ligger de fleste profesjonelle nettsider et sted mellom 10.000 og 50.000 kroner.",
      },
      {
        type: "paragraph",
        text: "Men det finnes noen viktige ting du burde vite før du bestemmer deg.",
      },
      {
        type: "heading2",
        text: "Hvorfor er prisene så forskjellige?",
      },
      {
        type: "paragraph",
        text: "Det finnes ikke én standardpris på nettsider.",
      },
      {
        type: "paragraph",
        text: "Noen byråer bygger alt fra bunnen av med designere, utviklere og prosjektledere. Andre bruker ferdige maler. Noen inkluderer SEO og optimalisering, mens andre kun leverer en enkel side uten videre oppfølging.",
      },
      {
        type: "paragraph",
        text: "Du betaler ofte for:",
      },
      {
        type: "list",
        items: [
          "erfaring",
          "design",
          "ytelse",
          "SEO",
          "support",
          "teknologi",
          "hvor raskt siden leveres",
        ],
      },
      {
        type: "paragraph",
        text: "En billig nettside kan derfor bli dyr hvis den ikke fungerer godt på mobil, ikke rangerer på Google eller gir få henvendelser.",
      },
      {
        type: "heading2",
        text: "Hva er vanlig pris for små bedrifter?",
      },
      {
        type: "paragraph",
        text: "Her er et realistisk bilde av markedet i Norge i 2026:",
      },
      {
        type: "heading3",
        text: "Enkel nettside",
      },
      {
        type: "paragraph",
        text: "Typisk pris: 5.000–15.000 kr",
      },
      {
        type: "paragraph",
        text: "Passer for:",
      },
      {
        type: "list",
        items: ["enkeltpersonforetak", "små lokale tjenester", "enkle landingssider"],
      },
      {
        type: "paragraph",
        text: "Vanligvis:",
      },
      {
        type: "list",
        items: ["1–3 sider", "kontaktform", "enkel SEO", "standard design"],
      },
      {
        type: "divider",
      },
      {
        type: "heading3",
        text: "Profesjonell bedriftsnettside",
      },
      {
        type: "paragraph",
        text: "Typisk pris: 15.000–50.000 kr",
      },
      {
        type: "paragraph",
        text: "Passer for:",
      },
      {
        type: "list",
        items: [
          "håndverkere",
          "klinikker",
          "restauranter",
          "frisører",
          "konsulenter",
        ],
      },
      {
        type: "paragraph",
        text: "Vanligvis:",
      },
      {
        type: "list",
        items: [
          "spesialdesignet løsning",
          "mobiloptimalisering",
          "SEO",
          "rask ytelse",
          "Google-indeksering",
          "flere undersider",
        ],
      },
      {
        type: "paragraph",
        text: "Dette er nivået de fleste seriøse småbedrifter burde ligge på.",
      },
      {
        type: "divider",
      },
      {
        type: "heading3",
        text: "Store spesialløsninger",
      },
      {
        type: "paragraph",
        text: "Typisk pris: 50.000–300.000+ kr",
      },
      {
        type: "paragraph",
        text: "Passer for:",
      },
      {
        type: "list",
        items: [
          "større selskaper",
          "bookingløsninger",
          "portaler",
          "nettbutikker",
          "avanserte integrasjoner",
        ],
      },
      {
        type: "paragraph",
        text: "Her begynner utviklingskostnadene å bli betydelige.",
      },
      {
        type: "heading2",
        text: "Hvorfor SEO er viktigere enn mange tror",
      },
      {
        type: "paragraph",
        text: "Mange fokuserer kun på design.",
      },
      {
        type: "paragraph",
        text: "Men design alene gir ikke kunder.",
      },
      {
        type: "paragraph",
        text: "Hvis nettsiden ikke vises på Google spiller det liten rolle hvor fin den er.",
      },
      {
        type: "paragraph",
        text: "En moderne nettside burde derfor bygges med:",
      },
      {
        type: "list",
        items: [
          "god struktur",
          "raske lastetider",
          "riktig metadata",
          "mobiloptimalisering",
          "teknisk SEO",
        ],
      },
      {
        type: "paragraph",
        text: "Dette er også grunnen til at mange går bort fra eldre løsninger og over til moderne teknologi som Next.js og server-side rendering.",
      },
      {
        type: "heading2",
        text: "Hvorfor mange billige nettsider feiler",
      },
      {
        type: "paragraph",
        text: "Det største problemet med veldig billige nettsider er ikke nødvendigvis designet.",
      },
      {
        type: "paragraph",
        text: "Problemet er ofte:",
      },
      {
        type: "list",
        items: [
          "treg hastighet",
          "dårlig SEO",
          "ingen struktur",
          "vanskelig å oppdatere",
          "dårlig mobilopplevelse",
        ],
      },
      {
        type: "paragraph",
        text: "Resultatet blir at bedriften må bygge alt på nytt etter 1–2 år.",
      },
      {
        type: "paragraph",
        text: "Det skjer oftere enn folk tror.",
      },
      {
        type: "heading2",
        text: "Hva burde små bedrifter fokusere på?",
      },
      {
        type: "paragraph",
        text: "Hvis du driver en liten bedrift ville jeg fokusert på:",
      },
      {
        type: "list",
        items: [
          "mobilvennlighet",
          "hastighet",
          "enkel kontaktmulighet",
          "Google-synlighet",
          "troverdig design",
        ],
      },
      {
        type: "paragraph",
        text: "Du trenger ikke nødvendigvis verdens mest avanserte nettside.",
      },
      {
        type: "paragraph",
        text: "Men du trenger en nettside som faktisk fungerer.",
      },
      {
        type: "heading2",
        text: "Oppsummering",
      },
      {
        type: "paragraph",
        text: "En profesjonell nettside i Norge i 2026 koster vanligvis mellom 10.000 og 50.000 kroner for små og mellomstore bedrifter.",
      },
      {
        type: "paragraph",
        text: "Det viktigste er ikke å finne den billigste løsningen, men å finne en løsning som:",
      },
      {
        type: "list",
        items: [
          "gir tillit",
          "fungerer bra på mobil",
          "er rask",
          "kan finnes på Google",
          "gjør det enkelt for kunder å ta kontakt",
        ],
      },
      {
        type: "paragraph",
        text: "En nettside burde være en investering som hjelper bedriften å vokse — ikke bare noe som «ser fint ut».",
      },
      {
        type: "divider",
      },
      {
        type: "faq",
        items: [
          {
            q: "Hvor lang tid tar det å lage en nettside?",
            a: "De fleste små bedriftsnettsider kan bygges på alt fra noen dager til noen uker, avhengig av omfang og innhold.",
          },
          {
            q: "Må jeg ha SEO?",
            a: "Ja. Uten SEO blir det vanskelig å få organisk trafikk fra Google.",
          },
          {
            q: "Hva er forskjellen på WordPress og Next.js?",
            a: "Next.js gir ofte bedre ytelse, raskere lastetider og bedre teknisk SEO enn tradisjonelle WordPress-løsninger.",
          },
          {
            q: "Kan en billig nettside fungere?",
            a: "Ja, men mange billige løsninger har begrensninger innen SEO, hastighet og fleksibilitet.",
          },
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
