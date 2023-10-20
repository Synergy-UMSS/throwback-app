import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LibraryProps = {
  navigation: StackNavigationProp<{}>;
};

const Library: React.FC<LibraryProps> = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const nav = useNavigation();

  const handlePressMore = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreatePlaylist = (playlistName) => {
    // Lógica para crear la playlist
    console.log(`Se creó la playlist con el nombre: ${playlistName}`);
    setShowModal(false);
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
      <View style={styles.content}>
        <Text style={styles.message}>
          Aún no tienes ninguna playlist, presiona "+".
        </Text>
      </View>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.customModalContent}>
            <Text style={styles.modalTitle}>Dale un nombre a tu playlist</Text>
            <TextInput
              style={styles.input}
              
              value={playlistName}
              onChangeText={(text) => setPlaylistName(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.createButton]}
                onPress={() => handleCreatePlaylist(playlistName)}
              >
                <Text style={styles.buttonText}>Crear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={handleCloseModal}
              >
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
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    marginLeft: 10,
    
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  createButton: {
    backgroundColor: '#FA8071',
    width: '45%',
    marginRight: '5%',
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#4ADCC8',
    width: '45%',
    marginLeft: '5%',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },


});

export default Library;
