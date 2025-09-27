// src/pages/inicio.tsx (WelcomeScreen)
import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function WelcomeScreen({ navigation }: any) {
  const { token, setToken } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a DARI</Text>

      {!token && (
        <View style={styles.btnWrap}>
          <Button title="Ir al Login" onPress={() => navigation.navigate('Login')} />
        </View>
      )}

      {token && (
        <>
          <Pressable
            onPress={() => navigation.navigate('CrearPost')}
            style={styles.createBtn}
          >
            <Text style={styles.createBtnText}>Crear post</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setToken(null);       
              navigation.replace('Home'); 
            }}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutBtnText}>Cerrar sesión</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, width:'100%', justifyContent:'center', alignItems:'center', backgroundColor:'#f5f5f5', paddingHorizontal:20 },
  title:{ fontSize:24, fontWeight:'bold', marginBottom:20, textAlign:'center' },
  btnWrap:{ alignSelf:'stretch' },
  createBtn:{ backgroundColor:'#007bff', padding:12, borderRadius:5, marginTop:20, alignSelf:'stretch' },
  createBtnText:{ color:'#fff', fontWeight:'bold', textAlign:'center' },
  logoutBtn:{ backgroundColor:'#ef4444', padding:12, borderRadius:5, marginTop:12, alignSelf:'stretch' },
  logoutBtnText:{ color:'#fff', fontWeight:'bold', textAlign:'center' },
});
