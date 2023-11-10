import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import ItemSong from '../components/PreviewSong';
import placeholderImage from '../assets/logo.png';
import EmocionWrapped from '../components/EmotionWrapped';
//import { Dimensions } from 'react-native';

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


const formatDate = date => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const MemoryDetail = ({ route, navigation }) => {
  const { emotion } = route.params;
  const { memoriaId, index } = route.params;
  const { memorie, song } = route.params;


  const { setCurrentSong } = usePlayerStore();
  const playSong = async () => {
    if (!song || !song.title) {
      console.warn("No hay datos de la canción en 'memorie'.");
      return;
    }
    await setCurrentSong({
      id: song.id,
      title: song.title,
      artist: song.artist,
      artwork: song.coverURL,
      url: song.songURL
    });
    navigation.navigate('Player', {
      songData: {
        id: song.id,
        title: song.title,
        artist: song.artist,
        artwork: song.coverURL,
        url: song.songURL
      }, playlistFlow: false
    });
  };


  //navigation.navigate('Player', {songData, playlistFlow: false});
  // const playSong = async () => {
  //   const songToPlay = songs.find(s => s.title === memory.titulo_cancion);
  //   if (!songToPlay) return;
  //   await setCurrentSong(songToPlay);
  //   navigation.navigate('Player');
  // };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={[styles.fechaContainer, { backgroundColor: getColorForEmotion(memorie.emotion) }]}>
        <Text style={styles.fechaText}>
          {typeof memorie !== 'undefined' ? memorie.memoryDate && formatDate(memorie.memoryDate.toDate()) : "FECHA"}
        </Text>
      </View>
      <View style={[styles.container, { backgroundColor: getColorForEmotion(memorie.emotion) }]}>
        <View style={styles.emoContainer}>
          <EmocionWrapped nombre={memorie.emotion} />
        </View>

        <Text style={styles.title}>
          {typeof memorie !== 'undefined' ? memorie.title : "TITLE"}
        </Text>

        {/* <Text style={styles.subtitle}>
          {"Descripción:"}
        </Text>

        <Text style={styles.description}>
        { typeof memorie !== 'undefined' ? memorie.description  : "DESCRIPCION" }
        </Text> */}
        {
          typeof memorie !== 'undefined' && memorie.description && memorie.description.trim() !== '' ? (
            <>
              <Text style={styles.subtitle}>
                {"Descripción:"}
              </Text>

              <Text style={styles.description}>
                {memorie.description}
              </Text>
            </>
          ) : null
        }
        <Text style={styles.tsong}>Imagen:</Text>
        {memorie.imageURL ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: memorie.imageURL }} style={styles.image} />
          </View>
        ) : (
          <Text>No hay imagen disponible</Text> // O puedes quitar este Text si prefieres no mostrar nada
        )}
        <Text style={styles.tsong}>
          {"Canción vinculada al recuerdo:"}
        </Text>

        <ItemSong
          song={song.title}
          artist={song.artist}
          onPlay={playSong}
          imageUri={song.coverURL || placeholderImage}
        />
      </View>
      {/* Vista previa de la imagen subida */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  fechaContainer: {
    marginTop: 100,
    marginBottom: 10,
    marginRight: 17,
    paddingVertical: 7,
    paddingHorizontal: 17,
    alignItems: 'center',
    borderRadius: 18,
    alignSelf: 'flex-end',
    marginTop: 20, //para el bug del espacio en blanco
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
    borderRadius: 40,
    marginBottom: 30,
    padding: 25,
    paddingRight: 50,
    paddingLeft: 50,
    elevation: 10,
    shadowColor: 'black',
    minHeight: screenHeight * 0.9,
    marginTop: 10, //para el bug del espacio en blanco
  },
  emoContainer: {
    alignItems: 'center',

  },
  title: {
    fontFamily: 'Quicksand-VariableFont',
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    fontFamily: 'Arial',
    fontSize: 18,
    color: '#5C5C5C',
    marginBottom: 20,
    borderColor: 'black',
    textAlign: 'justify',
  },
  tsong: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 7,
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 250, // Este tamaño debe coincidir con el tamaño de la vista previa en CreateMemory
    height: 250, // Este tamaño debe coincidir con el tamaño de la vista previa en CreateMemory
    borderRadius: 20, // Si quieres bordes redondeados
    // ... otros estilos que necesites para la imagen ...
  },
});

export default MemoryDetail;