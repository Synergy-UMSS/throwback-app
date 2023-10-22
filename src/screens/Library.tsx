import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';

const Library = () => {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState<string[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [playlistColors, setPlaylistColors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState('');
  const colorSequence = ['#FBBAA4', '#F0CC8B', '#F6EA7E', '#BFEAAF', '#9DE0D2', '#B6BFD4', '#C7A9D5', '#FFC1D8'];
  const initialColors = ['#FBBAA4', '#F0CC8B', '#F6EA7E', '#BFEAAF', '#9DE0D2', '#B6BFD4', '#C7A9D5', '#FFC1D8'];
  const navigation = useNavigation();

  const handlePressMore = () => {
    setShowModal(true);
  };

  const handlePlayListView = async (playlistName) => {
    try {
      const playlistRef = await firestore().collection('playlists').where('name', '==', playlistName).get();
      if (!playlistRef.empty) {
        const playlistDoc = playlistRef.docs[0];
        const playlistId = playlistDoc.id;
        navigation.navigate('Playlist', { playlistName, playlistId });
        console.log(playlistName, playlistId);
      } else {
        console.error(`No se encontró ninguna playlist con el nombre ${playlistName}`);
      }
    } catch (error) {
      console.error('Error al obtener la playlist:', error);
    }
  };

useEffect(() => {
  const unsubscribe = firestore()
    .collection('playlists')
    .orderBy('createDate', 'desc') // Ordenar por createDate en orden descendente
    .onSnapshot((querySnapshot) => {
      const playlistsData: string[] = [];
      const colorsData: { [key: string]: string } = {};
      querySnapshot.forEach((doc) => {
        const { name, createDate } = doc.data();
        playlistsData.push(name);
        // Puedes ajustar esta lógica según tu implementación específica para obtener el color
        const color = initialColors[Math.floor(Math.random() * initialColors.length)];
        colorsData[name] = color;
      });
      setPlaylists(playlistsData);
      setPlaylistColors(colorsData);
    });

          return () => unsubscribe();
  }, []);

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
      const colorIndex = playlists.length % colorSequence.length;
      const color = colorSequence[colorIndex];
      const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
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
  
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('playlists')
      .orderBy('createDate', 'desc') // Ordenar por createDate en orden descendente
      .onSnapshot((querySnapshot) => {
        const playlistsData: string[] = [];
        const colorsData: { [key: string]: string } = {};
        let index = 0;
        querySnapshot.forEach((doc) => {
          const { name, createDate } = doc.data();
          playlistsData.push(name);
          const color = colorSequence[index % colorSequence.length];
          colorsData[name] = color;
          index++;
        });
        setPlaylists(playlistsData);
        setPlaylistColors(colorsData);
      });

    return () => unsubscribe();
  }, []);
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
              <TouchableOpacity key={index} onPress={()=>handlePlayListView(playlist)} style={[styles.playlistContainer]}>
                <View style={[styles.playlistBackground, { backgroundColor: `${color}B3` }]} />
                <View style={styles.playlistBox}>
                  <Text style={styles.playlistName}>{playlist}</Text>
                  <Text style={styles.playlistLabel}>Playlist</Text>
                </View>
              </TouchableOpacity>
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

//My Styles
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.8)', 
    padding: 20,
    borderRadius: 10,
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
  playlistContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    position: 'relative',
  },
  playlistBackground: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    zIndex: -1,
    borderRadius: 15,
    opacity: 0.8, 
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