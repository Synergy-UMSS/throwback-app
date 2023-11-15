import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Authenticate from './Authenticate';
import { useNavigation } from '@react-navigation/native';
import Carousel from '../components/Carousel';

const Login = (props) => {
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId: '123136814804-9t4p6s2pui4a9mrsrb0v5pedjjtvgb17.apps.googleusercontent.com',
  });

  const [authenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  async function handleGoogleButtonPress() {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      console.log('Logged in' + idToken);
      console.log('sigan viendoooo');
      console.log(auth().currentUser.uid);
      console.log(auth().currentUser.displayName);
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
