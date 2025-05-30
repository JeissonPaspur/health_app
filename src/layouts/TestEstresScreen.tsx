import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { Stack } from "expo-router";
import { supabase } from "../supabaseClient";

const preguntas = [
  "¿Te sientes abrumado por tus responsabilidades?",
  "¿Tienes dificultad para dormir debido a tus pensamientos?",
  "¿Consumes más café o bebidas energéticas de lo habitual?",
  "¿Te sientes siempre apurado o con falta de tiempo?",
  "¿Has perdido el interés en actividades que solías disfrutar?",
  "¿Experimentas dolores de cabeza o tensión muscular?",
  "¿Te cuesta comunicarte con los demás o compartir tus sentimientos?",
  "¿Te preocupa tu situación financiera más de lo habitual?",
  "¿Te sientes incapaz de manejar el estrés diario?",
  "¿Te sientes ansioso o nervioso la mayor parte del tiempo?",
];

export default function TestEstresScreen() {
  const [respuestas, setRespuestas] = useState(Array(10).fill(null));

  const seleccionarRespuesta = (indice: number, valor: boolean) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[indice] = valor;
    setRespuestas(nuevasRespuestas);
  };

  const handleEnviar = async () => {
    if (respuestas.includes(null)) {
      return Alert.alert("Incompleto", "Por favor responde todas las preguntas.");
    }

    const puntaje = respuestas.filter(r => r === true).length;

    let nivel = "";
    if (puntaje <= 3) nivel = "bajo";
    else if (puntaje <= 6) nivel = "moderado";
    else nivel = "alto";

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        return Alert.alert("Error", "No se pudo identificar el usuario.");
      }

      const { error: insertError } = await supabase.from("resultados_test_estres").insert([
        {
          user_id: user.id,
          puntaje,
          nivel,
          respuestas,
        },
      ]);

      if (insertError) {
        console.error(insertError);
        return Alert.alert("Error", "No se pudo guardar el resultado en la base de datos.");
      }

      let mensaje = "";
      if (nivel === "bajo") {
        mensaje = "Tu nivel de estrés parece ser bajo. ¡Sigue así!";
      } else if (nivel === "moderado") {
        mensaje = "Tu nivel de estrés es moderado. Considera implementar técnicas de relajación.";
      } else {
        mensaje = "Tu nivel de estrés es alto. Es importante que tomes medidas para cuidar tu salud mental.";
      }

      Alert.alert("Resultado del test", mensaje);
      setRespuestas(Array(10).fill(null));

    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Ocurrió un error al guardar el resultado.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "" }} />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Animated.View style={styles.header} entering={FadeInUp.duration(500)}>
          <Text style={styles.title}>Test de Estrés</Text>
          <Text style={styles.subtitle}>Identifica tu nivel de estrés</Text>
        </Animated.View>

        <Animated.View style={styles.testContainer} entering={FadeIn.delay(200).duration(500)}>
          {preguntas.map((pregunta, index) => (
            <View key={index} style={styles.pregunta}>
              <Text style={styles.preguntaTexto}>{index + 1}. {pregunta}</Text>
              <View style={styles.opciones}>
                <TouchableOpacity
                  style={[
                    styles.opcion,
                    respuestas[index] === true && styles.opcionSeleccionada,
                  ]}
                  onPress={() => seleccionarRespuesta(index, true)}
                >
                  <Text style={styles.opcionTexto}>Sí</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.opcion,
                    respuestas[index] === false && styles.opcionSeleccionada,
                  ]}
                  onPress={() => seleccionarRespuesta(index, false)}
                >
                  <Text style={styles.opcionTexto}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleEnviar}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
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
  testContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  pregunta: {
    marginBottom: 20,
  },
  preguntaTexto: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  opciones: {
    flexDirection: "row",
    gap: 10,
  },
  opcion: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  opcionSeleccionada: {
    backgroundColor: "#84b74d",
    borderColor: "#84b74d",
  },
  opcionTexto: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#4c5c94",
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
});
