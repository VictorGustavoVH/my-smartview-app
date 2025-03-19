// app/components/Footer.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image source={require('../../assets/SmartView.png')} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Contáctanos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Quiénes Somos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Términos y Condiciones</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.copyText}>© 2023 SmartView. All Rights Reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  logoContainer: { marginBottom: 8 },
  logo: { width: 100, height: 30, resizeMode: 'contain' },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  linkText: { fontSize: 12, color: '#2563EB', marginHorizontal: 8 },
  copyText: { fontSize: 10, color: '#777' },
});

export default Footer;
