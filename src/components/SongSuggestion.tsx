import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {usePlayerStore} from '../store/playerStore';
import {usePlaylistStore} from '../store/playlistStore';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SongSuggestion = ({songData, screenSelected}) => {
  const {title, artist, artwork, url} = songData;
  const [showOptions, setShowOptions] = useState(false);
  const navigation = useNavigation();
  const {setCurrentSong, currentSong} = usePlayerStore();
  const {currentPlaylist} = usePlaylistStore();

  const handleOptionPress = () => {
    setCurrentSong(songData);
    console.log('canción actual  ' + currentSong.title);
    console.log('gente re paila');
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    if (showOptions) {
        console.log('El ModalContainer está visible');
    }
}, [showOptions]);

  const handlePlayPress = () => {
    setCurrentSong(songData);
    if(screenSelected == 'search'){
      navigation.navigate('Player', {songData, playlistFlow: false});
    }else{
      navigation.navigate('Player', {songData, playlistFlow: true});
    }
  };

  const checkSongMemory = async (song) => {
    const memoriesRef = firestore().collection('memorias');
    const querySnapshot = await memoriesRef
      .where('titulo_cancion', '==', song.title)
      .get();

    if (!querySnapshot.empty) {
      Alert.alert(
        '¿Volver a crear una memoria con esta canción?',
        'Esta canción ya está asociada.',
        [
          {text: 'Aceptar', onPress: redirectToCreateMemory},
          {text: 'Cancelar', onPress: handleOptionPress},
        ],
        {cancelable: false},
      );
    } else {
      redirectToCreateMemory();
    }
  };

  const redirectToCreateMemory = () => {
    navigation.navigate('CreateMemory', {currentSong});
  };

  const createMemory = () => {
    setShowOptions(false); // para cerrar el modal luego de crear memoria Dx bug solucionado
    checkSongMemory(currentSong);
  };

  const addSongPlaylist = async song => {
    const docRef = firestore().collection('playlists').doc(currentPlaylist.id);
    docRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        if (Array.isArray(data.songs)) {
          data.songs.push(song);
          docRef
            .update({
              songs: data.songs,
            })
            .then(() => {
              console.log('Dato agregado con éxito');
            })
            .catch(error => {
              console.error('Error al actualizar el documento:', error);
            });
          navigation.navigate('Playlist', {currentSong});
        } else {
          console.error('El campo songs no es un arreglo o no existe');
        }
      } else {
        console.error('No se encontró el documento');
      }
    });
  };

  const deleteCurrentSong = async () => {
    console.log('quiero eliminar ' + songData.title);
    const docRef = firestore().collection('playlists').doc(currentPlaylist.id);
    docRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        if (Array.isArray(data.songs)) {
          let ind = 0;
          for (let i = 0; i < data.songs.length; i++) {
            if (data.songs[i].title === songData.title) {
              ind = i;
              break;
            }
          }
          
          const updatedSongs = data.songs.filter(
            (song, index) => index !== ind,
            );
          docRef
            .update({
              songs: updatedSongs,
            })
            .then(() => {
              console.log('Dato eliminado con éxito');
            })
            .catch(error => {
              console.error('Error al actualizar el documento:', error);
            });
          navigation.navigate('Playlist', {currentSong: songData});
        } else {
          console.error('El campo songs no es un arreglo o no existe');
        }
      } else {
        console.error('No se encontró el documento');
      }
    });
  };

  const backToPlaylist = () => {
    addSongPlaylist(currentSong);
  };

  return (
    <TouchableOpacity onPress={handlePlayPress}>
      <View style={styles.container}>
        <View style={styles.songContainer}>
          {artwork ? (
            typeof artwork === 'number' ? (
              <Image source={artwork} style={styles.image} />
            ) : (
              <Image source={{uri: artwork}} style={styles.image} />
            )
          ) : (
            <Image
              source={require('../assets/logo.png')}
              style={styles.image}
            />
          )}
          <View style={styles.textContainer}>
            <Text style={[styles.songName, screenSelected==='search'?{ color: '#777'}: {fontWeight:600, color:'black'}]}>{title}</Text>
            <Text style={[styles.artistName, screenSelected ==='search'?{ color: '#777'}: {color:'black'}]}>{artist}</Text>
          </View>
        </View>
        {screenSelected === 'search' && (
          <TouchableOpacity onPress={handleOptionPress}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={30}
              color="gray"
            />
          </TouchableOpacity>
        )}
        {screenSelected === 'playlist' && (
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
              <MenuOption onSelect={deleteCurrentSong}>
                <Text style={styles.optionText}>Eliminar</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        )}
        {screenSelected === 'playlistfav' && (
          <></>
        )}
      </View>
      {screenSelected === 'search' && (
        <Modal visible={showOptions} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity
                  onPress={handleOptionPress}
                  style={styles.closeButton}>
                  <MaterialCommunityIcons name="close" size={30} color="gray" />
                </TouchableOpacity>
              </View>
              {artwork ? (
                typeof artwork === 'number' ? (
                  <Image source={artwork} style={styles.imageSelected} />
                ) : (
                  <Image source={{uri: artwork}} style={styles.imageSelected} />
                )
              ) : (
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.imageSelected}
                />
              )}
              <Text style={[styles.songName]}>{title}</Text>
              <Text style={styles.artistName}>{artist}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cyanButton]}
                  onPress={createMemory}>
                  <Text style={styles.buttonText}>Crear Memoria Musical</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.salmonButton]}
                  onPress={handleOptionPress}>
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {screenSelected === 'playlist'}
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
  menuIcon: {
    position: 'absolute',
    top: -15,
    right: -5,
    alignItems: 'center',
  },
  optionText: {
    color: 'black',
    fontFamily: 'Arial',
    padding: 5,
    fontSize: 16,
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

export default SongSuggestion;