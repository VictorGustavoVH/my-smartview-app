// app/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import api from '../config/axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RootStackParamList } from '../navigation/AppNavigator';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleLogin = async () => {
    try {
      setErrorMessage('');
      if (!email.trim() || !password.trim()) {
        setErrorMessage('Ingresa email y contraseña');
        return;
      }
  
      const response = await api.post('/login', { 
        email: email.trim(), 
        password: password.trim() 
      });
  
      const { token, role } = response.data;
  
      await AsyncStorage.setItem('AUTH_TOKEN', token);
      await AsyncStorage.setItem('USER_ROLE', role);
      await AsyncStorage.setItem('REMEMBER_ME', rememberMe ? 'true' : 'false');
  
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }], // 👈🏽 Corrección aquí definitiva!
      });
  
    } catch (error: any) {
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    }
  };
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/SmartView.png')} style={styles.logo} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar sesión en tu cuenta</Text>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <Text style={styles.label}>Tu correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="name@company.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#999" />
            </TouchableOpacity>
          </View>
          {/* Alineamos "Recuérdame" y "¿Olvidaste tu contraseña?" en una misma fila */}
          <View style={styles.rowContainer}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={rememberMe}
                onValueChange={setRememberMe}
                color={rememberMe ? '#2563EB' : undefined}
              />
              <Text style={styles.checkboxLabel}>Recuérdame</Text>
            </View>
            <TouchableOpacity onPress={() => console.log('Recuperar contraseña')}>
              <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes cuenta aún?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
              <Text style={styles.registerLink}> Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: 16, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 24 },
  logo: { width: 160, height: 40, resizeMode: 'contain' },
  formContainer: {},
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: '#333' },
  label: { fontSize: 14, marginTop: 10, color: '#333' },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginTop: 4,
  },
  passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { paddingHorizontal: 8, paddingVertical: 4 },
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkboxLabel: { marginLeft: 8, fontSize: 14, color: '#333' },
  forgotPassword: { fontSize: 13, color: '#3B82F6' },
  loginButton: { backgroundColor: '#2563EB', borderRadius: 8, paddingVertical: 12, marginTop: 16, alignItems: 'center' },
  loginButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  registerContainer: { flexDirection: 'row', alignSelf: 'center', marginTop: 16 },
  registerText: { fontSize: 14, color: '#444' },
  registerLink: { fontSize: 14, color: '#2563EB', fontWeight: '600' },
  errorText: { backgroundColor: '#FECACA', color: '#991B1B', padding: 8, borderRadius: 4, marginBottom: 8, textAlign: 'center' },
});

export default LoginScreen;
