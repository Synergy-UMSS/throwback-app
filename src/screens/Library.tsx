import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      console.log('Se ha creado la playlist:', name);
      const updatedPlaylists = [name, ...playlists];
      setPlaylists(updatedPlaylists);
      const color = initialColors[colorIndex % initialColors.length];
      setPlaylistColors({ ...playlistColors, [name]: color });
      setColorIndex((prevIndex) => prevIndex + 1);
      setPlaylistName('');
      setShowModal(false);
    }
  };

  const handleSearch = () => {
    // Posible lógica para el Search
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu Biblioteca</Text>
        <View style={[styles.buttonContainer, { justifyContent: 'space-between', width: '30%', marginRight: 20 }]}>
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
          <Text style={styles.message}>Aún no tienes ninguna playlist, presiona "+".</Text>
        </View>
      ) : (
        <ScrollView style={styles.content}>
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
              <View style={{ marginBottom: 20, width: '100%' }}>
                <TextInput
                  style={[styles.input, { width: '100%' }]}
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
 
//My styleees
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E6DC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 22,
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
    paddingHorizontal: 20,
    marginTop: 50,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
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
     width: '100%',
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
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: '#4ADCC8',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  playlistBox: {
    backgroundColor: '#9DE0D2',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  playlistText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
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
});

export default Library;
