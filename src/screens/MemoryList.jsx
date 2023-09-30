import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import PreviewMemory from '../components/PreviewMemory';
import MemoryDetail from './MemoryDetail';

const memorias = [
  { id: 1, tituloMemoria: "Festival al Aire Libre", cancion: "Livin' on a Prayer", artista: "Bon Jovi", fecha: "2019-07-20", lugar: "Nueva York, NY" },
  { id: 2, tituloMemoria: "Fiesta de Graduación", cancion: "Don't Stop Believin'", artista: "Journey", fecha: "2020-06-10", lugar: "Los Ángeles, CA" },
  { id: 3, tituloMemoria: "Parrillada en la casa de Carlos", cancion: "Bohemian Rhapsody", artista: "Queen", fecha: "2018-12-05", lugar: "Londres, Reino Unido" },
  { id: 4, tituloMemoria: "Evento Musical al Aire Libre", cancion: "Hotel California", artista: "Eagles", fecha: "2019-08-28", lugar: "Austin, TX" },
  { id: 5, tituloMemoria: "Monopoly con amigos", cancion: "Superstition", artista: "Stevie Wonder", fecha: "2019-11-20", lugar: "Los Ángeles, CA" },
  { id: 6, tituloMemoria: "Noche de Estrellas en el Anfiteatro", cancion: "Stairway to Heaven", artista: "Led Zeppelin", fecha: "2018-07-12", lugar: "Chicago, IL" },
  { id: 7, tituloMemoria: "Baile de Salón", cancion: "Dancing Queen", artista: "ABBA", fecha: "2021-08-08", lugar: "Miami, FL" },
  // { id: 8, tituloMemoria: "Café, reencuentro con amigos", cancion: "Wonderwall", artista: "Oasis", fecha: "2020-04-05", lugar: "San Francisco, CA" },
  // { id: 9, tituloMemoria: "Noche de San Juan", cancion: "Feeling Good", artista: "Nina Simone", fecha: "2021-02-12", lugar: "Nueva Orleans, LA" },
  // { id: 10, tituloMemoria: "Festival al Aire Libre", cancion: "Livin' on a Prayer", artista: "Bon Jovi", fecha: "2019-07-20", lugar: "Nueva York, NY" },
  // { id: 11, tituloMemoria: "Fiesta de Graduación", cancion: "Don't Stop Believin'", artista: "Journey", fecha: "2020-06-10", lugar: "Los Ángeles, CA" },
  // { id: 12, tituloMemoria: "Parrillada en la casa de Carlos", cancion: "Bohemian Rhapsody", artista: "Queen", fecha: "2018-12-05", lugar: "Londres, Reino Unido" },
  // { id: 13, tituloMemoria: "Evento Musical al Aire Libre", cancion: "Hotel California", artista: "Eagles", fecha: "2019-08-28", lugar: "Austin, TX" },
  // { id: 14, tituloMemoria: "Monopoly con amigos", cancion: "Superstition", artista: "Stevie Wonder", fecha: "2019-11-20", lugar: "Los Ángeles, CA" },
  // { id: 15, tituloMemoria: "Noche de Estrellas en el Anfiteatro", cancion: "Stairway to Heaven", artista: "Led Zeppelin", fecha: "2018-07-12", lugar: "Chicago, IL" },
  // { id: 16, tituloMemoria: "Baile de Salón", cancion: "Dancing Queen", artista: "ABBA", fecha: "2021-08-08", lugar: "Miami, FL" },
  // { id: 17, tituloMemoria: "Café, reencuentro con amigos", cancion: "Wonderwall", artista: "Oasis", fecha: "2020-04-05", lugar: "San Francisco, CA" },
];


const MemoryList = ({ navigation }) => {
  const abrirDetalles = (id) => {
    navigation.navigate('MemoryDetail', { memoriaId: id });
  };

  if(memorias.length==0){
    return(
      <View style={styles.container}>
        <Text style={styles.messageText}>No tienes memorias musicales creadas</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
      data={memorias}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item, index }) => <PreviewMemory memoria={item} onPress={abrirDetalles} index={index} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },
  messageText:{
    fontSize:18,
    marginLeft:18
  }
});

export default MemoryList;