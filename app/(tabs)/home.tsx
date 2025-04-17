import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './styles';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

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
    <View style={[HomeStyles.ViewStyle]}>
      <View style={{ backgroundColor: 'white', paddingBottom: '6%', borderBlockColor: '#2155a8', borderBottomWidth: 2 }}>
        <Text style={[HomeStyles.TextColaboradorNombre]}>
          ¡Bienvenido {nombreEmpleado}!
        </Text>
        <Text style={{ marginLeft: '4%', marginTop: '1.5%', fontWeight: 400, opacity: 0.65 }}>Dashboard Principal.</Text>
      </View>

      <View style={[HomeStyles.containerCards]}>
        {/* Tarjeta 1: Registrar PYMES */}
        <TouchableOpacity style={[HomeStyles.cardHome]} onPress={() => router.push('/registrarPymes')}>
          <MaterialCommunityIcons
            name="file-document-edit-outline"
            size={40}
            color="#2155a8"
            style={HomeStyles.icon}
          />
          <Text style={HomeStyles.TextCards}>Registrar Nuevo PYMES</Text>
          <Text style={HomeStyles.subTextCards}>Registra Pymes</Text>
        </TouchableOpacity>

        {/* Tarjeta 2: Lista de PYMES */}
        <TouchableOpacity style={HomeStyles.cardHome} onPress={() => router.push('/listaPymes')}>
          <MaterialIcons
            name="format-list-bulleted"
            size={40}
            color="#2155a8"
            style={HomeStyles.icon}
          />
          <Text style={HomeStyles.TextCards}>Lista de Pymes</Text>
          <Text style={HomeStyles.subTextCards}>Ver todos los PYMES</Text>
        </TouchableOpacity>

        {/* Tarjeta 3: Geolocalización */}
        <TouchableOpacity style={HomeStyles.cardHome} onPress={() => router.push('/geolocalizacion')}>
          <Ionicons
            name="location-outline"
            size={40}
            color="#2155a8"
            style={HomeStyles.icon}
          />
          <Text style={HomeStyles.TextCards}>Geolocalización</Text>
          <Text style={HomeStyles.subTextCards}>PYMES cercanos</Text>
        </TouchableOpacity>
      </View>

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

const HomeStyles = StyleSheet.create({
  cardHome: {
    backgroundColor: 'white',
    marginTop: '5%',
    borderRadius: 10,
    height: 150,
    width: '45%',
    marginLeft: '3%',
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
    paddingTop: 20,
  },
  icon: {
    marginBottom: 10,
  },
  TextCards: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  TextColaboradorNombre: {
    fontSize: 18,
    fontWeight: '500',
    color: 'Black',
    marginTop: '12%',
    marginLeft: '4%',
  },
  ViewStyle: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    paddingHorizontal: 10,
  },
  subTextCards: {
    fontSize: 13,
    color: '#2155a8',
    textAlign: 'center',
    marginTop: '3%',
  },
  containerCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingRight: '2.5%',
  }
});