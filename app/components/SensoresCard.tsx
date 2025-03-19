// app/components/SensoresCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { FontAwesome5 } from '@expo/vector-icons';

interface SensoresCardProps {
  temperatura: string;   // e.g. "20"
  lluvia: string;        // "Sí" / "No"
  diaNoche: string;      // "Día" o "Noche"
}

const TemperatureGauge: React.FC<{ temperature: number; min?: number; max?: number }> = ({
  temperature,
  min = 0,
  max = 50,
}) => {
  const radius = 50;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const clampedTemp = Math.min(Math.max(temperature, min), max);
  const percent = (clampedTemp - min) / (max - min);
  const strokeDashoffset = circumference - percent * circumference;

  let strokeColor = '#22c55e'; // verde
  if (temperature < 15) strokeColor = '#3b82f6'; // azul
  if (temperature > 25) strokeColor = '#ef4444'; // rojo

  return (
    <View style={{ width: radius * 2, height: radius * 2, position: 'relative' }}>
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <Circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </Svg>
      <View style={styles.gaugeTextContainer}>
        <Text style={styles.gaugeText}>{temperature}°C</Text>
      </View>
    </View>
  );
};

const DayNightWidget: React.FC<{ diaNoche: string }> = ({ diaNoche }) => {
  let iconName: 'sun' | 'moon' | 'question' = 'question';
  let iconColor = '#9ca3af';
  let label = '--';
  if (diaNoche.toLowerCase().includes('dia')) {
    iconName = 'sun';
    iconColor = '#facc15';
    label = 'Día';
  } else if (diaNoche.toLowerCase().includes('noche')) {
    iconName = 'moon';
    iconColor = '#6b7280';
    label = 'Noche';
  }
  return (
    <View style={styles.widgetContainer}>
      <View style={[styles.circle, { borderColor: iconColor }]}>
        <FontAwesome5 name={iconName} size={32} color={iconColor} />
      </View>
      <Text style={styles.widgetLabel}>{label}</Text>
    </View>
  );
};

const RainWidget: React.FC<{ lluvia: string }> = ({ lluvia }) => {
  let iconName: 'cloud-showers-heavy' | 'cloud' | 'question' = 'question';
  let iconColor = '#9ca3af';
  let label = 'Lluvia: --';
  if (lluvia.toLowerCase() === 'sí' || lluvia.toLowerCase() === 'si') {
    iconName = 'cloud-showers-heavy';
    iconColor = '#3b82f6';
    label = 'Lluvia: Sí';
  } else if (lluvia.toLowerCase() === 'no') {
    iconName = 'cloud';
    iconColor = '#6b7280';
    label = 'Lluvia: No';
  }
  return (
    <View style={styles.widgetContainer}>
      <View style={[styles.circle, { borderColor: iconColor }]}>
        <FontAwesome5 name={iconName} size={32} color={iconColor} />
      </View>
      <Text style={styles.widgetLabel}>{label}</Text>
    </View>
  );
};

const SensoresCard: React.FC<SensoresCardProps> = ({ temperatura, lluvia, diaNoche }) => {
  const tempNum = parseFloat(temperatura) || 0;
  return (
    <View style={styles.card}>
      <Text style={styles.header}>Sensores</Text>
      <View style={styles.sensoresGrid}>
        <DayNightWidget diaNoche={diaNoche} />
        <View style={styles.widgetContainer}>
          <TemperatureGauge temperature={tempNum} min={0} max={50} />
          <Text style={styles.widgetLabel}>Temperatura</Text>
        </View>
        <RainWidget lluvia={lluvia} />
      </View>
    </View>
  );
};

export default SensoresCard;

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
    marginBottom: 16,
    textAlign: 'center',
  },
  sensoresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  widgetContainer: {
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  widgetLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  gaugeTextContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
