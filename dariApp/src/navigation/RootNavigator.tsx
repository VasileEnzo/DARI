// src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import HomeScreen from '../pages/inicio';
import LoginScreen from '../pages/login';
import CrearPost from '../pages/crearPost';
import RegisterScreen from '../pages/registro';


const Stack = createNativeStackNavigator();

function PublicStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro' }} />
    </Stack.Navigator>
  );
}

function PrivateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="CrearPost" component={CrearPost} options={{ title: 'Crear Post' }} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { token } = useAuth();
  return (
    <NavigationContainer>
      {token ? <PrivateStack /> : <PublicStack />}
    </NavigationContainer>
  );
}
