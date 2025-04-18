import { View, TouchableOpacity,Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { styles } from "./styles";
import {useRouter} from 'expo-router'

export default function FooterTemplate() {
   const router = useRouter();
 
    return (
    <View>
      {/* Barra de Navegación Inferior */}
      <View style={FooterStyles.bottomNav}>
        <TouchableOpacity
          style={FooterStyles.navButton}
          onPress={() => router.push("/home")}
        >
          <Ionicons name="home-outline" size={24} color="#2155a8" />
          <Text style={FooterStyles.navText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={FooterStyles.navButton}
          onPress={() => router.push("/geolocalizacion")}
        >
          <Ionicons name="location-outline" size={24} color="#2155a8" />
          <Text style={FooterStyles.navText}>Ubicación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={FooterStyles.navButton}
          onPress={() => router.push("/configuracion")}
        >
          <Feather name="settings" size={24} color="#2155a8" />
          <Text style={FooterStyles.navText}>Configuración</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={FooterStyles.navButton}
          onPress={() => router.push("/Soporte")}
        >
          <Ionicons name="help-circle-outline" size={24} color="#2155a8" />
          <Text style={FooterStyles.navText}>Soporte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const FooterStyles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingVertical: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60, 
      },
      navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 2,
      },
      navText: {
        fontSize: 10, 
        color: '#2155a8',
        marginTop: 4,
        fontWeight: '500',
      },
})