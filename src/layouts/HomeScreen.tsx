import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { supabase } from "../supabaseClient";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        entering={FadeIn.duration(500)}
      >
        {/* ===== HERO CON IMAGEN DE FONDO ===== */}
        <Animated.View entering={FadeInUp.duration(800)}>
          <ImageBackground
            source={require("C:/Users/ASUS/Documents/health_app/assets/images/banner.png")}
            style={styles.hero}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              <Text style={styles.heroTitle}>
                <Text style={styles.accent}>Vida plena </Text>salud mental y bienestar{"\n"}
                <Text style={styles.accent}>Mente libre </Text>vida extraordinaria{"\n"}
                <Text style={styles.accent}>Bienestar mental </Text>vida saludable
              </Text>
              <Text style={styles.heroSubtitle}>
                Tu mente es tu mayor fuerza. Aquí encontrarás recursos y consejos para conquistar el estrés y alcanzar el equilibrio emocional.
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* ===== BLOQUE BLANCO (SE MANTIENE) ===== */}
        <Animated.View style={styles.heroLight} entering={FadeInUp.delay(300).duration(800)}>
          <Text style={styles.heroTitleLight}>
            <Text style={styles.accent}>Bienestar </Text>Pleno
          </Text>
          <Text style={styles.heroSubtitleLight}>
            Bienvenido a Bienestar Pleno, un espacio dedicado a tu salud mental y emocional. Aquí encontrarás recursos, consejos y herramientas para ayudarte a manejar el estrés, mejorar tu bienestar y alcanzar un equilibrio emocional en tu vida diaria.

            Nuestro objetivo es proporcionarte el apoyo necesario para que puedas vivir de manera más plena y consciente. A través de artículos, videos y test, queremos acompañarte en tu camino hacia una mente más sana y un cuerpo más equilibrado.

            A continuación, te invitamos a realizar un test de estrés que te ayudará a identificar tu nivel actual y a tomar decisiones informadas sobre tu bienestar mental.
          </Text>
        </Animated.View>

        {/* ===== CTA TEST ESTRÉS ===== */}
        <Animated.View style={styles.stressSection} entering={FadeInUp.delay(600).duration(800)}>
          <Text style={styles.sectionTitle}>Test de Estrés</Text>
          <Text style={styles.paragraph}>Mide tu nivel actual y obtén recomendaciones.</Text>
          <TouchableOpacity style={styles.cta} onPress={() => router.push("/test-estres")}>
            <Text style={styles.ctaText}>Realizar Test</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ===== FOOTER ===== */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Bienestar Pleno</Text>
        </View>
      </Animated.ScrollView>

      {/* ===== MENÚ INFERIOR ===== */}
      <View style={styles.bottomMenu}>
        <IconButton icon="play-circle-outline" label="Consultas" onPress={() => router.push("/consultas")} />
        <IconButton icon="chatbubble-ellipses-outline" label="Testimonios" onPress={() => router.push("/testimonios")} />
        <IconButton icon="people-outline" label="Nosotros" onPress={() => router.push("/nosotros")} />
        <IconButton icon="log-out-outline" label="Salir" onPress={handleLogout} color="#84b74d" />
      </View>
    </View>
  );
}

function IconButton({
  icon,
  label,
  onPress,
  color = "#4c5c94",
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
  color?: string;
}) {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <Ionicons name={icon} size={26} color={color} />
      <Text style={styles.iconLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  content: { paddingBottom: 100 },

  hero: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(76, 92, 148, 0.52)",
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 36,
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 16,
  },
  heroSubtitle: {
    color: "#ecf0f1",
    fontSize: 15,
    textAlign: "center",
  },
  accent: { color: "#b6e07c" },

  heroLight: {
    backgroundColor: "#ffffff",
    padding: 24,
  },
  heroTitleLight: {
    fontSize: 35,
    fontWeight: "600",
    color: "#4c5c94",
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitleLight: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    textAlign: "center",
  },

  stressSection: {
    backgroundColor: "#eef5e9",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4a7c2a",
    textAlign: "center",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  cta: {
    backgroundColor: "#84b74d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 12,
    color: "#aaa",
  },

  bottomMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconLabel: {
    fontSize: 12,
    color: "#4c5c94",
    marginTop: 4,
  },
});
