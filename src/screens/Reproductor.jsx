import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Reproductor = ({ route, navigation }) => {
  const { memoriaId } = route.params;
  const [memoria, setMemoria] = useState(null);

  useEffect(() => {
    const getMemoriaFromFirestore = async () => {
      try {
        const doc = await firestore().collection('memorias').doc(memoriaId).get();

        if (doc.exists) {
          setMemoria({ id: doc.id, ...doc.data() });
        } else {
          console.log('Documento no existe!');
        }
      } catch (error) {
        console.error("Error al obtener el documento:", error);
      }
    };

    getMemoriaFromFirestore();
  }, [memoriaId]);

  if (!memoria) return <Text>Cargando...</Text>;

  return (
    <View>
      <Text>Reproductor</Text>
      <Text>ID: {memoria.id}</Text>
      <Text>Canción: {memoria.titulo_cancion}</Text>
      <Text>Artista: {memoria.artista_cancion}</Text>
    </View>
  );
};

export default Reproductor;