import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, SectionLabel } from "./Card";
import { MOCK_EVENTS } from "../data/static";

export function CalendarBlock({ t }) {
  return (
    <Card t={t}>
      <SectionLabel t={t}>Heute</SectionLabel>
      {MOCK_EVENTS.map((ev, i) => (
        <View
          key={i}
          style={[
            styles.row,
            i < MOCK_EVENTS.length - 1 && { borderBottomWidth: 1, borderBottomColor: t.divider, paddingBottom: 14, marginBottom: 14 },
          ]}
        >
          <Text style={[styles.time, { color: t.accent }]}>{ev.time}</Text>
          <View style={[styles.line, { backgroundColor: t.calColors[i % t.calColors.length] }]} />
          <View style={styles.info}>
            <Text style={[styles.title, { color: t.headline }]}>{ev.title}</Text>
            <Text style={[styles.duration, { color: t.faint }]}>{ev.duration}</Text>
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-start" },
  time: { fontSize: 12, fontWeight: "600", width: 44, paddingTop: 2, fontFamily: "Nunito_600SemiBold" },
  line: { width: 2, minHeight: 36, borderRadius: 1, marginHorizontal: 12 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: "600", marginBottom: 2, fontFamily: "Nunito_600SemiBold" },
  duration: { fontSize: 11, fontFamily: "Nunito_400Regular" },
});
