// app/screens/SmartViewDashboard.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import socketIOClient from 'socket.io-client';
import Constants from 'expo-constants';

import ModoCard from '../components/ModoCard';
import VentanaCard from '../components/VentanaCard';
import SeguroCard from '../components/SeguroCard';
import AlarmaCard from '../components/AlarmaCard';
import SensoresCard from '../components/SensoresCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface IDevice {
  _id?: string;
  deviceId: string;
  lluvia: string;
  alarma: string;
  diaNoche: string;
  temperatura: number;
  ventana: string;
  modo: string;
  seguro: string;
}

// Se obtiene la URL del backend desde la configuración extra de Expo usando expoConfig.
// Si no está definida, se usa 'http://192.168.50.136:5000' como valor por defecto.
const backendUrl = Constants.expoConfig?.extra?.apiUrl || 'http://192.168.50.136:5000';

// Conectar al servidor de websockets usando la URL definida
const socket = socketIOClient(backendUrl);

const SmartViewDashboard: React.FC = () => {
  const [device, setDevice] = useState<IDevice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al websocket');
    });

    socket.on('deviceUpdate', (updatedDevice: IDevice) => {
      console.log('Recibido deviceUpdate:', updatedDevice);
      setDevice(updatedDevice);
      setLoading(false);
      setError('');
    });

    // Pedimos el dispositivo por defecto
    socket.emit('getDevice', { deviceId: 'ventana1' }, (response: IDevice) => {
      console.log('Respuesta de getDevice:', response);
      if (response) {
        setDevice(response);
        setLoading(false);
        setError('');
      } else {
        setError('No se encontró el dispositivo.');
        setLoading(false);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('deviceUpdate');
    };
  }, []);

  const sendCommand = async (command: string) => {
    if (!device) return;
    try {
      await fetch(`${backendUrl}/products/devices/${device.deviceId}/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleModo = () => {
    if (!device) return;
    if (device.modo.toLowerCase() === 'manual') {
      sendCommand('automatico');
    } else {
      sendCommand('manual');
    }
  };

  const handleAbrir = () => sendCommand('abrir');
  const handleCerrar = () => sendCommand('cerrar');

  const handleToggleSeguro = () => {
    if (!device) return;
    if (device.seguro.toLowerCase() === 'activo') {
      sendCommand('desactivarSeguro');
    } else {
      sendCommand('activarSeguro');
    }
  };

  const handleToggleAlarma = () => {
    if (!device) return;
    if (device.alarma === 'ACTIVADA') {
      sendCommand('desactivarAlarma');
    } else {
      sendCommand('activarAlarma');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Cargando dispositivo...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  if (!device) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No se encontró el dispositivo.</Text>
      </View>
    );
  }

  // Mapeamos valores
  const modoVal = device.modo.toLowerCase() === 'manual' ? 'Manual' : 'Automático';
  const ventanaVal = device.ventana.toLowerCase() === 'abierto' ? 'Abierto' : 'Cerrado';
  const seguroVal = device.seguro.toLowerCase() === 'activo' ? 'Activo' : 'Desactivo';
  const alarmaVal = device.alarma === 'ACTIVADA' ? 'Activa' : 'Desactivada';
  const lluviaVal = device.lluvia === 'SI' ? 'Sí' : 'No';
  const diaNocheVal = device.diaNoche;
  const tempVal = String(device.temperatura);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Fila 1: Modo y Ventana */}
        <View style={styles.row}>
          <View style={styles.cardContainer}>
            <ModoCard modo={modoVal} onToggleModo={handleToggleModo} />
          </View>
          <View style={styles.cardContainer}>
            <VentanaCard
              estadoVentana={ventanaVal}
              onAbrir={handleAbrir}
              onCerrar={handleCerrar}
              modo={modoVal}
            />
          </View>
        </View>

        {/* Fila 2: Seguro y Alarma */}
        <View style={styles.row}>
          <View style={styles.cardContainer}>
            <SeguroCard
              seguro={seguroVal}
              onToggleSeguro={handleToggleSeguro}
              modo={modoVal}
            />
          </View>
          <View style={styles.cardContainer}>
            <AlarmaCard
              alarma={alarmaVal}
              onToggleAlarma={handleToggleAlarma}
              modo={modoVal}
            />
          </View>
        </View>

        {/* Sensores */}
        <View style={styles.sensoresContainer}>
          <SensoresCard temperatura={tempVal} lluvia={lluviaVal} diaNoche={diaNocheVal} />
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

export default SmartViewDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 40,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardContainer: {
    flexBasis: '48%',
    marginBottom: -10,
  },
  sensoresContainer: {
    marginTop: 8,
  },
  footer: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
  },
});
