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
import ImagePicker from 'react-native-image-picker';
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
import { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';


const Library = () => {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistIdCurrent, setPlaylistIdCurrent] = useState('');
  const [playlists, setPlaylists] = useState<string[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlaylistName, setSelectedPlaylistName] = useState('');
  const [editPlaylistName, setEditPlaylistName] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { currentPlaylist, setCurrentPlaylist } = usePlaylistStore();
  const [colors, setColors] = useState<{ [key: string]: string }>({});
  const [playlistImage, setPlaylistImage] = useState<string | null>(null);
  const [playlistImages, setPlaylistImages] = useState<{ [key: string]: string | null }>({});

  const options: ImageLibraryOptions = {
    mediaType: 'photo',
  };


  const modalBackgroundColor = '#ffffff';
  const modalTextColor = '#000000';
  const [modalColor, setModalColor] = useState('#FBBAA4');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  

  const MAX_NAME_LENGTH = 50;

  const handleColorSelection = (selectedColor: string) => {
    const rgbaColor = hexToRgba(selectedColor, 0.85);

    setSelectedColor(rgbaColor);
    setModalColor(rgbaColor);
  };


  const hexToRgba = (hex: string, alpha: number): string => {
    const [r, g, b] = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) || [0, 0, 0];
    return `rgba(${r},${g},${b},${alpha})`;
  };
  const getColorByPlaylistName = (playlistName: string): string | null => {
    return colors[playlistName] || null;
  };
  

  const [showEditImage, setShowEditImage] = useState(false);

  const handleEditImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de imagen');
      } else if (response.errorMessage) {
        console.error('Error al seleccionar la imagen:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
        setPlaylistImage(response.assets[0].uri);
      }
    });
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
        userKey: firebase.auth().currentUser?.uid
      };

      firestore()
        .collection('playlists')
        .add(playlistData)
        .then((docRef) => {
          const playlistId = docRef.id;
          docRef.update({ id: playlistId }).then(() => {
            console.log(
              'Se ha creado la playlist:',
              name,
              'con ID:',
              playlistId
            );

            // Actualiza el estado colors con el nombre de la nueva playlist
            setColors((prevColors) => ({
              ...prevColors,
              [name]: selectedColor || '', 
            }));
            

            const updatedPlaylists = [name, ...playlists];
            setPlaylists(updatedPlaylists);
            resetModal();
            setShowModal(false);
          });
        })
        .catch((error) => {
          console.error('Error al crear la playlist:', error);
        });
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('playlists')
      .where('userKey', '==', firebase.auth().currentUser?.uid)
      .orderBy('createDate', 'desc')
      .onSnapshot((querySnapshot) => {
        const playlistsData: string[] = [];
        const colorsData: { [key: string]: string } = {};
        if (querySnapshot && !querySnapshot.empty) {
          querySnapshot.forEach((doc, index) => {
            const { name, createDate, color, playlistImage } = doc.data();
            playlistsData.push(name);
            colorsData[name] = color || '#FBBAA4';

            if (name === selectedPlaylist) {
              setPlaylistImage(playlistImage || null);
            }
          });
          setPlaylists(playlistsData);
          setColors(colorsData);
        }
      else {}});

    return () => unsubscribe();
  }, [selectedPlaylist]);





  //VIEW
  const handlePlayListView = async playlistName => {
    try {
      const playlistRef = await firestore()
        .collection('playlists')
        .where('name', '==', playlistName)
        .get();
        
      if (!playlistRef.empty) {
        const playlistDoc = playlistRef.docs[0];
        const playlistId = playlistDoc.id;
        const playlistData = playlistDoc.data();
        setCurrentPlaylist({
          id: playlistId,
          name: playlistName,
          songs_p: playlistData.songs.map((song) => song.id)
        });
        navigation.navigate('Playlist', { playlistName, playlistId });
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
    console.log('en el view', selectedPlaylist);
    const unsubscribe = firestore()
      .collection('playlists')
      .where('userKey', '==', firebase.auth().currentUser?.uid)
      .orderBy('createDate', 'desc')
      .onSnapshot((querySnapshot) => {
        const playlistsData: string[] = [];
        const colorsData: { [key: string]: string } = {};
        const imagesData: { [key: string]: string | null } = {};

        if (querySnapshot && !querySnapshot.empty) {
          querySnapshot.forEach((doc, index) => {
            const playlistData = doc.data();  //añadido para verificar
            if (playlistData && playlistData.name && playlistData.createDate) {
              const { name, createDate, color, playlistImage } = doc.data();
              playlistsData.push(name);
              colorsData[name] = color || '#FBBAA4';
              imagesData[name] = playlistImage || null;

              if (name === selectedPlaylist) {
                setPlaylistImage(playlistImage || null);
              }
            }
          });

          setPlaylists(playlistsData);
          setColors(colorsData);
          setPlaylistImages(imagesData);
        } else { }
      }
      );

    return () => unsubscribe();
  }, [selectedPlaylist]);



  //EDIT 
  const handleEditPlaylist = (playlistName) => {
    setSelectedPlaylistName(playlistName);
    setEditPlaylistName(playlistName);
    setSelectedColor(getColorByPlaylistName(playlistName) ?? ''); 

    const currentPlaylistImage = playlistImages[playlistName] || null;
  
    // Almacena la imagen actual en el estado playlistImage
    setPlaylistImage(currentPlaylistImage);
  
    setShowEditModal(true);
    setShowEditImage(true);
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
          // Obtener URL
          const playlistImageUrl = playlistImage || ''; // Image actual si no hay modificcaciones

          doc.ref.update({
            name: editPlaylistName,
            playlistImage: playlistImageUrl,
            userKey: firebase.auth().currentUser?.uid
          });
        });

        // Actualiza el objeto 'colors' con el nuevo nombre y color de la playlist
        colors[editPlaylistName] = selectedColor || ''; 
        delete colors[selectedPlaylistName];

        const updatedPlaylists = playlists.map(playlist => {
          if (playlist === selectedPlaylistName) {
            return editPlaylistName;
          }
          return playlist;
        });

        setPlaylistImages(prevImages => ({
          ...prevImages,
          [editPlaylistName]: playlistImage || playlistImages[selectedPlaylistName], // Usa playlistImage si no se selecciona una nueva imagen
        }));
        setPlaylists(updatedPlaylists);
        setSelectedPlaylistName(editPlaylistName);
        setShowEditModal(false);
      });
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
                .where('userKey', '==', firebase.auth().currentUser?.uid)
                .get();

              if (!playlistRef.empty) {
                const playlistDoc = playlistRef.docs[0];
                const deletedColor = colors[playlistName];
                await firestore().collection('playlists').doc(playlistDoc.id).delete();

                const updatedPlaylists = playlists.filter((name) => name !== playlistName);
                setPlaylists(updatedPlaylists);

                // Eliminar color asociado
                const updatedColors = { ...colors };
                delete updatedColors[playlistName];
                setColors(updatedColors);
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
              style={[
                styles.playlistContainer,
                {
                  backgroundColor: `${getColorByPlaylistName(playlist)}70`,
                  overflow: 'visible',
                },
              ]}
            >
              <View
                style={[
                  styles.playlistBackground,
                  {
                    backgroundColor: `${getColorByPlaylistName(playlist)}70`,
                    top: -7,
                  },
                ]}
              />

              <View style={styles.playlistBox}>
                <Image
                  source={{ uri: playlistImages[playlist] || 'https://i.pinimg.com/originals/40/68/3b/40683b2b9fa2a42d7d4305ec536a00b9.jpg' }}
                  style={{
                    ...styles.playlistImage,
                    width: 60,
                    height: 60,
                    marginLeft: -10,
                  }}
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
                      <Text style={[styles.optionText, { textAlign: 'center' }]}>Editar</Text>
                    </MenuOption>
                    <MenuOption onSelect={handleDeletePlaylist.bind(this, playlist)}>
                      <Text style={[styles.optionText, { textAlign: 'center' }]}>Eliminar</Text>
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
        <View style={[styles.modalContainer, { backgroundColor: modalColor }]}>
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
        <View style={[styles.modalContainer, { backgroundColor: selectedColor || modalColor }]}>
          <View style={styles.customModalContent}>
            <Text style={[styles.modalTitle, { textAlign: 'center', color: modalTextColor }]}>
              Editar lista
            </Text>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={handleEditImage}>
                  <Image
                    source={{
                      uri: playlistImage
                        ? playlistImage
                        : 'https://i.pinimg.com/originals/40/68/3b/40683b2b9fa2a42d7d4305ec536a00b9.jpg'
                    }}
                    style={{ width: 100, height: 100 }}
                  />
                  <View style={styles.changeImageTextContainer}>
                    <Text style={{ color: 'gray', fontSize: 12, textAlign: 'center' }}>
                      Cambiar portada
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { color: modalTextColor, borderColor: modalTextColor }]}
                value={editPlaylistName}
                onFocus={() => setShowEditImage(true)}
                onBlur={() => setShowEditImage(false)}
                onChangeText={(text) => {
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
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
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
    borderRadius: 15,
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
    backgroundColor: '#4ADCC8',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginRight: 5,
  },
  closeButton: {
    backgroundColor: '#FA8071',
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
    borderWidth: 1,
    padding: 20,
    borderRadius: 15,
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
    width: 60,
    height: 60,
    marginLeft: -10,
    resizeMode: 'cover',
  },
  playlistContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  playlistBackground: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    zIndex: -1,
    borderRadius: 15,
    opacity: 0.9,
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
    left: -15,
  },
  optionText: {
    color: '#000000',
    fontSize: 16,
  },
  editImage: {
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeImageTextContainer: {
    alignItems: 'center',
    marginTop: 5,
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
    left: -60,
  },
  optionWrapper: {
    margin: 5,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  }

};
export default Library;
