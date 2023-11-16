<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
=======
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
>>>>>>> c69cf56ed6b8dc2618f8b1a7b54817390c41d8f1
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import Authenticate from './Authenticate';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD

const Login = () => {
=======
import Carousel from '../components/Carousel';

const Login = (props) => {
>>>>>>> c69cf56ed6b8dc2618f8b1a7b54817390c41d8f1
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId: '123136814804-9t4p6s2pui4a9mrsrb0v5pedjjtvgb17.apps.googleusercontent.com',
  });

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleGoogleButtonPress() {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
<<<<<<< HEAD

      // Verificar si es la primera vez que el usuario inicia sesión
      const user = auth().currentUser;
      const userDoc = await firestore().collection('playlist_fav').doc(user.uid).get();

      if (!userDoc.exists) {
        // El usuario está iniciando sesión por primera vez, crea el documento
        await firestore().collection('playlist_fav').doc(user.uid).set({
          id: user.uid, // o puedes usar firestore().collection('playlist_fav').doc().id para generar un ID
          name: 'favs',
          songs_fav: [],
          userKey: user.uid,
        });
      }

      console.log('Logged in: ', user.displayName);
      console.log('User ID: ', user.uid);

=======
      console.log('Logged in' + idToken);
      console.log('sigan viendoooo');
      console.log(auth().currentUser.uid);
      console.log(auth().currentUser.displayName);
>>>>>>> c69cf56ed6b8dc2618f8b1a7b54817390c41d8f1
      navigation.replace('Home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
<<<<<<< HEAD
    <View>
      <Authenticate handleGoogleButtonPress={handleGoogleButtonPress} />
=======
    <View style={styles.container}>
      <Carousel />
      {/* <Authenticate authenticated={authenticated} handleGoogleButtonPress={handleGoogleButtonPress} /> */}
>>>>>>> c69cf56ed6b8dc2618f8b1a7b54817390c41d8f1
    </View>
  );
};

<<<<<<< HEAD
export default Login;
=======
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Login;
>>>>>>> c69cf56ed6b8dc2618f8b1a7b54817390c41d8f1
