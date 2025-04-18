import { Text, View } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Configuracion(){
    const params = useLocalSearchParams();
    const apellidosEmpleado = params.apellidosEmpleado || 'Colaborador';
    
    return ( 
        <View>
            <Text>{apellidosEmpleado}</Text>
        </View>

    )
}