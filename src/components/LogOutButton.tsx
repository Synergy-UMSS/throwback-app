import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const LogOutButton = () => {
  const handleLogOut = async () => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      await auth().signOut();

      console.log('User signed out!');
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
    paddingHorizontal: 20, 
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
