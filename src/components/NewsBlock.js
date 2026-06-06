import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Card, SectionLabel } from "./Card";
import { fetchNews } from "../services/news";

export function NewsBlock({ t, selectedCategories }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const results = await fetchNews(selectedCategories || []);
      setArticles(results);
      setError(results.length === 0);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(selectedCategories)]);

  useEffect(() => { load(); }, [load]);

  return (
    <Card t={t}>
      <View style={styles.header}>
        <SectionLabel t={t}>News</SectionLabel>
        <TouchableOpacity
          onPress={load}
          style={[styles.refreshBtn, { backgroundColor: t.accentMuted }]}
        >
          <Text style={[styles.refreshText, { color: t.accent }]}>↻</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={[styles.placeholder, { color: t.faint }]}>Lade Nachrichten…</Text>
      ) : error ? (
        <Text style={[styles.placeholder, { color: t.faint }]}>Keine Artikel gefunden</Text>
      ) : (
        articles.map((n, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => n.url && Linking.openURL(n.url)}
            style={[
              i < articles.length - 1 && {
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
            <Text style={[styles.title, { color: t.headline }]} numberOfLines={2}>
              {n.title}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  refreshBtn: { width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  refreshText: { fontSize: 16, fontFamily: "Nunito_600SemiBold" },
  placeholder: { fontSize: 13, textAlign: "center", paddingVertical: 16, fontFamily: "Nunito_400Regular" },
  meta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  sourceBadge: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 20 },
  source: { fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  time: { fontSize: 11, fontFamily: "Nunito_400Regular" },
  title: { fontSize: 14, lineHeight: 20, fontFamily: "Nunito_400Regular" },
});
