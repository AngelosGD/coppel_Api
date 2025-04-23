import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import FooterTemplate from '../(tabs)/Footer';


export default function RegistrarPymes() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    nombreRegistrante: '',
    interesesCapacitacion: '',
    correoRegistrante: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!formData.nombreEmpresa || !formData.nombreRegistrante || !formData.correoRegistrante) {
      Alert.alert('Error', 'Por favor complete todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);

    try {
      // Agregar documento con solo syncStatus
      await addDoc(collection(db, 'pymes'), {
        ...formData,
        fechaRegistro: new Date().toISOString(),
        syncStatus: 'pending' // 👈 Único campo necesario para sincronización
      });

      Alert.alert('Éxito', 'PYME registrada correctamente');
      router.push('/home');
    } catch (error) {
      console.error('Error al registrar PYME:', error);
      Alert.alert('Error', 'Ocurrió un error al registrar la PYME');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterPymesReturn = () => {
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de PYMES</Text>

      <Text style={styles.label}>Nombre de la empresa *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Mi Negocio S.A."
        value={formData.nombreEmpresa}
        onChangeText={(text) => handleInputChange('nombreEmpresa', text)}
      />

      <Text style={styles.label}>Nombre del registrante *</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu nombre completo"
        value={formData.nombreRegistrante}
        onChangeText={(text) => handleInputChange('nombreRegistrante', text)}
      />

      <Text style={styles.label}>Correo electrónico *</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        value={formData.correoRegistrante}
        onChangeText={(text) => handleInputChange('correoRegistrante', text)}
      />

      <Text style={styles.label}>Intereses en capacitación</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Marketing digital, Finanzas"
        value={formData.interesesCapacitacion}
        onChangeText={(text) => handleInputChange('interesesCapacitacion', text)}
      />

      <View style={{display: 'flex'}}>
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Registrando...' : 'Validar Pyme'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleRegisterPymesReturn}
        >
          <Text style={styles.buttonTextSecondary}>Validar con documento</Text>
        </TouchableOpacity>
      </View>

      <FooterTemplate></FooterTemplate>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FBE23D",
    margin: 10,
  },
  secondaryButton: {
    backgroundColor: '#32d572',
  },
  disabledButton: {
    backgroundColor: '#99c2ff',
  },
  buttonText: {
    color: '#1370DAF7',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});