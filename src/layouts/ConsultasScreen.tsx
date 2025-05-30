import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { Stack } from "expo-router";

export default function ConsultasScreen() {
  const links = [
    {
      title: "Técnicas de Relajación",
      url: "https://www.youtube.com/watch?v=92i5m3tV5XY",
    },
    {
      title: "Meditación Guiada",
      url: "https://www.youtube.com/watch?v=inpok4MKVLM",
    },
    {
      title: "Ejercicios de Respiración",
      url: "https://www.youtube.com/watch?v=tA2kT8eSjtg",
    },
    {
      title: "Yoga para Principiantes",
      url: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
    },

  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "" }} />

      <Animated.View style={styles.header} entering={FadeInUp.duration(600)}>
        <Text style={styles.headerTitle}>Consultas - Videos</Text>
        <Text style={styles.headerSubtitle}>
          Basado en el resultado de la evaluación, el sistema proporcionará sugerencias
          personalizadas como técnicas de relajación, meditación, y ejercicios físicos.
        </Text>
      </Animated.View>

      <Animated.View style={styles.box} entering={FadeIn.delay(300).duration(600)}>
        <Text style={styles.boxTitle}>Recursos Educativos Recomendados</Text>
        {links.map((link, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(link.url)}>
            <Text style={styles.link}>- {link.title}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 16 },

  header: {
    backgroundColor: "#4c5c94",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#ecf0f1",
    fontSize: 14,
    textAlign: "center",
  },

  box: {
    backgroundColor: "#eef5e9",
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },
  boxTitle: {
    color: "#3a6c2f",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  link: {
    fontSize: 14,
    color: "#2b4a2f",
    marginBottom: 8,
  },
});

