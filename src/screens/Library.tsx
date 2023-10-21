import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LibraryProps = {
  navigation: StackNavigationProp<{}>;
};

const Library: React.FC<LibraryProps> = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState<string[]>([]);
  const nav = useNavigation();
  
const initialColors = ['#C7A9D5','#B6BFD4', '#9DE0D2', '#BFEAAF', '#F6EA7E', '#F0CC8B', '#FBBAA4', '#FFC1D8'];
const [colorIndex, setColorIndex] = useState(0);
const [playlistColors, setPlaylistColors] = useState<{ [key: string]: string }>({});


  const handlePressMore = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreatePlaylist = (name: string) => {
    if (name.trim() !== '') {
      const updatedPlaylists = [name, ...playlists];
      setPlaylists(updatedPlaylists);
      setPlaylistName('');
      setShowModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu biblioteca</Text>
        <View style={styles.buttonContainer}>
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
          let color;
          if (playlistColors[playlist]) {
            color = playlistColors[playlist];
          } else {
            color = initialColors[colorIndex % initialColors.length];
            setColorIndex(colorIndex + 1);
            setPlaylistColors({ ...playlistColors, [playlist]: color });
          }
          return (
            <View key={index} style={[styles.playlistBox, { backgroundColor: color }]}>
              <Text style={styles.playlistName}>{playlist}</Text>
              <Text style={styles.playlistLabel}>Playlist</Text>
            </View>
          );
        }).reverse()}
      </ScrollView>
      )}

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.customModalContent}>
            <Text style={[styles.modalTitle, { textAlign: 'left' }]}>Dale un nombre a tu playlist</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la playlist"
              value={playlistName}
              onChangeText={(text) => setPlaylistName(text)}
            />
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
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    marginLeft: 10,
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
});

export default Library;
