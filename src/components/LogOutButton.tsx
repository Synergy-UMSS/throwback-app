import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {View, Button} from 'react-native';

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
    <View style={styles.container}>
      <Button title="Log out" onPress={handleLogOut} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default LogOutButton;
