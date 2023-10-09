import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ItemSong from '../components/PreviewSong';
import placeholderImage from '../assets/logo.png';
import songs from '../../data/Prueba/Data';
const bgColor = ['#c7a9d5', '#B6BFD4', '#9DE0D2', '#BFEAAF', '#F6EA7E', '#F0CC8B', '#FBBAA4', '#FFC1D8'];
//import { usePlayerStore } from '../store/playerStore';
import { usePlayerStore } from '../store/playerStore';


const formatDate = date => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};


const MemoryDetail = ({ route, navigation }) => {
  const { memoriaId, index } = route.params;
  const [memory, setMemory] = useState(null);
  
  const { setCurrentSong } = usePlayerStore();
  
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

  const songg = songs.find(s => s.title === memory.titulo_cancion);
  const songArtwork = songg ? songg.artwork : null;

  const playSong = async () => {
    const songToPlay = songs.find(s => s.title === memory.titulo_cancion);
    if (!songToPlay) return;
    await setCurrentSong(songToPlay);
    navigation.navigate('Player'); 
  };


  return (
    //<ScrollView style={{flex: 1}}>
    <ScrollView style={{ ...styles.container, backgroundColor: color}}>
      <Text style={styles.title}>{memory.titulo_memoria}</Text>
      <Text style={styles.subtitle}>{"Descripción:"}</Text>
      <Text style={styles.description}>{memory.descripcion_memoria}</Text>
      <Text style={styles.tdate}>{"Fecha:"}</Text>
      <Text style={styles.date}>{memory.fecha_memoria && formatDate(memory.fecha_memoria.toDate())}</Text>
      <Text style={styles.tsong}>{"Canción vinculada al recuerdo:"}</Text>
      <ItemSong
        song={memory.titulo_cancion} //ok
        artist={memory.artista_cancion} //ok
        onPlay={playSong}
        imageUri={songArtwork || placeholderImage}
        memoriaId={memoriaId}
      />
      <Text>  </Text>
      <Text>  </Text>
    </ScrollView>
    //</ScrollView>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 23,
    marginBottom: 23,
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 0,
    borderRadius: 17,
    padding: 25,
    backgroundColor: 'white',
    elevation:10,
    shadowColor:'black',
  },
  title: {
    fontFamily:'Quicksand-VariableFont',
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily:'Quicksand-VariableFont',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    fontFamily:'Quicksand-VariableFont',
    fontSize: 18,
    color:'#5C5C5C',
    marginBottom: 20,
    borderColor: 'black',
    textAlign: 'justify',
  },
  date: {
    fontFamily:'Quicksand-VariableFont',
    fontSize: 18,
    color:'#5C5C5C',
    marginBottom: 20,
  },
  tdate: {
    fontFamily:'Quicksand-VariableFont',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  tsong: {
    fontFamily:'Quicksand-VariableFont',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  songButton: {
    fontFamily:'Quicksand-VariableFont',
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  }
});

export default MemoryDetail;
