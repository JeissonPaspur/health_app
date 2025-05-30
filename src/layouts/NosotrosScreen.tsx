import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { Stack } from "expo-router";

export default function NosotrosScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "" }} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Animated.View style={styles.header} entering={FadeInUp.duration(500)}>
          <Text style={styles.title}>Acerca de Nosotros</Text>
          <Text style={styles.subtitle}>Bienestar y salud mental al alcance de todos</Text>
        </Animated.View>

        <Animated.View style={styles.content} entering={FadeIn.delay(200).duration(500)}>
          <Text style={styles.paragraph}>
            ¡Hola!
            {"\n"}{"\n"}
            Somos un grupo de estudiantes apasionados por la salud y el bienestar mental. Nuestra misión es proporcionar recursos y herramientas que ayuden a las personas a reducir el estrés y mejorar su calidad de vida.
            {"\n"}{"\n"}
            La idea de desarrollar esta página nació de la necesidad de crear un espacio accesible donde se puedan encontrar técnicas de relajación, meditación y consejos prácticos para el autocuidado.
            {"\n"}{"\n"}
            Creemos firmemente en la importancia de cuidar no solo el cuerpo, sino también la mente. Es por eso que nos dedicamos a investigar y compartir información útil que fomente el bienestar integral.
            {"\n"}{"\n"}
            Nuestra visión es construir una comunidad donde todos puedan sentirse apoyados en su camino hacia una vida más equilibrada y saludable.
            {"\n"}{"\n"}
            Gracias por acompañarnos en este viaje hacia el bienestar. Estamos aquí para ayudar y crecer juntos.
          </Text>
        </Animated.View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#f9f9f9" },
  header: {
    backgroundColor: "#4c5c94",
    padding: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#ecf0f1",
    fontSize: 16,
    textAlign: "center",
  },
  content: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    margin: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  paragraph: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
});

