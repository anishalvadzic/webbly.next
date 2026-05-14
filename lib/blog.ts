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

export function readingTime(post: BlogPost): number {
  let words = 0;
  for (const block of post.content) {
    if ("text" in block) words += block.text.split(/\s+/).length;
    if (block.type === "list") block.items.forEach((i) => (words += i.split(/\s+/).length));
    if (block.type === "faq") block.items.forEach((i) => {
      words += i.q.split(/\s+/).length + i.a.split(/\s+/).length;
    });
  }
  return Math.max(1, Math.ceil(words / 200));
}

export const posts: BlogPost[] = [
  {
    slug: "hvorfor-norske-bedrifter-taper-kunder-pa-darlig-nettside-2026",
    title: "Hvorfor mange norske bedrifter taper kunder på en dårlig nettside i 2026",
    excerpt: "En dårlig nettside sender kunder videre til konkurrentene. Her er hva du bør vite.",
    date: "2026-05-14",
    category: "Innsikt",
    coverImage: "/darlig-nettside-2026.jpg",
    content: [
      { type: "paragraph", text: "Mange bedrifter tenker fortsatt på nettsiden sin som et digitalt visittkort." },
      { type: "paragraph", text: "Det var kanskje nok før." },
      { type: "paragraph", text: "I 2026 fungerer nettsiden mer som en digital selger. Den jobber enten for deg hele døgnet — eller så sender den kunder videre til konkurrentene dine." },
      { type: "paragraph", text: "Det høres brutalt ut, men sannheten er at folk dømmer bedriften din ekstremt raskt på nett." },
      { type: "paragraph", text: "Ofte på bare noen få sekunder." },
      { type: "heading2", text: "Førsteinntrykket skjer før du rekker å forklare deg" },
      { type: "paragraph", text: "Når noen besøker nettsiden din, skjer det automatisk noen tanker i hodet deres:" },
      {
        type: "list",
        items: [
          "Ser dette seriøst ut?",
          "Er dette et ekte firma?",
          "Kan jeg stole på dem?",
          "Virker de moderne?",
          "Er det enkelt å ta kontakt?",
        ],
      },
      { type: "paragraph", text: "Hvis siden føles treg, rotete eller gammel, forsvinner mange videre uten å sende en eneste melding." },
      { type: "paragraph", text: "Selv om tjenesten din egentlig er bra." },
      { type: "heading2", text: "Mange små bedrifter har samme problem" },
      { type: "paragraph", text: "Vi ser ofte at bedrifter i Norge har nettsider som:" },
      {
        type: "list",
        items: [
          "laster sakte",
          "fungerer dårlig på mobil",
          "mangler tydelig informasjon",
          "har gammel design",
          "ikke dukker opp på Google",
          "mangler gode bilder og struktur",
        ],
      },
      { type: "paragraph", text: "Problemet er ikke nødvendigvis at bedriften er dårlig." },
      { type: "paragraph", text: "Problemet er at nettsiden skaper usikkerhet." },
      { type: "paragraph", text: "Og på nettet er usikkerhet dyrt." },
      { type: "heading2", text: "Folk sammenligner deg med store selskaper" },
      { type: "paragraph", text: "En liten lokal bedrift konkurrerer ikke bare med andre små bedrifter lenger." },
      { type: "paragraph", text: "Kundene sammenligner opplevelsen din med:" },
      {
        type: "list",
        items: ["Apple", "Finn.no", "Komplett", "Elkjøp", "moderne startups"],
      },
      { type: "paragraph", text: "Det betyr ikke at du må bruke hundretusener på design." },
      { type: "paragraph", text: "Men det betyr at siden må:" },
      {
        type: "list",
        items: [
          "føles rask",
          "være enkel å bruke",
          "se profesjonell ut",
          "fungere perfekt på mobil",
        ],
      },
      { type: "heading2", text: "Google bryr seg også om brukeropplevelse" },
      { type: "paragraph", text: "SEO handler ikke bare om nøkkelord lenger." },
      { type: "paragraph", text: "Google ser også på:" },
      {
        type: "list",
        items: [
          "hastighet",
          "mobilvennlighet",
          "struktur",
          "innholdskvalitet",
          "hvor lenge folk blir på siden",
          "teknisk oppsett",
        ],
      },
      { type: "paragraph", text: "En treg eller dårlig bygget nettside kan derfor påvirke synligheten din direkte." },
      { type: "heading2", text: "Moderne nettsider trenger ikke ta måneder å bygge" },
      { type: "paragraph", text: "Tidligere måtte man ofte bruke:" },
      {
        type: "list",
        items: ["store byråer", "lange prosjekter", "tunge systemer", "mange møter"],
      },
      { type: "paragraph", text: "Nå finnes det moderne løsninger som gjør det mulig å bygge raske og profesjonelle nettsider langt mer effektivt." },
      { type: "paragraph", text: "Det viktigste er ikke nødvendigvis hvilket verktøy som brukes." },
      { type: "paragraph", text: "Det viktigste er:" },
      {
        type: "list",
        items: ["struktur", "innhold", "SEO", "ytelse", "design", "tydelig kommunikasjon"],
      },
      { type: "heading2", text: "En nettside handler egentlig om tillit" },
      { type: "paragraph", text: "De fleste kunder er ikke eksperter på webdesign." },
      { type: "paragraph", text: "Men de merker veldig fort om noe føles:" },
      {
        type: "list",
        items: ["seriøst", "trygt", "moderne", "enkelt"],
      },
      { type: "paragraph", text: "En god nettside gjør det lettere for kunder å stole på deg." },
      { type: "paragraph", text: "Og tillit er ofte forskjellen mellom ingen henvendelse og en ny kunde." },
      { type: "divider" },
      { type: "heading2", text: "Oppsummering" },
      { type: "paragraph", text: "I 2026 er nettsiden ofte det første møtet folk har med bedriften din." },
      { type: "paragraph", text: "Hvis siden er rask, ser profesjonell ut, fungerer bra på mobil, er optimalisert for Google og forklarer tydelig hva du tilbyr — så har du allerede et stort konkurransefortrinn mot mange andre bedrifter." },
      { type: "paragraph", text: "Spesielt i det norske SMB-markedet, hvor mange fortsatt har utdaterte nettsider." },
    ],
  },
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
        text: "Mange bedrifter lurer på det samme før de tar kontakt med et webbyrå:",
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
        text: "For bedrifter ligger de fleste profesjonelle nettsider et sted mellom 10.000 og 50.000 kroner.",
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
        text: "Hva er vanlig pris for bedrifter?",
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
        items: ["enkeltpersonforetak", "lokale tjenester", "enkle landingssider"],
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
        text: "Dette er nivået de fleste seriøse bedrifter burde ligge på.",
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
        text: "Hva burde bedrifter fokusere på?",
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
        text: "En profesjonell nettside i Norge i 2026 koster vanligvis mellom 10.000 og 50.000 kroner for bedrifter.",
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
            a: "De fleste bedriftsnettsider kan bygges på alt fra noen dager til noen uker, avhengig av omfang og innhold.",
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
