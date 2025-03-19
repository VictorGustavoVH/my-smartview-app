// app/components/VentanaCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface VentanaCardProps {
  estadoVentana: string;   // "Abierto" o "Cerrado"
  onAbrir: () => void;
  onCerrar: () => void;
  modo: string;
}

const VentanaCard: React.FC<VentanaCardProps> = ({ estadoVentana, onAbrir, onCerrar, modo }) => {
  const isAbierto = estadoVentana.toLowerCase().includes('abierto');
  const esManual = modo.toLowerCase() === 'manual';

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Ventana</Text>
      <View style={styles.content}>
        {isAbierto ? (
          <MaterialCommunityIcons name="window-open" size={48} color="#22c55e" />
        ) : (
          <MaterialCommunityIcons name="window-closed" size={48} color="#ef4444" />
        )}
        <Text style={styles.statusText}>{estadoVentana}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={onAbrir}
            disabled={!esManual}
            style={[styles.button, !esManual && styles.disabledButton]}
          >
            <Text style={styles.buttonText}>Abrir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCerrar}
            disabled={!esManual}
            style={[styles.button, !esManual && styles.disabledButton]}
          >
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.footerText}>Abrir / Cerrar</Text>
    </View>
  );
};

export default VentanaCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 6,
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
  },
  statusText: {
    marginVertical: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginVertical: 4,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  footerText: {
    marginTop: 4,
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
