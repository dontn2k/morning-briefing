import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, SectionLabel } from "./Card";
import { DAILY_QUOTE } from "../data/static";

export function QuoteBlock({ t }) {
  return (
    <Card t={t} style={{ backgroundColor: t.accentLight, borderWidth: 0 }}>
      <View style={[styles.circle, { backgroundColor: t.shapeFill }]} />
      <SectionLabel t={t}>Zitat des Tages</SectionLabel>
      <Text style={[styles.quote, { color: t.headline }]}>
        „{DAILY_QUOTE.text}"
      </Text>
      <Text style={[styles.author, { color: t.muted }]}>
        — {DAILY_QUOTE.author}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  quote: {
    fontSize: 16,
    lineHeight: 26,
    fontStyle: "italic",
    fontFamily: "Lora_400Regular_Italic",
    marginBottom: 12,
  },
  author: {
    fontSize: 12,
    fontFamily: "Nunito_400Regular",
  },
});
