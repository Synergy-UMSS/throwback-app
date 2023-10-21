import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ItemSong from '../components/PreviewSong';
import placeholderImage from '../assets/logo.png';
import songs from '../../data/Prueba/Data';
import EmocionWrapped from '../components/EmotionWrapped';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
function getColorForEmotion(emotion) {
  return emociones[emotion] || "#000000";
}
const emociones = {
  emo1: "#F6EA7E",       
  emo2: "#FBBAA4",  
  emo3: "#C7A9D5",       
  emo4: "#FFC1D8",     
  emo5: "#F0CC8B",      
  emo6: "#B6BFD4",       
  emo7: "#FFC1D8",         
  emo8: "#FBBAA4",   
  emo9: "#F6EA7E",     
  emo10: "#9DE0D2",
  emo11: "#B6BFD4",
  emo12: "#F0CC8B",
  emo13: "#9DE0D2",
  emo14: "#C7A9D5",  
};

import { usePlayerStore } from '../store/playerStore';

function sumAsciiCodes(str) {
  return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

const formatDate = date => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const MemoryDetail = ({ route, navigation}) => {
  const {emotion} = route.params;
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
    return () => unsubscribe();
  }, [memoriaId]);

  if (!memory) return null;

  const songg = songs.find(s => s.title === memory.titulo_cancion);
  const songArtwork = songg ? songg.artwork : null;

  const playSong = async () => {
    const songToPlay = songs.find(s => s.title === memory.titulo_cancion);
    if (!songToPlay) return;
    await setCurrentSong(songToPlay);
    navigation.navigate('Player');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={[styles.fechaContainer, { backgroundColor: getColorForEmotion(emotion)}]}>
        <Text style={styles.fechaText}>
          {memory.fecha_memoria && formatDate(memory.fecha_memoria.toDate())}
        </Text>
      </View>
      <View style={[styles.container, { backgroundColor: getColorForEmotion(emotion)}]}>

        <View style={styles.emoContainer}>
          <EmocionWrapped nombre={emotion} />
        </View>

        <Text style={styles.title}>
          {memory.titulo_memoria}
        </Text>

        <Text style={styles.subtitle}>
          {"Descripción:"}
        </Text>

        <Text style={styles.description}>
          {memory.descripcion_memoria}
        </Text>

        <Text style={styles.tsong}>
          {"Canción vinculada al recuerdo:"}
        </Text>

        <ItemSong
          song={memory.titulo_cancion}
          artist={memory.artista_cancion}
          onPlay={playSong}
          imageUri={songArtwork || placeholderImage}
          memoriaId={memoriaId}
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  fechaContainer: {
    marginTop:100,
    marginBottom:19,
    marginRight:17,
    paddingVertical: 3,
    paddingHorizontal: 17,
    alignItems: 'center',
    borderRadius:18,
    alignSelf: 'flex-end',
  },
  fechaText: {
    fontSize: 18,
    color: 'black',
  },
  container: {
    flex: 1,
    marginBottom: 23,
    borderColor: 'black',
    borderWidth: 0,
    borderRadius:40,
    marginBottom:30,
    padding: 25,
    paddingRight:50,
    paddingLeft:50,
    elevation: 10,
    shadowColor: 'black',
    minHeight:screenHeight*0.9,
  },
  emoContainer:{
    alignItems:'center',

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
    fontFamily:'Arial',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    fontFamily:'Arial',
    fontSize: 18,
    color:'#5C5C5C',
    marginBottom: 20,
    borderColor: 'black',
    textAlign: 'justify',
  },
  tsong: {
    fontFamily:'Arial',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  // songButton: {
  //   fontFamily:'Arial',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 10,
  //   borderColor: 'grey',
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   flex:1
  // }
});

export default MemoryDetail;
