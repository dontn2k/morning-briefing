import React, { useState, useCallback, useEffect } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Platform,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  Lora_400Regular,
  Lora_400Regular_Italic,
  Lora_600SemiBold,
} from "@expo-google-fonts/lora";
import * as SplashScreen from "expo-splash-screen";

import { THEMES } from "./src/themes";
import { getTodayGreeting } from "./src/data/greetings";
import { DEFAULT_ORDER } from "./src/data/static";

import { QuoteBlock }     from "./src/components/QuoteBlock";
import { QuestionBlock }  from "./src/components/QuestionBlock";
import { WeatherBlock }   from "./src/components/WeatherBlock";
import { CalendarBlock }  from "./src/components/CalendarBlock";
import { NewsBlock }      from "./src/components/NewsBlock";
import { WikiBlock }      from "./src/components/WikiBlock";
import { SettingsScreen } from "./src/components/SettingsScreen";

SplashScreen.preventAutoHideAsync();

const todayStr = new Date().toLocaleDateString("de-DE", {
  weekday: "long", day: "numeric", month: "long",
});
const todayGreeting = getTodayGreeting();

const STORAGE_KEY = "@morning_briefing_settings";

export default function App() {
  const [screen, setScreen]     = useState("briefing");
  const [themeKey, setThemeKey] = useState("warm");
  const [city1, setCity1]       = useState("Frankfurt");
  const [city2, setCity2]       = useState("Berlin");
  const [newsCategories, setNewsCategories] = useState(["Politik", "Wirtschaft"]);
  const [order, setOrder]       = useState(DEFAULT_ORDER);
  const [hour, setHour]         = useState(6);
  const [minute, setMinute]     = useState(0);
  const [loaded, setLoaded]     = useState(false);

  // ── Load settings on start ──────────────────────────────────────────────────
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const s = JSON.parse(raw);
          if (s.themeKey) setThemeKey(s.themeKey);
          if (s.city1)    setCity1(s.city1);
          if (s.city2)    setCity2(s.city2);
          if (s.newsCategories) setNewsCategories(s.newsCategories);
          if (s.order)    setOrder(s.order);
          if (s.hour   !== undefined) setHour(s.hour);
          if (s.minute !== undefined) setMinute(s.minute);
        } catch {}
      }
      setLoaded(true);
    });
  }, []);

  // ── Save settings on every change ──────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
      themeKey, city1, city2, newsCategories, order, hour, minute,
    }));
  }, [themeKey, city1, city2, newsCategories, order, hour, minute, loaded]);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Lora_400Regular,
    Lora_400Regular_Italic,
    Lora_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && loaded) await SplashScreen.hideAsync();
  }, [fontsLoaded, loaded]);

  if (!fontsLoaded || !loaded) return null;

  const t = THEMES[themeKey];

  const renderBlock = (id) => {
    switch (id) {
      case "quote":    return <QuoteBlock    key={id} t={t} />;
      case "question": return <QuestionBlock key={id} t={t} />;
      case "weather":  return <WeatherBlock  key={id} t={t} city1={city1} city2={city2} />;
      case "calendar": return <CalendarBlock key={id} t={t} />;
      case "news":     return <NewsBlock     key={id} t={t} selectedCategories={newsCategories} />;
      case "wiki":     return <WikiBlock     key={id} t={t} />;
      default: return null;
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.safe, { backgroundColor: t.bg }]} onLayout={onLayoutRootView}>
        <StatusBar barStyle="dark-content" backgroundColor={t.bg} />

        {/* ── Header ── */}
        <View style={[styles.header, { backgroundColor: t.bg }]}>
          <View style={[styles.headerGlow, { backgroundColor: t.shapeFill }]} />
          <Text style={[styles.headerEyebrow, { color: t.label }]}>
            {screen === "briefing" ? "Morning Briefing" : "Einstellungen"}
          </Text>
          <Text style={[styles.headerTitle, { color: t.headline }]}>
            {screen === "briefing" ? `${todayGreeting.text}.` : "Anpassen"}
          </Text>
          {screen === "briefing" && (
            <>
              <Text style={[styles.headerLang, { color: t.faint }]}>{todayGreeting.lang}</Text>
              <Text style={[styles.headerDate, { color: t.muted }]}>{todayStr}</Text>
            </>
          )}
        </View>

        {/* ── Content ── */}
        {screen === "briefing" ? (
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            {order.map(renderBlock)}
            <Text style={[styles.footer, { color: t.fainter }]}>
              Briefing um {String(hour).padStart(2,"0")}:{String(minute).padStart(2,"0")} Uhr
            </Text>
          </ScrollView>
        ) : (
          <SettingsScreen
            t={t}
            city1={city1}       setCity1={setCity1}
            city2={city2}       setCity2={setCity2}
            newsCategories={newsCategories} setNewsCategories={setNewsCategories}
            themeKey={themeKey} setThemeKey={setThemeKey}
            order={order}       setOrder={setOrder}
            hour={hour}         setHour={setHour}
            minute={minute}     setMinute={setMinute}
          />
        )}

        {/* ── Bottom Nav ── */}
        <View style={[styles.nav, { backgroundColor: t.navBg, borderTopColor: t.navBorder }]}>
          {[
            { id: "briefing", label: "Briefing", icon: "🌤" },
            { id: "settings", label: "Anpassen", icon: "⚙️" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setScreen(tab.id)}
              style={styles.navTab}
            >
              <Text style={styles.navIcon}>{tab.icon}</Text>
              <Text style={[styles.navLabel, { color: screen === tab.id ? t.accent : t.faint, fontWeight: screen === tab.id ? "700" : "400" }]}>
                {tab.label}
              </Text>
              {screen === tab.id && (
                <View style={[styles.navDot, { backgroundColor: t.accent }]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 22,
    paddingTop: Platform.OS === "android" ? 20 : 12,
    paddingBottom: 20,
    overflow: "hidden",
  },
  headerGlow: {
    position: "absolute", top: -60, right: -60,
    width: 220, height: 220, borderRadius: 110,
  },
  headerEyebrow: {
    fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
    fontFamily: "Nunito_600SemiBold", marginBottom: 6,
  },
  headerTitle: {
    fontSize: 26, fontFamily: "Lora_600SemiBold",
    letterSpacing: -0.3, lineHeight: 32,
  },
  headerLang: {
    fontSize: 11, letterSpacing: 1, marginTop: 4,
    fontFamily: "Nunito_400Regular",
  },
  headerDate: {
    fontSize: 13, marginTop: 3,
    fontFamily: "Nunito_400Regular",
  },
  scroll: { paddingHorizontal: 18, paddingBottom: 20 },
  footer: {
    textAlign: "center", fontSize: 11,
    fontFamily: "Nunito_400Regular", marginTop: 4, marginBottom: 12,
  },
  nav: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingBottom: Platform.OS === "ios" ? 20 : 8,
  },
  navTab: {
    flex: 1, alignItems: "center", paddingTop: 12, gap: 4,
  },
  navIcon: { fontSize: 22, lineHeight: 26 },
  navLabel: {
    fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase",
    fontFamily: "Nunito_600SemiBold",
  },
  navDot: { width: 20, height: 2, borderRadius: 1, marginTop: 2 },
});
