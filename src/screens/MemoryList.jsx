import React, { useEffect, useState } from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import PreviewMemory from '../components/PreviewMemory';
import MemoryDetail from './MemoryDetail';
import firestore from '@react-native-firebase/firestore';
import MiniPlayer from '../components/MiniPlayer';

const MemoryList = ({ navigation }) => {
  const abrirDetalles = (id, index) => {
    navigation.navigate('MemoryDetail', { memoriaId: id, index: index });
  };
 
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore().collection('memorias').orderBy('fecha_creacion', 'desc').onSnapshot(querySnapshot => {
      const memoryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(memoryData);
      console.log(memoryData);
      console.log('>>>>>>');
    }, error => {
      console.log(error);
    });

    // Limpiar el listener cuando el componente se desmonte.
    return () => unsubscribe();


  }, []);
  // Si data está vacío, muestra el mensaje.
  // if (true) {
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

  
  return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={({ item, index }) => <PreviewMemory memoria={item} onPress={(id) => abrirDetalles(id, index)} index={index} />}
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
    color:'black'
  },
  messageText: {
    fontFamily:'Quicksand-VariableFont',
    fontSize: 18,
    marginLeft: 18,
    color:'black'
  }
});

export default MemoryList;
