import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ItemSong from '../components/PreviewSong';
import placeholderImage from '../assets/placeholder.png';

const bgColor = ['#c7a9d5', '#B6BFD4', '#9DE0D2', '#BFEAAF', '#F6EA7E', '#F0CC8B', '#FBBAA4', '#FFC1D8'];

const MemoryDetail = ({ route, navigation }) => {
  const { memoriaId, index } = route.params;
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore().collection('memorias').doc(memoriaId).onSnapshot(doc => {
      if (doc.exists) {
        setMemory({ id: doc.id, ...doc.data() });
      } else {
        console.log('Documento no existe!');
      }
    }); 

    return () => unsubscribe();  // Limpiar la suscripción al desmontar el componente
  }, [memoriaId]);

  if (!memory) return null;  // Si no hay memoria, no renderizar nada (o puedes mostrar un spinner)

  const color = bgColor[index % bgColor.length];

  const playSong = () => {
    navigation.navigate('Reproductor', {memoriaId: memory.id});
  };

  return (
    <View style={{ ...styles.container, backgroundColor: color }}>
      <Text style={styles.title}>{memory.titulo_memoria}</Text>
      <Text style={styles.subtitle}>{"Descripcion:"}</Text>
      <Text style={styles.description}>{memory.descripcion_memoria}</Text>
      <Text style={styles.tdate}>{"Fecha:"}</Text>
      <Text style={styles.date}>{memory.fecha_memoria && memory.fecha_memoria.toDate().toISOString().split('T')[0]}</Text>
      <Text style={styles.tsong}>{"Canción vinculada al recuerdo:"}</Text>
      <ItemSong
        song={memory.titulo_cancion}
        artist={memory.artista_cancion}
        onPlay={playSong}
        imageUri={memory.imagen_cancion ? { uri: memory.imagen_cancion } : placeholderImage}
        memoriaId={memoriaId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.96,
    marginHorizontal: 25,
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 20,
    padding: 25,
    backgroundColor: 'white',
    elevation:10,
    shadowColor:'black',
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color:'black',
    marginBottom: 20,
    borderColor: 'black',
    textAlign: 'justify',
  },
  date: {
    fontSize: 18,
    color:'black',
    marginBottom: 20,
  },
  tdate: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  tsong: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  songButton: {
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  }
});

export default MemoryDetail;
