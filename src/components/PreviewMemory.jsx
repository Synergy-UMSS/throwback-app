import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

function aclararColor(hex, porcentaje=0.3) {
  // Convertir el color hex a RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Aclarar cada componente del color
  r = Math.floor(r + (255 - r) * porcentaje);
  g = Math.floor(g + (255 - g) * porcentaje);
  b = Math.floor(b + (255 - b) * porcentaje);

  // Convertir los componentes RGB de vuelta a hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}



const PreviewMemory = ({memoria, onPress, index}) => {
  const color = bgColor[index % bgColor.length];
  const colorOscurecido = aclararColor(color);
  return (
    <TouchableOpacity
      onPress={() => onPress(memoria.id)}
      style={{...styles.container, backgroundColor: color}}>
      <View style={styles.memoriaContainer}>
        <Text style={styles.titulo}>{memoria.titulo_memoria}</Text>
        <View style={{...styles.cancionContainer, backgroundColor: colorOscurecido}}>
          <Text style={styles.iconoMusica}>🎵</Text>
          <Text style={styles.cancion}>{memoria.titulo_cancion} - {memoria.artista_cancion}</Text> 
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 14,// minimo header
    //marginBottom: 0,
    //margin:0, //deprecate
      padding: 22, // dinamico
    borderRadius: 17,
    borderColor: 'black',
    borderWidth: 0,
    elevation: 8,
  },
  memoriaContainer: {
    flex: 1,
  },
  titulo: {
    marginLeft:10,
    //fontFamily:'Quicksand-VariableFont',
    fontSize: 18,
    fontWeight: 'bold',
    //marginBottom: 5,
    color: 'black',
  },
  cancionContainer: {
    marginLeft:10,
    marginRight:10,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor :'#FAFAFA',
    borderRadius: 17,
    //elevation:1,
    padding:3,
    paddingLeft :15,
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
