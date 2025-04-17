import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useRouter } from 'expo-router';



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
    <View >
      <Image
        source={require('../../assets/images/Logo-coppel.png')}
        style={LocalStyles.logoCoppel}
      />

      <Text style={[LocalStyles.Text1]}>Hola!</Text>
      <Text style={[LocalStyles.Text2]}>Inicia sesion con su correo y numero de empleado.</Text>

      <Text style={[LocalStyles.Text3]}>Correo Electronico</Text>
      <TextInput
        placeholder="Correo electronico"
        style={[LocalStyles.InputCorreo]}
      />
      <Text style={[LocalStyles.requeridoText]}>Requerido</Text>

      <Text style={[LocalStyles.Text3]}>Numero de empleado</Text>
      <TextInput
        placeholder="Numero de empleado"
        value={numeroEmpleado}
        onChangeText={setNumeroEmpleado}
        style={[LocalStyles.InputCorreo]}
      />
      <Text style={[LocalStyles.requeridoText]}>Requerido</Text>
      <TouchableOpacity
        onPress={handleLogin}
        disabled={isLoading}
        style={[LocalStyles.ingresarButton]}
      >
        <Text style={[LocalStyles.textButton]}>
          {isLoading ? 'Verificando...' : 'Ingresar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity >
        <Text style={[LocalStyles.Text2]}>
          Tu cuenta no funciona?, ponte en contacto con el soporte de coppel!.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const LocalStyles = StyleSheet.create({
  logoCoppel: {
    alignSelf: 'center',
    marginTop: '5%',
    transform: [{ scale: 0.8 }],
    marginBottom: '-24%',
  },
  Text1: {
    fontSize: 28,
    fontWeight: 500,
    textAlign: 'center',
    color: 'blue',

  },
  Text2: {
    fontSize: 13,
    textAlign: 'center',
    color: 'blue',
    opacity: 0.65,
    marginBottom: '5%',
    marginTop: '2%',
  },
  Text3: {
    fontSize: 14.5,
    fontWeight: 500,
    textAlign: 'left',
    marginTop: '5%',
    paddingLeft: '6%',
  },
  InputCorreo: {
    height: 45,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    paddingLeft: '2%',
    borderColor: '#E0E0E0',
    borderWidth: 2,
    alignSelf: 'center',
  },
  requeridoText: {
    fontSize: 12,
    opacity: 0.65,
    marginLeft: '6%',
    marginTop: '1%',
  },
  ingresarButton: {
    height: 45,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#f2df38',
    paddingLeft: '2%',
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    
  },
  textButton:{
      fontSize: 16,
      fontWeight: 500,
  }


});