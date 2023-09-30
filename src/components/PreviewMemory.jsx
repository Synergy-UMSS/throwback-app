import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const bgColor = [
  '#c7a9d5',
  '#B6BFD4',
  '#9DE0D2',
  '#BFEAAF',
  '#F6EA7E',
  '#F0CC8B',
  '#FBBAA4',
  '#FFC1D8',
];

const PreviewMemory = ({memoria, onPress, index}) => {
  const color = bgColor[index % bgColor.length];

  return (
    <TouchableOpacity
      onPress={() => onPress(memoria.id)}
      style={{...styles.container, backgroundColor: color}}>
      <View style={styles.memoriaContainer}>
        <Text style={styles.titulo}>{memoria.titulo_memoria}</Text>
        <View style={styles.cancionContainer}>
          <Text style={styles.iconoMusica}>🎵</Text>
          <Text style={styles.cancion}>{memoria.titulo_cancion} - {memoria.artista_cancion}</Text> 
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 14,
    marginBottom: 10,
    margin: 10,
    padding: 22,
    borderRadius: 23,
    borderColor: 'black',
    borderWidth: 2.5,
    elevation: 8,
  },
  memoriaContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  cancionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconoMusica: {
    marginRight: 5,
    color: 'black',
  },
  cancion: {
    fontSize: 14,
    color: 'black',
  },
});

export default PreviewMemory;
