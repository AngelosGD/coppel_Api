import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './styles';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import FooterTemplate from '../(tabs)/Footer'

// Importar imágenes locales
const registrarBg = require('../../assets/images/pymes.png');
const listaBg = require('../../assets/images/Lista.png');
const geolocalizacionBg = require('../../assets/images/ubicacion.png');

export default function Home() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const nombreEmpleado = params.nombreEmpleado || 'Colaborador';

  

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
        style={[styles.button, { backgroundColor: '#FBE23D', marginTop: 30, marginBottom: 80, marginLeft: '10%' }]}
      >
        <Text style={styles.buttonText}>Detalles</Text>
      </TouchableOpacity>

     <FooterTemplate></FooterTemplate>
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
});