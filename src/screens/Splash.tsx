import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../utils/types';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({navigation}: SplashProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, [navigation]);

  return (
    <View>
      <Text
        style={{
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 200,
        }}
      >Logo Fachero</Text>
    </View>
  );
};

export default Splash;
