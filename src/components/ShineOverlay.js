import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHINE_WIDTH = SCREEN_WIDTH * 0.6;

export function ShineOverlay() {
  const translateX = useRef(new Animated.Value(-SHINE_WIDTH)).current;
  const opacity    = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const delay = setTimeout(() => {
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: SCREEN_WIDTH + SHINE_WIDTH,
          duration: 950,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }, 350);
    return () => clearTimeout(delay);
  }, []);

  return (
    <Animated.View pointerEvents="none" style={[styles.overlay, { opacity }]}>
      <Animated.View style={[styles.shineWrap, { transform: [{ translateX }, { skewX: "-12deg" }] }]}>
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.22)", "rgba(255,255,255,0.08)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 999,
    overflow: "hidden",
  },
  shineWrap: {
    position: "absolute",
    top: 0, left: 0,
    width: SHINE_WIDTH,
    height: SCREEN_HEIGHT,
  },
  gradient: { flex: 1 },
});
