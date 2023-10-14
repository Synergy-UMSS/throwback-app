import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
import songs from '../../data/Prueba/Data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { MenuProvider } from 'react-native-popup-menu';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';


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
  const showDeleteConfirmation = () => {
    Alert.alert(
        "Confirmación",
        "¿Estás seguro de que deseas eliminar esta memoria?",
        [
            {
                text: "No",
                style: "cancel"
            },
            { text: "Sí", onPress: () => deleteMemoryFromFirestore(memoria.id) }
        ]
    );
  }  
  const deleteMemoryFromFirestore = (memoryId) => {
    console.log('Memoria a eliminar');
    console.log(memoryId);
    const reference = firestore().collection('memorias').doc(memoryId);
    reference.delete()
    .then(() => {
        console.log('Memoria eliminada con éxito');
    })
    .catch(error => {
        console.error("Error eliminando memoria: ", error);
    });
  }

  return (
    <TouchableOpacity
      onPress={() => onPress(memoria.id)}
      style={{ ...styles.container, backgroundColor: color }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.titulo}>
          {memoria.titulo_memoria}
        </Text>
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
            <MenuOption onSelect={showDeleteConfirmation}>
              <Text style={styles.optionText}>Eliminar</Text>
            </MenuOption>
            {/* <MenuOption onSelect={() => {
                console.log('Opción 2 seleccionada');
            }}>
              <Text style={styles.optionText}>Opción 2</Text>
            </MenuOption> */}
          </MenuOptions>
        </Menu>
      </View>
      <View style={{ ...styles.cancionContainer, backgroundColor: colorOscurecido }}>
        <Text style={styles.iconoMusica}>🎵</Text>
        <Text style={styles.cancion}>
          {memoria.titulo_cancion} - {memoria.artista_cancion}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    marginLeft: 5,
    marginRight: 5,
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
    position: 'absolute',
    top: -20,
    right: -5,
    width:35,
    height:35,
    //justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'red',
    
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
    width : 130, //ancho
    elevation: 15,
    borderWidth: 0,
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor:'#EBF2F9',
    justifyContent: 'center',
  },
  optionWrapper: {
    // backgroundColor: 'black',
    margin: 5,
    alignItems: 'center',
    // borderRadius: 10,
  },
};

export default PreviewMemory;
