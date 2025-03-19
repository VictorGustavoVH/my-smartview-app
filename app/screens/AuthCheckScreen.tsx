// app/screens/AuthCheckScreen.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthCheck'>;

const AuthCheckScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('AUTH_TOKEN');
        if (!token) {
          navigation.replace('Login');
        } else {
          navigation.replace('Home');
        }
      } catch (error) {
        console.log('Error revisando Auth:', error);
        navigation.replace('Login');
      }
    };

    checkAuth();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
};

export default AuthCheckScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
