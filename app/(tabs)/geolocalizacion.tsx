import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {useRouter} from 'expo-router';
import { styles } from './styles';

export default function Geolocalizacion() {
    const router = useRouter();
    const handleGeolocalizacionReturn = () => {
        router.push('/home');
    }
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Pymes cercanos</Text>
            <TouchableOpacity style={styles.button} onPress={handleGeolocalizacionReturn}>
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>


        </View>
    );
}

