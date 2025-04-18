import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './styles';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// Importar imágenes locales
const registrarBg = require('../../assets/images/pymes.png');
const listaBg = require('../../assets/images/Lista.png');
const geolocalizacionBg = require('../../assets/images/ubicacion.png');

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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Contenido principal */}
      <View style={{ backgroundColor: 'white', paddingBottom: '6%', borderBlockColor: '#2155a8', borderBottomWidth: 2, padding: 0, margin: 0 }}>
        <Text style={[HomeStyles.TextColaboradorNombre]}>
          ¡Bienvenido {nombreEmpleado}!
        </Text>
        <Text style={{ marginLeft: '4%', marginTop: '1.5%', fontWeight: 400, opacity: 0.65 }}>Dashboard Principal.</Text>
      </View>

      <View style={{ flex: 1, marginBottom: 60 }}>
        {/* Tarjeta 1: Registrar PYMES */}
        <TouchableOpacity style={HomeStyles.cardContainer} onPress={() => router.push('/registrarPymes')}>
          <ImageBackground 
            source={registrarBg}
            style={HomeStyles.cardBackground}
            imageStyle={HomeStyles.cardImageStyle}
          >
            <View style={HomeStyles.cardContent}>
              <MaterialCommunityIcons
                name="file-document-edit-outline"
                size={40}
                color="#2155a8"
                style={HomeStyles.icon}
              />
              <Text style={HomeStyles.TextCards}>Registrar Nuevo PYMES</Text>
              <Text style={HomeStyles.subTextCards}>Registra Pymes</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Tarjeta 2: Lista de PYMES */}
        <TouchableOpacity style={HomeStyles.cardContainer} onPress={() => router.push('/listaPymes')}>
          <ImageBackground 
            source={listaBg}
            style={HomeStyles.cardBackground}
            imageStyle={HomeStyles.cardImageStyle}
          >
            <View style={HomeStyles.cardContent}>
              <MaterialIcons
                name="format-list-bulleted"
                size={40}
                color="#2155a8"
                style={HomeStyles.icon}
              />
              <Text style={HomeStyles.TextCards}>Lista de Pymes</Text>
              <Text style={HomeStyles.subTextCards}>Ver todos los PYMES</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Tarjeta 3: Geolocalización */}
        <TouchableOpacity style={HomeStyles.cardContainer} onPress={() => router.push('/geolocalizacion')}>
          <ImageBackground 
            source={geolocalizacionBg}
            style={HomeStyles.cardBackground}
            imageStyle={HomeStyles.cardImageStyle}
          >
            <View style={HomeStyles.cardContent}>
              <Ionicons
                name="location-outline"
                size={40}
                color="#2155a8"
                style={HomeStyles.icon}
              />
              <Text style={HomeStyles.TextCards}>Geolocalización</Text>
              <Text style={HomeStyles.subTextCards}>PYMES cercanos</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff4444', marginTop: 30, marginBottom: 80 }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* Barra de Navegación Inferior */}
      <View style={HomeStyles.bottomNav}>
        <TouchableOpacity 
          style={HomeStyles.navButton}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home-outline" size={24} color="#2155a8" />
          <Text style={HomeStyles.navText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={HomeStyles.navButton}
          onPress={() => router.push('/geolocalizacion')}
        >
          <Ionicons name="location-outline" size={24} color="#2155a8" />
          <Text style={HomeStyles.navText}>Ubicación</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={HomeStyles.navButton}
          onPress={() => router.push('/')}
        >
          <Feather name="settings" size={24} color="#2155a8" />
          <Text style={HomeStyles.navText}>Configuración</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={HomeStyles.navButton}
          onPress={() => router.push('/')}
        >
          <Ionicons name="help-circle-outline" size={24} color="#2155a8" />
          <Text style={HomeStyles.navText}>Soporte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const HomeStyles = StyleSheet.create({
  cardContainer: {
    marginTop: '5%',
    borderRadius: 10,
    height: 150,
    width: '94.2%',
    marginLeft: '3%',
    overflow: 'hidden',
    borderColor: '#a2a2a2',
    borderWidth: 1,
  },
  cardBackground: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardImageStyle: {
    opacity: 0.75,
    transform: [{ scale: .9 }], 
    width:'50%',
    height:'100%',
    resizeMode: 'cover',
    marginLeft: '50%',
  },
  cardContent: {
    flex: 1,
    paddingTop: 20,
  },
  icon: {
    marginBottom: 10,
    marginLeft: '14%'
  },
  TextCards: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft:'5%'
  },
  TextColaboradorNombre: {
    fontSize: 20,
    fontWeight: '500',
    color: 'Black',
    marginTop: '12%',
    marginLeft: '4%',
  },
  subTextCards: {
    fontSize: 13,
    color: '#2155a8',
    marginTop: '3%',
    marginLeft:'5%'
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, 
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 2,
  },
  navText: {
    fontSize: 10, 
    color: '#2155a8',
    marginTop: 4,
    fontWeight: '500',
  },
});