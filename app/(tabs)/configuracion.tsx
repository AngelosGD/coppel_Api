import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FooterTemplate from "../(tabs)/Footer";

interface UserParams {
  nombre?: string;
  apellidos?: string;
  email?: string;
  numeroEmpleado?: string;
  [key: string]: any;
}
export default function Configuracion() {
  const params = useLocalSearchParams<UserParams>();

  const userData = {
    nombre: params.nombre || "Colaborador",
    apellidos: params.apellidos || "",
    email: params.email || "correo@ejemplo.com",
    numeroEmpleado: params.numeroEmpleado || "No disponible",
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configuración</Text>
      </View>

      {/* Información del usuario */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userIcon}>
          <Ionicons name="person-circle-outline" size={60} color="#2155a8" />
        </View>

        <Text style={styles.userName}>
          {userData.nombre} {userData.apellidos}
        </Text>

        <Text style={styles.userEmail}>{userData.email}</Text>

        <Text style={styles.userDetail}>
          Número de empleado: {userData.numeroEmpleado}
        </Text>
      </View>

      {/* Opciones de configuración */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias</Text>

        <View style={styles.option}>
          <Ionicons name="notifications-outline" size={24} color="#2155a8" />
          <Text style={styles.optionText}>Notificaciones</Text>
        </View>

        <View style={styles.option}>
          <Ionicons name="moon-outline" size={24} color="#2155a8" />
          <Text style={styles.optionText}>Modo oscuro</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>

        <View style={styles.option}>
          <Ionicons name="lock-closed-outline" size={24} color="#2155a8" />
          <Text style={styles.optionText}>Seguridad</Text>
        </View>

        <View style={styles.option}>
          <Ionicons name="help-circle-outline" size={24} color="#2155a8" />
          <Text style={styles.optionText}>Ayuda</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Versión 1.0.0</Text>
      </View>
      <View style={styles.footer}>
        <FooterTemplate></FooterTemplate>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2155a8",
    textAlign: "center",
  },
  userInfoContainer: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  userIcon: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2155a8",
    marginBottom: 15,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
  },
  footer: {
    padding: 20,
    alignItems: "center",
    marginTop: 50,
  },
  versionText: {
    fontSize: 12,
    color: "#999",
  },
  userDetail: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
});
