export const CITIES = [
  "Frankfurt", "Berlin", "München", "Hamburg",
  "Wien", "Zürich", "Stuttgart", "Köln", "Dresden",
];

export const NEWS_FEEDS = [
  "Tech & AI",
  "Rechenzentrum",
  "Energie",
  "Geopolitik",
  "Wirtschaft",
];

export const BLOCK_LABELS = {
  quote:    "Zitat",
  question: "Frage",
  weather:  "Wetter",
  calendar: "Kalender",
  news:     "News",
  wiki:     "Wikipedia",
};

export const DEFAULT_ORDER = [
  "quote", "question", "weather", "calendar", "news", "wiki",
];

// Placeholder quote – später durch API ersetzen
export const DAILY_QUOTE = {
  text: "Der einzige Weg, gute Arbeit zu leisten, ist zu lieben, was man tut.",
  author: "Steve Jobs",
};

// Placeholder Frage – später durch API ersetzen
export const DAILY_QUESTION =
  "Was ist die eine Sache, die du heute abschließen willst – und warum?";

// Placeholder Kalender – später durch Kalender-Integration ersetzen
export const MOCK_EVENTS = [
  { time: "09:00", title: "Daily Standup",              duration: "30 min" },
  { time: "11:30", title: "Review: RZ-Planung Q3",      duration: "60 min" },
  { time: "14:00", title: "Kundengespräch Datacenter AG", duration: "45 min" },
  { time: "16:30", title: "KaltgangDE – Skript Review", duration: "30 min" },
];

// Placeholder News – später durch RSS-Feed ersetzen
export const MOCK_NEWS = [
  { source: "Heise",      title: "Nvidia kündigt B300-Architektur für 2026 an",           time: "vor 2h" },
  { source: "RCR Wireless", title: "EU-Rechenzentren: Wasserverbrauch unter Kritik",       time: "vor 4h" },
  { source: "Spiegel",    title: "Energiewende: Netzbetreiber fordern mehr Flexibilität", time: "vor 5h" },
];
