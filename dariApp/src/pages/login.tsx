import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { api, setToken as setApiToken } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const { setToken } = useAuth();           
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/login", { email, password });

      
      setToken(data.token);

      

      Alert.alert("OK", "Sesión iniciada");
      navigation.replace("Home");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al iniciar sesión";
      Alert.alert("Error", msg);
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Ingresando..." : "Iniciar sesión"}</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15 },
  button: { backgroundColor: "#007bff", padding: 12, borderRadius: 5, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { marginTop: 10, color: "#007bff", textAlign: "center" },
});
