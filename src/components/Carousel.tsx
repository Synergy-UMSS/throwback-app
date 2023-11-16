import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Authenticate from '../screens/Authenticate';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

GoogleSignin.configure({
  webClientId: '123136814804-9t4p6s2pui4a9mrsrb0v5pedjjtvgb17.apps.googleusercontent.com',
});

const Carousel = () => {
  const navigation = useNavigation();

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
  };

  const RenderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, backgroundColor: item.backgroundColor, alignItems: 'center' }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

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
    bottom: 0,
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
