import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.endsWith('@coppel.com')) {
      alert('Solo colaboradores Coppel pueden acceder');
      return;
    }
    console.log('Login con:', email, password);
    // Aquí iría tu lógica de Firebase
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acceso Colaboradores</Text>
      
      <TextInput
        style={styles.input}
        placeholder="correo@coppel.com"
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
      
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    marginBottom: 20,
    fontSize: 18
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 4
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 4
  }
});
  

