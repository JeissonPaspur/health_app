import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { Stack } from "expo-router";
import { supabase } from "../supabaseClient";

export default function TestimoniosScreen() {
  const [nombre, setnombre] = useState("");
  const [testimonio, settestimonio] = useState("");
  const [email, setcorreo] = useState("");

  const handleEnviar = async () => {
    if (nombre.length < 1) {
      return Alert.alert("Error", "Por favor ingresa tu nombre.");
    }
    if (testimonio.length < 1) {
      return Alert.alert("Error", "Por favor escribe tu testimonio.");
    }

    try {
      const { error } = await supabase.from("testimonios").insert([
        {
          nombre,
          testimonio,
          correo: email || null,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error(error);
        return Alert.alert("Error", "No se pudo guardar tu testimonio.");
      }

      Alert.alert("Gracias", "Tu testimonio ha sido enviado correctamente.");
      setnombre("");
      settestimonio("");
      setcorreo("");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Ocurrió un problema al enviar tu testimonio.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "" }} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Animated.View style={styles.header} entering={FadeInUp.duration(500)}>
          <Text style={styles.title}>Testimonios</Text>
          <Text style={styles.subtitle}>Lo que dicen nuestros clientes</Text>
        </Animated.View>

        <Animated.View style={styles.form} entering={FadeIn.delay(200).duration(500)}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setnombre}
            placeholder="Introduce tu nombre"
          />

          <Text style={styles.label}>Testimonio</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={testimonio}
            onChangeText={settestimonio}
            placeholder="Escribe tu testimonio"
            multiline
          />

          <Text style={styles.label}>Correo Electrónico (Opcional)</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setcorreo}
            placeholder="Introduce tu correo (opcional)"
          />

          <TouchableOpacity style={styles.button} onPress={handleEnviar}>
            <Text style={styles.buttonText}>Enviar Testimonio</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={styles.testimonios} entering={FadeInUp.delay(500).duration(500)}>
          <Text style={styles.testimonio}><Text style={styles.name}>María G.:</Text> "La consulta me ayudó a entender mejor mis hábitos alimenticios. ¡He perdido 5 kg en un mes!"</Text>
          <Text style={styles.testimonio}><Text style={styles.name}>Juan P.:</Text> "Los consejos sobre ejercicio y dieta han transformado mi vida. ¡Me siento más saludable y enérgico!"</Text>
          <Text style={styles.testimonio}><Text style={styles.name}>Ana L.:</Text> "Nunca había pensado en la importancia de la alimentación en mi bienestar. Estoy muy agradecida por el apoyo recibido."</Text>
          <Text style={styles.testimonio}><Text style={styles.name}>Pedro S.:</Text> "Gracias a las técnicas de relajación aprendidas, he podido manejar mejor el estrés. ¡Altamente recomendado!"</Text>
          <Text style={styles.testimonio}><Text style={styles.name}>Lucía R.:</Text> "El seguimiento personalizado ha sido clave para mis resultados. ¡Definitivamente seguiré con el programa!"</Text>
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
  form: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4c5c94",
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#84b74d",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  testimonios: {
    backgroundColor: "#eef5e9",
    padding: 20,
    marginTop: 20,
    borderRadius: 16,
  },
  testimonio: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
  },
  name: {
    fontWeight: "700",
    color: "#4c5c94",
  },
});
