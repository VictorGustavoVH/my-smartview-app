// app/components/ModoCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ModoCardProps {
  modo: string;  // 'Manual' o 'Automático'
  onToggleModo: () => void;
}

const ModoCard: React.FC<ModoCardProps> = ({ modo, onToggleModo }) => {
  const isAutomatico = modo.toLowerCase() === 'automático';

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Modo</Text>
      <View style={styles.content}>
        {isAutomatico ? (
          <FontAwesome name="cogs" size={48} color="#3b82f6" />
        ) : (
          <FontAwesome name="hand-paper-o" size={48} color="#facc15" />
        )}
        <Switch
          onValueChange={onToggleModo}
          value={isAutomatico}
          thumbColor={isAutomatico ? '#3b82f6' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#3b82f6' }}
          style={styles.switch}
        />
        <Text style={styles.statusText}>{modo}</Text>
      </View>
      <Text style={styles.footerText}>Manual / Automático</Text>
    </View>
  );
};

export default ModoCard;

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
