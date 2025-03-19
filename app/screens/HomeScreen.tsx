// app/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImgMenu from '../../assets/Menu.png';

const HomeScreen: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      pregunta: '¿Necesito Wi-Fi para que funcione?',
      respuesta:
        'Sí, la ventana se conecta a la red Wi-Fi para enviar y recibir datos, así podrás controlarla desde tu app.',
    },
    {
      pregunta: '¿Es difícil de instalar?',
      respuesta:
        'La instalación es sencilla y se adapta a la mayoría de los marcos de ventanas. Además, nuestro equipo ofrece soporte si lo necesitas.',
    },
    {
      pregunta: '¿Qué pasa si se va la luz?',
      respuesta:
        'En caso de corte eléctrico, la ventana se bloquea en posición cerrada por seguridad. Cuando vuelve la electricidad, retoma su funcionamiento normal.',
    },
    {
      pregunta: '¿Es resistente al agua?',
      respuesta:
        'La ventana está diseñada con materiales resistentes a la humedad. Además, el motor interno está sellado para evitar daños por agua.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header />

      {/* Sección Hero: Título y descripción, luego la imagen y debajo el botón CTA */}
      <View style={styles.heroSection}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>VENTANA AUTOMATIZADA</Text>
          <Text style={styles.heroDescription}>
            Innovamos para brindarte un hogar más seguro, cómodo y conectado. Con apertura y cierre automático,
            sensores climáticos de última generación y control total desde la palma de tu mano.
          </Text>
        </View>
        <Image source={ImgMenu} style={styles.heroImage} />
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Más información</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de Introducción */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Por qué una Ventana automatizada?</Text>
        <Text style={styles.sectionDescription}>
          Nuestra Ventana automatizada te ayuda a mantener tu casa fresca, ahorrar energía y proteger tu hogar frente a
          la lluvia o intrusos. Olvídate de estar pendiente de las inclemencias del tiempo: la ventana se ajusta sola según
          tus preferencias.
        </Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Apertura Automática:</Text> Deja que la ventana se abra para ventilar tus espacios cuando sea necesario.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Protección en Mal Clima:</Text> Se cierra a tiempo para evitar lluvia o viento.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Notificaciones al Instante:</Text> Recibe un aviso en tu teléfono ante cambios bruscos o situaciones de riesgo.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Ahorro de Energía:</Text> Al regular la ventilación, reduces el uso de aire acondicionado o calefacción.
          </Text>
        </View>
      </View>

      {/* Sección de Cómo Funciona */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Cómo Funciona?</Text>
        <Text style={[styles.sectionDescription, { textAlign: 'center', maxWidth: 300 }]}>
          Con una combinación de sensores climáticos, un motor silencioso y una app intuitiva, la Ventana Inteligente se encarga de todo. Estos son los pasos esenciales:
        </Text>
        <View style={styles.stepsContainer}>
          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepTitle}>Detecta el Clima</Text>
            <Text style={styles.stepDescription}>
              Sensores de temperatura, lluvia y viento analizan el ambiente.
            </Text>
          </View>
          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepTitle}>Envía Datos a tu App</Text>
            <Text style={styles.stepDescription}>
              Recibe notificaciones y monitorea el estado de tu ventana en todo momento.
            </Text>
          </View>
          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepTitle}>Acción Automática</Text>
            <Text style={styles.stepDescription}>
              La ventana se abre o cierra según la configuración que hayas elegido.
            </Text>
          </View>
        </View>
      </View>

      {/* Sección de Características Principales */}
      <View style={[styles.section, styles.sectionGray]}>
        <Text style={styles.sectionTitle}>Características Principales</Text>
        <Text style={styles.sectionDescription}>
          La Ventana Inteligente ofrece múltiples funciones para que te sientas más cómodo y seguro.
        </Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Control en tu Teléfono</Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Abre o cierra la ventana sin moverte del sillón.
            </Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Recibe alertas cuando detecte lluvia o un cambio brusco de temperatura.
            </Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Configura horarios para automatizar su apertura o cierre.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Diseño Seguro</Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Cierra la ventana al detectar situaciones fuera de lo normal.
            </Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Protege tu hogar sin necesidad de vigilar constantemente.
            </Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Te avisa si alguien o algo ha golpeado la ventana.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Instalación Amigable</Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Se adapta fácilmente a la mayoría de los marcos.
            </Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Disponible en distintos tamaños y estilos.
            </Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>No requiere grandes obras ni complicaciones.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Ahorro de Energía</Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Evita pérdida de calor en invierno o frescura en verano.
            </Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Menor uso de aire acondicionado o calefacción.
            </Text>
            <Text style={styles.featureList}>
              <Text style={styles.bold}>• </Text>Contribuye al cuidado del medio ambiente.
            </Text>
          </View>
        </View>
      </View>

      {/* Sección de Testimonios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lo Que Dicen Nuestros Clientes</Text>
        <View style={styles.testimonialsContainer}>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              "Desde que instalé la Ventana Inteligente, ya no me preocupo cuando salgo de casa. Sé que se va a cerrar si empieza a llover. ¡Es fantástica!"
            </Text>
            <Text style={styles.testimonialAuthor}>– Ana Gómez</Text>
          </View>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              "Me gusta que puedo controlar todo desde mi celular. Y en días calurosos se abre automáticamente para ventilar, ahorrándome energía."
            </Text>
            <Text style={styles.testimonialAuthor}>– Carlos Pérez</Text>
          </View>
        </View>
      </View>

      {/* Sección de FAQ */}
      <View style={[styles.section, styles.sectionGray]}>
        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
        {faqs.map((item, idx) => (
          <View key={idx} style={styles.faqItem}>
            <TouchableOpacity style={styles.faqButton} onPress={() => toggleFAQ(idx)}>
              <Text style={styles.faqQuestion}>{item.pregunta}</Text>
              <Text style={styles.faqToggle}>{activeFAQ === idx ? '–' : '+'}</Text>
            </TouchableOpacity>
            {activeFAQ === idx && (
              <View style={styles.faqAnswerContainer}>
                <Text style={styles.faqAnswer}>{item.respuesta}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Sección de Ventajas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ventajas de Tener una Ventana automatizada</Text>
        <View style={styles.advantagesList}>
          <Text style={styles.advantageItem}>
            <Text style={styles.bold}>• </Text>Control Total: Decide cuándo abrirla o cerrarla sin necesidad de estar en casa.
          </Text>
          <Text style={styles.advantageItem}>
            <Text style={styles.bold}>• </Text>Menos Estrés: No te preocupes si empieza a llover; la ventana actúa por sí sola.
          </Text>
          <Text style={styles.advantageItem}>
            <Text style={styles.bold}>• </Text>Mayor Seguridad: Reduce el riesgo de intrusiones al asegurar la ventana automáticamente.
          </Text>
          <Text style={styles.advantageItem}>
            <Text style={styles.bold}>• </Text>Datos Útiles: Conoce la temperatura, humedad y más desde tu app.
          </Text>
          <Text style={styles.advantageItem}>
            <Text style={styles.bold}>• </Text>Adaptable a Ti: Ideal para personas con movilidad reducida o rutinas ocupadas.
          </Text>
        </View>
      </View>

      {/* Sección CTA */}
      <View style={[styles.section, { backgroundColor: '#fff' }]}>
        <View style={styles.ctaSection}>
          <Text style={styles.sectionTitle}>¿Te interesa una Ventana automatizada?</Text>
          <Text style={styles.sectionDescription}>
            Contáctanos para conocer más detalles, precios y formas de instalación. Dale un giro práctico y moderno a tu hogar.
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Quiero más detalles</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroSection: { padding: 16, backgroundColor: '#f3f4f6', alignItems: 'center' },
  heroTextContainer: { marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 8 },
  heroDescription: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 12 },
  ctaButton: { backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  ctaButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  heroImage: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 16 },
  section: { paddingVertical: 12, paddingHorizontal: 16 },
  sectionGray: { backgroundColor: '#f3f4f6' },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8, textAlign: 'center' },
  sectionDescription: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 12 },
  listContainer: { marginTop: 8 },
  listItem: { fontSize: 16, color: '#555', marginBottom: 4 },
  bold: { fontWeight: 'bold' },
  stepsContainer: { flexDirection: 'column', marginTop: 16 },
  stepCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  stepNumber: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  stepTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  stepDescription: { fontSize: 14, textAlign: 'center', color: '#555' },
  featuresContainer: { flexDirection: 'column', marginTop: 16 },
  featureCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  featureTitle: { fontSize: 20, fontWeight: '600', marginBottom: 8, textAlign: 'center' },
  featureList: { fontSize: 14, color: '#555', marginBottom: 4 },
  testimonialsContainer: { flexDirection: 'column', marginTop: 16 },
  testimonialCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  testimonialText: { fontSize: 14, fontStyle: 'italic', color: '#555', marginBottom: 8 },
  testimonialAuthor: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'right' },
  faqItem: { marginBottom: 8 },
  faqButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  faqQuestion: { fontSize: 16, color: '#333' },
  faqToggle: { fontSize: 20, color: '#333' },
  faqAnswerContainer: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginTop: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  faqAnswer: { fontSize: 14, color: '#555' },
  advantagesList: { marginTop: 8 },
  advantageItem: { fontSize: 16, color: '#555', marginBottom: 4 },
  ctaSection: { alignItems: 'center' },
});

export default HomeScreen;
