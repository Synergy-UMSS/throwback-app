import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
import songs from '../../data/Prueba/Data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
const screenWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';

// obtener el color de la memoria basado en la emocion
function getColorForEmotion(emotion) {
  return emociones[emotion] || "#000000";
}
const emociones = {
  happy: "#FED65D",       // oro para "feliz"
  no_trouble: "#39CE7D",  // verde lima para "sin problemas"
  angry: "#FF526B",       // naranja rojizo para "enojado"
  worried: "#CCA7D7",     // melocotón para "preocupado"
  genial: "#FFAE5D",      // azul cielo profundo para "genial"
  tired: "#7DA4C1",       // gris oscuro para "cansado"
  sad: "#778391",         // azul acero para "triste"
  leisurely: "#D2E6A6",   // cardo para "ocio"
  confused: "#B4B2A2",    // rosa fuerte para "confundido"
  speechless: "#B69B77",  // ciruela para "sin palabras"
  pluff: "#FFACA8",       // pálido dorado para "pluff" (asumiendo que es alguna emoción o estado)
};
// aclarar un color hexadecimal
function aclararColor(hex, porcentaje=0.2) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.floor(r + (255 - r) * porcentaje);
  g = Math.floor(g + (255 - g) * porcentaje);
  b = Math.floor(b + (255 - b) * porcentaje);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const PreviewMemory = ({ memoria, onPress, index, emotion}) => {
  

  // color de memoria
  const color = getColorForEmotion(emotion);  
  const colorOscurecido = aclararColor(color);
  // borrado de memoria
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
    <View style={styles.mainContainer}>
      <TouchableOpacity 
        onPress={() => onPress(memoria.id)}
        // onPress={handleOpenMemoryDetail}
        style={{ ...styles.container, backgroundColor: color }}
      >
        <View style={styles.headerContainer}>
          <Text style={{...styles.titulo}}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    padding: 18,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 0,
    elevation: 10,
    justifyContent: 'center',
    flex: 1,
    maxWidth: screenWidth * 0.7,
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
    textAlign: 'center',
    textAlignVertical: 'center',
    flex:0.9,
    borderRadius: 17,
  },
  cancionContainer: {
    fontFamily:'Arial',
    marginLeft:10,
    marginRight:10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:5,
    paddingRight:5,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:14,
  },
  iconoMusica: {
    marginRight: 5,
    color: 'black',
  },
  cancion: {
    marginRight:30,
    fontFamily:'Arial',
    fontSize: 13.5,
    color: 'black',
    flex:1,
    
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
    width : 130,
    elevation: 0,
    borderWidth: 0,
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor:'#EBF2F9',
    justifyContent: 'center',
  },
  optionWrapper: {
    margin: 5,
    alignItems: 'center',
  },
};

export default PreviewMemory;
