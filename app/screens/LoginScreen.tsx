import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Animated,
  ActivityIndicator,
  Alert,
  ToastAndroid
} from 'react-native';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RootStackParamList } from '../navigation/AppNavigator';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;

  const validate = (): boolean => {
    let valid = true;
    const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i;
    setEmailError(''); setPasswordError(''); setGeneralError('');

    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError('Correo electrónico inválido'); valid = false;
    }
    if (!password.trim() || password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres'); valid = false;
    }
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setIsVerifying(true);
    try {
      const { data } = await api.post('/login', { email: email.trim(), password });
      const { token, role } = data;
      await AsyncStorage.multiSet([
        ['AUTH_TOKEN', token],
        ['USER_ROLE', role],
        ['REMEMBER_ME', rememberMe.toString()]
      ]);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setShowSuccessModal(true);
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Error al iniciar sesión. Inténtalo de nuevo.';
      if (Platform.OS === 'android') ToastAndroid.show(msg, ToastAndroid.SHORT);
      else Alert.alert('Error', msg);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
      const timer = setTimeout(() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header />
      <View style={styles.content}>
        <Image source={require('../../assets/SmartView.png')} style={styles.logo} />
        <Text style={styles.title}>Iniciar sesión en tu cuenta</Text>
        {generalError ? <Text style={styles.errorText}>{generalError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="name@company.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.fieldError}>{emailError}</Text> : null}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#666" />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.fieldError}>{passwordError}</Text> : null}
        <View style={styles.optionsRow}>
          <View style={styles.checkboxRow}>
            <Checkbox value={rememberMe} onValueChange={setRememberMe} color={rememberMe ? '#2563EB' : undefined} />
            <Text style={styles.checkboxLabel}>Recuérdame</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.loginButton, isVerifying && styles.disabledButton]} onPress={handleLogin} disabled={isVerifying}>
          {isVerifying ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Iniciar sesión</Text>}
        </TouchableOpacity>
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>¿No tienes cuenta aún?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
            <Text style={styles.link}> Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />

      {/* Success Modal */}
      <Modal transparent visible={showSuccessModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}>
            <Icon name="check" size={64} color="#16A34A" />
            <Text style={styles.successText}>Inicio de sesión exitoso</Text>
          </Animated.View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  logo: { width: 160, height: 40, alignSelf: 'center', marginBottom: 24 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#333' },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, fontSize: 16, marginVertical: 6 },
  fieldError: { color: '#B91C1C', marginBottom: 6 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  checkboxLabel: { marginLeft: 8, color: '#333' },
  link: { color: '#2563EB', fontSize: 14 },
  loginButton: { backgroundColor: '#2563EB', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  disabledButton: { opacity: 0.6 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  registerText: { fontSize: 14, color: '#444' },
  errorText: { color: '#991B1B', backgroundColor: '#FECACA', padding: 8, borderRadius: 4, textAlign: 'center', marginBottom: 8 },
  modalOverlay: { flex: 1, backgroundColor: '#00000080', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 32, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8 },
  successText: { fontSize: 18, fontWeight: '600', marginTop: 12, color: '#166534' }
});

export default LoginScreen;
