import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

interface PymeLocation {
  id: string;
  nombreEmpresa: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export default function Geolocalizacion() {
  const router = useRouter();
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pymes, setPymes] = useState<PymeLocation[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGeolocalizacionReturn = () => {
    router.push('/home');
  };

  useEffect(() => {
    (async () => {
      // 1. Obtener permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación fue denegado');
        setLoading(false);
        return;
      }

      // 2. Obtener ubicación actual
      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // 3. Obtener PYMES cercanas desde Firestore
        const querySnapshot = await getDocs(collection(db, 'pymes'));
        const pymesData: PymeLocation[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.location) {
            pymesData.push({
              id: doc.id,
              nombreEmpresa: data.nombreEmpresa || 'PYME',
              location: data.location
            });
          }
        });

        setPymes(pymesData);
      } catch (error) {
        setErrorMsg('Error al obtener la ubicación');
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text>Obteniendo ubicación...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View >
        <Text style={{ color: 'red', marginBottom: 20 }}>{errorMsg}</Text>
        <TouchableOpacity style={styles.button} onPress={handleGeolocalizacionReturn}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text >PYMES cercanas a tu ubicación</Text>
      
      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Marcador de la ubicación actual */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Tu ubicación"
            pinColor="blue"
          />

          {/* Marcadores de PYMES */}
          {pymes.map((pyme) => (
            <Marker
              key={pyme.id}
              coordinate={pyme.location}
              title={pyme.nombreEmpresa}
              pinColor="red"
            />
          ))}
        </MapView>
      )}

      <TouchableOpacity 
        style={[styles.button, { position: 'absolute', bottom: 20, alignSelf: 'center' }]} 
        onPress={handleGeolocalizacionReturn}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

// Agrega estos estilos al archivo styles.tsx
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
});