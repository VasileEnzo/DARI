import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/pages/inicio';
import LoginScreen from './src/pages/login';
import RegisterScreen from './src/pages/registro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
  <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Inicio' }} />
  <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
  <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarme' }} />
</Stack.Navigator>
    </NavigationContainer>
  );
}
