import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const BodyContent: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Sección "Quiénes Somos" */}
      <View style={styles.section}>
        <Text style={styles.title}>¿Quiénes Somos?</Text>
        <Text style={styles.text}>
          Somos una empresa dedicada a la innovación y venta de ventanas automatizadas,
          con un enfoque en la eficiencia energética y la comodidad para nuestros clientes.
        </Text>
      </View>

      {/* Sección Contacto */}
      <View style={styles.section}>
        <Text style={styles.title}>Contacto</Text>
        <Text style={styles.text}>Para más información, contáctanos:</Text>
        <Text style={styles.listItem}>📧 Email: contacto@ventanas.com</Text>
        <Text style={styles.listItem}>📞 Teléfono: (123) 456-7890</Text>
        <Text style={styles.listItem}>📍 Dirección: Calle Ficticia 123, Ciudad</Text>
      </View>

      {/* Sección Misión */}
      <View style={styles.section}>
        <Text style={styles.title}>Nuestra Misión</Text>
        <Text style={styles.text}>
          Brindar soluciones automatizadas y sostenibles a través de la tecnología, mejorando la calidad de vida
          de nuestros clientes y optimizando el consumo de energía en los hogares y empresas.
        </Text>
      </View>

      {/* Sección Visión */}
      <View style={styles.section}>
        <Text style={styles.title}>Nuestra Visión</Text>
        <Text style={styles.text}>
          Ser una empresa líder en el mercado de ventanas automatizadas, reconocida por su innovación, calidad de productos
          y compromiso con la sostenibilidad.
        </Text>
      </View>
    </ScrollView>
  );
};

export default BodyContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0057b8",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    textAlign: "justify",
  },
  listItem: {
    fontSize: 16,
    color: "#0057b8",
    marginTop: 5,
  },
});
