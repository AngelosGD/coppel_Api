import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useRouter } from 'expo-router';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numeroEmpleado, setNumeroEmpleado] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    // Validaciones básicas
    if (!numeroEmpleado) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }


    setIsLoading(true);

    try {

      // 2. Consulta EXACTA a Firestore (con nombres reales de campos)
      const q = query(collection(db, "colaboradores"), where("numeroEmpleado", "==", numeroEmpleado));

      const querySnapshot = await getDocs(q);
      console.log("Resultados:", querySnapshot.docs.length); // Debug

      if (querySnapshot.empty) {
        throw new Error("No se encontró el colaborador con estas credenciales");
      }

      // Obtiene los datos del empleado
      const empleadoData = querySnapshot.docs[0].data();

      // Redirige a /home pasando el nombre como parámetro
      router.push({
        pathname: '/home',
        params: { nombreEmpleado: empleadoData.nombre || 'Colaborador' }
      });

    } catch (error) {
      console.error("Error completo:", error); // Debug detallado
      Alert.alert('Error', "Credenciales incorrectas o problema de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de sesión - Colaboradores</Text>



      <TextInput
        style={styles.input}
        placeholder="Número de empleado"
        value={numeroEmpleado}
        onChangeText={setNumeroEmpleado}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Verificando...' : 'Ingresar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>
          ¿Problemas con tu cuenta? Contacta al soporte
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '85%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 10,
  },
  button: {
    width: '85%',
    height: 50,
    backgroundColor: '#0066cc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#99c2ff',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#0066cc',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});