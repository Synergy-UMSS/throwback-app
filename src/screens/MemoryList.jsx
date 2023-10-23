import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MiniPlayer from '../components/MiniPlayer';
import EmotionWithMemory from '../components/EmotionWithMemory';

const MemoryList = ({navigation}) => {
  // navegacion
  const abrirDetalles = (id, item, songForMemory, index) => {
    emotionWrapp = listaEmociones[index % listaEmociones.length];
    navigation.navigate('MemoryDetail', {
      memoriaId: id,
      memorie: item,
      song: songForMemory,
      index: index,
      emotion: emotionWrapp,
    });
  };
  const [memories, setMemories] = useState([]);
  const [songs, setSongs] = useState([]);

  // Recuperar memorias
  useEffect(() => {
    const unsubscribeMemories = firestore()
      .collection('memories')
      .orderBy('createDate', 'desc')
      .onSnapshot(
        querySnapshot => {
          const memoryData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMemories(memoryData);
          // console.log(memoryData);
          console.log('>>>>>> Memories');
        },
        error => {
          console.log(error);
        },
      );
    return () => unsubscribeMemories();
  }, []);
  // Recuperar canciones
  useEffect(() => {
    const unsubscribeSongs = firestore()
      .collection('songs')
      .onSnapshot(
        querySnapshot => {
          const songData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSongs(songData);
          // console.log(songData);
          console.log('>>>>>> Songs');
        },
        error => {
          console.log(error);
        },
      );
    return () => unsubscribeSongs();
  }, []);

  const findSongById = songId => {
    return songs.find(song => song.id === songId);
  };
  // control de lista vacia
  // if (true) {
  if (memories.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>
          No tiene memorias musicales creadas.
        </Text>
        <MiniPlayer navigation={navigation} style={styles.miniPlayer} />
      </View>
    );
  }

  // const listaEmociones = ['worried', 'genial', 'tired',  'leisurely', 'no_trouble', 'sad','happy','confused', 'speechless', 'angry',  'pluff'];
  const listaEmociones = [
    'emo1',
    'emo2',
    'emo3',
    'emo4',
    'emo5',
    'emo6',
    'emo7',
    'emo8',
    'emo9',
    'emo10',
    'emo11',
    'emo12',
    'emo13',
    'emo14',
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={memories}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({item, index}) => {
          const songForMemory = findSongById(item.song);
          // console.log('songformemory');
          // console.log(songForMemory);
          return (
            <EmotionWithMemory
              memoria={item}
              song={songForMemory}
              onPress={id => abrirDetalles(id, item, songForMemory, index)}
              index={index}
              alignment={index % 2 === 0 ? 'right' : 'left'}
              emotion={listaEmociones[index % listaEmociones.length]}
            />
          );
        }}
        contentContainerStyle={{paddingBottom: 50}}
      />
      <View style={styles.miniPlayerContainer}>
        <MiniPlayer navigation={navigation} style={styles.miniPlayer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    color: 'black',
  },
  messageText: {
    fontFamily: 'Arial',
    fontSize: 18,
    marginLeft: 18,
    color: 'black',
  },
});

export default MemoryList;
