export const GREETINGS = [
  { text: "Guten Morgen",    lang: "Deutsch"        },
  { text: "Buenos días",     lang: "Spanisch"        },
  { text: "Bonjour",         lang: "Französisch"     },
  { text: "Buongiorno",      lang: "Italienisch"     },
  { text: "Bom dia",         lang: "Portugiesisch"   },
  { text: "Good morning",    lang: "Englisch"        },
  { text: "Goedemorgen",     lang: "Niederländisch"  },
  { text: "God morgon",      lang: "Schwedisch"      },
  { text: "God morgen",      lang: "Norwegisch"      },
  { text: "Godmorgen",       lang: "Dänisch"         },
  { text: "Hyvää huomenta",  lang: "Finnisch"        },
  { text: "Dzień dobry",     lang: "Polnisch"        },
  { text: "Dobré ráno",      lang: "Tschechisch"     },
  { text: "Dobré ráno",      lang: "Slowakisch"      },
  { text: "Jó reggelt",      lang: "Ungarisch"       },
  { text: "Bună dimineața",  lang: "Rumänisch"       },
  { text: "Dobro jutro",     lang: "Kroatisch"       },
  { text: "Dobro jutro",     lang: "Serbisch"        },
  { text: "Dobar dan",       lang: "Bosnisch"        },
  { text: "Добро утро",      lang: "Bulgarisch"      },
  { text: "Добрий ранок",    lang: "Ukrainisch"      },
  { text: "Доброе утро",     lang: "Russisch"        },
  { text: "Tere hommikust",  lang: "Estnisch"        },
  { text: "Labrīt",          lang: "Lettisch"        },
  { text: "Labas rytas",     lang: "Litauisch"       },
  { text: "Mirëmëngjes",     lang: "Albanisch"       },
  { text: "Καλημέρα",        lang: "Griechisch"      },
  { text: "Günaydın",        lang: "Türkisch"        },
  { text: "Dobrý deň",       lang: "Slowenisch"      },
  { text: "Bon dia",         lang: "Katalanisch"     },
  { text: "Bongu",           lang: "Maltesisch"      },
  { text: "Góðan dag",       lang: "Isländisch"      },
  { text: "Maidin mhaith",   lang: "Irisch"          },
  { text: "Bore da",         lang: "Walisisch"       },
  { text: "Góðan morgun",    lang: "Färöisch"        },
  { text: "Bo día",          lang: "Galizisch"       },
  { text: "Bun di",          lang: "Rätoromanisch"   },
];

export const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
};

export const getTodayGreeting = () =>
  GREETINGS[getDayOfYear() % GREETINGS.length];
