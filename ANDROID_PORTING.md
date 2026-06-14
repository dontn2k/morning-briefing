---
tags: [morning-briefing, android, porting]
status: todo
updated: 2026-06-14
---

# ☀️ Morning Briefing — Android-Portierung

## Status

Morning Briefing ist in Expo (React Native) gebaut – Android-Support ist daher größtenteils kostenlos.
Die meisten Komponenten funktionieren ohne Änderungen. Diese Datei dokumentiert was geprüft und angepasst werden muss.

---

## 1. Schnelltest (kostenlos, sofort)

```bash
cd morning-briefing

# Android Emulator starten (Android Studio muss installiert sein)
~/Library/Android/sdk/emulator/emulator -avd Pixel_9 &

# App bauen und starten
npx expo run:android
```

Oder via Expo Go auf einem Android-Gerät:
```bash
npx expo start
# QR-Code mit Expo Go (Android) scannen
```

---

## 2. Bekannte Android-Unterschiede

### Navigation Bar & Safe Area
```js
// In App.js – paddingBottom für Android anpassen
paddingBottom: Platform.OS === "ios" ? 20 : 8,
// ✅ bereits eingebaut
```

### StatusBar
```js
// StatusBar Farbe auf Android explizit setzen
<StatusBar barStyle="dark-content" backgroundColor={t.bg} />
// ✅ bereits eingebaut
```

### Fonts
Expo Google Fonts funktionieren auf Android identisch – kein Handlungsbedarf.

### Notifications
`expo-notifications` funktioniert auf Android, aber **Expo Go unterstützt keine Remote Notifications**.
Lokale Notifications (wie wir sie nutzen) funktionieren vollständig im nativen Build.

Für Android muss in `app.json` ein Notification-Channel eingetragen werden:
```json
{
  "expo": {
    "android": {
      "package": "com.yourname.morningbriefing",
      "permissions": ["RECEIVE_BOOT_COMPLETED"]
    },
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#FCB97D",
          "defaultChannel": "default"
        }
      ]
    ]
  }
}
```

Notification-Icon anlegen (weißes Icon auf transparentem Hintergrund, 96×96 px):
```bash
# Einfachste Variante: weißes B auf transparent
# Datei: assets/notification-icon.png
```

### AsyncStorage
Funktioniert auf Android identisch – kein Handlungsbedarf.

### Linear Gradient (Shine-Animation)
`expo-linear-gradient` funktioniert auf Android – kein Handlungsbedarf.

### RSS-Feeds (News)
Auf Android kein CORS-Problem (wie auf iOS nativ) – direkte Abrufe funktionieren.
User-Agent Header bereits eingebaut – kein Handlungsbedarf.

### AbortController
`AbortSignal.timeout()` Inkompatibilität bereits gefixt (manuelle AbortController-Implementierung) – kein Handlungsbedarf.

---

## 3. app.json für Android erweitern

```json
{
  "expo": {
    "name": "Morning Briefing",
    "slug": "morning-briefing",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FAF6F0"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.yourname.morningbriefing",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.yourname.morningbriefing",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FAF6F0"
      },
      "permissions": ["RECEIVE_BOOT_COMPLETED"],
      "blockedPermissions": [
        "android.permission.RECORD_AUDIO"
      ]
    },
    "plugins": [
      "expo-font",
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#FCB97D",
          "defaultChannel": "default"
        }
      ]
    ]
  }
}
```

---

## 4. Adaptive Icon erstellen

Android braucht ein Adaptive Icon (Vordergrund-Ebene auf transparentem Hintergrund):

```bash
# assets/adaptive-icon.png
# 1024×1024 px
# Inhalt: nur das "B" ohne Hintergrundfarbe
# Hintergrundfarbe wird in app.json als backgroundColor gesetzt
```

Das Icon liegt bereits als `assets/icon.png` vor. Für das Adaptive Icon:
- Hintergrund: `#FAF6F0` (Warm Apricot) → in `app.json` als `backgroundColor`
- Vordergrund: nur das „B" auf transparentem Hintergrund

---

## 5. Build via EAS (empfohlen)

```bash
# EAS CLI installieren
npm install -g eas-cli

# Login
eas login

# Konfigurieren (einmalig)
eas build:configure

# Android Build
eas build --platform android

# → .aab Datei für Google Play
# → oder .apk für direktes Installieren zum Testen
```

**APK zum Testen (ohne Play Store):**
```bash
eas build --platform android --profile preview
```

In `eas.json`:
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  }
}
```

---

## 6. Checkliste Android-Test

- [ ] `npx expo run:android` im Emulator → App startet
- [ ] Alle 6 Blöcke werden angezeigt
- [ ] Wetter lädt (OWM API)
- [ ] News laden (RSS direkt, kein Proxy)
- [ ] Wikipedia lädt
- [ ] Einstellungen speichern (AsyncStorage)
- [ ] Notification erscheint wenn App im Hintergrund
- [ ] Farbthemen wechseln korrekt
- [ ] Drag-to-Reorder funktioniert
- [ ] Shine-Animation beim Start
- [ ] Schriften (Nunito + Lora) korrekt gerendert

---

## 7. Google Play – Besonderheiten

- **Closed Test Pflicht**: 12 Tester, 14 zusammenhängende Tage vor Produktionsfreigabe
- **Data Safety Formular**: Ausfüllen (keine Daten gesammelt, keine Weitergabe)
- **Target API Level**: muss aktuell sein (Android 14+, API 34+) – Expo 53 erfüllt das automatisch
- **Release Keystore**: Einmal erstellt, nie verlieren – sonst keine Updates mehr möglich

```bash
# Keystore erstellen (lokal, sicher aufbewahren!)
keytool -genkey -v -keystore morning-briefing-release.keystore \
  -alias morning-briefing -keyalg RSA -keysize 2048 -validity 10000
```

> [!danger]
> Keystore-Datei und Passwort **niemals ins Repo pushen** und **sicher sichern** (z.B. verschlüsselter USB-Stick + Cloud-Backup).
> Verlust = keine App-Updates mehr möglich.

---

## 8. Zeitplan

| Schritt | Aufwand | Blockiert auf |
|---|---|---|
| Emulator-Test | 1h | Android Studio installiert |
| app.json + Icons anpassen | 30 min | – |
| EAS Build Android | 20 min Build-Zeit | EAS Account (kostenlos) |
| APK auf echtem Gerät testen | 1h | Android-Gerät |
| Play Console anlegen | 1h | 25 USD Einmalgebühr |
| Closed Test (12 Tester, 14 Tage) | 14 Tage | Tester finden |
| Store-Eintrag + Review | 1h + ~7 Tage | – |
