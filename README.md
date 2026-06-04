# Morning Briefing

> Dein tägliches persönliches Briefing – Zero Downtime, Zero Bullshit.

## Features

- **Tagesgruß** in einer rotierenden europäischen Sprache (37 Sprachen, täglich wechselnd)
- **Zitat des Tages**
- **Frage des Tages**
- **Wetter** – zwei Städte gleichzeitig via OpenWeatherMap API
- **Kalender** – Tagesübersicht
- **News** – nach Thema konfigurierbar
- **Wikipedia** – zufälliger Artikel mit Refresh-Button
- **3 Farbthemen**: Warm · Ocean · Violet
- **Drag-to-Reorder**: Reihenfolge der Blöcke frei anpassbar

---

## Setup

### 1. Dependencies installieren

```bash
npm install
```

### 2. OpenWeatherMap API Key

1. Kostenlosen Account erstellen: https://openweathermap.org/api
2. Unter „API Keys" den Default Key kopieren
3. In `.env` eintragen:

```
EXPO_PUBLIC_OWM_KEY=dein_key_hier
```

> **Hinweis:** Neue Keys werden von OpenWeatherMap erst nach ~10 Minuten aktiviert.

### 3. App starten

```bash
npx expo start
```

Dann QR-Code mit der **Expo Go** App scannen.

---

## Projektstruktur

```
morning-briefing/
├── App.js                        # Einstiegspunkt, Navigation, State
├── app.json                      # Expo Konfiguration
├── .env                          # API Keys (nicht ins Repo pushen!)
└── src/
    ├── components/
    │   ├── Card.js               # Shared Card + SectionLabel
    │   ├── QuoteBlock.js
    │   ├── QuestionBlock.js
    │   ├── WeatherBlock.js       # Dual-City mit OWM API
    │   ├── CalendarBlock.js
    │   ├── NewsBlock.js
    │   ├── WikiBlock.js          # Wikipedia Random API
    │   └── SettingsScreen.js     # Theme, Städte, News, Reorder
    ├── data/
    │   ├── greetings.js          # 37 europäische Sprachen
    │   └── static.js             # Städte, Mock-Daten, Labels
    ├── services/
    │   ├── weather.js            # OpenWeatherMap API
    │   └── wiki.js               # Wikipedia REST API
    └── themes/
        └── index.js              # Warm · Ocean · Violet
```

---

## Nächste Schritte

- [ ] Echte Kalender-Integration (expo-calendar)
- [ ] RSS News Feed Integration
- [ ] Push Notifications (tägliches Briefing um 06:00)
- [ ] AsyncStorage für persistente Einstellungen
- [ ] App Store Submission via EAS Build
