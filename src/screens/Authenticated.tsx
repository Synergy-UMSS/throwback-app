import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Authenticated() {
  useEffect(()=> {
    const createUserPlaylist = async () => {
      const user = auth().currentUser;
      if (user) {
        const userKey = user.uid;
        const userPlaylistRef = firestore().collection('playlist_fav').doc(userKey);
        const userPlaylistDoc = await userPlaylistRef.get();

        if (!userPlaylistDoc.exists) {
          await userPlaylistRef.set({
            created_at: firestore.FieldValue.serverTimestamp()
          });
        }
      }
    };
    createUserPlaylist();
  },[]);
  const user = auth().currentUser;
  console.log('Si se ejecutaaaa');
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>You have logged in successfully</Text>
      <Image source={{uri: user?.photoURL}} style={styles.image} />
      <Text style={styles.text}>{user?.displayName}</Text>
      <Text style={styles.text}>{user?.email}</Text>
      <View style={{marginTop: 30}}>
        <Button title="Log out" />
      </View>
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
