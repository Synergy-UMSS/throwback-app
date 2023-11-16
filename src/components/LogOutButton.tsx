import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const LogOutButton = () => {
  const handleLogOut = async () => {
    try {
      // Revoca el token de acceso de Google
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      // Cierra la sesión en Firebase
      await auth().signOut();

      console.log('User signed out!');

      // Después del logout, redirige al usuario a la pantalla de inicio de sesión
    //   navigation.replace('Login'); // o 'Splash' u otra pantalla que desees
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Pressable onPress={handleLogOut} style={styles.container}>
      <Text style={styles.text}>
        Cerrar Sesión      
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20, // Ajusta el tamaño horizontal según tus preferencias
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fbbaa4',
    alignSelf: 'center',
  },
  text:{
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default LogOutButton;
