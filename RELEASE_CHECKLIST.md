---
tags: [morning-briefing, release, legal]
status: in-progress
updated: 2026-06-14
---

# ☀️ Morning Briefing — Release-Checkliste & Rechtliches

## 1. Impressum (für GitHub Pages)

Erstelle eine Datei `impressum.html` im Repo und veröffentliche sie via GitHub Pages.

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Impressum – Morning Briefing</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 40px auto; padding: 0 20px; color: #333; }
    h1 { font-size: 1.4rem; }
  </style>
</head>
<body>
  <h1>Impressum</h1>
  <p>Angaben gemäß § 5 TMG</p>
  <p>
    [DEIN NAME]<br>
    [STRASSE HAUSNUMMER]<br>
    [PLZ ORT]<br>
    Deutschland
  </p>
  <p>
    <strong>Kontakt:</strong><br>
    E-Mail: [DEINE E-MAIL]
  </p>
  <p>
    <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br>
    [DEIN NAME], [ADRESSE WIE OBEN]
  </p>
  <hr>
  <h2>Haftungsausschluss</h2>
  <p>Die Inhalte dieser App werden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
  und Aktualität der Inhalte übernehme ich keine Gewähr. Wikipedia-Inhalte stammen von
  <a href="https://de.wikipedia.org">de.wikipedia.org</a> und unterliegen der
  <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0 Lizenz</a>.
  Wetterdaten stammen von <a href="https://openweathermap.org">OpenWeatherMap</a>.
  Nachrichteninhalte stammen von den jeweiligen Verlagen.</p>
</body>
</html>
```

---

## 2. Datenschutzerklärung (für App Store + Google Play)

Erstelle eine Datei `datenschutz.html`:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Datenschutzerklärung – Morning Briefing</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 40px auto; padding: 0 20px; color: #333; }
    h1 { font-size: 1.4rem; }
    h2 { font-size: 1.1rem; margin-top: 2em; }
  </style>
</head>
<body>
  <h1>Datenschutzerklärung</h1>
  <p>Stand: [DATUM]</p>

  <h2>1. Verantwortlicher</h2>
  <p>[DEIN NAME], [ADRESSE], [E-MAIL]</p>

  <h2>2. Welche Daten werden verarbeitet?</h2>
  <p>Morning Briefing verarbeitet <strong>keine personenbezogenen Daten</strong>.
  Es wird keine Registrierung, kein Account und kein Login benötigt.</p>

  <h2>3. Lokale Speicherung</h2>
  <p>Einstellungen (Farbthema, Städte, Reihenfolge der Blöcke, Briefing-Uhrzeit) werden
  ausschließlich lokal auf dem Gerät gespeichert (AsyncStorage). Diese Daten werden
  nicht an Server übertragen.</p>

  <h2>4. Externe Dienste</h2>
  <ul>
    <li><strong>OpenWeatherMap</strong> (openweathermap.org): Abruf von Wetterdaten für die eingestellten Städte.
    Es werden keine Standortdaten übermittelt, nur der eingegebene Stadtname.</li>
    <li><strong>Wikipedia</strong> (de.wikipedia.org): Abruf von Artikeln via REST API.
    Es werden keine personenbezogenen Daten übermittelt.</li>
    <li><strong>RSS-Feeds</strong>: Nachrichtenartikel werden direkt von den Verlagsservern abgerufen.
    Dabei können die üblichen Server-Log-Daten (IP-Adresse, Zeitstempel) anfallen.
    Morning Briefing speichert diese Daten nicht.</li>
  </ul>

  <h2>5. Push Notifications</h2>
  <p>Die App verschickt lokale Push Notifications zur eingestellten Uhrzeit.
  Diese werden ausschließlich lokal auf dem Gerät erzeugt und nicht über externe Server geleitet.</p>

  <h2>6. Tracking & Werbung</h2>
  <p>Morning Briefing enthält <strong>kein Tracking, keine Werbung und keine Analyse-Tools</strong>.</p>

  <h2>7. Kontakt</h2>
  <p>Bei Fragen zum Datenschutz: [DEINE E-MAIL]</p>

  <h2>8. Aufsichtsbehörde</h2>
  <p>Zuständige Datenschutz-Aufsichtsbehörde: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA),
  Promenade 18, 91522 Ansbach, www.lda.bayern.de</p>
</body>
</html>
```

---

## 3. GitHub Pages aktivieren

```bash
# Dateien ins Repo
cd morning-briefing
mkdir -p docs
cp impressum.html docs/
cp datenschutz.html docs/

git add docs/
git commit -m "docs: Impressum und Datenschutzerklärung"
git push
```

Dann auf GitHub: **Settings → Pages → Source: main, /docs** → Save.

URLs werden dann:
- `https://dontn2k.github.io/morning-briefing/impressum.html`
- `https://dontn2k.github.io/morning-briefing/datenschutz.html`

---

## 4. app.json finalisieren

```json
{
  "expo": {
    "name": "Morning Briefing",
    "slug": "morning-briefing",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.DEINNAME.morningbriefing",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.DEINNAME.morningbriefing",
      "versionCode": 1
    }
  }
}
```

---

## 5. App Store Connect – Checkliste

- [ ] App Store Connect aufrufen: appstoreconnect.apple.com
- [ ] Neue App anlegen → Bundle ID eintragen
- [ ] App-Name: „Morning Briefing"
- [ ] Kurzbeschreibung (170 Zeichen):
  > Dein tägliches Morgen-Briefing: stoische Zitate, eine Reflexionsfrage, Wetter, News und Wikipedia – täglich neu, ohne Registrierung.
- [ ] Schlüsselwörter: `briefing, morgen, zitat, stoiker, wetter, nachrichten, wikipedia, täglich`
- [ ] Datenschutz-URL eintragen: `https://dontn2k.github.io/morning-briefing/datenschutz.html`
- [ ] Support-URL: GitHub Repo oder eigene Website
- [ ] Screenshots: iPhone 6.7" (mindestens 3)
- [ ] App Privacy:
  - Daten von Drittanbietern: Nein
  - Tracking: Nein
  - Nutzerdaten gesammelt: Nein

---

## 6. Google Play Console – Checkliste

- [ ] Play Console: play.google.com/console (25 USD einmalig)
- [ ] Neue App → „Morning Briefing", Deutsch, kostenlos
- [ ] Kurzbeschreibung (80 Zeichen):
  > Tägliches Briefing: Zitat, Frage, Wetter & News – ohne Account.
- [ ] Langbeschreibung: siehe unten
- [ ] Feature-Graphic: 1024×500 px
- [ ] Screenshots: Telefon (mindestens 2)
- [ ] Datenschutz-URL: `https://dontn2k.github.io/morning-briefing/datenschutz.html`
- [ ] Data Safety:
  - Keine Daten erhoben
  - Keine Daten geteilt
  - Daten verschlüsselt: Ja (HTTPS)
- [ ] Closed Test: 12 Tester einladen, 14 Tage warten ⏳

### Langbeschreibung (DE):
```
Morning Briefing startet deinen Tag ruhig und intentional.

Täglich neu, ohne Registrierung, ohne Account:

• Stoisches Zitat – täglich ein anderes von Marcus Aurelius, Seneca, Epiktet oder Diogenes
• Reflexionsfrage – 365 Fragen, zum Nachdenken nicht zum Journaling
• Tagesgruß – jeden Tag in einer anderen europäischen Sprache
• Wetter – zwei Städte deiner Wahl, live via OpenWeatherMap
• News – gefiltert nach deinen Themen aus 9 deutschsprachigen Blättern
• Wikipedia – täglich ein zufälliger Artikel

Einstellbar: Farbthema, Reihenfolge der Blöcke, Briefing-Uhrzeit mit täglicher Erinnerung.

Keine Werbung. Kein Tracking. Keine Datensammlung.
```
