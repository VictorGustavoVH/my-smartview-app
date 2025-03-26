import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

interface LinkItem { label: string; route: string; nested?: boolean; }

const NAV_LINKS: LinkItem[] = [
  { label: 'Inicio', route: 'Home' },
  { label: 'Catálogo', route: 'Products' },
  { label: 'Acerca de', route: '', nested: true },
];

const ABOUT_LINKS: LinkItem[] = [
  { label: 'Quiénes Somos', route: 'QuienesSomos' },
  { label: 'Preguntas frecuentes', route: 'PreguntasF' },
  { label: 'Términos y Condiciones', route: 'Terms' },
  { label: 'Contacto', route: 'Contacto' },
];

const Header: React.FC = () => {
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('USER_ROLE').then(role => setUserRole(role));
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['USER_ROLE', 'AUTH_TOKEN']);
    setUserRole(null);
    setMenuVisible(false);
    navigation.navigate('Home' as never);
  };

  const authLinks = userRole
    ? userRole === 'admin'
      ? [{ label: 'Gestión', route: 'AdminPanel' }]
      : [{ label: 'Mi Dispositivo', route: 'device' }]
    : [];

  const profileLinks = userRole
    ? [
        { label: 'Actualizar datos', route: 'Profile' },
        { label: 'Cerrar sesión', route: '' }
      ]
    : [];

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate('Home' as never)}>
        <Image source={require('../../assets/SmartView.png')} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.rightContainer}>
        {!userRole && (
          <View style={styles.authButtons}>
            <TouchableOpacity onPress={() => navigation.navigate('Login' as never)} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register' as never)} style={styles.button}>
              <Text style={styles.buttonText}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
          <Icon name="bars" size={24} />
        </TouchableOpacity>
      </View>

      <Modal transparent visible={menuVisible} animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => { setMenuVisible(false); setAboutVisible(false); }}>
          <View style={styles.modalContent}>
            <ScrollView>
              {NAV_LINKS.map(item => (
                item.nested ? (
                  <View key={item.label}>
                    <TouchableOpacity onPress={() => setAboutVisible(prev => !prev)} style={styles.linkRow}>
                      <Text style={styles.linkText}>{item.label}</Text>
                      <Icon name={aboutVisible ? 'angle-up' : 'angle-down'} size={16} />
                    </TouchableOpacity>
                    {aboutVisible && ABOUT_LINKS.map(sub => (
                      <TouchableOpacity key={sub.route} onPress={() => { setMenuVisible(false); setAboutVisible(false); navigation.navigate(sub.route as never); }} style={styles.nestedItem}>
                        <Text style={styles.linkText}>{sub.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <TouchableOpacity key={item.route} onPress={() => { setMenuVisible(false); navigation.navigate(item.route as never); }}>
                    <Text style={styles.linkText}>{item.label}</Text>
                  </TouchableOpacity>
                )
              ))}
              {authLinks.map(link => (
                <TouchableOpacity key={link.route} onPress={() => { setMenuVisible(false); navigation.navigate(link.route as never); }}>
                  <Text style={styles.linkText}>{link.label}</Text>
                </TouchableOpacity>
              ))}
              {profileLinks.map(link => (
                <TouchableOpacity key={link.label} onPress={() => { setMenuVisible(false); link.label === 'Cerrar sesión' ? handleLogout() : navigation.navigate(link.route as never); }}>
                  <Text style={[styles.linkText, link.label === 'Cerrar sesión' && { color: 'red' }]}>{link.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  logoContainer: { flex: 1 },
  logo: { width: 120, height: 40, resizeMode: 'contain' },
  rightContainer: { flexDirection: 'row', alignItems: 'center' },
  authButtons: { flexDirection: 'row' },
  button: { backgroundColor: '#2563EB', padding: 8, borderRadius: 4, marginHorizontal: 4 },
  buttonText: { color: '#fff' },
  menuButton: { padding: 8 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-start', alignItems: 'flex-end' },
  modalContent: { backgroundColor: '#fff', width: 240, marginTop: 60, marginRight: 16, borderRadius: 4, padding: 16, maxHeight: '80%' },
  linkText: { fontSize: 16, paddingVertical: 8 },
  linkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nestedItem: { paddingLeft: 16 }
});

export default Header;