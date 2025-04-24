import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import FooterAAdminTemplate from "../(tabs)/FooterAdmin";


export default function AdminView() {
    const router = useRouter();

    // Datos de ejemplo
    const areas = [
        {
            id: 1,
            nombre: "Zona Norte",
            jefe: "María González",
            cobradores: 5,
            activos: 3
        },
        {
            id: 2,
            nombre: "Zona Centro",
            jefe: "Carlos Martínez",
            cobradores: 8,
            activos: 6
        },
        {
            id: 3,
            nombre: "Zona Sur",
            jefe: "Luisa Ramírez",
            cobradores: 7,
            activos: 4
        }
    ];

    const cobradores = [
        { id: 1, nombre: "Juan Pérez", area: "Zona Norte", status: "Activo" },
        { id: 2, nombre: "Ana Sánchez", area: "Zona Norte", status: "Inactivo" },
        { id: 3, nombre: "Pedro López", area: "Zona Centro", status: "Activo" },
        { id: 4, nombre: "Marta Díaz", area: "Zona Sur", status: "Activo" }
    ];

    return (
        <ScrollView style={styles.container}>
           

            {/* Resumen */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Resumen General</Text>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>Áreas</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>20</Text>
                        <Text style={styles.statLabel}>Cobradores</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>13</Text>
                        <Text style={styles.statLabel}>Activos</Text>
                    </View>
                </View>
            </View>

            {/* Áreas */}
            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.cardTitle}>Áreas de Cobranza</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>Ver todos</Text>
                    </TouchableOpacity>
                </View>
                
                {areas.map((area) => (
                    <TouchableOpacity 
                        key={area.id} 
                        style={styles.areaItem}
                    >
                        <View style={styles.areaInfo}>
                            <Text style={styles.areaName}>{area.nombre}</Text>
                            <Text style={styles.areaManager}>Jefe: {area.jefe}</Text>
                        </View>
                        <View style={styles.areaStats}>
                            <Text style={styles.areaStat}>{area.cobradores} cobradores</Text>
                            <Text style={[styles.areaStat, styles.activeStat]}>{area.activos} activos</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Cobradores recientes */}
            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.cardTitle}>Cobradores Recientes</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>Ver todos</Text>
                    </TouchableOpacity>
                </View>
                
                {cobradores.map((cobrador) => (
                    <View key={cobrador.id} style={styles.cobradorItem}>
                        <View style={styles.cobradorInfo}>
                            <Text style={styles.cobradorName}>{cobrador.nombre}</Text>
                            <Text style={styles.cobradorArea}>{cobrador.area}</Text>
                        </View>
                        <View style={[
                            styles.statusBadge,
                            cobrador.status === "Activo" ? styles.activeBadge : styles.inactiveBadge
                        ]}>
                            <Text style={styles.statusText}>{cobrador.status}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Acciones rápidas */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Acciones Rápidas</Text>
                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="person-add" size={24} color="#0033A0" />
                        <Text style={styles.actionText}>Nuevo Cobrador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="business" size={24} color="#0033A0" />
                        <Text style={styles.actionText}>Crear Área</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="stats-chart" size={24} color="#0033A0" />
                        <Text style={styles.actionText}>Reportes</Text>
                    </TouchableOpacity>
                </View>
            </View>

           

            {/* Footer Admin */}    
            <FooterAAdminTemplate userD={{}} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 15,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0033A0',
        marginTop: 5,
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
        color: '#0033A0',
        marginBottom: 15,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    seeAll: {
        color: '#0033A0',
        fontSize: 14,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0033A0',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    areaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    areaInfo: {
        flex: 1,
    },
    areaName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    areaManager: {
        fontSize: 14,
        color: '#666',
    },
    areaStats: {
        marginRight: 15,
        alignItems: 'flex-end',
    },
    areaStat: {
        fontSize: 13,
        color: '#666',
    },
    activeStat: {
        color: '#4CAF50',
    },
    cobradorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cobradorInfo: {
        flex: 1,
    },
    cobradorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    cobradorArea: {
        fontSize: 14,
        color: '#666',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    activeBadge: {
        backgroundColor: '#E8F5E9',
    },
    inactiveBadge: {
        backgroundColor: '#FFEBEE',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    actionText: {
        marginTop: 5,
        fontSize: 12,
        color: '#0033A0',
        textAlign: 'center',
    },
    footer: {
        marginTop: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#666',
    },
});