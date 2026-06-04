import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, SectionLabel } from "./Card";
import { fetchWeather } from "../services/weather";

function WeatherPane({ cityName, t }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchWeather(cityName).then(setData);
  }, [cityName]);

  if (!data) {
    return (
      <View style={[styles.pane, { backgroundColor: t.bg }]}>
        <Text style={[styles.cityLabel, { color: t.muted }]}>{cityName}</Text>
        <Text style={[styles.loading, { color: t.faint }]}>Lade…</Text>
      </View>
    );
  }

  if (data.error) {
    return (
      <View style={[styles.pane, { backgroundColor: t.bg }]}>
        <Text style={[styles.cityLabel, { color: t.muted }]}>{cityName}</Text>
        <Text style={[styles.loading, { color: t.faint }]}>Nicht verfügbar</Text>
      </View>
    );
  }

  return (
    <View style={[styles.pane, { backgroundColor: t.bg }]}>
      <Text style={[styles.cityLabel, { color: t.muted }]}>{data.city}</Text>
      <View style={styles.tempRow}>
        <Text style={[styles.temp, { color: t.headline }]}>{data.temp}</Text>
        <Text style={styles.icon}>{data.icon}</Text>
      </View>
      <Text style={[styles.condition, { color: t.muted }]}>{data.condition}</Text>
      <View style={[styles.details, { borderTopColor: t.divider }]}>
        {[["↑", data.high], ["↓", data.low], ["💧", data.humidity]].map(([ic, val], i) => (
          <View key={i} style={styles.detailItem}>
            <Text style={styles.detailIcon}>{ic}</Text>
            <Text style={[styles.detailVal, { color: t.body }]}>{val}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function WeatherBlock({ t, city1, city2 }) {
  return (
    <Card t={t}>
      <SectionLabel t={t}>Wetter</SectionLabel>
      <View style={styles.row}>
        <WeatherPane cityName={city1} t={t} />
        <View style={{ width: 12 }} />
        <WeatherPane cityName={city2} t={t} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  pane: { flex: 1, borderRadius: 14, padding: 14 },
  cityLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "Nunito_600SemiBold",
  },
  tempRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  temp: { fontSize: 32, fontWeight: "300", fontFamily: "Lora_400Regular" },
  icon: { fontSize: 28 },
  condition: { fontSize: 11, marginBottom: 10, fontFamily: "Nunito_400Regular" },
  details: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, paddingTop: 8 },
  detailItem: { alignItems: "center" },
  detailIcon: { fontSize: 11, marginBottom: 2 },
  detailVal: { fontSize: 11, fontWeight: "500", fontFamily: "Nunito_600SemiBold" },
  loading: { fontSize: 12, marginTop: 10, fontFamily: "Nunito_400Regular" },
});
