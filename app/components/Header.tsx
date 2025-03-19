// app/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header: React.FC = () => {
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [aboutNestedVisible, setAboutNestedVisible] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const role = await AsyncStorage.getItem('USER_ROLE');
      setUserRole(role);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('USER_ROLE');
    await AsyncStorage.removeItem('AUTH_TOKEN');
    setUserRole(null);
    setMenuVisible(false);
    navigation.navigate('Home' as never);
  };

  // Opciones del menú principal (modal)
  const mainLinks = [
    { label: 'Inicio', route: 'Home' },
    { label: 'Catálogo', route: 'Products' },
    { label: 'Acerca de', nested: true }, // Este item tiene un submenú
  ];

  // Opciones anidadas para "Acerca de"
  const aboutLinks = [
    { label: 'Quiénes Somos', route: 'QuienesSomos' },
    { label: 'Preguntas Frecuentes', route: 'PreguntasF' },
    { label: 'Términos y Condiciones', route: 'Terms' },
  ];

  // Opciones adicionales si el usuario está autenticado
  const authOptions = userRole
    ? userRole === 'admin'
      ? [{ label: 'Gestión', route: 'AdminPanel' }]
      : [{ label: 'Mi Dispositivo', route: 'device' }]
    : [];
  const profileOptions = userRole
    ? [
        { label: 'Actualizar datos', route: 'Profile' },
        { label: 'Cerrar sesión', action: handleLogout },
      ]
    : [];

  return (
    <View style={styles.header}>
      {/* Logo a la izquierda */}
      <TouchableOpacity onPress={() => navigation.navigate('Home' as never)} style={styles.logoContainer}>
        <Image source={require('../../assets/SmartView.png')} style={styles.logo} />
      </TouchableOpacity>

      {/* Si no hay usuario, se muestran de forma fija los botones de Login y Regístrate */}
      {!userRole && (
        <View style={styles.authButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)} style={styles.authButton}>
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register' as never)} style={styles.authButton}>
            <Text style={styles.authButtonText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botón de menú (hamburguesa) */}
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
        <Icon name="bars" size={24} color="#333" />
      </TouchableOpacity>

      {/* Modal del menú principal */}
      <Modal visible={menuVisible} animationType="fade" transparent={true}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => { setMenuVisible(false); setAboutNestedVisible(false); }}>
          <View style={styles.modalContent}>
            <ScrollView>
              {mainLinks.map(link => {
                if (link.nested) {
                  return (
                    <View key={link.label}>
                      <TouchableOpacity onPress={() => setAboutNestedVisible(!aboutNestedVisible)}>
                        <View style={styles.nestedHeader}>
                          <Text style={styles.modalLink}>{link.label}</Text>
                          <Icon name={aboutNestedVisible ? 'angle-up' : 'angle-down'} size={16} color="#333" />
                        </View>
                      </TouchableOpacity>
                      {aboutNestedVisible &&
                        aboutLinks.map(subLink => (
                          <TouchableOpacity
                            key={subLink.route}
                            onPress={() => {
                              setMenuVisible(false);
                              setAboutNestedVisible(false);
                              navigation.navigate(subLink.route as never);
                            }}
                            style={styles.nestedItem}
                          >
                            <Text style={styles.modalLink}>{subLink.label}</Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      key={link.route}
                      onPress={() => {
                        setMenuVisible(false);
                        navigation.navigate(link.route as never);
                      }}
                    >
                      <Text style={styles.modalLink}>{link.label}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
              {authOptions.map((option, idx) => (
                <TouchableOpacity key={idx} onPress={() => { setMenuVisible(false); navigation.navigate(option.route as never); }}>
                  <Text style={styles.modalLink}>{option.label}</Text>
                </TouchableOpacity>
              ))}
              {profileOptions.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setMenuVisible(false);
                    if (item.action) {
                      item.action();
                    } else {
                      navigation.navigate(item.route as never);
                    }
                  }}
                >
                  <Text style={[styles.modalLink, item.label === 'Cerrar sesión' && { color: 'red' }]}>{item.label}</Text>
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
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoContainer: { flex: 1 },
  logo: { width: 120, height: 40, resizeMode: 'contain' },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  authButtonText: { color: '#fff', fontSize: 14 },
  menuButton: { padding: 8 },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 240,
    padding: 16,
    marginTop: 60,
    marginRight: 16,
    borderRadius: 4,
    elevation: 5,
    maxHeight: '80%',
  },
  modalLink: { fontSize: 16, paddingVertical: 8, color: '#333' },
  nestedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nestedItem: { paddingLeft: 16 },
});

export default Header;
