import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../utils/types';
import FastImage from 'react-native-fast-image';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({ navigation }: SplashProps) => {
  const titleOpacity = useRef(0).current;

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    gifContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    gif: {
      width: 200,
      height: 200,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.gifContainer}>
        <FastImage
          source={require('../assets/logo/pollito.gif')}
          style={styles.gif}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </View>
  );
};

export default Splash;
