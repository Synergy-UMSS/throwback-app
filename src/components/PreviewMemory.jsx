import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
import songs from '../../data/Prueba/Data';
import Icon from 'react-native-vector-icons/MaterialIcons';

const bgColor = [
  '#C7A9D5',
  '#CDF4C9',
  '#B6BFD4',
  '#F6EA7E',
  '#F0CC8B',
  '#FBBAA4',
  '#FFC1D8',
  '#9DE0D2',
];

function aclararColor(hex, porcentaje=0.3) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.floor(r + (255 - r) * porcentaje);
  g = Math.floor(g + (255 - g) * porcentaje);
  b = Math.floor(b + (255 - b) * porcentaje);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}




const PreviewMemory = ({ memoria, onPress, index }) => {
  const song = songs.find(
    song => song.title === memoria.titulo_cancion && song.artist === memoria.artista_cancion
  );
  const songId = song ? song.id : 0;
  const combinedId = songId+memoria.titulo_memoria.length + memoria.artista_cancion.length;
  const color = bgColor[combinedId % bgColor.length];
  const colorOscurecido = aclararColor(color);

  return (
    <TouchableOpacity
      onPress={() => onPress(memoria.id)}
      style={{ ...styles.container, backgroundColor: color }}
    >
    
      <View style={styles.memoriaContainer}>
        <Text style={styles.titulo}>
          {memoria.titulo_memoria}
        </Text>
        
        <View style={{ ...styles.cancionContainer, backgroundColor: colorOscurecido }}>
          <Text style={styles.iconoMusica}>🎵</Text>
          <Text style={styles.cancion}>
            {memoria.titulo_cancion} - {memoria.artista_cancion}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
          style={styles.menuTouchContainer}
          onPress={() => {
              // mostrar el menú
              console.log('acabas de precionar los 3 puntos, porque?');
          }}
      >
          <Icon 
              name="more-vert" 
              size={24} 
              color="black" 
              style={styles.menuIcon}
          />
      </TouchableOpacity>


    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    padding: 11,
    borderRadius: 17,
    borderColor: 'black',
    borderWidth: 0,
    elevation: 8,
    justifyContent: 'center',
  },
  memoriaContainer: {
    flex: 1,
  },
  titulo: {
    marginLeft:10,
    fontFamily:'arial-bold',
    fontSize: 18,
    color: 'black',
    marginBottom:5,
  },
  cancionContainer: {
    fontFamily:'Arial',
    marginLeft:10,
    marginRight:10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 13,
    padding:10,
  },
  iconoMusica: {
    marginRight: 5,
    color: 'black',
  },
  cancion: {
    marginRight:30,
    fontFamily:'Arial',
    fontSize: 14,
    color: '#5C5C5C',
  },
  menuIcon: {
   // position: 'absolute',
    //top: 10,
    //right: 10,
  },
  menuTouchContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreviewMemory;
