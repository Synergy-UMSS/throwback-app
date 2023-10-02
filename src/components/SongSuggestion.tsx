import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde React Navigation
import { usePlayerStore } from '../store/playerStore';
import TrackPlayer from 'react-native-track-player';

const SongSuggestion = ({ songData, onOptionPress }) => {
  const { id, title, artist, artwork, url } = songData;
  const [showOptions, setShowOptions] = useState(false);
  const navigation = useNavigation(); // Obtiene el objeto de navegación
  const { setCurrentSong } = usePlayerStore();
  const handleOptionPress = () => {
    setShowOptions(!showOptions);
  };

  const handlePlayPress = () => {
    // Navega a la pantalla "Player" cuando se presiona la canción
    setCurrentSong(songData);
    console.log('songData', songData);
    navigation.navigate('Player', { songData }); // Reemplaza 'Player' con el nombre de tu pantalla "Player"
  };
  
  return (
    <TouchableOpacity onPress={handlePlayPress}>
      {/* Envuelve toda la canción en un TouchableOpacity */}
      <View style={styles.container}>
        <View style={styles.songContainer}>
          <Image source={artwork} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.songName}>{title}</Text>
            <Text style={styles.artistName}>{artist}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleOptionPress}>
          {/* Los tres puntos aquí */}
          <MaterialCommunityIcons name="dots-vertical" size={30} color="gray" />
        </TouchableOpacity>
      </View>
      {/* Modal para mostrar opciones */}
      <Modal visible={showOptions} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={artwork} style={styles.imageSelected} />
            <Text style={styles.songName}>{title}</Text>
            <Text style={styles.artistName}>{artist}</Text>
            <Text>¿Deseas crear una memoria musical?</Text>
            <Button
              title="Crear Memoria Musical"
              onPress={() => onOptionPress('option1')}
            />
            <Button title="Cerrar" onPress={handleOptionPress} />
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
    justifyContent: 'space-between', // Para separar los tres puntos del resto
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
});

export default SongSuggestion;
