import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './styles';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Home() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const nombreEmpleado = params.nombreEmpleado || 'Colaborador';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Hola {nombreEmpleado}!
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/registrarPymes')}>
        <Text style={styles.buttonText}>Registrar PYMES</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/listaPymes')}>
        <Text style={styles.buttonText}>Lista de Pymes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/geolocalizacion')}>
        <Text style={styles.buttonText}>Geolocalización</Text>
      </TouchableOpacity>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#ff4444', marginTop: 30 }]} 
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}