import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import PreviewMemory from '../components/PreviewMemory';
import MemoryDetail from './MemoryDetail';
import firestore from '@react-native-firebase/firestore';
import MiniPlayer from '../components/MiniPlayer';
import EmotionWithMemory from '../components/EmotionWithMemory';

const MemoryList = ({ navigation }) => {
  // navegacion
  const abrirDetalles = (id, index) => {


    navigation.navigate('MemoryDetail', { memoriaId: id, index: index });
    // navigation.navigate('handleOpenMemoryDetail', { memoria: id, index: index });
    // onPress={handleOpenMemoryDetail}
  };
  // const navigation = useNavigation();
  // const handleOpenMemoryDetail = () => {
  //   // Navegar a MemoryDetail como un modal
  //   navigation.navigate('MemoryDetailStack', {
  //     screen: 'MemoryDetail',
  //     params: {
  //       // Puedes pasar parámetros a MemoryDetail si es necesario
  //     },
  //   });
  // };





  // firebase
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('memorias')
      .orderBy('fecha_creacion', 'desc')
      .onSnapshot(
        querySnapshot => {
          const memoryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setData(memoryData);
          console.log(memoryData);
          console.log('>>>>>>');
        },
        error => {
          console.log(error);
        }
      );
    return () => unsubscribe();
  }, []);
  // control de lista vacia
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>
          No tiene memorias musicales creadas.
        </Text>
        <MiniPlayer navigation={navigation} style={styles.miniPlayer} />
      </View>
    );
  }
  
  const listaEmociones = ['worried', 'genial', 'tired',  'leisurely', 'no_trouble', 'sad','happy','confused', 'speechless', 'angry',  'pluff'];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item, index }) => {
          const randomIndex = Math.floor(Math.random() * listaEmociones.length);
          
          return (
            <EmotionWithMemory 
              memoria={item} 
              onPress={(id) => abrirDetalles(id, index)} 
              index={index} 
              alignment={index % 2 === 0 ? 'right' : 'left'}
              emotion={listaEmociones[index % listaEmociones.length]}
              // emotion={listaEmociones[randomIndex]}
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
      <View style={styles.miniPlayerContainer}>
        <MiniPlayer navigation={navigation} style={styles.miniPlayer} />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    color: 'black'
  },
  messageText: {
    fontFamily: 'Arial',
    fontSize: 18,
    marginLeft: 18,
    color: 'black'
  }
});

export default MemoryList;

