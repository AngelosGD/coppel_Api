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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
    },
    locationButton: {
        backgroundColor: '#4CAF50',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
})