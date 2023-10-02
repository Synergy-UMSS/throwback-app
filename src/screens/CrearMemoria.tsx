import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ItemSong from '../utils/ItemSong';

const CrearMemoria = ({ navigation }) => {
  const [tituloMemoria, setTituloMemoria] = useState('');
  const [descripcionMemoria, setDescripcionMemoria] = useState('');
  const [fechaMemoria, setFechaMemoria] = useState('');
  const [tituloCancion, setTituloCancion] = useState('');
  const [artistaCancion, setArtistaCancion] = useState('');

  const guardarMemoria = async () => {
    const memoria = {
      titulo_memoria: tituloMemoria,
      descripcion_memoria: descripcionMemoria,
      fecha_creacion: firestore.Timestamp.now(),
      fecha_memoria: firestore.Timestamp.fromDate(new Date(fechaMemoria)),
      titulo_cancion: 'Sample Song',
      artista_cancion: 'Artist',
    };

    try {
      await firestore().collection('memorias').add(memoria);
      console.log('Memoria guardada correctamente.');
    } catch (error) {
      console.error('Error al guardar la memoria: ', error);
    }
  };

  const playSong = () => {
    navigation.navigate('Reproductor', {memoriaId: 1}); //mandando id 1 para probar
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título de la Memoria:</Text>
      <TextInput
        style={styles.input}
        value={tituloMemoria}
        onChangeText={setTituloMemoria}
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcionMemoria}
        onChangeText={setDescripcionMemoria}
      />

      <Text style={styles.label}>Fecha de Memoria:</Text>
      <TextInput
        style={styles.input}
        value={fechaMemoria}
        onChangeText={setFechaMemoria}
        placeholder="YYYY-MM-DD"
      />

<Text style={styles.label}>Cancion Vinculada:</Text>
      <View style={styles.marginBottom}>
        <ItemSong
          song='SampleSong'
          artist='Artist'
          onPlay={playSong}
        />
      </View>

      <Button title="Guardar" onPress={guardarMemoria} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,

  },
  marginBottom: {
    marginTop: 40,
    marginBottom: 40,  // puedes ajustar el valor según el espacio que necesites
  },
});

export default CrearMemoria;
