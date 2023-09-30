import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ItemSong from '../utils/ItemSong';

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
const memorias = [
  // { id: 1, tituloMemoria: "Festival al Aire Libre", cancion: "Livin' on a Prayer", artista: "Bon Jovi", fecha: "2019-07-20", lugar: "Nueva York, NY",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 2, tituloMemoria: "Fiesta de Graduación", cancion: "Don't Stop Believin'", artista: "Journey", fecha: "2020-06-10", lugar: "Los Ángeles, CA",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 3, tituloMemoria: "Parrillada en la casa de Carlos", cancion: "Bohemian Rhapsody", artista: "Queen", fecha: "2018-12-05", lugar: "Londres, Reino Unido",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 4, tituloMemoria: "Evento Musical al Aire Libre", cancion: "Hotel California", artista: "Eagles", fecha: "2019-08-28", lugar: "Austin, TX",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 5, tituloMemoria: "Monopoly con amigos", cancion: "Superstition", artista: "Stevie Wonder", fecha: "2019-11-20", lugar: "Los Ángeles, CA",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 6, tituloMemoria: "Noche de Estrellas en el Anfiteatro", cancion: "Stairway to Heaven", artista: "Led Zeppelin", fecha: "2018-07-12", lugar: "Chicago, IL",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 7, tituloMemoria: "Baile de Salón", cancion: "Dancing Queen", artista: "ABBA", fecha: "2021-08-08", lugar: "Miami, FL",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 8, tituloMemoria: "Café, reencuentro con amigos", cancion: "Wonderwall", artista: "Oasis", fecha: "2020-04-05", lugar: "San Francisco, CA",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 9, tituloMemoria: "Noche de San Juan", cancion: "Feeling Good", artista: "Nina Simone", fecha: "2021-02-12", lugar: "Nueva Orleans, LA",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 10, tituloMemoria: "Festival al Aire Libre", cancion: "Livin' on a Prayer", artista: "Bon Jovi", fecha: "2019-07-20", lugar: "Nueva York, NY",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 11, tituloMemoria: "Fiesta de Graduación", cancion: "Don't Stop Believin'", artista: "Journey", fecha: "2020-06-10", lugar: "Los Ángeles, CA",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 12, tituloMemoria: "Parrillada en la casa de Carlos", cancion: "Bohemian Rhapsody", artista: "Queen", fecha: "2018-12-05", lugar: "Londres, Reino Unido",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 13, tituloMemoria: "Evento Musical al Aire Libre", cancion: "Hotel California", artista: "Eagles", fecha: "2019-08-28", lugar: "Austin, TX",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 14, tituloMemoria: "Monopoly con amigos", cancion: "Superstition", artista: "Stevie Wonder", fecha: "2019-11-20", lugar: "Los Ángeles, CA",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 15, tituloMemoria: "Noche de Estrellas en el Anfiteatro", cancion: "Stairway to Heaven", artista: "Led Zeppelin", fecha: "2018-07-12", lugar: "Chicago, IL",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 16, tituloMemoria: "Baile de Salón", cancion: "Dancing Queen", artista: "ABBA", fecha: "2021-08-08", lugar: "Miami, FL",
  // descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
  // { id: 17, tituloMemoria: "Café, reencuentro con amigos", cancion: "Wonderwall", artista: "Oasis", fecha: "2020-04-05", lugar: "San Francisco, CA",descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim elit ex, sed suscipit urna ornare id. Fusce convallis, arcu non mollis bibendum, massa ipsum tempor felis, pellentesque condimentum nisl enim ut sem. Nullam sit amet fermentum leo. Vestibulum facilisis, massa vitae rhoncus ullamcorper, velit dui sagittis dolor, ultricies iaculis orci leo id velit. Morbi ultricies lorem ac sollicitudin accumsan. Aliquam quis placerat magna. Morbi non magna nunc. Nulla facilisis aliquet enim."},
];

const MemoryDetail = ({route, navigation}) => {
  const {memoriaId} = route.params;
  const memory = memorias.find(m => m.id === memoriaId);
  const color = bgColor[(memory.id - 1) % bgColor.length];

  const playSong = () => {
    navigation.navigate('Reproductor', {memoriaId: memory.id});
  };

  return (
    <View style={{...styles.container, backgroundColor: color}}>
      <Text style={styles.title}>{memory.tituloMemoria}</Text>
      <Text style={styles.subtitle}>{'Descripcion:'}</Text>
      <Text style={styles.description}>{memory.descripcion}</Text>
      <Text style={styles.tdate}>{'Fecha:'}</Text>
      <Text style={styles.date}>{memory.fecha}</Text>
      <Text style={styles.tdate}>{'Canción vinculada al recuerdo:'}</Text>
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
    flex: 0.95,
    marginHorizontal: 25,
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 30,
    padding: 30,
    backgroundColor: 'white',
    elevation: 15,
    shadowColor: 'black',
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  tdate: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#292929',
    marginBottom: 20,
    borderColor: 'black',
    paddingBottom: 10,
    textAlign: 'justify',
  },
  date: {
    fontSize: 18,
    color: '#292929',
    marginBottom: 20,
  },
  songButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
});
export default MemoryDetail;
