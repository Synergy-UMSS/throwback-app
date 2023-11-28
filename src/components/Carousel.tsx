import React, { useState, useEffect } from 'react';
import auth, { FirebaseError } from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninUser } from '@react-native-google-signin/google-signin';
import Authenticate from '../screens/Authenticate';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId: '123136814804-9t4p6s2pui4a9mrsrb0v5pedjjtvgb17.apps.googleusercontent.com',
});

const Carousel = () => {
  const navigation = useNavigation();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleButtonPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      console.log('Logged in ' + idToken);
      console.log('sigan viendoooo');
      console.log(auth().currentUser?.uid);
      console.log(auth().currentUser?.displayName);

      const user = auth().currentUser;
      const isFirstSignIn = user?.metadata.creationTime === user?.metadata.lastSignInTime;

      console.log(isFirstSignIn);
      console.log(user?.metadata.creationTime);
      console.log(user?.metadata.lastSignInTime);

      if (isFirstSignIn) {
        const playlistFav = {
          id: '',
          name: 'favs',
          songs_fav: [],
          userKey: auth().currentUser?.uid,
        };

        const docRef = await firestore().collection('playlist_fav').add(playlistFav);
        const playlistId = docRef.id;

        await docRef.update({ id: playlistId });

        console.log('Se ha creado la playlist con ID:', playlistId);
      }

      navigation.replace('Home');
    } catch (error) {
      handleGoogleSignInError(error);
    }
  };

  const handleGoogleSignInError = (error: FirebaseError) => {
    console.log('Google Sign In Error:', error.code, error.message);
  };

  const RenderItem = ({ item }) => (
    <View style={{ flex: 1, backgroundColor: item.backgroundColor, alignItems: 'center' }}>
      <Text style={styles.introTitleStyle}>{item.title}</Text>
      <Image style={styles.introImageStyle} source={item.image} />
      <Text style={styles.introTextStyle}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        showSkipButton={false}
        showNextButton={false}
        showPrevButton={false}
        showDoneButton={false}
      />
      <View style={styles.authenticateContainer}>
        <Authenticate authenticated={authenticated} handleGoogleButtonPress={handleGoogleButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  introImageStyle: {
    paddingTop: 100,
    width: 380,
    height: 600,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  authenticateContainer: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    backgroundColor: 'transparent',
    padding: 16,
  },
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

const slides = [
  {
    key: 's1',
    image: require('../assets/carousel/Carrusel1.png'),
    backgroundColor: '#E5F8FF',
  },
  {
    key: 's2',
    image: require('../assets/carousel/Carrusel2.png'),
    backgroundColor: '#FFF8EC',
  },
  {
    key: 's3',
    image: require('../assets/carousel/Carrusel3.png'),
    backgroundColor: '#B3FFED',
  },
];

export default Carousel;