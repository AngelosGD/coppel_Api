import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {useRouter} from 'expo-router';
import { styles } from './styles';

export default function RegistrarPymes() {
    const router = useRouter();

    const handleRegisterPymesReturn = () => {
        router.push('/home');
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bienvenido al registro de PYMES</Text>
            
                <TouchableOpacity style={styles.button} onPress={handleRegisterPymesReturn}>
                    <Text style={styles.buttonText}>Volver</Text>
                </TouchableOpacity>
        </View>
    );
}
