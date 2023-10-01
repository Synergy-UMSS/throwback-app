import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MiniPlayer from '../components/MiniPlayer';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import { MusicPlayerProvider } from '../components/MusicPlayerContext';

const Home = ({navigation}) => {
  return (
    <View >
        <Text>Home</Text>
        <MiniPlayer navigation={navigation }/>
    </View> 
  );
};

export default Home;

const style = StyleSheet.create({
  full:{
    flex:1,
  },
});
