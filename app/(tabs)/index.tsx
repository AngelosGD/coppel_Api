import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <TextInput
        placeholder="Número de empleado"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry={true}
      />
      <Button
        title="Iniciar sesión"
        onPress={() => {}}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
