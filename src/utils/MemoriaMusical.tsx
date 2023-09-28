import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MemoriaMusical = ({ memoria, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(memoria.id)} style={styles.container}>
      <View style={styles.memoriaContainer}>
        <Text style={styles.titulo}>     {memoria.tituloMemoria}</Text>
        <View style={styles.cancionContainer}>
          <Text style={styles.iconoMusica}>         🎵</Text>
          <Text style={styles.cancion}>{memoria.cancion} - {memoria.artista}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  memoriaContainer: {
    padding: 22,
    borderRadius: 12,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 9,
  },
  cancionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconoMusica: {
    marginRight: 5,
  },
  cancion: {
    fontSize: 14,
    color: 'grey',
  },
});

export default MemoriaMusical;
