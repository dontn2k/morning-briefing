import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Card({ children, t, style = {} }) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: t.cardBg,
          borderColor: t.cardBorder,
          shadowColor: t.shadowColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function SectionLabel({ children, t }) {
  return (
    <Text style={[styles.label, { color: t.label }]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 22,
    marginBottom: 14,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 14,
    fontFamily: "Nunito_600SemiBold",
  },
});
