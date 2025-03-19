// app/components/AlarmaCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface AlarmaCardProps {
  alarma: string;          
  onToggleAlarma: () => void;
  modo: string;
}

const AlarmaCard: React.FC<AlarmaCardProps> = ({ alarma, onToggleAlarma }) => {
  const isActiva = alarma.toLowerCase() === 'activa';

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Alarma</Text>
      <View style={styles.content}>
        <FontAwesome
          name="bell"
          size={48}
          color={isActiva ? '#ef4444' : '#22c55e'}
        />
        <Switch
          onValueChange={onToggleAlarma}
          value={isActiva}
          thumbColor={isActiva ? '#ef4444' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#ef4444' }}
          style={styles.switch}
        />
        <Text style={styles.statusText}>
          {isActiva ? 'Alarma Activada' : 'Alarma Desactivada'}
        </Text>
      </View>
      <Text style={styles.footerText}>Activar/Desactivar</Text>
    </View>
  );
};

export default AlarmaCard;

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
