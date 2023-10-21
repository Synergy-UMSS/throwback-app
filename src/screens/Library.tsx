import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const Library = () => {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState<string[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [playlistColors, setPlaylistColors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState('');

  const initialColors = ['#C7A9D5', '#B6BFD4', '#9DE0D2', '#BFEAAF', '#F6EA7E', '#F0CC8B', '#FBBAA4', '#FFC1D8'];

  const handlePressMore = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
  };

  const MAX_NAME_LENGTH = 50;


  const handleCreatePlaylist = (name: string) => {
    if (name.trim() === '') {
      setError('Este campo es obligatorio.');
    } else {
      setError('');
      const color = initialColors[colorIndex % initialColors.length];
      const timestamp = new Date().getTime();
      const playlistData = {
        name: name,
        createDate: timestamp,
      };

      firestore()
        .collection('playlists') 
        .add(playlistData)
        .then((docRef) => {
          console.log('Se ha creado la playlist:', name);
          const updatedPlaylists = [name, ...playlists];
          setPlaylists(updatedPlaylists);
          setPlaylistColors({ ...playlistColors, [name]: color });
          setColorIndex((prevIndex) => prevIndex + 1);
          setPlaylistName('');
          setShowModal(false);
        })
        .catch((error) => {
          console.error('Error al crear la playlist:', error);
        });
    }
  };


  const handleSearch = () => {
    // Posible lógica para el Search
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu Biblioteca</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Ionicons name="search" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePressMore}>
            <Ionicons name="add" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {playlists.length === 0 ? (
        <View style={styles.content}>
          <Text style={styles.message}>Aún no tienes ninguna playlist, presiona "+" para crear una.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {playlists.map((playlist, index) => {
            const color = playlistColors[playlist] || initialColors[index % initialColors.length];
            return (
              <View key={index} style={[styles.playlistBox, { backgroundColor: color }]}>
                <Text style={styles.playlistName}>{playlist}</Text>
                <Text style={styles.playlistLabel}>Playlist</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.customModalContent}>
            <Text style={[styles.modalTitle, { textAlign: 'left' }]}>Dale un nombre a tu playlist</Text>
            <View style={[styles.inputContainer, { marginBottom: 20 }]}>
              <TextInput
                style={styles.input}
                value={playlistName}
                onChangeText={(text) => {
                  setPlaylistName(text.slice(0, MAX_NAME_LENGTH));
                  setError('');
                }}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.createButton} onPress={() => handleCreatePlaylist(playlistName)}>
                <Text style={styles.buttonText}>Crear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E6DC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  customModalContent: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  createButton: {
    backgroundColor: '#FA8071',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginRight: 5,
  },
  closeButton: {
    backgroundColor: '#4ADCC8',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  playlistBox: {
    backgroundColor: '#9DE0D2',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  playlistName: {
    color: 'black',
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 5,
  },
  playlistLabel: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    fontSize: 12,
    marginTop: -20,
  },
  inputContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Library;