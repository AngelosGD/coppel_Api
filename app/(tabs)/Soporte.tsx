import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRef } from "react";
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from 'expo-router';

export default function Soporte() {
    const scrollViewRef = useRef(null);
    const router = useRouter();
    

    return (
        <ScrollView style={styles.container} ref={scrollViewRef}>
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.sectionTitle}>Soporte al Cliente</Text>
                </View>
                
            </View>

            <Text style={styles.sectionSubtitle}>Coppel App</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Opciones de Soporte</Text>
                
                <TouchableOpacity style={styles.optionItem}>
                    <Text style={styles.optionText}>Preguntas Frecuentes</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.optionItem}>
                    <Text style={styles.optionText}>Reportar un Problema</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.optionItem}>
                    <Text style={styles.optionText}>Soporte Telefónico</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Información de Contacto</Text>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Teléfono:</Text>
                    <Text style={styles.infoValue}>800 220 7735</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Correo:</Text>
                    <Text style={styles.infoValue}>soporte@coppel.com</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Horario:</Text>
                    <Text style={styles.infoValue}>Lunes a Domingo 8:00 - 22:00</Text>
                </View>
            </View>

            
            <TouchableOpacity>
                <Text style={[styles.ButtonVolver]}
                onPress={() => {
                    router.push('/home');
                }}
                >Volver al inicio</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2023 Coppel. Todos los derechos reservados.</Text>
                <Text style={styles.footerText}>Versión de la app 1.0.0</Text>
            </View>

          
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    titleContainer: {
        flex: 1,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0033A0',
        marginTop: 5,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 25,
    },
    scrollToTopButton: {
        padding: 5,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#0033A0',
    },
    optionItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    infoItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    infoLabel: {
        fontWeight: 'bold',
        width: 80,
        color: '#555',
    },
    infoValue: {
        flex: 1,
        color: '#333',
    },
    footer: {
        marginTop: 122,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
    },
    ButtonVolver: {
        backgroundColor: '#0033A0',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 20,
    },
});