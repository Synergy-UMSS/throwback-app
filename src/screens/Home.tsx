import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MiniPlayer from '../components/MiniPlayer';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MusicPlayerProvider} from '../components/MusicPlayerContext';

const Home = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 28 : 12,
        position: 'relative', // Agrega esta propiedad
      }}>
      <MiniPlayer navigation={navigation} />
    </View>
  );
};

export default Home;
