import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Alert,
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
import FavoritePlaylist from '../components/FavoritePlaylist';
import ColorPicker from '../components/ColorPicker';

const Library = () => {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState<string[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlaylistName, setSelectedPlaylistName] = useState('');
  const [editPlaylistName, setEditPlaylistName] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { currentPlaylist, setCurrentPlaylist } = usePlaylistStore();
  const [selectedColor, setSelectedColor] = useState('red'); 

  const modalBackgroundColor = '#ffffff';
  const modalTextColor = '#000000';

  const MAX_NAME_LENGTH = 50;

  const handleColorSelection = (selectedColor: string) => {
    setSelectedColor(selectedColor);
  };


  const handlePressMore = () => {
    setShowModal(true);
  };

  //CREATE
 
  const handleCreatePlaylist = (name: string) => {
    if (name.trim() === '') {
      setError('El nombre de la lista no puede estar vacío.');
    } else {
      setError('');
      const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
      const playlistData = {
        id: '',
        name: name,
        createDate: timestamp,
        songs: [],
        color: selectedColor,
      };
      
      firestore()
        .collection('playlists')
        .add(playlistData)
        .then(docRef => {
          const playlistId = docRef.id;
          docRef.update({ id: playlistId }).then(() => {
            console.log('Se ha creado la playlist:', name, 'con ID:', playlistId);
            const updatedPlaylists = [name, ...playlists];
            setPlaylists(updatedPlaylists);
            resetModal(); 
            setShowModal(false);
          });
        })
        .catch(error => {
          console.error('Error al crear la playlist:', error);
        });
    }
  };
  
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('playlists')
      .orderBy('createDate', 'desc')
      .onSnapshot(querySnapshot => {
        const playlistsData: string[] = [];
        querySnapshot.forEach(doc => {
          const { name } = doc.data();
          playlistsData.push(name);
        });
        setPlaylists(playlistsData);
      });

    return () => unsubscribe();
  }, []);

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
        querySnapshot.forEach((doc, index) => {
          const { name, createDate, color } = doc.data();
          playlistsData.push(name);
        });
        setPlaylists(playlistsData);
      });
  
    return () => unsubscribe();
  }, []);


  //EDIT 
  const handleEditPlaylist = (playlistName) => {
    setSelectedPlaylistName(playlistName);
    setEditPlaylistName(playlistName);
    setShowEditModal(true);
  };

  
  const handleUpdatePlaylist = () => {
    if (editPlaylistName.trim() === '') {
      setError('El nombre de la lista no puede estar vacío.');
    } else {
      setError('');
      let playlistRef = firestore()
        .collection('playlists')
        .where('name', '==', selectedPlaylistName);
      playlistRef = playlistRef.limit(1);
      playlistRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ name: editPlaylistName });
        });
      });

      const updatedPlaylists = playlists.map(playlist => {
        if (playlist === selectedPlaylistName) {
          return editPlaylistName;
        }
        return playlist;
      });

      setPlaylists(updatedPlaylists);
      setSelectedPlaylistName(editPlaylistName);
      setShowEditModal(false);
    }
  };

  const resetModal = () => {
    setPlaylistName('');
    setError('');
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    resetModal(); 
  };
  
  //DELETE
  const handleDeletePlaylist = async (playlistName) => {
    Alert.alert(
      "Confirmar Eliminación",
      `¿Estás seguro de que deseas eliminar la lista "${playlistName}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => {
            console.log(`No se eliminó la playlist "${playlistName}"`);
          },
        },
        {
          text: "Aceptar",
          onPress: async () => {
            try {
              const playlistRef = await firestore()
                .collection('playlists')
                .where('name', '==', playlistName)
                .get();

              if (!playlistRef.empty) {
                const playlistDoc = playlistRef.docs[0];
                await firestore().collection('playlists').doc(playlistDoc.id).delete();

                const updatedPlaylists = playlists.filter((name) => name !== playlistName);
                setPlaylists(updatedPlaylists);
              } else {
                console.error(`No se encontró ninguna playlist con el nombre "${playlistName}"`);
              }
            } catch (error) {
              console.error('Error al eliminar la playlist:', error);
            }
          },
        },
      ]
    );
  };
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FavoritePlaylist handlePlayListView={handlePlayListView} styles={styles} />
        {playlists.map((playlist, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePlayListView(playlist)}
              style={[styles.playlistContainer]}
            >
              <View style={styles.playlistBox}>
              <Image
                  source={require('../assets/playlist/nota.png')} 
                  style={styles.playlistImage}
                />
                <View style={styles.playlistContent}>
                  <View style={[styles.playlistText, { width: 200 }]}>
                    <Text
                      style={styles.playlistName}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {playlist}
                    </Text>
                    <Text style={styles.playlistLabel}>Lista de reproducción</Text>
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
                      <MenuOption onSelect={() => handleEditPlaylist(playlist)}>
                        <Text style={styles.optionText}>Editar</Text>
                      </MenuOption>
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
      </ScrollView>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={[styles.modalContainer, { backgroundColor: modalBackgroundColor }]}>
          <View style={styles.customModalContent}>
            <Text style={[styles.modalTitle, { textAlign: 'left', color: modalTextColor }]}>
              Dale un nombre a tu lista
            </Text>
            <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: modalTextColor, borderColor: modalTextColor }]}
          value={playlistName}
          onChangeText={(text) => {
            if (text.length <= MAX_NAME_LENGTH) {
              setPlaylistName(text);
              setError('');
            }
          }}
          maxLength={MAX_NAME_LENGTH}
          placeholderTextColor={modalTextColor}
        />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
     </View>

<ColorPicker onSelectColor={(selectedColor) => handleColorSelection(selectedColor)} />
  
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
      
      <Modal visible={showEditModal} animationType="slide" transparent={true}>
        <View style={[styles.modalContainer, { backgroundColor: modalBackgroundColor }]}>
          <View style={styles.customModalContent}>
            <Text style={[styles.modalTitle, { textAlign: 'left', color: modalTextColor }]}>
              Edita el nombre de tu lista
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { color: modalTextColor, borderColor: modalTextColor }]}
                value={editPlaylistName}
                onChangeText={text => {
                  if (text.length <= MAX_NAME_LENGTH) {
                    setEditPlaylistName(text);
                    setError('');
                  }
                }}
                maxLength={MAX_NAME_LENGTH}
                placeholderTextColor={modalTextColor}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => handleUpdatePlaylist(selectedPlaylistName)}>
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowEditModal(false);
                  setError('');
                }}>
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
    paddingBottom: 60,
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
  playlistImage: {
    width: 40,  
    height: 40, 
    marginRight: 10, 
    resizeMode: 'cover', 
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
    flex: 1, 
    marginLeft: 10,
  },
  menuContainer: {
    marginLeft: 'auto', 
    paddingRight: 30,    
    position: 'relative', 
    left: -10, 
  },
  optionText: {
    color: '#000000', 
    fontSize: 16,
  },
});
const optionsStyles = {
  optionsContainer: {
    width: 130,
    marginLeft: 0,
    borderWidth: 0,
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 5,
    position: 'absolute' as 'absolute', // Ajusta el tipo de posición
    left: -10,
  },
  optionWrapper: {
    margin: 5,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  }
  
};
export default Library;
