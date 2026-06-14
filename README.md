# ☀️ Morning Briefing

> Dein tägliches persönliches Briefing – ruhig, intentional, ohne Registrierung.

---

## Features

| Block | Inhalt |
|---|---|
| **Zitat** | 365 stoische Zitate (Marcus Aurelius, Seneca, Epiktet, Diogenes) – täglich rotierend |
| **Frage** | 365 Reflexionsfragen – täglich rotierend, kein Journaling |
| **Wetter** | Zwei Städte gleichzeitig via OpenWeatherMap API |
| **Kalender** | Tagesübersicht (aktuell Mock, Kalender-Integration geplant) |
| **News** | RSS-Feeds von 9 deutschsprachigen Blättern, Keyword-gefiltert nach Thema |
| **Wikipedia** | Zufälliger Artikel mit Titel + erstem Satz, Refresh-Button |

### App-Features
- Tagesgruß in 37 europäischen Sprachen (täglich rotierend, deterministisch)
- 3 Farbthemen: Warm · Ocean · Violet
- Drag-to-Reorder: Reihenfolge der Blöcke frei anpassbar
- Push Notifications zur eingestellten Uhrzeit
- Shine-Animation beim App-Start
- AsyncStorage: alle Einstellungen persistent
- Keine Registrierung, kein Account, kein Tracking

---

## Tech Stack

| | |
|---|---|
| **Framework** | Expo SDK 53 (React Native 0.79) |
| **Sprache** | JavaScript (JSX) |
| **Fonts** | Nunito + Lora (Google Fonts via expo-google-fonts) |
| **Storage** | AsyncStorage |
| **Animationen** | expo-linear-gradient, React Native Animated |
| **Notifications** | expo-notifications |
| **APIs** | OpenWeatherMap (Wetter), Wikipedia REST API, RSS-Feeds |

---

## Projektstruktur

```
morning-briefing/
├── App.js                        # Einstiegspunkt, Navigation, State, AsyncStorage
├── app.json                      # Expo Konfiguration
├── .env                          # API Keys (nicht im Repo!)
└── src/
    ├── components/
    │   ├── Card.js               # Shared Card + SectionLabel
    │   ├── QuoteBlock.js         # Zitat des Tages
    │   ├── QuestionBlock.js      # Frage des Tages
    │   ├── WeatherBlock.js       # Dual-City Wetter
    │   ├── CalendarBlock.js      # Kalender
    │   ├── NewsBlock.js          # RSS News
    │   ├── WikiBlock.js          # Wikipedia Random
    │   ├── SettingsScreen.js     # Alle Einstellungen + Drag-Reorder
    │   └── ShineOverlay.js       # Shine-Animation
    ├── data/
    │   ├── greetings.js          # 37 europäische Grüße
    │   ├── quotes.js             # 365 stoische Zitate
    │   ├── questions.js          # 365 Tagesfragen
    │   └── static.js             # Städte, Labels, Defaults
    ├── services/
    │   ├── weather.js            # OpenWeatherMap API
    │   ├── wiki.js               # Wikipedia REST API
    │   ├── news.js               # RSS-Feeds + Keyword-Filter
    │   └── notifications.js      # Lokale Push Notifications
    └── themes/
        └── index.js              # Warm · Ocean · Violet
```

---

## Setup

### 1. Repository klonen

```bash
git clone https://github.com/dontn2k/morning-briefing.git
cd morning-briefing
```

### 2. Dependencies installieren

```bash
npm install --legacy-peer-deps
```

### 3. API Key eintragen

OpenWeatherMap Key kostenlos holen: https://openweathermap.org/api

```bash
# .env anlegen
echo "EXPO_PUBLIC_OWM_KEY=dein_key_hier" > .env
```

### 4. App starten

```bash
# iOS Simulator
npx expo start --ios

# Web (für schnelle Entwicklung)
npx expo start --web

# Android Emulator
npx expo start --android
```

---

## Build-Spickzettel

**iOS (Simulator):**
```bash
npx expo start --ios
```

**iOS (Device/TestFlight) via EAS:**
```bash
npm install -g eas-cli
eas login
eas build --platform ios
```

**Android:**
```bash
npx expo start --android
# oder via EAS:
eas build --platform android
```

---

## News-Quellen

| Quelle | Feed |
|---|---|
| Spiegel | `spiegel.de/schlagzeilen/tops/index.rss` |
| Zeit | `newsfeed.zeit.de/all` |
| FAZ | `faz.net/rss/aktuell/` |
| Süddeutsche | `rss.sueddeutsche.de/alles` |
| Welt | `welt.de/feeds/latest.rss` |
| Heise | `heise.de/rss/heise-atom.xml` |
| Tagesschau | `tagesschau.de/infoservices/alle-meldungen-100~rss2.xml` |
| NZZ | `nzz.ch/recent.rss` |
| Stern | `stern.de/feed/standard/alle-artikel/` |
| Handelsblatt | `handelsblatt.com/contentexport/feed/schlagzeilen` |

---

## Bekannte Einschränkungen

- **CORS im Web-Modus**: RSS-Feeds laufen im Browser via Proxy (allorigins.win). Im nativen Build (iOS/Android) direkter Abruf.
- **Kalender**: Aktuell Mock-Daten. Echte Kalender-Integration (`expo-calendar`) ist geplant.
- **Notifications**: Im Expo Go eingeschränkt. Vollständig funktional im nativen Build.

---

## Lizenz

MIT
