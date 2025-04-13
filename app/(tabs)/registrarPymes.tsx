import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {useRouter} from 'expo-router';


export default function RegistrarPymes() {
    const router = useRouter();

    const handleRegisterPymesReturn = () => {
        router.push('/home');
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bienvenido al registro de PYMES</Text>
            
                <TouchableOpacity style={styles.buttonPymes} onPress={handleRegisterPymesReturn}>
                    <Text style={styles.buttonText}>Volver</Text>
                </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonPymes: {
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
})