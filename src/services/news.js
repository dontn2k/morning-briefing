// ─── RSS News Service ─────────────────────────────────────────────────────────

export const NEWS_SOURCES = [
  { id: "spiegel",      name: "Spiegel",      url: "https://www.spiegel.de/schlagzeilen/tops/index.rss" },
  { id: "zeit",         name: "Zeit",          url: "https://newsfeed.zeit.de/all" },
  { id: "faz",          name: "FAZ",           url: "https://www.faz.net/rss/aktuell/" },
  { id: "sueddeutsche", name: "Süddeutsche",   url: "https://rss.sueddeutsche.de/alles" },
  { id: "welt",         name: "Welt",          url: "https://www.welt.de/feeds/latest.rss" },
  { id: "heise",        name: "Heise",         url: "https://www.heise.de/rss/heise-top-atom.xml" },
  { id: "tagesschau",   name: "Tagesschau",    url: "https://www.tagesschau.de/xml/rss2/" },
  { id: "nzz",          name: "NZZ",           url: "https://www.nzz.ch/recent.rss" },
  { id: "standard",     name: "Der Standard",  url: "https://www.derstandard.at/rss" },
  { id: "handelsblatt", name: "Handelsblatt",  url: "https://www.handelsblatt.com/contentexport/feed/schlagzeilen" },
];

export const NEWS_CATEGORIES = {
  "Politik": [
    "politik", "regierung", "bundestag", "bundesrat", "minister", "kanzler",
    "wahl", "partei", "koalition", "opposition", "parlament", "gesetz",
    "eu", "europa", "nato", "außenpolitik", "diplomatie", "senat",
  ],
  "Wirtschaft": [
    "wirtschaft", "konjunktur", "inflation", "zinsen", "aktien", "börse",
    "dax", "euro", "dollar", "bank", "finanzen", "haushalt", "schulden",
    "investition", "unternehmen", "konzern", "fusion", "startup", "ipo",
    "handel", "export", "import", "zoll", "rezession", "wachstum",
  ],
  "Technologie": [
    "tech", "technologie", "ki", "ai", "künstliche intelligenz", "software",
    "hardware", "apple", "google", "microsoft", "amazon", "meta",
    "chip", "halbleiter", "rechenzentrum", "cloud", "cyber", "hacker",
    "datenschutz", "internet", "smartphone", "roboter",
  ],
  "Wissenschaft": [
    "wissenschaft", "forschung", "studie", "universität", "labor",
    "entdeckung", "physik", "chemie", "biologie", "astronomie", "weltraum",
    "nasa", "esa", "medizin", "impfstoff", "virus", "gehirn", "gen",
  ],
  "Kultur": [
    "kultur", "kunst", "museum", "ausstellung", "theater", "oper", "konzert",
    "festival", "film", "kino", "serie", "musik", "album", "buch",
    "literatur", "autor", "roman", "preis", "oscar", "architektur",
  ],
  "Sport": [
    "sport", "fußball", "bundesliga", "champions league", "em", "wm",
    "fc", "tor", "trainer", "transfer", "tennis", "formel 1", "olympia",
    "handball", "basketball", "ski", "marathon", "weltmeister",
  ],
  "Gesellschaft": [
    "gesellschaft", "sozial", "bildung", "schule", "familie",
    "kinder", "jugend", "rente", "pflege", "gesundheit", "krankenhaus",
    "migration", "flüchtlinge", "integration", "armut", "wohnungsnot",
    "miete", "diskriminierung", "gleichstellung",
  ],
  "Umwelt": [
    "klima", "klimawandel", "co2", "emission", "nachhaltigkeit", "energie",
    "solar", "wind", "erneuerbar", "kohle", "gas", "öl", "atomkraft",
    "umwelt", "naturschutz", "artensterben", "wald", "ozean", "plastik",
    "dürre", "überschwemmung", "hitzewelle",
  ],
  "Feuilleton": [
    "feuilleton", "essay", "debatte", "meinung", "kommentar", "analyse",
    "philosophie", "ethik", "demokratie", "freiheit", "identität",
    "sprache", "geschichte", "tradition", "werte", "religion",
  ],
  "Welt": [
    "usa", "china", "russland", "ukraine", "krieg", "konflikt", "nahost",
    "israel", "iran", "nordkorea", "indien", "brasilien", "afrika",
    "lateinamerika", "asien", "vereinte nationen", "g7", "g20",
    "sanktionen", "außenpolitik",
  ],
};

// Mehrere Proxies – fallback wenn einer blockiert
const PROXIES = [
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
  (url) => `https://thingproxy.freeboard.io/fetch/${url}`,
];

function parseRSS(xmlString) {
  const items = [];
  const blocks = xmlString.match(/<item[\s\S]*?<\/item>/g) ||
                 xmlString.match(/<entry[\s\S]*?<\/entry>/g) || [];

  for (const block of blocks.slice(0, 15)) {
    const title = (
      block.match(/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
      block.match(/<title[^>]*>([^<]*)<\/title>/) || []
    )[1] || "";

    const link = (
      block.match(/<link[^>]*href="([^"]+)"/) ||
      block.match(/<link[^>]*>([^<]+)<\/link>/) || []
    )[1] || "";

    const desc = (
      block.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
      block.match(/<description[^>]*>([^<]*)<\/description>/) ||
      block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/) || []
    )[1] || "";

    const date = (
      block.match(/<pubDate[^>]*>([^<]+)<\/pubDate>/) ||
      block.match(/<published[^>]*>([^<]+)<\/published>/) ||
      block.match(/<updated[^>]*>([^<]+)<\/updated>/) || []
    )[1] || "";

    const cleanTitle = title.replace(/<[^>]+>/g, "").trim();
    if (!cleanTitle || cleanTitle.length < 5) continue;

    items.push({
      title: cleanTitle,
      description: desc.replace(/<[^>]+>/g, "").slice(0, 200),
      url: link.trim(),
      pubDate: date ? new Date(date.trim()) : new Date(0),
    });
  }
  return items;
}

async function tryProxy(proxyFn, sourceUrl) {
  const proxied = proxyFn(sourceUrl);
  const res = await fetch(proxied, { signal: AbortSignal.timeout(7000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  // allorigins wraps in JSON
  if (proxied.includes("allorigins")) {
    const json = await res.json();
    return json.contents || "";
  }
  return await res.text();
}

async function fetchFeed(source) {
  for (const proxyFn of PROXIES) {
    try {
      const xml = await tryProxy(proxyFn, source.url);
      if (!xml || xml.length < 100) continue;
      const items = parseRSS(xml);
      if (items.length === 0) continue;
      return items.map((item) => ({
        source: source.name,
        title: item.title,
        description: item.description,
        time: timeAgo(item.pubDate),
        url: item.url,
        pubDate: item.pubDate,
      }));
    } catch {
      // try next proxy
    }
  }
  return [];
}

function timeAgo(date) {
  const diff = (Date.now() - date.getTime()) / 1000 / 60;
  if (isNaN(diff) || diff < 0) return "";
  if (diff < 60)   return `vor ${Math.round(diff)} min`;
  if (diff < 1440) return `vor ${Math.round(diff / 60)} h`;
  return `vor ${Math.round(diff / 1440)} T`;
}

function scoreArticle(title, description, categories) {
  const text = `${title} ${description}`.toLowerCase();
  let score = 0;
  for (const cat of categories) {
    const keywords = NEWS_CATEGORIES[cat] || [];
    for (const kw of keywords) {
      if (text.includes(kw)) score++;
    }
  }
  return score;
}

export async function fetchNews(selectedCategories) {
  // Fetch all feeds in parallel
  const results = await Promise.all(NEWS_SOURCES.map(fetchFeed));

  // Score each article per source
  const bySource = results.map((articles, i) => {
    if (articles.length === 0) return null;
    const scored = articles
      .map((a) => ({
        ...a,
        score: selectedCategories.length > 0
          ? scoreArticle(a.title, a.description, selectedCategories)
          : 1,
      }))
      .filter((a) => a.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored[0] || null; // best article per source
  }).filter(Boolean);

  // If we have fewer than 10, fill up with next-best from each source
  const top = [...bySource];
  if (top.length < 10) {
    const extras = results
      .flatMap((articles) => articles.slice(1)) // skip already-picked first
      .map((a) => ({
        ...a,
        score: selectedCategories.length > 0
          ? scoreArticle(a.title, a.description, selectedCategories)
          : 1,
      }))
      .filter((a) => a.score > 0)
      .sort((a, b) => b.score - a.score);

    for (const extra of extras) {
      if (top.length >= 10) break;
      if (!top.find((t) => t.title === extra.title)) top.push(extra);
    }
  }

  // Deduplicate and sort by date
  const seen = new Set();
  return top
    .filter((a) => {
      const key = a.title.slice(0, 40).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.pubDate - a.pubDate)
    .slice(0, 10);
}
