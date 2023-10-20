import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Text,View, Image, StyleSheet} from 'react-native'; // Importa Image y StyleSheet
import {RootStackParamList} from '../utils/types';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({navigation}: SplashProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Splash');
    }, 8000000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.customFontText}>Throwback</Text>
      <Image source={require('../assets/logo-no-background.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#E4E6DC',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 200,
    height: 169,
  },
  customFontText: {
    color:'black',
    fontFamily: 'AdigianaUI',
    fontSize:40,
  },
});

export default Splash;
