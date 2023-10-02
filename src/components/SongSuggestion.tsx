import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SongSuggestion = ({ songData, onOptionPress }) => {
  const { id, title, artist, artwork,url } = songData;
  const [showOptions, setShowOptions] = useState(false);
  const linki='./Lust_for_Life.png';
  const handleOptionPress = () => {
    setShowOptions(!showOptions);
  };

  return (
    <View style={styles.container}>
      {console.log('putaaaaaaa ' + artist)}
      <Image source={artwork} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.songName}>{title}</Text>
        <Text style={styles.artistName}>{artist}</Text>
      </View>
      <TouchableOpacity onPress={handleOptionPress}>
        <MaterialCommunityIcons name="dots-vertical" size={30} color="gray" />
      </TouchableOpacity>

      {/* Modal para mostrar opciones */}
      <Modal visible={showOptions} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={artwork} style={styles.imageSelected} />
            <Text style={styles.songName}>{title}</Text>
            <Text style={styles.artistName}>{artist}</Text>
            <Text>¿Deseas crear una memoria musical?</Text>
            <Button title="Crear Memoria Musical" onPress={() => onOptionPress('option1')} />
            <Button title="Cerrar" onPress={handleOptionPress} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
