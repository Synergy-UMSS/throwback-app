import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import Authenticate from './Authenticate';
import { useNavigation } from '@react-navigation/native';
import Carousel from '../components/Carousel';

const Login = () => {
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

      // Verificar si es la primera vez que el usuario inicia sesión
      const user = auth().currentUser;
      const isFirstSignIn = user?.metadata.creationTime === user?.metadata.lastSignInTime;
      console.log(isFirstSignIn)
      console.log(user?.metadata.creationTime)
      if (isFirstSignIn) {
        const playlistFav = {
          id: '',
          name: 'favs' + user?.displayName,
          songs_fav: [],
          userKey: auth().currentUser?.uid
        };
  
        firestore()
          .collection('playlist_fav')
          .add(playlistFav)
          .then((docRef) => {
            const playlistId = docRef.id;
            docRef.update({ id: playlistId }).then(() => {
              console.log(
                'Se ha creado la playlist con ID:',
                playlistId
              );
            });
          })
      }

      console.log('Logged in: ', user.displayName);
      console.log('User ID: ', user.uid);

      navigation.replace('Home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Carousel />
      {/* <Authenticate authenticated={authenticated} handleGoogleButtonPress={handleGoogleButtonPress} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Login;
