import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './styles';

export default function window() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Obtiene el nombre del parámetro de navegación
    const nombreEmpleado = params.nombreEmpleado || 'Colaborador';

    const handleRegister = () => {
        router.push('/registrarPymes');
    }

    const handleList = () => {
        router.push('/listaPymes');
    }

    const handleGeolocation = () => {
        router.push('/geolocalizacion');
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* Muestra el nombre del empleado */}
            <Text style={{ fontSize: 20, marginBottom: 20 }}>
                Hola {nombreEmpleado}!
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonText} onPress={handleRegister}>
                    Registrar PYMES
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleList}>
                <Text style={styles.buttonText}>Lista de Pymes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleGeolocation}>
                <Text style={styles.buttonText}>Geolocalizacion</Text>
            </TouchableOpacity>

        </View>
    );
}

