import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, SectionLabel } from "./Card";
import { DAILY_QUESTION } from "../data/static";

export function QuestionBlock({ t }) {
  return (
    <Card t={t}>
      <SectionLabel t={t}>Frage des Tages</SectionLabel>
      <Text style={[styles.question, { color: t.headline }]}>
        {DAILY_QUESTION}
      </Text>
      <View style={[styles.answerBox, { backgroundColor: t.accentMuted, borderColor: t.fainter }]}>
        <Text style={[styles.answerPlaceholder, { color: t.fainter }]}>
          Deine Antwort…
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 15,
    lineHeight: 25,
    fontFamily: "Lora_400Regular",
    marginBottom: 14,
  },
  answerBox: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  answerPlaceholder: {
    fontSize: 13,
    fontFamily: "Nunito_400Regular",
  },
});
