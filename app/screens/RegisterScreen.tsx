// app/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../config/axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    if (!nombre || !username || !email || !telefono || !direccion || !password || !passwordConfirmation || !preguntaSecreta || !respuestaSecreta) {
      setErrorMessage('Completa todos los campos');
      return;
    }
    if (password !== passwordConfirmation) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }
    try {
      const response = await api.post('/register', {
        nombre,
        username,
        email,
        telefono,
        direccion,
        password,
        password_confirmation: passwordConfirmation,
        preguntaSecreta,
        respuestaSecreta,
      });
      setSuccessMessage(response.data.message || 'Usuario registrado exitosamente');
      navigation.navigate('Login' as never);
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Ha ocurrido un error en el registro';
      setErrorMessage(msg);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        {/* Logo encima del formulario */}
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/SmartView.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Crear una cuenta</Text>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Juan Pérez" />

        <Text style={styles.label}>Nombre de Usuario</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="usuario123" autoCapitalize="none" />

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="name@company.com" keyboardType="email-address" autoCapitalize="none" />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} placeholder="1234567890" keyboardType="numeric" />

        <Text style={styles.label}>Dirección</Text>
        <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} placeholder="Ingresa tu dirección" />

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

        <Text style={styles.label}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
        />

        <Text style={styles.label}>Pregunta Secreta</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={preguntaSecreta}
            onValueChange={(itemValue) => setPreguntaSecreta(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una pregunta" value="" />
            <Picker.Item label="¿Cuál es el nombre de tu primera mascota?" value="1" />
            <Picker.Item label="¿Cuál es tu comida favorita?" value="2" />
            <Picker.Item label="¿Cuál es el nombre de tu mejor amigo de la infancia?" value="3" />
            <Picker.Item label="¿Cuál es tu lugar de nacimiento?" value="4" />
            <Picker.Item label="¿Cuál fue el nombre de tu primera escuela?" value="5" />
          </Picker>
        </View>

        <Text style={styles.label}>Respuesta Secreta</Text>
        <TextInput style={styles.input} value={respuestaSecreta} onChangeText={setRespuestaSecreta} placeholder="Ingresa tu respuesta" />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Crear cuenta</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
            <Text style={styles.loginLink}> Inicia sesión aquí</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { paddingHorizontal: 16, paddingBottom: 40 },
  logoContainer: { alignItems: 'center', marginTop: 24, marginBottom: 16 },
  logo: { width: 160, height: 40, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#333' },
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
  pickerContainer: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, marginTop: 4 },
  picker: { height: 50, width: '100%' },
  registerButton: { backgroundColor: '#2563EB', borderRadius: 8, paddingVertical: 12, marginTop: 24, alignItems: 'center' },
  registerButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  loginContainer: { flexDirection: 'row', alignSelf: 'center', marginTop: 16, marginBottom: 24 },
  loginText: { fontSize: 14, color: '#444' },
  loginLink: { fontSize: 14, color: '#2563EB', fontWeight: '600' },
  errorText: { backgroundColor: '#FECACA', color: '#991B1B', padding: 8, borderRadius: 4, marginBottom: 8, textAlign: 'center' },
  successText: { backgroundColor: '#BBF7D0', color: '#166534', padding: 8, borderRadius: 4, marginBottom: 8, textAlign: 'center' },
});

export default RegisterScreen;
