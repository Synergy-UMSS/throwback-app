import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { usePlayerStore } from '../store/playerStore';

const SongSuggestion = ({ songData, onOptionPress }) => {
  const { id, title, artist, artwork, url } = songData;
  const [showOptions, setShowOptions] = useState(false);
  const navigation = useNavigation();
  const { setCurrentSong } = usePlayerStore();

  const handleOptionPress = () => {
    setShowOptions(!showOptions);
  };

  const handlePlayPress = () => {
    setCurrentSong(songData);
    navigation.navigate('Player', { songData });
  };

  return (
    <TouchableOpacity onPress={handlePlayPress}>
      <View style={styles.container}>
        <View style={styles.songContainer}>
          <Image source={artwork} style={styles.image} />
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
            <Image source={artwork} style={styles.imageSelected} />
            <Text style={styles.songName}>{title}</Text>
            <Text style={styles.artistName}>{artist}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cyanButton]}
                onPress={() => onOptionPress('option1')}
              >
                <Text style={styles.buttonText}>Crear Memoria Musical</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.salmonButton]}
                onPress={handleOptionPress}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
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
  },
  salmonButton: {
    backgroundColor: 'salmon',
  },
  cyanButton: {
    backgroundColor: '#4ADCC8',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SongSuggestion;
