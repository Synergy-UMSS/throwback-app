import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import LogOutButton from '../components/LogOutButton';

export default function Profile() {
  const user = auth().currentUser;
  return (
    <View style={styles.screen}>
      <Image source={{uri: user?.photoURL}} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.bigLabel}>Información Personal</Text>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.text}>{user?.displayName}</Text>
        <Text style={styles.label}>Correo electronico:</Text>
        <Text style={styles.text}>{user?.email}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.bigLabel}>Trowback</Text>
        <Text style={styles.label}>Correo electronico:</Text>
        <Text style={styles.text}>throwback-app@protonmail.com</Text>
        <Text style={styles.label}>Correo electronico:</Text>
        <Text style={styles.text}>{user?.email}</Text>
      </View>
      <LogOutButton></LogOutButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  bigLabel: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold'
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },

  card:{
    backgroundColor: '#e4e6dc',
    alignItems: 'baseline',
    alignSelf: 'center',
    flex: 0,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    width: '90%',
    
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center'
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10
  },
});
