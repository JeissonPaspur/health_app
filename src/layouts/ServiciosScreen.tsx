import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const servicios = [
  {
    nombre: "Consulta General",
    descripcion:
      "Valoración médica integral para diagnosticar y tratar condiciones comunes de salud.",
    imagen: require("C:/Users/ASUS/Documents/health_app/assets/images/consulta.jpg"),
  },
  {
    nombre: "Psicología",
    descripcion:
      "Atención emocional y orientación psicológica para mejorar tu bienestar mental.",
    imagen: require("C:/Users/ASUS/Documents/health_app/assets/images/psicologia.png"),
  },
  {
    nombre: "Fisioterapia",
    descripcion:
      "Rehabilitación física personalizada para mejorar movilidad y aliviar dolor.",
    imagen: require("C:/Users/ASUS/Documents/health_app/assets/images/fisio.jpg"),
  },
  {
    nombre: "Nutrición",
    descripcion:
      "Asesoría nutricional para mejorar tu dieta y adoptar hábitos alimenticios saludables.",
    imagen: require("C:/Users/ASUS/Documents/health_app/assets/images/nutricion.jpg"),
  },
];

export default function ServiciosScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nuestros Servicios Médicos</Text>

      {servicios.map((servicio, index) => (
        <Animated.View
          key={index}
          entering={FadeInUp.delay(index * 200)}
          style={styles.card}
        >
          <Image source={servicio.imagen} style={styles.imagen} />
          <Text style={styles.nombre}>{servicio.nombre}</Text>
          <Text style={styles.descripcion}>{servicio.descripcion}</Text>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4c5c94",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    elevation: 2,
  },
  imagen: {
    width: width * 0.6,
    height: width * 0.35,
    resizeMode: "contain",
    marginBottom: 12,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  descripcion: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
