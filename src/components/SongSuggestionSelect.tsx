import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { usePlayerStore } from '../store/playerStore';
import { usePlaylistStore } from '../store/playlistStore';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import { useSuccesfulMessage } from '../helpcomponents/succesfulMessage';

const SongSuggestionSelect = ({ songData, screenSelected }) => {
  const { title, artist, artwork } = songData;
  const [showOptions, setShowOptions] = useState(false);
  const navigation = useNavigation();
  const { setCurrentSong, currentSong } = usePlayerStore();
  const {currentPlaylist} = usePlaylistStore();
  const {setIsAdded} = useSuccesfulMessage();

  const handleOptionPress = () => {
    setCurrentSong(songData);
		console.log('en interno', songData);
    setShowOptions(!showOptions);
  };

  const addSongPlaylist = async (song) => {
    const docRef = firestore().collection('playlists').doc(currentPlaylist.id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (Array.isArray(data.songs)) {
          data.songs.push(song);
    docRef.update({
            songs: data.songs
    })
      .then(() => {
        console.log('Dato agregado con éxito');
      })
      .catch((error) => {
        console.error('Error al actualizar el documento:', error);
      });
            setIsAdded(true);
            navigation.navigate('Playlist', {currentSong});
        } else {
          console.error('El campo songs no es un arreglo o no existe');
        }
      } else {
        console.error('No se encontró el documento');
      }
    });
  }

  const backToPlaylist = () => {
		setCurrentSong(songData);
    console.log('en externo', songData);
    addSongPlaylist(songData);
  }

  return (
    <TouchableOpacity onPress={backToPlaylist}>
      <View host="lazyload-list" style={styles.container}>
        <View style={styles.songContainer}>
          {artwork ? (
            typeof artwork === 'number' ? (
              <FastImage source={artwork} style={styles.image} />
            ) : (
              <FastImage source={{ uri: artwork }} style={styles.image} />
            )
          ) : (
            <Image source={require('../assets/logo.png')} style={styles.image} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.songName}>{title}</Text>
            <Text style={styles.artistName}>{artist}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleOptionPress}>
          <MaterialCommunityIcons name="dots-vertical" size={30} color="gray" />
        </TouchableOpacity>
      </View>
        <Modal visible={showOptions} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity onPress={handleOptionPress} style={styles.closeButton}>
                  <MaterialCommunityIcons name="close" size={30} color="gray" />
                </TouchableOpacity>
              </View>
              {artwork ? (
                typeof artwork === 'number' ? (
                  <FastImage source={artwork} style={styles.imageSelected} />
                ) : (
                  <FastImage source={{ uri: artwork }} style={styles.imageSelected} />
                )
              ) : (
                <Image source={require('../assets/logo.png')} style={styles.imageSelected} />
              )}
              <Text style={styles.songName}>{title}</Text>
              <Text style={styles.artistName}>{artist}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cyanButton]} onPress={backToPlaylist}>
                  <Text style={styles.buttonText}>Agregar canción</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: '#DAA1D1',
  },
  cyanButton: {
    backgroundColor: '#4ADCC8',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 0.5,
    right: 0.5,
  },
  closeButton: {
    padding: 5,
  },
});

export default SongSuggestionSelect;