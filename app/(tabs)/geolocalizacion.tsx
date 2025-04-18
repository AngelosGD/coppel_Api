import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Ionicons } from '@expo/vector-icons';

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

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
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación fue denegado');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

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
      <View style={localStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#2155a8" />
        <Text style={localStyles.loadingText}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={localStyles.errorContainer}>
        <Ionicons name="warning-outline" size={50} color="#ff4444" />
        <Text style={localStyles.errorText}>{errorMsg}</Text>
        <TouchableOpacity style={localStyles.button} onPress={handleGeolocalizacionReturn}>
          <Text style={localStyles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={localStyles.container}>
      {/* Header */}
      <View style={localStyles.header}>
        <TouchableOpacity onPress={handleGeolocalizacionReturn}>
          <Ionicons name="arrow-back" size={24} color="#2155a8" />
        </TouchableOpacity>
        <Text style={localStyles.headerTitle}>Ubicaciones</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Información de hora */}
      <View style={localStyles.timeContainer}>
        <Text style={localStyles.subtitle}>PYMES cercanas</Text>
      </View>

      {/* Mapa más pequeño */}
      {location && (
        <View style={localStyles.mapContainer}>
          <MapView
            style={localStyles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={mapStyle}
            scrollEnabled={true}
            zoomEnabled={true}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Tu ubicación"
            >
              <View style={localStyles.currentMarker}>
                <View style={localStyles.currentMarkerInner} />
              </View>
            </Marker>

            {pymes.map((pyme) => (
              <Marker
                key={pyme.id}
                coordinate={pyme.location}
                title={pyme.nombreEmpresa}
              >
                <View style={localStyles.pymeMarker}>
                  <Text style={localStyles.pymeMarkerText}>{pyme.nombreEmpresa.charAt(0)}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        </View>
      )}

      {/* Lista de PYMES */}
      <View style={localStyles.listContainer}>
        <Text style={localStyles.listTitle}>PYMES cercanas ({pymes.length})</Text>
        {pymes.slice(0, 5).map((pyme) => (
          <View key={pyme.id} style={localStyles.pymeItem}>
            <View style={localStyles.pymeMarkerSmall}>
              <Text style={localStyles.pymeMarkerText}>{pyme.nombreEmpresa.charAt(0)}</Text>
            </View>
            <View style={localStyles.pymeInfo}>
              <Text style={localStyles.pymeName}>{pyme.nombreEmpresa}</Text>
              <Text style={localStyles.pymeDistance}>A 1.2 km de distancia</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Botón de acción */}
      <TouchableOpacity style={localStyles.actionButton}>
        <Text style={localStyles.actionButtonText}>Ver todas las PYMES</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStyle = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }
    ]
  }
];

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2155a8',
  },
  timeContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    color: '#333',
  },
  mapContainer: {
    height: height * 0.35, // Mapa más pequeño (35% de la pantalla)
    margin: 15,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2155a8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentMarkerInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  pymeMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pymeMarkerSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pymeMarkerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  listContainer: {
    flex: 1,
    padding: 15,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2155a8',
  },
  pymeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pymeInfo: {
    flex: 1,
  },
  pymeName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  pymeDistance: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  actionButton: {
    backgroundColor: '#2155a8',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2155a8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  errorText: {
    color: '#ff4444',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});