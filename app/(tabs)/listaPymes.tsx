import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {useRouter} from 'expo-router';

export default function ListaPymes() {
    const router = useRouter();
    const handleListReturn = () => {
        router.push('/home');
    }
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Lista de Pymes</Text>
            <TouchableOpacity style={styles.buttonPymes} onPress={handleListReturn}>
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