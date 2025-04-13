import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


export default function window() {
    const router = useRouter();
    const handleRegister = () => {
        router.push('/registrarPymes');
    }

    const handleList = () => {
        router.push('/listaPymes');
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bienvenido!.</Text>

            <TouchableOpacity style={styles.buttonPymes} onPress={() => { }}>
                <Text style={styles.buttonText} onPress={handleRegister}>
                    Registrar PYMES
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonPymes} onPress={handleList}>
                <Text style={styles.buttonText}>Lista de Pymes</Text>    
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

