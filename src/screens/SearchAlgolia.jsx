import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert} from 'react-native';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-core';
import { SearchBox } from '../components/SearchBox';
import { InfiniteHits } from '../components/InfiniteHits';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const searchClient = algoliasearch('WR0BZC2M09', 'ca754dea094fcaa1920155862a92d9d7');

export default function SearchAlgolia() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <InstantSearch searchClient={searchClient} indexName="songs_throwback">
          <SearchBox />
          <InfiniteHits hitComponent={Hit} />
        </InstantSearch>
      </View>
    </SafeAreaView>
  );
}

function Hit({ hit }) {
  const [showOptions, setShowOptions] = useState(false);
  const navigation = useNavigation();
  const handleOptionPress = () => {
    console.log('cancion actual  ' + hit.title);
    setShowOptions(!showOptions);
  };

  const handlePlayPress = () => {
    navigation.navigate('Player', hit.objectID);
  };

  const checkSongMemory = async (song) => {      //Bug: Alerta de memoria asociada
    const memoriesRef = firestore().collection('memories');
    const querySnapshot = await memoriesRef.where('song', '==', hit.path).get();

    if (!querySnapshot.empty) {
      Alert.alert(
        '¿Volver a crear una memoria con esta canción?',
        'Esta canción ya está asociada.',
        [
            { text: 'Aceptar', onPress: redirectToCreateMemory },
            { text: 'Cancelar', onPress: handleOptionPress}
        ],
        { cancelable: false }
    );
    } else {
      redirectToCreateMemory();
    }
  };

  const redirectToCreateMemory = () => {
    navigation.navigate('CreateMemory', hit.objectID );
  };

  const createMemory = () => {
    checkSongMemory(hit);
  };
  return (
    <TouchableOpacity onPress={handlePlayPress}>
      <View style={styles.hitContainer}>
        <View style={styles.songContainer}>
          <Image source={{uri: hit.coverURL}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.songName}>{hit.title}</Text>
            <Text style={styles.artistName}>{hit.artist}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleOptionPress}>
          <MaterialCommunityIcons name="dots-vertical" size={30} color="gray" />
        </TouchableOpacity>
      </View>
      <Modal visible={showOptions} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri:hit.coverURL }} style={styles.imageSelected} />
            <Text style={styles.songName}>{hit.title}</Text>
            <Text style={styles.artistName}>{hit.artist}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cyanButton]}
                onPress={createMemory}
              >
                <Text style={styles.buttonText}>Crear Memoria Musical</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.salmonButton]}
                onPress={handleOptionPress}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  hitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  songName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777',
  },
  artistName: {
    fontSize: 14,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  imageSelected: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center', 
    justifyContent: 'center', // Bug: Texto del botón “Cerrar” no centrado.
  },
  salmonButton: {
    backgroundColor: 'salmon',
  },
  cyanButton: {
    backgroundColor: '#4ADCC8',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
