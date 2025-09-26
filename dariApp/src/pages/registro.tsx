import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../services/api';
import { Alert } from "react-native";

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirm,setConfirm] = useState('');

  const onRegister = async () => {
  if(password !== confirm) {
    Alert.alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const response = await api.post('register', { 
      name, 
      email, 
      password,
    password_confirmation: confirm
    });
    console.log("Usuario registrado:", response.data);
      Alert.alert("Registro exitoso 🎉");
      navigation.replace("Login");

    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Alert.alert("Error al registrarse: " + (error.response?.data?.message || "Intenta de nuevo"));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex:1}}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Crear cuenta</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
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
          <TextInput
            style={styles.input}
            placeholder="Repetir contraseña"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />

          <Button title="Registrarme" onPress={onRegister} />

          <Pressable onPress={() => navigation.replace('Login')} style={{marginTop:16}}>
            <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title:{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input:{ borderWidth:1, borderColor:'#ccc', padding:12, borderRadius:8, marginBottom:12 },

  link: { textAlign:'center', color:'#2563eb', fontWeight:'600' } 
});

