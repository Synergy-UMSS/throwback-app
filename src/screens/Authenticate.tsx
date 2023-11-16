import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // o el conjunto de iconos que prefieras

export default function Authenticate(props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={props.handleGoogleButtonPress} style={styles.button}>
        <View style={styles.buttonContent}>
          <Icon name="google" size={30} color="white" />
          <Text style={styles.text}>Iniciar Sesión con Google</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
