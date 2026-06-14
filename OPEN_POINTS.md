---
tags: [morning-briefing, release, todo]
status: in-progress
updated: 2026-06-14
---

# ☀️ Morning Briefing — Open Points & Release-Plan

> [!info] Stand
> App ist auf **iOS funktional fertig** (alle 6 Blöcke, Notifications, AsyncStorage, Icon, Shine-Animation).
> Läuft stabil im iOS Simulator via Expo Go.
> Letzter gesicherter Stand: GitHub `dontn2k/morning-briefing`, Branch `main`.

## ✅ Erledigt

- [x] 6 Inhaltsblöcke: Zitat, Frage, Wetter, Kalender, News, Wikipedia
- [x] 365 stoische Zitate (Marcus Aurelius, Seneca, Epiktet, Diogenes)
- [x] 365 Tagesfragen – ohne Journaling-Funktion
- [x] Tagesgruß in 37 europäischen Sprachen (deterministisch nach Tag des Jahres)
- [x] Echte Wetterdaten via OpenWeatherMap API (2 Städte, freie Texteingabe)
- [x] RSS News von 9 deutschen Blättern mit Keyword-Filter (10 Themen)
- [x] Wikipedia Zufallsartikel mit Refresh
- [x] 3 Farbthemen: Warm · Ocean · Violet
- [x] Drag-to-Reorder der Blöcke
- [x] Uhrzeit-Einstellung für Briefing (▲/▼ Picker)
- [x] Push Notifications (lokal, täglich zur eingestellten Uhrzeit)
- [x] AsyncStorage – alle Einstellungen persistent
- [x] Shine-Animation beim App-Start (expo-linear-gradient)
- [x] App Icon (warmes Apricot + „B" in Playfair Display)
- [x] Splash Screen
- [x] Notification-Tap öffnet immer Briefing-Screen
- [x] iOS Simulator getestet (iPhone 17 Pro, iOS 26.5)

## 🚀 Nächste Schritte (Release)

### 1. Apple Developer Account · 99 USD/Jahr · zuerst
- [ ] Unter developer.apple.com als „Individual" anmelden
- [ ] Zahlung abschließen (Aktivierung dauert 24–48h)
- [ ] Bundle ID reservieren: `com.yourname.morningbriefing` (in `app.json` anpassen)

### 2. Datenschutz-URL hosten · gratis
- [ ] `datenschutz.html` anlegen (Vorlage in `RELEASE_CHECKLIST.md`)
- [ ] Über GitHub Pages veröffentlichen (Repo `dontn2k/morning-briefing`)
- [ ] URL notieren → wird im App Store Connect gebraucht

### 3. Store-Material vorbereiten · gratis
- [ ] Screenshots erstellen (iPhone 6.7" – iPhone 15 Pro Max Simulator)
- [ ] Kurzbeschreibung (DE) – 1–2 Sätze
- [ ] Langbeschreibung (DE) – Features + Datenschutz-Hinweis
- [ ] App Icon final prüfen (1024×1024, kein Alpha-Kanal)

### 4. iOS Build + TestFlight
- [ ] EAS CLI installieren: `npm install -g eas-cli`
- [ ] `eas login` + `eas build:configure`
- [ ] `eas build --platform ios` → IPA in der Cloud bauen (~15 min)
- [ ] In App Store Connect hochladen
- [ ] TestFlight-Beta an Tester verteilen
- [ ] Letzter Test auf echtem iPhone

### 5. App Store Review
- [ ] App-Privacy-Angaben ausfüllen (keine Konten, keine Werbung, kein Tracking)
- [ ] Store-Eintrag + Material einreichen
- [ ] Review abwarten (meist 1–3 Tage)

### 6. Android-Portierung (parallel möglich)
- [ ] `npx expo run:android` testen
- [ ] Google Maps API Key anlegen (für Android-Karte – hier nicht nötig, aber für Wetter-Geocoding)
- [ ] `eas build --platform android` → AAB
- [ ] Google Play Console anlegen (25 USD einmalig)
- [ ] Closed Test: 12 Tester, 14 zusammenhängende Tage ⏳
- [ ] Data-Safety-Formular ausfüllen
- [ ] Store-Eintrag einreichen

> [!warning] Android-Zeitfresser
> Der 12-Tester-/14-Tage-Test bei Google Play ist der Engpass. Wenn Android ein Ziel ist: **parallel zu iOS starten**.

## 🔧 Offene technische Punkte

- [ ] **Kalender-Integration**: `expo-calendar` einbinden → echte Termine statt Mock-Daten
- [ ] **Uhrzeit-Picker**: Im nativen Build auf echte iOS-Walze (`DateTimePicker`) umstellen
- [ ] **News CORS**: Im Web-Modus läuft Proxy via allorigins.win – bei Ausfall Fallback einbauen
- [ ] **Notification-Sound**: Optionaler sanfter Ton beim Briefing
- [ ] **Themen-Erweiterung**: Mehr News-Kategorien, evtl. eigene RSS-URL eintragbar

## 💶 Kosten

| | |
|---|---|
| Apple Developer | **99 USD/Jahr** |
| Google Play | **25 USD einmalig** |
| OpenWeatherMap | **kostenlos** (bis 1.000 Calls/Tag) |
| EAS Build | **kostenlos** (Free Tier: 30 Builds/Monat) |

## ⚠️ Stolpersteine

> [!danger]
> - `.env` mit OWM-Key bleibt **lokal**, nie ins Repo pushen
> - `@types/react` Konflikt → immer `--legacy-peer-deps` bei `npm install`
> - Notifications im Expo Go eingeschränkt → vollständig erst im nativen Build
> - `main` in `package.json` muss `"node_modules/expo/AppEntry.js"` sein (nicht `expo-router/entry`)
> - Neue npm-Packages immer mit `npx expo install` statt `npm install` (richtige SDK-Version)

## 🔭 Ideen / Später

- [ ] Widget für iOS Home Screen (tägliches Zitat)
- [ ] iPad-Layout
- [ ] Mehrsprachige App-Oberfläche (DE/EN)
- [ ] Dunkelmodus
- [ ] Eigene Zitate hinzufügen
- [ ] Kalender-Anbindung (Apple Kalender / Google Kalender)
- [ ] Wetter: automatischer Standort (optional, mit Erlaubnis)
