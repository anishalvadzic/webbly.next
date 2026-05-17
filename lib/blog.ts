export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "divider" }
  | { type: "faq"; items: { q: string; a: string }[] };

export type CoverAnimation = "eyes" | "domains";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage?: string;
  coverAnimation?: CoverAnimation;
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
    slug: "det-forste-folk-gjor-pa-nettsiden-din",
    title: "Det første folk gjør på nettsiden din (det er ikke å lese)",
    excerpt:
      "Folk leser ikke nettsiden din slik du tror. De scanner — og bestemmer seg på sekunder. Her er det jeg har lært etter å ha sett mange av dem.",
    date: "2026-05-17",
    category: "Innsikt",
    coverAnimation: "eyes",
    content: [
      { type: "paragraph", text: "Jeg har sett en del nettsider de siste årene. Når jeg snakker med kunder kommer ofte spørsmålet: «Hvor mye tekst burde det være?» eller «Bør om-oss-siden være lang eller kort?»" },
      { type: "paragraph", text: "Og jeg skjønner hvorfor de spør. Det er logisk å tenke at folk leser nettsiden din slik de leser en avis." },
      { type: "paragraph", text: "Men det gjør de ikke." },
      { type: "heading2", text: "Folk scanner. De leser ikke." },
      { type: "paragraph", text: "Det som faktisk skjer når noen lander på siden din, er ikke at de starter på toppen og leser nedover. Øynene hopper rundt. De sjekker logoen, så headlinen, så et bilde, så en knapp, så headlinen igjen, så scroller de litt ned for å se hvor lang siden er, så går de tilbake opp." },
      { type: "paragraph", text: "Det tar dem rundt tre til fem sekunder å bestemme om de blir værende." },
      { type: "paragraph", text: "Det er litt urettferdig, men det er sånn det er." },
      { type: "heading2", text: "Hva øynene faktisk fester seg på" },
      { type: "paragraph", text: "Etter å ha sett en god del heatmaps og klikkopptak, har jeg blitt overrasket over hvor lite folk faktisk leser. De fleste fester blikket på:" },
      {
        type: "list",
        items: [
          "den største overskriften",
          "knapper med tydelig farge",
          "ansikter og bilder av mennesker",
          "tall, priser og kjente logoer",
          "den øverste delen av siden",
        ],
      },
      { type: "paragraph", text: "Resten skummer de. Har du ikke fanget oppmerksomheten deres på de første par skjermhøydene, scroller de sjelden lenger." },
      { type: "heading2", text: "Det betyr ikke at du skal kutte ut all tekst" },
      { type: "paragraph", text: "Tekst er fortsatt viktig. Google leser den. SEO trenger den. Og når noen først bestemmer seg for å lese, vil de ha noe å lese." },
      { type: "paragraph", text: "Men strukturen må respektere at de fleste bare skummer." },
      { type: "paragraph", text: "Jeg pleier å si til kunder: «Tenk på siden din som en tegneserie, ikke som en bok.» Hver seksjon skal ha én tydelig idé, én tydelig handling, og være forståelig på to sekunder — selv om du bare ser bildet og hopper over teksten." },
      { type: "heading2", text: "Knappen er viktigere enn paragrafen" },
      { type: "paragraph", text: "Hvis noe skal vinne plassen på siden, så er det knappen. Det er den som faktisk gjør jobben." },
      { type: "paragraph", text: "Jeg har sett firmaer med fantastiske om-oss-tekster og null konvertering, og jeg har sett firmaer med tre setninger og én god knapp som får henvendelser hver dag." },
      { type: "paragraph", text: "Det er en god påminnelse om at det viktigste ikke alltid er det fineste." },
      { type: "divider" },
      { type: "heading2", text: "Oppsummering" },
      { type: "paragraph", text: "Folk leser ikke nettsiden din slik du leste den da du laget den. De flyr forbi, de scanner, de leter etter hint. Bygger du siden for «den som leser hvert ord», bygger du for en kunde som ikke eksisterer." },
      { type: "paragraph", text: "Bygg for den som har dårlig tid. De andre er bonus." },
    ],
  },
  {
    slug: "hvorfor-no-domene-slar-com-for-norske-bedrifter",
    title: "Hvorfor jeg alltid anbefaler .no før .com til norske kunder",
    excerpt:
      ".com er kanskje konge internasjonalt, men i Norge er det noe annet som gjelder. Her er hvorfor jeg nesten alltid sier .no først.",
    date: "2026-05-16",
    category: "Guider",
    coverAnimation: "domains",
    content: [
      { type: "paragraph", text: "Hver gang jeg snakker med en norsk bedrift om nytt domene, kommer det samme spørsmålet:" },
      { type: "paragraph", text: "«Bør vi ta .no eller .com?»" },
      { type: "paragraph", text: "Og hver gang svarer jeg det samme: ta .no." },
      { type: "paragraph", text: "Det er litt rart, fordi i de fleste land er .com kongen. Men i Norge er det noe annet som gjelder." },
      { type: "heading2", text: "Nordmenn stoler på .no" },
      { type: "paragraph", text: "Det er ikke noe jeg fant på. Det er et mønster jeg har lagt merke til over år." },
      { type: "paragraph", text: "Når noen ser et .no-domene, tenker hjernen deres nesten automatisk:" },
      {
        type: "list",
        items: [
          "norsk firma",
          "norsk kundeservice",
          "norske priser",
          "norske rettigheter hvis noe skjærer seg",
        ],
      },
      { type: "paragraph", text: "Det er en form for tillit du får helt gratis, bare av endelsen." },
      { type: "paragraph", text: "Når noen ser et .com på en norsk bedrift, blir det litt mer abstrakt. «Er dette egentlig norsk? Er det et internasjonalt selskap? Snakker de norsk hvis jeg ringer?»" },
      { type: "paragraph", text: "Det er ikke nødvendigvis bevisste tanker. Men de er der." },
      { type: "heading2", text: "Google liker også .no for norsk søk" },
      { type: "paragraph", text: "Dette er ikke alltid avgjørende, men det hjelper. Google bruker domene-endelsen som ett av mange hint når den prøver å forstå hvilken region innholdet ditt hører hjemme i." },
      { type: "paragraph", text: "Hvis du selger til nordmenn, er det greit at Google vet at du holder til i Norge." },
      { type: "heading2", text: "Men ta .com også (hvis du kan)" },
      { type: "paragraph", text: "Misforstå meg rett — jeg sier ikke at du skal la .com ligge. Hvis du har sjansen, kjøp begge." },
      { type: "paragraph", text: "Det koster et par hundrelapper ekstra i året, og du slipper å oppdage senere at noen andre har snappet .com-versjonen og sender folk til en falsk side." },
      { type: "paragraph", text: "Du peker bare .com-en til .no-en og bruker .no som hovedadresse." },
      { type: "heading2", text: "Hva med .org, .net og resten?" },
      { type: "paragraph", text: "Disse bruker jeg sjelden. .org passer for foreninger og frivillige organisasjoner. .net er teknisk arv fra 90-tallet og brukes nesten ikke seriøst lenger. .biz føles billig." },
      { type: "paragraph", text: "Hvis ditt foretrukne navn er opptatt på .no, er det stort sett bedre å justere navnet litt enn å gå for en sjelden endelse. Et navn folk husker er mer verdt enn et navn med eksotisk slutt." },
      { type: "heading2", text: "Når .com faktisk gir mening" },
      { type: "paragraph", text: "Det er egentlig bare to tilfeller hvor .com vinner:" },
      {
        type: "list",
        items: [
          "Du selger primært utenfor Norge.",
          "Merkenavnet ditt er allerede et .com som folk kjenner igjen.",
        ],
      },
      { type: "paragraph", text: "Ellers: .no." },
      { type: "divider" },
      { type: "heading2", text: "Oppsummering" },
      { type: "paragraph", text: "For norske bedrifter med norske kunder er .no nesten alltid det riktige valget. Det gir umiddelbar tillit, det hjelper litt på Google, og det føles riktig på et språk og en kultur folk allerede er hjemme i." },
      { type: "paragraph", text: "Og hvis du er rask, er domenet ditt fortsatt ledig. Sjekk det i dag." },
    ],
  },
  {
    slug: "hvorfor-moderne-animasjoner-gjor-nettsider-bedre",
    title: "Hvorfor moderne animasjoner gjør nettsider mye bedre",
    excerpt:
      "Gode animasjoner gjør nettsider mer profesjonelle, mer moderne og bedre å bruke. Men hvordan bruker man dem riktig — uten å overdrive?",
    date: "2026-05-15",
    category: "Innsikt",
    coverImage: "/moderne-animasjoner.webp",
    content: [
      { type: "paragraph", text: "Det er lett å tenke at animasjoner på nettsider bare er «ekstra pynt»." },
      { type: "paragraph", text: "Men gode animasjoner gjør faktisk at en nettside føles mer profesjonell, mer moderne og mye bedre å bruke." },
      { type: "paragraph", text: "Forskjellen merkes spesielt når man sammenligner eldre nettsider med moderne sider bygget i dag." },
      { type: "heading2", text: "Gamle nettsider føles statiske" },
      { type: "paragraph", text: "Gamle nettsider føles ofte veldig statiske. Man klikker rundt uten at noe egentlig skjer. Alt bare «hopper» fra sted til sted." },
      { type: "paragraph", text: "Moderne nettsider føles mer levende:" },
      {
        type: "list",
        items: [
          "Tekst glir mykt inn når man scroller.",
          "Bilder beveger seg subtilt.",
          "Knapper responderer naturlig når man holder over dem.",
          "Seksjoner flyter bedre sammen.",
        ],
      },
      { type: "paragraph", text: "Det høres kanskje smått ut, men det påvirker faktisk hvordan folk opplever hele bedriften." },
      { type: "paragraph", text: "En nettside med gode bevegelser føles ofte mer premium og gjennomført. Det gir automatisk et sterkere førsteinntrykk." },
      { type: "heading2", text: "For mange animasjoner ødelegger opplevelsen" },
      { type: "paragraph", text: "Men det er også her mange gjør feil." },
      { type: "paragraph", text: "Hvis ting spinner, hopper og flyr rundt overalt, blir nettsiden fort slitsom å bruke. Mange moderne nettsider prøver altfor hardt å imponere." },
      { type: "paragraph", text: "De beste nettsidene bruker animasjoner mye mer subtilt." },
      { type: "paragraph", text: "Målet er egentlig ikke at brukeren skal legge merke til animasjonene direkte." },
      { type: "paragraph", text: "Målet er at nettsiden bare skal føles bra." },
      { type: "heading2", text: "Det er derfor Apple, Stripe og de beste byråene gjør det de gjør" },
      { type: "paragraph", text: "Det er derfor selskaper som Apple, Stripe og moderne designbyråer bruker så mye fokus på små detaljer og myke overganger." },
      { type: "paragraph", text: "Alt føles smooth uten at man helt tenker over hvorfor." },
      { type: "heading2", text: "Scrolling som historiefortelling" },
      { type: "paragraph", text: "Scrolling har også blitt en mye større del av design i 2026." },
      { type: "paragraph", text: "I stedet for at nettsider bare er «seksjon etter seksjon», bruker mange nå scrolling som en del av historiefortellingen." },
      { type: "paragraph", text: "Når brukeren scroller:" },
      {
        type: "list",
        items: [
          "dukker nytt innhold opp gradvis",
          "bilder beveger seg litt",
          "elementer reagerer på bevegelse",
          "nettsiden føles mer interaktiv",
        ],
      },
      { type: "paragraph", text: "Når det gjøres riktig, holder folk seg lenger på siden. Det gjør også at designet føles mer eksklusivt." },
      { type: "heading2", text: "Balanse er fortsatt viktigst" },
      { type: "paragraph", text: "Men det viktigste er fortsatt balanse." },
      { type: "paragraph", text: "En moderne nettside skal fortsatt være:" },
      {
        type: "list",
        items: [
          "rask",
          "enkel å forstå",
          "lett å bruke på mobil",
          "behagelig å lese",
        ],
      },
      { type: "divider" },
      { type: "heading2", text: "Oppsummering" },
      { type: "paragraph", text: "De beste animasjonene er ofte de man nesten ikke legger merke til." },
      { type: "paragraph", text: "De gjør ikke nettsiden mer komplisert — de gjør den mer behagelig. En liten, gjennomtenkt bevegelse her og der, og siden plutselig føles som den er bygget i 2026, ikke i 2015." },
    ],
  },
  {
    slug: "hvorfor-norske-bedrifter-taper-kunder-pa-darlig-nettside-2026",
    title: "Hvorfor mange norske bedrifter taper kunder på en dårlig nettside i 2026",
    excerpt: "En dårlig nettside sender kunder videre til konkurrentene. Her er hva du bør vite.",
    date: "2026-05-14",
    category: "Innsikt",
    coverImage: "/darlig-nettside-2026.png",
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
