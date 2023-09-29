import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemSong from '../utils/ItemSong';


const memorias = [
  { id: 1, tituloMemoria: "Festival al Aire Libre", cancion: "Livin' on a Prayer", artista: "Bon Jovi", fecha: "2019-07-20", lugar: "Nueva York, NY" },
  { id: 2, tituloMemoria: "Fiesta de Graduación", cancion: "Don't Stop Believin'", artista: "Journey", fecha: "2020-06-10", lugar: "Los Ángeles, CA" },
  { id: 3, tituloMemoria: "Parrillada en la casa de Carlos", cancion: "Bohemian Rhapsody", artista: "Queen", fecha: "2018-12-05", lugar: "Londres, Reino Unido" },
  { id: 4, tituloMemoria: "Evento Musical al Aire Libre", cancion: "Hotel California", artista: "Eagles", fecha: "2019-08-28", lugar: "Austin, TX" },
  { id: 5, tituloMemoria: "Monopoly con amigos", cancion: "Superstition", artista: "Stevie Wonder", fecha: "2019-11-20", lugar: "Los Ángeles, CA" },
  { id: 6, tituloMemoria: "Noche de Estrellas en el Anfiteatro", cancion: "Stairway to Heaven", artista: "Led Zeppelin", fecha: "2018-07-12", lugar: "Chicago, IL" },
  { id: 7, tituloMemoria: "Baile de Salón", cancion: "Dancing Queen", artista: "ABBA", fecha: "2021-08-08", lugar: "Miami, FL" },
  { id: 8, tituloMemoria: "Café, reencuentro con amigos", cancion: "Wonderwall", artista: "Oasis", fecha: "2020-04-05", lugar: "San Francisco, CA" },
  { id: 9, tituloMemoria: " Noche de San Juan", cancion: "Feeling Good", artista: "Nina Simone", fecha: "2021-02-12", lugar: "Nueva Orleans, LA" },
];

const MemoryDetail = ({ route, navigation }) => {
  const { memoriaId } = route.params;
  const memory = memorias.find(m => m.id === memoriaId);


  const playSong = () => {
    navigation.navigate('Reproductor', { memoriaId: memory.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{memory.tituloMemoria}</Text>
      <Text style={styles.description}>{memory.descripcion}</Text>
      <Text style={styles.date}>{memory.fecha}</Text>
      <ItemSong
        song={memory.cancion}
        artist={memory.artista}
        onPlay={playSong}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    marginBottom: 15,
    fontSize: 16,
    height: 150,
  },
  date: {
    marginBottom: 15,
    fontSize: 14,
  },
});

export default MemoryDetail;