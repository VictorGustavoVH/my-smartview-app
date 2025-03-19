// app/components/SeguroCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface SeguroCardProps {
  seguro: string;  // "Activo" o "Desactivo"
  onToggleSeguro: () => void;
  modo: string;
}

const SeguroCard: React.FC<SeguroCardProps> = ({ seguro, onToggleSeguro }) => {
  const isActivo = seguro.toLowerCase() === 'activo';

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Seguro</Text>
      <View style={styles.content}>
        {isActivo ? (
          <FontAwesome name="lock" size={48} color="#22c55e" />
        ) : (
          <FontAwesome name="unlock-alt" size={48} color="#ef4444" />
        )}
        <Switch
          onValueChange={onToggleSeguro}
          value={isActivo}
          thumbColor={isActivo ? '#22c55e' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#22c55e' }}
          style={styles.switch}
        />
        <Text style={styles.statusText}>{seguro}</Text>
      </View>
      <Text style={styles.footerText}>Activo / Desactivo</Text>
    </View>
  );
};

export default SeguroCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
  },
  switch: {
    marginVertical: 8,
  },
  statusText: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 8,
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
