import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, SectionLabel } from "./Card";
import { MOCK_NEWS } from "../data/static";

export function NewsBlock({ t }) {
  return (
    <Card t={t}>
      <SectionLabel t={t}>News</SectionLabel>
      {MOCK_NEWS.map((n, i) => (
        <View
          key={i}
          style={[
            i < MOCK_NEWS.length - 1 && {
              borderBottomWidth: 1,
              borderBottomColor: t.divider,
              paddingBottom: 14,
              marginBottom: 14,
            },
          ]}
        >
          <View style={styles.meta}>
            <View style={[styles.sourceBadge, { backgroundColor: t.accentMuted }]}>
              <Text style={[styles.source, { color: t.accent }]}>{n.source}</Text>
            </View>
            <Text style={[styles.time, { color: t.fainter }]}>{n.time}</Text>
          </View>
          <Text style={[styles.title, { color: t.headline }]}>{n.title}</Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  meta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  sourceBadge: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 20 },
  source: { fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  time: { fontSize: 11, fontFamily: "Nunito_400Regular" },
  title: { fontSize: 14, lineHeight: 20, fontFamily: "Nunito_400Regular" },
});
