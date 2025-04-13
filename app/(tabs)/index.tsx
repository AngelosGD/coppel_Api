import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from '../../firebase';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter} from 'expo-router'
import { isLoaded } from 'expo-font';



export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  

  const router = useRouter();

  const handleLogin = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Correo electronico no valido!!');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Inicio con exito!!', `Bienvenido, ${user.email}`);
        router.push('/home');
        setIsLoggedIn(true);
      })
      .catch((error) => {
        Alert.alert('Ups!, algo salio mal', error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Inicio de sesion - Colaboradores</Text>
    
    <TextInput
      style={styles.input}
      placeholder="coppel@gmail.comsd"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
    />
    
    <TextInput
      style={styles.input}
      placeholder="Contraseña"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    
    <TouchableOpacity 
      style={styles.button} 
      onPress={handleLogin}
      disabled={isLoading}
    >
      <Text style={styles.buttonText}>
        {isLoading ? 'Cargando...' : 'Ingresar'}
      </Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.link }>
      <Text style={styles.colorLink}>Tu cuenta no funciona?. ponte en contacto con el soporte de coppel</Text>
    </TouchableOpacity>
  </View>

);

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 15,
  },
  button: {
    width: '80%',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  link: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 40,
    
  },
  colorLink: {
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  }
});