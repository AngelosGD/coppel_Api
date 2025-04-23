import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import FooterTemplate from '../(tabs)/Footer';
import { Ionicons } from '@expo/vector-icons';

export default function ListaPymes() {
  const router = useRouter();
  const [pymes, setPymes] = useState<any[]>([]);

  useEffect(() => {
    const fetchPymes = async () => {
      const querySnapshot = await getDocs(collection(db, 'pymes'));
      const pymesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPymes(pymesData);
    };

    fetchPymes();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Pymes registradas</Text>
      </View>

      {/* Sección de registro */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Empresas registradas</Text>
      </View>

      {/* Lista de PYMES */}
      <ScrollView style={styles.listContainer}>
        {pymes.map((pyme) => (
          <View key={pyme.id} style={styles.pymeCard}>
            <Text style={styles.pymeName}>{pyme.nombreEmpresa}</Text>
            <Text style={styles.pymeLocation}>
              {pyme.ubicacion || 'Ubicación no disponible'}
            </Text>
            {pyme.categoria && (
              <Text style={styles.pymeCategory}>
                {pyme.categoria}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Botón flotante para agregar nueva PYME */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/registrarPymes')}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      <FooterTemplate />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 30
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#005BA8', // Azul Coppel
  },
  listContainer: {
    flex: 1,
    marginBottom: 16,
  },
  pymeCard: {
    backgroundColor: '#FBE23D', 
    borderWidth: 2, 
    borderColor: '#005BA8', 
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  pymeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  pymeLocation: {
    fontSize: 14,
    color: '#333',
  },
  pymeCategory: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 80, // Ajusta según la altura de tu footer
    backgroundColor: '#005BA8', // Azul Coppel
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});