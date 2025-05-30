import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { supabase } from "../supabaseClient";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [mobilephone, setMobilePhone] = useState("");

  const handleRegister = async () => {
    try {
      const { data: existingUsers, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .limit(1);

      if (fetchError) {
        Alert.alert("Error", "No se pudo verificar el correo: " + fetchError.message);
        return;
      }

      if (existingUsers.length > 0) {
        Alert.alert("Advertencia", "Este correo ya está registrado en la base de datos.");
        return;
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullname,
            mobile_phone: mobilephone,
          },
        },
      });

      if (signUpError) {
        Alert.alert("Error", signUpError.message);
        return;
      }

      const { error: insertError } = await supabase.from("users").insert([
        {
          email,
          fullname,
          status: true,
          mobile_phone: mobilephone,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        },
      ]);

      if (insertError) {
        Alert.alert("Error", "Usuario creado pero no guardado en base de datos: " + insertError.message);
      } else {
        Alert.alert("Éxito", "Usuario registrado correctamente");
        router.back();
      }
    } catch (error) {
      Alert.alert("Error", "Error en registro");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={fullname}
        onChangeText={setFullName}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={mobilephone}
        onChangeText={setMobilePhone}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Volver al login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    width: "80%",
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold"
  },
  link: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline"
  }
});