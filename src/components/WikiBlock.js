import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, SectionLabel } from "./Card";
import { fetchWikiRandom } from "../services/wiki";

export function WikiBlock({ t }) {
  const [data, setData] = useState({ loading: true, title: "", extract: "", error: false });

  const load = useCallback(async () => {
    setData((d) => ({ ...d, loading: true, error: false }));
    const result = await fetchWikiRandom();
    setData({ loading: false, ...result });
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <Card t={t}>
      <View style={styles.header}>
        <SectionLabel t={t}>Wikipedia</SectionLabel>
        <TouchableOpacity
          onPress={load}
          style={[styles.refreshBtn, { backgroundColor: t.accentMuted }]}
        >
          <Text style={[styles.refreshText, { color: t.accent }]}>↻ Neu</Text>
        </TouchableOpacity>
      </View>

      {data.loading ? (
        <Text style={[styles.placeholder, { color: t.faint }]}>Lade Artikel…</Text>
      ) : data.error ? (
        <Text style={[styles.placeholder, { color: t.faint }]}>Kein Artikel verfügbar</Text>
      ) : (
        <>
          <Text style={[styles.title, { color: t.headline }]}>{data.title}</Text>
          <Text style={[styles.extract, { color: t.body }]}>{data.extract}</Text>
          <Text style={[styles.source, { color: t.faint }]}>de.wikipedia.org</Text>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  refreshBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  refreshText: { fontSize: 12, fontFamily: "Nunito_600SemiBold" },
  placeholder: { fontSize: 13, textAlign: "center", paddingVertical: 16, fontFamily: "Nunito_400Regular" },
  title: { fontSize: 15, fontWeight: "700", marginBottom: 8, lineHeight: 21, fontFamily: "Nunito_700Bold" },
  extract: { fontSize: 13, lineHeight: 20, fontFamily: "Nunito_400Regular" },
  source: { marginTop: 10, fontSize: 11, fontFamily: "Nunito_400Regular" },
});
