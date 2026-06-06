import React from "react";
import { Text, StyleSheet } from "react-native";
import { Card, SectionLabel } from "./Card";
import { getTodayQuestion } from "../data/questions";

const question = getTodayQuestion();

export function QuestionBlock({ t }) {
  return (
    <Card t={t}>
      <SectionLabel t={t}>Frage des Tages</SectionLabel>
      <Text style={[styles.question, { color: t.headline }]}>
        {question}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 15, lineHeight: 25,
    fontFamily: "Lora_400Regular",
  },
});
