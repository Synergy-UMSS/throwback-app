import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import LogOutButton from '../components/LogOutButton';
import { Linking } from 'react-native';


export default function Profile() {
  const user = auth().currentUser;

  const handleEmailLinkPress = () => {
    const email = 'throwback-app@protonmail.com';
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={styles.screen}>
      <Image source={{ uri: user?.photoURL }} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.bigLabel}>Información Personal</Text>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.text}>{user?.displayName}</Text>
        <Text style={styles.label}>Correo electrónico:</Text>
        <Text style={styles.text}>{user?.email}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.bigLabel}>Throwback</Text>
        <Text style={styles.label}>Correo electrónico de Soporte:</Text>
        <Text
          style={[styles.text, {textDecorationLine: 'underline'}]}
          onPress={handleEmailLinkPress}
        >
          throwback-app@protonmail.com
        </Text>
        <Text style={styles.label}>Versión de la Aplicación:</Text>
        <Text style={styles.text}> 1.0.0 (29122023)</Text>
      </View>
      <LogOutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e4e6dc',
  },

  bigLabel: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },

  card: {
    backgroundColor: '#b6bfd4',
    alignItems: 'baseline',
    alignSelf: 'center',
    flex: 0,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    width: '90%',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,// Añade subrayado para indicar enlace
  },
});