import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Platform,
} from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { Card, SectionLabel } from "./Card";
import { THEMES } from "../themes";
import { CITIES, NEWS_FEEDS, BLOCK_LABELS } from "../data/static";

function ThemePicker({ t, themeKey, setThemeKey }) {
  return (
    <Card t={t}>
      <SectionLabel t={t}>Farbschema</SectionLabel>
      <View style={styles.themeRow}>
        {Object.entries(THEMES).map(([key, theme]) => {
          const active = themeKey === key;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => setThemeKey(key)}
              style={[
                styles.themeBtn,
                { backgroundColor: active ? theme.accentLight : t.bg, borderColor: active ? theme.accent : t.cardBorder, borderWidth: active ? 2 : 1 },
              ]}
            >
              <View style={styles.swatchRow}>
                {theme.swatches.map((c, i) => (
                  <View key={i} style={[styles.swatch, { backgroundColor: c }]} />
                ))}
              </View>
              <Text style={[styles.themeName, { color: active ? theme.accent : t.muted }]}>{theme.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
}

function CityPicker({ label, selected, onSelect, t }) {
  return (
    <>
      <Text style={[styles.subLabel, { color: t.muted }]}>{label}</Text>
      <View style={styles.cityWrap}>
        {CITIES.map((city) => (
          <TouchableOpacity
            key={city}
            onPress={() => onSelect(city)}
            style={[
              styles.chip,
              { borderColor: selected === city ? t.accent : t.cardBorder, backgroundColor: selected === city ? t.accentLight : t.bg, borderWidth: selected === city ? 1.5 : 1 },
            ]}
          >
            <Text style={[styles.chipText, { color: selected === city ? t.accent : t.muted }]}>{city}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

function ReorderList({ order, setOrder, t }) {
  const renderItem = ({ item, drag, isActive }) => (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[
          styles.dragRow,
          { backgroundColor: isActive ? t.accentLight : t.cardBg, borderColor: isActive ? t.accent : t.cardBorder },
        ]}
      >
        <View style={styles.handleWrap}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[styles.handleBar, { backgroundColor: t.faint }]} />
          ))}
        </View>
        <Text style={[styles.dragLabel, { color: t.headline }]}>{BLOCK_LABELS[item]}</Text>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <Card t={t}>
      <SectionLabel t={t}>Reihenfolge</SectionLabel>
      <Text style={[styles.hint, { color: t.muted }]}>Gedrückt halten & ziehen</Text>
      <DraggableFlatList
        data={order}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        onDragEnd={({ data }) => setOrder(data)}
        scrollEnabled={false}
      />
    </Card>
  );
}

export function SettingsScreen({ t, city1, setCity1, city2, setCity2, newsFeed, setNewsFeed, themeKey, setThemeKey, order, setOrder }) {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <ThemePicker t={t} themeKey={themeKey} setThemeKey={setThemeKey} />

      <Card t={t}>
        <SectionLabel t={t}>Wetter · Städte</SectionLabel>
        <CityPicker label="Mein Standort" selected={city1} onSelect={setCity1} t={t} />
        <View style={{ height: 16 }} />
        <CityPicker label="Fester Ort" selected={city2} onSelect={setCity2} t={t} />
      </Card>

      <Card t={t}>
        <SectionLabel t={t}>News · Thema</SectionLabel>
        {NEWS_FEEDS.map((feed) => (
          <TouchableOpacity
            key={feed}
            onPress={() => setNewsFeed(feed)}
            style={[
              styles.feedRow,
              { borderColor: newsFeed === feed ? t.accentBorder : t.cardBorder, backgroundColor: newsFeed === feed ? t.accentLight : t.bg, borderWidth: newsFeed === feed ? 1.5 : 1 },
            ]}
          >
            <Text style={[styles.feedText, { color: newsFeed === feed ? t.accent : t.muted }]}>{feed}</Text>
            {newsFeed === feed && <View style={[styles.dot, { backgroundColor: t.accent }]} />}
          </TouchableOpacity>
        ))}
      </Card>

      <ReorderList order={order} setOrder={setOrder} t={t} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, paddingBottom: 40 },
  themeRow: { flexDirection: "row", gap: 10 },
  themeBtn: { flex: 1, padding: 14, borderRadius: 16, alignItems: "center", gap: 8 },
  swatchRow: { flexDirection: "row", gap: 4 },
  swatch: { width: 13, height: 13, borderRadius: 6.5 },
  themeName: { fontSize: 11, fontFamily: "Nunito_600SemiBold" },
  subLabel: { fontSize: 11, marginBottom: 8, fontFamily: "Nunito_400Regular" },
  cityWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  chipText: { fontSize: 12, fontFamily: "Nunito_400Regular" },
  feedRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, borderRadius: 12, marginBottom: 8 },
  feedText: { fontSize: 14, fontFamily: "Nunito_400Regular" },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dragRow: { flexDirection: "row", alignItems: "center", gap: 14, padding: 13, borderRadius: 14, borderWidth: 1, marginBottom: 8 },
  handleWrap: { gap: 4 },
  handleBar: { width: 18, height: 2, borderRadius: 1 },
  dragLabel: { fontSize: 14, fontFamily: "Nunito_400Regular" },
  hint: { fontSize: 12, marginBottom: 14, fontFamily: "Nunito_400Regular" },
});
