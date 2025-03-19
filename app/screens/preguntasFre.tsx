import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Prefre = () => {
  const sections = [
    {
      id: 'pagos',
      title: 'Pagos',
      description: 'Información sobre métodos de pago, facturación y procesamiento de pagos',
      icon: '💳',
      content: (
        <View style={styles.docContainer}>
          <Text style={styles.docTitle}>Documentación de Pagos</Text>
          <Text style={styles.docText}>
            Aquí encontrarás información sobre los métodos de pago disponibles, facturación y cómo se procesan los pagos.
          </Text>
        </View>
      ),
    },
    {
      id: 'productos',
      title: 'Productos',
      description: 'Catálogo de productos, especificaciones y disponibilidad',
      icon: '📦',
      content: (
        <View style={styles.docContainer}>
          <Text style={styles.docTitle}>Documentación de Productos</Text>
          <Text style={styles.docText}>
            Explora nuestro catálogo de productos, las especificaciones detalladas y la disponibilidad de cada uno.
          </Text>
        </View>
      ),
    },
    {
      id: 'devoluciones',
      title: 'Devoluciones',
      description: 'Políticas y procedimientos para devoluciones y reembolsos',
      icon: '🔄',
      content: (
        <View style={styles.docContainer}>
          <Text style={styles.docTitle}>Documentación de Devoluciones</Text>
          <Text style={styles.docText}>
            Aquí encontrarás nuestras políticas y procedimientos para devoluciones y reembolsos.
          </Text>
        </View>
      ),
    },
    {
      id: 'cuenta',
      title: 'Cuenta y Seguridad',
      description: 'Gestión de tu cuenta, privacidad y configuración de seguridad',
      icon: '🔒',
      content: (
        <View style={styles.docContainer}>
          <Text style={styles.docTitle}>Cuenta y Seguridad</Text>
          <Text style={styles.docText}>
            Información sobre la gestión de tu cuenta, privacidad y opciones de seguridad.
          </Text>
        </View>
      ),
    },
  ];

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

const handleSectionClick = (sectionId: string) => {
    
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
};
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Preguntas Frecuentes</Text>
        <Text style={styles.subtitle}>Selecciona una categoría para ver más detalles</Text>
      </View>

      <View style={styles.sectionsContainer}>
        {sections.map((section) => (
          <View key={section.id} style={styles.sectionItem}>
            <TouchableOpacity 
              onPress={() => handleSectionClick(section.id)} 
              style={styles.sectionContent}
              // En lugar de usar pointerEvents como prop, lo incluimos en el style si es necesario
              // style={{ ...styles.sectionContent, pointerEvents: 'auto' }}
            >
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{section.icon}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionDescription}>{section.description}</Text>
              </View>
            </TouchableOpacity>

            {expandedSection === section.id && (
              <View style={styles.sectionContentExpand}>
                {section.content}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E9ED',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C7A89',
    marginBottom: 4,
  },
  sectionsContainer: {
    padding: 16,
  },
  sectionItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    // Reemplazamos las propiedades de sombra nativas con boxShadow para web
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
    elevation: 3, // Mantenemos elevation para Android
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // Si necesitamos configurar pointerEvents, lo hacemos aquí
    // pointerEvents: 'auto',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6C7A89',
  },
  sectionContentExpand: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E6E9ED',
  },
  docContainer: {
    padding: 16,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
  },
  docTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  docText: {
    fontSize: 14,
    color: '#6C7A89',
  },
});

export default Prefre;