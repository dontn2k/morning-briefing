import React, { useState, useRef, useCallback } from "react";
import {
  View, Text, TouchableOpacity, ScrollView, TextInput,
  StyleSheet, Platform,
} from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { Card, SectionLabel } from "./Card";
import { THEMES } from "../themes";
import { CITIES, NEWS_FEEDS, BLOCK_LABELS } from "../data/static";


const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const DRUM_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

function DrumRoller({ values, selected, onSelect, t }) {
  const ref = useRef(null);
  const selectedIndex = values.indexOf(selected);

  const onMomentumScrollEnd = useCallback((e) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(index, values.length - 1));
    onSelect(values[clamped]);
  }, [values, onSelect]);

  const onScrollEnd = useCallback((e) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(index, values.length - 1));
    onSelect(values[clamped]);
  }, [values, onSelect]);

  return (
    <View style={[drumStyles.rollerWrap, { borderColor: t.divider }]}>
      {/* selection highlight */}
      <View style={[drumStyles.selectionBar, { backgroundColor: t.accentMuted, borderColor: t.accentBorder }]} pointerEvents="none" />
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentOffset={{ y: selectedIndex * ITEM_HEIGHT }}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEnd}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
        style={{ height: DRUM_HEIGHT }}
      >
        {values.map((val, i) => (
          <TouchableOpacity
            key={val}
            onPress={() => {
              ref.current?.scrollTo({ y: i * ITEM_HEIGHT, animated: true });
              onSelect(val);
            }}
            style={drumStyles.item}
          >
            <Text style={[
              drumStyles.itemText,
              { color: selected === val ? t.accent : t.faint },
              selected === val && drumStyles.itemTextSelected,
            ]}>
              {String(val).padStart(2, "0")}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const HOURS   = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

function TimePicker({ t, hour, setHour, minute, setMinute }) {
  return (
    <Card t={t}>
      <Text style={[drumStyles.tagline, { color: t.faint }]}>your time to brief</Text>
      <SectionLabel t={t}>Briefing-Uhrzeit</SectionLabel>
      <View style={drumStyles.pickerRow}>
        <DrumRoller values={HOURS}   selected={hour}   onSelect={setHour}   t={t} />
        <Text style={[drumStyles.colon, { color: t.headline }]}>:</Text>
        <DrumRoller values={MINUTES} selected={minute} onSelect={setMinute} t={t} />
      </View>
      <Text style={[drumStyles.preview, { color: t.muted }]}>
        Täglich um {String(hour).padStart(2,"0")}:{String(minute).padStart(2,"0")} Uhr
      </Text>
    </Card>
  );
}

const drumStyles = StyleSheet.create({
  tagline: {
    fontSize: 11, fontFamily: "Lora_400Regular_Italic",
    textAlign: "center", marginBottom: 6, letterSpacing: 0.5,
  },
  pickerRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 8, marginBottom: 14,
  },
  rollerWrap: {
    width: 72, borderRadius: 16, overflow: "hidden",
    borderWidth: 1, position: "relative",
  },
  selectionBar: {
    position: "absolute", top: ITEM_HEIGHT * 2,
    left: 0, right: 0, height: ITEM_HEIGHT,
    borderTopWidth: 1, borderBottomWidth: 1,
    zIndex: 1, pointerEvents: "none",
  },
  item: {
    height: ITEM_HEIGHT, justifyContent: "center", alignItems: "center",
  },
  itemText: {
    fontSize: 22, fontFamily: "Lora_400Regular", letterSpacing: 1,
  },
  itemTextSelected: {
    fontSize: 26, fontFamily: "Lora_600SemiBold",
  },
  colon: {
    fontSize: 28, fontFamily: "Lora_600SemiBold", marginBottom: 4,
  },
  preview: {
    textAlign: "center", fontSize: 12,
    fontFamily: "Nunito_400Regular",
  },
});

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
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (trimmed.length > 1) {
      onSelect(trimmed);
      setInput("");
    }
  };

  return (
    <>
      <Text style={[styles.subLabel, { color: t.muted }]}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSubmit}
          placeholder="Stadt oder PLZ eingeben…"
          placeholderTextColor={t.fainter}
          returnKeyType="done"
          style={[styles.textInput, { color: t.headline, borderColor: t.cardBorder, backgroundColor: t.bg }]}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.inputBtn, { backgroundColor: t.accentLight }]}
        >
          <Text style={[styles.inputBtnText, { color: t.accent }]}>OK</Text>
        </TouchableOpacity>
      </View>
      {selected ? (
        <View style={[styles.selectedCity, { backgroundColor: t.accentLight, borderColor: t.accent }]}>
          <Text style={[styles.selectedCityText, { color: t.accent }]}>📍 {selected}</Text>
        </View>
      ) : null}
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

export function SettingsScreen({ t, city1, setCity1, city2, setCity2, newsFeed, setNewsFeed, themeKey, setThemeKey, order, setOrder, hour, setHour, minute, setMinute }) {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <TimePicker t={t} hour={hour} setHour={setHour} minute={minute} setMinute={setMinute} />
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
  inputRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  textInput: {
    flex: 1, borderWidth: 1, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 9,
    fontSize: 13, fontFamily: "Nunito_400Regular",
  },
  inputBtn: {
    paddingHorizontal: 16, paddingVertical: 9,
    borderRadius: 12, justifyContent: "center",
  },
  inputBtnText: { fontSize: 13, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  selectedCity: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1.5,
    marginBottom: 10, alignSelf: "flex-start",
  },
  selectedCityText: { fontSize: 13, fontFamily: "Nunito_600SemiBold" },
});
