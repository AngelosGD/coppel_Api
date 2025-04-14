import {StyleSheet} from 'react-native'


//Aqui creamos los estilos para usarse globalmente en la app
// y se pueden importar en cualquier parte de la app
export const styles = StyleSheet.create({
    button: {
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