import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';
import { usePlaylistStore } from '../store/playlistStore';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MiniPlayer from '../components/MiniPlayer';

const Library = () => {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState<string[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [playlistColors, setPlaylistColors] = useState<{ [key: string]: string }>(
    {},
  );
  const [error, setError] = useState('');
  const colorSequence = [
    '#FBBAA4',
    '#F0CC8B',
    '#F6EA7E',
    '#BFEAAF',
    '#9DE0D2',
    '#B6BFD4',
    '#C7A9D5',
    '#FFC1D8',
  ];
  const initialColors = [
    '#FBBAA4',
    '#F0CC8B',
    '#F6EA7E',
    '#BFEAAF',
    '#9DE0D2',
    '#B6BFD4',
    '#C7A9D5',
    '#FFC1D8',
  ];
  const images = [
    require('../../assets-prueba/images-cover/1.png'),
    require('../../assets-prueba/images-cover/2.png'),
    require('../../assets-prueba/images-cover/3.png'),
    require('../../assets-prueba/images-cover/4.png'),
  ];

  const navigation = useNavigation();
  const { currentPlaylist, setCurrentPlaylist } = usePlaylistStore();

  const handlePressMore = () => {
    setShowModal(true);
  };

  const handlePlayListView = async playlistName => {
    try {
      const playlistRef = await firestore()
        .collection('playlists')
        .where('name', '==', playlistName)
        .get();
      if (!playlistRef.empty) {
        const playlistDoc = playlistRef.docs[0];
        const playlistId = playlistDoc.id;
        setCurrentPlaylist({ id: playlistId, name: playlistName });
        navigation.navigate('Playlist', { playlistName, playlistId });
        console.log(currentPlaylist);
      } else {
        console.error(
          `No se encontró ninguna playlist con el nombre ${playlistName}`,
        );
      }
    } catch (error) {
      console.error('Error al obtener la playlist:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('playlists')
      .orderBy('createDate', 'desc') // Ordenar por createDate en orden descendente
      .onSnapshot(querySnapshot => {
        const playlistsData: string[] = [];
        const colorsData: { [key: string]: string } = {};
        querySnapshot.forEach(doc => {
          const { name, createDate } = doc.data();
          playlistsData.push(name);
          const color =
            initialColors[Math.floor(Math.random() * initialColors.length)];
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
  const handleDeletePlaylist = async (playlistName) => {
    try {
      const playlistRef = await firestore()
        .collection('playlists')
        .where('name', '==', playlistName)
        .get();

      if (!playlistRef.empty) {
        const playlistDoc = playlistRef.docs[0];
        await firestore().collection('playlists').doc(playlistDoc.id).delete();

        // Actualiza la lista de playlists después de eliminar
        const updatedPlaylists = playlists.filter((name) => name !== playlistName);
        setPlaylists(updatedPlaylists);
      } else {
        console.error(`No se encontró ninguna playlist con el nombre ${playlistName}`);
      }
    } catch (error) {
      console.error('Error al eliminar la playlist:', error);
    }
  };
  const MAX_NAME_LENGTH = 50;
  const handleCreatePlaylist = (name: string) => {
    if (name.trim() === '') {
      setError('Este campo es obligatorio.');
    } else {
      setError('');
      const colorIndex = playlists.length % initialColors.length;
      const color = colorSequence[colorIndex];
      const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
      const playlistData = {
        name: name,
        createDate: timestamp,
        songs: [],
      };

      firestore()
        .collection('playlists')
        .add(playlistData)
        .then(docRef => {
          console.log('Se ha creado la playlist:', name);
          const updatedPlaylists = [name, ...playlists];
          setPlaylists(updatedPlaylists);
          setPlaylistColors({ ...playlistColors, [name]: color });
          setPlaylistName('');
          setShowModal(false);
        })
        .catch(error => {
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
      .onSnapshot(querySnapshot => {
        const playlistsData: string[] = [];
        const colorsData: { [key: string]: string } = {};
        let index = 0;
        querySnapshot.forEach(doc => {
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
          <TouchableOpacity style={styles.button} onPress={handlePressMore}>
            <Ionicons name="add" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {playlists.length === 0 ? (
        <View style={styles.content}>
          <Text style={styles.message}>
            Aún no tienes ninguna playlist, presiona "+" para crear una.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {playlists.map((playlist, index) => {
            const color =
              playlistColors[playlist] ||
              initialColors[index % initialColors.length];
            const imageIndex = index % images.length;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handlePlayListView(playlist)}
                style={[styles.playlistContainer]}>
                <View
                  style={[
                    styles.playlistBackground,
                    { backgroundColor: `${color}B3` },
                  ]}
                />
                <View style={styles.playlistBox}>
                  <View style={styles.playlistContent}>
                    <Image
                      source={images[imageIndex]}
                      style={styles.playlistImage}
                    />
                    <View style={[styles.playlistText, { width: 200 }]}>
                      <Text
                        style={styles.playlistName}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {playlist}
                      </Text>
                      <Text style={styles.playlistLabel}>Playlist</Text>
                    </View>
                    <Menu style={styles.menuContainer}>
                      <MenuTrigger>
                        <Icon
                          name="more-vert"
                          size={24}
                          color="black"
                          style={styles.menuIcon}
                        />
                      </MenuTrigger>
                      <MenuOptions customStyles={optionsStyles}>
                        <MenuOption
                          onSelect={handleDeletePlaylist.bind(this, playlist)}
                        >
                          <Text style={styles.optionText}>Eliminar</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <Text>{'\n\n'}</Text>
        </ScrollView>
      )}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.customModalContent}>
            <Text style={[styles.modalTitle, {textAlign: 'left'}]}>
              Dale un nombre a tu playlist
            </Text>
            <View style={[styles.inputContainer, {marginBottom: 20}]}>
              <TextInput
                style={styles.input}
                value={playlistName}
                onChangeText={text => {
                  setPlaylistName(text.slice(0, MAX_NAME_LENGTH));
                  setError('');
                }}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => handleCreatePlaylist(playlistName)}>
                <Text style={styles.buttonText}>Crear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <MiniPlayer navigation={navigation} style={styles.miniPlayer} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playlistName: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 5,
  },
  playlistLabel: {
    color: 'gray',
    fontSize: 13,
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
    opacity: 0.7,
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
  playlistContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistText: {
    marginLeft: 10,
    width: 200, 
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginLeft: -10,
  },
  menuContainer: {
    position: 'absolute',
    right: 0,
  },
});

const optionsStyles = {
  optionsContainer: {
    marginTop: 10,
    marginLeft: 0,
    width: 130,
    // elevation: 0,
    borderWidth: 0,
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: '#EBF2F9',
    justifyContent: 'center',
  },
  optionWrapper: {
    margin: 5,
    alignItems: 'center',
  },
};

export default Library;