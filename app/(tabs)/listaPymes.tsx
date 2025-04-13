import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {useRouter} from 'expo-router';
import { styles } from './styles';

export default function ListaPymes() {
    const router = useRouter();
    const handleListReturn = () => {
        router.push('/home');
    }
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Lista de Pymes</Text>
            <TouchableOpacity style={styles.button} onPress={handleListReturn}>
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>


        </View>
    );
}
