// app/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ProductDetail from '../screens/ProductDetail';
import QuienesSomos from '../screens/BodyContent';
import PreguntasFrecuentes from '../screens/preguntasFre';
import SmartViewDashboard from '../screens/SmartViewDashboard';
//import TermsScreen from '../screens/TermsScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  SmartView: undefined;
  Products: undefined;
  ProductD: undefined;
  QuienesSomos: undefined;
  PreguntasF: undefined;
  device: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"  // Se inicia en HomeScreen
      screenOptions={{
        headerStyle: { backgroundColor: '#2563eb' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarse' }} />
      <Stack.Screen name="SmartView" component={SmartViewDashboard} options={{ title: 'Smart Dashboard' }} />
      <Stack.Screen name="Products" component={CatalogScreen} options={{ title: 'Catálogo' }} />
      <Stack.Screen name="ProductD" component={ProductDetail} options={{title: 'Product Detaille'}}/>
      <Stack.Screen name="QuienesSomos" component={QuienesSomos} options={{title: 'Quienes somos'}}/>
      <Stack.Screen name="PreguntasF" component={PreguntasFrecuentes} options={{title: 'Preguntas Frecuentes'}}/>
      <Stack.Screen name="device" component={SmartViewDashboard} options={{title: 'device'}}/>

    </Stack.Navigator>
  );
};

export default AppNavigator;
