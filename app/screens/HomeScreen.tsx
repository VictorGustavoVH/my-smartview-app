// app/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImgMenu from '../../assets/Menu.png';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const fadeAnim = new Animated.Value(0);
  const buttonScale = new Animated.Value(1);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const faqs = [
    <section className="py-12 px-4 md:px-8 bg-gray-100 animate-fadeIn">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Preguntas Frecuentes</h2>
      <div className="space-y-4 mt-8">
        {[
          {
            pregunta: '¿Necesito Wi-Fi para que funcione?',
            respuesta:
              'Sí, la ventana se conecta a la red Wi-Fi para enviar y recibir datos, así podrás controlarla desde tu app.'
          },
          {
            pregunta: '¿Es difícil de instalar?',
            respuesta:
              'La instalación es sencilla y se adapta a la mayoría de los marcos de ventanas. Además, nuestro equipo ofrece soporte si lo necesitas.'
          },
          {
            pregunta: '¿Qué pasa si se va la luz?',
            respuesta:
              'En caso de corte eléctrico, la ventana se bloquea en posición cerrada por seguridad. Cuando vuelve la electricidad, retoma su funcionamiento normal.'
          },
          {
            pregunta: '¿Es resistente al agua?',
            respuesta:
              'La ventana está diseñada con materiales resistentes a la humedad. Además, el motor interno está sellado para evitar daños por agua.'
          }
        ].map((item, idx) => (
          <div key={idx}>
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full text-left bg-white p-4 rounded-md shadow-md flex justify-between items-center"
            >
              <span className="font-semibold text-gray-800">
                {item.pregunta}
              </span>
              <span className="ml-2 text-gray-600">
                {activeFAQ === idx ? '–' : '+'}
              </span>
            </button>
            {activeFAQ === idx && (
              <div className="bg-white mt-2 p-4 rounded-md shadow-inner text-gray-700">
                {item.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>// ... (mismo array de FAQs que antes)
  ];

  return (
    <ScrollView style={styles.container}>
      <Header />

      <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>VENTANA AUTOMATIZADA</Text>
          <Text style={styles.heroDescription}>
          Innovamos para brindarte un hogar más seguro, cómodo y conectado.
            Con apertura y cierre automático, sensores climáticos de última generación
            y control total desde la palma de tu mano.
          </Text>
        </View>
        
        <Image source={ImgMenu} style={styles.heroImage} />
        
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <Text style={styles.ctaButtonText}>Más información</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* Sección de Introducción */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>¿Por qué una Ventana automatizada?</Text>
        <Text style={styles.sectionDescription}>
          Nuestra Ventana automatizada te ayuda a mantener tu casa fresca...
        </Text>
        
        <View style={styles.listContainer}>
          {[
            'Apertura Automática: Deja que la ventana se abra para ventilar...',
            'Protección en Mal Clima: Se cierra a tiempo...',
            'Notificaciones al Instante: Recibe un aviso...',
            'Ahorro de Energía: Al regular la ventilación...'
          ].map((item, index) => (
            <View key={index} style={styles.listItemContainer}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Sección de Cómo Funciona */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>¿Cómo Funciona?</Text>
        <View style={styles.stepsContainer}>
          {[1, 2, 3].map((step) => (
            <View key={step} style={styles.stepCard}>
              <Text style={styles.stepNumber}>{step}</Text>
              <Text style={styles.stepTitle}>
                {step === 1 ? 'Detecta el Clima' : 
                 step === 2 ? 'Envía Datos a tu App' : 'Acción Automática'}
              </Text>
              <Text style={styles.stepDescription}>
                {step === 1 ? 'Sensores de temperatura...' : 
                 step === 2 ? 'Recibe notificaciones...' : 'La ventana se abre...'}
              </Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Resto de secciones con animaciones similares */}

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroSection: { 
    padding: 20, 
    backgroundColor: '#f8f9fa', 
    alignItems: 'center' 
  },
  heroTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a365d',
    textAlign: 'center',
    marginBottom: 15,
  },
  heroDescription: {
    fontSize: 18,
    color: '#4a5568',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  heroImage: {
    width: width * 0.9,
    height: 250,
    resizeMode: 'contain',
    marginVertical: 20,
    borderRadius: 12,
  },
  section: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },
  listContainer: {
    marginTop: 15,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    color: '#4a5568',
    marginRight: 8,
  },
  listItemText: {
    fontSize: 16,
    color: '#4a5568',
    flex: 1,
    lineHeight: 24,
  },
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  stepCard: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
  // ... (otros estilos necesarios)
});

export default HomeScreen;