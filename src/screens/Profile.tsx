import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import LogOutButton from '../components/LogOutButton';

export default function Profile() {
  const user = auth().currentUser;
  return (
    <View style={styles.screen}>
      <Image source={{uri: user?.photoURL}} style={styles.image} />
      <Text style={styles.text}>{user?.displayName}</Text>
      <Text style={styles.text}>{user?.email}</Text>
      <LogOutButton></LogOutButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc2c2',
  },
  title: {
    fontSize: 25,
    marginBottom: 30,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
});
